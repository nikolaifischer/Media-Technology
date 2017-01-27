angular.module('AudioCtrl', [])
    .controller('AudioController', function ($scope, $filter, $timeout, $log, $q, $http, $route, PlatformUser, Group, Lab, LabType, Priority, MaterialCalendarData, $window) {

        $scope.currentUser;
        $scope.group;
        $scope.labs;
        var groupedElements = {};
        $scope.date = new Date();
        $scope.time = new Date();
        //$scope.dateTime = new Date();
        $scope.minDate = moment().subtract(1, 'month');
        $scope.selectedPriority = [ ];


        /**
         * Loads the labs from the DB and displays them on the calendar.
         */
        $scope.loadLabs = function () {
            //Get Audio LabType
            $scope.audiolabs = LabType.find({
                filter: {
                    where: {type: 1}
                }
            }, function (audiolabs) {
                $scope.auioLabType = audiolabs;
                // Find all Audio Labs
                $scope.labs = Lab.find({
                    filter: {
                        where: {labTypeId: audiolabs.id}
                    }
                }, function (labs) {
                    //Get format for calendar
                    labs.forEach(function (element) {
                        var date = element.date.slice(0, 10);
                        if (groupedElements[date] === undefined) {
                            groupedElements[date] = [];
                        }
                        groupedElements[date].push(element);

                        for(var i =0; i<groupedElements.length; i++){
                            //console.log(groupedElements[i]);
                        }
                    });
                    //console.log(JSON.stringify(groupedElements));


                    Object.keys(groupedElements).forEach(function (date) {
                        MaterialCalendarData.setDayContent(new Date(date)," Termine verfügbar ");
                    });


                    return groupedElements;

                }, function (error) {
                    console.log(error);
                });


            });

        };

        $scope.loadLabs();

        // Get current User
        if (PlatformUser.isAuthenticated()) {
            PlatformUser.getCurrent(function (currentUser) {
                $scope.currentUser = currentUser;
                // This cannot be done with a filter, so it fetches all Groups
                Group.find({}, function (groups) {
                    // Success Callback
                    for (var i = 0; i < groups.length; i++) {
                        if (groups[i].groupMemberIds.indexOf($scope.currentUser.id) > -1) {
                            $scope.group = groups[i];

                            $scope.loadPriorities = function () {
                                Priority.find({
                                    filter: {
                                        where: {groupId: $scope.group.id}
                                    }
                                }, function (prios) {
                                    $scope.groupPriorities = prios;
                                    $scope.priorities = [
                                        {id: 0, name: '1'},
                                        {id: 1, name: '2'},
                                        {id: 2, name: '3'}
                                    ];
                                    for (var i = 0; i <= prios.length; i++ ) {
                                        if(prios[i] != undefined) {
                                            if (prios[i].priority == 1) {
                                                for (var j = $scope.priorities.length - 1; j >= 0; j--) {
                                                    if ($scope.priorities[j].name == '1') {
                                                        $scope.priorities.splice(j, 1);
                                                    }
                                                }
                                            } if (prios[i].priority == 2) {
                                                for (var j = $scope.priorities.length - 1; j >= 0; j--) {
                                                    if ($scope.priorities[j].name == '2') {
                                                        $scope.priorities.splice(j, 1);
                                                    } 
                                                }
                                            } if (prios[i].priority == 3) {
                                                for (var j = $scope.priorities.length - 1; j >= 0; j--) {
                                                    if ($scope.priorities[j].name == '3') {
                                                        $scope.priorities.splice(j, 1);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    $scope.prioCount = 3;
                                    $scope.prioCount -= $scope.groupPriorities.length;
                                    if($scope.prioCount <= 0) {
                                        $scope.prioMessage = "Deine Gruppe hat bereits alle Prioritäten vergeben."
                                    } else {
                                        $scope.prioMessage = "Ihr müsst noch " + $scope.prioCount + " Prioriotäten vergeben."
                                    }
                                });
                            };

                        }
                    }
                    $scope.loadPriorities();
                }, function (error) {
                    //Error Callback
                    console.log(error);
                });
            }, function (error) {
                console.log(error);
            }, function() {

            });
        }





        // CALENDAR CODE
        $scope.dayFormat = "d";

        // To select a single date, make sure the ngModel is not an array.
        $scope.selectedDate = null;

        // If you want multi-date select, initialize it as an array.
        $scope.selectedDate = false;

        $scope.firstDayOfWeek = 1; // First day of the week, 0 for Sunday, 1 for Monday, etc.
        $scope.setDirection = function (direction) {
            $scope.direction = direction;
            $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
        };

        $scope.dayClick = function (date) {
            //Get Selected Date
            $scope.clickedDay = $filter("date")(date, "EEEE, d. MMMM y");
            $scope.key = $filter("date")(date, "yyyy-MM-dd");

            //Get lab details with clicked day key
            $scope.objects = (groupedElements[$scope.key] || []);
            //console.log(JSON.stringify($scope.objects));

        };


        $scope.tooltips = true;

        //Get all Tutors
        $scope.tutors = PlatformUser.find({
            filter: {
                where: {isTutor: true}
            }
        });
        //console.log($scope.tutors);

        $scope.createLab = function () {
            Lab.create({
                "date": $scope.dateTime,
                "duration": $scope.duration,
                "location": $scope.location,
                "labTypeId": $scope.audiolabs.id
            }, function (lab) {
                $scope.successMessage = "Praktikum wurde erstellt!";

                // TODO: All the Labs are reloaded from the DB. This is pretty inefficent.
                $scope.loadLabs();
                $scope.dateTime = "";
                $scope.duration = "";
                $scope.location = "";

            }, function(error){
                console.log(error);
            });

        };

        function remove(array, element) {
            const index = array.indexOf(element);

            if (index !== -1) {
                array.splice(index, 1);
            }
        }



        $scope.savePriorities = function () {
            for (var i = 0; i < $scope.objects.length; i++) {
                if ($scope.selectedPriority[i] != undefined) {
                    if($scope.prioCount <= 0) {
                        $scope.loadPriorities();
                    } else {
                        Priority.create({
                            "priority": $scope.selectedPriority[i].priority,
                            "groupId": $scope.group.id,
                            "labId": $scope.selectedPriority[i].objectId,
                        }, function (priority) {
                            $scope.loadPriorities();
                            console.log(priority);
                            $scope.selectedPriority[i].priority = undefined;
                        }, function (error) {
                            console.log(error);
                        });
                    }
                }
            }

        };

    });