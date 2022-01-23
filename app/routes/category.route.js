module.exports = app => {
    let CategoryController = require('../controllers/category.controller');

    /**
     * POST
     */
    app.get('/categories', CategoryController.categories);
};