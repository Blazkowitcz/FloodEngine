const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Comment = mongoose.Schema({
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

Comment.plugin(autoIncrement, {id: 'comment', inc_field: 'id'});
module.exports = mongoose.model('comment', Comment);