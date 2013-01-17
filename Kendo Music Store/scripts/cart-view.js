define(["jQuery", "kendo", "cart", "config", "utils"], function ($, kendo, cart, config, utils) {
    "use strict";

    var _view;

    var _scrollToTopIfTooFewItemsInCart = function () {
        if(_view.scrollerContent.height() < _view.scroller.element.height()) {
            utils.scrollViewToTop(_view.element);
        }
    };

    var onRemove = function (clickEvt) {
            var element = clickEvt.sender.element;
            var li = element.parents("li");
            var uid = li.data("uid");

            var animation = {
                "opacity": 0
            };

            li.animate(animation,
                300,
                function () {
                    cart.items.remove(cart.items.getByUid(uid));
                    _scrollToTopIfTooFewItemsInCart();
                });
        },

        onToggleDeleteMode = function (evt) {
            var element = evt.sender.element;
            var li = element.parents("li");
            var uid = li.data("uid");
            var cartItem = cart.items.getByUid(uid);

            cartItem.set("deleteMode", !cartItem.deleteMode);
        },

        viewModel = kendo.observable({
            items: cart.items,
            cartHasItems: false,
            cart: cart,

            isAndroid: function () {
                return $("body").hasClass("km-android");
            },

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
            viewModel.set("cartHasItems", cart.items.view().length > 0);
            cart.items.bind("change", function () {
                viewModel.set("cartHasItems", cart.items.view().length > 0);
            });
        },

        layoutShow = function () {
            utils.updateCartBadges($, cart);
        };

    return {
        init: init,
        layoutShow: layoutShow,
        onRemove: onRemove,
        onToggleDeleteMode: onToggleDeleteMode,
        viewModel: viewModel
    };
});