let express = require('express');
let app = express();
// let api = require('./api');
let bodyParser = require('body-parser');
let routes = require('./routes');
let cors = require('cors');
let apiUrl = "/api/v1";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(8000, '0.0.0.0');
app.use(express.static('public'));

routes(app, apiUrl);