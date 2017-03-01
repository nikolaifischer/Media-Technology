angular.module('SemesterCtrl', [])
    .controller('SemesterController', function ($location, $scope, $resource, $mdToast, PlatformUser, Semester) {

        console.log(Semester);

        $scope.semester = {};
        $scope.semester.start_date = new Date();
        $scope.semester.end_date = new Date();
        $scope.noCurrentSemester = false;
        $scope.getCurrentSemester(function (semester) {
            console.log("Test");
            console.log(semester);
            if (semester.term) {
                $scope.noCurrentSemester = false;
                Semester.find({}, function (semesters) {
                    var currentSemester = semesters[semesters.length - 1];
                    currentSemester.start_date = new Date(currentSemester.start_date);
                    currentSemester.end_date = new Date(currentSemester.end_date);
                    console.log(currentSemester);
                    $scope.semester = currentSemester;
                }, function (err) {
                    console.log(err)
                })
            }
            else {
                $scope.noCurrentSemester = true;

            }


        })


        $scope.saveSemester = function () {
            //User.upsert({id: model.id}, model, successCallback, failCallback);

            if ($scope.noCurrentSemester) {
                console.log($scope.semester);
                Semester.create($scope.semester, function (success) {

                    console.log("Saved Semester")

                }, function (err) {

                    console.log(err);

                });

            }

            else {

                /*Semester.prototype$updateAttributes(
                    { "id": $scope.semester.id},
                    {
                        "term": $scope.semester.term
                    }, function(success) {
                        console.log(success);
                    }

                );
                */

                console.log(PlatformUser.prototype$updateAttributes);
                Semester.prototype$updateAttributes({"id": $scope.semester.id}, {"term": $scope.semester.term}, function (prio) {
                    $scope.loadLabs();
                    $scope.loadPriorities();
                    $scope.selectedPriority[i].priority = undefined;
                    console.log(prio);
                });
            }
        }


    });