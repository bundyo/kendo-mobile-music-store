define(["kendo", "config"], function (kendo, config) {
    var _wcfSchemaData = function (data) {
            return data.value;
        },

        _wcfSchemaTotal = function (data) {
            return data["odata.count"];
        };

    return {
        genresList: new kendo.data.DataSource({
            type: "odata",
            serverPaging: true,
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
            }
        }),
        
        artistsList: new kendo.data.DataSource({
            type: "odata",
            serverSorting: true,
            serverFiltering: true,
            serverPaging: true,
            pageSize: 20,
            transport: {
                read: config.artistsUrl,
            },
            sort: {
                field: "Name",
                dir: "asc"
            },
            schema: {
                data: _wcfSchemaData,
                total: _wcfSchemaTotal
            }
        }),

        albumsList: new kendo.data.DataSource({
            type: "odata",
            serverSorting: true,
            serverFiltering: true,
            serverPaging: true,
            pageSize: 20,
            transport: {
                read: config.albumsUrl + "?$expand=Artist",
            },
            sort: {
                field: "Title",
                dir: "asc"
            },
            schema: {
                data: _wcfSchemaData,
                total: _wcfSchemaTotal
            }
        }),

        searchList: new kendo.data.DataSource({
            type: "odata",
            serverSorting: true,
            serverFiltering: true,
            serverPaging: true,
            pageSize: 20,
            transport: {
                read: config.albumsUrl + "?$expand=Artist",
            },
            sort: {
                field: "Title",
                dir: "asc"
            },
            schema: {
                data: _wcfSchemaData,
                total: _wcfSchemaTotal
            }
        })
    }
});