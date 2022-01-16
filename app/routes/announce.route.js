module.exports = app => {
    let AnnounceController = require('../controllers/announce.controller');

    /**
     * POST
     */
    app.get('/announce/:passkey', AnnounceController.announce);
};