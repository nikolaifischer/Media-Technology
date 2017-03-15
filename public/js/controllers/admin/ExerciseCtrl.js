angular.module('ExerciseCtrl', [])
    .controller('ExerciseController', function ($location, $scope, $filter, Semester, PlatformUser, Exercise, $mdToast, $mdPanel) {

        if (PlatformUser.isAuthenticated()) {
            PlatformUser.getCurrent(function (current) {
                $scope.currentUser = current;


                // wird nur für Erklärungstext beim Admin oder Tutor verwendet, keine Studenten berücksichtigt!
                $scope.role = ($scope.currentUser.isAdmin) ? "ADMIN" : "TUTOR";

                // get tutors for selection in the dialog
                $scope.tutors = [];

                PlatformUser.find({
                    filter: {
                        where: {isTutor: true}
                    }
                }, function(tutors) {
                    tutors.forEach(function(tutor) {
                        $scope.tutors.push(tutor.first_name+" "+tutor.name);
                    })
                });

                $scope.weekSchedules = {
                    "Montag": [],
                    "Dienstag": [],
                    "Mittwoch": [],
                    "Donnerstag": [],
                    "Freitag": []
                };

                // Get all exercises of current semester from db
                $scope.exercises = Exercise.find({
                    filter: {
                        where: {semesterId: $scope.semester.id}
                    }
                }, function(exercises) {
                    // group exercise dates to weekly exercises for display in schedule
                    exercises.forEach(function(exercise) {
                        var dateObj = new Date(exercise.date),
                            weekday = $filter('date')(dateObj, 'EEEE'),
                            daytime = $filter('date')(dateObj, 'HH:mm'),
                            endtime = dateObj.setTime(dateObj.getTime() + (1.5*60*60*1000)),
                            lectureEnd = $filter('date')(endtime, 'HH:mm'),
                            currentUserParticipates = (exercise.participantsUserIds.filter(function(e) {
                               return e == $scope.currentUser.id;
                            }).length > 0),
                            participantCount = exercise.participantsUserIds.length;

                        if ($scope.weekSchedules[weekday].length <= 0 || $scope.weekSchedules[weekday].filter(function(e) { return e.daytime == daytime; }).length <= 0) {
                            // add exercise to weekSchedules, if it's not in there already
                            var exerciseForTemplate = {
                                name: exercise.name,
                                location: exercise.location,
                                daytime: daytime,
                                lectureEnd: lectureEnd,
                                tutor: exercise.tutor,
                                currentUserParticipates: currentUserParticipates,
                                participantCount: participantCount
                            };
                            $scope.weekSchedules[weekday].push(exerciseForTemplate);
                        }
                    });
                }, function (error) {
                    console.log(error);
                });


                $scope.showDialog = function(weekday) {
                    var position = $mdPanel.newPanelPosition()
                        .absolute()
                        .center();

                    var config = {
                        attachTo: angular.element(document.body),
                        controller: PanelDialogCtrl,
                        controllerAs: 'ctrl',
                        disableParentScroll: this.disableParentScroll,
                        templateUrl: 'addExerciseDialog.tmpl.html',
                        hasBackdrop: true,
                        panelClass: 'custom-dialog',
                        position: position,
                        trapFocus: true,
                        zIndex: 150,
                        clickOutsideToClose: true,
                        escapeToClose: true,
                        focusOnOpen: true,
                        locals: {
                            weekSchedules: $scope.weekSchedules,
                            weekday: weekday,
                            semester: $scope.semester,
                            tutors: $scope.tutors
                        }
                    };

                    $mdPanel.open(config);
                };

                $scope.removeExercise = function(weekday, index){
                    var exercise = $scope.weekSchedules[weekday].splice(index, 1)[0];

                    // get all weekday-time exercises of the scheduled weekday from now
                    var end = new Date($scope.semester.end_date).setHours(23, 59, 59, 0),
                        start = getExerciseStartDate(weekday),
                        hours = exercise.daytime.split(":")[0],
                        minutes = exercise.daytime.split(":")[1];

                    start.setHours(hours, minutes, 0, 0);

                    while(start <= end){
                        // save current start date because it gets faster updated than the exercise created...
                        var exerciseDate = new Date(start).toISOString();

                        Exercise.find({
                            filter: {
                                where: {date: exerciseDate}
                            }
                        }, function(exercises) {
                            // delete exercises
                            exercises.forEach(function(exercise) {
                                Exercise.deleteById({id: exercise.id}, function(response) {});
                            });
                        }, function (error) {
                            console.log(error);
                        });

                        start.setDate(start.getDate() + 7);
                    }
                };

                $scope.attendExercise = function(weekday, index) {
                    $scope.weekSchedules[weekday][index].currentUserParticipates = true;
                    $scope.weekSchedules[weekday][index].participantCount++;
                    updateParticipation(weekday, index, true);
                };

                $scope.leaveExercise = function(weekday, index) {
                    $scope.weekSchedules[weekday][index].currentUserParticipates = false;
                    $scope.weekSchedules[weekday][index].participantCount--;
                    updateParticipation(weekday, index, false);
                };

                function updateParticipation(weekday, index, attend) {
                    var exercise = $scope.weekSchedules[weekday][index],
                        end = new Date($scope.semester.end_date).setHours(23, 59, 59, 0),
                        start = getExerciseStartDate(weekday),
                        hours = exercise.daytime.split(":")[0],
                        minutes = exercise.daytime.split(":")[1];

                    start.setHours(hours, minutes, 0, 0);

                    while(start <= end){
                        var exerciseDate = new Date(start).toISOString();

                        var exerciseToUpdate = $scope.exercises.filter(function(e) {
                            return e.date == exerciseDate;
                        })[0];

                        var parameters;
                        if(attend) {
                            exerciseToUpdate.participantsUserIds.push($scope.currentUser.id);

                            parameters = {exerciseId:exerciseToUpdate.id};
                            Exercise.enroll(parameters, function (err, success) {
                                if(err) console.log(err);
                            });
                        } else {
                            if (exerciseToUpdate.participantsUserIds.indexOf($scope.currentUser.id)!==-1) {
                                exerciseToUpdate.participantsUserIds
                                    .splice(exerciseToUpdate.participantsUserIds.indexOf($scope.currentUser.id), 1);

                                parameters = {exerciseId:exerciseToUpdate.id};
                                Exercise.disenroll(parameters, function (err, success) {
                                    if(err) console.log(err);
                                });
                            }
                        }

                        start.setDate(start.getDate() + 7);
                    }
                }

            }, function (error) {
                console.log(error);
            });
        }

    })
    .controller('PanelDialogCtrl', PanelDialogCtrl);

