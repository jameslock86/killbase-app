
'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var morgan = require('morgan');
var bodyParser = require('body-parser');

var assassinsRouter = require('./routes/assassins');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(bodyParser.multipart())
app.use('/assassins', assassinsRouter);







app.listen(port, function() {
	console.log('Listening on port', port);
});
