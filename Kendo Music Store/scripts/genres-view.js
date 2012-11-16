define(["jQuery", "data"], function ($, data) {
    var _genreAlbumSelector;

    return {
        init: function (e) {
            $(e.sender.element).find(".listview").kendoMobileListView({
                dataSource: data.genresList,
                template: $("#genre-list-template").text(),
                style: "inset",
                endlessScroll: true
            });
        },
        
        beforeShow: function (e) {
            $(e.sender.element).find(".select-group").data("kendoMobileButtonGroup").select(0);
            $("#artists-filter-header").hide();
        },
    };
});