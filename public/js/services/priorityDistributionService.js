angular.module('PriorityDistributionService', []).factory('PriorityDistribution', ['$http', function($http) {

    return {
        get : function() {
            return $http.get('/app/prioritydistribution');
        },


        create : function(data, cb) {
            $http.post('/app/prioritydistribution', data).then(function(success){
                console.log(data);
                cb(success);

            }, function(err) {console.log(err);});
        }
    }

}]);