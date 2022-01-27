const Forum = require('../models/forum.model');
const Topic = require('../models/topic.model');
const StringUtil = require('../utils/string.util');

/**
 * Get Forums
 * @param {Request} req 
 * @param {Result} res 
 * @returns {Array}
 */
exports.forums = async (req, res) => {
    let forums = await Forum.find();
    res.send(forums);
}

/**
 * Create new Forum
 * @param {Request} req 
 * @param {Result} res 
 */
exports.createForum = async (req, res) => {
    let forum = await Forum.findOne({name: req.body.name});
    if(forum === null){
        forum = new Forum({name: req.body.name, slug: StringUtil.stringToSlug(req.body.name)});
        await forum.save();
    }
    res.send(true);
}

/**
 * Get Topics
 * @param {Request} req 
 * @param {Result} res 
 */
exports.topics = async (req, res) => {
    let forum = await Forum.findOne({_id: req.params.forum});
    if(forum !== null){
        let topics = await Topic.find({forum_id: forum._id});
        res.send(topics);
        return;
    }
    res.send(false);
}

/**
 * Create new Topic
 * @param {Request} req 
 * @param {Result} res 
 */
exports.createTopic = async (req, res) => {
    let forum = await Forum.findOne({_id: req.params.forum});
    if(forum !== null){
        let topic = await Topic.findOne({forum_id: forum._id, name: req.body.name});
        if(topic === null) {
            topic = new Topic({name: req.body.name, slug: StringUtil.stringToSlug(req.body.name), forum_id: forum._id, date: new Date()});
            await topic.save();
            res.send(true);
            return;
        }
    }
    res.send(false);
}