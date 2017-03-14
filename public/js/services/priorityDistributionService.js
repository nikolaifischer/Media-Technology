angular.module('PriorityDistributionService', []).factory('PriorityDistribution', ['$http', function($http) {

    return {
        get : function() {
            return $http.get('/app/prioritydistribution');
        },


        create : function(data, cb) {
            $http.post('/app/prioritydistribution', data).then(function(success){

                if(success.hasOwnProperty("error")){
                    cb(success,undefined);
                }
                else
                    cb(undefined, success);

            }, function(err) {cb(err, undefined);});
        }
    }

}]);