const mongoose = require('mongoose');
const config = require('../../config.json');

const InitiateMongoServer = async () => {
    let mongo_uri = "mongodb://";
    mongo_uri = config.database.passwordProtected ? mongo_uri + config.database.user + ':' + config.database.password + '@' : mongo_uri;
    mongo_uri += config.database.host + ":" + config.database.port + "/" + config.database.database_name;
    try{
        await mongoose.connect(mongo_uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("connected");
    } catch (e){
        console.log(e);
        throw e;
    }
}

module.exports = InitiateMongoServer;