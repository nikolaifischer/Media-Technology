angular.module('AudioCtrl', [])
    .controller('AudioController', function ($scope, $filter, $timeout, $log, $q, $http, PlatformUser, Group, Lab, $window) {

        //Find Labs
        $scope.lab;
        Lab.find({}, function (labs) {
            for (var i = 0; i < labs.length; i++) {
                $scope.lab = labs[i];
                console.log($scope.lab);
            }
        }, function (error) {
            console.log(error);
        });

        // Get current User to show its name
        $scope.currentUser;
        if (PlatformUser.isAuthenticated) {
            PlatformUser.getCurrent(function (currentUser) {
                $scope.currentUser = currentUser;

            }, function (error) {
                console.log(error);
            });
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

        //var labs = {"2015-01-01":[{"name":"Last Day of Kwanzaa","country":"US","date":"2015-01-01"},{"name":"New Year's Day","country":"US","date":"2015-01-01"}],"2015-01-06":[{"name":"Epiphany","country":"US","date":"2015-01-06"}],"2015-01-07":[{"name":"Orthodox Christmas","country":"US","date":"2015-01-07"}],"2015-01-19":[{"name":"Martin Luther King, Jr. Day","country":"US","date":"2015-01-19"}],"2015-02-02":[{"name":"Groundhog Day","country":"US","date":"2015-02-02"}],"2015-02-14":[{"name":"Valentine's Day","country":"US","date":"2015-02-14"}],"2015-02-16":[{"name":"Washington's Birthday","country":"US","date":"2015-02-16"}],"2015-02-18":[{"name":"Ash Wednesday","country":"US","date":"2015-02-18"}],"2015-03-08":[{"name":"International Women's Day","country":"US","date":"2015-03-08"}],"2015-03-17":[{"name":"Saint Patrick's Day","country":"US","date":"2015-03-17"}],"2015-03-29":[{"name":"Palm Sunday","country":"US","date":"2015-03-29"}],"2015-04-01":[{"name":"April Fools' Day","country":"US","date":"2015-04-01"}],"2015-04-03":[{"name":"Good Friday","country":"US","date":"2015-04-03"}],"2015-04-05":[{"name":"Easter","country":"US","date":"2015-04-05"}],"2015-04-22":[{"name":"Earth Day","country":"US","date":"2015-04-22"}],"2015-04-24":[{"name":"Arbor Day","country":"US","date":"2015-04-24"}],"2015-05-01":[{"name":"May Day","country":"US","date":"2015-05-01"}],"2015-05-04":[{"name":"Star Wars Day","country":"US","date":"2015-05-04"}],"2015-05-05":[{"name":"Cinco de Mayo","country":"US","date":"2015-05-05"}],"2015-05-10":[{"name":"Mother's Day","country":"US","date":"2015-05-10"}],"2015-05-25":[{"name":"Memorial Day","country":"US","date":"2015-05-25"}],"2015-06-14":[{"name":"Flag Day","country":"US","date":"2015-06-14"}],"2015-06-21":[{"name":"Father's Day","country":"US","date":"2015-06-21"}],"2015-06-27":[{"name":"Helen Keller Day","country":"US","date":"2015-06-27"}],"2015-07-04":[{"name":"Independence Day","country":"US","date":"2015-07-04"}],"2015-08-26":[{"name":"Women's Equality Day","country":"US","date":"2015-08-26"}],"2015-09-07":[{"name":"Labor Day","country":"US","date":"2015-09-07"}],"2015-09-11":[{"name":"Patriot Day","country":"US","date":"2015-09-11"}],"2015-09-13":[{"name":"Grandparent's Day","country":"US","date":"2015-09-13"}],"2015-09-17":[{"name":"Constitution Day","country":"US","date":"2015-09-17"}],"2015-10-06":[{"name":"German-American Day","country":"US","date":"2015-10-06"}],"2015-10-09":[{"name":"Leif Erkson Day","country":"US","date":"2015-10-09"}],"2015-10-12":[{"name":"Columbus Day","country":"US","date":"2015-10-12"}],"2015-10-31":[{"name":"Halloween","country":"US","date":"2015-10-31"}],"2015-11-03":[{"name":"Election Day","country":"US","date":"2015-11-03"}],"2015-11-11":[{"name":"Veterans Day","country":"US","date":"2015-11-11"}],"2015-11-26":[{"name":"Thanksgiving Day","country":"US","date":"2015-11-26"}],"2015-11-27":[{"name":"Black Friday","country":"US","date":"2015-11-27"}],"2015-12-07":[{"name":"Pearl Harbor Remembrance Day","country":"US","date":"2015-12-07"}],"2015-12-08":[{"name":"Immaculate Conception of the Virgin Mary","country":"US","date":"2015-12-08"}],"2015-12-24":[{"name":"Christmas Eve","country":"US","date":"2015-12-24"}],"2015-12-25":[{"name":"Christmas","country":"US","date":"2015-12-25"}],"2015-12-26":[{"name":"First Day of Kwanzaa","country":"US","date":"2015-12-26"}],"2015-12-27":[{"name":"Second Day of Kwanzaa","country":"US","date":"2015-12-27"}],"2015-12-28":[{"name":"Third Day of Kwanzaa","country":"US","date":"2015-12-28"}],"2015-12-29":[{"name":"Fourth Day of Kwanzaa","country":"US","date":"2015-12-29"}],"2015-12-30":[{"name":"Fifth Day of Kwanzaa","country":"US","date":"2015-12-30"}],"2015-12-31":[{"name":"New Year's Eve","country":"US","date":"2015-12-31"},{"name":"Sixth Day of Kwanzaa","country":"US","date":"2015-12-31"}],"2016-01-01":[{"name":"Last Day of Kwanzaa","country":"US","date":"2016-01-01"},{"name":"New Year's Day","country":"US","date":"2016-01-01"}],"2016-01-06":[{"name":"Epiphany","country":"US","date":"2016-01-06"}],"2016-01-07":[{"name":"Orthodox Christmas","country":"US","date":"2016-01-07"}],"2016-01-18":[{"name":"Martin Luther King, Jr. Day","country":"US","date":"2016-01-18"}],"2016-02-02":[{"name":"Groundhog Day","country":"US","date":"2016-02-02"}],"2016-02-10":[{"name":"Ash Wednesday","country":"US","date":"2016-02-10"}],"2016-02-14":[{"name":"Valentine's Day","country":"US","date":"2016-02-14"}],"2016-02-15":[{"name":"Washington's Birthday","country":"US","date":"2016-02-15"}],"2016-03-08":[{"name":"International Women's Day","country":"US","date":"2016-03-08"}],"2016-03-17":[{"name":"Saint Patrick's Day","country":"US","date":"2016-03-17"}],"2016-03-20":[{"name":"Palm Sunday","country":"US","date":"2016-03-20"}],"2016-03-25":[{"name":"Good Friday","country":"US","date":"2016-03-25"}],"2016-03-27":[{"name":"Easter","country":"US","date":"2016-03-27"}],"2016-04-01":[{"name":"April Fools' Day","country":"US","date":"2016-04-01"}],"2016-04-22":[{"name":"Earth Day","country":"US","date":"2016-04-22"}],"2016-04-29":[{"name":"Arbor Day","country":"US","date":"2016-04-29"}],"2016-05-01":[{"name":"May Day","country":"US","date":"2016-05-01"}],"2016-05-04":[{"name":"Star Wars Day","country":"US","date":"2016-05-04"}],"2016-05-05":[{"name":"Cinco de Mayo","country":"US","date":"2016-05-05"}],"2016-05-08":[{"name":"Mother's Day","country":"US","date":"2016-05-08"}],"2016-05-30":[{"name":"Memorial Day","country":"US","date":"2016-05-30"}],"2016-06-14":[{"name":"Flag Day","country":"US","date":"2016-06-14"}],"2016-06-19":[{"name":"Father's Day","country":"US","date":"2016-06-19"}],"2016-06-27":[{"name":"Helen Keller Day","country":"US","date":"2016-06-27"}],"2016-07-04":[{"name":"Independence Day","country":"US","date":"2016-07-04"}],"2016-08-26":[{"name":"Women's Equality Day","country":"US","date":"2016-08-26"}],"2016-09-05":[{"name":"Labor Day","country":"US","date":"2016-09-05"}],"2016-09-11":[{"name":"Grandparent's Day","country":"US","date":"2016-09-11"},{"name":"Patriot Day","country":"US","date":"2016-09-11"}],"2016-09-17":[{"name":"Constitution Day","country":"US","date":"2016-09-17"}],"2016-10-06":[{"name":"German-American Day","country":"US","date":"2016-10-06"}],"2016-10-09":[{"name":"Leif Erkson Day","country":"US","date":"2016-10-09"}],"2016-10-10":[{"name":"Columbus Day","country":"US","date":"2016-10-10"}],"2016-10-31":[{"name":"Halloween","country":"US","date":"2016-10-31"}],"2016-11-08":[{"name":"Election Day","country":"US","date":"2016-11-08"},{"name":"Super Tuesday","country":"US","date":"2016-11-08"}],"2016-11-11":[{"name":"Veterans Day","country":"US","date":"2016-11-11"}],"2016-11-24":[{"name":"Thanksgiving Day","country":"US","date":"2016-11-24"}],"2016-11-25":[{"name":"Black Friday","country":"US","date":"2016-11-25"}],"2016-12-07":[{"name":"Pearl Harbor Remembrance Day","country":"US","date":"2016-12-07"}],"2016-12-08":[{"name":"Immaculate Conception of the Virgin Mary","country":"US","date":"2016-12-08"}],"2016-12-24":[{"name":"Christmas Eve","country":"US","date":"2016-12-24"}],"2016-12-25":[{"name":"Christmas","country":"US","date":"2016-12-25"}],"2016-12-26":[{"name":"First Day of Kwanzaa","country":"US","date":"2016-12-26"}],"2016-12-27":[{"name":"Second Day of Kwanzaa","country":"US","date":"2016-12-27"}],"2016-12-28":[{"name":"Third Day of Kwanzaa","country":"US","date":"2016-12-28"}],"2016-12-29":[{"name":"Fourth Day of Kwanzaa","country":"US","date":"2016-12-29"}],"2016-12-30":[{"id":"Fifth Day of Kwanzaa","country":"US","date":"2016-12-30"}],"2016-12-31":[{"id":"New Year's Eve","country":"US","date":"2016-12-31"},{"id":"Sixth Day of Kwanzaa","country":"US","date":"2016-12-31"}]};
        var labs = {
            "2017-01-03":[{
                "date": "2017-01-03T10:26:00.000Z",
                "duration": 120,
                "location": "Amalienstraße 17",
                "passed": false,
                "id": "5871274b051caef00d19239a",
                "semesterId": "58712749051caef00d19238a",
                "groupId": "5871274b051caef00d192398",
                "labTypeId": "string"
            }],
            "2017-01-05":[{
                "date": "2017-01-05",
                "duration": 120,
                "location": "string",
                "passed": false,
                "id": "5871274b051caef00d19239a",
                "semesterId": "58712749051caef00d19238a",
                "groupId": "5871274b051caef00d192398",
                "labTypeId": "5871274b051caef00d192399"
            }],
            "2017-01-07":[{
                "date": "2017-01-07",
                "duration": 120,
                "location": "Amalienstraße 17",
                "passed": false,
                "id": "5871274b051caef00d19239a",
                "semesterId": "58712749051caef00d19238a",
                "groupId": "5871274b051caef00d192398",
                "labTypeId": "5871274b051caef00d192399"
            }],
        };
        var numFmt = function(num) {
            num = num.toString();
            if (num.length < 2) {
                num = "0" + num;
            }
            return num;
        };

        var loadContentAsync = true;
        $log.info("setDayContent.async", loadContentAsync);

        $scope.setDayContent = function(date) {
            var key = [date.getFullYear(), numFmt(date.getMonth()+1), numFmt(date.getDate())].join("-");
            var data = (labs[key]||[{ id: ""}])[0].id;
            if (loadContentAsync) {
                var deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve(data);
                });
                return deferred.promise;
            }
            return data;
        };
});
