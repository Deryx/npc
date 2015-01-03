/**
 * Created by dscott on 12/13/2014.
 */
(function() {
    var SummaryFactory = function() {
        var factory = {};

        var _tuitionFees = 0;
        var _roomAndBoard = 0;
        var _booksAndSupplies = 0;
        var _personal = 0;
        var _transportation = 0;

        var _directCost = 0;
        var _indirectCost = 0;

        factory.setTuitionFees = function (tf) {
            _tuitionFees = tf;
        };
        factory.getTuitionFees = function () {
            return _tuitionFees;
        };

        factory.setRoomAndBoard = function (rb) {
            _roomAndBoard = rb;
        };
        factory.getRoomAndBoard = function () {
            return _roomAndBoard;
        };

        factory.setBooksAndSupplies = function (bs) {
            _booksAndSupplies = bs;
        };
        factory.getBooksAndSupplies = function () {
            return _booksAndSupplies;
        };

        factory.setPersonal = function (personal) {
            _personal = personal;
        };
        factory.getPersonal = function () {
            return _personal;
        };

        factory.setTransportation = function (transportation) {
            _transportation = transportation;
        };
        factory.getTransportation = function () {
            return _transportation;
        };

        factory.getDirectCost = function () {
            return _tuitionFees + _roomAndBoard;
        };

        factory.getOtherExpenses = function() {
            return _personal + _transportation;
        };

        factory.getIndirectCost = function() {
            return _booksAndSupplies + _personal + _transportation;
        };

        factory.getTotalCost = function () {
            return _tuitionFees + _roomAndBoard + _booksAndSupplies + _personal + _transportation;
        };

        return factory;
    };

    SummaryFactory.$inject = [];

    angular.module('calculatorApp').factory('SummaryFactory', SummaryFactory);
}());