define(["jQuery", "config", "utils", "account"], function ($, config, utils, account) {
    var _showError = function (message) {
        viewModel.set("errorMessage", message);
        $("#account-error-view").data().kendoMobileModalView.open();
    };

    var viewModel = kendo.observable({
        userName: account.userName,
        errorMessage: "",
        
        login: function (clickEvt) {
            $.post(config.loginUrl, {
                    UserName: $("#login-UserName").val(),
                    Password: $("#login-Password").val()
            })
            .success(function(data) {
                if (data.isAuthenticated) {
                    document.cookie = ".ASPXAUTH=" + data.authToken;
                    viewModel.set("userName", data.userName);
                    account.isAuthenticated = true;
                    utils.navigate("#account-view");
                } else {
                    _showError("Log in failed.");
                }
            })
            .error(function(data) {
                _showError("Log In failed.");
            });
        },
        
        logout: function (clickEvt) {
            $.post(config.loginUrl)
            .success(function (data) {
                document.cookie = ".ASPXAUTH=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                viewModel.set("userName", null);
                account.isAuthenticated = false;
                utils.navigate("#login-view");
            })
            .error(function(data) {
                _showError("Log off failed.");
            });
        },

        register: function (clickEvt) {
            var pwd = $("#register-Password").val(),
                pwd2 = $("#register-PasswordRetyped").val();
            if(pwd !== pwd2 || pwd === "") {
                _showError("Passwords must match.");
                return;
            }

            $.ajax(config.loginUrl, {
                type: "put",
                data: {
                    UserName: $("#register-UserName").val(),
                    Password: pwd
                }
            })
            .success(function(data) {
                if (data.isAuthenticated) {
                    document.cookie = ".ASPXAUTH=" + data.authToken;
                    viewModel.set("userName", data.userName);
                    account.isAuthenticated = true;
                    utils.navigate("#account-view");
                }
            })
            .error(function(data) {
                _showError("Registration failed.");
            });
        },

        closeErrorModal: function () {
            $("#account-error-view").data().kendoMobileModalView.close();
        }
    });
    
    return {
        beforeShow: function (showEvt) {
            if(!account.isAuthenticated) {
                showEvt.preventDefault();
                utils.navigate("#login-view");
            }
        },

        viewModel: viewModel
    };
});