define(["jQuery", "kendo", "data", "templates"], function ($, kendo, data, templates) {
    var _genreAlbumSelector;

    return {
        onShow: function (e) {
            $(e.sender.element).find(".select-group").data("kendoMobileButtonGroup").select(0);
            $(".artists-filter-header").hide();
        },
        
        viewModel: kendo.observable({
            genres: data.genresList
        })
    };
});