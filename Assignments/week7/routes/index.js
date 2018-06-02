/*******************************************
* Author: Jonathan Perry
* Date: 10/16/17
* Assignment: CS 290 - GET and POST Checker
*******************************************/
module.exports = function(app) {
  	app.get('/',function(req,res){
	  	res.render('requests', processRequest(req));
	});
	app.post('/',function(req,res){
	  	res.render('requests', processRequest(req));
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
function processRequest(req){
	var context = {};
	var dataList = [];
	if(req.method == 'GET')
		for (var p in req.query) 
			dataList.push({'name':p, 'value':req.query[p]});
	else // POST
		for (var b in req.body) 
			dataList.push({'name': b, 'value': req.body[b]});
 	context.dataList = dataList;
  	context.method = req.method;
  	return context;
}