define(["jQuery", "kendo", "config", "utils"], function ($, kendo, config, utils) {
    var _wcfSchemaData = function (data) {
            return data.value;
        },

        _wcfSchemaTotal = function (data) {
            return data["odata.count"];
        };
    
    var DataSourceConfig = function (url, sortField) {
        this.transport = {
            read: url
        };
        this.sort = {
            field: sortField,
            dir: "asc"
        };
    };
    
    DataSourceConfig.prototype = {
        type: "odata",
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true,
        pageSize: 20,
        transport: {
            read: config.genresUrl,
        },
        sort: {
            field: "Name",
            dir: "asc"
        },
        schema: {
            data: _wcfSchemaData,
            total: _wcfSchemaTotal
        },
        requestStart: function () { if (this.page() === 1) { utils.showLoading(); }}, //infinite scrolling has its own, less obtrusive indicator
        requestEnd: function () { if (this.page() === 1) { utils.hideLoading(); }}
    }


    return {
        clear: function (dataSource) {
            dataSource.view().splice(0, dataSource.view().length);
        },
        
        genresList: new kendo.data.DataSource(new DataSourceConfig(config.genresUrl, "Name")),
        
        artistsList: new kendo.data.DataSource(new DataSourceConfig(config.artistsUrl, "Name")),

        albumsList: new kendo.data.DataSource(new DataSourceConfig(config.albumsUrl + "?$expand=Artist", "Title")),

        searchList: new kendo.data.DataSource(new DataSourceConfig(config.albumsUrl + "?$expand=Artist", "Title"))
    }
});