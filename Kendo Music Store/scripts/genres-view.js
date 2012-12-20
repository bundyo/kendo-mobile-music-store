define(["jQuery", "kendo", "data", "templates"], function ($, kendo, data, templates) {
    return {
        onShow: function (e) {
            $(e.sender.element).find(".select-group").data("kendoMobileButtonGroup").select(0);
        },
        
        viewModel: kendo.observable({
            genres: data.genresList
        })
    };
});