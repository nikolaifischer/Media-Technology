angular.module('WhitelistCtrl', [])
.controller('WhitelistController', function ($location, $scope, PlatformUser, $mdToast, PendingPlatformUser) {

    $scope.userList = [];
    $scope.showWhiteListButton = false;
    $scope.showUpload = false;
    $scope.pendingPlatformUsers = null;
    $scope.loading = false;
    $scope.showAddCard = false;

    // Data Object for a manually added White-List entry.
    $scope.newWhitelistEntry = {};

    // Table:

    $scope.selected = [];

    // Query Object for the CSV View
    $scope.query = {
        order: 'email',
        limit: 10,
        page: 1
    };

    // Query Object for the DB View
    $scope.dbQuery = {
        order: 'email',
        limit: 10,
        page: 1
    };

    $scope.selectedPendingPlatformUsers = [];


    // only tutors and admins should reach the admin route
    // TODO: warum Tutoren, wenn sie sowieso nichts ändern können (wegen fehlender Berechtigung)
    if (PlatformUser.isAuthenticated()) {
        PlatformUser.getCurrent(function (currentUser) {
            if(!(currentUser.isTutor||currentUser.isAdmin)) {
                $location.path('/');
            }
        }, function (error) {
            console.log(error);
        });
    }

    $scope.uploadFile = function(){
        $scope.loading = true;
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
                row = row.replace("E-Mail", "email");
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
            $scope.userList = csvToJSON.Praktikum;
            console.log("Upload");
            // For some reason this is needed here: Without it the scope does not update propably.
            $scope.$apply(function(){
                $scope.loading = false;
                $scope.showWhiteListButton = true;
            });
        };
    };


    /**
     * Allows the user to manually add 1 E-Mail Address to the Whitelist.
     */
    $scope.add = function() {
        $scope.newWhitelistEntry.semesterId = $scope.semester.id;
        PendingPlatformUser.create($scope.newWhitelistEntry, function(res){
            $scope.getPendingPlatformUsers();
            $scope.showAddCard = false;
        }, function(err){
            console.log(err);
        });
    };

    $scope.getPendingPlatformUsers = function () {
        PendingPlatformUser.find({}, function(res){
            $scope.pendingPlatformUsers = res;
            console.log($scope.pendingPlatformUsers);
        })
    };

    $scope.saveToPendingPlatformUsers = function () {
        // TODO Check if email is already in the DB => In Backend
        console.log("saving");

        // Extract the fields we want to save (right now only the email):
        var saveArr=[];
        for(var i = 0; i<$scope.userList.length; i++){
            var obj = {"email": $scope.userList[i].email,
            "first_name" : $scope.userList[i].Vorname,
            "name": $scope.userList[i].Nachname,
            "semesterId":$scope.semester.id};
            saveArr.push(obj);
        }

        for(var i = 0; i<saveArr.length; i++){
            PendingPlatformUser.create(saveArr[i], function(res){
                $scope.getPendingPlatformUsers();
            });
        }

        $scope.showUpload = false;
    };

    $scope.saveEdit = function ($event, user) {
        PendingPlatformUser.prototype$updateAttributes({ id: user.id }, user);

        $mdToast.show(
            $mdToast.simple()
                .textContent('Eintrag gespeichert')
                .hideDelay(2000)
                .toastClass("toast")
        );
    };

    $scope.deleteEntry =function($event, user){
        PendingPlatformUser.deleteById({
            id: user.id
        }, function(success){
            $scope.getPendingPlatformUsers();
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Eintrag gelöscht')
                    .hideDelay(2000)
                    .toastClass("toast")
            );
        })
    };

    $scope.deleteUpload = function(){
        //TODO: Die selbe Datei kann noch nicht 2 mal hintereinander hochgeladen werden (Wegen dem Change Handler)
        $scope.userList = [];
        $scope.showWhiteListButton=false;
    };

    $scope.getPendingPlatformUsers();

}).directive('fileOnChange', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.fileOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});