var express = require("express");
var app = express();
var bodyParser = require("body-parser"); // requiring/importing it is not enough

app.use(bodyParser.urlencoded({extended: true})); // we have to tell express to use it

app.set("view engine", "ejs");
var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/", function(req, res){
    res.render("home");
});

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req, res){
    // the data we need are inside the body of the request object
    // however, req.body is undefined because express doesn't actually 
    // create the request.body for us. We need to explicitly tell it to take the request
    // body and turn it into a javascript object for us to use. We need to use body-parser.
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started on PORT: " + process.env.PORT);
});