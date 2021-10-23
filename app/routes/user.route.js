module.exports = app => {
    var user = require('../controllers/user.controller');

    app.post('/signup', user.signup);
};