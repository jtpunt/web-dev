var express    = require('express'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    app        = express();

mongoose.connect("mongodb://10.0.0.2/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({
//         name: "Granite Hill", 
//         image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
//         description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground); 
//         }
//     }
// );

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
// INDEX ROUTE - show all campgrounds
app.get('/campgrounds', function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err) console.log(err);
        else res.render('index', {campgrounds: campgrounds});
    });
});
// CREATE - add new campgrounds to database
app.post('/campgrounds', function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, addedCampground){ 
        if(err){
            console.log(err);
        }else{
            console.log("NEWLY CREATED CAMPGROUND: ");
            console.log(addedCampground); 
        }
    });
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});
// NEW - Show form to create new campground
app.get('/campgrounds/new', function(req, res) {
   res.render('new'); 
});
app.get("/campgrounds/:id", function(req, res) {
    // Find the campground with the provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err)
            console.log(err);
        else{
            console.log(foundCampground);
              // Render show template with that campground
            res.render('show', {campground: foundCampground});
        }
    });

});
app.listen(8080, function(){
    console.log("YelpCamp app started on: " + 8080);
});