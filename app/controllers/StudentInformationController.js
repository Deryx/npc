/**
 * Created by dscott on 11/30/2014.
 */
(function() {
    var StudentInformationController;

    StudentInformationController = function ($scope, $state, UserFactory) {
        $scope.academicYears = ['2000-01 to Now', '1994-1995 to 1999-2000', '1992-93 or 1993-94', '1990-91 or 1991-92', '1989-90', '1988-89 or Earlier'];

        $scope.studentResidentState = UserFactory.studentState;
        $scope.$watch('studentResidentState', function (newState) {
            if (newState) UserFactory.setStudentState(newState);
        });

        $scope.studentCampus = UserFactory.campus;
        $scope.$watch('studentCampus', function (newCampus) {
            if (newCampus) UserFactory.setCampus(newCampus);
        });

        $scope.diplomaStatus = UserFactory.diplomaStatus;
        $scope.$watch('diplomaStatus', function (newStatus) {
            if (newStatus) UserFactory.setDiplomaStatus(newStatus);
        });

        $scope.snrStatus = UserFactory.snrStatus;
        $scope.$watch('snrStatus', function (newStatus) {
            if (newStatus) UserFactory.setSNRStatus(newStatus);
        });

        $scope.gpa = UserFactory.gpa;
        $scope.$watch('gpa', function (newGPA) {
            if (newGPA) UserFactory.setGPA(newGPA);
        });

        $scope.testType = UserFactory.testType;
        $scope.$watch('testType', function (newTest) {
            if (newTest) UserFactory.setTestType(newTest);
        });

        $scope.satMath = UserFactory.satMath;
        $scope.$watch('satMath', function (newScore) {
            if (newScore) UserFactory.setSATMath(newScore);
        });

        $scope.satVerbal = UserFactory.satVerbal;
        $scope.$watch('satVerbal', function (newScore) {
            if (newScore) UserFactory.setSATVerbal(newScore);
        });

        $scope.actScore = UserFactory.actScore;
        $scope.$watch('actScore', function (newScore) {
            if (newScore) UserFactory.setACTScore(newScore);
        });

        $scope.tapStatus = UserFactory.tapStatus;
        $scope.$watch('tapStatus', function (newStatus) {
            if (newStatus) UserFactory.setTAPStatus(newStatus);
        });

        $scope.housingStatus = UserFactory.housingStatus;
        $scope.$watch('housingStatus', function (newStatus) {
            if (newStatus) UserFactory.setHousingStatus(newStatus);
        });

        $scope.showStateQuestion = function() {
            var show = false;

            var dependency = UserFactory.getDependencyStatus();
            if (dependency == 'independent') {
                show = true;
            }

            return show;
        };

        $scope.showSNRQuestions = function() {
            var show = false;

            var school = UserFactory.school;
            if (school == 'SNR') {
                show = true;
            }

            return show;
        };

        $scope.studentResidentState = UserFactory.studentResidentState;
        $scope.$watch('studentResidentState', function (newState) {
            if (newState) UserFactory.setStudentState(newState);
        });

        $scope.siPrevious = function () {
            $state.go('dependencyDetermination');
        };

        $scope.siNext = function () {
            $state.go('studentFinancials');
        }
    };

    StudentInformationController.$inject = ['$scope', '$state', 'UserFactory'];

    angular.module('calculatorApp')
        .controller('StudentInformationController', StudentInformationController);
}());