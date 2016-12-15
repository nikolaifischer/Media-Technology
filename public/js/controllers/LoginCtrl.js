angular.module('LoginCtrl', ['ngMaterial' ]).controller('LoginController', function($scope, PlatformUser) {

    $scope.user = {
            first_name: 'Kevin',
            name: 'Dombrowski',
            email: 'kevin@campus.lmu.de',
            password: 'test',
            repeatpassword: 'test'
        };

        $scope.registeredUser = {
            email:"",
            password:""
        }

        $scope.register = function () {
            console.log($scope.user)

            if ($scope.user.password != $scope.user.repeatpassword){
                console.log("Wrong Password")
            }
        };

    $scope.login = function () {
        PlatformUser.login($scope.registeredUser,
            function(response) {
               console.log(response.id);
            },
            function(errorResponse) { console.log(errorResponse); }
        );
    }



    });
