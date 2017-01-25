angular.module('ProfileCtrl', ['ngMaterial' ]).controller('ProfileController', function($scope, PlatformUser, $window, $mdToast, $mdPanel) {

    $scope.currentUser;
    if (PlatformUser.isAuthenticated()) {
        PlatformUser.getCurrent(function (currentUser) {
            $scope.currentUser = currentUser;
        }, function (error) {
            console.log(error);
        })
    }

    // TODO: nicht mehr nötig, oder?
    /*
    $scope.save = function () {
        if (PlatformUser.isAuthenticated()) {
            if ($scope.currentUser.first_name !== '') {
                PlatformUser.prototype$updateAttributes({id: $scope.currentUser.id}, {first_name: $scope.currentUser.first_name},
                    function() {
                        $window.location.href = '/profile';
                    },
                    function(error) {
                        console.log(error)
                    });
            }
            if ($scope.currentUser.name !== '') {
                PlatformUser.prototype$updateAttributes({id: $scope.currentUser.id}, {name: $scope.currentUser.name},
                    function() {
                        $window.location.href = '/profile';
                    },
                    function(error) {
                        console.log(error)
                    });
            }
        }
    }
    */

    $scope.showPasswordDialog = function() {
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

function PasswortDialogCtrl(mdPanelRef, $scope, $mdToast, PlatformUser) {
    this._mdPanelRef = mdPanelRef;

    $scope.changePassword = function () {
        // TODO: old password is not being checked (the only way to check it is to login the user with that pw, but is this necessary?)
        if (PlatformUser.isAuthenticated()) {
            if ($scope.currentUser.newPassword !== $scope.currentUser.repeatNewPassword) {
                // TODO: input error statt toast
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Neues Passwort stimmmt nicht mit Wiederholung überein')
                        .hideDelay(3000)
                        .toastClass("toast")
                );
                return false;
            }

            PlatformUser.prototype$updateAttributes({id: $scope.currentUser.id}, {password: $scope.currentUser.newPassword},
                function() {
                    $window.location.href = '/profile';
                },
                function(error) {
                    console.log(error)
                });
        }
    }
}

PasswortDialogCtrl.prototype.closePasswortDialog = function() {
    var panelRef = this._mdPanelRef;

    panelRef && panelRef.close().then(function() {
        angular.element(document.querySelector('.change-password-dialog-open-button')).focus();
        panelRef.destroy();
    });
};