const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const User = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        select: false
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    passkey: {
        type: String,
        required: true,
        select: false
    }
});

User.plugin(autoIncrement, {id: 'user', inc_field: 'id'});
module.exports = mongoose.model('user', User);