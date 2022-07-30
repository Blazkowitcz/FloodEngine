const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const mongoose_autopopulate = require('mongoose-autopopulate');
const Category = require('./category.model');

const Subcategory = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
        autopopulate: true,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});

Subcategory.plugin(autoIncrement, {id: 'subcategory', inc_field: 'id'});
Subcategory.plugin(mongoose_autopopulate);
module.exports = mongoose.model('subcategory', Subcategory);