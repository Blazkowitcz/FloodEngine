const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Like = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    message_id: {
        type: String,
        required: true
    },
});

Like.plugin(autoIncrement, {id: 'like', inc_field: 'id'});
module.exports = mongoose.model('like', Like);