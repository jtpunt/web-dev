var express    = require("express"),
    bodyParser = require("body-parser"),
    Campground = require("./models/campground"),
    // Comment    = require("./models/comment"),
    mongoose   = require("mongoose"),
    seedDB     = require("./seeds"),
    app        = express();

mongoose.connect("mongodb://10.0.0.2/yelp_camp_v3", {useMongoClient: true});
seedDB(); // reset the db and load test data
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.get("/", function(req, res){
    res.render("landing");
});
// INDEX ROUTE - show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err) console.log(err);
        else res.render("index", {campgrounds: campgrounds});
    });
});
// CREATE - add new campgrounds to database
app.post("/campgrounds", function(req, res){
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
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});
// NEW - Show form to create new campground
app.get("/campgrounds/new", function(req, res) {
   res.render("new"); 
});
// SHOW - Shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    // Find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err)
            console.log(err);
        else{
            console.log(foundCampground);
              // Render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });

});
app.listen(8080, function(){
    console.log("YelpCamp app started on: " + 8080);
});