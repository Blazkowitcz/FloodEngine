const Model = require('../modules/model.module');

class User extends Model{
    constructor(data){
        super();
        for(let key in data){
            this[key] = data[key];
        }
    }
}

module.exports = User;