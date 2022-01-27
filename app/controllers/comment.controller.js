const Comment = require('../models/comment.model');

/**
 * Get Comments of a Torrent
 * @param {Request} req 
 * @param {Result} res 
 * @returns {Array}
 */
exports.comments = async (req, res) => {
    let comments = await Comment.find({torrent_id: req.params.id});
    res.send(comments);
}

/**
 * Publish a Comment
 * @param {Request} req 
 * @param {Result} res 
 */
exports.publish = async (req, res) => {
    let comment = new Comment({user_id: req.user.id, torrent_id: req.params.id, message: req.body.message, date: new Date()});
    await comment.save();
    res.send(true);
}

/**
 * Edit a Comment
 * @param {Request} req 
 * @param {Result} res 
 */
exports.edit = async (req, res) => {
    let comment = Comment.find({_id: req.params.comment_id, user_id: req.user.id});
    if(comment !== null){
        comment.message = req.body.message;
        await comment.save();
    }
    res.send(true);
}