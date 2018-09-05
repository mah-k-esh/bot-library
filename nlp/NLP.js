/**
 * This class is used for NLP configurations
 */
JM = require("json-mapper");
NetworkCalls = require("../network/NetworkCalls");
q = require("q");

class NLP{

    constructor(database){
        this.database = database;
        this.network = new NetworkCalls(this.database);
    }


    fetchResponseFromIntent(intentName){
        
        var response = {};

        return response;
    }

    changeResponseStructure(input){

        var result = input;


        //get intent name
        var intentName = "";

        var response = this.fetchResponseFromIntent(intentName);

        //modify the result to certain format//

        //modify the result to certain format//

        return result;
    }


    getLuisResponse(query){

        //TODO: when you get time put these string litrals to constants file
        var deferred = q.defer();

        this.network.getResponse("LUIS",{"qs":{"q":query}})
            .then(resp=>{
                //console.log(resp);
                var filteredResponse = this.changeResponseStructure(resp);

                deferred.resolve(filteredResponse);
            })
            .catch(err=>{deferred.reject(err)});

        return deferred.promise;
    }

    getDialogFlowResponse(query){

        //TODO: when you get time put these string litrals to constants file
        var deferred = q.defer();

        this.network.getResponse("DIALOGFLOW",{"qs":{"query":query}})
            .then(resp=>{
                //console.log(resp);
                var filteredResponse = this.changeResponseStructure(resp);

                deferred.resolve(filteredResponse);
            })
            .catch(err=>{deferred.reject(err)});

        return deferred.promise;

    }

    getWatsonResponse(query){

        var response = this.changeResponseStructure({});


    }


    getResponse(nlpType,query){


        var promise = null;

        if(nlpType == "luis"){
            
            promise = this.getLuisResponse(query);

        }else if(nlpType == "dialogFlow"){
            
            promise = this.getDialogFlowResponse(query);

        }else if(nlpType == "watson"){

            promise = this.getWatsonResponse(query);

        }else{
            //may be return invlid nlp option
        }

        return promise;

    }
 }

 module.exports = NLP;