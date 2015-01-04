/**
 * Created by dscott on 11/30/2014.
 */
(function() {
    var DependencyDeterminationController;

    DependencyDeterminationController = function ($scope, $state, UserFactory) {
        $scope.index = 0;

        $scope.studentBirthDate = UserFactory.birthDate;
        $scope.$watch('studentBirthDate', function (newDate) {
            if (newDate) {
                UserFactory.setBirthDate(newDate);
            }
        });

        $scope.calculateAge = function calculateAge(birthday) { // birthday is a date
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        };

        $scope.studentAge = UserFactory.studentAge;
        $scope.$watch('studentBirthDate', function (newDate) {
            if (newDate) {
                var studentBirthDate = new Date(newDate);
                UserFactory.setStudentAge($scope.calculateAge(studentBirthDate));
                $scope.index += 0;
                if (UserFactory.studentAge >= 24) $scope.index++;
            }
        });

        $scope.dependentsStatus = UserFactory.dependentsStatus;
        $scope.$watch('dependentsStatus', function (newStatus) {
            if (newStatus) {
                UserFactory.setDependentsStatus(newStatus);
                if (newStatus) $scope.index += $scope.dependentsStatus;
            }
        });
        console.log(UserFactory.studentAge);

        $scope.studentMaritalStatus = UserFactory.studentMaritalStatus;
        $scope.$watch('studentMaritalStatus', function (newStatus) {
            if (newStatus) {
                UserFactory.setStudentMaritalStatus(newStatus);
                $scope.index += 0;
                if (newStatus == "1") {

                    $scope.index += $scope.studentMaritalStatus;
                }
            }
        });

        $scope.militaryStatus = UserFactory.militaryStatus;
        $scope.$watch('militaryStatus', function (newStatus) {
            if (newStatus) {
                UserFactory.setMilitaryStatus(newStatus);
                $scope.index += $scope.militaryStatus;
            }
        });

        $scope.veteranStatus = UserFactory.veteranStatus;
        $scope.$watch('veteranStatus', function (newStatus) {
            if (newStatus) {
                UserFactory.setVeteranStatus(newStatus);
                $scope.index += $scope.veteranStatus;
            }
        });

        $scope.orphanStatus = UserFactory.orphanStatus;
        $scope.$watch('orphanStatus', function (newStatus) {
            if (newStatus) {
                UserFactory.setOrphanStatus(newStatus);
                $scope.index += $scope.orphanStatus;
            }
        });

        $scope.$watch('index', function (newIndex) {
            UserFactory.setDependencyStatus('dependent');
            if (newIndex > 0)
                UserFactory.setDependencyStatus('independent');
        });

        $scope.showBirthDateError = false;

        $scope.ddPrevious = function () {
            $state.go('welcome');
        };

        $scope.ddNext = function () {
            var dataComplete = true;
            if ($scope.studentBirthDate.length == 0 || !$scope.studentBirthDate instanceof Date) {
                $scope.showBirthDateError = true;
                dataComplete = false;
            }
            if ($scope.dependentsStatus == "") {
                dataComplete = false;
            }
            if ($scope.studentMaritalStatus == "") {
                dataComplete = false;
            }
            if ($scope.militaryStatus == "") {
                dataComplete = false;
            }
            if ($scope.veteranStatus == "") {
                dataComplete = false;
            }
            if ($scope.orphanStatus == "") {
                dataComplete = false;
            }

            if (dataComplete == true) {
                $state.go('studentInformation');
            }
        }
    };

    DependencyDeterminationController.$inject = ['$scope', '$state', 'UserFactory'];

    angular.module('calculatorApp')
        .controller('DependencyDeterminationController', DependencyDeterminationController);
}());
