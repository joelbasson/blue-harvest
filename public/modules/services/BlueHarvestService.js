'use strict';

var app = angular.module("blue-harvest.services",[]) 

app.factory('BlueHarvestService', ['$http', function ($http) {
    var baseUrl = 'http://localhost:8080/';
    
	return {
		createCustomer: function (data) {
			return $http.post(baseUrl + 'customers', data)
		},
        getCustomer: function (id) {
			return $http.get(baseUrl + 'customers/' + id)
        },
        getCustomers: function () {
			return $http.get(baseUrl + 'customers/')
        },
        createAccount: function (data) {
			return $http.post(baseUrl + 'accounts', data)
		},
    }
}]);