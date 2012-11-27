define(["kendo", "data", "utils", "cart", "albums"], function (kendo, data, utils, cart, albums) {
    return {
        show: function (e) {
            var filter = utils.parseQueryStringToObject();
            utils.setViewTitle(e.sender.element, filter.title);
            utils.scrollViewToTop(e.sender.element);

            data.clear(data.albumsList);
            data.albumsList.filter(filter);
        },
        
        viewModel: kendo.observable($.extend({
            albums: data.albumsList
        }, albums.baseAlbumViewModel))
    }
});