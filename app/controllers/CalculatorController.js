/**
 * Created by dscott on 10/26/2014.
 */
(function() {
    var CalculatorController = function ($http, $scope, $state, UserFactory, SummaryFactory, ScholarshipFactory, TapFactory, DataAccessFactory, EmploymentAllowanceFactory, IncomeFactory, AllowancesFactory, AssetsFactory, AAIContributionFactory, AdjustedBusinessWorthFactory) {

        // Student Information
        $scope.school = UserFactory.school;
        $scope.campus = UserFactory.campus;
        $scope.housingStatus = UserFactory.housingStatus;
        $scope.testType = UserFactory.testType;
        $scope.dependencyStatus = UserFactory.dependencyStatus;
        $scope.studentWorkIncome = UserFactory.studentWorkIncome;
        $scope.spouseWorkIncome = UserFactory.spouseWorkIncome;
        $scope.studentUntaxedIncome = UserFactory.studentUntaxedIncome;
        $scope.studentAdditionalIncome = UserFactory.studentAdditionalIncome;
        $scope.studentLiquidFunds = UserFactory.studentLiquidFunds;
        $scope.studentBusinessWorth = UserFactory.studentBusinessWorth;
        $scope.studentInvestmentWorth = UserFactory.studentInvestmentWorth;
        $scope.tapStatus = UserFactory.tapStatus;

        // Parent Information
        $scope.fatherWorkIncome = UserFactory.fatherWorkIncome;
        $scope.motherWorkIncome = UserFactory.motherWorkIncome;
        $scope.parentUntaxedIncome = UserFactory.parentUntaxedIncome;
        $scope.parentAdditionalIncome = UserFactory.parentAdditionalIncome;
        $scope.parentLiquidFunds = UserFactory.parentLiquidFunds;
        $scope.parentBusinessWorth = UserFactory.parentBusinessWorth;
        $scope.parentInvestmentWorth = UserFactory.parentInvestmentWorth;

        if ($scope.dependencyStatus == 'independent') {
            $scope.residentState = UserFactory.studentState;
            $scope.maritalStatus = UserFactory.studentMaritalStatus;
            $scope.numberHousehold = UserFactory.studentNumberHousehold;
            $scope.numberStudents = UserFactory.studentNumberStudents;
            $scope.age = UserFactory.studentAge;
            $scope.dependentsStatus = UserFactory.dependentsStatus;
        }
        else {
            $scope.residentState = UserFactory.parentState;
            $scope.maritalStatus = UserFactory.parentMaritalStatus;
            $scope.age = UserFactory.parentAge;
            $scope.numberHousehold = UserFactory.parentNumberHousehold;
            $scope.numberStudents = UserFactory.parentNumberStudents;
        }

        var TUITION1 = 31200;
        var TUITION2 = 9000;
        var FEES1 = 800;
        var FEES2 = 650;
        var FEES3 = 750;
        var ROOMANDBOARD = 12200;
        var PERSONAL = 1100;
        var BOOKS = 1000;
        var TRANSPORTATION = 1100;
        var SHORT = 0.04;

        var school = UserFactory.school;
        var campus = UserFactory.campus;
        var housingStatus = UserFactory.housingStatus;

        $scope.tuitionFees = 0;
        if ($scope.school == "SAS") {
            $scope.tuitionFees = TUITION1 + FEES1;
        }
        else if ($scope.school == "SNR") {
            $scope.tuitionFees = TUITION2;
            if ($scope.campus == "NR") {
                $scope.tuitionFees += FEES3;
            }
            else {
                $scope.tuitionFees += FEES2;
            }
        }

        SummaryFactory.setTuitionFees($scope.tuitionFees);

        $scope.roomBoard = 0;
        if ($scope.housingStatus == "1") {
            $scope.roomBoard = ROOMANDBOARD;
        }

        SummaryFactory.setRoomAndBoard($scope.roomBoard);

        $scope.bookSupplies = BOOKS;
        SummaryFactory.setBooksAndSupplies($scope.bookSupplies);

        SummaryFactory.setPersonal(PERSONAL);

        SummaryFactory.setTransportation(TRANSPORTATION);

        $scope.directCost = SummaryFactory.getDirectCost();

        $scope.otherExpenses = SummaryFactory.getOtherExpenses();

        $scope.indirectCost = SummaryFactory.getIndirectCost();

        $scope.totalCost = SummaryFactory.getTotalCost();

        $scope.scholarshipAward = 0;
        $scope.scholarshipName = "No Scholarship";
        if ($scope.school == "SAS") {
            ScholarshipFactory.setTest(UserFactory.testType);
            ScholarshipFactory.setGPA(UserFactory.gpa);

            if ($scope.testType == "SAT") {
                ScholarshipFactory.setSATMath(UserFactory.satMath);
                ScholarshipFactory.setSATVerbal(UserFactory.satVerbal);
            }
            else {
                ScholarshipFactory.setACTScore(UserFactory.actScore);
            }

            ScholarshipFactory.setAward();

            $scope.scholarshipAward = ScholarshipFactory.getAward();
            $scope.scholarshipName = ScholarshipFactory.getName();
        }
        else if ($scope.school == "SNR") {
            if (UserFactory.diplomaStatus == 1 && UserFactory.snrStatus == 1) {
                $scope.scholarshipAward = 2000;
                $scope.scholarshipName = 'St. Angela Award for Adult Students';
            }
        }

        // Calculate student's TAP Award
        $scope.tapAward = 0;
        if ($scope.residentState == 'NY') {
            TapFactory.setDependency($scope.dependencyStatus);
            TapFactory.setParentIncome($scope.parentIncome);
            TapFactory.setStudentIncome($scope.studentWorkIncome);
            TapFactory.setNumberHousehold($scope.numberHousehold);
            TapFactory.setStudents($scope.numberStudents);
            TapFactory.setMaritalStatus($scope.maritalStatus);
            TapFactory.setTAPStatus($scope.tapStatus);

            $scope.tapAward = TapFactory.getAward();
        }

        // Calculate student's Expected Family Contribution
        $scope.efc = 0;
        if (UserFactory.getEFCStatus() == 1) {
            $scope.efc = UserFactory.getEFC();
        }
        else {
            // Calculate student total income
            IncomeFactory.setTaxedIncome($scope.studentWorkIncome);
            IncomeFactory.setUntaxedIncome($scope.studentUntaxedIncome);
            IncomeFactory.setAdditionalIncome($scope.studentAdditionalIncome);
            $scope.studentIncome = IncomeFactory.totalIncome();

            if ($scope.dependencyStatus == 'dependent') {
                // Calculate parent total income
                $scope.parentIncome = $scope.fatherWorkIncome + $scope.motherWorkIncome;
                IncomeFactory.setTaxedIncome($scope.parentIncome);
                IncomeFactory.setUntaxedIncome($scope.parentUntaxedIncome);
                IncomeFactory.setAdditionalIncome($scope.parentAdditionalIncome);
                $scope.parentIncome = IncomeFactory.totalIncome();

                // Calculate parent(s) total allowances
                $scope.parentStateAllowance = 0;
                DataAccessFactory.getJSONData("tableA1.json")
                    .success(function (_tableA1Data) {
                        var expression = "$..allowance[?(@.rstate=='" + $scope.residentState + "')].";

                        if ($scope.parentIncome >= 15000) {
                            expression += "percentage2";
                        }
                        else {
                            expression += "percentage1";
                        }

                        var percentage = jsonPath(_tableA1Data, expression);

                        $scope.parentStateAllowance = $scope.parentIncome * percentage[0];
                    });

                $scope.parentIncomeProtection = 0;
                DataAccessFactory.getJSONData('tableA3.json')
                    .success(function (_tableA3Data) {
                        if ($scope.numberHousehold <= 6) {
                            var expression = "$..allowance[?(@.hhmembers==" + $scope.numberHousehold + ")].amounts[?(@.cstudents==" + $scope.numberStudents + ")].amount";

                            var protection = jsonPath(_tableA3Data, expression);
                            $scope.parentIncomeProtection = protection[0];
                        }
                        else {
                            var numberHouseholdAmount = $scope.numberHousehold - 6;
                            var studentAmount = students - 1;
                            numberHouseholdAmount *= 4100;
                            studentAmount *= 2910;
                            $scope.parentIncomeProtection = 24620 + numberHouseholdAmount;
                        }
                    });

                $scope.parentEmployeeAllowance = 0;
                if ($scope.maritalStatus == 1) {
                    if ($scope.fatherWorkIncome > 0 && $scope.motherWorkIncome > 0) {
                        $scope.parentEmployeeAllowance = EmploymentAllowanceFactory.getAllowance($scope.fatherWorkIncome, $scope.motherWorkIncome);
                    }
                }
                else {
                    if ($scope.fatherWorkIncome > 0)
                        $scope.parentEmployeeAllowance = EmploymentAllowanceFactory.getAllowance($scope.fatherWorkIncome);
                    else if ($scope.motherWorkIncome > 0) {
                        $scope.parentEmployeeAllowance = EmploymentAllowanceFactory.getAllowance($scope.motherWorkIncome);
                    }
                }

                AllowancesFactory.setStateTaxAllowance($scope.parentStateAllowance);
                AllowancesFactory.setSocialSecurityAllowance1($scope.fatherWorkIncome);
                AllowancesFactory.setSocialSecurityAllowance2($scope.motherWorkIncome);
                AllowancesFactory.setIncomeProtection($scope.parentIncomeProtection);
                AllowancesFactory.setEmploymentAllowance($scope.parentEmployeeAllowance);

                $scope.parentAllowances = AllowancesFactory.totalAllowances();

                // Calculate parent(s) asset contribution
                AssetsFactory.setLiquidFunds($scope.parentLiquidFunds);
                AssetsFactory.setInvestmentWorth($scope.parentInvestmentWorth);
                AssetsFactory.setBusinessWorth(AdjustedBusinessWorthFactory.adjustedBusinessWorth($scope.parentBusinessWorth));
                $scope.parentAssetProtection = 0;
                DataAccessFactory.getJSONData('tableA5.json')
                    .success(function (_tableA5Data) {
                        if ($scope.age >= 26) {
                            var expression = "$..allowance[?(@.age==" + $scope.age + ")].";
                            if ($scope.maritalStatus == 1) {
                                expression += "married";
                            }
                            else {
                                expression += "unmarried";
                            }
                        }

                        protection = jsonPath(_tableA5Data, expression);
                        $scope.parentAssetProtection = protection[0];
                    });
                AssetsFactory.setAssetProtection($scope.parentAssetProtection);
                AssetsFactory.setRate(0.12);

                $scope.parentAssetContribution = AssetsFactory.assetContribution();

                $scope.parentAAI = AAIContributionFactory.getContribution($scope.parentIncome, $scope.parentAllowances, $scope.parentAssetContribution);

                $scope.parentContribution = $scope.parentAAI / $scope.numberStudents;
                if ($scope.parentContribution < 0) {
                    $scope.parentContribution = 0;
                }

                // Calculate student total allowances
                $scope.studentStateTaxAllowance = 0;
                DataAccessFactory.getJSONData('tableA7.json')
                    .success(function (_tableA7Data) {
                        var expression = "$..allowance[?(@.rstate=='" + $scope.residentState + "')].percentage";

                        var percentage = jsonPath(_tableA7Data, expression);
                        $scope.studentStateTaxAllowance = $scope.studentIncome * percentage[0];
                    });
                AllowancesFactory.setStateTaxAllowance($scope.studentStateTaxAllowance);
                AllowancesFactory.setSocialSecurityAllowance1($scope.studentWorkIncome);
                AllowancesFactory.setSocialSecurityAllowance2(0);
                AllowancesFactory.setIncomeProtection(6130);
                AllowancesFactory.setEmploymentAllowance(0);
                AllowancesFactory.setParentAAI($scope.parentAAI);

                $scope.studentAllowances = AllowancesFactory.totalAllowances();

                // Calculate student asset contribution
                AssetsFactory.setLiquidFunds($scope.studentLiquidFunds);
                AssetsFactory.setInvestmentWorth($scope.studentInvestmentWorth);
                AssetsFactory.setBusinessWorth($scope.studentBusinessWorth);
                AssetsFactory.setAssetProtection(0);
                AssetsFactory.setRate(0.2);

                $scope.studentAssetContribution = AssetsFactory.assetContribution();

                $scope.studentContribution = (($scope.studentIncome - $scope.studentAllowances) * 0.5) + $scope.studentAssetContribution;
                if ($scope.studentContribution < 0) {
                    $scope.studentContribution = 0;
                }

                $scope.efc = $scope.parentContribution + $scope.studentContribution;
            }
            else {
                $scope.totalAllowances = 0;
                $scope.incomeProtection = 0;
                $scope.employmentAllowance = 0;
                $scope.assetContribution = 0;
                $scope.assetProtection = 0;

                if ($scope.dependentsStatus == 1) {
                    // Calculate student total allowances
                    $scope.studentStateTaxAllowance = 0;
                    DataAccessFactory.getJSONData("tableC1.json")
                        .success(function (_tableC1Data) {
                            var expression = "$..allowance[?(@.rstate==" + $scope.residentState + ")].";

                            if ($scope.studentIncome >= 15000) {
                                expression += "percentage2";
                            }
                            else {
                                expression += "percentage1";
                            }

                            var percentage = jsonPath(_tableC1Data, expression);

                            $scope.studentStateAllowance = $scope.studentIncome * percentage[0];
                        });
                    AllowancesFactory.setStateTaxAllowance(studentStateTaxAllowance);
                    AllowancesFactory.setSocialSecurityAllowance1($scope.studentWorkIncome);
                    if ($scope.maritalStatus == 1) {
                        AllowancesFactory.setSocialSecurityAllowance2($scope.spouseWorkIncome);
                    }
                    $scope.incomeProtection = 0;
                    DataAccessFactory.getJSONData('tableC3.json')
                        .success(function (_tableC3Data) {
                            if ($scope.numberHousehold <= 6) {
                                var expression = "$..allowance[?(@.hhmembers==" + $scope.numberHousehold + ")].amounts[?(@.cstudents==" + $scope.numberStudents + ")].amount";

                                var protection = jsonPath(_tableC3Data, expression);
                                $scope.incomeProtection = protection[0];
                            }
                            else {
                                var numberHouseholdAmount = $scope.numberHousehold - 6;
                                var studentAmount = $scope.numberStudents - 1;
                                numberHouseholdAmount *= 4100;
                                studentAmount *= 2910;
                                $scope.incomeProtection = 24620 + numberHouseholdAmount;
                            }
                        });
                    AllowancesFactory.setIncomeProtection($scope.incomeProtection);
                    $scope.employmentAllowance = EmploymentAllowanceFactory.getAllowance($scope.studentWorkIncome);
                    if ($scope.maritalStatus == 1) {
                        $scope.employmentAllowance = 0;
                        if ($scope.studentWorkIncome() > 0 && $scope.spouseWorkIncome() > 0) {
                            $scope.employmentAllowance = EmploymentAllowanceFactory.getAllowance($scope.studentWorkIncome(), $scope.spouseWorkIncome());
                        }
                    }
                    AllowancesFactory.setEmploymentAllowance($scope.employmentAllowance);

                    $scope.totalAllowances = AllowancesFactory.totalAllowances();

                    // Calculate student asset contribution
                    AssetsFactory.setLiquidFunds($scope.studentLiquidFunds());
                    AssetsFactory.setInvestmentWorth($scope.studentInvestmentWorth);
                    AssetsFactory.setBusinessWorth(AdjustedBusinessWorthFactory.adjustedBusinessWorth($scope.studentBusinessWorth()));
                    $scope.assetProtection = 0;
                    DataAccessFactory.getJSONData('tableC5.json')
                        .success(function (_tableC5Data) {
                            if ($scope.age >= 26) {
                                var expression = "$..allowance[?(@.age=" + $scope.age + ")].";
                                if ($scope.maritalStatus == 1) {
                                    expression += "married";
                                }
                                else {
                                    expression += "unmarried";
                                }
                            }

                            var protection = jsonPath(_tableC5Data, expression);
                            $scope.assetProtection = protection[0];
                            });
                    AssetsFactory.setAssetProtection($scope.assetProtection);
                    AssetsFactory.setRate(0.07);

                    $scope.assetContribution = AssetsFactory.assetContribution();

                    $scope.aai = AAIContributionFactory.getContribution($scope.studentIncome, $scope.totalAllowances, $scope.assetContribution);

                    $scope.efc = $scope.aai / $scope.numberStudents;
                }
                else {
                    $scope.studentStateTaxAllowance = 0;
                    DataAccessFactory.getJSONData('tableB1.json')
                        .success(function (_tableB1Data) {
                            var expression = "$..allowance[?(@.rstate==" + $scope.residentState + ")].percentage";

                            var percentage = jsonPath(_tableB1Data, expression);
                            $scope.studentStateTaxAllowance = $scope.studentIncome * percentage[0];
                        });
                    AllowancesFactory.setStateTaxAllowance($scope.studentStateTaxAllowance);
                    AllowancesFactory.setSocialSecurityAllowance1($scope.studentWorkIncome);
                    if ($scope.maritalStatus == 1) {
                        AllowancesFactory.setSocialSecurityAllowance2($scope.spouseWorkIncome);
                    }
                    $scope.incomeProtection = 9540;
                    if ($scope.maritalStatus == 1) {
                        $scope.incomeProtection = 15290;
                    }
                    AllowancesFactory.setIncomeProtection($scope.incomeProtection);
                    if ($scope.maritalStatus == 1) {
                        if ($scope.studentWorkIncome > 0 && $scope.spouseWorkIncome > 0) {
                            $scope.employmentAllowance = EmploymentAllowanceFactory.getAllowance($scope.studentWorkIncome, $scope.spouseWorkIncome);
                        }
                    }
                    AllowancesFactory.setEmploymentAllowance($scope.employmentAllowance);

                    totalAllowances = AllowancesFactory.totalAllowances();

                    // Calculate student asset contribution
                    AssetsFactory.setLiquidFunds($scope.studentLiquidFunds());
                    AssetsFactory.setInvestmentWorth($scope.studentInvestmentWorth());
                    AssetsFactory.setBusinessWorth(AdjustedBusinessWorthFactory.adjustedBusinessWorth($scope.studentBusinessWorth()));
                    $scope.assetProtection = 0;
                    DataAccessFactory.getJSONData('tableB4.json')
                        .success(function (_tableB4Data) {
                            if ($scope.age >= 26) {
                                var expression = "$..allowance[?(@.age==" + $scope.age + ")].";
                                if ($scope.maritalStatus == 1) {
                                    expression += "married";
                                }
                                else {
                                    expression += "unmarried";
                                }
                            }

                            var protection = jsonPath(_tableB4Data, expression);
                            $scope.assetProtection = protection[0];
                            });
                    AssetsFactory.setAssetProtection($scope.assetProtection);
                    AssetsFactory.setRate(0.2);

                    $scope.assetContribution = AssetsFactory.assetContribution();

                    $scope.efc = ((($scope.studentIncome - $scope.totalAllowances) * 0.5) + $scope.assetContribution) / $scope.numberStudents;
                }
            }
        }

        $scope.totalAid = $scope.totalCost - $scope.efc;
        if (UserFactory.school == "SAS") {
            $scope.totalAid *= (1 - SHORT);
            $scope.totalAid -= 75;
        }

        // Calculate student's Pell Award
        $scope.pellAward = 0;
        DataAccessFactory.getJSONData("full-time.pell.json")
            .success(function(_pellData){
                var expression = "$..cost[?(@.low<=" + $scope.totalCost + " && @.high>=" + $scope.totalCost + ")].efc[?(@.low<=" + $scope.efc + " && @.high>=" + $scope.efc + ")].payment";

                var award = jsonPath(_pellData, expression);

                $scope.pellAward = parseInt(award[0]);
            });

        $scope.otherAid = $scope.totalAid - $scope.pellAward - $scope.tapAward - $scope.scholarshipAward;

        $scope.netPrice = $scope.totalCost - $scope.totalAid;

        $scope.showPellAward = function() {
            var show = false;
            if ($scope.pellAward > 0) {
                show = true;
            }

            return show;
        };

        $scope.showTAPAward = function() {
            var show = false;
            if ($scope.residentState == 'NY') {
                show = true;
            }

            return show;
        };

        $scope.showMeritScholarship = function() {
            var show = false;
            if ($scope.scholarshipAward > 0) {
                show = true;
            }

            return show;
        };

        $scope.showOtherAid = function() {
            var show = false;
            if ($scope.otherAid > 0) {
                show = true;
            }

            return show;
        };
    };

    CalculatorController.$inject = ['$http', '$scope', '$state', 'UserFactory', 'SummaryFactory', 'ScholarshipFactory', 'TapFactory', 'DataAccessFactory', 'EmploymentAllowanceFactory', 'IncomeFactory', 'AllowancesFactory', 'AssetsFactory', 'AAIContributionFactory', 'AdjustedBusinessWorthFactory', 'EmploymentAllowanceFactory'];

    angular.module('calculatorApp')
        .controller('CalculatorController', CalculatorController);
}());