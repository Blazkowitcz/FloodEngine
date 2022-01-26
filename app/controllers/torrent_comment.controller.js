const TorrentComment = require('../models/torrent_comment.model');

/**
 * Get comments of a Torrent
 * @param {Request} req 
 * @param {Result} res 
 * @returns {Array}
 */
exports.comments = async (req, res) => {
    let comments = await TorrentComment.find({torrent_id: req.body.torrent_id});
    res.send(comments);
}

/**
 * Publish a Torrent
 * @param {Request} req 
 * @param {Result} res 
 */
exports.publish = async (req, res) => {
    let comment = new TorrentComment({user_id: req.user.id})
}