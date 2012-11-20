var app;

require.config({
	paths: {
	    jQuery: "../kendo/js/jquery.min",
		kendo: "../kendo/js/kendo.mobile.min"
	},
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