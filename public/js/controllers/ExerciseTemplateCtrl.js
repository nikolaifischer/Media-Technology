angular.module('ExerciseTemplateCtrl', [])
    .controller('ExerciseTemplateController', function ($scope, PlatformUser) {

        $scope.isTutor = false;

        if (PlatformUser.isAuthenticated()) {
            PlatformUser.getCurrent(function (currentUser) {
                if(currentUser.isTutor) {
                    $scope.isTutor = true;
                }
            }, function (error) {
                console.log(error);
            });
        }
    });