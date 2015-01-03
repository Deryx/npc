/**
 * Created by dscott on 11/11/2014.
 */
(function () {
    var IncomeFactory = function() {
        var factory = {};

        var _taxedIncome = 0;
        var _untaxedIncome = 0;
        var _additionalIncome = 0;

        factory.setTaxedIncome = function(taxedIncome) {
           _taxedIncome = taxedIncome;
        };

        factory.setUntaxedIncome = function(untaxedIncome) {
            _untaxedIncome = untaxedIncome;
        };

        factory.setAdditionalIncome = function(additionalIncome) {
            _additionalIncome = additionalIncome;
        };

        factory.totalIncome = function() {
            return _taxedIncome + _untaxedIncome - _additionalIncome;
        };

        return factory;
    };

    IncomeFactory.$inject = [];

    angular.module('calculatorApp').factory('IncomeFactory', IncomeFactory);
}());