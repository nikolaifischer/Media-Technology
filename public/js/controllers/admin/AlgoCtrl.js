angular.module('AlgoCtrl', [])
    .controller('AlgoController', function (PlatformUser, $location, $scope, PriorityDistribution, LoopBackAuth, Lab, LabType, Priority, Group) {

        if (PlatformUser.isAuthenticated()) {
            PlatformUser.getCurrent(function (current) {
                $scope.currentUser = current;
            }, function (error) {
                console.log(error);
            });
        }
        else {
            if ($location.path() != "/login") {
                $location.path("/login");
            }
        }


        $scope.distribute = function (labtypeNumber) {

            /** TODO: Das muss noch parametrisiert werden **/

            var labtypeNumber = 1;
            var labtype;
            var labs;
            var token;
            var groups;
            PlatformUser.getCurrent(function (current) {
                console.log("Started data retrieval");
                token = LoopBackAuth.accessTokenId;
                // Get the right LabType Id:

                LabType.find({filter: {where: {type: labtypeNumber}}}, function (success) {

                    labtype = success;

                    // Get all priorities of this labtype:

                    // Get the labs
                    Lab.find({filter: {where: {labTypeId: labtype.id}}}, function (success) {
                        labs = success;

                        // Get all Groups
                        Group.find({}, function (success) {
                            groups = success;
                            var groupData = [];
                            for (var i = 0; i < groups.length; i++) {
                                var objEl = {groupName: groups[i].name, choosenDate: []};
                                var choosenDate = [];
                                Group.priorities({
                                    id: groups[i].id,
                                    filter: {where: {labtype: labtype.id}}
                                }, function (groupPrios) {
                                    for (var j = 0; j < groupPrios.length; j++) {
                                        var choosenDateEl = {priority: groupPrios[j].priority, dateTime: ''};
                                        var choosenLabs;
                                        Lab.find({filter: {where: {id: groupPrios[j].labId}}}, function (success) {
                                            choosenLabs = success;
                                            choosenDateEl['dateTime'] = choosenLabs[0].date;


                                            if(choosenDate.length < groupPrios.length)
                                                choosenDate.push(choosenDateEl);

                                            if (choosenDate.length == groupPrios.length) {

                                                // Async break condition:

                                                objEl['choosenDate'] = choosenDate;
                                                groupData.push(objEl);

                                                if (groupData.length == groups.length) {


                                                    /**
                                                     * MAP THE DATA TO THE FORMAT NEEDED IN THE ALGORITHM:
                                                     */

                                                    var dates = [];
                                                    for (var i = 0; i < labs.length; i++) {
                                                        var obj = {dateToCheck: labs[i].date}
                                                        dates.push(obj);
                                                    }
                                                    console.log("The Group Data:");
                                                    console.log(groupData);
                                                    console.log("The Dates Data:");
                                                    console.log(dates);

                                                    // Start the Algo:

                                                    PriorityDistribution.create({token: token, groupData: groupData, dates:dates}, function (success) {
                                                        console.log(success);
                                                    });

                                                }
                                            }

                                        }, function(err){
                                            console.log(err);
                                        });


                                    }

                                });
                            }

                        });

                    });

                }, function (err) {
                    console.log(err);
                });



            }, function (error) {
                console.log(error);

            });

        }


    });