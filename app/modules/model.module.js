const pluralize = require('../utils/pluralize.util');
const db = require('./database.module');
const string_utils = require('../utils/string.util');

class Model{
    constructor(){
    }

    /**
     * Insert or update new element in database
     * @returns 
     */
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

/**
 * Find element in database related to data and option
 * @param {JSON} data 
 * @param {JSON} options 
 * @returns 
 */
Model.findOne = function(data, options){
    let table = options !== undefined ? string_utils.getOptionValue(options, 'table'): undefined;
    let table_name = table !== undefined ? pluralize.pluralize(table.toLowerCase()) : pluralize.pluralize(this.name.toLowerCase());
    return new Promise(function(resolve, reject){
        db.find(table_name, data, options, (err, res) => {
            if(err){
                reject(err);
            } else {
                let val = res.length > 0 ? res[0]: null;
                resolve(val);
            }
        });
    });
};

/**
 * Find elements in database related to data and option
 * @param {JSON} data 
 * @param {JSON} options 
 * @returns 
 */
Model.find = function(data, options){
    let table = string_utils.getOptionValue(options, 'table');
    let table_name = table !== undefined ? pluralize.pluralize(table.toLowerCase()) : pluralize.pluralize(this.name.toLowerCase());
    return new Promise(function(resolve, reject){
        db.find(table_name, data, options, (err, res) => {
            if(err){
                reject(err);
            } else {
                let val = res.length > 0 ? res: null;
                resolve(val);
            }
        });
    });
};

module.exports = Model;