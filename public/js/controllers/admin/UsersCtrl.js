angular.module('UsersCtrl', []).controller('UsersController', function ($location, $scope, $mdToast, $translate, PlatformUser, Semester) {

    $scope.getPlatformUsers = function() {
        // tutors
        PlatformUser.find({
            filter: {
                where: {isTutor: true}
            }
        }, function (res) {
            $scope.tutors = res;
        });

        // other users
        PlatformUser.find({
            filter: {
                where: {isStudent: true}
            }
        }, function (res) {
            $scope.students = res;
        });
    };

    $scope.terms = Semester.find(
        {
            order: "end_date DESC"
        },
        function(success){},
        function(error){
            console.log(error);
        }
    );

    $scope.getPlatformUsers();

    // Query Object for the DB View
    $scope.dbQuery = {
        order: 'email',
        limit: 10,
        page: 1
    };

    $scope.paginationLabel = {
        page: $translate.instant('PAGINATION_PAGE'),
        rowsPerPage: $translate.instant('PAGINATION_ROWS_PER_PAGE'),
        of: $translate.instant('PAGINATION_OF')
    };

    $scope.saveEdit = function($event, user) {
        PlatformUser.prototype$patchAttributes({id: user.id}, {name:user.name, first_name:user.first_name, email: user.email, semesterId: user.semesterId}, function(res){

            $mdToast.show(
                $mdToast.simple()
                    .textContent($translate.instant('ENTRY_SAVED'))
                    .hideDelay(2000)
                    .toastClass("toast")
            );

        }, function(err){
            console.log(err);
        });



    };

    $scope.deleteEntry = function($event, user){
        PlatformUser.deleteById({
            id: user.id
        }, function(success){
            $scope.getPlatformUsers();
            $mdToast.show(
                $mdToast.simple()
                    .textContent($translate.instant('ENTRY_DELETED'))
                    .hideDelay(2000)
                    .toastClass("toast")
            );
        })
    };

});