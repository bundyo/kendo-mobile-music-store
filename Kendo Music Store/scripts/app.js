var app = (function(document, $, kendo, data) {
    var _app,
        _genreAlbumSelector,
        
        _parseQueryStringToObject = function () {
            var args = document.location.hash.split('?')[1].split('&');
            var argsParsed = {};
            
            for (i=0; i < args.length; i++)
            {
                arg = unescape(args[i]);
            
                if (arg.indexOf('=') == -1)
                {
                    argsParsed[arg.trim()] = true;
                }
                else
                {
                    kvp = arg.split('=');
                    var val = kvp[1].trim();
                    argsParsed[kvp[0].trim()] = isNaN(val) ? val : parseFloat(val);
                }
            }
            return argsParsed;
        },
        
        _setViewTitle = function (view, title) {
            view.data("kendoMobileView").title = title;
            var navbar = view.find(".km-navbar").data("kendoMobileNavBar");
            if (navbar) {
                navbar.title(title);
            }
        },

        genresViewInit = function (e) {
            $(e.sender.element).find(".listview").kendoMobileListView({
                dataSource: data.genresList,
                template: $("#genre-list-template").text(),
                style: "inset",
                endlessScroll: true
            });
        },
        
        genresViewBeforeShow = function (e) {
            _genreAlbumSelector.data("kendoMobileButtonGroup").select(0);
        },
        
        albumsViewBeforeShow = function (e) {
            var filter = _parseQueryStringToObject();
            _setViewTitle(e.sender.element, filter.title);
            e.sender.element.data("kendoMobileView").scroller.reset();
            
            var oldList = $(e.sender.element).find(".listview").data("kendoMobileListView");
            if (oldList) {
                oldList.destroy();
            }
            
            $(e.sender.element).find(".listview").kendoMobileListView({
                dataSource: data.albumsFor(filter),
                template: $("#album-list-template").text(),
                style: "inset",
                endlessScroll: true
            });
        },
        
        artistsViewInit = function (e) {
            var expanders = e.sender.element.find(".accordian").children("li");
            var scroller = e.sender.element.data("kendoMobileView").scroller;
            expanders.click(function (e) {
                expanders.find("ul").hide();
                var filter = $(e.delegateTarget).text();
                if($(e.delegateTarget).find(".listview").length == 0) {
                    $(e.delegateTarget).children("ul").append("<li><ul class='listview'></ul></li>");
                    $(e.delegateTarget).find(".listview").kendoMobileListView({
                        dataSource: data.artistsStartingWith(filter),
                        template: $("#artist-list-template").text(),
                        style: "inset"
                    });
                }
                var scrollToY= scroller.movable.y - $(e.delegateTarget).position().top;
                scroller.movable.element.css("-webkit-transition", "-webkit-transform 3s;");
                //scroller.movable.element.attr("style", "-webkit-transform: translate3d(0px, " + scrollToY + "px, 0); -webkit-transition: -webkit-transform 3s;" );
                scroller.movable.moveTo({x: 0, y: scrollToY});
                //scroller.movable.element.css("-webkit-transition", "");
                $(e.delegateTarget).find("ul").slideDown();
            });
        },
        
        homeLayoutInit = function (e) {
            _genreAlbumSelector = $(e.sender.element).find(".select-group").kendoMobileButtonGroup({
                index: 0,
                select: function (e) {
                    var target = e.sender.element.children(".km-state-active").data("target");
                    _app.navigate(target);
                }
            });
        },
        
        accountViewInit = function (e) {
        },

        init = function () {
            _app = new kendo.mobile.Application(document.body, { transition: "fade", layout: "mobile-tabstrip" });
        };

    return {
        init: init,
        genresViewInit: genresViewInit,
        genresViewBeforeShow: genresViewBeforeShow,
        albumsViewBeforeShow: albumsViewBeforeShow,
        artistsViewInit: artistsViewInit,
        homeLayoutInit: homeLayoutInit,
        accountViewInit: accountViewInit
    };
})(document, jQuery, kendo, data);

app.init();