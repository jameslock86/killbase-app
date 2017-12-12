const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

const studentRoutes= require('./routes/student');

app.use(bodyParser.json());

app.use('/student', studentRoutes);

app.listen(port,function () {
	console.log(`'listing on port',${port}`);
});
