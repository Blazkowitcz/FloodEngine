const Warning = require('../../models/torrent_warning.model');
const Torrent = require('../../models/torrent.model');

/**
 * Return all Warnings
 * @param {Request} req 
 * @param {Result} res 
 */
exports.warnings = async (req, res) => {
    let warnings = await Warning.find();
    res.send(warnings);
}

/**
 * Return all unvalidated Torrents
 * @param {Request} req 
 * @param {Result} res 
 */
exports.unvalidated = async (req, res) => {
    let torrents = await Torrent.find({validated: false});
    res.send(torrents);
}

/**
 * Validate a Torrent
 * @param {Request} req 
 * @param {Result} res 
 * @returns 
 */
exports.validate = async (req, res) => {
    let torrent = await Torrent.findOne({_id: {$eq: req.body.id}});
    if(torrent !== null){
        torrent.validated = true;
        res.send(true);
        return;
    }
    res.send(false);
}

/**
 * Return all blocked Torrents
 * @param {Request} req 
 * @param {Result} res 
 */
exports.blocked = async (req, res) => {
    let torrents = await Torrent.find({blocked: true});
    res.send(torrents);
}

/**
 * Block a Torrent
 * @param {Request} req 
 * @param {Result} res 
 * @returns 
 */
exports.block = async (req, res) => {
    let torrent = await Torrent.findOne({_id: {$eq: req.user.id}});
    if(torrent !== null){
        torrent.blocked = true;
        res.send(true);
        return;
    }
    res.send(false);
}

/**
 * Unblock a Torrent
 * @param {Request} req 
 * @param {Result} res 
 * @returns 
 */
exports.unblock = async (req, res) => {
    let torrent = await Torrent.findOne({_id: {$eq: req.user.id}});
    if(torrent !== null){
        torrent.blocked = false;
        res.send(true);
        return;
    }
    res.send(false);
}

/**
 * Delete a Torrent
 * @param {Request} req 
 * @param {Result} res 
 * @returns 
 */
exports.delete = async (req, res) => {
    let torrent = await Torrent.findOne({_id: {$eq: req.user.id}});
    if(torrent !== null){
        await Torrent.deleteOne({_id: torrent._id});
        res.send(true);
        return;
    }
    res.send(false);
}

/**
 * Update a Torrent /!\ WIP
 * @param {Request} req 
 * @param {Result} res 
 * @returns 
 */
exports.update = async (req, res) => {
    let torrent = await Torrent.findOne({_id: {$eq: req.user.id}});
    if(torrent !== null){
        torrent.description = req.body.description;
        await torrent.save();
        res.send(true);
        return;
    }
    res.send(false);
}