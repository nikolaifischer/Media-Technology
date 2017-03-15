angular.module('ExerciseTemplateCtrl', [])
    .controller('ExerciseTemplateController', function ($scope, PlatformUser) {

        // This Controller gets the current user. His role (admin / tutor / student) is needed to decide,
        // which exercise template to show on the exercise page

        if (PlatformUser.isAuthenticated()) {
            PlatformUser.getCurrent(function (currentUser) {
                $scope.currentUser = currentUser;
            }, function (error) {
                console.log(error);
            });
        }
    });