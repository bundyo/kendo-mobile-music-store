define(["kendo", "config"], function (kendo, config) {
    var _wcfSchemaData = function (data) {
        return data.value;
    };
        
    var _wcfSchemaTotal = function (data) {
        return data["odata.count"];
    };

    var genresList = new kendo.data.DataSource({
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
    });
    
   
    var artistsStartingWith = function (filter) {
        return new kendo.data.DataSource({
            type: "odata",
            serverSorting: true,
            serverFiltering: true,
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
    
    var albumsFor = function (filter) {
        return new kendo.data.DataSource({
            type: "odata",
            serverSorting: true,
            serverPaging: true,
            serverFiltering: true,
            pageSize: 20,
            transport: {
                read: config.albumsUrl + "?$expand=Artist",
            },
            filter: filter,
            sort: {
                field: "Title",
                dir: "asc"
            },
            schema: {
                data: _wcfSchemaData,
                total: _wcfSchemaTotal
            }
        });
    };

    //function (term) { return {logic: "or", filters: [{field: "Title", operator: "contains", value: term}, {field: "Artist.Name", operator: "contains", value: term}] }; };
    
    return {
        genresList: genresList,
        artistsStartingWith: artistsStartingWith,
        albumsFor: albumsFor
    }
});