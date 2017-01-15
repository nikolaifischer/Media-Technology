angular.module('AdminCtrl', [])
    .controller('AdminController', function ($location, $scope, PlatformUser, $mdToast) {

        // only tutors should reach the admin route (TODO: what about admins?)
        if (PlatformUser.isAuthenticated) {
            PlatformUser.getCurrent(function (currentUser) {
                //console.log(currentUser);
                if(!currentUser.isTutor) {
                    $location.path('/');
                }
            }, function (error) {
                console.log(error);
            });
        }

        $scope.uploadFile = function(){
            var file = document.getElementById('userUpload').files[0],
                read = new FileReader();
            read.readAsText(file);

            read.onloadend = function(e){
                var content = e.target.result;

                // parse csv
                var csvToJSON = {"Praktikum":[], "Uebung":[]};
                var lines = content.split('\r\n');
                var practice, exercise, practiceData, exerciseData = false;
                var header;

                for(var lineNr = 0; lineNr < lines.length; lineNr++) {
                    var row = lines[lineNr];
                    var columns = row.split(",");

                    if(practice) {
                        // here comes the practice header -> save for later
                        header = columns;
                        practice = false;
                        practiceData = true;
                        continue;
                    }
                    if(exercise) {
                        // here comes the exercise header -> save for later
                        header = columns;
                        practiceData = false;
                        exercise = false;
                        exerciseData = true;
                        continue;
                    }

                    var obj = {};
                    for(var colNr = 0; colNr < columns.length; colNr++) {
                        var value = columns[colNr];

                        if(value == "") {
                            continue;
                        } else if(value == "Praktikum:") {
                            practice = true;
                            continue;
                        } else if(value == "Übung:") {
                            exercise = true;
                            continue;
                        }

                        obj[header[colNr]] = value;
                    }

                    if(!angular.equals({}, obj)) {
                        if(practiceData) {
                            csvToJSON.Praktikum.push(obj);
                        } else if(exerciseData) {
                            csvToJSON.Uebung.push(obj);
                        }
                    }
                }
                console.log(csvToJSON);
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Upload erfolgreich')
                        .hideDelay(3000)
                        .toastClass("toast")
                );
            };
        };
}).directive('fileOnChange', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.fileOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});;