var express = require('express');
var request = require('request');
var app = express();

app.set("view engine", "ejs");
app.get('/', function(req, res) {
    res.render('search');
});
app.get('/results', function(req, res){
    var url = 'http://omdbapi.com/?s=';
    var query = req.query.search + '&';
    var key = 'apikey=thewdb';
    request(url + query +  key, function(error, response, body){ 
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body); // we need to convert the string into an object
            res.render('results', {data: data}); // show the HTML for the Google homepage
        }
        else
            console.log(error);
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started on PORT: " + process.env.PORT);
});