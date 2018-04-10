# Blue Harvest simple banking service

This is a lightweight Node.JS app for similuating a simple banking service.

## Setup

Clone this repository and then you can install dependencies with npm

### git

```shell
git clone https://github.com/joelbasson/blue-harvest
```

### npm

```shell
npm install
```

## Run

You can run with the following command

```shell
node index.js
```

## User Interface
There is a very basic (AngularJS) user interface at http://localhost:8080/

## Make Requests

You can do HTTP REST requests as follows

#### Customer
```
http POST http://localhost:8080/customers
Content-Type: application/json
{
	"firstName" : "Joel",
	"lastName" : "Basson"
}
```

```
http GET http://localhost:8080/customers
```

```
http GET http://localhost:8080/customers/1
```

#### Account
```
http POST http://localhost:8080/accounts
Content-Type: application/json
{
	"customerId" : 1,
	"accountName" : "Savings Account",
	"initialCredit" : 1000
}
```


## Tests

You can run the tests with the following command

```shell
npm test
```