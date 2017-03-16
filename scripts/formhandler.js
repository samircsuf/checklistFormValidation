(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        //find a matching element in the DOM using that selector and assign the result to this.$formElement
        //prefixing a variable with $ indicates that it is pointing to elements by using JQuery
        this.$formElement = $(selector);

        //handle range slider
        //$(document).on('input', '#strengthLevel', function() {
        //    $('#range-slider-value').html($(this).value);
        //});
        //check manually if the selection returned an empty object
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }

        var slider = document.getElementById('strengthLevel');//to keep track of slider range value
        var sliderValue = document.getElementById('strengthValue');//to change text color of value
        var sliderLabel = document.getElementById('strengthLabel');// to change text color of the Label

        sliderValue.style.color = 'green';
        sliderLabel.style.color = 'green';

        slider.addEventListener('input', function() {
            sliderValue.value = slider.value;

            var intensityColor;
            if (slider.value >= 0 && slider.value <= 30) {
                intensityColor = 'green';
            } else if (slider.value <= 70) {
                intensityColor = 'black';
            } else {
                intensityColor = 'red';
            }
            sliderValue.style.color = intensityColor;
            sliderLabel.style.color = intensityColor;
        });
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        //jQuery uses on method to listen on events
        this.$formElement.on('submit', function(event) {
            event.preventDefault(); //ensures that users aren't taken away from coffeerun page after submitting the form
            //var data = $(this).serializeArray();//this object is a ref to form element
            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value; //stores item value on data array against each name as key-value pair
                console.log(item.name + ' is ' + item.value);
            });
            //add code for achievements for a particular Flavor Shot


            if (data.size === 'Coffee-zilla' && data.flavor != '' && data.strength == 100) {
                $('#myModal').modal('show');
            }

            console.log(data);
            fn(data); //when the form is submitted, the callback will be invoked and will be passed whatever data the user entered into the form
            //resets the color of slider text and value
            $('#strengthLabel').css('color', 'green');
            $('#strengthValue').css('color', 'green');

            this.reset(); //clears old data after it was submitted
            this.elements[0].focus(); //focus it back to the first element
        });
    };

    App.FormHandler = FormHandler;

    window.App = App;
})(window);
