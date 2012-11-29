define(["kendo", "config", "utils", "cart", "account"], function (kendo, config, utils, cart, account) {
    "use strict";
    
    return {
        viewModel: kendo.observable(),
        beforeShow: function (showEvent) {
            if(cart.items.view().length == 0) {
                showEvent.preventDefault();
                utils.navigate("#cart-view");
                return;
            }

            if (!account.isAuthenticated){
                showEvent.preventDefault();
                utils.navigate("#login-view?navto=checkout-view");
                return;
            }
        }
    }
});