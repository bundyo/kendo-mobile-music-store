define(["jQuery", "utils", "cart"], function ($, utils, cart) {
    return {
        init: function (e) {
            $(e.sender.element).find(".select-group").kendoMobileButtonGroup({
                index: 0,
                select: function (e) {
                    var target = e.sender.element.children(".km-state-active").data("target");
                    utils.navigate(target);
                }
            });
            
            var letterButtonGroup = e.sender.element.find(".buttongroup").kendoMobileListView({
                dataSource: ("ABCDEFGIJKLMNOPQRSTUVWYZ6א").split(""),
                template: $("#artist-filter-template").text()
            });
            letterButtonGroup.removeClass("km-listview km-list").addClass("km-buttongroup");
            var buttonGroupItems = letterButtonGroup.children("li");
            buttonGroupItems.addClass("km-button");
            buttonGroupItems.find("a").removeClass("km-listview-link");
        },
        
        show: function (showEvt) {
            utils.updateCartBadges($, cart);
        },

        navigate: function (clickEvt) {
            utils.closeAllPopovers();
            utils.navigate(clickEvt.target.data().target);
        }
    }
});