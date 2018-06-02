/*******************************************
* Author: Jonathan Perry
* Date: 10/16/17
* Assignment: CS 290 - GET and POST Checker
*******************************************/
/**********************************************************************
* The tools needed for this web application
**********************************************************************/
var express = require('express');
var routes = require('./routes/index.js');
var mysql = require('./dbcon.js');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser'); // body parser middleware
var port = process.env.PORT || 3000;
var app = express();
/**********************************************************************
* Setup our handlebars engine for handling file extensions that end in
* 'handlebars' by registering 'handlebars' as our view engine using its
* bound 'engine' function.
**********************************************************************/
app.engine('handlebars', handlebars.engine); 
app.set('view engine', 'handlebars');
app.set('mysql', mysql);
/**********************************************************************
* Setup what type of data the server can receive via GET/POST requests
**********************************************************************/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use('/static', express.static('public')); // static directory is going to be our directory called public
/**********************************************************************
* Setup Routes For Our Server
**********************************************************************/
routes(app);
/**********************************************************************
* Start The Server
**********************************************************************/
app.listen(port, function() {
  	console.log('Express started on http://localhost:' + port + '; press Ctrl-C to terminate.');
});