angular.module('MainCtrl', []).controller('MainController', function ($scope, $timeout, $mdSidenav, $window, PlatformUser) {

    $scope.$root.hideNav = true;
    if (PlatformUser.isAuthenticated()) {
        PlatformUser.getCurrent(function (currentUser) {
            $scope.currentUser = currentUser;
            $scope.hideNav = false;


        }, function (error) {

            console.log(error);

        });
    }

    // Controls the side navigation
    $scope.toggleLeft = buildToggler('left');
    function buildToggler(componentId) {
        return function () {
            $mdSidenav(componentId).toggle();
        }
    }

    $scope.logout = function () {
        return PlatformUser.logout(
            function (response) {
                console.log("logged out");
                delete $window.sessionStorage.token;
                $window.location.href = '/login';
            },
            function (errorResponse) {
                console.log(errorResponse);
            }
        );
    };

    /**
     * Opens Profile menu
     * @param $mdOpenMenu
     * @param ev
     */
    $scope.openProfileMenu = function ($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
    }


});