angular.module('DatesCtrl', [])
    .controller('DatesController', function ($location, $scope, PlatformUser, Semester, UniqueDate) {

        $scope.termName = "Semestername";
        $scope.startDate = new Date();
        $scope.endDate = new Date();
        $scope.groupSize = 4;

        $scope.terms = [];
        $scope.terms = Semester.find(
            {
                order: "end_date DESC"
            },
            function(success){},
            function(error){
                console.log(error);
            }
        );

        $scope.createTerm = function() {
            Semester.create({
                "term": $scope.termName,
                "start_date": $scope.startDate,
                "end_date": $scope.endDate,
                "group_size": $scope.groupSize
            }, function (response) {
                setTimeout(function(){
                    $scope.$apply(function() {
                        $scope.terms.push(response);
                    });
                }, 300);
            }, function(error){
                console.log(error);
            });
        };

        $scope.removeTerm = function(index){
            var term = $scope.terms.splice(index, 1)[0];
            Semester.deleteById({id: term.id}, function(response) {});
        };

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
        $scope.description = "Semester Klausur  WS 2016/2017";
        $scope.selectedTerm = $scope.terms[0];

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