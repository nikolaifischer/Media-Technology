angular.module('HomeCtrl', []).controller('HomeController', function ($scope, $location, $translate, PlatformUser, LabType, Lab, Group, UniqueDate, Exercise, MaterialCalendarData, $window, $filter, $resource, $mdDialog, NewsEntry) {

    // Show admins a Pop-up if there is no current semester
    PlatformUser.getCurrent(function (currentUser) {
        if (currentUser.isAdmin) {
            $scope.getCurrentSemester(function (response) {
                if (response == undefined) {
                    $scope.showNoSemester();
                }else {
                    $scope.semester = response;
                    loadUniqueDates();
                }
            });
        } else {
            $scope.getCurrentSemester(function (response) {
                $scope.semester = response;
                loadUniqueDates();
            });
        }
    });

    $scope.$root.hideNav = false;

    // Get current User to show its name
    $scope.currentUser;
    $scope.group;
    $scope.groupMembers;
    var groupedDates = {};
    var groupedUniques = {};
    var groupedExercises = {};
    var groupedLabs = {};


    if (PlatformUser.isAuthenticated()) {
        PlatformUser.getCurrent(function (currentUser) {
            $scope.currentUser = currentUser;
            loadGroup();
        }, function (error) {
            console.log(error);
        })
    }


    loadNews();

    /******News Editor********/
    $scope.hideEditor = false;
    function loadNews() {
        NewsEntry.find({}, function (newsArr) {
            if (newsArr.length > 0)
                $scope.news = newsArr[newsArr.length - 1].message;
        })
    }

    $scope.saveEditor = function () {
        // Saving done in async
        NewsEntry.create({message: $scope.news});
        $scope.hideEditor = true;
    };


    /*******CALENDAR CODE*******/
    $scope.dayFormat = "d";
    $scope.selectedDate = null;
    $scope.firstDayOfWeek = 1;
    $scope.tooltips = true;
    $scope.setDirection = function (direction) {
        $scope.direction = direction;
        $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };
    $scope.setDateContent = function(date) {
        return "<div></div>";
    };
    $scope.prevMonth = function () {
        loadUniqueDates();
    };
    $scope.nextMonth = function () {
        loadUniqueDates();
    };

    $scope.dayClick = function (date) {
        $scope.clickedDay = $filter("date")(date, "EEEE, d. MMMM y");
        $scope.key = $filter("date")(date, "yyyy-MM-dd");
        $scope.objects = (groupedDates[$scope.key] || []);

        //format content (appointment details) for popup
        var content = "";
        for (var i=0; i < $scope.objects.length; i++) {
            //set start end end time
            if($scope.objects[i].duration == undefined) {
                $scope.objects[i].duration = 90;
            }
            var dateObj = new Date($scope.objects[i].date);
            $scope.objects[i].end = $filter('date')(dateObj.setTime(dateObj.getTime() + ($scope.objects[i].duration * 60 * 1000)), 'HH:mm');

            //set HTML Content with detail properties
            content += "<div class='title'>"+$scope.objects[i].name+"</div>";
            content += "<div>"+$filter("date")($scope.objects[i].date, "HH:mm")+" - "+$scope.objects[i].end+"</div>";
            content += "<div><a href='http://maps.google.com/?q={{ object.location }}' target='_blank'>"+$scope.objects[i].location+"</a></div>";
            if ($scope.objects[i].tutor != undefined) {
                content += "<div>" + $scope.objects[i].tutor + "</div>";
            }
            if ($scope.objects[i].description != undefined) {
                content += "<div>" + $scope.objects[i].description + "</div>";
            }
            content += "<br>"
        }

        //show popup with details
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title($scope.clickedDay)
                .htmlContent(content)
                .ariaLabel('Date Detail Popup')
                .ok('Ok!')
                .targetEvent(date)
        );
    };

    //First, load all unique dates (exam,...)
    function loadUniqueDates() {
        var daysWithContent =[];
        var uniqueDatesContent = "";
        var itemsProcessed = 0;
        groupedExercises = [];
        groupedUniques = [];
        groupedLabs = [];
        groupedDates = [];
        $scope.uniqueDates = UniqueDate.find({
            filter: {
                where: {semesterId: $scope.semester.id}
            }
        }, function (dates) {
            if(dates.length === 0) {
                loadExercises(daysWithContent, uniqueDatesContent);
            }
            else {
                dates.forEach(function (element) {
                    itemsProcessed++;
                    //collect all dates in groupedDates with calendar format
                    var date = element.date.slice(0, 10);
                    if (groupedDates[date] === undefined) {
                        groupedDates[date] = [];
                    }
                    groupedDates[date].push(element);

                    //collect all unique dates in groupedUniques with calendar format
                    if (groupedUniques[date] === undefined) {
                        groupedUniques[date] = [];
                    }
                    groupedUniques[date].push(element);

                    //write unique dates in calendar
                    Object.keys(groupedUniques).forEach(function (date) {
                        var udString = $translate.instant("APPOINTMENT");
                        uniqueDatesContent = "<div class='calendar_content uniquedate'>" + udString + "</div>";
                        MaterialCalendarData.setDayContent(new Date(date), uniqueDatesContent);
                        daysWithContent.push(date);
                    });

                    //After all unique dates are processed, load exercieses
                    if (itemsProcessed === dates.length) {
                        loadExercises(daysWithContent, uniqueDatesContent);
                    }
                });
            }
        });
    }

    //Second, load all exercice dates
    function loadExercises(daysWithContent, uniqueDatesContent) {
        var daysWithMoreContent = [];
        var addedUpContent = "";
        var itemsProcessed = 0;
        $scope.exercises = Exercise.find({
            filter: {
                where: {semesterId: $scope.semester.id}
            }
        }, function (exrcs) {
            if (exrcs.length === 0) {
                loadOurLabs(daysWithMoreContent, addedUpContent);
            }
            else {
                exrcs.forEach(function (element) {
                    itemsProcessed++;
                    //for admin/tutor load all exercises where user is tutor
                    if (!$scope.currentUser.isAdmin && !$scope.currentUser.isTutor) {
                        if (element.participantsUserIds.indexOf($scope.currentUser.id) > -1) {
                            writeExercises(element, exrcs, daysWithContent, uniqueDatesContent, itemsProcessed);
                        }
                    }
                    //for student load all exercises where user participates
                    else {
                        if (element.tutor == $scope.currentUser.first_name + " " + $scope.currentUser.name) {
                            writeExercises(element, exrcs, daysWithContent, uniqueDatesContent, itemsProcessed);
                        }
                    }
                });
            }
        });
    }
    function writeExercises(element, exrcs, daysWithContent, uniqueDatesContent, itemsProcessed) {
        var daysWithMoreContent = [];
        var addedUpContent = "";
        var date = element.date.slice(0, 10);
        //collect all dates in groupedDates with calendar format
        if (groupedDates[date] === undefined) {
            groupedDates[date] = [];
        }
        if(groupedDates[date].indexOf(element) === -1) {
            groupedDates[date].push(element);
        }
        //collect all exercises dates in groupedExercises with calendar format
        if (groupedExercises[date] === undefined) {
            groupedExercises[date] = [];
        }
        if(groupedExercises[date].indexOf(element) === -1) {
            groupedExercises[date].push(element);
        }

        //write exercices in calendar
        Object.keys(groupedExercises).forEach(function (date) {
            var tutString = $translate.instant("TUTORIAL");
            var exercisesContent = "<div class='calendar_content excrs' translate='TUTORIAL'>"+tutString+"</div>";
            //if day already has unique dates, add up content; else write only exercises
            if(daysWithContent.indexOf(date) > -1) {
                addedUpContent = uniqueDatesContent+exercisesContent;
            } else {
                addedUpContent = exercisesContent;
            }
            MaterialCalendarData.setDayContent(new Date(date), addedUpContent);
            daysWithMoreContent.push(date);
        });

        //After all exercices are processed, load labs
        if(itemsProcessed === exrcs.length) {
            loadOurLabs(daysWithMoreContent, addedUpContent);
        }
    }

    //Second, load all lab dates
    function loadOurLabs(daysWithMoreContent, addedUpContent) {
        //for admin/tutor load all labs where user is tutor
        if (!$scope.currentUser.isAdmin && !$scope.currentUser.isTutor) {
            $scope.ourLabs = Lab.find({
                filter: {
                    where: {semesterId: $scope.semester.id, groupId: $scope.group.id}
                }
            }, function (labs) {
                writeLabs(labs, daysWithMoreContent, addedUpContent);
            });
        }
        //for student load all labs where group of user is assigned
        else {
            $scope.ourLabs = Lab.find({
                filter: {
                    where: {semesterId: $scope.semester.id, tutorId: $scope.currentUser.id}
                }
            }, function (labs) {
                writeLabs(labs, daysWithMoreContent, addedUpContent);
            });
        }
    }
    function writeLabs(labs, daysWithMoreContent, addedUpContent) {
        var allContent = "";
        labs.forEach(function(element) {
            var date = element.date.slice(0, 10);
            //Set name and tutor name of date
            LabType.findById({id: element.labTypeId},function(res) {element.name = res.type_str});
            PlatformUser.findOne({filter:{where:{id: element.tutorId}}},function(res) {element.tutor = res.first_name+" "+res.name});

            //collect all dates in groupedDates with calendar format
            if (groupedDates[date] === undefined) {
                groupedDates[date] = [];
            }
            if(groupedDates[date].indexOf(element) === -1) {
                groupedDates[date].push(element);
            }

            //collect all lab dates in groupedLabs with calendar format
            if (groupedLabs[date] === undefined) {
                groupedLabs[date] = [];
            }
            if(groupedLabs[date].indexOf(element) === -1) {
                groupedLabs[date].push(element);
            }

            //write labs in calendar
            Object.keys(groupedLabs).forEach(function (date) {
                var labString = $translate.instant("LAB");
                var labsContent = "<div class='calendar_content prktkm'>"+labString+"</div>";
                //if day already has unique dates or exercises, add up content; else write only labs
                if(daysWithMoreContent.indexOf(date) > -1) {
                    allContent = addedUpContent+labsContent;
                } else {
                    allContent = labsContent;
                }
                MaterialCalendarData.setDayContent(new Date(date), allContent);
            });
        });
    }


    /**********Group Code***********/

    /**
     * Load the Group of the User from DB
     */
    function loadGroup() {

        Group.find({}, function (groups) {

            // Success Callback
            var found = false;
            for (var i = 0; i < groups.length; i++) {
                if (groups[i].groupMemberIds.indexOf($scope.currentUser.id) > -1) {
                    $scope.group = groups[i];
                    found = true;
                    break;
                }
            }

            if (!found) {
                $scope.group = undefined;
                $scope.groupMembers = undefined;
            }
            else {

                Group.groupMembers({

                        id: $scope.group.id

                    }, function (members) {
                        $scope.groupMembers = members;

                    }, function (error) {
                        console.log("There was an error while fetching the group members");
                        console.log(error);

                    }
                );
            }

        }, function (error) {
            //Error Callback
            console.log(error);
        });

        return;

    }


    /**
     * Shows the confirm Dialog, allowing the user to leave a Group
     * @param ev
     */
    $scope.showLeaveGroupConfirm = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title($translate.instant('REALLY_LEAVE_GROUP'))
            .textContent($translate.instant('GROUP_LEAVE_NOT_UNDOABLE'))
            .ariaLabel($translate.instant('LEAVE_GRUPPE'))
            .targetEvent(ev)
            .ok($translate.instant('YES'))
            .cancel($translate.instant('NO'));

        $mdDialog.show(confirm).then(function () {
            //ok-callback

            Group.deleteById({
                id: $scope.group.id
            }, function (res) {
                loadGroup()
            }, function (err) {

            });


        }, function () {
            // Do nothing

        });
    };


    /**
     * Shows a pop-up reminding the admin that there is no current semester selected.
     * @param ev
     */
    $scope.showNoSemester = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title($translate.instant('NO_TERM_SELECTED'))
            .textContent($translate.instant('SHOULD_CREATE_TERM'))
            .ariaLabel($translate.instant('NO_TERM_SELECTED'))
            .targetEvent(ev)
            .ok($translate.instant('YES'))
            .cancel($translate.instant('NO'));

        $mdDialog.show(confirm).then(function () {
            //ok-callback

            // Take admin to the semester screen
            $location.url('/admin/semester');

        }, function () {
            // Do nothing

        });
    };
});
