/**
 * Created by dscott on 11/11/2014.
 */
(function() {
    var TapFactory = function() {
        var factory = {};

        var _parentIncome = 0;
        var _studentIncome = 0;
        var _tapStatus = 0;
        var _numberHousehold = 0;
        var _students = 0;
        var _dependency = '';
        var _dependentsStatus = 0;
        var _maritalStatus = 0;
        var _award = 0;

        factory.setParentIncome = function(income) {
            _parentIncome = income;
        };

        factory.setStudentIncome = function(income) {
            _studentIncome = income;
        };

        factory.setTAPStatus = function(status) {
            _tapStatus = status;
        };

        factory.setNumberHousehold = function(number) {
            _numberHousehold = number;
        };

        factory.setStudents = function(students) {
            _students = students;
        };

        factory.setDependency = function(dependency) {
            _dependency = dependency;
        };

        factory.setDependentsStatus = function(dependentsStatus) {
            _dependentsStatus = dependentsStatus;
        };

        factory.setMaritalStatus = function(maritalStatus) {
            _maritalStatus = maritalStatus;
        };

        factory.getAward = function () {
            var MARRIAGE_DEDUCTION = 15000;
            var HOUSEHOLD_DEDUCTION = 10500;
            var SINGLE_DEDUCTION = 7000;
            var STUDENT_DEDUCTION = 3000;
            var EXEMPTION_DEDUCTION = 1000;

            var SCHEDULE_A_MAX = 3575;
            var SCHEDULE_C_MAX = 3025;
            var SCHEDULE_D_MAX = 4125;
            var SCHEDULE_E_MAX = 5000;
            var SCHEDULE_K_MAX = 2450;
            var SCHEDULE_L_MAX = 2575;
            var SCHEDULE_M_MAX = 3025;

            var MINIMUM_AWARD = 500;

            var maxAward = 0;
            var reduction = 0;

            var exemptions = _numberHousehold - 1;
            if (_maritalStatus == 1) {
                exemptions = _numberHousehold - 2;
            }

            var extraDeduction = 0;
            if (_students == 2) {
                extraDeduction = STUDENT_DEDUCTION;
            }
            else if (_students > 2) {
                var extraStudent = _students - 2;
                extraDeduction = STUDENT_DEDUCTION - (extraStudent * 2000);
            }

            if (_dependency == 'independent') {
                var exemptionDeduction = exemptions * EXEMPTION_DEDUCTION;

                if (_dependentsStatus == 1) {
                    var netIncome = _studentIncome - HOUSEHOLD_DEDUCTION - exemptionDeduction - extraDeduction;

                    if (_tapStatus >= 3) {
                        maxAward = SCHEDULE_A_MAX;
                    }
                    else if (_tapStatus == 2) {
                        maxAward = SCHEDULE_D_MAX;
                    }
                    else if (_tapStatus == 1) {
                        maxAward = SCHEDULE_E_MAX;
                    }

                    if (netIncome > 7000 && netIncome <= 11000) {
                        reduction = (netIncome - 7000) * 0.07;
                    }
                    else if (netIncome > 11000 && netIncome <= 18000) {
                        reduction = 280 + (netIncome - 11000) * 0.1;
                    }
                    else if (netIncome > 18000 && netIncome <= 80000) {
                        reduction = 980 + (netIncome - 18000) * 0.12;
                    }
                    else if (netIncome > 80000) {
                        reduction = maxAward;
                    }
                }
                else {
                    if (_maritalStatus == 1  || _maritalStatus == 5) {
                        netIncome = _studentIncome - MARRIAGE_DEDUCTION - exemptionDeduction - extraDeduction;

                        maxAward = SCHEDULE_C_MAX;

                        if (netIncome > 7000 && netIncome <= 11000) {
                            reduction = (netIncome - 7000) * 0.07;
                        }
                        else if (netIncome > 11000 && netIncome <= 18000) {
                            reduction = 280 + (netIncome - 11000) * 0.1;
                        }
                        else if (netIncome > 18000 && netIncome <= 39999) {
                            reduction = 980 + (netIncome - 18000) * 0.12;
                        }
                        else if (netIncome > 39999) {
                            reduction = maxAward;
                        }
                    }
                    else {
                        netIncome = _studentIncome - SINGLE_DEDUCTION;

                        if (_tapStatus >= 4) {
                            maxAward = SCHEDULE_K_MAX;
                        }
                        else if (_tapStatus == 3) {
                            maxAward = SCHEDULE_L_MAX;
                        }
                        else if (_tapStatus < 3) {
                            maxAward = SCHEDULE_M_MAX;
                        }

                        if (netIncome > 3000 && netIncome <= 10000) {
                            reduction = (netIncome - 3000) * 0.31;
                        }
                        else if (netIncome > 10000) {
                            reduction = maxAward;
                        }
                    }

                    _award = maxAward - reduction;
                    if (_award >= 0 && _award <= MINIMUM_AWARD) {
                        _award = MINIMUM_AWARD;
                    }
                }
            }
            else {
                var parentNetIncome = 0;
                if (_maritalStatus == 1 || _maritalStatus == 5) {
                    parentNetIncome = _parentIncome - MARRIAGE_DEDUCTION;
                }
                else {
                    parentNetIncome = _parentIncome - HOUSEHOLD_DEDUCTION;
                }

                parentNetIncome -= (exemptions * EXEMPTION_DEDUCTION) - extraDeduction;
                if (parentNetIncome < 0) {
                    parentNetIncome = 0;
                }

                var studentNetIncome = _studentIncome - STUDENT_DEDUCTION;
                if (studentNetIncome < 0) {
                    studentNetIncome = 0;
                }

                var nysTaxableIncome = parentNetIncome + studentNetIncome;

                if (_tapStatus >= 3) {
                    maxAward = SCHEDULE_A_MAX;
                }
                else if (_tapStatus == 2) {
                    maxAward = SCHEDULE_D_MAX;
                }
                else if (_tapStatus == 1) {
                    maxAward = SCHEDULE_E_MAX;
                }

                if (nysTaxableIncome > 7000 && nysTaxableIncome <= 11000) {
                    reduction = (nysTaxableIncome - 7000) * 0.07;
                }
                else if (nysTaxableIncome > 11000 && nysTaxableIncome <= 18000) {
                    reduction = 280 + (nysTaxableIncome - 11000) * 0.1;
                }
                else if (nysTaxableIncome > 18000 && nysTaxableIncome <= 80000) {
                    reduction = 980 + (nysTaxableIncome - 18000) * 0.12;
                }
                else if (nysTaxableIncome > 80000) {
                    reduction = maxAward;
                }

                _award = maxAward - reduction;
                if (_award < 0) {
                    _award = 0;
                }

                if (_award >= 0 && _award < MINIMUM_AWARD) {
                    _award = MINIMUM_AWARD;
                }
            }

            return _award;
        };

        return factory;
    };

    TapFactory.$inject = [];

    angular.module('calculatorApp').factory('TapFactory', TapFactory);
}());