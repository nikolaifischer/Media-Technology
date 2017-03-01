angular.module('SemesterCtrl', [])
    .controller('SemesterController', function ($location, $scope, $resource, $mdToast, $window, PlatformUser, Semester) {


        $scope.semesterinCtrl = {};
        $scope.semesterinCtrl.start_date = new Date();
        $scope.semesterinCtrl.end_date = new Date();
        $scope.noCurrentSemester = false;
        $scope.getCurrentSemester(function (semester) {
            if (semester != undefined) {
                $scope.noCurrentSemester = false;
                Semester.findOne({id: semester.id}, function (currentSemester) {
                    currentSemester.start_date = new Date(currentSemester.start_date);
                    currentSemester.end_date = new Date(currentSemester.end_date);
                    $scope.semesterinCtrl = currentSemester;
                }, function (err) {
                    console.log(err)
                })
            }
            else {
                $scope.noCurrentSemester = true;
            }

        })


        $scope.saveSemester = function () {

            // Create a new Semester
            if ($scope.noCurrentSemester) {
                Semester.create($scope.semesterinCtrl, function (success) {
                    $scope.semester = success;

                }, function (err) {
                    console.log(err);

                });

            }

            // Update the current Semester
            else {
                Semester.findOne({id: $scope.semesterinCtrl.id}, function (res) {
                    res.term = $scope.semesterinCtrl.term;
                    res.start_date = $scope.semesterinCtrl.start_date;
                    res.end_date = $scope.semesterinCtrl.end_date;
                    res.group_size = $scope.semesterinCtrl.group_size;
                    res.$save();

                    // A Reload is needed here, to update the Semester in the MainCtrl.
                    $window.location.reload();
                })

            }

        }


    });