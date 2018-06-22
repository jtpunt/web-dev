var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});
app.get("/speak/:animal/", function(req, res){
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof",
        cat: "Meow",
        goldfish: "..."
    }
    var animal = req.params.animal.toLowerCase(); // prevent errors like 'dog' vs 'Dog' when accessing the sounds obj
    res.send("The " + animal + " says " + "\'" + sounds[animal] + "\'!");
});
app.get("/repeat/:word/:times", function(req, res) {
   var response = "";
   var times = Number(req.params.times);
   for(var i = 0; i < times; i++){
       response += req.params.word + " ";
   }
   res.send(response);
});
app.get("*", function(req, res){
    res.send("Sorry, page not found...What are you doing with your life?");
})
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started on port: " +  process.env.PORT);
});