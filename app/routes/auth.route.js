module.exports = app => {
    let AuthController = require('../controllers/auth.controller');

    /**
     * POST
     */
    app.post('/signup', AuthController.signup);
    app.post('/signin', AuthController.signin);
};