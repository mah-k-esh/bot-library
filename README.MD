**Heal the world**

Aim of this project is to create a configurable bot helper libray which can be plug and played with any bot.

Database.js

    pass the configuration as following

    var config = {
        "DB_URL":"mongodb://make1:make123@ds133642.mlab.com:33642/bot-library",
        "dbName": "bot-library"
    };

    database = new Database(config);

    database.getDocuments(tableName,query)

    database.insertDocument(tableName,record)

    database.updateDocument(tableName,query,data)

    database.deleteDocument(tableName,query)

QnA Integration:

Put the Configuration to DB like following

refer the request-response for options

{
    "_id": {
        "$oid": "5b83e5adfb6fc0183b41bd49"
    },
    "api-id": "QNA_MAKER_PRODUCT_OWNERS",
    "api-value": {
        "options": {
            "uri": "https://wmtadeqna001.azurewebsites.net/qnamaker/knowledgebases/f81ac51f-0166-4b60-911a-4724d474429b/generateAnswer",
            "headers": {
                "Content-Type": "application/json",
                "authorization": "EndpointKey df312990-f323-4838-bd56-c2036ebf3fab"
            },
            "method": "POST",
            "body": {
                "question": "hi"
            },
            "json": true
        },
        "response": {},
        "failure": {}
    }
}

    database = new Database(config);
    network = new Network(database);
    network.getResponse("QNA_MAKER_SMALL_TALK",{"question":"hi"}).then(resp=>console.log(resp));