/**
 * Created by dscott on 11/12/2014.
 */
(function() {
    var AAIContributionFactory = function() {
        var factory = {};

        factory.getContribution = function(income, allowances, assets) {
            if (assets < 0) {
                assets = 0;
            }

            var availableIncome = income - allowances;

            var aai = availableIncome + assets;

            var contribution = -750;
            if (aai >= -3409 && aai <= 15300) {
                contribution = aai * 0.22;
            }
            else if (aai > 15300 && aai <= 19200) {
                contribution = 3366 + (aai - 15300) * 0.25;
            }
            else if (aai > 19200 && aai <= 23100) {
                contribution = 4341 + (aai - 19200) * 0.29;
            }
            else if (aai > 23100 && aai <= 27000) {
                contribution = 5472 + (aai - 23100) * 0.34;
            }
            else if (aai > 27000 && aai <= 30900) {
                contribution = 6798 + (aai - 27000) * 0.4;
            }
            else if (aai > 30900) {
                contribution = 8358 + (aai - 30900) * 0.47;
            }

            return contribution;
        };

        return factory;
    };

    AAIContributionFactory.$inject = [];

    angular.module('calculatorApp').factory('AAIContributionFactory', AAIContributionFactory);
}());