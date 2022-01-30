module.exports = app => {
    let CategoryController = require('../controllers/category.controller');

    /**
     * GET
     */
    app.get('/categories', CategoryController.categories);
    app.get('/subcategories', CategoryController.subcategories);

    /**
     * POST
     */
    app.post('/categories/create', CategoryController.createCategory);
    app.post('/subcategories/create', CategoryController.createSubcategory);
};