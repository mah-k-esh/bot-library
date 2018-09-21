**Heal the world make it better place**

Aim of this project is to create a configurable bot helper libray which can be plug and played with any bot.

var botLibrary = require('bot-library');
var dbConfig = {
    "DB_URL":"mongodb://<username>:<password><mongo_db_url>",
    "dbName": "bot-library"
}

var database = new botLibrary.Database(dbConfig);

    database.getDocuments(table_name,query);
    database.updateDocument(table_name,query,data_to_update)
    deleteDocument(table_name,query)

var admin = new botLibrary.Admin(database);

     //just wire the router to express app and get the services up and running
     app.use('<endpoint>',admin.router);

var networkCalls = new botLibrary.NetworkCalls(database);

    //make REST calls using this
    var options = {
            "uri": "https://samples.openweathermap.org/data/2.5/weather",
            "headers": {
                "Content-Type": "application/json"
            },
            "method": "GET",
            "qs": {
                "lat": "35",
                "lon": "139",
                "appid": "b6907d289e10d714a6e88b30761fae22"
            },
            "json": true
        };
    networkCalls.getResponsePlain(options).then(resp=>{
        //do whatever you want to do with the response
    });
    //this will return the response

    //you can use the following method if you already configured the options in the DB
    networkCalls.getResponse(callConfig,...otherConfig)

var nlp = new botLibrary.NLP(database);

    //consume the configured NLP servies using following snippet
    nlp.getResponse('luis','hi').then(response=>console.log(response));
    nlp.getResponse('dialogFlow','what is weather?').then(response=>console.log(response));

