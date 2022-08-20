module.exports = app => {
    let TorrentController = require('../../controllers/admin/torrent.controller');
    let auth = require('../../middlewares/auth.middleware');
    let role = require('../../middlewares/role.middleware');

    /**
     * GET
     */
    app.get('/staff/torrents/warnings', [auth.checkToken, role.isModo], TorrentController.warnings);
    app.get('/staff/torrents/unvalidated', [auth.checkToken, role.isModo], TorrentController.unvaalidated);
    app.get('/staff/torrents/blocked', [auth.checkToken, role.isModo], TorrentController.blocked);

    /**
     * POST
     */
    app.post('/staff/torrents/validate', [auth.checkToken, role.isModo], TorrentController.validate);
    app.post('/staff/torrents/block', [auth.checkToken, role.isModo], TorrentController.block);
    app.post('/staff/torrents/unblock', [auth.checkToken, role.isModo], TorrentController.unblock);
    app.post('/staff/torrents/delete', [auth.checkToken, role.isModo], TorrentController.delete);
};