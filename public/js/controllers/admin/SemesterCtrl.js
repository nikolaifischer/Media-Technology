angular.module('SemesterCtrl', [])
    .controller('SemesterController', function ($location, $scope, $resource, $mdToast, $mdDialog, $window, $translate, PlatformUser, Semester, LabType) {

        // Controller for managing the terms

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

        /**
         * function for getting the current term (if there is one) and all previous terms
         */
        $scope.getCurrentSemester(function (semester) {
            if (semester != undefined) {
                // if there is a current term, fill in the form with it's data
                $scope.noCurrentSemester = false;
                // get data of current term for displaying and changing
                Semester.findById({id: semester.id}, function (currentSemester) {
                    currentSemester.start_date = new Date(currentSemester.start_date);
                    currentSemester.end_date = new Date(currentSemester.end_date);
                    $scope.semesterinCtrl = currentSemester;
                    // get all previous terms without the current for displaying in web page
                    $scope.terms = Semester.find({
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
                    });
                }, function (err) {
                    console.log(err)
                })
            } else {
                $scope.noCurrentSemester = true;
                // get all terms for displaying in web page
                $scope.terms = Semester.find({
                        order: "end_date DESC"
                    },
                    function(success){},
                    function(error){
                        console.log(error);
                    }
                );
            }
        });

        /**
         * function for creating a term (with creating the respective lab types) and saving changes in the current term
         * called when submitting the form
         */
        $scope.saveSemester = function () {
            // if there is no current term, create a new one
            if ($scope.noCurrentSemester) {
                Semester.create($scope.semesterinCtrl, function (success) {
                    $scope.semester = success;
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

            } else {
                // update the current term
                Semester.findById({id: $scope.semesterinCtrl.id}, function (res) {
                    res.term = $scope.semesterinCtrl.term;
                    res.start_date = $scope.semesterinCtrl.start_date;
                    res.end_date = $scope.semesterinCtrl.end_date;
                    res.group_size = $scope.semesterinCtrl.group_size;
                    res.$save();

                    // A reload is needed here, to update the term in the MainController
                    $window.location.reload();
                });
            }
        };

        /**
         * function for creating the lab types for a term, called when creating a new term
         * @param typeNumber (1, 2 or 3)
         * @param typeString ('Foto', 'Video' or 'Audio')
         * @param callback needed for reloading the page when all lab types are created
         */
        function createLabTypes(typeNumber, typeString, callback) {
            LabType.create({
                type: typeNumber,
                type_str: typeString,
                registration_open: false,
                registration_deadline: $scope.semester.end_date,
                description_student: $translate.instant('SOME_DESCRIPTION'),
                description_tutor: $translate.instant('SOME_DESCRIPTION'),
                semesterId: $scope.semester.id
            }, function (res) {
                callback();
            }, function(error){
                console.log(error);
            });
        }

    });
