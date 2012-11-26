define(["jQuery", "kendo", "config", "utils", "data", "cart"], function ($, kendo, config, utils, data, cart) {
    var _viewElement,
        
        _buildSearchFilter = function (term) {
            return {
                logic: "or",
                filters: [
                    {field: "Title", operator: "contains", value: term},
                    {field: "Artist.Name", operator: "contains", value: term}
                ]
            };
        },

        submitSearch = function (e) {
            var filter;

            utils.scrollViewToTop(_viewElement);
            
            filter = _buildSearchFilter(_viewElement.find(".search-text").val());
            data.searchList.filter(filter);
        };

    return {
        init: function (initEvent) {
            _viewElement = initEvent.sender.element;
            _viewElement.find(".search-text").change(submitSearch);
        },

        viewModel: kendo.observable({
            results: data.searchList,
            submitSearch: submitSearch,
            onAddToCart: function (clickEvt) {
                var uid = clickEvt.sender.element.parents("li").data("uid");
                var album = data.searchList.getByUid(uid);
                cart.add(album);
            },
            albumPrice: function (album) {
                return kendo.toString(parseFloat(album.get("Price")), "c");
            },
            albumArtUrl: function (album) {
                return config.serverUrl + album.get("AlbumArtUrl");
            }
        })
    }
});