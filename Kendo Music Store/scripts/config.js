var config = (function () {
    var serverUrl = "http://kmstest.apphb.com",
        serviceUrl = serverUrl + "/Services/MusicStore.svc";
    
    return {
        serverUrl: serverUrl,
        serviceUrl: serviceUrl,
        genresUrl: serviceUrl + "/Genres",
        artistsUrl: serviceUrl + "/Artists",
        albumsUrl: serviceUrl + "/Albums"
    };
})();