angular.module('LoginCtrl', ['ngMaterial','ngMessages']).controller('LoginController', function ($scope, PlatformUser, $window, $mdToast, vcRecaptchaService) {


    $scope.$root.hideNav = true;
    /*
     // if user is logged in, redirect to home
     if ($window.sessionStorage.token != null){
     $window.location.href = '/';
     }
     */

    $scope.registerFlag = false;
    $scope.whitelisted = true;
    $scope.wrongLogin = false;
    $scope.loginCaptcha;

    // name and first_name have to be set to an arbitrary String else the API will return an error. They are ignored.
    $scope.user = {
        email: 'kevin@campus.lmu.de',
        password: 'test',
        repeatpassword: 'test',
        first_name: 'This is ignored but has to be a String',
        name: 'This is ignored but has to be a String'
    };

    $scope.registeredUser = {
        email: "kevin@campus.lmu.de",
        password: "test"
    };

    $scope.login = function () {
        PlatformUser.login($scope.registeredUser,
            function (response) {
                console.log(response.id);
                $window.sessionStorage.token = response.id;
                $window.location.href = '/';
            },
            function (errorResponse) {
                console.log(errorResponse);
                $scope.wrongLogin = true;
                vcRecaptchaService.reload();
                delete $window.sessionStorage.token;
            }
        );
    };

    $scope.register = function () {
        PlatformUser.create($scope.user,
            function (response) {
                $scope.registeredUser = {
                    email: response.email,
                    password: response.repeatpassword   // TODO: that's not nice... -> kann man da nicht $scope.user.password verwenden?
                };
                $scope.login();
            },
            function (errorResponse) {
                if (errorResponse.status == 403) {
                    $scope.whitelisted = false;
                    vcRecaptchaService.reload();
                }
                else {
                    console.log(errorResponse);
                }
            }
        );
    };


});


