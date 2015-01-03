/**
 * Created by dscott on 11/18/2014.
 */
(function () {
    var EmploymentAllowanceFactory = function () {
        var factory = {};

        factory.getAllowance = function (income) {
            var allowance = 0;
            if (income > 0) {
                allowance = income * 0.35;
            }

            return Math.min(allowance, 3900);
        };

        factory.getAllowance = function (income1, income2) {
            var allowance = 0;
            if (income1 > 0 && income2 > 0) {
                allowance = Math.min(income1, income2) * 0.35;
            }

            return Math.min(allowance, 3900);
        };

        return factory;
    };

    EmploymentAllowanceFactory.$inject = [];

    angular.module('calculatorApp').factory('EmploymentAllowanceFactory', EmploymentAllowanceFactory);
}());