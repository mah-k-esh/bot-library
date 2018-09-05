NetworkUtils = require("./network/NetworkUtils");
GlobalSettings = require("./config/GlobalSettings");
GlobalConstants = require("./constants/GlobalConstants");
NetworkCalls = require("./network/NetworkCalls");
Database = require("./database/Database");
CommonUtils = require("./utils/CommonUtils");
NLP = require("./nlp/NLP");



function debugNetworkCallGetResponse(){
    var config = {
        "DB_URL":"mongodb://make1:make123@ds133642.mlab.com:33642/bot-library",
        "dbName": "bot-library"
    };

    var database = new Database(config);
    // var network = new NetworkCalls(database);
    // database.getDocuments("api",{}).then(resp=>console.log(resp));

    // database.insertDocument("api",{"api-id":"makesh"}).then(resp=>{console.log(resp)})

    // database.updateDocument("api",{"api-id":"makesh"},{"heal":"world"},false).then(resp=>console.log(resp))

    

    // console.log(resp);

    // var network = new NetworkCalls(database);
    
    
    // network.getResponse("get-wheather").then(response=>{
    //     console.log("/////////////////");
    //     console.log(response);
    //     console.log("/////////////////");
    // });

    
    var nlp = new NLP(database);

    nlp.changePersonality("men");

    setTimeout(function(){    
        nlp.getResponse('dialogFlow','start the payment process').then(resp=>console.log("pikachoo:"+JSON.stringify(resp)));
    },5000);

    
}

debugNetworkCallGetResponse();



