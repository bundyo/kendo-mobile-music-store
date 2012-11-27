define(["kendo", "cart", "config"], function (kendo, cart, config) {
    return {
        baseAlbumViewModel: {
            onAddToCart: function (clickEvt) {
                var album = clickEvt.data;
                cart.add(album);

                // force refresh of data bindings.
                var aid = album.get("AlbumId");
                album.set("AlbumId", -1);
                album.set("AlbumId", aid);
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
                if(this.qtyInCart(album) !== "") {
                    return "km-icon cartQty";
                } else {
                    return "km-icon km-add";
                }
            }
        }
    };
});