const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require ('../../config.json');

/**
 * Log User
 * @param {Request} req 
 * @param {Result} res 
 * @returns 
 */
exports.signin = async (req, res) => {
    let { username, password } = req.body;
    try{
        let user = await User.findOne({username: username});
        if(!user){
            return res.status(400).json({message: "Error during login"});
        }
        let match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({message: "Error during login"});
        }
        let payload = { user: {id: user.id, username: user.username, passkey: user.passkey}};
        jwt.sign(
            payload,
            config.salt,
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) { throw err;}
                else {
                    res.status(200).json({token});
                }
            }
        );
    } catch (e) {
        res.status(500).json({message: "Server Error"});
    }
}

/**
 * Register User
 * @param {Request} req 
 * @param {Result} res 
 */
exports.signup = async (req, res) => {
    let { username, email, password } = req.body;
    try{
        let user = await User.findOne({username: username});
        if(user !== null){
            res.send("User already exist");
        } else {
            let passkey = crypto.randomBytes(16).toString('hex');
            let salt = await bcrypt.genSalt(10);
            user = new User({username: username, email: email, password: await bcrypt.hash(password, salt), passkey : passkey});
            user.save();
            res.send(true);
        }
    } catch (e){
        res.send(e);
    }
}