define([], function () {
    var domain = "www.kendouimusicstore.com",
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
        cartSubmitUrl: serverUrl + "/Api/CheckoutApi",
        orderHistoryUrl: serverUrl + "/OrderHistory"
    };
});