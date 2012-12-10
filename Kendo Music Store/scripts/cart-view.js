define(["kendo", "cart", "config", "utils"], function (kendo, cart, config, utils) {
    "use strict";

    var _view;

    var _scrollToTopIfTooFewItemsInCart = function () {
        if(_view.scrollerContent.height() < _view.scroller.element.height()) {
            utils.scrollViewToTop(_view.element);
        }
    };

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
                    _scrollToTopIfTooFewItemsInCart();
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
            _view = initEvt.view
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