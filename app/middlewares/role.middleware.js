const User = require('../models/user.model');

/**
 * Check if User is Admin
 * @param {Request} req 
 * @param {Result} res 
 * @param {Function} next 
 */
exports.isAdmin = function (req, res, next) {
    let user = User.findOne({_id: req.user.id});
    if(user !== null && user.admin === true){
        next();
    }else{
        res.status(401).send({message: "You're not admin"});
    }
}

/**
 * Check if User is Moderator or more
 * @param {Request} req 
 * @param {Result} res 
 * @param {Function} next 
 */
exports.isModo = function (req, res, next) {
    let user = User.findOne({_id: req.user.id});
    if(user !== null && (user.admin === true || user.modo === true)){
        next();
    }else{
        res.status(401).send({message: "You're not a staff member"});
    }
}