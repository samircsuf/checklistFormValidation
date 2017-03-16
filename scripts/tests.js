QUnit.test('Testing DataStore functions', function(assert) {
    var App = window.App;
    var ds = new App.DataStore();
    ds.add('m@bond.com', 'tea');
    //var dsCreate1 = ds.add('m@bond.com', 'tea');
    //assert.equal(dsCreate1, undefined, 'Record added');
    ds.add('james@bond.com', 'eshpressho');
    //var dsCreate1 = ds.add('james@bond.com', 'eshpressho');
    //assert.equal(dsCreate1, undefined, 'Record added');

    var dsGetAll1 = ds.getAll(); //returns key value of two objects
    //dsGetAll1.forEach(function(id) {//iterates through the array and passes each key to get method in datastore.js
    //console.log(this.db.get(id));//
    assert.deepEqual(dsGetAll1, {
        'm@bond.com': 'tea',
        'james@bond.com': 'eshpressho'
    }, 'Current objects matches the expected key value pairs');

    var dsGetRemove = ds.remove('james@bond.com'); //returns undefined
    assert.equal(dsGetRemove, undefined, 'Order got delivered');

    var dsGetAll2 = ds.getAll(); //returns only one key value pair
    assert.deepEqual(dsGetAll2, {
        'm@bond.com': 'tea'
    }, 'Current object matches the expected key value pair');

    var dsGet1 = ds.get('m@bond.com'); //returns only value
    assert.equal(dsGet1, 'tea', 'Current object matches the expected value');

    var dsGet2 = ds.get('james@bond.com');
    assert.equal(dsGet2, undefined, 'Record not found');
});

QUnit.test('Testing Truck functions', function(assert) {
    var myTruck = window.myTruck;

    myTruck.createOrder({emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});

    myTruck.createOrder({emailAddress: 'dr@no.com', coffee: 'decaf'});

    myTruck.createOrder({emailAddress: 'm@bond.com', coffee: 'earl grey'});

    var printOrders1 = myTruck.printOrders();
    //console.log(printOrders1);
    assert.deepEqual(printOrders1, ['me@goldfinger.com', 'dr@no.com', 'm@bond.com'],'Current objects matches the expected key value pairs');

    myTruck.deliverOrder('dr@no.com');

    myTruck.deliverOrder('m@bond.com');

    var printOrders2 = myTruck.printOrders();
    assert.deepEqual(printOrders2, ['me@goldfinger.com'],'Current object matches the expected key value pair');
});
