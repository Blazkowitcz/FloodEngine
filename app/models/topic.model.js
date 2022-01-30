const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Topic = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    forum_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

Topic.plugin(autoIncrement, {id: 'topic', inc_field: 'id'});
module.exports = mongoose.model('topic', Topic);