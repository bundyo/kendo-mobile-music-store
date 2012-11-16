define(["jQuery", "kendo", "utils", "data"], function ($, kendo, utils, data) {
    var _selectedArtistFilter = "A";

    return {
        init: function (e) {
            var scroller = e.sender.element.data("kendoMobileView").scroller;
            var listView = e.sender.element.find(".listview");
        },
        
        beforeShow: function (e) {
            $("#artists-filter-header").show();
            var query = utils.parseQueryStringToObject();
            if(query.value) {
                _selectedArtistFilter = query.value;
                utils.scrollViewToTop(e.sender.element);
                e.preventDefault();
                utils.navigate("#artists-view");
            }
        },
        
        show: function (e) {
            e.sender.element.find(".buttongroup.km-buttongroup .km-button").removeClass("km-state-active");
            e.sender.element.find("#" + _selectedArtistFilter).parents(".km-button").addClass("km-state-active");
            
            var oldList = $(e.sender.element).find(".listview").data("kendoMobileListView");
            if (oldList) {
                oldList.destroy();
            }
            
            $(e.sender.element).find(".listview").kendoMobileListView({
                dataSource: data.artistsStartingWith(_selectedArtistFilter.toString()),
                template: $("#artist-list-template").text(),
                style: "inset",
                endlessScroll: true
            });
        }
    };
});