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
        this.personality = "";
        this.sessionId =  Math.round(Math.random()*97676567549845769849);;

        this.defaultResponse = {
            "type": "default",
            "text": "i am invisible"
        };
    }

    changePersonality(personlaity){
        this.personality = personlaity;
    }

    fetchResponseFromIntent(intentName){
        
        var query = {
            "intentId": intentName,
            "personality": this.personality
        };

        if(this.personality == ""){
            delete query.personality;
        }

        var deferred = q.defer();

        var _response = this.defaultResponse;

        this.database.getDocuments('intent-response',query).then(function(resp){

            try{
                if(resp.record.length > 0){
                    
                    _response["type"] = intentName;
                    _response["text"] = resp.record[0].payload.botReply;

                    // console.log("Heal the world: "+JSON.stringify(_response));

                }



                deferred.resolve(_response);

            }
            catch(err){
                deferred.reject(_response);
            }

        }).catch(err=>{
            deferred.reject(_response);
        }

        );

        // console.log("check check when");

        return deferred.promise;
    }

    changeResponseStructure(nlpType,input){


        // console.log("its coming here "+ JSON.stringify(input));

        var result = input;

        var _response = this.defaultResponse;

        var deferred = q.defer();

        //get intent name
        var intentName = "";

        if(nlpType == "LUIS"){

            if(input != null && input.topScoringIntent != null && input.topScoringIntent.intent != null ){

                // console.log(JSON.stringify(input));

                intentName = input.topScoringIntent.intent;

                this.fetchResponseFromIntent(intentName).then(resp=>{_response=resp;
                    
                    deferred.resolve(_response);
                });
                
            }
    
        }else if(nlpType == "DIALOGFLOW"){

            try{

                if(input != null && input.result != null && input.result.metadata != null && input.result.metadata.intentName && input.result.metadata.intentName != "Default Fallback Intent"){
                    
                    intentName = input.result.metadata.intentName;
                    
                    this.fetchResponseFromIntent(intentName).then(resp=>{_response=resp;
                        
                        deferred.resolve(_response);

                    });

                }else{

                    if(intentName == ""){
                    
                        if(input != null && input.result != null && input.result.fulfillment != null && input.result.fulfillment.speech != null){
    
                            _response['type'] = "noIntent";
                            _response['text'] = input.result.fulfillment.speech;
    
                            intentName = "defult"
                        }
    
                    }else if(intentName == "Default Fallback Intent"){
    
                        if(input != null && input.result != null && input.result.fulfillment != null && input.result.fulfillment.speech != null){
    
                            _response['type'] = "fallback";
                            _response['text'] = input.result.fulfillment.speech;
    
                            intentName = "defult"
                        }
                    }

                    deferred.resolve(_response);
                }

                //console.log("its coming here");



            }catch(err){
                // console.log(err);
                deferred.reject(_response);
            }

        }

        console.log("Intent name: "+intentName);
        

        //modify the result to certain format//

        //modify the result to certain format//

        //return _response;
        return deferred.promise;
    }


    getLuisResponse(query){

        //TODO: when you get time put these string litrals to constants file
        var deferred = q.defer();

        this.network.getResponse("LUIS",{"qs":{"q":query}})
            .then(resp=>{
                // console.log(resp);
                this.changeResponseStructure("LUIS",resp).then(resp=>{
                    deferred.resolve(resp);
                });

            })
            .catch(err=>{deferred.reject(err)});

        return deferred.promise;
    }

    getDialogFlowResponse(query){

        //TODO: when you get time put these string litrals to constants file
        var deferred = q.defer();

        this.network.getResponse("DIALOGFLOW",{"qs":{"query":query,"sessionId":this.sessionId}})
            .then(resp=>{
                //console.log(resp);
                this.changeResponseStructure("DIALOGFLOW",resp).then(resp=>{
                    deferred.resolve(resp);
                });
                
            })
            .catch(err=>{deferred.reject(err)});

        return deferred.promise;

    }

    getWatsonResponse(query){

        //TODO: when you get time put these string litrals to constants file
        var deferred = q.defer();

        this.network.getResponse("DIALOGFLOW",{"qs":{"query":query,"sessionId":this.sessionId}})
            .then(resp=>{
                //console.log(resp);
                this.changeResponseStructure("DIALOGFLOW",resp).then(resp=>{
                    deferred.resolve(resp);
                });
                
            })
            .catch(err=>{deferred.reject(err)});

        return deferred.promise;


    }


    getResponse(nlpType,query){


        var promise = null;

        if(nlpType == "luis"){
            
            // console.log("inside luis");
            promise = this.getLuisResponse(query);

        }else if(nlpType == "dialogFlow"){
            
            // console.log("inside dialogflow");
            promise = this.getDialogFlowResponse(query);

        }else if(nlpType == "watson"){

            // console.log("inside watson");
            promise = this.getWatsonResponse(query);

        }else{
            //may be return invlid nlp option
        }

        return promise;

    }
 }

 module.exports = NLP;