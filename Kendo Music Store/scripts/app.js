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
            $(e.sender.element).find(".select-group").kendoMobileButtonGroup({
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
        artistsViewInit: artistsViewInit,
        homeLayoutInit: homeLayoutInit,
        accountViewInit: accountViewInit
    };
})(document, jQuery, kendo, data);

app.init();