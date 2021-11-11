module.exports = app => {
    var torrent = require('../controllers/torrent.controller');
    var auth = require('../middlewares/auth.middleware');

    /**
     * POST Routes
     */
    app.post('/upload', auth.checkToken, torrent.upload);

    /**
     * GET Routes
     */
    app.get('/download/:id', auth.checkToken, torrent.download);
    app.get('/last', auth.checkToken, torrent.getLastTorrents);
};