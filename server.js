const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./conf.json');

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

require('./app/routes/announce.route')(app);
require('./app/routes/user.route')(app);

app.listen(config.port || 3000, function() {});