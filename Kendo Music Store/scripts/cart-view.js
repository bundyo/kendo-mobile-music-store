define(["kendo", "cart", "config"], function (kendo, cart, config) {
    "use strict";

    var onRemove = function (swipeEvt) {
            var element = swipeEvt.sender.element;
            var li = element.parents("li");
            var uid = li.data("uid");

            var animation = {
                "margin-left": li.width(),
                "margin-right": -li.width(),
                "opacity": 0
            };
            if(swipeEvt.direction === "left") {
                animation = {
                    "margin-left": -li.width(),
                    "margin-right": li.width(),
                    "opacity": 0
                }
            }

            li.animate(animation,
                300,
                function () {
                    cart.items.remove(cart.items.getByUid(uid));
                });
        },

        viewModel = kendo.observable({
            items: cart.items,
            cartHasItems: false,

            albumPrice: function (cartItem) {
                return kendo.toString(parseFloat(cartItem.album.get("Price")), "c");
            },
            albumArtUrl: function (cartItem) {
                return config.serverUrl + cartItem.album.get("AlbumArtUrl");
            },
            albumSubtotal: function (cartItem) {
                return kendo.toString(parseFloat(cartItem.album.get("Price")) * cartItem.get("qty"), "c");
            }
        }),

        init = function (initEvt) {
            kendo.bind(initEvt.sender.element.find(".total"), cart.aggregates, kendo.mobile.ui);
            viewModel.set("cartHasItems", cart.items.view().length > 0);
            cart.items.bind("change", function () {
                viewModel.set("cartHasItems", cart.items.view().length > 0);
            });
        };

    return {
        init: init,
        onRemove: onRemove,
        viewModel: viewModel
    };
});