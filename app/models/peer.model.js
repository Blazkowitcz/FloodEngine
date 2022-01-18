const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Peer = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    port: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

Peer.statics.getBestPeers = async function () {
    let best_peers = await this.aggregate([{
        "$group": {
            "_id": { "$toLower": "$hash" },
            "count": { "$sum": 1 }
        }
    },
    {
        "$group": {
            "_id": null,
            "counts": {
                "$push": { "k": "$_id", "v": "$count" }
            },
        }
    },
    { $sort: { v: 1 } },
    {
        "$replaceRoot": {
            "newRoot": { "$arrayToObject": "$counts" }
        }
    },
    ]);
    return best_peers;
}

Peer.plugin(autoIncrement, { id: 'peer', inc_field: 'id' });
module.exports = mongoose.model('peer', Peer);