angular.module('ProfileCtrl', ['ngMaterial'])
    .controller('ProfileController', function ($scope, PlatformUser, $window, $mdToast, $mdPanel) {

    // Controller managing the users profile (view details, change password)

    // get the current user
    $scope.userId;
    if (PlatformUser.isAuthenticated()) {
        PlatformUser.getCurrent(function (currentUser) {
            $scope.currentUser = currentUser;
            $scope.userId = currentUser.id;
        }, function (error) {
            console.log(error);
        })
    }

    /**
     * function for opening the dialog to change the password, called when clicking on the 'change password' link
     */
    $scope.showPasswordDialog = function () {
        var position = $mdPanel.newPanelPosition()
            .absolute()
            .center();

        var config = {
            attachTo: angular.element(document.body),
            controller: PasswortDialogCtrl,
            controllerAs: 'ctrl',
            disableParentScroll: this.disableParentScroll,
            templateUrl: 'changePasswortDialog.tmpl.html',
            hasBackdrop: true,
            panelClass: 'custom-dialog',
            position: position,
            trapFocus: true,
            zIndex: 150,
            clickOutsideToClose: true,
            escapeToClose: true,
            focusOnOpen: true
        };

        $mdPanel.open(config);
    };

}).controller('PasswortDialogCtrl', PasswortDialogCtrl);

/**
 * function for the change-password dialog
 * @param mdPanelRef
 * @param $scope
 * @param $mdToast
 * @param PlatformUser
 * @param $window
 * @constructor
 */
function PasswortDialogCtrl(mdPanelRef, $scope, PlatformUser, $window) {
    this._mdPanelRef = mdPanelRef;

    /**
     * function for changing the password of a user in the db, called when user submits the form
     */
    $scope.changePassword = function () {
        if (PlatformUser.isAuthenticated()) {
            PlatformUser.getCurrent(function (currentUser) {
                if ($scope.currentUser.newPassword !== $scope.currentUser.repeatNewPassword) {
                    // this is also checked in the html before the request is sent
                    return false;
                }

                PlatformUser.changePassword({newPassword: $scope.currentUser.newPassword}, function(success){
                    mdPanelRef.close();
                    // log the user out
                    delete $window.sessionStorage.token;
                    $window.location.href = '/login';
                }, function(err){
                    console.log(err);
                });
            });
        }
    }
}

/**
 * function for closing the change-password dialog, called when the close button is clicked
 */
PasswortDialogCtrl.prototype.closePasswortDialog = function () {
    var panelRef = this._mdPanelRef;

    panelRef && panelRef.close().then(function () {
        angular.element(document.querySelector('.change-password-dialog-open-button')).focus();
        panelRef.destroy();
    });
};