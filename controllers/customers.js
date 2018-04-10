'use strict';
const express = require('express');
const router = express.Router();
const async = require('async');
const Customer = require("../models/customer.js");
const Account = require("../models/account.js");
const Transaction = require("../models/transaction.js");

/* POST Create Customer */
router.post('/', function (req, res, next) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    if (firstName == undefined || lastName == undefined)
        return res.json(400, {message : 'firstName and lastName are required'});
  
    Customer.create(firstName, lastName, function (error, customer) {
        if (error)  return res.json(400, error);
        return res.json(customer);
    });
})

/* GET Find a customer */
router.get('/:id', function (req, res, next) {
    let customerId = req.params.id;

    if (customerId == undefined)
        return res.json(400, {message : 'customerId is required'});
  
    Customer.find(customerId, function (error, customer) {
        if (error)  return res.json(400, error);

        if (!customer)
            return res.json(400, {message : 'No customer exists with that customerId'});

        Account.findAll(customer.id, function(error, accounts){
            if (error)  return res.json(400, error);

            if (accounts.length === 0)
                return res.json(customer);

            accounts.forEach(function(account){
                account.transactions = Transaction.findAllSync(account.id)
            });

            customer.accounts = accounts;

            return res.json(customer)
        });
    });
})

/* GET Find all customers */
router.get('/', function (req, res, next) {
  
    Customer.findAll(function (error, customers) {
        if (error)  return res.json(400, error);

        customers.forEach(function(customer){
            Account.findAll(customer.id, function(error, accounts){
                if (error)  return res.json(400, error);
    
                accounts.forEach(function(account){
                    account.transactions = Transaction.findAllSync(account.id)
                });
    
                customer.accounts = accounts;
            });
        })
        return res.json(customers)
    });
})

module.exports = router;