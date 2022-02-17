module.exports = app => {
    let TorrentController = require('../../controllers/admin/torrent.controller');
    let auth = require('../../middlewares/auth.middleware');
    let role = require('../../middlewares/role.middleware');
    app.get('/staff/torrents/warnings', [auth.checkToken, role.isModo], TorrentController.warnings);
};