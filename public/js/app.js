angular.module('mtPlanr', [
    'ngRoute',
    'appRoutes',
    'lbServices',
    'MainCtrl',
    'HomeCtrl',
    'LoginCtrl',
    'ProfileCtrl',
    'AudioCtrl',
    'AdminCtrl',
    'WhitelistCtrl',
    'ExerciseTemplateCtrl',
    'ExerciseCtrl',
    'GroupCtrl',
    'AlgoCtrl',
    'PriorityDistributionService',
    'ngMaterial',
    'materialCalendar',
    'textAngular',
    'md.data.table',
    'ngMaterialDatePicker',
    'pascalprecht.translate',
    'ngSanitize',
    'ngCookies',
    'vcRecaptcha',
    'tmh.dynamicLocale'
]);


angular.module('mtPlanr').config(function (LoopBackResourceProvider, $provide) {

    // From example - Do we need this?
    // Use a custom auth header instead of the default 'Authorization'
    //LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server

    // Use this line if you want to use a local backend
    //LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');

    // Use this line if you want to use the production backend
    LoopBackResourceProvider.setUrlBase('https://mtplanrapi.herokuapp.com/api');


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
    .config(function(tmhDynamicLocaleProvider){
        tmhDynamicLocaleProvider.localeLocationPattern('../libs/angular-i18n/angular-locale_{{locale}}.js');
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
            // TODO: sollten wir das nicht über PlatformUser.isAuthenticated() abfragen?
            if ($window.sessionStorage.token != null) {
                //$location.path('/home');
            }
            else {
                $location.path('/login');
            }
        });

        // set default translation
        $rootScope.lang = 'de';
    }]);




angular.module('mtPlanr')
    .config(['$translateProvider', function($translateProvider) {

        $translateProvider
            .useStaticFilesLoader({
                prefix: '/translations/',
                suffix: '.json'
            })
            .preferredLanguage('de')
            .useSanitizeValueStrategy('escapeParameters') // escaping of HTML in parameters only
            .useLocalStorage();
}]);

