define(["jQuery", "kendo", "utils", "data"], function ($, kendo, utils, data) {
    return {
        init: function (e) {
            var scroller = e.sender.element.data("kendoMobileView").scroller;
            var listView = e.sender.element.find(".listview");
        },
        
        show: function (e) {
            var selectedArtistFilter = "A";
            if(e.view.params.value) {
                selectedArtistFilter = e.view.params.value;
            }
            $(".artists-filter-header").show();
            utils.scrollViewToTop(e.view.element);
            e.sender.element.find(".buttongroup.km-buttongroup .km-button").removeClass("km-state-active");
            e.sender.element.find("#" + selectedArtistFilter).parents(".km-button").addClass("km-state-active");
            
            data.clear(data.artistsList);
            data.artistsList.filter({
                field: "Name",
                operator: "startswith",
                value: selectedArtistFilter.toString()
            });
        },

        viewModel: kendo.observable({
            artists: data.artistsList
        })
    };
});