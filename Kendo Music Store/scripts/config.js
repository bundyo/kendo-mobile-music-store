define([], function () {
    var serverUrl = "http://localhost:59537",
        serviceUrl = serverUrl + "/Services/MusicStore.svc";
    
    return {
        serverUrl: serverUrl,
        serviceUrl: serviceUrl,
        genresUrl: serviceUrl + "/Genres",
        artistsUrl: serviceUrl + "/Artists",
        albumsUrl: serviceUrl + "/Albums",
        loginUrl: serverUrl + "/Api/AccountApi"
    };
});