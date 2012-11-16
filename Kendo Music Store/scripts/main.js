var app;

require.config({
    shim: {
        jQuery: {
            exports: "jQuery"
        },
        kendo: {
            exports: "kendo"
        }
    }
});

require(["jQuery", "app"], function($, application) {
    $(function() {
        app = application
        application.init();
    });
});