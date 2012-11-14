var config = (function () {
    var serverUrl = "http://kmstest.apphb.com",
        serviceUrl = serverUrl + "/Services/MusicStore.svc";
    
    return {
        baseUrl: serverUrl,
        serviceUrl: serviceUrl,
        genresUrl: serviceUrl + "/Genres",
        artistsUrl: serviceUrl + "/Artists",
        albumsUrl: serviceUrl + "/Albums"
    };
})();