'use strict';

var app = angular.module("blue-harvest.controllers",[]) 

app.controller('MainController', ['$scope', 'BlueHarvestService', function ($scope, BlueHarvestService){
    $scope.customers = [];

    $scope.addCustomer = function(){
        if (!$scope.newFirstName || !$scope.newLastName)
            return;

        BlueHarvestService.createCustomer({firstName : $scope.newFirstName, lastName : $scope.newLastName}).success(function(result){
            getCustomers();
            $scope.newFirstName = "";
            $scope.newLastName = "";
        })
    }

    $scope.addAccount = function(customer){

        BlueHarvestService.createAccount({customerId : customer.id, initialCredit : customer.newInitalCredit}).success(function(result){
            getCustomers();
            customer.newInitalCredit = "";
        })
    }

    getCustomers();
    

    function getCustomers(){
        BlueHarvestService.getCustomers().success(function(result){
            $scope.customers = result;
        })
    }
}]);