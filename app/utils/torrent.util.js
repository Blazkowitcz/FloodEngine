const nt = require('nt');

/**
 * Edit torrent metadata
 * @returns
 */
function editTorrent(){
    return new Promise(function(resolve, reject){
        try{
            nt.read('app/controllers/test.torrent', (err, torrent) => {
                torrent.metadata.announce = "Toto";
                resolve(torrent);
            });
        }catch (e) {
            reject(e);
        }
    });
}

module.exports = {editTorrent};