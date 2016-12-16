angular.module('HomeCtrl', []).controller('HomeController', function ($scope, PlatformUser, $window) {


    $scope.currentUser;
    if (PlatformUser.isAuthenticated) {
        PlatformUser.getCurrent(function (currentUser) {
            $scope.currentUser = currentUser;

        }, function (error) {

            console.log(error);

        })
    }

});