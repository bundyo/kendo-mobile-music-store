define(["kendo", "cart", "templates"], function (kendo, cart, templates) {
    "use strict";

    var init = function (initEvt) {
        initEvt.sender.element.find(".listview").kendoMobileListView({
            dataSource: cart.items,
            template: templates.cartListItem
        });
        
        kendo.bind(initEvt.sender.element.find(".total"), cart.aggregates, kendo.mobile.ui);
    };

    return {
        init: init
    };
});