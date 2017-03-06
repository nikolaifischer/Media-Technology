angular.module('LoginCtrl', ['ngMaterial','ngMessages']).controller('LoginController', function ($scope, PlatformUser, $window, $mdToast,$mdDialog, $location, vcRecaptchaService) {


    $scope.$root.hideNav = true;


    $scope.registerFlag = false;
    $scope.whitelisted = true;
    $scope.wrongLogin = false;
    $scope.notVerified = false;
    $scope.loginCaptchaId;
    $scope.registerCaptchaId;

    // name and first_name have to be set to an arbitrary String else the API will return an error. They are ignored.
    $scope.user = {
        email: 'kevin@campus.lmu.de',
        password: 'Test1234',
        repeatpassword: 'Test1234',
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
                if(errorResponse.data.error.message.includes("Anmeldung fehlgeschlagen, da die E-Mail-Adresse nicht bestätigt wurde")){
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


    // Show No-Semester Pop-up

    $scope.showVerify = function (ev) {

        // Show the user a message
        var confirm = $mdDialog.confirm()
            .title('Registrierung erfolgreich')
            .textContent('Bitte überprüfe dein E-Mail Postfach und klicke auf den Bestätigungslink bevor du dich einloggst!')
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

    $scope.register = function () {
        PlatformUser.create($scope.user,
            function (response) {


                $scope.showVerify();



               // $scope.login();
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

    $scope.setLoginWidgetId = function(id) {
        $scope.loginCaptchaId=id;
    }

    $scope.setRegisterWidgetId = function(id) {
        $scope.registerCaptchaId=id;
    }






});


