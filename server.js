const express = require('express');
const fileUpload = require('express-fileupload');
//const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config.json');
const InitiateMongoServer = require('./app/modules/database.module');
const crons = require('./app/modules/cron.module');

InitiateMongoServer();

// const limiter = rateLimit({
// 	windowMs: config.request_limit_time_window * 60 * 1000,
// 	max: config.request_limit,
// 	standardHeaders: true,
// 	legacyHeaders: false,
// });

//app.use(limiter);
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

require('./app/routes/auth.route')(app);
require('./app/routes/announce.route')(app);
require('./app/routes/torrent.route')(app);
require('./app/routes/category.route')(app);
require('./app/routes/comment.route')(app);
require('./app/routes/forum.route')(app);

app.listen(config.port || 3000, function() {});