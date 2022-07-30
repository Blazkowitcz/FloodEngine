const mongoose = require('mongoose');
const config = require('../../config.json');

const mongo_uri = "mongodb://" + config.database.user + ':' + config.database.password + '@' + config.database.host + ":" + config.database.port + "/" + config.database.database_name;

const InitiateMongoServer = async () => {
    try{
        await mongoose.connect(mongo_uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("connected");
    } catch (e){
        throw e;
    }
}

module.exports = InitiateMongoServer;