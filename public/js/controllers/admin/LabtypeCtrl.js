angular.module('LabtypeCtrl', [])
    .controller('LabtypeController', function ($scope, $http, $route, PlatformUser, Semester, LabType, $window) {

        $scope.getCurrentSemester(function (semesterRes) {
            $scope.semester = semesterRes;

            $scope.phototype = LabType.findOne({
                filter: {
                    where: {type: 1, semesterId: $scope.semester.id}
                }
            }, function (type) {
            }, function (error) {
            });
            $scope.videotype = LabType.findOne({
                filter: {
                    where: {type: 2, semesterId: $scope.semester.id}
                }
            }, function (type) {
            }, function (error) {
            });
            $scope.audiotype = LabType.findOne({
                filter: {
                    where: {type: 3, semesterId: $scope.semester.id}
                }
            }, function (type) {
            }, function (error) {
            });

            $scope.cancelEditLabtype = function (type) {
                switch (type) {
                    case $scope.phototype:
                        $scope.photoEdit = false;
                        break;
                    case $scope.videotype:
                        $scope.videoEdit = false;
                        break;
                    case $scope.audiotype:
                        $scope.audioEdit = false;
                        break;
                }
            };

            $scope.editPhototype = function () {
                $scope.photoEdit = true;
                $scope.editPhotoStudentDesc = $scope.phototype.description_student;
                $scope.editPhotoTutorDesc = $scope.phototype.description_tutor;
                $scope.editPhotoDeadline = $scope.phototype.registration_deadline;
            };

            $scope.updatePhototype = function () {
                $scope.phototype.description_student = $scope.editPhotoStudentDesc;
                $scope.phototype.description_tutor = $scope.editPhotoTutorDesc;
                $scope.phototype.registration_deadline = $scope.editPhotoDeadline;
                $scope.phototype.$save();
                $scope.photoEdit = false;
            };

            $scope.updatePhotoOpenState = function (state) {
                $scope.phototype.registration_open = state;
                $scope.phototype.$save();
            };


            $scope.editVideotype = function () {
                $scope.videoEdit = true;
                $scope.editVideoStudentDesc = $scope.videotype.description_student;
                $scope.editVideoTutorDesc = $scope.videotype.description_tutor;
                $scope.editVideoDeadline = $scope.videotype.registration_deadline;
            };

            $scope.updateVideotype = function () {
                $scope.videotype.description_student = $scope.editVideoStudentDesc;
                $scope.videotype.description_tutor = $scope.editVideoTutorDesc;
                $scope.videotype.registration_deadline = $scope.editVideoDeadline;
                $scope.videotype.$save();
                $scope.videoEdit = false;
            };

            $scope.updateVideoOpenState = function (state) {
                $scope.videotype.registration_open = state;
                $scope.videotype.$save();
            };

            $scope.editAudiotype = function () {
                $scope.audioEdit = true;
                $scope.editAudioStudentDesc = $scope.audiotype.description_student;
                $scope.editAudioTutorDesc = $scope.audiotype.description_tutor;
                $scope.editAudioDeadline = $scope.audiotype.registration_deadline;
            };

            $scope.updateAudiotype = function () {
                $scope.audiotype.description_student = $scope.editAudioStudentDesc;
                $scope.audiotype.description_tutor = $scope.editAudioTutorDesc;
                $scope.audiotype.registration_deadline = $scope.editAudioDeadline;
                $scope.audiotype.$save();
                $scope.audioEdit = false;
            };

            $scope.updateAudioOpenState = function (state) {
                $scope.audiotype.registration_open = state;
                $scope.audiotype.$save();
            };


        });
    });
