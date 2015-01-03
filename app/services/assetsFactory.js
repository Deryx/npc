/**
 * Created by dscott on 11/11/2014.
 */
(function() {
    var AssetsFactory = function() {
        var factory = {};

        var _liquidFunds = 0;
        var _investmentWorth = 0;
        var _businessWorth = 0;
        var _assetProtection = 0;
        var _rate = 1;

        factory.setLiquidFunds = function (funds) {
            _liquidFunds = funds;
        };

        factory.getLiquidFunds = function () {
            return _liquidFunds;
        };

        factory.setInvestmentWorth = function (worth) {
            _investmentWorth = worth;
        };

        factory.getInvestmentWorth = function () {
            return _investmentWorth;
        };

        factory.setBusinessWorth = function (worth) {
            _businessWorth = worth;
        };

        factory.getBusinessWorth = function () {
            return _businessWorth;
        };

        factory.setAssetProtection = function (protection) {
            _assetProtection = protection;
        };

        factory.getAssetProtection = function () {
            return _assetProtection;
        };

        factory.setRate = function (rate) {
            _rate = rate;
        };

        factory.getRate = function () {
            return _rate;
        };

        factory.assetContribution = function () {
            var netWorth = _liquidFunds + _investmentWorth + _businessWorth;

            var contribution = (netWorth - _assetProtection) * _rate;

            if (contribution < 0) {
                contribution = 0;
            }

            return contribution;
        };

        return factory;
    };

    AssetsFactory.$inject = [];

    angular.module('calculatorApp').factory('AssetsFactory', AssetsFactory);
}());