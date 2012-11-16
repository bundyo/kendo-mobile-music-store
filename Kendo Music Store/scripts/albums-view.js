define(["jQuery", "data", "utils"], function ($, data, utils) {
    return {
        show: function (e) {
            var filter = utils.parseQueryStringToObject();
            utils.setViewTitle(e.sender.element, filter.title);
            utils.scrollViewToTop(e.sender.element);
            
            var oldList = $(e.sender.element).find(".listview").data("kendoMobileListView");
            if (oldList) {
                oldList.destroy();
            }
            
            $(e.sender.element).find(".listview").kendoMobileListView({
                dataSource: data.albumsFor(filter),
                template: $("#album-list-template").text(),
                style: "inset",
                endlessScroll: true
            });
        }
    }
});