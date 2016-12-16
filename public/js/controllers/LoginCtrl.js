angular.module('LoginCtrl', ['ngMaterial' ]).controller('LoginController', function($scope, PlatformUser, $window,$mdToast) {

    $scope.$root.hideNav=true;
    // if user is logged in, redirect to home
    if ($window.sessionStorage.token != null){
        $window.location.href = '/';
    }

    $scope.user = {
        first_name: 'Kevin',
        name: 'Dombrowski',
        email: 'kevin@campus.lmu.de',
        password: 'test',
        repeatpassword: 'test'
    };

    $scope.registeredUser = {
        email:"kevin@campus.lmu.de",
        password:"test"
    };

    $scope.login = function () {
        PlatformUser.login($scope.registeredUser,
            function(response) {
                console.log(response.id);
                $window.sessionStorage.token = response.id;
                $window.location.href = '/';
            },
            function(errorResponse) {
                console.log(errorResponse);

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Falsche E-Mail/Passwort')
                        .hideDelay(3000)
                        .toastClass("toast")
                );

                delete $window.sessionStorage.token;
            }
        );
    }

    $scope.register = function () {
        if ($scope.user.password != $scope.user.repeatpassword){
            // TODO: message to user and abort
            console.log("Wrong Password")
        }

        // TODO: how to check if user with email exists?
        PlatformUser.create($scope.user,
            function(response) {
            console.log(response);
                $scope.registeredUser = {
                    email: response.email,
                    password: response.repeatpassword   // TODO: that's not nice...
                };
                $scope.login();
            },
            function(errorResponse) {
                console.log(errorResponse);
                //delete $window.sessionStorage.token;
            }
        );
    };

});
