define(["jQuery", "kendo", "data", "config", "utils", "cart", "home-layout", "base-layout", "artists-view", "genres-view", "albums-view", "search-view", "cart-view", "account-view"],
       function($, kendo, data, config, utils, cart, homeLayout, baseLayout, artistsView, genresView, albumsView, searchView, cartView, accountView) {

    var init = function () {
        var kendoApp = new kendo.mobile.Application(document.body, { transition: "fade", layout: "mobile-tabstrip" });
        utils.init(kendoApp);
        cart.items.bind("change", function () { utils.updateCartBadges($, cart) });
    };

    return {
        config: config,
        init: init,
        homeLayout: homeLayout,
        baseLayout: baseLayout,
        albumsView: albumsView,
        artistsView: artistsView,
        genresView: genresView,
        searchView: searchView,
        cartView: cartView,
        accountView: accountView
    };
});