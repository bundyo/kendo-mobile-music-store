define(["kendo", "data", "utils", "cart", "albums"], function (kendo, data, utils, cart, albums) {
    var _refreshListViewScrolling = false;

    return {
        show: function (e) {
            var filter = utils.parseQueryStringToObject();
            utils.setViewTitle(e.sender.element, filter.title);
            utils.scrollViewToTop(e.sender.element);

            data.clear(data.albumsList);
            data.albumsList.filter(filter);

            if(_refreshListViewScrolling) {
                utils.reEnableEndlessScrolling(e.view.element.find("ul.km-listview"));
                _refreshListViewScrolling = false;
            }
        },
        
        viewModel: kendo.observable($.extend({
            albums: data.albumsList,
            lastPageReached: function (e) {
                _refreshListViewScrolling = true;
            }
        }, albums.baseAlbumViewModel))
    }
});