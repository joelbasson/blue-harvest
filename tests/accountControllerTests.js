'use strict';
var http_mocks = require('node-mocks-http')
var should = require('should');
var assert = require('assert');
var loki = require('lokijs');
var db = require('../helpers/db').db('test-data.json');
var controller = require('../controllers/accounts');

//NOTE : Normally proxyquire would be required here, but LokiJS makes the testing easier

function buildResponse() {
  return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
}

beforeEach(function() {
    cleanupCollections();
});

describe('Account Controller Tests', function () {
    it('Should be able to add a primary account', function (done) {
        
        var response = buildResponse()
        createCustomer(function(error, customer){
            //console.log(customer)
            var request  = http_mocks.createRequest({
                method: 'POST',
                url: '/',
                body : {
                    customerId : customer.id,
                    initialCredit : 10000
                }
            })
    
            response.on('end', function() {
                var account =  JSON.parse(response._getData());
                //console.log(account)
                assert.equal(account.id, 1);
                assert.equal(account.customerId, 1);
                assert.equal(account.isPrimary, true);
                assert.equal(account.accountName, 'Default');
                assert.equal(account.balance, 10000);
                done();
            })
    
            controller.handle(request, response);
        });
        
    });

    it('Should not be able to add another primary account', function (done) {
        var response = buildResponse()
        createCustomer(function(error, customer){
            
            createAccount(customer.id, function(error, primaryAccount){
                var request  = http_mocks.createRequest({
                    method: 'POST',
                    url: '/',
                    body : {
                        customerId : customer.id,
                        initialCredit : 10000
                    }
                })
        
                response.on('end', function() {
                    var account =  JSON.parse(response._getData());
                    //console.log(account)
                    assert.equal(account.id, 2);
                    assert.equal(account.customerId, 1);
                    assert.equal(account.isPrimary, false);
                    assert.equal(account.accountName, 'Default');
                    assert.equal(account.balance, 10000);
                    done();
                })
        
                controller.handle(request, response);
            });
        });
        
    });

    it('Should be able to add a secondry account', function (done) {
        var response = buildResponse()
        createCustomer(function(error, customer){
            
            createAccount(customer.id, function(error, primaryAccount){
                var request  = http_mocks.createRequest({
                    method: 'POST',
                    url: '/',
                    body : {
                        customerId : customer.id,
                        initialCredit : 10000
                    }
                })
        
                response.on('end', function() {
                    var account =  JSON.parse(response._getData());
                    //console.log(account)
                    assert.equal(account.id, 2);
                    assert.equal(account.customerId, 1);
                    assert.equal(account.isPrimary, false);
                    assert.equal(account.accountName, 'Default');
                    assert.equal(account.balance, 10000);
                    done();
                })
        
                controller.handle(request, response);
            });
        });
        
    });

    it('Should not be able to have a non integer as initialCredit', function (done) {
        
        var response = buildResponse()
        createCustomer(function(error, customer){
            //console.log(customer)
            var request  = http_mocks.createRequest({
                method: 'POST',
                url: '/',
                body : {
                    customerId : customer.id,
                    initialCredit : 10.5
                }
            })
    
            response.on('end', function() {
                var errorMessage =  JSON.parse(response._getData());
                //console.log(errorMessage)
                assert.equal(errorMessage.message, 'initialCredit should be an integer of 0 or higher');
                done();
            })
    
            controller.handle(request, response);
        });
        
    });

    it('Should not be able to have a negative number as initialCredit', function (done) {
        
        var response = buildResponse()
        createCustomer(function(error, customer){
            //console.log(customer)
            var request  = http_mocks.createRequest({
                method: 'POST',
                url: '/',
                body : {
                    customerId : customer.id,
                    initialCredit : -5
                }
            })
    
            response.on('end', function() {
                var errorMessage =  JSON.parse(response._getData());
                //console.log(errorMessage)
                assert.equal(errorMessage.message, 'initialCredit should be an integer of 0 or higher');
                done();
            })
    
            controller.handle(request, response);
        });
        
    });

})

function createCustomer(callback){
    let customer = require('../models/customer');
    customer.create("Bob", "Sample", callback);
}

function createAccount(customerId, callback){
    let account = require('../models/account');
    account.create(customerId, "Test Account", callback);
}

function cleanupCollections(){
    let account = db.addCollection('Account');
    let customer = db.addCollection('Customer');
    let transaction = db.addCollection('Transaction');
    account.clear();
    customer.clear();
    transaction.clear();
}