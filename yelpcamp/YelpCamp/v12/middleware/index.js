var Campground = require("../models/campground"),
    Comment    = require("../models/comment");
// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    // is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("/campgrounds");
            }
            else{// Added this block, to check if foundCampground exists, 
                //  and if it doesn't to throw an error via connect-flash and send us back to the homepage
                if (!foundCampground) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
                // does user own the campground?
                // foundCampground is an object while req.user._id is a string
                if(foundCampground.author.id.equals(req.user._id))
                    next(); 
                else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back"); // take the user to the previous page they were on
    }
}
middlewareObj.checkCommentOwnership = function(req, res, next){
    // is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("/campgrounds");
            }
            else{
                if (!foundComment){
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
                // does user own the comment?
                // foundComment is an object while req.user._id is a string
                if(foundComment.author.id.equals(req.user._id))
                    next(); 
                else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back"); // take the user to the previous page they were on
    }
}
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}
module.exports = middlewareObj