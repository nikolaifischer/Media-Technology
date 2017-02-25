angular.module('AudioCtrl', [])
    .controller('AudioController', function ($scope, $filter, $timeout, $log, $q, $http, $route, PlatformUser, Group, Lab, LabType, Priority, MaterialCalendarData, $window) {

        $scope.currentUser;
        $scope.group;
        $scope.labs;
        $scope.myLabs = [];
        var groupedElements = {};
        $scope.date = new Date();
        $scope.time = new Date();
        //$scope.dateTime = new Date();
        $scope.minDate = moment().subtract(1, 'month');
        $scope.selectedPriority = [];
        $scope.priorities = [1,2,3];
        $scope.showSaveButton = false;
        $scope.showCross = [];

        /****Loads the labs from the DB and displays them on the calendar****/
        $scope.loadLabs = function () {
            groupedElements = {};
            //Get Audio LabType
            $scope.audiolabs = LabType.find({
                filter: {
                    where: {type: $scope.labTypeId}
                }
            }, function (audiolabs) {
                $scope.audioLabType = audiolabs;
                // Find all Audio Labs
                $scope.labs = Lab.find({
                    filter: {
                        where: {labTypeId: audiolabs.id}
                    }
                }, function (labs) {
                    //Get format for calendar
                    labs.forEach(function (element) {
                        //TODO Find my Tutor Labs
                        var dateObj = new Date(element.date);
                        var endtime = dateObj.setTime(dateObj.getTime() + (element.duration*60*1000));
                        element.end = $filter('date')(endtime, 'HH:mm');
                        //save tutor name in element
                        PlatformUser.find({
                            filter: {
                                where: {id: element.tutorId}
                            }
                        }, function (tutor) {
                            element.tutorName = tutor[0].first_name +" "+tutor[0].name;
                            //Get Selected Priority for each lab ans save in element
                            Priority.find({
                                filter: {
                                    where: {labId: element.id}
                                }
                            }, function (prio) {
                                if ($scope.group != undefined) {
                                    for (var k = 0; k < prio.length; k++) {
                                        if (prio[k].groupId == $scope.group.id) {
                                            element.selPrio = prio[k].priority;
                                        }
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
                                    MaterialCalendarData.setDayContent(new Date(date),"<div class='calendar_content'>Termine</div>");
                                    //angular.element(document.getElementsByClassName("calendar_content")).parent().parent().addClass('highlight');
                                });
                                if($scope.key != undefined) {
                                    $scope.dayClick($scope.key);
                                }
                                return groupedElements;

                            });
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

        /*$scope.prevMonth = function() {
            angular.element(document.getElementsByClassName("calendar_content")).parent().parent().addClass('highlight');
        };
        $scope.nextMonth = function() {
            angular.element(document.getElementsByClassName("calendar_content")).parent().parent().addClass('highlight');
        };*/

        $scope.setDirection = function (direction) {
            $scope.direction = direction;
            $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
        };

        //Get all lab details on clicked day
        $scope.dayClick = function (date) {
            $scope.clickedDay = $filter("date")(date, "EEEE, d. MMMM y");
            $scope.key = $filter("date")(date, "yyyy-MM-dd");

            $scope.objects = (groupedElements[$scope.key] || []);
            $scope.showSaveButton = false;
            for (var i = 0; i < $scope.objects.length; i++) {
                $scope.selectedPriority[i] = undefined;
                $scope.showCross[i] = false;
            }
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
                "labTypeId": $scope.audiolabs.id,
                //"semesterId": $scope.semester.id,
                "tutorId": $scope.selectedTutor.id
            }, function (lab) {
                /*PlatformUser.findById({
                    id: $scope.selectedTutor.id
                }, function (tutor) {
                    tutor.tutorLabIds.push(lab.id);
                    PlatformUser.prototype$updateAttributes({ "id": tutor.id }, { "tutorLabIds": tutor.tutorLabIds }, function(user) {
                        $scope.selectedTutor = undefined;
                        console.log(user);
                    });
                });*/
                // TODO: All the Labs are reloaded from the DB. This is pretty inefficent.
                $scope.loadLabs();
                $scope.dateTime = "";
                $scope.duration = "";
                $scope.location = "";
                $scope.selectedTutor = undefined;

            }, function(error){
                console.log(error);
            });

        };


        /****Create or Update Priority in database from user input****/
        $scope.savePriorities = function () {
            for (let i = 0; i < $scope.objects.length; i++) {
                if ($scope.selectedPriority[i].priority != undefined && $scope.selectedPriority[i].priority != 0) {
                            //check if priority already exists
                            $scope.existingPrio = Priority.find({
                                filter: {
                                    where: {priority: $scope.selectedPriority[i].priority}
                                }
                            }, function (prios) {
                                if (prios.length > 0) {
                                    //Update saved priority
                                    Priority.prototype$updateAttributes({"id": prios[0].id}, {"labId": $scope.selectedPriority[i].objectId}, function (prio) {
                                        $scope.loadLabs();
                                        $scope.loadPriorities();
                                        $scope.selectedPriority[i].priority = undefined;
                                        console.log(prio);
                                    });
                                } else {
                                    //Create new Priority
                                    Priority.create({
                                        "priority": $scope.selectedPriority[i].priority,
                                        "groupId": $scope.group.id,
                                        "labId": $scope.selectedPriority[i].objectId
                                        //"semesterId": $scope.semester.id
                                    }, function (priority) {
                                        $scope.loadPriorities();
                                        $scope.loadLabs();
                                        $scope.showCross[i] = 0;
                                        $scope.showSaveButton = false;
                                        $scope.selectedPriority[i].priority = undefined;
                                    }, function (error) {
                                        console.log(error);
                                    });
                                }
                    });
                }
            }

        };
        /****Delete Priority***/
        $scope.deletePriority = function (selectedPrio, selectedLabId) {
            Priority.find({
                filter: {
                    where: {labId: selectedLabId, groupId: $scope.group.id}
                }
            }, function (prio) {
                Priority.deleteById({"id": prio[0].id}, function (err, obj) {
                    $scope.loadPriorities();
                    $scope.loadLabs();
                });
            });
        };

        $scope.showButton = function (prio, i) {
                if (prio != undefined) {
                    $scope.showSaveButton = true;
                    $scope.showCross[i] = true;
                } else {
                    $scope.showSaveButton = false;
                    $scope.showCross[i] = false;
                }
        };

        $scope.resetSelect = function (i) {
            $scope.selectedPriority[i].priority = undefined;
            $scope.showCross[i] = false;
        };
    })

    /****Filter for priority dropdown****/
    .filter('arrayDiff', function() {
        return function(array, diff) {
            var i, item,
                newArray = [],
                exception = Array.prototype.slice.call(arguments, 2);

            for(i = 0; i < array.length; i++) {
                item = array[i];
                if(diff.indexOf(item) < 0 || exception.indexOf(item) >= 0) {
                    newArray.push(item);
                }
            }

            return newArray;

        };
    });