/*******************************************
* Author: Jonathan Perry
* Date: 10/16/17
* Assignment: CS 290 - GET and POST Checker
*******************************************/
/**********************************************************************
* The tools needed for this web application
**********************************************************************/
var express = require('express');
var request = require('request');
var routes = require('./routes/index.js');
var session = require('express-session');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser'); // body parser middleware
var port = process.env.PORT || 3000;
var app = express();
/**********************************************************************
* Setup our handlebars engine for handling file extensions that end in
* 'handlebars'
**********************************************************************/
app.engine('handlebars', handlebars.engine); 
app.set('view engine', 'handlebars');
/**********************************************************************
* Setup what type of data the server can receive via GET/POST requests
**********************************************************************/
// lets our app know that we in fact want to use sessions and we want to so with a new instance of express-sessions
// we pass it a 'secret' (etc. a string of characters) that only the server knows and should be unguessable.
// It is used as part of an algorithm which can detect if cookies have been tampered with by the client
app.use(session({saveUninitialized: false, resave: false, secret: 'SuperSecretPassword'}));
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
// var request = require('request');
// var express = require('express');
// var session = require('express-session');
// var bodyParser = require('body-parser');
// var credentials = require('./public/js/credentials');

// var app = express();

// app.use(session({saveUninitialized: false, resave: false, secret: 'SuperSecretPassword'}));
// app.use(express.static('public'));
// var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

// app.engine('handlebars', handlebars.engine);
// app.set('view engine', 'handlebars');
// app.set('port', 4000);
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get('/', function(req, res, next) {
//   var ctx = {};
//   if (!req.session.name) {
//     res.render('newSession', ctx);
//     return;
//   }
//   ctx.name = req.session.name;
//   ctx.toDoCount = req.session.toDo.length || 0;
//   ctx.toDo = req.session.toDo || [];
//   console.log(ctx.toDo);
//   res.render('toDo', ctx);
// });

// app.get('/weatherCheck', function(req, res, next) {
//   var ctx = {};
//   var zip = req.zipcode;
//   request('http://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&APPID=' + credentials.owm, function(err, res, body) {
//     if (!err && res.statusCode < 400) {
//       var temp = res.main.temp;
//       ctx.temp = temp;
//     } else {
//       console.log(err);
//       if (res) {
//         console.log(res.statusCode);
//       }
//     }
//   });
// });

// app.post('/', function(req, res) {
//   var ctx = {};

//   if (req.body['New List']) {
//     req.session.name = req.body.name;
//     req.session.toDo = [];
//     req.session.curId = 0;
//   }

//   if (!req.session.name) {
//     res.render('newSession', ctx);
//     return;
//   }

//   if (req.body['Add Item']) {
//     var item = {
//       'name': req.body.name,
//       'id': req.session.curId,
//       'zip': req.body.zip,
//       'minTemp': req.body.minTemp,
//       'maxTemp': req.body.maxTemp
//     };
//     req.session.toDo.push(item);
//     req.session.curId++;
//   }

//   if (req.body['Done']) {
//     req.session.toDo = req.session.toDo.filter(function(e) {
//       return e.id != req.body.id;
//     })
//   }

//   ctx.name = req.session.name;
//   ctx.toDoCount = req.session.toDo.length;
//   ctx.toDo = req.session.toDo;
//   console.log(ctx.toDo);
//   res.render('toDo', ctx);
// });

// app.use(function(req, res){
// 	res.status(404);
// 	res.render('404');
// });

// app.use(function(err, req, res, next){
// 	console.log(err.stack);
// 	res.status(500);
// 	res.render('500');
// });

// app.listen(app.get('port'), function(){
// 	console.log('Express started on port 4000');
// });