angular.module('ExerciseCtrl', [])
    .controller('ExerciseController', function ($location, $scope, $filter, Semester, PlatformUser, Exercise, $mdToast, $mdPanel, PendingPlatformUser) {

        // TODO: diese Funktion wird bestimmt an vers. Stellen gebraucht, kann man die irgendwohin auslagern? Vll. in einen CommonFunctionsController oder so?
        $scope.getCurrentSemester = function() {
            var currDate = new Date();

            return Semester.find({
                filter: {
                    where: {
                        and: [
                            {start_date: {lt: currDate}},
                            {end_date: {gt: currDate}}
                        ]
                    }
                }
            })
        };

        // TODO: Sa & So müssen raus (sind drin, weil einzige Übung in der DB ein Sonntag ist)
        $scope.weekSchedules = {
            "Montag": [],
            "Dienstag": [],
            "Mittwoch": [],
            "Donnerstag": [],
            "Freitag": [],
            "Samstag": [],
            "Sonntag": []
        };

        $scope.semester = $scope.getCurrentSemester();

        // Get all exercises of current semester from db
        $scope.exercises = Exercise.find({
            filter: {
                where: {semesterId: $scope.semester.id}
            }
        }, function(exercises) {
            exercises.forEach(function(exercise) {
                var dateObj = new Date(exercise.date);
                var weekday = $filter('date')(dateObj, 'EEEE');
                var daytime = $filter('date')(dateObj, 'HH:mm');
                var endtime = dateObj.setTime(dateObj.getTime() + (1.5*60*60*1000));
                var lectureEnd = $filter('date')(endtime, 'HH:mm');

                var exerciseForTemplate = {
                    name: exercise.name,
                    location: exercise.location,
                    daytime: daytime,
                    lectureEnd: lectureEnd
                };
                // save time of the exercise (from date) in weekSchedules
                $scope.weekSchedules[weekday].push(exerciseForTemplate);
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
                panelClass: 'add-exercise-dialog',
                position: position,
                trapFocus: true,
                zIndex: 150,
                clickOutsideToClose: true,
                escapeToClose: true,
                focusOnOpen: true,
                locals: {
                    weekSchedules: $scope.weekSchedules,
                    weekday: weekday,
                    semester: $scope.semester
                }
            };

            $mdPanel.open(config);
        };

        $scope.removeExercise = function(weekday, index){
            $scope.weekSchedules[weekday].splice(index, 1);
        };

    })
    .controller('PanelDialogCtrl', PanelDialogCtrl);

function PanelDialogCtrl(mdPanelRef, $scope, weekSchedules, weekday, semester, Exercise) {
    this._mdPanelRef = mdPanelRef;
    $scope.weekSchedules = weekSchedules;
    $scope.weekday = weekday;
    $scope.semester = semester;
    $scope.exerciseName = {};
    $scope.exerciseLocation = {};
    $scope.exerciseTime = {};

    $scope.addExercise = function(weekday){
        // TODO: für richtige Anzeige nach dem Speichern
        var lectureEnd = "todo";

        var newExercise = {
            name: $scope.exerciseName[weekday],
            location: $scope.exerciseLocation[weekday],
            daytime: $scope.exerciseTime[weekday],
            lectureEnd: lectureEnd
        };

        setTimeout(function(){
            $scope.$apply(function() {
                $scope.weekSchedules[weekday].push(newExercise);
            });

            // TODO: weekSchedules in exercises umwandeln und erstellen
            $scope.exercises = null;
/*
            // write new exercises to db
            Exercise.create($scope.exercises,
                function(response) {
                    console.log(response);

                },
                function(errorResponse) {
                    console.log(errorResponse);
                }
            );
*/
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
