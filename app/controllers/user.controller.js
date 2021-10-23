const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../../conf.json');

/**
 * Register user
 * @param {*} req 
 * @param {*} res 
 */
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try{
        let user = await User.findOne({username: username});
        if(Object.keys(user).length > 0){
            res.send("User already exist");
        } else{
            user = new User({username, email, password});
            let salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            res.send(true);
        }
    } catch (e) {
        throw e;
    }
};

/**
 * Log User
 * @param {*} req 
 * @param {*} res 
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
        let payload = { user: {id: user.id }};
        jwt.sign(
            payload,
            config.salt,
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) { throw err; }
                else{
                    res.status(200).json({token});
                }
            }
        );
    } catch (e) {
        res.status(500).json({message: "Server Error"});
    }
};

