const crypto = require("crypto");
const parse_torrent = require('parse-torrent');
const Torrent = require('../models/torrent.model');
const fs = require('fs');
const torrent_utils = require('../utils/torrent.util');
const config = require('../../conf.json');

/**
 * Upload a torrent
 * @param {Request} req 
 * @param {Result} res 
 * @returns
 */
exports.upload = async (req, res) => {
    let data = parse_torrent(req.files.torrent.data);
    let exist = await Torrent.checkIfTorrentExist(data.infoHash);
    if (!exist) {
        let file = req.files.torrent;
        let filename = crypto.randomBytes(16).toString("hex") + '.torrent';
        let torrent = new Torrent({
            name: data.name,
            filename: filename,
            hash: data.infoHash,
            user_id: 697,
            size: data.length,
            created_at: new Date()
        });
        await torrent.save();
        file.mv('./public/torrents/' + filename);
    }
    res.send(true);
}

/**
 * Download a torrent
 * @param {Request} req 
 * @param {Result} res 
 * @returns 
 */
exports.download = async (req, res) => {
    let torrent = await Torrent.getTorrentById(req.params.id);
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
 * Return last torrents
 * @param {Request} req 
 * @param {Result} res 
 */
exports.getLastTorrents = async (req, res) => {
    let torrents = await Torrent.getLastTorrents();
    res.send(torrents);
}