define([], function () {
    var serverUrl = "http://www.kendouimusicstore.com",
        serviceUrl = serverUrl + "/Services/MusicStore.svc";
    
    return {
        serverUrl: serverUrl,
        serviceUrl: serviceUrl,
        genresUrl: serviceUrl + "/Genres",
        artistsUrl: serviceUrl + "/Artists",
        albumsUrl: serviceUrl + "/Albums"
    };
});