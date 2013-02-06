define(["jQuery", "utils", "cart"], function ($, utils, cart) {
    var _openExternal = function (event, url) {
        if($("body").hasClass("km-ios")) {
            window.location.href = url;
        } else {
            try {
                window.plugins.childBrowser.openExternal(url);
            } catch(ex) {
                utils.showError("Sorry, there was an error trying to open this external URL: " + url);
            }
        }
        
        if(event && event.preventDefault) {
            event.preventDefault();
        }
        return false;
    };

    return {
        show: function () {
            utils.updateCartBadges($, cart);
        },

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