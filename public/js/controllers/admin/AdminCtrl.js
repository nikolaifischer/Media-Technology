angular.module('AdminCtrl', [])
    .controller('AdminController', function ($location, $scope, PlatformUser, $mdToast, PendingPlatformUser) {

        if (PlatformUser.isAuthenticated()) {
            PlatformUser.getCurrent(function (currentUser) {
                if (!currentUser.isAdmin) {
                    $location.path('/');
                }
            }, function (error) {
                console.log(error);
            });
        }

    });