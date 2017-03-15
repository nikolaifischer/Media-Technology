angular.module('GroupCtrl', ['ngMaterial' ]).controller('GroupController', function($scope, PlatformUser,Group, $window) {

    $scope.groupMembers = [{email:"gianna@campus.lmu.de"},{email:"orlando@campus.lmu.de"},{email:"jacky@campus.lmu.de"}];
    $scope.groupName;
    $scope.errorMessage="";
    $scope.showError = false;


    $scope.createGroup = function() {
        var emailArr = [];
        for(var i =0; i<$scope.groupMembers.length; i++) {
            emailArr.push($scope.groupMembers[i].email);
        }
        console.log(emailArr);
        //Group.createByMail(groupMembers);
        var parameters = {"emails":emailArr, "name": $scope.groupName};
        Group.createByMail(parameters, function(res){

            $window.location.href = '/';


        }, function(err){
            console.log(err.data.error.message);

            // Show Localized Error Message:
            if(err.data.error.message.indexOf("is already enrolled")>-1){
                $scope.errorMessage = $translate.instant('ALREADY_IN_GROUP');
                $scope.showError = true;
            }
            else if (err.data.error.message.indexOf("Invalid number of members")>-1) {
                $scope.errorMessage = $translate.instant('NOT_ENOUGH_MEMBERS');
                $scope.showError = true;
            }
            else if (err.data.error.message.indexOf("Some of the specified email addresses")>-1) {
                $scope.errorMessage = $translate.instant('EMAILS_NOT_REGISTERED');
                $scope.showError = true;
            }
            else if (err.data.error.message.indexOf("emails array may not contain own email address")>-1) {
                $scope.errorMessage = $translate.instant('OWN_EMAIL_NOT_ALLOWED');
                $scope.showError = true;
            }
            else if (err.data.error.message.indexOf ("is already enrolled for group with id" )>-1) {
                $scope.errorMessage = err.data.error.message;       // TODO: String Magic and translate to German
                $scope.showError = true;
            }

        })
    };

    $scope.randomJoin = function() {
        Group.randomJoin( function(myGroup) {
            $window.location.href = '/';

        }, function(err) {
            console.log(err);
        });
    }
});
