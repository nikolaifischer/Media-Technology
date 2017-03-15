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

        // get all terms for the assignment of an appointment in the create-form
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

        // get all appointments that exist for the list on the web page
        $scope.uniqueDates = [];
        $scope.uniqueDates = UniqueDate.find(
            {
                order: "date DESC"
            },
            function(success){},
            function(error){
                console.log(error);
            }
        );

        // prefill the create-form for a new appointment
        $scope.uniqueDateName = "Klausur";
        $scope.uniqueDate = new Date();
        $scope.location = "Hgb, M140";
        $scope.duration = 90;
        $scope.description = "Semester Klausur WS 2016/2017";

        /**
         * function for creating new appointments like exams, called when admin clicks on the create button
         * the appointment attributes are set in the create-form
         */
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

        /**
         * function for removing appointments, called when admin clicks on the delete button next to an appointment
         * @param index for removing the appointment from the appointment list on the web page
         */
        $scope.removeUniqueDate = function(index){
            var uniqueDate = $scope.uniqueDates.splice(index, 1)[0];
            UniqueDate.deleteById({id: uniqueDate.id}, function(response) {});
        };
});