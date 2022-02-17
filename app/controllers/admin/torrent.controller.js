const Warning = require('../../models/torrent_warning.model');

/**
 * Return all Warnings
 * @param {Request} req 
 * @param {Result} res 
 */
exports.warnings = async (req, res) => {
    let warnings = Warning.find();
    res.send(warnings);
}