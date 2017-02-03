angular.module('PriorityDistributionService', []).factory('PriorityDistribution', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/app/prioritydistribution');
        },


        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(data, cb) {
            $http.post('/app/prioritydistribution', data).then(function(success){

                cb(success);

            }, function(err) {console.log(err);});
        }
    }

}]);