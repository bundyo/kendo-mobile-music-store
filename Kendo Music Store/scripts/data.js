define(["jQuery", "kendo", "config", "utils"], function ($, kendo, config, utils) {
    var _wcfSchemaData = function (data) {
            return data.value;
        },

        _wcfSchemaTotal = function (data) {
            return data["odata.count"];
        };
    
    var DataSourceConfig = function (url, sortField, options) {
        this.transport = {
            read: url
        };
        this.sort = {
            field: sortField,
            dir: "asc"
        };
        $.extend(this, options || {});
    };
    
    DataSourceConfig.prototype = {
        type: "odata",
        schema: {
            data: _wcfSchemaData,
            total: _wcfSchemaTotal
        },
        requestStart: function () { if (this.page() === 1) { utils.showLoading(); }}, //infinite scrolling has its own, less obtrusive indicator
        requestEnd: function () { if (this.page() === 1) { utils.hideLoading(); }}
    };

    var EndlessScrollDataSource = kendo.data.DataSource.extend({
        _observe: function(data) {
            if(this._page > 1) {
                this._data.push.apply(this._data, data);
                return this._data;
            }
            return kendo.data.DataSource.prototype._observe.call(this, data);
        }
    });

    return {
        clear: function (dataSource) {
            dataSource.view().splice(0, dataSource.view().length);
        },
        
        genresList: new kendo.data.DataSource(new DataSourceConfig(config.genresUrl, "Name")),
        
        artistsList: new kendo.data.DataSource(new DataSourceConfig(config.artistsUrl, "Name", {
            serverFiltering: true,
            serverSorting: true
        })),

        albumsList: new EndlessScrollDataSource(new DataSourceConfig(config.albumsUrl + "?$expand=Artist", "Title", {
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
            pageSize: 20
        })),

        searchList: new EndlessScrollDataSource(new DataSourceConfig(config.albumsUrl + "?$expand=Artist", "Title", {
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
            pageSize: 20
        }))
    };
});