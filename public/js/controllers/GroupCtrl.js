angular.module('GroupCtrl', ['ngMaterial' ]).controller('GroupController', function($scope, PlatformUser,Group, $window) {


    $scope.groupMembers = [];

    // Build Frontend depending on the group size in the current semester
    $scope.getCurrentSemester(function(semester){

        for(var i = 0; i<semester.group_size-1;i++){
            $scope.groupMembers.push({email:""});
        }

    });
    $scope.groupName;
    $scope.errorMessage="";
    $scope.showError = false;


    /**
     * Creates Group with provided E-Mail Adresses of members
     * Takes the user back to the Homepage after the creation
     */
    $scope.createGroup = function() {
        var emailArr = [];
        for(var i =0; i<$scope.groupMembers.length; i++) {
            emailArr.push($scope.groupMembers[i].email);
        }
        var parameters = {"emails":emailArr, "name": $scope.groupName};
        Group.createByMail(parameters, function(res){

            $window.location.href = '/';


        }, function(err){

            // ERROR-HANDLING:

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
                $scope.errorMessage = err.data.error.message;
                $scope.showError = true;
            }

        })
    };

    /**
     * Adds the user to a random group with a free space and then takes him to the homepage
     */
    $scope.randomJoin = function() {
        Group.randomJoin( function(myGroup) {
            $window.location.href = '/';

        }, function(err) {
            console.log(err);
        });
    }
});
