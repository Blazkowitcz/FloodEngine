const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Torrent = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mediainfo: {
        type: String,
    },
    hash: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    seeders: {
        type: Number,
        default: 0
    },
    completed: {
        type: Number,
        default: 0
    },
    leechers: {
        type: Number,
        default: 0
    },
    validated: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        required: true
    }
});

Torrent.plugin(autoIncrement, {id: 'torrent', inc_field: 'id'});
module.exports = mongoose.model('torrent', Torrent);