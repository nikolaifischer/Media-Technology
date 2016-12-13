angular.module('MainCtrl', []).controller('MainController', function($scope, Lab) {

	$scope.tagline = 'To the moon and back!';

	// Find all Labs and output the date of the first one to the console:
    $scope.labs = Lab.find({},
        function(list) {
            console.log($scope.labs[0].date);
    },
        function(errorResponse) { console.log(errorResponse); }
    );

});