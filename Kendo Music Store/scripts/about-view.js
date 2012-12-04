define(["jQuery", "utils"], function ($, utils) {
    var _openExternal = function (url) {
        try {
            window.plugins.childBrowser.openExternal(url);
        } catch(ex) {
            utils.showError("Sorry, opening an external page is only avaibale on an actual device.");
        }
    };

    return {
        viewModel: {
            openKendoWeb: function (clickEvt) {
                _openExternal('http://www.kendoui.com');
            },
            openSource: function (clickEvt) {
                _openExternal('http://www.github.com/telerik/kendo-mobile-music-store');
            }
        }
    };
});