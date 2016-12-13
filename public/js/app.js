angular.module('MediaTechnology',
    ['ngRoute', 'appRoutes', 'lbServices', 'MainCtrl', 'NerdCtrl', 'NerdService', 'GeekCtrl', 'GeekService', 'LoginCtrl','ngMaterial']);


angular.module('MediaTechnology').config(function(LoopBackResourceProvider) {

    // From example - Do we need this?
    // Use a custom auth header instead of the default 'Authorization'
    //LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
});

angular.module('MediaTechnology')
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal');
    });