angular.module('AlgoCtrl', [])
    .controller('AlgoController', function (PlatformUser, $location, $scope, PriorityDistribution, LoopBackAuth, Lab, LabType, Priority, Group) {



        // Loading Flags

        $scope.labSelect = 1;
        $scope.registration_loading = true;
        $scope.tutor_labs_loading = true;
        $scope.student_prios_loading = true;
        $scope.labs_created_loading = true;


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

        $scope.getCurrentSemester(function (semester) {
            $scope.semester = semester;
            checkTutor();
            checkRegistration();
            checkStudentPrios();
            checkLabs();
        });

        $scope.reload = function (labSelect) {
            $scope.labSelect = labSelect;
            $scope.registration_loading = true;
            $scope.tutor_labs_loading = true;
            $scope.student_prios_loading = true;
            $scope.labs_created_loading = true;
            $scope.registration_closed = false;
            $scope.tutor_labs = false;
            $scope.student_prios = false;
            $scope.labs_created = false;

            console.log($scope.labSelect);
            checkTutor();
            checkRegistration();
            checkStudentPrios();
            checkLabs();
        }

        // ALGO CHECKS:
        // DOES CHECKS ON DATA BEFORE THE ALGORITHM CAN BE STARTED

        /**
         * Checks if a tutor was assigned to all labs
         */

        function checkTutor() {

            var result = true;

            LabType.findOne({
                filter: {
                    where: {
                        semesterId: $scope.semester.id,
                        type: $scope.labSelect
                    }
                }
            }, function (labtype) {
                Lab.find({filter: {where: {semesterId: $scope.semester.id, labTypeId: labtype.id}}}, function (labs) {
                    for (var i = 0; i < labs.length; i++) {
                        if (labs[i].tutorId == undefined || labs[i].tutorId == null) {
                            result = false;
                        }
                    }
                    if (result) {
                        $scope.tutor_labs = true;
                    }
                    $scope.tutor_labs_loading = false;
                });

            }, function (err) {
                $scope.tutor_labs_loading = false;
                $scope.tutor_labs = false;
            });

        }

        /**
         * Checks if the registration period for the lab has already been closed.
         */

        function checkRegistration() {

            LabType.findOne({
                filter: {
                    where: {
                        type: $scope.labSelect,
                        semesterId: $scope.semester.id
                    }
                }
            }, function (type) {
                console.log(type);

                if (type.registration_open) {

                    $scope.registration_closed = false;

                }

                else {
                    $scope.registration_closed = true;
                }

                $scope.registration_loading = false;

            }, function (err) {
                $scope.registration_loading = false;
                $scope.registration_closed = false;
            });

        }

        /***
         * Basic sanity check to see if there are at least some priorities created
         */

        function checkStudentPrios() {

            LabType.findOne({
                filter: {
                    where: {
                        type: $scope.labSelect,
                        semesterId: $scope.semester.id
                    }
                }
            }, function (labtype) {
                Priority.find({filter: {where: {semesterId: $scope.semester.id, labTypeId: labtype.id }}}, function (prios) {


                    if (prios.length > 1) {
                        // There are at least some prios set
                        $scope.student_prios = true;
                    }

                    $scope.student_prios_loading = false;
                });
            }, function(err){
                $scope.student_prios=false;
                $scope.student_prios_loading = false;

            });
        }

        /***
         * Checks if there are enough labs created for every group
         */
        function checkLabs() {
            LabType.findOne({
                filter: {
                    where: {
                        semesterId: $scope.semester.id,
                        type: $scope.labSelect
                    }
                }
            }, function (labtype) {

                Lab.find({filter: {where: {semesterId: $scope.semester.id, labTypeId: labtype.id}}}, function (labs) {

                    Group.find({filter: {where: {semesterId: $scope.semester.id}}}, function (groups) {

                        if (labs.length / groups.length >= 1) {
                            $scope.labs_created = true;
                        }
                        $scope.labs_created_loading = false;

                    });

                }, function(err){
                    $scope.labs_created_loading = false;
                    $scope.labs_created = false;
                });
            }, function(err){
                $scope.labs_created_loading = false;
                $scope.labs_created = false;
            });
        }


        $scope.distribute = function () {

            /** TODO: Das muss noch parametrisiert werden **/

            var labtypeNumber = $scope.labSelect;
            var labtype;
            var labs;
            var token;
            var groups;
            PlatformUser.getCurrent(function (current) {
                console.log("Started data retrieval");
                token = LoopBackAuth.accessTokenId;
                // Get the right LabType Id:

                LabType.find({filter: {where: {type: labtypeNumber}}}, function (success) {

                    labtype = success;

                    // Get all priorities of this labtype:

                    // Get the labs
                    Lab.find({filter: {where: {labTypeId: labtype.id}}}, function (success) {
                        labs = success;

                        // Get all Groups
                        Group.find({}, function (success) {
                            groups = success;
                            var groupData = [];
                            for (var i = 0; i < groups.length; i++) {
                                var objEl = {groupName: groups[i].name, choosenDate: []};
                                var choosenDate = [];
                                Group.priorities({
                                    id: groups[i].id,
                                    filter: {where: {labtype: labtype.id}}
                                }, function (groupPrios) {
                                    for (var j = 0; j < groupPrios.length; j++) {
                                        var choosenDateEl = {priority: groupPrios[j].priority, dateTime: ''};
                                        var choosenLabs;
                                        Lab.find({filter: {where: {id: groupPrios[j].labId}}}, function (success) {
                                            choosenLabs = success;
                                            choosenDateEl['dateTime'] = choosenLabs[0].date;


                                            if (choosenDate.length < groupPrios.length)
                                                choosenDate.push(choosenDateEl);

                                            if (choosenDate.length == groupPrios.length) {

                                                // Async break condition:

                                                objEl['choosenDate'] = choosenDate;
                                                groupData.push(objEl);

                                                if (groupData.length == groups.length) {


                                                    /**
                                                     * MAP THE DATA TO THE FORMAT NEEDED IN THE ALGORITHM:
                                                     */

                                                    var dates = [];
                                                    for (var i = 0; i < labs.length; i++) {
                                                        var obj = {dateToCheck: labs[i].date}
                                                        dates.push(obj);
                                                    }
                                                    console.log("The Group Data:");
                                                    console.log(groupData);
                                                    console.log("The Dates Data:");
                                                    console.log(dates);

                                                    // Start the Algo:

                                                    PriorityDistribution.create({
                                                        token: token,
                                                        groupData: groupData,
                                                        dates: dates
                                                    }, function (success) {
                                                        console.log(success);
                                                    });

                                                }
                                            }

                                        }, function (err) {
                                            console.log(err);
                                        });


                                    }

                                });
                            }

                        });

                    });

                }, function (err) {
                    console.log(err);
                });


            }, function (error) {
                console.log(error);

            });

        }


    });