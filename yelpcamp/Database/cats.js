var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app", {useMongoClient: true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});
var Cat = mongoose.model("Cat", catSchema); // right side makes a collection called "Cat"


// Adding a new cat to the db
// var george = new Cat({
//     name: "George1",
//     age: 111,
//     temperament: "Grouchy1"
// }); // george is a javascript object
// //george.save(); // this is an async function, you have to pass a callback function into save()
// george.save(function(err, cat){ // cat is the item that was returned
//     if(err){
//         console.log("SOMETHING WENT WRONG!")
//     }
//     else{
//         console.log("WE JUST SAVED A CAT TO THE DB:")
//         console.log(cat);
//     }
// });

Cat.create({ // does the same as above. Lets you create and save a cat all in 1 function
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat){ 
    if(err)
        console.log(err);
    else
        console.log(cat);
});
// retrieve all cats from the DB and console.log each one
// NOTE: The .save() async call may complete after the .find() async function call
Cat.find({}, function(err, cats){ 
    if(err){
        console.log("OH NO, ERROR!")
        console.log(err);
    }else{
        console.log("ALL THE CATS...");
        console.log(cats);
    }
})