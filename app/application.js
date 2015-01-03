/**
 * Created by dscott on 10/24/2014.
 */
(function() {
    var app = angular.module('calculatorApp', ['ui.router']);

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
