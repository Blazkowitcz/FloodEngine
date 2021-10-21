module.exports = app => {
    var announcer = require('../controllers/announce.controller');

    app.get('/announce/:passkey', announcer.announce);
};