angular.module('MainCtrl', []).controller('MainController', function($scope, $timeout, $mdSidenav) {

    // Controls the side navigation
    $scope.toggleLeft = buildToggler('left');
    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        }
    }

});