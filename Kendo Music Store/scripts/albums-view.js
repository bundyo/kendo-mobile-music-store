define(["jQuery", "kendo", "data", "config", "utils", "cart"], function ($, kendo, data, config, utils, cart) {
    return {
        show: function (e) {
            var filter = utils.parseQueryStringToObject();
            utils.setViewTitle(e.sender.element, filter.title);
            utils.scrollViewToTop(e.sender.element);

            data.clear(data.albumsList);
            data.albumsList.filter(filter);
        },
        
        viewModel: kendo.observable({
            albums: data.albumsList,
            onAddToCart: function (clickEvt) {
                var uid = clickEvt.sender.element.parents("li").data("uid");
                var album = data.albumsList.getByUid(uid);
                cart.add(album);
            },
            albumPrice: function (album) {
                return kendo.toString(parseFloat(album.get("Price")), "c");
            },
            albumArtUrl: function (album) {
                return config.serverUrl + album.get("AlbumArtUrl");
            },
            qtyInCart: function (album) {
                var cartItem = cart.find(album.get("AlbumId"));
                if(cartItem) {
                    return cartItem.get("qty");
                } else {
                    return "";
                }
            },
            buttonClasses: function (album) {
                //var cartItem = cart.find(album.get("AlbumId"));
                if(this.qtyInCart(album) !== "") {
                    return "km-icon cartQty";
                } else {
                    return "km-icon km-add";
                }
            }
        })
    }
});