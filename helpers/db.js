var loki = require('lokijs');

var database;

module.exports = {
    db : function(dbName){
        if (database != undefined)
            return database;

        if (dbName == undefined)
            dbName = 'blue-harvest-db.json';
        database = new loki(dbName, { autoupdate: true });
        return database;
    }
}