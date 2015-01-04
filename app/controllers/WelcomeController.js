/**
 * Created by dscott on 12/1/2014.
 */
(function() {
    var WelcomeController;

    WelcomeController = function ($scope, $state, UserFactory) {
        $scope.school = UserFactory.school;
        $scope.$watch('school', function (newSchool) {
            if (newSchool) UserFactory.setSchool(newSchool);
        });

        $scope.efcStatus = UserFactory.efcStatus;
        $scope.$watch('efcStatus', function (newStatus) {
            if (newStatus) UserFactory.setEFCStatus(newStatus);
        });

        $scope.efc = UserFactory.efc;
        $scope.$watch('efc', function (newEFC) {
            if (newEFC) UserFactory.setEFC(newEFC);
        });

        $scope.welcomeNext = function () {
            if ($scope.school != "" && $scope.efcStatus != "") {
                $state.go('dependencyDetermination');
            }
        };
    };

    WelcomeController.$inject = ['$scope', '$state', 'UserFactory'];

    angular.module('calculatorApp')
        .controller('WelcomeController', WelcomeController);
}());