/**
 * Created by dscott on 11/30/2014.
 */
(function() {
    var ParentFinancialsController;

    ParentFinancialsController = function ($scope, $state, UserFactory) {
        $scope.parentResidentState = UserFactory.parentState;
        $scope.$watch('parentResidentState', function (newState) {
            if (newState) UserFactory.setParentState(newState);
        });

        $scope.parentMaritalStatus = UserFactory.parentMaritalStatus;
        $scope.$watch('parentMaritalStatus', function (newStatus) {
            if (newStatus) UserFactory.setParentMaritalStatus(newStatus);
        });

        $scope.parentNumberHousehold = UserFactory.parentNumberHousehold;
        $scope.$watch('parentNumberHousehold', function (newNumber) {
            if (newNumber) UserFactory.setParentNumberHousehold(newNumber);
        });

        $scope.parentNumberStudents = UserFactory.parentNumberStudents;
        $scope.$watch('parentNumberStudents', function (newNumber) {
            if (newNumber) UserFactory.setParentNumberStudents(newNumber);
        });

        $scope.parentAge = UserFactory.parentAge;
        $scope.$watch('parentAge', function (newAge) {
            if (newAge) UserFactory.setParentAge(newAge);
        });

        $scope.fatherWorkIncome = UserFactory.fatherWorkIncome;
        $scope.$watch('fatherWorkIncome', function (newIncome) {
            if (newIncome) UserFactory.setFatherWorkIncome(newIncome);
        });

        $scope.motherWorkIncome = UserFactory.motherWorkIncome;
        $scope.$watch('motherWorkIncome', function (newIncome) {
            if (newIncome) UserFactory.setMotherWorkIncome(newIncome);
        });

        $scope.parentUntaxedIncome = UserFactory.parentUntaxedIncome;
        $scope.$watch('parentUntaxedIncome', function (newIncome) {
            if (newIncome) UserFactory.setParentUntaxedIncome(newIncome);
        });

        $scope.parentAdditionalIncome = UserFactory.parentAdditionalIncome;
        $scope.$watch('parentAdditionalIncome', function (newIncome) {
            if (newIncome) UserFactory.setParentAdditionalIncome(newIncome);
        });

        $scope.parentLiquidFunds = UserFactory.parentLiquidFunds;
        $scope.$watch('parentLiquidFunds', function (newFunds) {
            if (newFunds) UserFactory.setParentLiquidFunds(newFunds);
        });

        $scope.parentInvestmentWorth = UserFactory.parentInvestmentWorth;
        $scope.$watch('parentInvestmentWorth', function (newWorth) {
            if (newWorth) UserFactory.setParentInvestmentWorth(newWorth);
        });

        $scope.parentBusinessWorth = UserFactory.parentBusinessWorth;
        $scope.$watch('parentBusinessWorth', function (newWorth) {
            if (newWorth) UserFactory.setParentBusinessWorth(newWorth);
        });

        $scope.pfPrevious = function() {
            $state.go('studentFinancials');
        };

        $scope.pfNext = function() {
            $state.go('summary');
        }
    };

    ParentFinancialsController.$inject = ['$scope', '$state', 'UserFactory'];

    angular.module('calculatorApp')
        .controller('ParentFinancialsController', ParentFinancialsController);
}());