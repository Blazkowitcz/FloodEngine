const crypto = require("crypto");
const parse_torrent = require('parse-torrent');
const Torrent = require('../models/torrent.model');

/**
 * Upload a torrent
 * @param {Request} req 
 * @param {Result} res 
 */
exports.upload = async (req, res) => {
    let file = parse_torrent(req.files.torrent.data);
    let torrent = new Torrent({name: file.name, hash: file.infoHash, user_id: 697});
    let exist = await Torrent.checkIfTorrentExist(file.infoHash);
    if(!exist){
        await torrent.save();
    }
    res.send(true);
}