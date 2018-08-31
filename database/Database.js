/**
 * Initialize the database from the configurations passed.
 */

var MongoClient = require('mongodb').MongoClient;
var q = require('q');


class Database{
 
    constructor(config){
        this.config = config;
        this.database = null;
        var _this = this;
        this.dbName = config.dbName;
        this.isUp = false;

        console.log("DB URL: "+config.DB_URL);

        MongoClient.connect(config.DB_URL, function(err, db) {
            if (err) {
                console.error('Unable to connect to the mongoDB server. Error:', err);
            } else {
                //HURRAY!! We are connected. :)
                console.log('Connection established to: ' + config.DB_URL);
                // making use of connection pool
                _this.database = db;
                _this.isUp = true;
            }
            });
    }


    /** assumption: The network configurates are stored under api table */
    getNetworkConfig(name){

        //query the configs from db and then send options

        var query = {
            "api-id": name
        };
        
        var deferred = q.defer();

        this.getDocuments("api",query).then(
            (resp)=>{

                //console.log("getNeworkConfig: ",resp);

                deferred.resolve(resp);
            }
        );

        return deferred.promise;
    }

    getDocuments(table,query){

         console.log('Requested to get ' + table);
        // Get the documents collection
        var collection = this.database.db(this.dbName).collection(table);
        console.log(query);
  
        var deferred = q.defer();
        collection.find(query).toArray(function(err, result) {
            var response = {};
            if (err) {
                console.log(err);
                response.error = true;
                response.errorObject = err;
                deferred.reject(response);
            } else if (result.length) {
                // console.log('Found:', result);
                response.error = false;
                response.record = result;
                deferred.resolve(response);
            } else {
                response.error = false;
                response.record = [];
                console.log('No document(s) found with defined "find" criteria!'+query);
                deferred.resolve(response);
            }
        });

        return deferred.promise;
    }

    insertDocument(table,record){

        console.log('Requested to insert: ' + JSON.stringify(record) + " in collection - " + table);
        // Get the documents collection
        var collection = this.database.db(this.dbName).collection(table);
        var insertResult = {
            error: false
        }
        var deferred = q.defer();
        // Insert user record into the collection as new document
        collection.insert(record).then(result => {
                console.log('Inserted document into the "'+ table +'" collection. The documents inserted with "_id" are:', JSON.stringify(result));
                insertResult.error = false;
                insertResult.message = result;
                deferred.resolve(insertResult);
        }).catch(err=>{
                console.error(err);
                insertResult.error = true;
                deferred.reject(insertResult);
        });
        console.log('Exiting insertRecord method');
        return deferred.promise;
    }

    updateDocument(table,query,data,hasSpecial){

        console.log('Entering updateRecords');

        var collection = this.database.db(this.dbName).collection(table);

        if(hasSpecial){
            record = data;
        }else{
            var record = {
                $set: data
            }
        }
        var deferred = q.defer();

        collection.update(query, record, {
            multi: true
        }).then(function(response) {
            //console.log(response);
            var result = {
                'error': false,
                'recordsModified': response.nModified
            }
            deferred.resolve(result);
        }, function(error) {
            console.log(error);
            var result = {
                'error': true,
                'message': 'Data insert failed in DB'
            }
            deferred.reject(result);
        });
        return deferred.promise;
    }

    deleteDocument(table,query){
        console.log('Requested for collection: ' + table);

        var deferred = q.defer();
        var finalResult;

        // Delete the documents collection
        var collection = this.database.db(this.dbName).collection(table);
        collection.deleteMany(query, function(err, result) {
            console.log("delete: " + JSON.stringify(result));
            console.log(JSON.stringify(err));
            if(err != null){
               finalResult = {
                    "error":true
               }
            }else{
                finalResult  ={
                    "error":false
                }
            }
            deferred.resolve(finalResult);
        });

        return deferred.promise;
    }

    help(){

        //send other details like what value it holds

        return "i handle all the DB operations";
    }
}

module.exports = Database;