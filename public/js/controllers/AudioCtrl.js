angular.module('AudioCtrl', []).controller('AudioController', function ($scope, $filter, PlatformUser, Group, $window) {

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
    // This cannot be done with a filter, so it fetches all Groups
    Group.find({}, function (groups) {
        // Success Callback
        for (var i = 0; i < groups.length; i++) {
            if (groups[i].groupMemberIds.indexOf($scope.currentUser.id) > -1) {
                $scope.group = groups[i];
            }
        }
    }, function (error) {
        //Error Callback
        console.log(error);
    });


    // CALENDAR CODE

    $scope.dayFormat = "d";

    // To select a single date, make sure the ngModel is not an array.
    $scope.selectedDate = null;

    // If you want multi-date select, initialize it as an array.
    $scope.selectedDate = false;

    $scope.firstDayOfWeek = 1; // First day of the week, 0 for Sunday, 1 for Monday, etc.
    $scope.setDirection = function (direction) {
        $scope.direction = direction;
        $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    $scope.dayClick = function (date) {
        console.log(date);
        $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
        $scope.clickedDay = $filter("date")(date, "EEEE, d. MMMM y");
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

});
