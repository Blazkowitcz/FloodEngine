const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const History = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

History.plugin(autoIncrement, {id: 'history', inc_field: 'id'});
module.exports = mongoose.model('history', History);