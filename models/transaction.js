var loki = require('lokijs');
var db = require('../helpers/db').db();

// create collection
var transaction = db.addCollection('Transaction');
var account = db.addCollection('Account');

exports.create = function(accountId, value, name, callback) {
    //check that account exists
    let existingAccount = account.get(accountId);
    if (!existingAccount)
        return callback({message : 'That account does not exist'});
    let dbTransaction = transaction.insert({
        accountId : existingAccount.$loki,
        value : value,
        name : name
    });
    db.saveDatabase();
    return callback(null, dbTransactionToTransaction(dbTransaction))
  }
  
exports.find = function(id, callback) {
    let dbTransaction = transaction.get(id);
    return callback(null, dbTransaction);
}

exports.findAll = function(customerId, callback) {
    let transactions = transaction.find( {'customerId': customerId} );
    transactions = transactions.map((item) => dbTransactionToTransaction(item));
    return callback(null, transactions);
}

exports.findAllSync = function(accountId) {
    let dbTransactions = transaction.find( {'accountId': accountId} );
    return dbTransactions.map((item) => dbTransactionToTransaction(item));
}

function dbTransactionToTransaction(dbTransaction){
    return {
        id : dbTransaction.$loki,
        accountId : dbTransaction.accountId,
        value : dbTransaction.value,
        name : dbTransaction.name
    }
}