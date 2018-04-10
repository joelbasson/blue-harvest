# Blue Harvest simple banking service

This is a lightweight Node.JS app for similuating a simplae banking service

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
There is a basic user interface at http://localhost:8080/

### Make Requests

You can do HTTP REST requests as follows

##### Customer
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

##### Account
```
http POST http://localhost:8080/accounts
Content-Type: application/json
{
	"customerId" : 1,
	"accountName" : "Savings Account",
	"initialCredit" : 1000
}
```