function PanelDialogCtrl(mdPanelRef, $scope, $filter, weekSchedules, weekday, semester, tutors, Exercise) {
    this._mdPanelRef = mdPanelRef;
    $scope.weekSchedules = weekSchedules;
    $scope.weekday = weekday;
    $scope.term = semester;
    $scope.exerciseName = {};
    $scope.exerciseLocation = {};
    $scope.exerciseTime = {};
    $scope.exerciseTutor = tutors;

    $scope.addExercise = function(weekday){
        var lectureEnd = new Date($scope.exerciseTime[weekday]);
        lectureEnd.setTime(lectureEnd.getTime() + (1.5*60*60*1000));

        var newExercise = {
            name: $scope.exerciseName[weekday],
            location: $scope.exerciseLocation[weekday],
            daytime: $filter('date')($scope.exerciseTime[weekday], 'HH:mm'),
            lectureEnd: $filter('date')(lectureEnd, 'HH:mm'),
            tutor: $scope.exerciseTutor[weekday]
        };

        setTimeout(function(){
            $scope.$apply(function() {
                $scope.weekSchedules[weekday].push(newExercise);
            });

            // get all dates of the scheduled weekday from now
            var end = new Date($scope.term.end_date).setHours(23, 59, 59, 0),
                start = getExerciseStartDate(weekday),
                hours = $filter('date')($scope.exerciseTime[weekday], 'HH'),
                minutes = $filter('date')($scope.exerciseTime[weekday], 'mm');

            start.setHours(hours, minutes, 0, 0);

            while(start <= end){
                // save current start date because it gets faster updated than the exercise created...
                var exerciseDate = new Date(start);

                Exercise.create({
                    "name": newExercise.name,
                    "date": exerciseDate,
                    "semesterId": $scope.term.id,
                    "location": newExercise.location,
                    "tutor": newExercise.tutor
                }, function(response) {
                }, function(error) {
                    console.log(error);
                });

                start.setDate(start.getDate() + 7);
            }

            mdPanelRef.close();
        }, 300);
    };
}

PanelDialogCtrl.prototype.closeDialog = function() {
    var panelRef = this._mdPanelRef;

    panelRef && panelRef.close().then(function() {
        angular.element(document.querySelector('.add-exercise-dialog-open-button')).focus();
        panelRef.destroy();
    });
};

function getExerciseStartDate(weekday) {
    var currentDay = new Date().getDay(),
        weekdayNumbers = {"Montag":1, "Dienstag": 2, "Mittwoch": 3, "Donnerstag": 4, "Freitag": 5},
        offset = 0;

    if(currentDay == weekdayNumbers[weekday]) {
        // if the next exercise would be today, jump to next week
        offset = 7;
    } else if(currentDay == 0) {
        // if today is Sunday (day 0), offset is the desired exercise day
        offset = weekdayNumbers[weekday];
    } else {
        offset = ((7 + weekdayNumbers[weekday]) - currentDay) % 7;
    }

    var start = new Date();
    start.setDate(start.getDate() + offset);

    return start;
}