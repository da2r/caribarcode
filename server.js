'use strict';

let express = require('express')
let app = express()

let favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/favicon.ico'));

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static('public'))

let APIManager = require('./api/api-manager');
app.use('/api', APIManager.handler);

exports.start = function (port, callback) {
	app.listen(port, callback)
}