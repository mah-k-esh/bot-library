var botLib = require('../index');
var express = require('express');

var app = express();

app.use(express.json());

var dbConfig = {
    "DB_URL":"mongodb://make1:make123@ds133642.mlab.com:33642/bot-library",
    "dbName": "bot-library"
}
var database = new botLib.Database(dbConfig);

var admin = new botLib.Admin(database);

var apiTest = admin.router;

app.use('/api', apiTest);


app.listen(process.env.port || process.env.PORT || 5000, function () {
    console.log('process started'); 
});