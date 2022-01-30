const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Message = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    topic_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

Message.plugin(autoIncrement, {id: 'message', inc_field: 'id'});
module.exports = mongoose.model('message', Message);