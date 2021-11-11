const Model = require('../modules/model.module');

class User extends Model {
    constructor(data) {
        super();
        for (let key in data) {
            this[key] = data[key];
        }
    }

    /**
     * Return user id 
     * @param {String} passkey 
     * @returns 
     */
    static async getUserByPasskey(passkey) {
        let user = await this.__proto__.findOne({ passkey: passkey }, { table: this.name });
        return new Promise(function (resolve, reject) {
            if (user) {
                resolve(user);
            } else {
                reject(null);
            }
        });
    }
}

module.exports = User;