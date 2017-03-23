(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with the selector: ' + selector);
        }
    }
    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data);
            this.reset();
            this.elements[0].focus();
        });
    };

    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            // Event handler code will go here
            var emailAddress = event.target.value;
            //console.log(fn(emailAddress));
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };
    //for decaf coffee value

    FormHandler.prototype.addInput = function(fn) {
        var coffeetext = '';
        //this is for coffee text order
        this.$formElement.on('input', '[name="coffee"]', function(event) {
            // Event handler code will go here
            coffeetext = event.target;
            var message = '';
            //  var strength = $('#strengthLevel').val();
            //console.log(strength);
            var data = {};
            this.$formElement.serializeArray().forEach(function(item) {
                if (item.name === 'coffee' || item.name === 'strength') {
                    data[item.name] = item.value;
                }

            });

            if (fn(data.coffee, data.strength)) {
                event.target.setCustomValidity('');
            } else {
                message = 'If it\'s decaf Strength should be less than 20!';
                event.target.setCustomValidity(message);
                console.log(data.strength);
            }


        }.bind(this));

        //this is for strength
        this.$formElement.on('change', '[name="strength"]', function(event) {
            var data = {};
            this.$formElement.serializeArray().forEach(function(item) {
                if (item.name === 'coffee' || item.name === 'strength') {
                    data[item.name] = item.value;
                }
            });
            if (fn(data.coffee, data.strength)) {
                if (coffeetext) {
                    coffeetext.setCustomValidity('');
                }
                event.target.setCustomValidity('');
            } else {
                var message = 'If it\'s decaf Strength should be less than 20!';
                event.target.setCustomValidity(message);
            }
        }.bind(this));
    };



    App.FormHandler = FormHandler;
    window.App = App;
})(window);
