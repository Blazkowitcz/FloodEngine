const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config.json');
const InitiateMongoServer = require('./app/modules/database.module');
const crons = require('./app/modules/cron.module');

InitiateMongoServer();

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

require('./app/routes/auth.route')(app);
require('./app/routes/announce.route')(app);
require('./app/routes/torrent.route')(app);

app.listen(config.port || 3000, function() {});