angular.module('MainCtrl', [])
    .controller('MainController', function ($scope, $location, $timeout, $mdSidenav, $window, PlatformUser, $rootScope, $translate, Semester, tmhDynamicLocale) {

    // Controller for main functions of the app (get current term, logout, menu, language switch)

    $scope.$root.hideNav = true;

    // Set default language to german
    if( $rootScope.lang==undefined)
        tmhDynamicLocale.set('de');
    else {
        tmhDynamicLocale.set($rootScope.lang);
    }
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
    $scope.getCurrentSemester = function(cb) {
        var currDate = new Date();
       Semester.findOne({
            filter: {
                where: {
                    and: [
                        {start_date: {lt: currDate}},
                        {end_date: {gt: currDate}}
                    ]
                }
            }
        }, function(semester){

           if(cb != undefined) {
               cb(semester);
               return semester;
           }
           return semester;
       }, function(err){
            cb();
            return;
       })

    };

    $scope.getCurrentSemester(function(semester){
        $scope.semester = semester;
    });


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


    // Translation switch:
    $scope.switchEn = function (){
        $scope.translationLang= "English";
        tmhDynamicLocale.set('en');
        $scope.changeLanguage();
    };
    $scope.switchDe = function (){
        $scope.translationLang= "Deutsch";
        tmhDynamicLocale.set('de');
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