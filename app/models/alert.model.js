const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Alert = mongoose.Schema({
    user_id: {
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
    },
    read: {
        type: Boolean,
        required: true
    }
});

Alert.plugin(autoIncrement, {id: 'alert', inc_field: 'id'});
module.exports = mongoose.model('alert', Alert);