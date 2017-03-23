(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    //checklist function
    function CheckList(selector) {
        //ensures that there is a selector passed in, if not throw error
        if (!selector) {
            throw new Error('No selector provided');
        }
        //pass selector and make sure that it matches at least one element in the DOM
        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    CheckList.prototype.addClickHandler = function(fn) {
        this.$element.on('click', 'input', function(event) { //listen for a click event(when user clicks check box) using jQuery's 'on' method
            //and it is triggered when filter selector is of type 'input'
            var email = event.target.value; //checkbox input type is assigned a value of user's email addr which will be used to get the email addr
            this.removeRow(email); //calls removeRow fn for the email
            fn(email);
        }.bind(this)); // and bind the callback to the CheckList instance
    };

    //uses the Row constructor to create a Row instances
    //append each Row instance’s $element to the live DOM on the page.
    CheckList.prototype.addRow = function(coffeeOrder) {
        // Remove any existing rows that match the email address
        this.removeRow(coffeeOrder.emailAddress);

        // Create a new instance of a row, using the coffee order info
        var rowElement = new Row(coffeeOrder);
        // Add the new row instance's $element property to the checklist
        //$(this) selector stands for the current selected object in a loop or event.
        this.$element.append(rowElement.$element);
    };
    //removes checklist item for specified email Id
    //it searches the DOM for the email field, then moves up until <div> and calls the remove method on the DOM
    //This is a example of chaining several methods in jQuery
    CheckList.prototype.removeRow = function(email) {
        this.$element.find('[value = "' + email + '"]') //does a search only on the checklist form data-coffee-order="checklist" NOT entire DOM
            .closest('[data-coffee-order="checkbox"]')
            .remove();
    };

    //Row constructor that accepts same parameter as Truck.prototype.createOrder
    //It creates DOM elements for coffee checkbox when an order is created
    function Row(coffeeOrder) {
        /*if (coffeeOrder.size === 'short') {
            var $div = $('<div></div>', {
                'data-coffee-order': 'checkbox',
                'class': 'checkbox'
            });
        }*/
        //creates a 'div' tag with arguments as DOM elements that we want to create
        var $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
            //'style': 'background-color'
        });

        //creates label tag without any argument-> used for only plain text
        var $label = $('<label></label>');

        //creates input tag specifying the type and value
        //the value field is assigned email address object so that we can associate checkbox with customer's email address
        var $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });
        var description = coffeeOrder.size + ' '; //assigns the size
        if (coffeeOrder.flavor) { //if flovor exits, add it to description var
            description += coffeeOrder.flavor + ' ';
        }
        description += coffeeOrder.coffee + ', '; //appends adds comma and space
        description += ' (' + coffeeOrder.emailAddress + ')'; //appends email addr
        description += ' [' + coffeeOrder.strength + 'x]'; //appends strength value
        //append checkbox, description to label and then append the label to div
        $label.append($checkbox);
        $label.append(description);

        //added color to the checklist
        if (coffeeOrder.flavor === 'caramel') {
            //$div.style.color = '#ffd59a';
            $div.append($label).css('background-color', '#C68E17');
        }
        else if(coffeeOrder.flavor === 'almond'){
            //$div.style.color = '#9a8678';
            $div.append($label).css('background-color', '#9a8678');
        }
        else if(coffeeOrder.flavor === 'mocha'){
            //$div.style.color = '#6F372D';
            $div.append($label).css('background-color', '#6F372D');
        }
        else{
            $div.append($label).css('background-color', '');
        }

        //$div.append($label);

        //Since Row is a constructor, it can not return the <div> DOM tree that we created dynamically
        //Instead, expose the <div> subtree as a property of the instance by assigning $div to this.$element
        this.$element = $div;
    }

    App.CheckList = CheckList;
    window.App = App;
})(window);
