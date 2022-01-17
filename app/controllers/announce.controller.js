
const bencode = require('bencode');
const User = require('../models/user.model');
const Peer = require('../models/peer.model');

/**
 * Announcer
 * @param {Request} req 
 * @param {Result} res 
 */
exports.announce = async (req, res) => {
    let user = await User.findOne({passkey: req.params.passkey});
    let peers = [];
    if(user !== null){
        let peer = await Peer.findOne({hash: req.query.info_hash, user_id : user._id, ip: req.headers.host.substring(0, req.headers.host.indexOf(':')), port: req.query.port});
        if(peer === null){
            peer = await new Peer({hash: req.query.info_hash, user_id: user._id});
        }
        peer.date = new Date();
        peer.port = req.query.port;
        peer.ip = req.headers.host.substring(0, req.headers.host.indexOf(':'));
        peer.save();
        peers = await Peer.find({hash: req.query.info_hash}).select('ip port -_id');
    }
    let data = {
        'interval' : 2700,
        'min_interval' : 1800,
        'tracker_id' : 'http://127.0.0.1:3000',
        'complete' : 0,
        'incomplete' : 0,
        'peers' : reformatPeers(peers),
    };
    res.setHeader('Content-Type', 'text/plain');
    res.end(bencode.encode(data));
}

function reformatPeers(peers){
    let result = [];
    peers.forEach(peer => {
        result.push({port: peer.port, ip: peer.ip});
    })
    return result;
}
