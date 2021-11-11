module.exports = app => {
    var user = require('../controllers/user.controller');

    /**
     * POST Routes
     */
    app.post('/signup', user.signup);
    app.post('/signin', user.signin);
};