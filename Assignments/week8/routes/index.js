/*******************************************
* Author: Jonathan Perry
* Date: 10/16/17
* Assignment: CS 290 - GET and POST Checker
*******************************************/
var request = require('request');
var credentials = require('../public/js/credentials.js');

module.exports = function(app) {
	// GET checker
	app.get('/',function(req,res,next){
		var context = {};
		//If there is no session, go to the main page.
		if(!req.session.name){
			res.render('newSession', context);
			return;
		}
		context.name = req.session.name;
		context.toDoCount = req.session.toDo.length || 0;
		context.toDo = req.session.toDo || [];
		res.render('toDo', context);
	});
	app.get('/toDo',function(req,res,next){
		var context = {};
		//If there is no session, go to the main page.
		if(!req.session.name){
			res.render('newSession', context);
			return;
		}
		context.name = req.session.name;
		context.toDoCount = req.session.toDo.length || 0;
		context.toDo = req.session.toDo || [];
		res.render('toDo', context);
	});
	app.post('/', function(req, res) {
		var context = {};
		if (req.body['New List']) {
			req.session.name = req.body.name;
			req.session.toDo = [];
			req.session.curId = 0;
		}
		if (!req.session.name) {
			res.render('newSession', context);
			return;
		}
		context.name = req.session.name;
		context.toDoCount = req.session.toDo.length || 0;
		context.toDo = req.session.toDo || [];
		res.render('toDo', context);
	});
	app.post('/toDo',function(req,res){
		var callbackCount = 0;
		var context = {};
		if(req.body['New List']){
			req.session.name = req.body.name;
			req.session.toDo = [];
			req.session.curId = 0;
		}
		//If there is no session, go to the main page.
		if(!req.session.name){
			res.render('newSession', context);
			return;
		}
		if(req.body['Add Item']){
			request('http://api.openweathermap.org/data/2.5/weather?zip=' + req.body.zipcode + credentials.key, handleGet);
			function handleGet(err, response, body){
	    		if(!err && response.statusCode < 400){
		      		request({ 
		      			"url":"http://httpbin.org/post",
		        		"method":"POST",
		        		"headers":{
		          		"Content-Type":"application/json"
		        		}, "body": response.body
		      		}, handlePost)
	    		}else {
	    			console.log("ERROR!");
	      			console.log(err);
	      			console.log(response.statusCode);
	    		}
	  		}
	  		function handlePost(err, response, body){
	    		if(!err && response.statusCode < 400){
	    			var httpbin = JSON.parse(body);
	    			context.temp_min = ((httpbin.json.main.temp_min - 273.15) * (9/5) + 32);
	    			context.temp_max = ((httpbin.json.main.temp_max - 273.15) * (9/5) + 32);
					complete();
	   			}else{
	      			console.log(err);
	      			console.log(response.statusCode);
	    		}
	  		}
	  		function complete(){
	  			callbackCount++;
	  			req.session.curId++;
	  			if(callbackCount >= 1){
	  				req.session.toDo.push({
						"name":req.body.name, 
						"id":req.session.curId,
						"zipcode": req.body.zipcode,
						"lowTemp": req.body.lowTemp,
						"highTemp": req.body.highTemp,
						"apiMinTemp": context.temp_min,
						"apiMaxTemp": context.temp_max
					});
					updatePage();
  				}
	  		}
		}
		if(req.body['Done']){
			req.session.toDo = req.session.toDo.filter(function(e){
			  return e.id != req.body.id;
			});
			updatePage();
		}
		function updatePage(){
			context.name = req.session.name;
			context.toDoCount = req.session.toDo.length;
			context.toDo = req.session.toDo;
			res.render('toDo',context);
		}
	});
	app.use(function(req,res){
  		res.status(404);
  		res.render('404');
	});
	app.use(function(err, req, res, next){
  		console.error(err.stack);
  		res.type('plain/text');
  		res.status(500);
  		res.render('500');
	});
};