angular.module('DatesCtrl', [])
    .controller('DatesController', function ($location, $scope, PlatformUser, Semester, UniqueDate) {

        // Send non-admins back to home page
        if (PlatformUser.isAuthenticated()) {
            PlatformUser.getCurrent(function (currentUser) {
                if(!currentUser.isAdmin) {
                    $location.path('/');
                }
            }, function (error) {
                console.log(error);
            });
        }

        $scope.terms = [];
        $scope.terms = Semester.find(
            {
                order: "end_date DESC"
            },
            function(success){
                $scope.selectedTerm = $scope.terms[0];
            },
            function(error){
                console.log(error);
            }
        );

        $scope.uniqueDates = [];
        $scope.uniqueDates = UniqueDate.find(
            {
                order: "date ASC"
            },
            function(success){},
            function(error){
                console.log(error);
            }
        );
        $scope.uniqueDateName = "Klausur";
        $scope.uniqueDate = new Date();
        $scope.location = "Amalienstraße 67, Raum 001";
        $scope.duration = 90;
        $scope.description = "Semester Klausur WS 2016/2017";

        $scope.createUniqueDate = function() {
            UniqueDate.create({
                "name": $scope.uniqueDateName,
                "date": $scope.uniqueDate,
                "location": $scope.location,
                "duration": $scope.duration,
                "description": $scope.description,
                "semesterId": $scope.selectedTerm.id
            }, function (response) {
                setTimeout(function(){
                    $scope.$apply(function() {
                        $scope.uniqueDates.push(response);
                    });
                }, 300);
            }, function(error){
                console.log(error);
            });
        };

        $scope.removeUniqueDate = function(index){
            var uniqueDate = $scope.uniqueDates.splice(index, 1)[0];
            UniqueDate.deleteById({id: uniqueDate.id}, function(response) {});
        };
});