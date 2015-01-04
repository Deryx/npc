/**
 * Created by dscott on 12/1/2014.
 */
(function() {
    var UserFactory = function() {
        var userFactory = {};

        userFactory.school = '';
        userFactory.campus = '';
        userFactory.efcStatus = '';
        userFactory.efc = 0;
        userFactory.birthDate = '';
        userFactory.studentAge = '';
        userFactory.dependentsStatus = '';
        userFactory.studentMaritalStatus = '';
        userFactory.militaryStatus = '';
        userFactory.veteranStatus = '';
        userFactory.orphanStatus = '';
        userFactory.dependencyStatus = '';
        userFactory.studentState = '';
        userFactory.campus = '';
        userFactory.diplomaStatus = '';
        userFactory.snrStatus = '';
        userFactory.gpa = 0;
        userFactory.testType = '';
        userFactory.satMath = 0;
        userFactory.satVerbal = 0;
        userFactory.actScore = 0;
        userFactory.tapStatus = 0;
        userFactory.housingStatus = '';
        userFactory.studentNumberHousehold = 0;
        userFactory.studentNumberStudents = 0;
        userFactory.studentWorkIncome = 0;
        userFactory.spouseWorkIncome = 0;
        userFactory.studentUntaxedIncome = 0;
        userFactory.studentAdditionalIncome = 0;
        userFactory.studentLiquidFunds = 0;
        userFactory.studentInvestmentWorth = 0;
        userFactory.studentBusinessWorth = 0;
        userFactory.parentState = '';
        userFactory.parentMaritalStatus = '';
        userFactory.parentNumberHousehold = 0;
        userFactory.parentNumberStudents = 0;
        userFactory.parentAge = 0;
        userFactory.fatherWorkIncome = 0;
        userFactory.motherWorkIncome = 0;
        userFactory.parentUntaxedIncome = 0;
        userFactory.parentAdditionalIncome = 0;
        userFactory.parentLiquidFunds = 0;
        userFactory.parentInvestmentWorth = 0;
        userFactory.parentBusinessWorth = 0;

        userFactory.setSchool = function (school) {
            userFactory.school = school;
        };
        userFactory.getSchool = function () {
            return userFactory.school;
        };

        userFactory.setEFCStatus = function (efcStatus) {
            userFactory.efcStatus = efcStatus;
        };
        userFactory.getEFCStatus = function () {
            return userFactory.efcStatus;
        };

        userFactory.setEFC = function (efc) {
            userFactory.efc = efc;
        };
        userFactory.getEFC = function () {
            return userFactory.efc;
        };

        userFactory.setBirthDate = function (date) {
            userFactory.birthDate = date;
        };
        userFactory.getBirthDate = function () {
            return userFactory.birthDate;
        };

        userFactory.setStudentAge = function (age) {
            userFactory.studentAge = age;
        };
        userFactory.getStudentAge = function () {
            return userFactory.studentAge;
        };

        userFactory.setStudentMaritalStatus = function (maritalStatus) {
            userFactory.studentMaritalStatus = maritalStatus;
        };
        userFactory.getStudentMaritalStatus = function () {
            return userFactory.studentMaritalStatus;
        };

        userFactory.setMilitaryStatus = function (status) {
            userFactory.militaryStatus = status;
        };
        userFactory.getMilitaryStatus = function () {
            return userFactory.militaryStatus;
        };

        userFactory.setVeteranStatus = function (status) {
            userFactory.veteranStatus = status;
        };
        userFactory.getVeteranStatus = function () {
            return userFactory.veteranStatus;
        };

        userFactory.setOrphanStatus = function (status) {
            userFactory.orphanStatus = status;
        };
        userFactory.getOrphanStatus = function () {
            return userFactory.orphanStatus;
        };

        userFactory.setDependentsStatus = function (status) {
            userFactory.dependentsStatus = status;
        };
        userFactory.getDependentsStatus = function () {
            return userFactory.dependentsStatus;
        };

        userFactory.setDependencyStatus = function (status) {
            userFactory.dependencyStatus = status;
        };
        userFactory.getDependencyStatus = function () {
            return userFactory.dependencyStatus;
        };

        userFactory.setStudentState = function (state) {
            userFactory.studentState = state;
        };
        userFactory.getStudentState = function () {
            return userFactory.studentState;
        };

        userFactory.setCampus = function (campus) {
            userFactory.campus = campus;
        };
        userFactory.getCampus = function () {
            return userFactory.campus;
        };

        userFactory.setDiplomaStatus = function (status) {
            userFactory.diplomaStatus = status;
        };
        userFactory.getDiplomaStatus = function () {
            return userFactory.diplomaStatus;
        };

        userFactory.setSNRStatus = function (status) {
            userFactory.snrStatus = status;
        };
        userFactory.getSNRStatus = function () {
            return userFactory.snrStatus;
        };

        userFactory.setGPA = function (gpa) {
            userFactory.gpa = gpa;
        };
        userFactory.getGPA = function () {
            return userFactory.gpa;
        };

        userFactory.setTestType = function (testType) {
            userFactory.testType = testType;
        };
        userFactory.getTestType = function () {
            return userFactory.testType;
        };

        userFactory.setSATMath = function (score) {
            userFactory.satMath = score;
        };
        userFactory.getSATMath = function () {
            return userFactory.satMath;
        };

        userFactory.setSATVerbal = function (score) {
            userFactory.satVerbal = score;
        };
        userFactory.getSATVerbal = function () {
            return userFactory.satVerbal;
        };

        userFactory.setACTScore = function (score) {
            userFactory.actScore = score;
        };
        userFactory.getACTScore = function () {
            return userFactory.actScore;
        };

        userFactory.setTAPStatus = function (status) {
            userFactory.tapStatus = status;
        };
        userFactory.getTAPStatus = function () {
            return userFactory.tapStatus;
        };

        userFactory.setHousingStatus = function (status) {
            userFactory.housingStatus = status;
        };
        userFactory.getHousingStatus = function () {
            return userFactory.housingStatus;
        };

        userFactory.setStudentNumberHousehold = function (number) {
            userFactory.studentNumberHousehold = number;
        };
        userFactory.getStudentNumberHousehold = function () {
            return userFactory.studentNumberHousehold;
        };

        userFactory.setStudentNumberStudents = function (number) {
            userFactory.studentNumberStudents = number;
        };
        userFactory.getStudentNumberStudents = function () {
            return userFactory.studentNumberStudents;
        };

        userFactory.setStudentWorkIncome = function (income) {
            userFactory.studentWorkIncome = income;
        };
        userFactory.getStudentWorkIncome = function () {
            return userFactory.studentWorkIncome;
        };

        userFactory.setSpouseWorkIncome = function (income) {
            userFactory.spouseWorkIncome = income;
        };
        userFactory.getSpouseWorkIncome = function () {
            return userFactory.spouseWorkIncome;
        };

        userFactory.setStudentUntaxedIncome = function (income) {
            userFactory.studentUntaxedIncome = income;
        };
        userFactory.getStudentUntaxedIncome = function () {
            return userFactory.studentUntaxedIncome;
        };

        userFactory.setStudentAdditionalIncome = function (income) {
            userFactory.studentAdditionalIncome = income;
        };
        userFactory.getStudentAdditionalIncome = function () {
            return userFactory.studentAdditionalIncome;
        };

        userFactory.setStudentLiquidFunds = function (funds) {
            userFactory.studentLiquidFunds = funds;
        };
        userFactory.getStudentLiquidFunds = function () {
            return userFactory.studentLiquidFunds;
        };

        userFactory.setStudentInvestmentWorth = function (worth) {
            userFactory.studentInvestmentWorth = worth;
        };
        userFactory.getStudentInvestmentWorth = function () {
            return userFactory.studentInvestmentWorth;
        };

        userFactory.setStudentBusinessWorth = function (worth) {
            userFactory.studentBusinessWorth = worth;
        };
        userFactory.getStudentBusinessWorth = function () {
            return userFactory.studentBusinessWorth;
        };

        userFactory.setParentState = function (state) {
            userFactory.parentState = state;
        };
        userFactory.getParentState = function () {
            return userFactory.parentState;
        };

        userFactory.setParentMaritalStatus = function (status) {
            userFactory.parentMaritalStatus = status;
        };
        userFactory.getParentMaritalStatus = function () {
            return userFactory.parentMaritalStatus;
        };

        userFactory.setParentNumberHousehold = function (number) {
            userFactory.parentNumberHousehold = number;
        };
        userFactory.getParentNumberHousehold = function () {
            return userFactory.parentNumberHousehold;
        };

        userFactory.setParentNumberStudents = function (number) {
            userFactory.parentNumberStudents = number;
        };
        userFactory.getParentNumberStudents = function () {
            return userFactory.parentNumberStudents;
        };

        userFactory.setParentAge = function (age) {
            userFactory.parentAge = age;
        };
        userFactory.getParentAge = function () {
            return userFactory.parentAge;
        };

        userFactory.setFatherWorkIncome = function (income) {
            userFactory.fatherWorkIncome = income;
        };
        userFactory.getFatherWorkIncome = function () {
            return userFactory.fatherWorkIncome;
        };

        userFactory.setMotherWorkIncome = function (income) {
            userFactory.motherWorkIncome = income;
        };
        userFactory.getMotherWorkIncome = function () {
            return userFactory.motherWorkIncome;
        };

        userFactory.setParentUntaxedIncome = function (income) {
            userFactory.parentUntaxedIncome = income;
        };
        userFactory.getParentUntaxedIncome = function () {
            return userFactory.parentUntaxedIncome;
        };

        userFactory.setParentAdditionalIncome = function (income) {
            userFactory.parentAdditionalIncome = income;
        };
        userFactory.getParentAdditionalIncome = function () {
            return userFactory.parentAdditionalIncome;
        };

        userFactory.setParentLiquidFunds = function (funds) {
            userFactory.parentLiquidFunds = funds;
        };
        userFactory.getParentLiquidFunds = function () {
            return userFactory.parentLiquidFunds;
        };

        userFactory.setParentInvestmentWorth = function (worth) {
            userFactory.parentInvestmentWorth = worth;
        };
        userFactory.getParentInvestmentWorth = function () {
            return userFactory.parentInvestmentWorth;
        };

        userFactory.setParentBusinessWorth = function (worth) {
            userFactory.parentBusinessWorth = worth;
        };
        userFactory.getParentBusinessWorth = function () {
            return userFactory.parentBusinessWorth;
        };

        return userFactory;
    };

    UserFactory.$inject = [];

    angular.module('calculatorApp').factory('UserFactory', UserFactory);
}());