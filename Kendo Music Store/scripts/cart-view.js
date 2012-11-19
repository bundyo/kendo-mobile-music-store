define(["cart", "templates"], function (cart, templates) {
    "use strict";

    var init = function (initEvt) {
        initEvt.sender.element.find(".listview").kendoMobileListView({
            dataSource: cart.items,
            template: templates.cartListItem
        });
    };

    return {
        init: init
    };
});