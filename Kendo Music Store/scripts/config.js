define([], function () {
    var domain = "localhost:59537",
    //var domain = "kmstest.apphb.com",
        serverUrl = "http://" + domain,
        serviceUrl = serverUrl + "/Services/MusicStore.svc";
    
    return {
        domain: domain,
        serverUrl: serverUrl,
        serviceUrl: serviceUrl,
        genresUrl: serviceUrl + "/Genres",
        artistsUrl: serviceUrl + "/Artists",
        albumsUrl: serviceUrl + "/Albums",
        loginUrl: serverUrl + "/Api/AccountApi",
        cartSubmitUrl: serverUrl + "/Api/CheckoutApi"
    };
});