define(["jQuery", "config", "utils", "account"], function ($, config, utils, account) {
    var viewModel = kendo.observable({
        userName: account.userName,
        
        login: function (clickEvt) {
            $.post(config.loginUrl, {
                    UserName: "owner",
                    Password: "p@ssword123"
            })
            .success(function(data) {
                if (data.isAuthenticated) {
                    document.cookie = ".ASPXAUTH=" + data.authToken;
                    viewModel.set("userName", data.userName);
                    account.isAuthenticated = true;
                    utils.navigate("#account-view");
                }
            })
            .error(function(data) { alert("Login failed."); });
        },
        
        logout: function (clickEvt) {
            $.post(config.logoutUrl)
            .success(function (data) {
                document.cookie = ".ASPXAUTH=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                viewModel.set("userName", null);
                account.isAuthenticated = false;
                utils.navigate("#login-view");
            })
            .error(function () {
               alert("Logoff failed."); 
            });
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