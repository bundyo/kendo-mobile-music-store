define(["jQuery", "kendo"], function ($, kendo) {
    "use strict";

    var base = kendo.mobile.ui.ListView;
    var that;
    var _indexList = $('<ul class="km-listview-index"></ul>');
    var _scrollWrapper;
    var _prevIndex = undefined;

    var getHeaderClassFor = function (value) {
        return "index-" + value.replace("#", "_num_").replace(".", "_dot_");
    };

    var _scrollToIndex = function (targetIndex) {
        var target = that.element.find("." + getHeaderClassFor(targetIndex));
        var targetTop = target.closest(".km-group-title").position().top;
        var currentScrollPosition = that._scroller().scrollTop || 0;
        that._scroller().scrollTo(0, (currentScrollPosition + targetTop) * -1);
    };

    var _onIndexItemTouchMove = function (e) {
        var targetIndex = $(e.target).data("group-class");
        if(_prevIndex !== targetIndex) {
            _prevIndex = targetIndex;
            _scrollToIndex(targetIndex);
        }
        e.preventDefault();
        return false;
    };

    var _onIndexItemTouchStart = function (e) {
        _prevIndex = undefined;
        _indexList.addClass("km-ontouch");
        e.preventDefault();
        return false;
    };

    var _onIndexItemTouchEnd = function (e) {
        _prevIndex = undefined;
        _indexList.removeClass("km-ontouch");
        e.preventDefault();
        return false;
    };

    var _createIndexList = function (items) {
        $.each(items, function (index, item) {
            var newElement = $('<li data-group-class="' + item.value + '">' + item.value + '</li>');
            newElement.bind("touchmove", _onIndexItemTouchMove);
            newElement.bind("touchstart", _onIndexItemTouchStart);
            newElement.bind("touchend", _onIndexItemTouchEnd);
            _indexList.append(newElement);
        });
    };

    var IndexedListView = base.extend({
        init: function(element, options) {
            that = this;

            options.headerTemplate = '<span class="index-#:data.value#"></span>' + (options.headerTemplate || this.options.headerTemplate);
    
            base.fn.init.call(that, element, options);

            _scrollWrapper = $(element).closest(".km-scroll-wrapper");
            _scrollWrapper.prepend(_indexList);
        },

        options: $.extend(base.options, {
            name: "IndexedListView"
        }),

        refresh: function (e) {
            base.fn.refresh.call(that, e);

            if (that.dataSource.group()[0]) {
                _indexList.empty();
                
                var itemHeight = Math.floor((_scrollWrapper.height() - 20) / e.items.length - 3);
                _indexList.css("font-size", itemHeight + "px");
                
                _createIndexList(e.items);
            }
        },

        getHeaderClassFor: getHeaderClassFor
    });

    kendo.mobile.ui.plugin(IndexedListView);
    return {};
});