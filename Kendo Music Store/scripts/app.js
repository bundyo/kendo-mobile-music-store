define(["jQuery", "kendo", "data", "config", "utils", "home-layout", "artists-view", "genres-view", "albums-view", "search-view", "cart-view"],
       function($, kendo, data, config, utils, homeLayout, artistsView, genresView, albumsView, searchView, cartView) {

    var init = function () {
            var kendoApp = new kendo.mobile.Application(document.body, { transition: "fade", layout: "mobile-tabstrip" });
            utils.init(kendoApp);
        };

    return {
        config: config,
        init: init,
        homeLayout: homeLayout,
        albumsView: albumsView,
        artistsView: artistsView,
        genresView: genresView,
        searchView: searchView,
        cartView: cartView
    };
});