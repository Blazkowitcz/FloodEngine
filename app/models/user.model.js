const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const User = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    passkey: {
        type: String,
        required: true
    }
});

User.plugin(autoIncrement, {id: 'user', inc_field: 'id'});
module.exports = mongoose.model('user', User);