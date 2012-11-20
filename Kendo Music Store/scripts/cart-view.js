define(["kendo", "cart", "templates"], function (kendo, cart, templates) {
    "use strict";

    var init = function (initEvt) {
            initEvt.sender.element.find(".listview").kendoMobileListView({
                dataSource: cart.items,
                template: templates.cartListItem,
                style: "inset"
            });
            
            kendo.bind(initEvt.sender.element.find(".total"), cart.aggregates, kendo.mobile.ui);
        },

        onRemove = function (swipeEvt) {
            var uid = swipeEvt.sender.element.parents("li").data("uid");
            cart.items.remove(cart.items.getByUid(uid));
        };

    return {
        init: init,
        onRemove: onRemove
    };
});