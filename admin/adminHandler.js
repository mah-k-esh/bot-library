var express = require("express");
var expressRouter = express.Router();

class AdminHandler{

    constructor(database){
        this.database = database;
        this.router = expressRouter;
        
        this.config = {
            "nlp": "luis",
            "personality": "men",
            "weatherEnabled": false,
            "googleEnabled": false
        };

        this.initialize();
    }


    updateConfig(configUpdated){
        this.config = configUpdated;
    }

    initialize(){


        var _database = this.database;

        var _config = this.config;

        var _this = this;

        /**UPDATE the config */
        this.router.post('/config',function(req,res){

            var body = req.body;
        
            _this.updateConfig(body);
        
            res.json({"success":"success"});
        
        });


        /**GET the configurations */
        this.router.get("/config",function(req,res){

            res.json(_this.config);
        });

        /* GET all API integrations */
        this.router.get("/api", function(req, res) {
        

            //get the type
            var type = req.query.type;
            var query = {
                "api-type": (type==null||type==undefined)?"":type
            }


            //get all document from DB
            _database.getDocuments("api",query).then(
                
                function(resp){
                    
                    //filter out the response
                    var item={};

                    var response = [];

                    for(item in resp.record){


                        //console.log(JSON.stringify(item));

                        var filteredItem = {};
                        filteredItem['name'] = resp.record[item]['api-id'];
                        filteredItem['selected'] = resp.record[item]['selected'];



                        response.push(filteredItem);

                    }

                    res.json(response)
                    //return the response                
                }

            );
        });

        /*GET specific api details */
        this.router.get("/api/:api_id", function(req, res) {

    
            //get the type
            var type = req.params.api_id;

            var query = {
                "api-id": (type==null||type==undefined)?"":type
            }


            //get all document from DB
            _database.getDocuments("api",query).then(
                
                function(resp){
                    
                    //console.log(resp);

                    //filter out the response
                    var response = {};
                    if(resp.record.length > 0){
                        response = resp.record[0];
                    }

                    res.json(response)
                    //return the response                
                }

            );

        });


        /**UPDATE the api */
        this.router.post("/api/:api_id",function(req,res){
            
            //get the type
            var type = req.params.api_id;

            var query = {
                "api-id": (type==null||type==undefined)?"":type
            }


            //get all document from DB
            _database.updateDocument("api",query,req.body.data).then(
                
                function(resp){

                    res.json(resp);
                    //return the response                
                }

            );            
            //update a specific document 

        });
    }

    updateFieldValue(table,query,data,hasSpecial) {
        return new Promise((resolve,reject) => {
            updateDocument(table,query,data,hasSpecial).then((response) => {
                resolve(response);
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    getFieldValue(table,field) {
        return new Promise((resolve,reject) => {
            getData(table,field).then((response) => {
                resolve(response);
            }).catch((err)=>{
                reject(err);
            });
        });
    }

}

module.exports = AdminHandler;