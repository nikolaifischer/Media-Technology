angular.module('HomeCtrl', []).controller('HomeController', function ($scope, $location, PlatformUser, LabType, Lab, Group, UniqueDate, Exercise, MaterialCalendarData, $window, $filter, $resource, $mdDialog, NewsEntry) {
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
            loadUniqueDates();
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


        // News Editor
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


        // CALENDAR CODE
        $scope.dayFormat = "d";
        $scope.selectedDate = null;
        $scope.firstDayOfWeek = 1;
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
            var content = "";
            for (var i=0; i < $scope.objects.length; i++) {
                //set start end end time
                if($scope.objects[i].duration == undefined) {
                    $scope.objects[i].duration = 90;
                }
                var dateObj = new Date($scope.objects[i].date);
                $scope.objects[i].end = $filter('date')(dateObj.setTime(dateObj.getTime() + ($scope.objects[i].duration * 60 * 1000)), 'HH:mm');

                //format Details for mdDialog
                content += "<div class='title'>"+$scope.objects[i].name+"</div>";
                content += "<div>"+$filter("date")($scope.objects[i].date, "HH:mm")+" - "+$scope.objects[i].end+" Uhr</div>";
                content += "<div><a href='http://maps.google.com/?q={{ object.location }}' target='_blank'>"+$scope.objects[i].location+"</a></div>";
                if ($scope.objects[i].tutor != undefined) {
                    content += "<div>" + $scope.objects[i].tutor + "</div>";
                }
                if ($scope.objects[i].description != undefined) {
                    content += "<div>" + $scope.objects[i].description + "</div>";
                }
                content += "<br>"
            }

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

        $scope.tooltips = true;

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
                dates.forEach(function (element) {
                    console.log(element);
                    itemsProcessed++;
                    var date = element.date.slice(0, 10);
                    if (groupedDates[date] === undefined) {
                        groupedDates[date] = [];
                    }
                    groupedDates[date].push(element);

                    if (groupedUniques[date] === undefined) {
                        groupedUniques[date] = [];
                    }
                    groupedUniques[date].push(element);

                    Object.keys(groupedUniques).forEach(function (date) {
                        uniqueDatesContent = "<div class='calendar_content uniquedate'>Termin</div>";
                        MaterialCalendarData.setDayContent(new Date(date), uniqueDatesContent);
                        daysWithContent.push(date);
                    });

                    if(itemsProcessed === dates.length) {
                        loadExercises(daysWithContent, uniqueDatesContent);
                    }
                });
            });
        }

        function loadExercises(daysWithContent, uniqueDatesContent) {
            var itemsProcessed = 0;
            $scope.exercises = Exercise.find({
                filter: {
                    where: {semesterId: $scope.semester.id}
                }
            }, function (exrcs) {
                exrcs.forEach(function(element) {
                    itemsProcessed++;
                    if (!$scope.currentUser.isAdmin && !$scope.currentUser.isTutor) {
                        if (element.participantsUserIds.indexOf($scope.currentUser.id) > -1) {
                            writeExercises(element, exrcs, daysWithContent, uniqueDatesContent, itemsProcessed);
                        }
                    } else {
                        if(element.tutor == $scope.currentUser.first_name +" "+$scope.currentUser.name) {
                            writeExercises(element, exrcs, daysWithContent, uniqueDatesContent, itemsProcessed);
                        }
                    }
                });
            });
        }
        function writeExercises(element, exrcs, daysWithContent, uniqueDatesContent, itemsProcessed) {
            var daysWithMoreContent = [];
            var addedUpContent = "";
            var date = element.date.slice(0, 10);
            if (groupedDates[date] === undefined) {
                groupedDates[date] = [];
            }
            if(groupedDates[date].indexOf(element) === -1) {
                groupedDates[date].push(element);
            }

            if (groupedExercises[date] === undefined) {
                groupedExercises[date] = [];
            }
            if(groupedExercises[date].indexOf(element) === -1) {
                groupedExercises[date].push(element);
            }

            Object.keys(groupedExercises).forEach(function (date) {
                var exercisesContent = "<div class='calendar_content excrs'>Übung</div>";
                if(daysWithContent.indexOf(date) > -1) {
                    addedUpContent = uniqueDatesContent+exercisesContent;
                } else {
                    addedUpContent = exercisesContent;
                }
                MaterialCalendarData.setDayContent(new Date(date), addedUpContent);
                daysWithMoreContent.push(date);
            });

            if(itemsProcessed === exrcs.length) {
                loadOurLabs(daysWithMoreContent, addedUpContent);
            }
        }

        function loadOurLabs(daysWithMoreContent, addedUpContent) {
            if (!$scope.currentUser.isAdmin && !$scope.currentUser.isTutor) {
                $scope.ourLabs = Lab.find({
                    filter: {
                        where: {semesterId: $scope.semester.id, groupId: $scope.group.id}
                    }
                }, function (labs) {
                    writeLabs(labs, daysWithMoreContent, addedUpContent);
                });
            } else {
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
                LabType.findById({id: element.labTypeId},function(res) {element.name = res.type_str});
                PlatformUser.findById({id: element.tutorId},function(res) {element.tutor = res.first_name+" "+res.name});
                if (groupedDates[date] === undefined) {
                    groupedDates[date] = [];
                }
                if(groupedDates[date].indexOf(element) === -1) {
                    groupedDates[date].push(element);
                }

                if (groupedLabs[date] === undefined) {
                    groupedLabs[date] = [];
                }
                if(groupedLabs[date].indexOf(element) === -1) {
                    groupedLabs[date].push(element);
                }

                Object.keys(groupedLabs).forEach(function (date) {
                    var labsContent = "<div class='calendar_content prktkm'>Praktikum</div>";
                    if(daysWithMoreContent.indexOf(date) > -1) {
                        allContent = addedUpContent+labsContent;
                    } else {
                        allContent = labsContent;
                    }
                    MaterialCalendarData.setDayContent(new Date(date), allContent);
                });
            });
        }

        function loadGroup() {

            //TODO: Das kann doch mit einer Relation von Platform User aus gemacht werden, wenn die Berechtigungen irgendwann stimmen => Effizienter
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
                    console.log("found nothing");
                    $scope.group = undefined;
                    $scope.groupMembers = undefined;
                }
                else {
                    console.log("I found the group");

                    Group.groupMembers({

                            id: $scope.group.id

                        }, function (members) {
                            $scope.groupMembers = members;
                            console.log(members);

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


        // Leave Group

        $scope.showLeaveGroupConfirm = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Willst du die Gruppe wirklich verlassen und löschen?')
                .textContent('Dies kann nicht mehr rückgängig gemacht werden - Alle anderen Gruppenmitglieder verlassen ebenfalls die Gruppe')
                .ariaLabel('Gruppe verlassen')
                .targetEvent(ev)
                .ok('Ja')
                .cancel('Nein');

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


        // Show No-Semester Pop-up

        $scope.showNoSemester = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Kein Semester gewählt!')
                .textContent('Bevor du beginnst solltest du ein Semester erstellen. Möchtest du das jetzt tun?')
                .ariaLabel('Kein Semester gewählt')
                .targetEvent(ev)
                .ok('Ja')
                .cancel('Nein');

            $mdDialog.show(confirm).then(function () {
                //ok-callback

                $location.url('/admin/semester');

            }, function () {
                // Do nothing

            });
        };
});
