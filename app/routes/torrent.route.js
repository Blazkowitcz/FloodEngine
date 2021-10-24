module.exports = app => {
    var torrent = require('../controllers/torrent.controller');

    app.post('/upload', torrent.upload);
};