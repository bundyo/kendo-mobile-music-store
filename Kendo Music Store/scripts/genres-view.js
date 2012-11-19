define(["jQuery", "data", "templates"], function ($, data, templates) {
    var _genreAlbumSelector;

    return {
        init: function (e) {
            $(e.sender.element).find(".listview").kendoMobileListView({
                dataSource: data.genresList,
                template: templates.genreListItem,
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