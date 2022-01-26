const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const TorrentComment = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    torrent_id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

TorrentComment.plugin(autoIncrement, {id: 'torrent_comment', inc_field: 'id'});
module.exports = mongoose.model('torrent_comment', TorrentComment);