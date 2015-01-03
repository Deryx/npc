/**
 * Created by dscott on 11/30/2014.
 */
(function() {
    var StudentFinancialsController;

    StudentFinancialsController = function ($scope, $state, UserFactory) {
        $scope.studentNumberHousehold = UserFactory.studentNumberHousehold;
        $scope.$watch('studentNumberHousehold', function (newNumber) {
            if (newNumber) UserFactory.setStudentNumberHousehold(newNumber);
        });

        $scope.studentNumberStudents = UserFactory.studentNumberStudents;
        $scope.$watch('studentNumberStudents', function (newNumber) {
            if (newNumber) UserFactory.setStudentNumberStudents(newNumber);
        });

        $scope.studentWorkIncome = UserFactory.studentWorkIncome;
        $scope.$watch('studentWorkIncome', function (newIncome) {
            if (newIncome) UserFactory.setStudentWorkIncome(newIncome);
        });

        $scope.spouseWorkIncome = UserFactory.spouseWorkIncome;
        $scope.$watch('spouseWorkIncome', function (newIncome) {
            if (newIncome) UserFactory.setSpouseWorkIncome(newIncome);
        });

        $scope.studentUntaxedIncome = UserFactory.studentUntaxedIncome;
        $scope.$watch('studentUntaxedIncome', function (newIncome) {
            if (newIncome) UserFactory.setStudentUntaxedIncome(newIncome);
        });

        $scope.studentAdditionalIncome = UserFactory.studentAdditionalIncome;
        $scope.$watch('studentAdditionalIncome', function (newIncome) {
            if (newIncome) UserFactory.setStudentAdditionalIncome(newIncome);
        });

        $scope.studentLiquidFunds = UserFactory.studentLiquidFunds;
        $scope.$watch('studentLiquidFunds', function (newFunds) {
            if (newFunds) UserFactory.setStudentLiquidFunds(newFunds);
        });

        $scope.studentInvestmentWorth = UserFactory.studentInvestmentWorth;
        $scope.$watch('studentInvestmentWorth', function (newWorth) {
            if (newWorth) UserFactory.setStudentInvestmentWorth(newWorth);
        });

        $scope.studentBusinessWorth = UserFactory.studentBusinessWorth;
        $scope.$watch('studentBusinessWorth', function (newWorth) {
            if (newWorth) UserFactory.setStudentBusinessWorth(newWorth);
        });

        $scope.showIndependentQuestions = function() {
            var show = false;

            var dependency = UserFactory.getDependencyStatus();
            if (dependency == 'independent') {
                show = true;
            }

            return show;
        };

        $scope.sfPrevious = function() {
            $state.go('studentInformation');
        };

        $scope.sfNext = function() {
            var dependencyStatus = UserFactory.dependencyStatus;
            if (dependencyStatus == 'dependent')
                $state.go('parentFinancials');
            else
                $state.go('summary');
        };
    };

    StudentFinancialsController.$inject = ['$scope', '$state', 'UserFactory'];

    angular.module('calculatorApp')
        .controller('StudentFinancialsController', StudentFinancialsController);
}());