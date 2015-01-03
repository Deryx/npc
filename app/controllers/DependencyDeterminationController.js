/**
 * Created by dscott on 11/30/2014.
 */
(function() {
    var DependencyDeterminationController;

    DependencyDeterminationController = function ($scope, $state, UserFactory) {
        $scope.index = 0;

        $scope.dependentsStatus = UserFactory.dependentsStatus;
        $scope.$watch('dependentsStatus', function (newStatus) {
            if (newStatus) {
                UserFactory.setDependentsStatus(newStatus);
                if (newStatus) $scope.index += $scope.dependentsStatus;
            }
        });

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

        $scope.ddPrevious = function () {
            $state.go('welcome');
        };

        $scope.ddNext = function () {
            $state.go('studentInformation');
        }
    };

    DependencyDeterminationController.$inject = ['$scope', '$state', 'UserFactory'];

    angular.module('calculatorApp')
        .controller('DependencyDeterminationController', DependencyDeterminationController);
}());
