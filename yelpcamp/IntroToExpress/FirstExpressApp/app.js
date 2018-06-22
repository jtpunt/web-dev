var express = require("express");
var app = express();

// "/" => "Hi there!" 
app.get("/", function(req, res){
    res.send("Hi there!");
});
// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
});
// "/dog" => "MEOW!"
app.get("/dog", function(req, res){
    res.send("MEOW");
});
app.get("/r/:subredditName/", function(req, res){
    res.send("Welcome to the " + req.params.subredditName.toUpperCase() + " subreddit!");
});
app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
    console.log(req.params);
    res.send("Welcome to the comments page!");
});
app.get("*", function(req, res){
    res.send("YOU ARE A STAR!");
});
// Tell express to lsiten for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started on port: " +  process.env.PORT);
});