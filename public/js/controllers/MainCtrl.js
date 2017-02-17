angular.module('MainCtrl', []).controller('MainController', function ($scope, $location, $timeout, $mdSidenav, $window, PlatformUser, $rootScope, $translate, Semester) {
    $scope.$root.hideNav = true;
    if (PlatformUser.isAuthenticated()) {
        $scope.$root.hideNav = false;
        PlatformUser.getCurrent(function (currentUser) {
            $scope.currentUser = currentUser;


        }, function (error) {

            console.log(error);
            $scope.$root.hideNav = true;

        });
    }
    else {
        if($location.path()!="/login") {
            $location.path("/login");
        }
    }

    // Get the Semester:
    $scope.getCurrentSemester = function() {
        var currDate = new Date();

        return Semester.findOne({
            filter: {
                where: {
                    and: [
                        {start_date: {lt: currDate}},
                        {end_date: {gt: currDate}}
                    ]
                }
            }
        })
    };

    $scope.semester = $scope.getCurrentSemester();

    // Todo: wofür ist das?
    Semester.find({where:{}});

    // Controls the side navigation
    $scope.toggleLeft = buildToggler('left');
    function buildToggler(componentId) {
        return function () {
            $mdSidenav(componentId).toggle();
        }
    }

    $scope.logout = function () {
        return PlatformUser.logout(
            function (response) {
                console.log("logged out");
                delete $window.sessionStorage.token;
                $window.location.href = '/login';
            },
            function (errorResponse) {
                console.log(errorResponse);
            }
        );
    };

    /**
     * Opens Profile menu
     * @param $mdOpenMenu
     * @param ev
     */
    $scope.openProfileMenu = function ($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
    };


    // Translation
    $scope.switchEn = function (){
        $scope.translationLang= "English";
        $scope.changeLanguage();
    };
    $scope.switchDe = function (){
        $scope.translationLang= "Deutsch";
        $scope.changeLanguage();
    };
    var translations = {"Deutsch": "de", "English": "en"};
    $scope.translationLang = ($rootScope.lang == 'de') ? "Deutsch" : "English";
    $scope.changeLanguage = function() {
        var langKey = translations[$scope.translationLang];
        $translate.use(langKey);
        $rootScope.lang = langKey;
    };

    $rootScope.$on('$translateChangeSuccess', function(event, data) {
        $rootScope.lang = data.language;
        $scope.translationLang = ($rootScope.lang == 'de') ? "Deutsch" : "English";
    });

});