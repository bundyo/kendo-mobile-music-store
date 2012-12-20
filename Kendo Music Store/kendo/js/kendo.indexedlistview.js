define(["jQuery", "kendo"], function ($, kendo) {
    "use strict";

    var base = kendo.mobile.ui.ListView;
    var that;
    var _indexList = $('<ul class="km-listview-index"></ul>');
    var _scrollWrapper;
    var _prevIndex = undefined;

    var _scrollToIndex = function (targetIndex) {
        var target = that.element.find(".index-" + targetIndex);
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
        return false;
    };

    var _onIndexItemTouchStart = function () {
        _prevIndex = undefined;
        return true;
    };

    var _onIndexItemTouchEnd = function () {
        _prevIndex = undefined;
        return false;
    };

    var _createIndexList = function (items) {
        $.each(items, function (index, item) {
            var newElement = $("<li data-group-class=" + item.value + ">" + item.value + "</li>");
            newElement.bind("touchmove", _onIndexItemTouchMove);
            newElement.bind("touchstart", _onIndexItemTouchStart);
            newElement.bind("touchend", _onIndexItemTouchEnd);
            _indexList.append(newElement);
        });
    };

    var IndexedListView = base.extend({
        init: function(element, options) {
            that = this;
    
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
                _createIndexList(e.items);
            }
        }
    });

    kendo.mobile.ui.plugin(IndexedListView);
    return {};
});