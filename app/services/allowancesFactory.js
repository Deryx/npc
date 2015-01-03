/**
 * Created by dscott on 11/11/2014.
 */
(function() {
    var AllowancesFactory = function() {
        var factory = {};

        var _stateTaxAllowance = 0;
        var _socialSecurityAllowance1 = 0;
        var _socialSecurityAllowance2 = 0;
        var _incomeProtection = 0;
        var _employmentAllowance = 0;
        var _parentAAI = 0;

        factory.setStateTaxAllowance = function(allowance) {
            if (allowance < 0) {
                allowance = 0;
            }

            _stateTaxAllowance = allowance;
        };

        factory.getStateTaxAllowance = function() {
            return _stateTaxAllowance;
        };

        factory.setSocialSecurityAllowance1 = function(income) {
            _socialSecurityAllowance1 = socialSecurityAllowanceCalculation(income);
        };

        factory.getSocialSecurityAllowance1 = function() {
            return _socialSecurityAllowance1;
        };

        factory.setSocialSecurityAllowance2 = function(income) {
            _socialSecurityAllowance2 = socialSecurityAllowanceCalculation(income);
        };

        factory.getSocialSecurityAllowance2 = function() {
            return _socialSecurityAllowance2;
        };

        factory.setIncomeProtection = function(allowance) {
            _incomeProtection = allowance;
        };

        factory.getIncomeProtection = function() {
            return _incomeProtection;
        };

        factory.setEmploymentAllowance = function(allowance) {
            _employmentAllowance = allowance;
        };

        factory.getEmploymentAllowance = function() {
            return _employmentAllowance;
        };

        factory.setParentAAI = function(aai) {
            if (aai < 0) {
                aai *= -1;
            }
            else {
                aai = 0;
            }

            _parentAAI = aai;
        };

        factory.getParentAAI = function() {
            return _parentAAI;
        };

        factory.totalAllowances = function () {
            return _stateTaxAllowance + _socialSecurityAllowance1 + _socialSecurityAllowance2 + _incomeProtection + _employmentAllowance + _parentAAI;
        };

        function socialSecurityAllowanceCalculation(income) {
            var calculation = income * 0.0765;
            if (income > 110100) {
                calculation = 8422.65 + (income - 110100) * 0.0145;
            }

            return calculation;
        }

        return factory;
    };

    AllowancesFactory.$inject = [];

    angular.module('calculatorApp').factory('AllowancesFactory', AllowancesFactory);
}());