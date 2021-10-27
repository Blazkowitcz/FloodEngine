const pluralize = require('../utils/pluralize.util');
const db = require('./database.module');

class Model{
    constructor(){
    }

    save(){
        let table_name = pluralize.pluralize(this.constructor.name.toLowerCase());
        let data = this;
        return new Promise(function(resolve, reject){
            db.create(table_name, data, (err, res) => {
                if(err){
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
}

Model.findOne = function(data, table){
    let table_name = table !== undefined ? pluralize.pluralize(table.toLowerCase()) : pluralize.pluralize(this.name.toLowerCase());
    return new Promise(function(resolve, reject){
        db.find(table_name, data, (err, res) => {
            if(err){
                reject(err);
            } else {
                let val = res.length > 0 ? res[0]: null;
                resolve(val);
            }
        });
    });
};

module.exports = Model;