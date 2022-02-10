const Forum = require('../models/forum.model');
const Topic = require('../models/topic.model');
const Message = require('../models/message.model');
const Like = require('../models/like.model');
const Alert = require('../models/alert.model');
const Subscription = require('../models/subscription.model');
const slug = require('slug');


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
        forum = new Forum({name: req.body.name, slug: slug(req.body.name)});
        await forum.save();
    }
    res.send(true);
}

/**
 * Get Topics from Forum
 * @param {Request} req 
 * @param {Result} res 
 * @returns {Array}
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
            topic = new Topic({name: req.body.name, slug: slug(req.body.name), forum_id: forum._id, date: new Date()});
            await topic.save();
            res.send(true);
            return;
        }
    }
    res.send(false);
}

/**
 * Get Messages from Topic
 * @param {Request} req 
 * @param {Result} res 
 * @returns {Array}
 */
exports.messages = async (req ,res) => {
    let forum = await Forum.findOne({_id: req.params.forum});
    if(forum !== null){
        let topic = await Topic.findOne({_id: req.params.topic});
        if(topic !== null) {
            let messages = await Message.find({topic_id: topic._id});
            res.send(messages);
            return;
        }
    }
    res.send(false);
}

/**
 * Create new Message
 * @param {Request} req 
 * @param {Result} res 
 * @returns 
 */
exports.createMessage = async (req, res) => {
    let forum = await Forum.findOne({_id: req.params.forum});
    if(forum !== null){
        let topic = await Topic.findOne({_id: req.params.topic});
        if(topic !== null) {
            let message = new Message({content: req.body.content, topic_id: topic._id, user_id: req.user.id, date: new Date()});
            message.save();
            createAlertForMessage(topic._id);
            res.send(true);
            return;
        }
    }
    res.send(false);
}

/**
 * Like a Message
 * @param {Request} req 
 * @param {Result} res 
 * @returns {Boolean}
 */
exports.like = async (req, res) => {
    let message_id = req.body.message_id;
    let like = await Like.findOne({user_id: req.user.id, message_id: {$eq: message_id}});
    if(like === null){
        like = new Like({user_id: req.user.id, message_id: message_id});
        await like.save();
        res.send(true);
        return;
    }
    res.send(false);
}

/**
 * Unlike a Message
 * @param {Request} req 
 * @param {Result} res 
 * @returns 
 */
exports.unlike = async (req, res) => {
    let message_id = req.body.message_id;
    let like = await Like.findOne({user_id: req.user.id, message_id: {$eq: message_id}});
    if(like !== null){
        await Like.deleteOne({_id: like._id});
        res.send(true);
        return;
    }
    res.send(false);
}

/**
 * Subscribe to a Topic
 * @param {Request} req 
 * @param {Result} res 
 */
exports.subscribe = async (req, res) => {
    let subscription = await Subscription.findOne({user_id: req.user.id, topic_id: req.params.topic});
    if (subscription === null){
        subscription = new Subscription({user_id: req.user.id, topic_id: req.params.topic});
        await subscription.save();
        res.send(true);
        return;
    }
    res.send(false);
}

/**
 * Unsubscribe a Topic
 * @param {Request} req 
 * @param {Result} res 
 */
exports.unsubscribe = async (req, res) => {
    let subscription = await Subscription.findOne({user_id: req.user.id, topic_id: req.params.topic});
    if(subscription !== null){
        await Subscription.deleteOne({_id: subscription._id});
        res.send(true);
        return;
    }
    res.send(false);
}

/**
 * Create Alert for all subscribers
 * @param {String} topic_id 
 * @returns 
 */
async function createAlertForMessage(topic_id){
    let topic = await Topic.findOne({_id: topic_id});
    let subscriptions = await Subscription.find({topic_id: topic_id});
    for(let subscription of subscriptions){
        if(subscription.user_id !== req.user.id){
            let alert = new Alert({user_id: req.user.id, message: req.user.username + ' left a message on topic : ' + topic.name, date: new Date(), read: false});
            await alert.save();
        }
    }
    return;
}