(function(window) {
    'use strict';
    var App = window.App || {};

    function DataStore() {
        //console.log('running the DataStore function');
        this.data = {};
    }
    //stores or adds data to datastore that can be used by anybody who has access
    DataStore.prototype.add = function(key, val) {
        this.data[key] = val;
    };
    //gets value for a given key and can be used by anybody who has access
    DataStore.prototype.get = function(key) {
        return this.data[key];
    };
    //gets all of stored data and can be used by anybody who has access
    DataStore.prototype.getAll = function() {
        return this.data;
    };
    //deletes data for a given key and used by anybody who has access
    DataStore.prototype.remove = function(key) {
        delete this.data[key];
    };

    App.DataStore = DataStore;
    window.App = App;
})(window);
