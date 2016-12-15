angular.module('MainCtrl', []).controller('MainController', function($scope, $timeout, $mdSidenav, $window, PlatformUser) {

    // Controls the side navigation
    $scope.toggleLeft = buildToggler('left');
    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        }
    }

    $scope.logout = function () {
        return PlatformUser.logout(
            function(response) {
                console.log("logged out");
                delete $window.sessionStorage.token;
                $window.location.href = '/login';
            },
            function(errorResponse) {
                console.log(errorResponse);
            }
        );
    };

    // TODO: needed?
    // listen if the user state changes and react with a redirection
    $scope.$watch(($window.sessionStorage.token != null), function (value, oldValue) {
        if(!value && oldValue) {
            $location.path('/login');

        }

        if(value) {
            console.log("Connect");
            // do sth
        }
    }, true);

});