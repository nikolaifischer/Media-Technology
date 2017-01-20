angular.module('AudioCtrl', [])
    .controller('AudioController', function ($scope, $filter, $timeout, $log, $q, $http, PlatformUser, Group, Lab, LabType, $window) {
        //Get Audio LabType
        $scope.audiolabs = LabType.find({
            filter: {
                where: {type: 1}
            }
        });

        var groupedElements = {};
        //Find Labs with Audio LabType Id
        $scope.labs = Lab.find({
            filter: {
                where: {labTypeId: $scope.audiolabs.id}
            }
        }, function(labs) {
            //Get format for calendar
            labs.forEach(function(element) {
                var index = element.date.slice(0, 10);
                if(groupedElements[index] === undefined) {
                    groupedElements[index] = [];
                }
                groupedElements[index].push(element);
                $scope.setDayContent(element.date.slice(0,10));
            });

            if (loadContentAsync) {
                var deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve(groupedElements);
                });
                return deferred.promise;
            }


            return groupedElements;

        }, function (error) {
            console.log(error);
        });

        // Get current User
        $scope.currentUser;
        if (PlatformUser.isAuthenticated()) {
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
            //Get Selected Date
            $scope.clickedDay = $filter("date")(date, "EEEE, d. MMMM y");
            $scope.key = $filter("date")(date, "yyyy-MM-dd");

            //Get lab details with clicked day key
            $scope.objects = (groupedElements[$scope.key] || []);
        };

        $scope.prevMonth = function (data) {
            $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
        };

        $scope.nextMonth = function (data) {
            $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
        };

        $scope.tooltips = true;

        var numFmt = function(num) {
            num = num.toString();
            if (num.length < 2) {
                num = "0" + num;
            }
            return num;
        };

        var loadContentAsync = true;

        //Set content in calendar cells
        //TODO: load Content after find labs
        $scope.setDayContent = function(date) {
                var key;
                if (date.length != undefined) {
                    key = date;
                } else {
                    key = [date.getFullYear(), numFmt(date.getMonth() + 1), numFmt(date.getDate())].join("-");
                }
                var data = [];
                var objects = (groupedElements[key] || []);
                if(objects.length > 0) {
                    for (var i =0; i <= objects.length && groupedElements[key][i] != undefined; i++){
                        data.push(groupedElements[key][i].date.slice(11, 16));
                    }
                }
            $scope.dayContent = data;
            if (loadContentAsync) {
                var deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve(data);
                });
                return deferred.promise;
            }
            return data;
        };

        $scope.date = new Date();
        $scope.time = new Date();
        //$scope.dateTime = new Date();
        $scope.minDate = moment().subtract(1, 'month');

        $scope.createLab = function () {
            Lab.create({
                    "date": $scope.dateTime,
                    "duration": $scope.duration,
                    "location": $scope.location,
                    "labTypeId": $scope.audiolabs.id
            }, function (error) {
                console.log(error);
            });
        };

        $scope.priorities = [
            { id: 0, name: '-' },
            { id: 1, name: '1' },
            { id: 2, name: '2' },
            { id: 3, name: '3' }
        ];
        //$scope.selectedPriority = { id: 0, name: '-' };
        //TODO savePriorities
        /*$scope.savePriorities = function () {
            console.log(this.selectedPriority);
        }*/
    });