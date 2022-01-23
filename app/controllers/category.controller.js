const Category = require('../models/category.model');
const Subcategory = require('../models/subcategory.model');

exports.categories = async (req, res) => {
    let categories = await Category.find().select('_id name');
    res.send(categories);
}