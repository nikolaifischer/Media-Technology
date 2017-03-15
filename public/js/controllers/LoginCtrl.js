angular.module('LoginCtrl', ['ngMaterial','ngMessages']).controller('LoginController', function ($scope, PlatformUser, $window, $mdToast,$mdDialog, $location, vcRecaptchaService) {


    // Do not show Navigation in Login Window
    $scope.$root.hideNav = true;

    // FRONTEND FLAGS
    $scope.registerFlag = false;
    $scope.whitelisted = true;
    $scope.wrongLogin = false;
    $scope.notVerified = false;
    $scope.loginCaptchaId;
    $scope.registerCaptchaId;

    // name and first_name have to be set to an arbitrary String else the API will return an error. They are ignored.
    $scope.user = {
        email: '',
        password: '',
        repeatpassword: '',
        first_name: 'This is ignored but has to be a String',
        name: 'This is ignored but has to be a String'
    };

    $scope.registeredUser = {
        email: "",
        password: ""
    };

    /**
     * Login the User
     */
    $scope.login = function () {
        PlatformUser.login($scope.registeredUser,
            function (response) {
                console.log(response.id);
                $window.sessionStorage.token = response.id;
                $window.location.href = '/';
            },
            function (errorResponse) {
                if(errorResponse.data.error.message.includes($translate.instant("LOGIN_FAILED_EMAIL_NOT_CONFIRMED"))){
                    $scope.notVerified = true;
                }
                else {
                    $scope.wrongLogin = true;
                }

                vcRecaptchaService.reload($scope.loginCaptchaId);
                delete $window.sessionStorage.token;
            }
        );
    };


    /**
     * Show dialog stating that the registration was successful but the user has to confirm his E-Mail Address.
     * @param ev
     */
    $scope.showVerify = function (ev) {

        // Show the user a message
        var confirm = $mdDialog.confirm()
            .title($translate.instant("REGISTRATION_SUCCESSFUL"))
            .textContent($translate.instant("CONFIRM_EMAIL"))
            .targetEvent(ev)
            .ok('OK');

        $mdDialog.show(confirm).then(function () {
            //ok-callback

            // Switch back to the Login Screen
            $scope.registerFlag=false;

        }, function () {
            // Do nothing

        });
    };

    /**
     * Register the User
     */
    $scope.register = function () {
        PlatformUser.create($scope.user,
            function (response) {

                $scope.showVerify();


            },
            function (errorResponse) {
                if (errorResponse.status == 403) {
                    $scope.whitelisted = false;
                    vcRecaptchaService.reload($scope.registerCaptchaId);
                }
                else {
                    console.log(errorResponse);
                }
            }
        );
    };


    /**
     * Frontend Methods for Captcha Creation
     * @param id: id of the Captcha
     */

    $scope.setLoginWidgetId = function(id) {
        $scope.loginCaptchaId=id;
    }

    $scope.setRegisterWidgetId = function(id) {
        $scope.registerCaptchaId=id;
    }



});


