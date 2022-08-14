const crypto = require("crypto");
const parse_torrent = require('parse-torrent');
const fs = require('fs');
const config = require('../../config.json');
const torrent_utils = require('../utils/torrent.util');
const Torrent = require('../models/torrent.model');
const TorrentWarning = require('../models/torrent_warning.model');
const Peer = require('../models/peer.model');

/**
 * Upload a Torrent
 * @param {Request} req 
 * @param {Result} res 
 */
exports.upload = async (req, res) => {
    let data = parse_torrent(req.files.torrent.data);
    let torrent = await Torrent.findOne({ hash: data.infoHash }).lean();
    console.log(torrent);
    if (torrent === null) {
        let file = req.files.torrent;
        let filename = crypto.randomBytes(16).toString("hex") + '.torrent';
        torrent = new Torrent({
            name: data.name,
            description: req.body.description,
            filename: filename,
            hash: data.infoHash,
            subcategory: {_id: req.body.subcategory},
            user: {_id: req.user.id},
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
    let torrent = await Torrent.findOne({ _id: {$eq: req.params.id}});
    if(torrent === null){
        res.send(false);
    }
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
 * Get Torrent detail
 * @param {Request} req 
 * @param {Result} res 
 */
exports.detail = async (req, res) => {
    let torrent = await Torrent.findOne({_id: {$eq: req.params.id}});
    res.send(torrent);
}

/**
 * Update a Torrent
 * @param {Request} req 
 * @param {Result} res 
 */
exports.update = async (req, res) => {
    let torrent = await Torrent.findOne({ _id: {$eq: req.params.id} }).lean();
    if(torrent !== null && torrent.user_id === req.user.id){
        torrent.name = req.body.name
        torrent.description = req.body.description;
        torrent.updated_at = new Date();
        torrent.save();
    }
    res.send(true);
}

/**
 * Delete a Torrent
 * @param {Request} req 
 * @param {Result} res 
 * @returns 
 */
exports.delete = async (req, res) => {
    let torrent = await Torrent.findOne({_id: {$eq: req.params.id}}).lean();
    if(torrent !== null && torrent.user_id === req.user.id){
        let diff = Math.ceil(Math.abs(new Date() - new Date(torrent.created_at)) / 36e5);
        if(diff < 1){
            Torrent.deleteOne({_id: {$eq: torrent._id}});
        }else {
            res.send('You only have 1 hour after creation do delete the torrent');
            return;
        }
    }
    res.send(true);
}

/**
 * Get new Torrents
 * @param {Request} req 
 * @param {Result} res 
 */
exports.getNewTorrents = async (req, res) => {
    res.send(await Torrent.find().sort({ 'created_at': -1 }).select('-__v').limit(20));
}

/**
 * Get best Torrents
 * @param {Request} req 
 * @param {Result} res 
 */
exports.getBestTorrents = async (req, res) => {
    let best_peers = await Peer.getBestPeers();
    res.send(best_peers);
}

/**
 * Search torrent by name
 * @param {Request} req
 * @param {result} res
 * @returns {Array}
 */
exports.search = async (req, res) => {
    let search = new RegExp(req.query.search, 'i');
    let torrents = await Torrent.find({ $and: [{ $or: [{ name: search }] }] }).lean();
    res.send(torrents);
}

/**
 * Warn a Torrent
 * @param {Request} req 
 * @param {Result} res 
 * @returns 
 */
exports.warning = async (req, res) => {
    let warning = await TorrentWarning.findOne({torrent_id: {$eq: req.body.torrent_id}, user_id: req.user.id}).lean();
    if(!warning){
        warning = new TorrentWarning({torrent_id: {$eq: req.body.torrent_id}, content: {$eq: req.body.content}, user_id: req.user.id, date: new Date()});
        await warning.save();
        res.send(true);
        return;
    }
    res.send(false);
}