const Category = require('../models/category.model');
const Subcategory = require('../models/subcategory.model');
const string_util = require('../utils/string.util');

/**
 * Return all Categories
 * @param {Request} req 
 * @param {Result} res
 * @returns {Array}
 */
exports.categories = async (req, res) => {
    let categories = await Category.find().lean().select('_id name');
    res.send(categories);
}

/**
 * Return all Subcategories related to a Category
 * @param {Request} req 
 * @param {Result} res 
 * @returns {Array}
 */
exports.subcategories = async (req, res) => {
    let subcategories = await Subcategory.find({category_id : {$eq: req.body.category_id}}).lean().select('_id name');
    res.send(subcategories);
}

/**
 * Create a new Category
 * @param {Request} req 
 * @param {Result} res 
 */
exports.createCategory = async (req, res) => {
    let category = await Category.findOne({name: {$eq: req.body.name}});
    if(category === null){
        category = new Category({name: {$eq: req.body.name}, slug: {$eq: string_util.stringToSlug(req.body.name)}, icon: {$eq: req.body.icon} });
        await category.save();
    }
    res.send(true);
}

/**
 * Create a new Subcategory
 * @param {Request} req 
 * @param {Result} res 
 */
exports.createSubcategory = async (req, res) => {
    let subcategory = await Subcategory.findOne({name: {$eq: req.body.name}, category_id: {$eq: req.body.category_id}}).lean();
    if(subcategory === null){
        subcategory = new Subcategory({name: {$eq : req.body.name}, slug: {$eq: string_util.stringToSlug(req.body.name)}, category_id: {$eq: req.body.category_id}, icon: {$eq: req.body.icon}});
        await subcategory.save();
    }
    res.send(true);
}