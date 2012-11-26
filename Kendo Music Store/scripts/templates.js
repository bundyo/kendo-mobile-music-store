define(["jQuery", "kendo"], function ($, kendo) {
    "use strict";

    var _getText = function (selector) {
            return $(selector).text().trim();
        },

        _getFunc = function (selector) {
            return kendo.template(_getText(selector));
        };

    return {
        genreListItem: _getText("#genre-list-template"),
        artistListItem: _getText("#artist-list-template"),
        albumListItem: _getText("#album-list-template")
    };
});