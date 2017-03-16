angular.module('AdminCtrl', [])
    .controller('AdminController', function ($location, $scope, PlatformUser) {

        // Check if user is an admin and therefore is allowed to see the admin tools

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