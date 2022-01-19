module.exports = app => {
    let TorrentController = require('../controllers/torrent.controller');
    let auth = require('../middlewares/auth.middleware');

    /**
     * GET
     */
    app.get('/download/:id', auth.checkToken, TorrentController.download);
    app.get('/torrents/news', auth.checkToken, TorrentController.getNewTorrents);
    app.get('/torrents/best', auth.checkToken, TorrentController.getBestTorrents);

    /**
     * POST
     */
    app.post('/upload', TorrentController.upload);
    app.post('/torrents/:id/edit', auth.checkToken, TorrentController.update);
};