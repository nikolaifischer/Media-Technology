angular.module('mtPlanr',
    ['ngRoute', 'appRoutes', 'lbServices', 'MainCtrl', 'HomeCtrl', 'LoginCtrl', 'ProfileCtrl', 'ngMaterial', 'materialCalendar', 'textAngular']);


angular.module('mtPlanr').config(function (LoopBackResourceProvider, $provide) {

    // From example - Do we need this?
    // Use a custom auth header instead of the default 'Authorization'
    //LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');


    // This globally configures the toolbar elements shown in the frontend editor
    // do not add to many, because the design might break if the toolbar is too high!
    $provide.decorator('taOptions', ['$delegate', function (taOptions) {
        taOptions.toolbar = [
            ['h1', 'h2', 'h3'],
            ['italics', 'bold', 'p', 'ol', 'ul'],
            ['justifyLeft','justifyCenter','justifyRight']
        ];
        return taOptions; // whatever you return will be the taOptions
    }]);

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