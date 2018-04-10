var loki = require('lokijs');
var db = require('../helpers/db').db();

// create collection
var customer = db.addCollection('Customer');

exports.create = function(firstName, lastName, callback) {
    let dbCustomer = customer.insert({
        firstName: firstName,
        lastName: lastName
    });
    db.saveDatabase();
    return callback(null, dbCustomerToCustomer(dbCustomer))
  }
  
exports.find = function(id, callback) {
    let dbCustomer = customer.get(id);
    return callback(null, dbCustomerToCustomer(dbCustomer))
}

exports.findAll = function(callback) {
    let customers = customer.find();
    customers = customers.map((item) => dbCustomerToCustomer(item));
    return callback(null, customers);
}

function dbCustomerToCustomer(dbCustomer){
    return {
        id : dbCustomer.$loki,
        firstName : dbCustomer.firstName,
        lastName : dbCustomer.lastName
    }
}