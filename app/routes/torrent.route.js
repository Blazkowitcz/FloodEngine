module.exports = app => {
    let TorrentController = require('../controllers/torrent.controller');
    let auth = require('../middlewares/auth.middleware');

    /**
     * GET
     */
    app.get('/torrents/:id/download', auth.checkToken, TorrentController.download);
    app.get('/torrents/news', auth.checkToken, TorrentController.getNewTorrents);
    app.get('/torrents/best', auth.checkToken, TorrentController.getBestTorrents);
    app.get('/torrents/:id', auth.checkToken, TorrentController.detail);

    /**
     * POST
     */
    app.post('/upload',auth.checkToken, TorrentController.upload);
    app.post('/torrents/:id/edit', auth.checkToken, TorrentController.update);
    app.post('/torrents/:id/delete', auth.checkToken, TorrentController.delete);
    app.post('/torrents/:id/warn', auth.checkToken, TorrentController.warning);
};