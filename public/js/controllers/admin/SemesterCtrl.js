angular.module('SemesterCtrl', [])
    .controller('SemesterController', function ($location, $scope, $resource, $mdToast, $mdDialog, $window, PlatformUser, Semester, LabType) {


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

        $scope.semesterinCtrl = {};
        $scope.semesterinCtrl.start_date = new Date();
        $scope.semesterinCtrl.end_date = new Date();
        $scope.noCurrentSemester = false;
        $scope.getCurrentSemester(function (semester) {
            if (semester != undefined) {
                $scope.noCurrentSemester = false;
                Semester.findById({id: semester.id}, function (currentSemester) {
                    currentSemester.start_date = new Date(currentSemester.start_date);
                    currentSemester.end_date = new Date(currentSemester.end_date);
                    $scope.semesterinCtrl = currentSemester;

                    $scope.terms = Semester.find(
                        {
                            filter: {
                                where: {
                                    id: {neq: currentSemester.id}
                                }
                            },
                            order: "end_date DESC"
                        },
                        function(success){},
                        function(error){
                            console.log(error);
                        }
                    );
                }, function (err) {
                    console.log(err)
                })
            }
            else {
                $scope.noCurrentSemester = true;
                $scope.terms = Semester.find(
                    {
                        order: "end_date DESC"
                    },
                    function(success){},
                    function(error){
                        console.log(error);
                    }
                );
            }

        });

        $scope.saveSemester = function () {

            // Create a new Semester
            if ($scope.noCurrentSemester) {
                Semester.create($scope.semesterinCtrl, function (success) {
                    $scope.semester = success;
                    console.log($scope.semester);
                    createLabTypes(1, 'Foto', function() {
                        createLabTypes(2, 'Video', function() {
                            createLabTypes(3, 'Audio', function() {
                                $window.location.reload();
                            });
                        });
                    });
                }, function (err) {
                    console.log(err);
                });

            }
            // Update the current Semester
            else {
                Semester.findById({id: $scope.semesterinCtrl.id}, function (res) {
                    res.term = $scope.semesterinCtrl.term;
                    res.start_date = $scope.semesterinCtrl.start_date;
                    res.end_date = $scope.semesterinCtrl.end_date;
                    res.group_size = $scope.semesterinCtrl.group_size;
                    res.$save();

                    // A Reload is needed here, to update the Semester in the MainCtrl.
                    $window.location.reload();
                })

            }

        };

        // TODO: welcher Text im Alert?
        $scope.removeSemester = function(ev, index){
            var confirm = $mdDialog.confirm()
                .title('Soll das Semester wirklich gelöscht werden?')
                .textContent('Das hat seeehr böse Folgen...')
                .ariaLabel('Semester löschen')
                .targetEvent(ev)
                .ok('Löschen')
                .cancel('Abbrechen');

            $mdDialog.show(confirm).then(function() {
                var term = $scope.terms.splice(index, 1)[0];
                Semester.deleteById({id: term.id}, function(response) {});
            }, function() {});
        };

        function createLabTypes(typeNumber, typeString, callback) {
            console.log(typeNumber);
            LabType.create({
                type: typeNumber,
                type_str: typeString,
                registration_open: false,
                registration_deadline: $scope.semester.end_date,
                description_student: 'Default Beschreibung für Studenten',
                description_tutor: 'Default Beschreibung für Tutoren',
                semesterId: $scope.semester.id
            }, function (res) {

                console.log(res);
                callback();

            }, function(error){
                console.log(error);
            });
        }


    });