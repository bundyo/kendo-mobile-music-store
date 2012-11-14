var data = (function (kendo, config) {
    var _wcfSchemaData = function (data) {
            return data.value;
        },
            
        _wcfSchemaTotal = function (data) {
            return data["odata.count"];
        },

        genresList = new kendo.data.DataSource({
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
        
        artistsList = new kendo.data.DataSource({
            type: "odata",
            serverPaging: true,
            serverSorting: true,
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
        
        artistsStartingWith = function (filter) {
            return new kendo.data.DataSource({
                type: "odata",
                serverSorting: true,
                transport: {
                    read: config.artistsUrl,
                },
                filter: {
                    field: "Name",
                    operator: "startswith",
                    value: filter
                },
                sort: {
                    field: "Name",
                    dir: "asc"
                },
                schema: {
                    data: _wcfSchemaData,
                    total: _wcfSchemaTotal
                }
            });
        };

    return {
        genresList: genresList,
        artistsList: artistsList,
        artistsStartingWith: artistsStartingWith
    }
})(kendo, config);