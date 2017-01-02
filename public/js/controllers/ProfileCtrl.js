angular.module('ProfileCtrl', ['ngMaterial' ]).controller('ProfileController', function($scope, PlatformUser, $window,$mdToast) {

    $scope.currentUser;
    if (PlatformUser.isAuthenticated) {
        PlatformUser.getCurrent(function (currentUser) {
            $scope.currentUser = currentUser;
        }, function (error) {
            console.log(error);
        })
    }

    $scope.save = function () {
        if (PlatformUser.isAuthenticated) {
            if ($scope.currentUser.first_name !== '') {
                PlatformUser.prototype$updateAttributes({id: $scope.currentUser.id}, {first_name: $scope.currentUser.first_name},
                    function() {
                        $window.location.href = '/profile';
                    },
                    function(error) {
                        console.log(error)
                    });
            }
            if ($scope.currentUser.name !== '') {
                PlatformUser.prototype$updateAttributes({id: $scope.currentUser.id}, {name: $scope.currentUser.name},
                    function() {
                        $window.location.href = '/profile';
                    },
                    function(error) {
                        console.log(error)
                    });
            }
        }
    }

    $scope.changePassword = function () {
        // TODO: old password is not being checked (the only way to check it is to login the user with that pw, but is this necessary?)
        if (PlatformUser.isAuthenticated) {
            if ($scope.currentUser.newPassword !== $scope.currentUser.repeatNewPassword) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Neues Passwort stimmmt nicht mit Wiederholung überein')
                        .hideDelay(3000)
                        .toastClass("toast")
                );
                return false;
            }

            PlatformUser.prototype$updateAttributes({id: $scope.currentUser.id}, {password: $scope.currentUser.newPassword},
                function() {
                    $window.location.href = '/profile';
                },
                function(error) {
                    console.log(error)
                });
        }
    }

});
