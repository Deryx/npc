/**
 * Created by dscott on 11/11/2014.
 */
(function() {
    var ScholarshipFactory = function() {
        var factory = {};

        var _test = '';
        var _gpa = 0;
        var _actScore = 0;
        var _satMath = 0;
        var _satVerbal = 0;
        var _award = 0;
        var _name = '';

        factory.setTest = function(test) {
            _test = test;
        };
        factory.getTest = function() {
            return _test;
        };

        factory.setGPA = function(gpa) {
            _gpa = gpa;
        };

        factory.setACTScore = function(score) {
            _actScore = score;
        };
        factory.getACTScore = function () {
            return _actScore;
        };

        factory.setSATMath = function(score) {
            _satMath = score;
        };
        factory.getSATMath = function() {
            return _satMath;
        };

        factory.setSATVerbal = function(score) {
            _satVerbal = score;
        };
        factory.getSATVerbal = function() {
            return _satVerbal;
        };

        factory.setAward = function() {
            var SAT_WEIGHT = 0.0625;
            var ACT_WEIGHT = 2.778;

            var SA_AWARD = 7000;
            var DS_AWARD = 14000;
            var AS_AWARD = 16000;
            var PS_AWARD = 17000;

            var index = 0;
            var score = 0;

            if (_test == "SAT") {
                score = _satMath + _satVerbal;
                index = (score * SAT_WEIGHT) + _gpa;
            }
            else {
                score = _actScore;
                index = (score * ACT_WEIGHT) + _gpa;
            }

            if (index >= 131.0 && index <= 138.99) {
                _award = SA_AWARD;
                _name = "St. Angela Award";
            }
            else if (index > 138.99 && index <= 149.99) {
                _award = DS_AWARD;
                _name = "Dean Scholarship";
            }
            else if (index > 149.99 && index <= 162.99) {
                _award = AS_AWARD;
                _name = "Academic Scholarship";
            }
            else if (index > 162.99) {
                _award = PS_AWARD;
                _name = "Presidential Scholarship";
            }
        };

        factory.getAward = function() {
            return _award;
        };

        factory.getName = function() {
            return _name;
        };

        return factory;
    };

    ScholarshipFactory.$inject = [];

    angular.module('calculatorApp').factory('ScholarshipFactory', ScholarshipFactory);
}());