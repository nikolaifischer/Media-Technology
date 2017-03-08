angular.module('AudioCtrl', [])
    .controller('AudioController', function ($scope, $filter, $timeout, $log, $q, $http, $route, PlatformUser, Group, Lab, LabType, Priority, MaterialCalendarData, $window) {

        $scope.myLabs = [];
        var groupedElements = {};
        $scope.date = new Date();
        $scope.time = new Date();
        $scope.minDate = moment().subtract(1, 'month');
        $scope.selectedPriority = [];
        $scope.priorities = [1,2,3];
        $scope.showBtns = [];
        $scope.isEdit = [];
        $scope.editDateTime = [];
        $scope.editDuration = [];
        $scope.editLocation = [];
        $scope.editSelectedTutor = [];

        /****Loads the labs from the DB and displays them on the calendar****/
        $scope.loadLabs = function () {
            groupedElements = {};
            $scope.myLabs = [];
            //Get Audio LabType
            $scope.audiolabs = LabType.find({
                filter: {
                    where: {type: $scope.labTypeId
                    //,semesterId: $scope.semester.id
                    }
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
                        if($scope.currentUser.isTutor) {
                            if ($scope.currentUser.id == element.tutorId) {
                                    $scope.myLabs.push(element);
                            }
                        }

                        //save end time in element
                        var dateObj = new Date(element.date);
                        var endtime = dateObj.setTime(dateObj.getTime() + (element.duration*60*1000));
                        element.end = $filter('date')(endtime, 'HH:mm');

                        //save tutor name in element
                        PlatformUser.find({
                            filter: {
                                where: { id: element.tutorId, isTutor: true}
                            }
                        }, function (tutor) {
                            if (tutor.length > 0) {
                                element.tutorName = tutor[0].first_name + " " + tutor[0].name;
                            }

                            //Get Selected Priority for each lab and save in element
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

                                //fill variable for calendar display
                                var date = element.date.slice(0, 10);
                                if (groupedElements[date] === undefined) {
                                    groupedElements[date] = [];
                                }
                                groupedElements[date].push(element);

                                //Write Labs in calendar
                                Object.keys(groupedElements).forEach(function (date) {
                                    MaterialCalendarData.setDayContent(new Date(date),"<div class='calendar_content'>Termine</div>");
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

        /****Get the current group****/
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

        /****Get saved priorities for the group****/
        $scope.loadPriorities = function () {
            Priority.find({
                filter: {
                    where: {groupId: $scope.group.id, labTypeId: $scope.labTypeId}
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
            for (var i = 0; i < $scope.objects.length; i++) {
                $scope.selectedPriority[i] = undefined;
                $scope.showBtns[i] = false;
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
                // TODO: All the Labs are reloaded from the DB. This is pretty inefficent.
                $scope.loadLabs();
                $scope.dateTime = "";
                $scope.duration = "";
                $scope.location = "";
                $scope.selectedTutor = undefined;
                $scope.successMessage = "Praktikum erfolgreich erstellt."

            }, function(error){
                console.log(error);
            });

        };

        /****Edit and Update Lab****/
        $scope.editLab = function (i) {
            $scope.isEdit[i] = true;
            $scope.editDateTime[i] = $scope.objects[i].date;
            $scope.editDuration[i] = $scope.objects[i].duration;
            $scope.editLocation[i] = $scope.objects[i].location;
            $scope.tutors.forEach(function(tutor, index) {
                if(tutor.id == $scope.objects[i].tutorId){
                    $scope.editSelectedTutor[i] = $scope.tutors[index];
                }
            });
        };
        $scope.cancelEditLab = function (i) {
            $scope.isEdit[i] = false;
        };
        $scope.updateLab = function (i) {
            Lab.findById({id: $scope.objects[i].id}, function (lab) {
                console.log(lab);
                lab.date = $scope.editDateTime[i];
                lab.duration = $scope.editDuration[i];
                lab.location = $scope.editLocation[i];
                lab.tutorId = $scope.editSelectedTutor[i].id;
                lab.$save();
                $scope.loadLabs();
                $scope.isEdit[i] = false;
            });
        };

        /****Create or Update Priority in database from user input****/
        $scope.savePriority = function (index) {
            if ($scope.selectedPriority[index] != undefined) {
                if($scope.selectedPriority[index].priority != 0) {
                    let selPrio = $scope.selectedPriority[index].priority;
                    let selLabId = $scope.selectedPriority[index].objectId;
                    //check if priority already exists
                    checkIfPrioExists(selPrio, selLabId, index);
                }
            }
        };
        function checkIfPrioExists(selPrio, selLabId, index) {
            Priority.find({
                filter: {
                    where: {priority: selPrio, labTypeId: $scope.labTypeId}
                }
            }, function (res) {
                //delete Priority if already exists
                if (res.length > 0) {
                    Priority.deleteById({id: res[0].id}, function (res) {}, function (err) {console.log(err);});
                }
                createPriority(selPrio, selLabId, index);
            });
        }
        function createPriority(selPrio, selLabId, index) {
            Priority.create({
                "priority": selPrio,
                "groupId": $scope.group.id,
                "labId": selLabId,
                "labTypeId": $scope.labTypeId,
                //"semesterId": $scope.semester.id
            }, function (priority) {
                $scope.loadPriorities();
                groupedElements = {};
                $scope.loadLabs();
                $scope.showBtns[index] = 0;
                $scope.selectedPriority[index].priority = undefined;
            }, function (error) {
                console.log(error);
            });
        }

        /****Delete Priority***/
        $scope.deletePriority = function (selectedPrio, selectedLabId) {
            Priority.find({
                filter: {
                    where: {labId: selectedLabId, groupId: $scope.group.id}
                }
            }, function (prio) {
                Priority.deleteById({id: prio[0].id}, function (err, obj) {
                    $scope.loadPriorities();
                    $scope.loadLabs();
                });
            });
        };

        $scope.showButtons = function (prio, i) {
                if (prio != undefined) {
                    $scope.showBtns[i] = true;
                } else {
                    $scope.showBtns[i] = false;
                }
        };

        $scope.resetSelect = function (i) {
            $scope.selectedPriority[i].priority = undefined;
            $scope.showBtns[i] = false;
        };
    });