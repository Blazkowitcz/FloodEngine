const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Subcategory = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});

Subcategory.plugin(autoIncrement, {id: 'subcategory', inc_field: 'id'});
module.exports = mongoose.model('subcategory', Subcategory);