module.exports = app => {
    var announcer = require('../controllers/announce.controller');

    /**
     * GET Routes
     */
    app.get('/announce/:passkey', announcer.announce);
};