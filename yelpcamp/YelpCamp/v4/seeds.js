var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {   name: "Cloud's Rest",
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
        description: "blah blah blah"
    },
    {   name: "Desert Mesa",
        image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
        description: "blah blah blah"
    },
    {   name: "Canyon Floor",
        image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
        description: "blah blah blah"
    }
]

function seedDB(){
    Campground.remove({}, function(err){
        if(err)
            console.log(err);
        console.log("Removed camgrounds");
        // add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err)
                    console.log(err);
                else{
                    console.log("added a campground");
                    // create a comment
                    Comment.create({
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function(err, comment){
                        if(err)
                            console.log(err);
                        else{
                            campground.comments.push(comment);
                            campground.save();
                        }
                    });
                }
            });
        });
    });
 
}

module.exports = seedDB;