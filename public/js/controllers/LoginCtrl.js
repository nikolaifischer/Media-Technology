angular.module('LoginCtrl', ['ngMaterial','ngMessages'])
    .controller('LoginController', function ($scope, PlatformUser, $window, $mdToast, $mdDialog, $location, $translate, vcRecaptchaService) {

    // Controller for the login and registration process

    // Do not show the navigation panel on the login page
    $scope.$root.hideNav = true;

    // frontend flags
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
     * function for the user login, called when submitting the login form
     */
    $scope.login = function () {
        PlatformUser.login($scope.registeredUser,
            function (response) {
                $window.sessionStorage.token = response.id;
                $window.location.href = '/';
            },
            function (errorResponse) {
                if(errorResponse.data.error.message.includes($translate.instant("LOGIN_FAILED_EMAIL_NOT_CONFIRMED"))){
                    $scope.notVerified = true;
                } else {
                    $scope.wrongLogin = true;
                }

                vcRecaptchaService.reload($scope.loginCaptchaId);
                delete $window.sessionStorage.token;
            }
        );
    };

    /**
     * Show dialog stating that the registration was successful but the user has to confirm his email address
     * called when registration was successful (the submitted email address was whitelisted)
     * @param ev
     */
    $scope.showVerify = function (ev) {
        // show the user a success message
        var confirm = $mdDialog.confirm()
            .title($translate.instant("REGISTRATION_SUCCESSFUL"))
            .textContent($translate.instant("CONFIRM_EMAIL"))
            .ariaLabel($translate.instant('REGISTRATION_SUCCESSFUL'))
            .targetEvent(ev)
            .ok('OK');

        $mdDialog.show(confirm).then(function () {
            // ok-callback
            // switch back to the login screen
            $scope.registerFlag = false;
        }, function () {
        });
    };

    /**
     * function for registering, called when submitting the registration form
     */
    $scope.register = function () {
        PlatformUser.create($scope.user,
            function (response) {
                // show the registration-successful dialog
                $scope.showVerify();
            },
            function (errorResponse) {
                if (errorResponse.status == 403) {
                    // submitted email address was not on the whitelist
                    $scope.whitelisted = false;
                    vcRecaptchaService.reload($scope.registerCaptchaId);
                } else {
                    console.log(errorResponse);
                }
            }
        );
    };

    /**
     * Frontend methods for Captcha creation
     * @param id: id of the Captcha
     */

    $scope.setLoginWidgetId = function(id) {
        $scope.loginCaptchaId=id;
    };
    $scope.setRegisterWidgetId = function(id) {
        $scope.registerCaptchaId=id;
    };
});


