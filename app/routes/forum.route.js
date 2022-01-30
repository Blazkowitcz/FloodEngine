module.exports = app => {
    let ForumController = require('../controllers/forum.controller');
    let auth = require('../middlewares/auth.middleware');

    /**
     * GET
     */
    app.get('/forums', auth.checkToken, ForumController.forums);
    app.get('/forums/:forum', auth.checkToken, ForumController.topics);
    app.get('/forums/:forum/:topic', auth.checkToken, ForumController.messages);

    /**
     * POST
     */
    app.post('/forums/create', auth.checkToken, ForumController.createForum);
    app.post('/forums/:forum/create', auth.checkToken, ForumController.createTopic);
    app.post('/forums/:forum/:topic/create', auth.checkToken, ForumController.createMessage);
};