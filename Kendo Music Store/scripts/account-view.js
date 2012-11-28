define(["jQuery", "config", "utils", "account"], function ($, config, utils, account) {
    return {
        beforeShow: function (showEvt) {
            if(!account.isAuthenticated) {
                utils.navigate("#login-view");
            }
        },

        viewModel: kendo.observable({
            account: account,

            login: function (clickEvt) {
                $.post(config.loginUrl, {
                        UserName: "owner",
                        Password: "p@ssword123"
                })
                .success(function(data) { document.cookie = ".ASPXAUTH=" + data.authToken; })
                .error(function(data) { debugger; });
            }
        })
    };
});