const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Category = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});

Category.plugin(autoIncrement, {id: 'category', inc_field: 'id'});
module.exports = mongoose.model('category', Category);