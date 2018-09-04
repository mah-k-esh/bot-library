

class AdminHandler{

    constructor(database){
        this.database = database;
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