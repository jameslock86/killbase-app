
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
// lookinto the folder for my views.
app.set('views','./views');
//ejs view engine
app.set('view engine','ejs');


app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
//allows us to call form the curl to each table
app.use('/assassins', assassinsRouter);
app.use('/contracts', contractsRouter);

app.use('/',function (req,res) {
	res.render('index');
});








app.listen(port, function() {
	console.log('Listening on port', port);
});
