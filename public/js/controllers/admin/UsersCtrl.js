angular.module('UsersCtrl', [])
    .controller('UsersController', function ($location, $scope, $mdToast, $translate, PlatformUser, Semester) {

    // Controller for managing the registered platform users (admins, tutors and students)

    /**
     * function for getting the PlatformUsers, separated by tutors and students
     */
    $scope.getPlatformUsers = function() {
        // tutors
        PlatformUser.find({
            filter: {
                where: {isTutor: true}
            }
        }, function (res) {
            $scope.tutors = res;
        });

        // students
        PlatformUser.find({
            filter: {
                where: {isStudent: true}
            }
        }, function (res) {
            $scope.students = res;
        });
    };

    // get all terms for displaying in the select field of each user form
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

    // object for the pagination labels of the user table
    $scope.paginationLabel = {
        page: $translate.instant('PAGINATION_PAGE'),
        rowsPerPage: $translate.instant('PAGINATION_ROWS_PER_PAGE'),
        of: $translate.instant('PAGINATION_OF')
    };

    /**
     * function for saving the changes of a user, called when submitting a user form
     * (clicking on the save button next to a user)
     * @param $event
     * @param user
     */
    $scope.saveEdit = function($event, user) {
        PlatformUser.prototype$patchAttributes(
            {id: user.id},
            {name: user.name, first_name: user.first_name, email: user.email, semesterId: user.semesterId},
        function(res){},
        function(err){
            console.log(err);
        });
    };

    /**
     * function for deleting a user from the platform, called when clicking the red trash button next to a user
     * @param $event
     * @param user
     */
    $scope.deleteEntry = function($event, user){
        PlatformUser.deleteById({
            id: user.id
        }, function(success){
            // refresh the user table in the page view
            $scope.getPlatformUsers();
        })
    };

});