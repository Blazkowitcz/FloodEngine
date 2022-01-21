
const bencode = require('bencode');
const User = require('../models/user.model');
const Peer = require('../models/peer.model');
const History = require('../models/history.model');

/**
 * Announcer
 * @param {Request} req 
 * @param {Result} res 
 * @return {Buffer}
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
        if(req.query.left == 0){
            setHistory(req.query.info_hash, user);
        }
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

/**
 * Reformat peers to be understood by torrent client
 * @param {Array} peers 
 * @returns {Array}
 */
function reformatPeers(peers){
    let result = [];
    peers.forEach(peer => {
        result.push({port: peer.port, ip: peer.ip});
    })
    return result;
}

/**
 * Create History if not exist
 * @param {String} hash 
 * @param {User} user 
 */
async function setHistory(hash, user){
    let history = await History.findOne({user_id: user.id, hash: hash});
    if(history === null){
        history = new History({user_id: user._id, hash: hash, date: new Date()});
        history.save();
    }
    return;
}
