define(["jQuery", "kendo"], function ($, kendo) {
    "use strict";
    
    var cartAggregates = kendo.observable({
        total: 0,
        formattedTotal: function () {
            return kendo.toString(this.get("total"), "c");
        }
    });
    
    var cartItems = new kendo.data.DataSource({
            data: [],
            change: function () {
                var totalPrice = 0;
                var albums = cartItems.data();
                for (var i = 0; i < albums.length; i++) {
                    var cartEntry = albums[i];
                    totalPrice += cartEntry.get("qty") * cartEntry.get("album.Price");
                }
                cartAggregates.set("total", totalPrice);
            }
        }),

        findAlbum = function (albumId) {
            var data = cartItems.data();
            for(var i = 0; i < data.length; i++) {
                if(data[i].album.AlbumId === albumId) {
                    return data[i];
                }
            }
            return undefined;
        },

        addAlbum = function (album) {
            var existing = findAlbum(album.AlbumId);
            if(existing) {
                existing.set("qty", existing.qty + 1);
            } else {
                cartItems.add({ album: $.extend(true, {}, album), qty: 1 });
            }
        };

    return {
        items: cartItems,
        add: addAlbum,
        find: findAlbum,
        aggregates: cartAggregates
    };
});