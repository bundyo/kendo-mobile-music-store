define(["jQuery", "config", "utils", "account"], function ($, config, utils, account) {
    var _showError = function (message, error) {
        viewModel.set("errorMessage", message + (error === undefined ? "" : "\n" + error.status + ": " + error.statusText));
        $("#account-error-view").show().data().kendoMobileModalView.open();
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
            .error(function(error) {
                _showError("Log In failed.", error);
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
            .error(function(error) {
                _showError("Log off failed.", error);
            });
        },

        register: function (clickEvt) {
            var name = $("#register-UserName").val(),
                pwd = $("#register-Password").val(),
                pwd2 = $("#register-PasswordRetyped").val();
            
            if (name === ""){
                _showError("Name must not be empty.");
                return;
            } else if(pwd === "" || pwd !== pwd2) {
                _showError("Passwords must match.");
                return;
            }

            $.ajax(config.loginUrl, {
                type: "put",
                data: {
                    UserName: name,
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
            .error(function(error) {
                _showError("Registration failed.", error);
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