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

    // TODO: geht nicht -> "Die Instanz `PlatformUser` ist nicht gültig. Details: `password` can't be blank (value: undefined)."
    $scope.saveEdit = function($event, user) {
        console.log(user);
        PlatformUser.findById({id: user.id}, function (res) {
            //res.prototype$updateAttributes({semesterId: user.semesterId});
            res.semesterId = user.semesterId;
            res.$save(function(success){
                console.log(success);
            }, function(error) {
                console.log(error);
            });
        });

        $mdToast.show(
            $mdToast.simple()
                .textContent($translate.instant('ENTRY_SAVED'))
                .hideDelay(2000)
                .toastClass("toast")
        );
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