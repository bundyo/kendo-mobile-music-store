var app = (function(document, $, kendo, data) {
    var _app,
        _genreAlbumSelector,
        _selectedArtistFilter = "A",
        
        _parseQueryStringToObject = function () {
            var argsParsed = {};
            var hash = document.location.hash;
            if(!hash || hash.length == 0) {
                return argsParsed;
            }
            var args = document.location.hash.split('?');
            if(args.length < 2) {
                return argsParsed;
            }
            args = args[1].split('&');
            
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
            $("#artists-filter-header").hide();
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
            var scroller = e.sender.element.data("kendoMobileView").scroller;
            var listView = e.sender.element.find(".listview");
        },
        
        artistsViewBeforeShow = function (e) {
            $("#artists-filter-header").show();
            var query = _parseQueryStringToObject();
            if(query.value) {
                _selectedArtistFilter = query.value;
                e.sender.element.data("kendoMobileView").scroller.reset();
                e.preventDefault();
                _app.navigate("#artists-view");
            }
        },
        
        artistsViewShow = function (e) {
            e.sender.element.find(".buttongroup.km-buttongroup .km-button").removeClass("km-state-active");
            e.sender.element.find("#" + _selectedArtistFilter).parents(".km-button").addClass("km-state-active");
            
            var oldList = $(e.sender.element).find(".listview").data("kendoMobileListView");
            if (oldList) {
                oldList.destroy();
            }
            
            $(e.sender.element).find(".listview").kendoMobileListView({
                dataSource: data.artistsStartingWith(_selectedArtistFilter),
                template: $("#artist-list-template").text(),
                style: "inset",
                endlessScroll: true
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
            
            var letterButtonGroup = e.sender.element.find(".buttongroup").kendoMobileListView({
                dataSource: ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split(""),
                template: $("#artist-filter-template").text()
            });
            letterButtonGroup.removeClass("km-listview km-list").addClass("km-buttongroup");
            var buttonGroupItems = letterButtonGroup.children("li");
            buttonGroupItems.addClass("km-button");
            buttonGroupItems.find("a").removeClass("km-listview-link");
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
        accountViewInit: accountViewInit,
        artistsViewBeforeShow: artistsViewBeforeShow,
        artistsViewShow: artistsViewShow
    };
})(document, jQuery, kendo, data);

app.init();