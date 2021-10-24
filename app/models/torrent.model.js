const Model = require('../modules/model.module');

class Torrent extends Model {

    constructor(data) {
        super();
        for (let key in data) {
            this[key] = data[key];
        }
    }

    /**
     * Check if a hash exist in torrent database
     * @param {String} hash 
     * @returns {Bool}
     */
    static async checkIfTorrentExist(hash) {
        let torrent = await this.__proto__.findOne({ hash: hash }, this.name);
        return new Promise(function (resolve, reject) {
            resolve(torrent !== null);
        });
    }
}

module.exports = Torrent;