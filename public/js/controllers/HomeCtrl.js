angular.module('HomeCtrl', []).controller('HomeController', function ($scope, $location, PlatformUser, Group, $window, $resource, $mdDialog, NewsEntry) {

    $scope.$root.hideNav = false;

    // Get current User to show its name
    $scope.currentUser;
    $scope.group;
    $scope.groupMembers;

    if (PlatformUser.isAuthenticated()) {
        PlatformUser.getCurrent(function (currentUser) {
            $scope.currentUser = currentUser;

            loadGroup();

        }, function (error) {

            console.log(error);

        })
    }


    loadNews();

    // Find the Group the User is part of


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


            // Get all the Users in the Group to show in the group card


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

    // Show admins a Pop-up if there is no current semester
    PlatformUser.getCurrent(function (currentUser) {
        if (currentUser.isAdmin) {
            $scope.getCurrentSemester(function (response) {
                if (response == undefined) {
                    $scope.showNoSemester();
                }
            });
        }
    });


});
