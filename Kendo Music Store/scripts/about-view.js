define(["jQuery", "utils"], function ($, utils) {
    var _openExternal = function (event, url) {
        try {
            window.plugins.childBrowser.openExternal(url);
        } catch(ex) {
            utils.showError("Sorry, opening an external page is only avaibale on an actual device.");
        }
        
        if(event && event.preventDefault) {
            event.preventDefault();
        }
        return false;
    };

    return {
        viewModel: {
            openKendoWeb: function (clickEvt) {
                _openExternal(clickEvt, 'http://www.kendoui.com');
            },
            openSource: function (clickEvt) {
                _openExternal(clickEvt, 'http://www.github.com/telerik/kendo-mobile-music-store');
            }
        }
    };
});