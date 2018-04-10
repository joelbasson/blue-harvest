'use strict';
const express = require('express');
const router = express.Router();
const Account = require("../models/account.js");
const Transaction = require("../models/transaction.js");
const config = require('../config/config.js');

/* POST Create Account */
router.post('/', function (req, res, next) {
    let customerId = req.body.customerId;
    let accountName = req.body.accountName || 'Default';
    let initialCredit = req.body.initialCredit;

    if (customerId == undefined || initialCredit == undefined)
        return res.json(400, {message : 'customerId and initialCredit are required'});

    
    if (!isInteger(initialCredit) || initialCredit < 0)
        return res.json(400, {message : 'initialCredit should be an integer of 0 or higher'});
    
    initialCredit = parseInt(initialCredit);
    Account.create(customerId, accountName, function (error, account) {
        if (error)  return res.json(400, error);
        
        if (initialCredit > 0){ //only create a transaction if the initalCredit is greater than 0
            Transaction.create(account.id, initialCredit, 'Initial Credit', function (error, transaction) {
                if (error)  return res.json(400, error);
                
                Account.updateBalance(account.id, initialCredit, function(error, account){ //we would normally reduce the transaction values to get the balance, but with initalCredit that is uneccessary
                    if (error)  return res.json(400, error);
                    
                    return res.json(account);
                });
            });
        } else {
            return res.json(account);
        }
    });
})

function isInteger(value){
    if (value % 1 != 0)
        return false;

    value = parseInt(value);
    if (!Number.isInteger(value))
        return false;

    return true;
}

module.exports = router;