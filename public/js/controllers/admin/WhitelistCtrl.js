angular.module('WhitelistCtrl', [])
    .controller('WhitelistController', function ($location, $scope, $translate, PlatformUser, $mdToast, PendingPlatformUser) {

    // Controller for managing the whitelist, which represents not yet registered users, who are allowed to register
    // on the platform

    // Users uploaded via CSV
    $scope.userList = [];

    // Front-End Flags
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

    $scope.paginationLabel = {
        page: $translate.instant('PAGINATION_PAGE'),
        rowsPerPage: $translate.instant('PAGINATION_ROWS_PER_PAGE'),
        of: $translate.instant('PAGINATION_OF')
    };

    $scope.selectedPendingPlatformUsers = [];


    // only tutors and admins should reach the admin route
    if (PlatformUser.isAuthenticated()) {
        PlatformUser.getCurrent(function (currentUser) {
            if(!(currentUser.isAdmin)) {
                $location.path('/');
            }
        }, function (error) {
            console.log(error);
        });
    }

    /**
     * Whitelist as CSV Upload routine.
     */
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
            $scope.userList = csvToJSON.Praktikum;
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
        })
    };

    /**
     * Saves the userlist in the $scope to the DB
     * The userlist is parsed from a csv file.
     */
    $scope.saveToPendingPlatformUsers = function () {

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
        PendingPlatformUser.prototype$patchAttributes({ id: user.id }, user);
    };

    $scope.deleteEntry = function($event, user){
        PendingPlatformUser.deleteById({
            id: user.id
        }, function(success){
            $scope.getPendingPlatformUsers();
        })
    };


    /**
     * Discards current uploaded user list.
     */
    $scope.deleteUpload = function(){
        $scope.userList = [];
        $scope.showWhiteListButton=false;
    };

    // Initial Load of the current Whitelist
    $scope.getPendingPlatformUsers();

    // Change Handler for the CSV Upload Button
}).directive('fileOnChange', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.fileOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});