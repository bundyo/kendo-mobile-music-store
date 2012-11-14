var app = (function(document, $, uri, kendo, data) {
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
            $(e.sender.element).find(".listview").kendoMobileListView({
                dataSource: data.albumsFor(filter),
                template: $("#album-list-template").text(),
                style: "inset",
                endlessScroll: true
            });
        },
        
        artistsViewInit = function (e) {
            $("#panelbar").kendoPanelBar({
                expandMode: "single",
                expand: function (e) {
                    var filter = $(e.item).text();
                    if($(e.item).find(".listview").length > 0) {
                        return;
                    }
                    $(e.item).children("ul").append("<li><ul class='listview'></ul></li>");
                    $(e.item).find(".listview").kendoMobileListView({
                        dataSource: data.artistsStartingWith(filter),
                        template: "#=Name#",
                        style: "inset"
                    });
                }
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
})(document, jQuery, URI, kendo, data);

app.init();