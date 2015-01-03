/**
 * Created by dscott on 11/12/2014.
 */
(function() {
    var AdjustedBusinessWorthFactory = function() {
        var factory = {};

        factory.adjustedBusinessWorth = function(businessWorth) {
            var adjustment = 0;

            if (businessWorth >= 1 && businessWorth <= 120000) {
                adjustment = businessWorth * 0.4;
            }
            else if (businessWorth > 120000 && businessWorth <= 365000) {
                adjustment = 48000 + (businessWorth - 120000) * 0.5;
            }
            else if (businessWorth > 365000 && businessWorth <= 610000) {
                adjustment = 170500 + (businessWorth - 365000) * 0.6;
            }
            else if (businessWorth > 610000) {
                adjustment = 317500 + (businessWorth - 610000);
            }

            return adjustment;
        };

        return factory;
    };

    AdjustedBusinessWorthFactory.$inject = [];

    angular.module('calculatorApp').factory('AdjustedBusinessWorthFactory', AdjustedBusinessWorthFactory);
}());