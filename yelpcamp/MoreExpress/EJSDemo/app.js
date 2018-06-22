var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});
app.get("/fallinlovewith/:thing", function(req, res){
    res.render("love", {thingVar: req.params.thing});
});
app.get("/posts", function(req, res){
    var posts = [];
    posts.push({title: "Post 1", author: "Susy"});
    posts.push({title: "My adorable pet bunny", author: "Charlie"});
    posts.push({title: "Can you believe this pomsky?", author: "Jonathan"});
    res.render("posts", {posts: posts});
})
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening on port: " + process.env.PORT);
});