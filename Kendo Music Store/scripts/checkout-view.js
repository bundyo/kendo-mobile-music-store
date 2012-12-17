define(["jQuery", "kendo", "config", "utils", "cart", "account"], function ($, kendo, config, utils, cart, account) {
    "use strict";

    var _submitting = false;

    var _buildCartData = function (viewModel) {
        var data = {
            Order: {
                OrderId: 0,
                FirstName: viewModel.firstName,
                LastName: viewModel.lastName,
                Address: viewModel.address,
                City: viewModel.city,
                State: viewModel.state,
                PostalCode: viewModel.zip,
                Country: viewModel.country,
                Phone: viewModel.phone,
                Email: viewModel.email
            },
            Items: [],
            Login: {
                UserName: account.userName,
                Password: account.password
            }
        }
        
        var cartItems = cart.items.view();
        for(var i = 0; i < cartItems.length; i++) {
            data.Items.push({albumId: cartItems[i].album.AlbumId, quantity: cartItems[i].qty});
        }
        
        return data;
    };

    var _clearForm = function (viewModel) {
        viewModel.set("firstName", "");
        viewModel.set("lastName", "");
        viewModel.set("address", "");
        viewModel.set("city", "");
        viewModel.set("state", "");
        viewModel.set("zip", "");
        viewModel.set("country", "");
        viewModel.set("phone", "");
        viewModel.set("email", "");
    }
    
    return {
        viewModel: kendo.observable({
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            phone: "",
            email: "",
            
            submit: function (clickEvt) {
                var viewModel = this;
                if(_submitting) {
                    return;
                }

                if(!$(".validate").data("kendoValidator").validate()) {
                    return;
                }
                
                _submitting = true;
                utils.showLoading("Submitting...");
                $.post(config.cartSubmitUrl, _buildCartData(viewModel))
                .done(function(data) {
                    _submitting = false;
                    utils.hideLoading();
                    console.log("submit");
                    if(data.error === undefined || data.error === "") {
                        cart.clear();
                        _clearForm(viewModel);
                        utils.navigate("#checkout-complete-view");
                    } else {
                        utils.showError(data.error);
                    }
                })
                .fail(function(error) {
                    _submitting = false;
                    utils.hideLoading();
                    utils.showError("There was an error submitting your order.", error);
                });
            }
        }),

        beforeShow: function (showEvent) {
            if(cart.items.view().length == 0) {
                showEvent.preventDefault();
                utils.redirect("#cart-view");
                return;
            }

            if (!account.isAuthenticated){
                showEvent.preventDefault();
                utils.redirect("#login-view?navto=checkout-view");
                return;
            }
        }
    }
});