angular.module('AlgoCtrl', [])
    .controller('AlgoController', function (PlatformUser, $location, $scope, PriorityDistribution, LoopBackAuth, Lab, LabType, Priority, Group) {

        // Functions related to the algorithm, which distributes labs to students based on their priorities

        // Error Vars

        $scope.showErrorMessage = false;
        $scope.errorMessage = '';

        // Loading Flags

        $scope.labSelect = 1;
        $scope.registration_loading = true;
        $scope.tutor_labs_loading = true;
        $scope.student_prios_loading = true;
        $scope.labs_created_loading = true;
        $scope.algo_running = false;


        // HELPER VARS
        $scope.successfulGroups = [];
        $scope.unsuccessfulGroups = [];
        $scope.successAlgo = false;
        $scope.allGroupMailsSuccess = "";
        $scope.allGroupMailsFail = "";


        // Frontend Flags

        $scope.showFailedEmails = false;
        $scope.showSuccessfulEmails = false;


        if (PlatformUser.isAuthenticated()) {
            PlatformUser.getCurrent(function (current) {
                $scope.currentUser = current;
                if (!$scope.currentUser.isAdmin) {
                    $location.path("/login");
                }
            }, function (error) {
                console.log(error);
            });
        }
        else {
            if ($location.path() != "/login") {
                $location.path("/login");
            }
        }

        // START CHECKS BEFORE ALGO CAN BE STARTED
        $scope.getCurrentSemester(function (semester) {
            $scope.semester = semester;
            checkTutor();
            checkRegistration();
            checkStudentPrios();
            checkLabs();
        });


        // RESTART CHECKS IF LABTYPE IS CHANGED
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
            $scope.successfulGroups = [];
            $scope.unsuccessfulGroups = [];
            $scope.allGroupMailsSuccess = "";
            $scope.allGroupMailsFail = "";
            $scope.showErrorMessage = false;

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
                Priority.find({
                    filter: {
                        where: {
                            semesterId: $scope.semester.id,
                            labTypeId: labtype.id
                        }
                    }
                }, function (prios) {


                    if (prios.length > 1) {
                        // There are at least some prios set
                        $scope.student_prios = true;
                    }

                    $scope.student_prios_loading = false;
                });
            }, function (err) {
                $scope.student_prios = false;
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

                }, function (err) {
                    $scope.labs_created_loading = false;
                    $scope.labs_created = false;
                });
            }, function (err) {
                $scope.labs_created_loading = false;
                $scope.labs_created = false;
            });
        }


        /**
         * Gathers all data, needed for the priority-based distribution algorithm,
         * Starts the algorithm and calls methods which process the results.
         *
         */
        $scope.distribute = function () {


            saveGroupStatus();

            $scope.algo_running = true;
            $scope.showResults = true;


            var labtype;
            var allLabs;
            var allGroups;
            var allPrios;
            LabType.findOne({
                filter: {
                    where: {
                        type: $scope.labSelect,
                        semesterId: $scope.semester.id
                    }
                }
            }, function (labtypeRes) {

                labtype = labtypeRes;

                Lab.find({
                    filter: {
                        where: {
                            labTypeId: labtype.id,
                            semesterId: $scope.semester.id
                        }
                    }
                }, function (labsRes) {
                    allLabs = labsRes;


                    Group.find({filter: {where: {semesterId: $scope.semester.id}}}, function (groupsRes) {
                        allGroups = groupsRes;


                        Priority.find({
                            filter: {
                                where: {
                                    semesterId: $scope.semester.id,
                                    labTypeId: labtype.id
                                }
                            }
                        }, function (priosRes) {
                            allPrios = priosRes;


                            // START BUILDING THE ALGO OBJECTS

                            var groups = [];
                            var dates = [];

                            for (var i = 0; i < allGroups.length; i++) {

                                var currentGroup = allGroups[i];
                                var groupEl = {};
                                var choosenDate = [];
                                groupEl["groupName"] = currentGroup.name;

                                for (var j = 0; j < allPrios.length; j++) {
                                    var choosenDateEl;
                                    // Filter Prios for Group
                                    if (allPrios[j].groupId == currentGroup.id) {


                                        var labdate = findDateByLabId(allPrios[j].labId, allLabs);
                                        choosenDateEl = {
                                            dateTime: labdate,
                                            priority: allPrios[j].priority
                                        }

                                        choosenDate.push(choosenDateEl);

                                    }

                                }

                                groupEl["choosenDate"] = choosenDate;


                                // THIS GROUP IS FINISHED
                                // ONLY ADD IT IF AT LEAST 3 PRIOS WERE SET
                                if (choosenDate.length >= 3)
                                    groups.push(groupEl);

                            }


                            // DO THE DATES:


                            for (var i = 0; i < allLabs.length; i++) {

                                var dateEl = {};
                                var newdate = findDateByLabId(allLabs[i].id, allLabs);
                                dateEl.dateToCheck = newdate;
                                dates.push(dateEl);
                            }


                            // Start the Algo:
                            PlatformUser.getCurrent(function (current) {
                                token = LoopBackAuth.accessTokenId;

                                PriorityDistribution.create({
                                    token: token,
                                    groupData: groups,
                                    dates: dates
                                }, function (err, success) {
                                    $scope.algo_running = false;
                                    if (err) {
                                        showError(err.statusText);
                                        console.log(err);
                                    }
                                    else {

                                        writeSuccessToDb(success, allGroups, allLabs, function(){
                                            showSuccess();
                                        })

                                    }
                                });
                            });


                        });

                    });

                });

            });


        }


        /**
         * Shows Error message if distribution algo failed
         * @param err The error object
         */
        function showError(err) {
            $scope.errorMessage = err;
            $scope.showErrorMessage = true;
        }


        /**
         * Shows success message if distribution was successful:
         * Enumerates the Groups which got a date and those which did not.
         */

        function showSuccess() {

            Group.find({filter: {where: {semesterId: $scope.semester.id}}}, function (groups) {

                $scope.successfulGroups = [];

                for (var i = 0; i < groups.length; i++) {


                    if (groups[i].labIds.length > $scope.groupsSave[i].labIds.length) {

                        $scope.getGroupEmails(groups[i], "success");
                        $scope.successfulGroups.push(groups[i]);

                    }
                    else {
                        $scope.getGroupEmails(groups[i], "fail");
                        $scope.unsuccessfulGroups.push(groups[i]);
                    }

                }


                $scope.successAlgo = true;


            });

        }

        /**
         * Helper Method to save groups before the algorithm runs. Is used to determine the difference of the
         * amount of labs in each groups before and after the algorithm. Needed to generate a success message.
         */

        function saveGroupStatus() {

            Group.find({filter: {where: {semesterId: $scope.semester.id}}}, function (groups) {

                $scope.groupsSave = groups;

            });

        }


        /**
         * Gets Emails of all Group members and adds them to the group object.
         * Creates list of all successful/unsuccessful Group-Emails
         * @param group The Group
         * @param status "sucessful"/"unsuccessful": Decides to which list a email is pushed
         */
        $scope.getGroupEmails = function (group, status) {


            var mails = [];
            Group.groupMembers({id: group.id}, function (members) {
                for (var i = 0; i < members.length; i++) {

                    mails.push(members[i].email);
                    var temp;

                    if (status == "success") {

                        if ($scope.allGroupMailsSuccess.length > 0)
                            temp = "," + members[i].email;
                        else
                            temp = members[i].email;

                        $scope.allGroupMailsSuccess += temp;
                    }
                    else {

                        if ($scope.allGroupMailsFail.length > 0)
                            temp = "," + members[i].email;
                        else
                            temp = members[i].email;

                        $scope.allGroupMailsFail += temp;
                    }

                }

                group.mails = mails;

            });

        }


        /**
         * Helper Method which SYNCHRONOUSLY returns the date of lab
         * @param id the id of the searched lab
         * @param allLabs Array with all Labs that have to be searched
         */

        function findDateByLabId(id, allLabs) {

            for (var i = 0; i < allLabs.length; i++) {
                if (allLabs[i].id == id) {
                    return allLabs[i].date;
                }
            }

            return -1;

        }


        /**
         * Helper Method which SYNCHRONOUSLY returns the group object of a group name
         * @param name the name of the group
         * @param allGroups Array with all Groups that have to be searched
         */

        function findGroupByName(name, allGroups){

            for(var i=0; i<allGroups.length; i++) {

                if(allGroups[i].name == name){
                    return allGroups[i];
                }

            }
            return -1;

        }


        /**
         * Helper Method which SYNCHRONOUSLY returns a lab object when searched for a specific date
         * @param date the date of the lab
         * @param allLabs Array with all Labs that have to be searched
         */

        function findLabByDate(date, allLabs){

            for(var i=0; i<allLabs.length; i++) {

                if(allLabs[i].date == date){
                    return allLabs[i];
                }

            }
            return -1;

        }


        /**
         * Takes the result of the distribution algorithm, converts it to the right format and writes it in the
         * DB
         * @param algo: The response from the algorithm.
         * @param allGroups: All the groups in this semester
         * @param allLabs: All the Labs in this semester
         */
        function writeSuccessToDb(algo, allGroups, allLabs, cb){

            var groupsAndDates = algo.data.groupAndDateInformation;

            for(var i =0; i<groupsAndDates.length; i++){
                var groupName = groupsAndDates[i].groupName;
                var date = groupsAndDates[i].givenDate;
                var group = findGroupByName(groupName,allGroups);
                var lab = findLabByDate(date, allLabs);

                // Update in asynch

                //Group.labs.link(group.id, lab.id);


                Group.labs.link({id: group.id, fk: lab.id}, function(success){
                    Lab.prototype$patchAttributes({id:lab.id}, {groupId: group.id}, function(success){


                    }, function(err){

                    });

                }, function(err){
                    // Silently fail if there already is a relation
                });




            }

            // Wait for the Writes in the Loop to finish
            setTimeout(function(){
                cb();
            }, 500);


        }


    });