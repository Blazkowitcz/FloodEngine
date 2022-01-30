const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Forum = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
});

Forum.plugin(autoIncrement, {id: 'forum', inc_field: 'id'});
module.exports = mongoose.model('forum', Forum);