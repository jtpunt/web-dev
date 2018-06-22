var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
var campgrounds = [
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name: "Granite Hill", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name: "Granite Hill", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name: "Granite Hill", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}
];
app.get('/', function(req, res){
    res.render('landing');
});
app.get('/campgrounds', function(req, res){
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    campgrounds.push({name: name, image:image});
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
   res.render('new'); 
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp app started on: " + process.env.PORT);
});