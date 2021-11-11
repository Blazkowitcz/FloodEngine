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
        let torrent = await this.__proto__.findOne({ hash: hash }, {table: this.name});
        return new Promise(function (resolve, reject) {
            resolve(torrent !== null);
        });
    }

    /**
     * Return torrent related to id
     * @param {Integer} id 
     * @returns 
     */
    static async getTorrentById(id) {
        let torrent = await this.__proto__.findOne({ id: id }, {table: this.name, limit: 1, order: {column: 'created_at', direction: 'ASC'}});
        return new Promise(function (resolve, reject) {
            resolve(torrent);
        });
    }

    /**
     * Return 25 last torrents
     * @returns 
     */
    static async getLastTorrents() {
        let torrents = await this.__proto__.find(null, {table: this.name, limit: 25, order: {column: 'id', direction: 'DESC'}});
        return new Promise(function (resolve, reject) {
            resolve(torrents);
        });
    }
}

module.exports = Torrent;