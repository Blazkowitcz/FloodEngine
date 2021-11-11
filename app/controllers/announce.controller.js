const bencode = require('bencode');
const Peer = require('../models/peer.model');
const User = require('../models/user.model');

/**
 * Announcer
 * @param {Request} req 
 * @param {Result} res 
 */
exports.announce = async (req, res) => {
    let user = await User.getUserByPasskey(req.params.passkey);
    let peer = await Peer.findOne({hash: req.query.info_hash, user_id: user.id, ip: req.headers.host.substring(0, req.headers.host.indexOf(':')), port: req.query.port});
    peer = peer !== null ? new Peer(peer) : new Peer({hash: req.query.info_hash, user_id: user.id});
    peer.date = new Date();
    peer.port = req.query.port;
    peer.ip = req.headers.host.substring(0, req.headers.host.indexOf(':'));
    peer.save();
    let peers = await Peer.getPeersFromHash(req.query.info_hash);
    let data = {
        'interval' : 2700,
        'min_interval' : 1800,
        'tracker_id' : 'http://127.0.0.1:3000',
        'complete': 0,
        'incomplete': 0,
        'peers': peers,
        'message': req.query.info_hash,
    };
    res.setHeader('Content-Type', 'text/plain');
    res.end(bencode.encode(data));
};