var loki = require('lokijs');
var db = require('../helpers/db').db();

// create collections
var account = db.addCollection('Account');
var customer = db.addCollection('Customer');

exports.create = function(customerId, accountName, callback) {
    //check for existing customer
    let existingCustomer = customer.get(customerId);
    if (!existingCustomer)
        return callback({message : 'That customer does not exist'});
    //check for a existing account
    let existingAccounts = account.find( {'customerId': customerId} );
    let dbAccount = account.insert({
        customerId : existingCustomer.$loki,
        isPrimary : existingAccounts.length === 0,
        accountName : accountName,
        balance : 0
    });
    db.saveDatabase();
    return callback(null, dbAccountToAccount(dbAccount))
}
  
exports.find = function(id, callback) {
    let existingAccount = account.get(id);
    return callback(null, dbAccountToAccount(existingAccount));
}

exports.findAll = function(customerId, callback) {
    let existingAccounts = account.find( {'customerId': customerId} );
    existingAccounts = existingAccounts.map((item) => dbAccountToAccount(item));
    return callback(null, existingAccounts);
}

exports.findAllSync = function(customerId) {
    let existingAccounts = account.find( {'customerId': customerId} );
    return existingAccounts.map((item) => dbAccountToAccount(item));
}

exports.updateBalance = function(accountId, balance, callback) {
    let existingAccount = account.get(accountId);
    existingAccount.balance = balance;
    let dbAccount = account.update(existingAccount);
    db.saveDatabase();
    return callback(null, dbAccountToAccount(dbAccount))
}

function dbAccountToAccount(dbAccount){
    return {
        id : dbAccount.$loki,
        customerId : dbAccount.customerId,
        isPrimary : dbAccount.isPrimary,
        accountName : dbAccount.accountName,
        balance : dbAccount.balance
    }
}