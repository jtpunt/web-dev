var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque pretium nisl. Nulla fringilla dictum vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque finibus pulvinar venenatis. Mauris pulvinar, risus luctus rutrum imperdiet, turpis felis sollicitudin sapien, non dictum arcu tellus quis sapien. Nam sodales sapien eu mattis fringilla. Nulla sodales ornare nibh vitae rutrum. Sed ullamcorper dui ac ultrices tempus. In ultricies odio orci, elementum bibendum magna molestie ac. Curabitur vehicula a risus sit amet aliquam. Mauris tincidunt sapien vel nisl pellentesque, sed pellentesque ex pharetra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur condimentum scelerisque vehicula. Curabitur ac odio enim. Praesent dignissim efficitur rutrum. Aenean iaculis finibus ipsum ut tempor. ";
var data = [
    {   name: "Cloud's Rest",
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
        description: description
    },
    {   name: "Desert Mesa",
        image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
        description: description
    },
    {   name: "Canyon Floor",
        image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
        description: description
    }
]

function seedDB(){
    Campground.remove({}, function(err){
        if(err)
            console.log(err);
        console.log("Removed camgrounds");
        // add a few campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err)
        //             console.log(err);
        //         else{
        //              console.log("added a campground");
                    //create a comment
        //             Comment.create({
        //                 text: "This place is great, but I wish there was internet",
        //                 author: "Homer"
        //             }, function(err, comment){
        //                 if(err)
        //                     console.log(err);
        //                 else{
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("Created new comment");
        //                 }
        //             });
        //             campground.save();
        //         }
        //     });
        // });
    });
 
}

module.exports = seedDB;