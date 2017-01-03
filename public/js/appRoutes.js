angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
    // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileController'
        })
        .when('/changePassword', {
            templateUrl: 'views/changePassword.html',
            controller: 'ProfileController'
        })
    ;

    $locationProvider.html5Mode(true);

}]);