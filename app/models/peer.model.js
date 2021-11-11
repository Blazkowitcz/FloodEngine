const Model = require('../modules/model.module');

class Peer extends Model { 
    constructor(data) {
        super();
        for (let key in data) {
            this[key] = data[key];
        }
    }

    /**
     * Return peers related to hash
     * @param {String} hash 
     * @returns 
     */
    static async getPeersFromHash(hash){
        let peers = await this.__proto__.find({ hash: hash }, {table: this.name});
        return new Promise(function (resolve, reject) {
            let result = [];
            peers.forEach(peer => {
                result.push({ip: peer.ip, port: peer.port});
            });
            resolve(result);
        });
    }
}

module.exports = Peer;