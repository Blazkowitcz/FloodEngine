module.exports = app => {
    let CommentController = require('../controllers/comment.controller');
    let auth = require('../middlewares/auth.middleware');

    /**
     * GET
     */
    app.get('/torrents/:id/comments', auth.checkToken, CommentController.comments);

    /**
     * POST
     */
    app.post('/torrents/:id/comments/publish', auth.checkToken, CommentController.publish);
    app.post('/torrents/:id/comments/:comment_id/edit', auth.checkToken, CommentController.edit);
};