const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

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