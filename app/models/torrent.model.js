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
    hash: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
});

Torrent.plugin(autoIncrement, {id: 'torrent', inc_field: 'id'});
module.exports = mongoose.model('torrent', Torrent);