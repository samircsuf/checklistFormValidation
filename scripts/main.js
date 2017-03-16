(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';//will be used to select the form by form name
//    var RANGE_SELECTOR = '[data-coffee-order="strenghtRange"]';
//    var RANGE_VALUE = '[data-coffee-order="strengthValue"]';

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var myTruck = new Truck('ncc-1701', new DataStore());//uses the variable name instead of App.DataStore() that we used in console
//    var RangeHandler = App.RangeHandler;
    var FormHandler = App.FormHandler;
    window.myTruck = myTruck;//allows instance of Truck to be accessible from outside the function

//    var rangeHandler = new RangeHandler(RANGE_SELECTOR);
    var formHandler = new FormHandler(FORM_SELECTOR);

//    rangeHandler.addRangeHandler(RANGE_VALUE);
//    console.log(RangeHandler);

    formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));//pass a bound reference to myTruck.createOrder toformHandler.addSubmitHandler
    console.log(formHandler);
})(window);
