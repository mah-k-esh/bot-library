var express = require("express");
var expressRouter = express.Router();

class AdminHandler{

    constructor(database){
        this.database = database;
        this.router = expressRouter;

        this.initialize();
    }


    initialize(){

        /* GET all API integrations */
        router.get("/api", function(req, res) {
        
            //get all document from DB

            //filer out the response

            //return the response

        });

        /*GET specific api details */
        router.get("/api/{api-id}", function(req, res) {

            //get the specific document form DB

            //filter out the response

            //return the response

        });


        /**UPDATE the api */
        router.post("/api/{api-id}",function(req,res){
            
            //update a specific document 

            //return the status
            
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