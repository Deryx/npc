/**
 * Created by dscott on 10/24/2014.
 */
(function() {
    var app = angular.module('calculatorApp', ['ui.router']);

    app.directive('jqdatepicker', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {
                $(element).datepicker({
                    dateFormat: 'mm-dd-yy',
                    changeYear: true,
                    changeMonth: true,
                    yearRange: "1900:2000",

                    onSelect: function(date) {
                        var ngModelName = this.attributes['ng-model'].value;

                        // if value for the specified ngModel is a property of
                        // another object on the scope
                        if (ngModelName.indexOf(".") != -1) {
                            var objAttributes = ngModelName.split(".");
                            var lastAttribute = objAttributes.pop();
                            var partialObjString = objAttributes.join(".");
                            var partialObj = eval("scope." + partialObjString);

                            partialObj[lastAttribute] = date;
                        }
                        // if value for the specified ngModel is directly on the scope
                        else {
                            scope[ngModelName] = date;
                        }
                        scope.$apply();
                    }

                });
            }
        };
    });
    app.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('welcome', {
                url: '/welcome',
                templateUrl: 'app/views/welcome.html',
                controller: 'WelcomeController'
            })
            .state('dependencyDetermination', {
                url: '/dependencyDetermination',
                templateUrl: 'app/views/dependencyDetermination.html',
                controller: 'DependencyDeterminationController'
            })
            .state('studentInformation', {
                url: '/studentInformation',
                templateUrl: 'app/views/studentInformation.html',
                controller: 'StudentInformationController'
            })
            .state('studentFinancials', {
                url: '/studentFinancials',
                templateUrl: 'app/views/studentFinancials.html',
                controller: 'StudentFinancialsController'
            })
            .state('parentFinancials', {
                url: '/parentFinancials',
                templateUrl: 'app/views/parentFinancials.html',
                controller: 'ParentFinancialsController'
            })
            .state('summary', {
                url: '/summary',
                templateUrl: 'app/views/summary.html',
                controller: 'CalculatorController'
            });

            $urlRouterProvider
                .otherwise('/welcome');

        });
}());
