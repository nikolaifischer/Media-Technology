angular.module('HomeCtrl', []).controller('HomeController', function ($scope, PlatformUser, Group, $window, $resource, $mdDialog) {

    // Get current User to show its name
    $scope.currentUser;
    if (PlatformUser.isAuthenticated) {
        PlatformUser.getCurrent(function (currentUser) {
            $scope.currentUser = currentUser;

        }, function (error) {

            console.log(error);

        })
    }


    // Find the Group the User is part of
    $scope.group;
    $scope.groupMembers;

    loadGroup();




    // News Editor
    $scope.hideEditor = false;
    $scope.news = " <br> <ul> <li> Die Übung entfällt heute</li> <li>Die Prüfung findet am 24.12.17 statt</li> </ul>";
    $scope.saveEditor = function () {
        console.log("Saving the editor!");

        //TODO Save in Backend DB
    }


    // CALENDAR CODE

    $scope.dayFormat = "d";

    // To select a single date, make sure the ngModel is not an array.
    $scope.selectedDate = null;

    // If you want multi-date select, initialize it as an array.
    $scope.selectedDate = [];

    $scope.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
    $scope.setDirection = function (direction) {
        $scope.direction = direction;
        $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    $scope.dayClick = function (date) {
        $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
    };

    $scope.prevMonth = function (data) {
        $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };

    $scope.nextMonth = function (data) {
        $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };

    $scope.tooltips = true;
    $scope.setDayContent = function (date) {

        // You would inject any HTML you wanted for
        // that particular date here.
        return "<p></p>";

        // You could also use an $http function directly.
        return $http.get("/some/external/api");

        // You could also use a promise.
        var deferred = $q.defer();
        $timeout(function () {
            deferred.resolve("<p></p>");
        }, 1000);
        return deferred.promise;

    };




    function loadGroup () {

        //TODO: Das kann doch mit einer Relation von Platform User aus gemacht werden, wenn die Berechtigungen irgendwann stimmen => Effizienter
        Group.find({}, function (groups) {
            console.log("loading");
            // Success Callback
            var found = false;
            for (var i = 0; i < groups.length; i++) {
                if (groups[i].groupMemberIds.indexOf($scope.currentUser.id) > -1) {
                    $scope.group = groups[i];
                    found = true;
                    break;
                }
            }

            if(!found){
                console.log("found nothing");
                $scope.group=undefined;
                $scope.groupMembers=undefined;
            }


            // Get all the Users in the Group to show in the group card

            Group.groupMembers({

                    id: $scope.group.id

                }, function (members) {
                    $scope.groupMembers = members;
                    console.log(members);

                }, function (error) {
                    console.log(error);

                }
            );


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
            .title('Willst du die Gruppe wirklich verlassen?')
            .textContent('Dies kann nicht mehr rückgängig gemacht werden')
            .ariaLabel('Gruppe verlassen')
            .targetEvent(ev)
            .ok('Ja')
            .cancel('Nein');

        $mdDialog.show(confirm).then(function () {
            //ok-callback

            Group.groupMembers.unlink({

                    id: $scope.group.id,
                    fk: $scope.currentUser.id

                }, null, function (success) {
                    console.log("Gruppe verlassen");
                    // reload group
                    loadGroup()


                }, function (error) {
                    console.log(error);

                }
            );


            // TODO: Im Backend Gruppe verlassen
        }, function () {
            // Do nothing

        });
    };


});
