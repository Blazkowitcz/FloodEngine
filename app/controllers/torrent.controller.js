const crypto = require("crypto");
const parse_torrent = require('parse-torrent');
const Torrent = require('../models/torrent.model');

/**
 * Upload a torrent
 * @param {Request} req 
 * @param {Result} res 
 */
exports.upload = async (req, res) => {
    let data = parse_torrent(req.files.torrent.data);
    let exist = await Torrent.checkIfTorrentExist(data.infoHash);
    if(!exist){
        let file = req.files.torrent ;
        let filename = crypto.randomBytes(16).toString("hex") + '.torrent';
        let torrent = new Torrent({
            name: data.name, 
            filename: filename,
            hash: data.infoHash, 
            user_id: 697,
            size: data.length
        });
        await torrent.save();
        file.mv('./public/torrents/' + filename);
    }
    res.send(true);
}