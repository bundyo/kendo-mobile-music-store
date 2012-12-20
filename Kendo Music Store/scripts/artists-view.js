define(["jQuery", "kendo", "utils", "data"], function ($, kendo, utils, data) {
    return {
        show: function (e) {
        },

        viewModel: kendo.observable({
            artists: data.artistsList
        })
    };
});