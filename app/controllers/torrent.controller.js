const crypto = require("crypto");
const parse_torrent = require('parse-torrent');
const fs = require('fs');
const config = require('../../config.json');
const torrent_utils = require('../utils/torrent.util');
const Torrent = require('../models/torrent.model');

/**
 * Upload a Torrent
 * @param {Request} req 
 * @param {Result} res 
 */
exports.upload = async (req, res) => {
    let data = parse_torrent(req.files.torrent.data);
    let torrent = await Torrent.findOne({hahs: data.infoHash});
    if(torrent === null){
        let file = req.files.torrent;
        let filename = crypto.randomBytes(16).toString("hex") + '.torrent';
        torrent = new Torrent({
            name: data.name, 
            filename: filename,
            hash: data.infoHash,
            user_id: 1,
            size: data.length,
            created_at: new Date()
        });
        await torrent.save();
        file.mv('./public/torrents/' + filename);
    }
    res.send(true);
}

/**
 * Download a Torrent
 * @param {Request} req 
 * @param {Result} res 
 * @returns {Buffer}
 */
exports.download = async (req, res) => {
    let torrent = await Torrent.findOne({_id: req.params.id});
    let data = parse_torrent(fs.readFileSync('./public/torrents/' + torrent.filename));
    data.announce[0] = 'http://' + config.address + ':' + config.port + "/announce/" + req.user.passkey;
    let new_torrent = parse_torrent.toTorrentFile(data);
    let file = data.name + '.torrent';
    res.writeHead(200, {
        'Content-Disposition': `attachment; filename="${torrent_utils.formatName(file)}"`,
        'Content-Type': 'text/plain',
    });
    return res.end(new_torrent);
}

/**
 * Get new Torrents
 * @param {Request} req 
 * @param {Result} res 
 */
exports.getNewTorrents = async (req, res) => {
    res.send(await Torrent.find().sort({'created_at': -1}).select('-__v').limit(20));
}