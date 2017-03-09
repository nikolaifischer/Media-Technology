angular.module('ExerciseTemplateCtrl', [])
    .controller('ExerciseTemplateController', function ($scope, PlatformUser) {

        if (PlatformUser.isAuthenticated()) {
            PlatformUser.getCurrent(function (currentUser) {
                $scope.currentUser = currentUser;
            }, function (error) {
                console.log(error);
            });
        }
    });