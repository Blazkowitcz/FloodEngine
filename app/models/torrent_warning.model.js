const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const TorrentWarning = mongoose.Schema({
    torrent_id: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

TorrentWarning.plugin(autoIncrement, {id: 'torrent_warning', inc_field: 'id'});
module.exports = mongoose.model('torrent_warning', TorrentWarning);