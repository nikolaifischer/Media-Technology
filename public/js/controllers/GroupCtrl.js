angular.module('GroupCtrl', ['ngMaterial' ]).controller('GroupController', function($scope, PlatformUser,Group, $window,$mdToast) {

    $scope.groupMembers = [{email:"gianna@campus.lmu.de"},{email:"orlando@campus.lmu.de"},{email:"jacky@campus.lmu.de"}]
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
                $scope.errorMessage = "Du kannst keine Gruppe erstellen, da du bereits Mitglied in einer bist.";
                $scope.showError = true;
            }
            else if (err.data.error.message.indexOf("Invalid number of members")>-1) {
                $scope.errorMessage = "Deine Gruppe hat zu wenige Mitglieder";
                $scope.showError = true;
            }
            else if (err.data.error.message.indexOf("Some of the specified email addresses")>-1) {
                $scope.errorMessage= "Eine oder mehrere E-Mails sind nicht auf dieser Platform angemeldet.";
                $scope.showError = true;
            }
            else if (err.data.error.message.indexOf("emails array may not contain own email address")>-1) {
                $scope.errorMessage= "Du darfst nicht deine eigene E-Mail Adresse hinzufügen. Du bist automatisch Teil der erstellten Gruppe.";
                $scope.showError = true;
            }
            else if (err.data.error.message.indexOf ("is already enrolled for group with id" )>-1) {
                $scope.errorMessage = err.data.error.message;       // TODO: String Magic and translate to German
                $scope.showError = true;
            }


        })
    }
});
