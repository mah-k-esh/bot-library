/**
 * generic network calls will be performed here
 */

/**
 * https://www.npmjs.com/package/request-promise
 */

requestPromise = require("request-promise");
request = require("request");
q = require("q");

class NetworkCalls{

    //extend the basic database configurations and pass it to here
    constructor(database){

        this.database = database;

    }

    debug(){
        console.log(this.database.help());
    }

    getResponsePlain(options){

        var deferred = q.defer();
        
        request(options, function(error,response,body){

            if(error){
                // console.log("getResponsePlain: error occured");
                deferred.reject({"error":error});
            }else{
                deferred.resolve(JSON.parse(body));
                // console.log("getResponsePlain: success");
                // console.log(JSON.parse(body))
            }
        });

        return deferred.promise;
    }


    getResponse(callConfig,...otherConfig){

        //console.log("start: getResponse");
        //fetch the config from the DB using callConfig(get-wheather)
        var configPromise = this.database.getNetworkConfig(callConfig);

        //other configurations to options//
        
        //other configurations to options//

        var promise;
        var deferred = q.defer();
        var config = {};


        configPromise.then(
            (resp)=>{

                // console.log("inside config Promise then",resp.record);


                if(resp.record.length > 0){

                    // console.log("inside resp>0 ");

                    config = resp.record[0]["api-value"];


                    if(otherConfig.length > 0){

                        // console.log("WTF",otherConfig.length);

                        //traverse through the parameters and update it in the config
                        var i=0,item="",t_item="";
                        try{

                            for(i =0;i<otherConfig.length;i++){
                                // console.log(i);
                                for(item in otherConfig[i]){
                                    
                                    // console.log(otherConfig[i][item]);
                                    var t = config["options"][item];
                                    config["options"][item] = otherConfig[i][item];

                                    //update the already existing params from db
                                    for(t_item in t){
                                        if(config["options"][item][t_item] == undefined){
                                            config["options"][item][t_item] = t[t_item];
                                        }
                                    }
                                }
                            }

                        }catch(err){
                            console.log(err);
                        }
                        
                    }

                    //  console.log("config response is :",config["options"]);

                    promise = requestPromise(config["options"]);

                    promise.then(function(response){

                        // console.log(":TtTtT::::responseConfig:");
                        // console.log(response);
                        // console.log(":TtTtT::::responseConfig:");

                        if(response.error != undefined){
            
                            
                            // console.log("error block");
                            deferred.reject(response);

                        }else{
            
                            //send only the required response//
                            var responseConfig = config["response"];
            
                            // console.log(":responseConfig:");
                            // console.log(responseConfig);
                            // console.log(":responseConfig:");
            
                            var filteredResponse = response;
            
                            deferred.resolve(filteredResponse);
                            //send only the required response//
            
                        }
            
                    });

                }else{

                    // console.log("else block its shit ");

                    //write a fallback function 
                    deferred.reject({"break":"noDataFound"});
                }
            }
        );

        return deferred.promise;
    }

    //describe what this class does here
    help(){
        return "i handle network calls";
    }
}

module.exports = NetworkCalls;