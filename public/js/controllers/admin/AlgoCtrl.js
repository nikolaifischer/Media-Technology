angular.module('AlgoCtrl', [])
    .controller('AlgoController', function (PlatformUser, $location, $scope, PriorityDistribution, LoopBackAuth) {

        if (PlatformUser.isAuthenticated()) {
            PlatformUser.getCurrent(function (current) {
                $scope.currentUser = current;
            }, function (error) {
                console.log(error);
            });
        }
        else {
            if ($location.path() != "/login") {
                $location.path("/login");
            }
        }


        $scope.distribute = function () {
            PlatformUser.getCurrent(function (current) {
                var token = LoopBackAuth.accessTokenId;
                PriorityDistribution.create({"token": token}, function (success) {
                    console.log(success);
                });

            }, function (error) {
                console.log(error);

            });


        }


    });