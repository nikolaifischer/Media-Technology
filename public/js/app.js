angular.module('mtPlanr',
    ['ngRoute', 'appRoutes', 'lbServices', 'MainCtrl', 'HomeCtrl', 'LoginCtrl', 'ProfileCtrl', 'ngMaterial']);


angular.module('mtPlanr').config(function (LoopBackResourceProvider) {

    // From example - Do we need this?
    // Use a custom auth header instead of the default 'Authorization'
    //LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
});

angular.module('mtPlanr')
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('red');
    });

// when route changes, check if user is logged in and redirect
angular.module('mtPlanr')
    .run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
        $rootScope.$on('$routeChangeStart', function () {
            if ($window.sessionStorage.token != null) {
                //$location.path('/home');
            }
            else {
                $location.path('/login');
            }
        });
    }]);