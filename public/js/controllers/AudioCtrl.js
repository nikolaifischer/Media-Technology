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
        $scope.selectedPriority = [];

        /****Loads the labs from the DB and displays them on the calendar****/
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
                            var dateObj = new Date(element.date);
                            var endtime = dateObj.setTime(dateObj.getTime() + (element.duration*60*1000));
                            element.end = $filter('date')(endtime, 'HH:mm');

                            //Get Tutor for each lab
                            PlatformUser.find({
                                //TODO: Filter Users to tutors
                                /*filter: {
                                    where: {isTutor: true}
                                }*/
                            }, function (tutors) {
                                for (var j = 0; j < tutors.length; j++) {
                                    var matchingElements = tutors[j].tutorLabIds.filter(function (elm) {
                                        return elm == element.id
                                    });
                                    if (matchingElements.length > 0) {
                                        element.tutorName = tutors[j].name;
                                        element.tutorFirstName = tutors[j].first_name;
                                    }
                                }
                                //get end time from start time and duration
                                var date = element.date.slice(0, 10);
                                if (groupedElements[date] === undefined) {
                                    groupedElements[date] = [];
                                }
                                groupedElements[date].push(element);

                                //Write Labs in calendar
                                Object.keys(groupedElements).forEach(function (date) {
                                    MaterialCalendarData.setDayContent(new Date(date)," Termine verfügbar ");
                                });

                                return groupedElements;
                            });
                    });
                }, function (error) {
                    console.log(error);
                });
            });
        };

        $scope.loadLabs();

        /****Loads the current group and actualizes saved priorities****/
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
                            //Get saved priorities for group
                            $scope.loadPriorities = function () {
                                Priority.find({
                                    filter: {
                                        where: {groupId: $scope.group.id}
                                    }
                                }, function (prios) {
                                    $scope.groupPriorities = prios;
                                    $scope.priorities = [1, 2, 3];
                                    //Check if group already saved 3 priorities
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
                    console.log(error);
                });
            }, function (error) {
                console.log(error);
            });
        }


        /****Calendar Code****/
        $scope.dayFormat = "d";
        $scope.selectedDate = null;
        $scope.selectedDate = false;
        $scope.tooltips = true;
        $scope.firstDayOfWeek = 1;
        $scope.setDirection = function (direction) {
            $scope.direction = direction;
            $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
        };

        //Get all lab details on clicked day
        $scope.dayClick = function (date) {
            $scope.clickedDay = $filter("date")(date, "EEEE, d. MMMM y");
            $scope.key = $filter("date")(date, "yyyy-MM-dd");

            $scope.objects = (groupedElements[$scope.key] || []);
        };



        /****Get all Tutors****/
        //Can be deleted if in loadLabs filtered
        $scope.tutors = PlatformUser.find({
            filter: {
                where: {isTutor: true}
            }
        });


        /****Create Lab in database from user input****/
        $scope.createLab = function () {
            Lab.create({
                "date": $scope.dateTime,
                "duration": $scope.duration,
                "location": $scope.location,
                "labTypeId": $scope.audiolabs.id
            }, function (lab) {
                PlatformUser.findById({
                    id: $scope.selectedTutor.id
                }, function (tutor) {
                    tutor.tutorLabIds.push(lab.id);
                    PlatformUser.prototype$updateAttributes({ "id": tutor.id }, { "tutorLabIds": tutor.tutorLabIds }, function(err) {
                        $scope.selectedTutor = undefined;
                        console.log(err);
                    });
                });
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


        /****Create or Update Priority in database from user input****/
        $scope.savePriorities = function () {
            for (let i = 0; i < $scope.objects.length; i++) {
                if ($scope.selectedPriority[i] != undefined) {
                    $scope.existingPrio = Priority.find({
                        filter: {
                            where: {priority: $scope.selectedPriority[i].priority}
                        }
                    }, function (prios) {
                        if(prios.length > 0) {
                            //Update saved priority
                            Priority.prototype$updateAttributes({ "id": prios[0].id }, { "labId": $scope.selectedPriority[i].objectId }, function(err) {
                                $scope.loadPriorities();
                                $scope.selectedPriority[i].priority = undefined;
                                console.log(err);
                            });
                        } else {
                            //Create new Priority
                            Priority.create({
                                "priority": $scope.selectedPriority[i].priority,
                                "groupId": $scope.group.id,
                                "labId": $scope.selectedPriority[i].objectId
                            }, function (priority) {
                                $scope.loadPriorities();
                                console.log(priority);
                                $scope.selectedPriority[i].priority = undefined;
                            }, function (error) {
                                console.log(error);
                            });
                        }
                        });
                }
            }

        };

    })

    /****Filter for priority dropdown****/
    .filter('arrayDiff', function() {
        return function(array, diff) {
            console.log(diff);
            var i, item,
                newArray = [],
                exception = Array.prototype.slice.call(arguments, 2);

            for(i = 0; i < array.length; i++) {
                item = array[i];
                if(diff == item || exception.indexOf(item) >= 0) {
                    newArray.push(item);
                }
            }
            return newArray;
        };
    });