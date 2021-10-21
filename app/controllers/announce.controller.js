const bencode = require('bencode');

exports.announce = (req, res) => {
    //let hash = Buffer.from(req.query.info_hash, 'ascii').toString();
    let data = {
        'interval' : 2700,
        'min_interval' : 1800,
        'tracker_id' : '127.0.0.1:3000',
        'complete': 0,
        'incomplete': 0,
        'peers': [{ip: "192.168.1.86", port: 7894}],
        'message': req.query.info_hash,
    };
    res.setHeader('Content-Type', 'text/plain');
    res.end(bencode.encode(data));
};