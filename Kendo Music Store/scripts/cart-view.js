define(["kendo", "cart", "config"], function (kendo, cart, config) {
    "use strict";

    var init = function (initEvt) {
            kendo.bind(initEvt.sender.element.find(".total"), cart.aggregates, kendo.mobile.ui);
        },

        onRemove = function (swipeEvt) {
            var uid = swipeEvt.sender.element.parents("li").data("uid");
            cart.items.remove(cart.items.getByUid(uid));
        },

        viewModel = kendo.observable({
            items: cart.items,
            albumPrice: function (cartItem) {
                return kendo.toString(parseFloat(cartItem.album.get("Price")), "c");
            },
            albumArtUrl: function (cartItem) {
                return config.serverUrl + cartItem.album.get("AlbumArtUrl");
            },
            albumSubtotal: function (cartItem) {
                return kendo.toString(parseFloat(cartItem.album.get("Price")) * cartItem.get("qty"), "c");
            }
        });

    return {
        init: init,
        onRemove: onRemove,
        viewModel: viewModel
    };
});