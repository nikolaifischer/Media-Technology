angular.module('ExerciseCtrl', [])
    .controller('ExerciseController', function ($location, $scope, $filter, Semester, PlatformUser, Exercise, $mdPanel) {

        // This Controller is used for both the admin/tutor- and the student- exercise template
        // The decision, which template to show (based on the user role), is made in the ExerciseTemplateController

        if (PlatformUser.isAuthenticated()) {
            PlatformUser.getCurrent(function (current) {
                $scope.currentUser = current;

                // needed for the explaining text at top of the admin/tutor template
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

                // needed for displaying the weekly exercises
                $scope.weekSchedules = {
                    "Montag": [],
                    "Dienstag": [],
                    "Mittwoch": [],
                    "Donnerstag": [],
                    "Freitag": []
                };

                var weekdays = {"Monday": "Montag", "Montag": "Montag",
                    "Tuesday": "Dienstag", "Dienstag": "Dienstag",
                    "Wednesday": "Mittwoch", "Mittwoch": "Mittwoch",
                    "Thursday": "Donnerstag", "Donnerstag": "Donnerstag",
                    "Friday": "Freitag", "Freitag": "Freitag"};

                // get all exercises of current semester from the db and write them into weekSchedules
                $scope.exercises = Exercise.find({
                    filter: {
                        where: {semesterId: $scope.semester.id}
                    }
                }, function(exercises) {
                    // group exercise dates to weekly exercises for displaying in schedule on the web page
                    exercises.forEach(function(exercise) {
                        var dateObj = new Date(exercise.date),
                            weekdayLocale = $filter('date')(dateObj, 'EEEE'),
                            daytime = $filter('date')(dateObj, 'HH:mm'),
                            endtime = dateObj.setTime(dateObj.getTime() + (1.5*60*60*1000)),
                            lectureEnd = $filter('date')(endtime, 'HH:mm'),
                            currentUserParticipates = (exercise.participantsUserIds
                                .filter( function(e) { return e == $scope.currentUser.id; })
                                .length > 0),
                            participantCount = exercise.participantsUserIds.length;

                        var weekday = weekdays[weekdayLocale];

                        if ($scope.weekSchedules[weekday].length <= 0 ||
                            $scope.weekSchedules[weekday].filter(function(e) { return e.daytime == daytime; }).length <= 0) {
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

                /**
                 * function for showing the dialog for creating an exercise (for admin/tutor template)
                 * @param weekday is set by the respective add button that was clicked to open the dialog
                 */
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

                /**
                 * function to remove existing exercises in the admin/tutor template
                 * @param weekday
                 * @param index
                 * weekday and index come from the respective delete button, which identifies the exercise schedule
                 */
                $scope.removeExercise = function(weekday, index){
                    // remove the exercise from the web page
                    var exercise = $scope.weekSchedules[weekday].splice(index, 1)[0];

                    // get the time period, in which the exercises have to be removed
                    var end = new Date($scope.semester.end_date).setHours(23, 59, 59, 0),
                        start = getExerciseStartDate(weekday),
                        hours = exercise.daytime.split(":")[0],
                        minutes = exercise.daytime.split(":")[1];
                    start.setHours(hours, minutes, 0, 0);

                    // get all exercises with the scheduled weekday in the previously defined period
                    // for deleting them from the db
                    while(start <= end){
                        var exerciseDate = new Date(start).toISOString();

                        Exercise.find({
                            filter: {
                                where: {date: exerciseDate}
                            }
                        }, function(exercise) {
                            // only one exercise should be returned, delete it
                            exercise.forEach(function(exercise) {
                                Exercise.deleteById({id: exercise.id}, function(response) {});
                            });
                        }, function (error) {
                            console.log(error);
                        });

                        // go on with the next exercise date of this schedule (weekday and daytime)
                        start.setDate(start.getDate() + 7);
                    }
                };

                /**
                 * function to assign a student to an exercise schedule, called when student clicks the attend button
                 * @param weekday
                 * @param index
                 * weekday and index come from the respective attend button, which identifies the exercise schedule
                 */
                $scope.attendExercise = function(weekday, index) {
                    // update weekSchedules for the correct view on the web page
                    $scope.weekSchedules[weekday][index].currentUserParticipates = true;
                    $scope.weekSchedules[weekday][index].participantCount++;
                    // add student to all relevant exercises of this schedule in the db
                    updateParticipation(weekday, index, true);
                };

                /**
                 * function to remove a student's participation from an exercise schedule, called when student clicks
                 * the leave button
                 * @param weekday
                 * @param index
                 * weekday and index come from the respective leave button, which identifies the exercise schedule
                 */
                $scope.leaveExercise = function(weekday, index) {
                    $scope.weekSchedules[weekday][index].currentUserParticipates = false;
                    $scope.weekSchedules[weekday][index].participantCount--;
                    updateParticipation(weekday, index, false);
                };

                /**
                 * internal function for updating a student's participation in an exercise schedule,
                 * called by attendExercise() and leaveExercise()
                 * @param weekday
                 * @param index
                 * @param attend
                 */
                function updateParticipation(weekday, index, attend) {
                    // get the time period, in which the exercises have to be updated
                    var exercise = $scope.weekSchedules[weekday][index],
                        end = new Date($scope.semester.end_date).setHours(23, 59, 59, 0),
                        start = getExerciseStartDate(weekday),
                        hours = exercise.daytime.split(":")[0],
                        minutes = exercise.daytime.split(":")[1];
                    start.setHours(hours, minutes, 0, 0);

                    // get all exercises with the scheduled weekday in the previously defined period
                    // for updating them in the db
                    while(start <= end){
                        var exerciseDate = new Date(start).toISOString();

                        var exerciseToUpdate = $scope.exercises.filter(function(e) {
                            return e.date == exerciseDate;
                        })[0];

                        var parameters;
                        if(attend) {
                            // add the student's participation to the exercise
                            exerciseToUpdate.participantsUserIds.push($scope.currentUser.id);

                            parameters = {exerciseId:exerciseToUpdate.id};
                            Exercise.enroll(parameters, function(success){}, function(err){
                                if(err) console.log(err);
                            });
                        } else {
                            // remove the student's participation if it exists
                            if (exerciseToUpdate.participantsUserIds.indexOf($scope.currentUser.id)!==-1) {
                                exerciseToUpdate.participantsUserIds
                                    .splice(exerciseToUpdate.participantsUserIds.indexOf($scope.currentUser.id), 1);

                                parameters = {exerciseId:exerciseToUpdate.id};
                                Exercise.disenroll(parameters, function(success){}, function(err){
                                    if(err) console.log(err);
                                });
                            }
                        }

                        // go on with the next exercise date of this schedule (weekday and daytime)
                        start.setDate(start.getDate() + 7);
                    }
                }

            }, function (error) {
                console.log(error);
            });
        }

    })
    .controller('PanelDialogCtrl', PanelDialogCtrl);

/**
 * function used for the create-exercise dialog in the admin/tutor template
 * @param mdPanelRef
 * @param $scope
 * @param $filter
 * @param weekSchedules
 * @param weekday
 * @param semester
 * @param tutors
 * @param Exercise
 * @constructor
 */
function PanelDialogCtrl(mdPanelRef, $scope, $filter, weekSchedules, weekday, semester, tutors, Exercise) {
    this._mdPanelRef = mdPanelRef;
    // create the scope variables for the create-exercise form
    $scope.weekSchedules = weekSchedules;
    $scope.weekday = weekday;
    $scope.term = semester;
    $scope.exerciseName = {};
    $scope.exerciseLocation = {};
    $scope.exerciseTime = {};
    $scope.exerciseTutor = tutors;

    /**
     * function to create an exercise schedule and add exercise dates to the db, called when admin/tutor clicks the
     * create button in the dialog form
     * @param weekday
     */
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

            // get the time period, in which exercises have to be created
            var end = new Date($scope.term.end_date).setHours(23, 59, 59, 0),
                start = getExerciseStartDate(weekday),
                hours = $filter('date')($scope.exerciseTime[weekday], 'HH'),
                minutes = $filter('date')($scope.exerciseTime[weekday], 'mm');
            start.setHours(hours, minutes, 0, 0);

            // create an exercise in the db for each date of the respective weekday in the defined time period
            while(start <= end){
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

                // go on with the next exercise date of this schedule (weekday and daytime)
                start.setDate(start.getDate() + 7);
            }

            mdPanelRef.close();
        }, 300);
    };
}

/**
 * function for closing the create-exercise dialog, called when the close button is clicked
 */
PanelDialogCtrl.prototype.closeDialog = function() {
    var panelRef = this._mdPanelRef;

    panelRef && panelRef.close().then(function() {
        angular.element(document.querySelector('.add-exercise-dialog-open-button')).focus();
        panelRef.destroy();
    });
};

/**
 * function for calculating the next start date of the time period
 * @param weekday
 * @returns {Date}
 */
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