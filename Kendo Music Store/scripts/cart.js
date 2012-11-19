define(["kendo"], function (kendo) {
    "use strict";

    var cartItems = new kendo.data.DataSource({
            schema: {
                model: {
                    id: "albumId",
                    fields: {
                        albumId: {
                            type: "number"
                        },
                        qty: {
                            defaultValue: 1,
                            type: "number"
                        }
                    }
                }
            }
        }),

        findAlbum = function (albumId) {
            return cartItems.get(albumId);
        },

        addAlbum = function (clickEvt) {
            var albumId = parseInt(clickEvt.sender.element.data("album-id"));
            var existing = findAlbum(albumId);
            if(existing) {
                existing.qty = existing.qty + 1;
            } else {
                cartItems.add({ albumId: albumId, qty: 1 });
            }
        };

    return {
        items: cartItems,
        add: addAlbum,
        find: findAlbum
    };
});