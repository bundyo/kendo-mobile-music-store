define(["jQuery", "utils", "data"], function ($, utils, data) {
    var _viewElement,
        _searchResultsElement,
        
        _buildSearchFilter = function (term) {
            return {
                logic: "or",
                filters: [
                    {field: "Title", operator: "contains", value: term},
                    {field: "Artist.Name", operator: "contains", value: term}
                ]
            };
        };

        _submitSearch = function (e) {
            var oldList, filter;

            utils.scrollViewToTop(_viewElement);
            
            oldList = _searchResultsElement.data("kendoMobileListView");
            if(oldList) {
                oldList.destroy();
            }
            
            filter = _buildSearchFilter(e.target.value);
            _searchResultsElement.kendoMobileListView({
                dataSource: data.albumsFor(filter),
                template: $("#album-list-template").text(),
                style: "inset",
                endlessScroll: true
            });
        };

    return {
        init: function (initEvent) {
            _viewElement = initEvent.sender.element;
            _viewElement.find("input").change(_submitSearch);
            _searchResultsElement = initEvent.sender.element.find(".listview");
        }
    }
});