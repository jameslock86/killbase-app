
'use strict';

let express = require('express');
let app = express();
let port = process.env.PORT || 8000;

let morgan = require('morgan');
let bodyParser = require('body-parser');
//route for assissins
let assassinsRouter = require('./routes/assassins');
//route for contracts
let contractsRouter = require('./routes/contracts');
// hides the factv we used express
app.disable('x-powered-by');
app.use(morgan('short'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//allows us to call form the curl to each table
app.use('/assassins', assassinsRouter);
app.use('/contracts', contractsRouter);










app.listen(port, function() {
	console.log('Listening on port', port);
});
