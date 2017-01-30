angular.module('LoginCtrl', ['ngMaterial','ngMessages']).controller('LoginController', function ($scope, PlatformUser, $window, $mdToast) {


    $scope.$root.hideNav = true;
    /*
     // if user is logged in, redirect to home
     if ($window.sessionStorage.token != null){
     $window.location.href = '/';
     }
     */
    var solvedCaptcha = false;

    $scope.registerFlag = false;
    $scope.whitelisted = true;
    $scope.wrongLogin = false;
    $scope.wrongCaptcha = false;

    // name and first_name have to be set to a arbitrary String else the API will return an error. They are ignored.
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
        if(solvedCaptcha!=true){
            $scope.wrongCaptcha=true;
            return;
        }
        $scope.wrongCaptcha = false;
        PlatformUser.login($scope.registeredUser,
            function (response) {
                console.log(response.id);
                $window.sessionStorage.token = response.id;
                $window.location.href = '/';
            },
            function (errorResponse) {
                console.log(errorResponse);

                $scope.wrongLogin = true;

                delete $window.sessionStorage.token;
            }
        );
    }

    $scope.register = function () {
        if ($scope.user.password != $scope.user.repeatpassword) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Die Passwörter stimmen nicht überein')
                    .hideDelay(3000)
                    .toastClass("toast")
            );
        }


        // TODO: how to check if user with email exists?
        PlatformUser.create($scope.user,
            function (response) {
                $scope.registeredUser = {
                    email: response.email,
                    password: response.repeatpassword   // TODO: that's not nice...
                };
                // After a successfull registration no captcha is needed:
                solvedCaptcha=true;
                $scope.login();
            },
            function (errorResponse) {

                if (errorResponse.status == 403) {
                    $scope.whitelisted=false;
                }
                else {

                    console.log(errorResponse);
                }

            }
        );
    };


    recaptcha = function () {

        solvedCaptcha=true;

    }

});


