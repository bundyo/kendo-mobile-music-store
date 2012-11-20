define(["jQuery", "data", "utils", "templates", "cart"], function ($, data, utils, templates, cart) {
    return {
        beforeShow: function (e) {
            var oldList = e.sender.element.find(".listview").data("kendoMobileListView");
            if (oldList) {
                oldList.destroy();
            }
        },

        show: function (e) {
            var filter = utils.parseQueryStringToObject();
            utils.setViewTitle(e.sender.element, filter.title);
            utils.scrollViewToTop(e.sender.element);
            
            $(e.sender.element).find(".listview").kendoMobileListView({
                dataSource: data.albumsFor(filter),
                template: templates.albumListItem,
                style: "inset",
                endlessScroll: true
            });
        },

        onAddToCart: function (clickEvt) {
            var data = clickEvt.sender.element.parents(".listview").data("kendoMobileListView").dataSource;
            var uid = clickEvt.sender.element.parents("li").data("uid");
            var album = data.getByUid(uid);
            cart.add(album);
        }
    }
});