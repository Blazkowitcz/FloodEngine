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

/**
 * Remove special char like long dash
 * @param {String} name 
 * @returns 
 */
function formatName(name){
    name = name.replace(/\u2013|\u2014/g, "-");
    return name;
}

module.exports = {editTorrent, formatName};