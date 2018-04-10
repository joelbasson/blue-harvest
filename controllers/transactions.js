'use strict';
const express = require('express');
const router = express.Router();
const async = require('async');
const Transaction = require("../models/transaction.js");

/* POST Create a Transaction */
router.post('/', function (req, res, next) {
    let accountId = req.body.accountId;
    let value = req.body.value;
    let name = req.body.name;

    if (accountId == undefined || name == undefined)
        return res.json(400, {message : 'accountId and name are required'});

    if (value == undefined)
        return res.json(400, {message : 'value is required'});

    
    if (!isInteger(value))
        return res.json(400, {message : 'value should be an integer'});
    
    value = parseInt(value);
  
    //Assume account can go into credit
    Transaction.create(accountId, value, name, function (error, transaction) {
        if (error)  return res.json(400, error);

        return res.json(transaction);
    });
})

module.exports = router;

function isInteger(value){
    if (value % 1 != 0)
        return false;

    value = parseInt(value);
    if (!Number.isInteger(value))
        return false;

    return true;
}