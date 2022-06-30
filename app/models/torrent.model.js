const mongoose = require('mongoose');
const mongoose_autopopulate = require('mongoose-autopopulate');
const autoIncrement = require('mongoose-sequence')(mongoose);
const User = require('./user.model');
const Subcategory = require('./subcategory.model');

const Torrent = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        autopopulate: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mediainfo: {
        type: String,
    },
    hash: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Subcategory,
        autopopulate: true,
        required: true
    },
    seeders: {
        type: Number,
        default: 0
    },
    completed: {
        type: Number,
        default: 0
    },
    leechers: {
        type: Number,
        default: 0
    },
    validated: {
        type: Boolean,
        default: false
    },
    blocked: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});

Torrent.plugin(autoIncrement, {id: 'torrent', inc_field: 'id'});
Torrent.plugin(mongoose_autopopulate);
module.exports = mongoose.model('torrent', Torrent);