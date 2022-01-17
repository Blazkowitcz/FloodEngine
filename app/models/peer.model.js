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

Peer.plugin(autoIncrement, {id: 'peer', inc_field: 'id'});
module.exports = mongoose.model('peer', Peer);