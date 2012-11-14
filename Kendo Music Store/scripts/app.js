var app = (function(document, $, kendo, data) {
    var _app;

    var genresViewInit = function (e) {
            $(e.sender.element).find(".listview").kendoMobileListView({
                dataSource: data.genresList,
                template: $("#genre-list-template").text(),
                style: "inset",
                endlessScroll: true
            });
        },
        
        artistsViewInit = function (e) {
            $(e.sender.element).find(".listview").kendoMobileListView({
                dataSource: data.artistsList,
                template: $("#artist-list-template").text(),
                style: "inset",
                endlessScroll: true,
                fixedHeaders: true
            });
        },
        
        homeLayoutInit = function (e) {
            $(e.sender.element).find(".select-group").kendoMobileButtonGroup({
                index: 0,
                select: function (e) {
                    var target = e.sender.element.children(".km-state-active").data("target");
                }
            });
        };

  
    init = function () {
        _app = new kendo.mobile.Application(document.body, { transition: "fade", layout: "mobile-tabstrip" });
    };
    
    return {
        init: init,
        genresViewInit: genresViewInit,
        artistsViewInit: artistsViewInit,
        homeLayoutInit: homeLayoutInit
    };
})(document, jQuery, kendo, data);

app.init();