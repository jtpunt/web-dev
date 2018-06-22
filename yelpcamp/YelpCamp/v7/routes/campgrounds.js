var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
// INDEX ROUTE - show all campgrounds
router.get("/campgrounds", function(req, res){
    console.log(req.user);
    // Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err) 
            console.log(err);
        else 
            res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user});
    });
});
// CREATE - add new campgrounds to database
router.post("/campgrounds", function(req, res){
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
router.get("/campgrounds/new", function(req, res) {
   res.render("campgrounds/new"); 
});
// SHOW - Shows more info about one campground
router.get("/campgrounds/:id", function(req, res) {
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
module.exports = router;