const jwt = require('jsonwebtoken');
const config = require('../../conf.json');

exports.checkToken = function (req, res, next) {
    let token = req.header('token');
    if(!token) { return res.status(401).json({message: 'Auth Error'});}
    try{
        let decoded = jwt.verify(token, config.salt);
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(401).send({message: 'Invalid Token'});
    }
}