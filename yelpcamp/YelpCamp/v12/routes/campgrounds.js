var express    = require("express"),
    geocoder   = require("geocoder"),
    Campground = require("../models/campground"),
    middleware = require("../middleware"),
    router     = express.Router();
// INDEX - show all campgrounds
router.get("/", function (req, res) {
    var perPage = 8;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    Campground.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
        Campground.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/index", {
                    campgrounds: allCampgrounds,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
});

// CREATE - add new campgrounds to database
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var cost = req.body.cost;
    var description = req.body.description;
    var author = {id: req.user._id, username: req.user.username};
    geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newCampground = { 
        name: name, image: image, description: description, 
        cost: cost, author:author, location: location, lat: lat, lng: lng
    };
        // Create a new campground and save to DB
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else {
                //redirect back to campgrounds page
                console.log(newlyCreated);
                res.redirect("/campgrounds");
            }
        });
    });
});
// NEW - Show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});
// SHOW - Shows more info about one campground
router.get("/:id", function(req, res) {
    // Find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err)
            console.log(err);
        else{
            console.log(foundCampground);
             // Render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground}); 
    });
});
// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = {
            name: req.body.name, image: req.body.image, description: req.body.description, 
            cost: req.body.cost, location: location, lat: lat, lng: lng
        };
        Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                req.flash("success","Successfully Updated!");
                res.redirect("/campgrounds/" + campground._id);
            }
        });
    });
});
// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
        if(err)
            res.redirect("/campgrounds");
        else
            res.redirect("/campgrounds");
   });
});
module.exports = router;