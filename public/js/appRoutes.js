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
        .when('/group', {
            templateUrl: 'views/group.html',
            controller: 'GroupController'
        })
        .when('/audio', {
            templateUrl: 'views/audio.html',
            controller: 'AudioController'
        })
        .when('/exercises', {
            templateUrl: 'views/exercises.html',
            controller: 'ExerciseController'
        })
        .when('/admin', {
            templateUrl: 'views/admin/admin.html',
            controller: 'AdminController'
        })
        .when('/admin/whitelist', {
            templateUrl: 'views/admin/whitelist.html',
            controller: 'WhitelistController'
        })
        .when('/admin/exercises', {
            templateUrl: 'views/admin/exercises.html',
            controller: 'ExerciseController'
        })
        .when('/admin/prioritydistribution', {
            templateUrl: 'views/admin/algo.html',
            controller: 'AlgoController'
        })
    ;

    $locationProvider.html5Mode(true);

}]);