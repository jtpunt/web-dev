var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

/***********************************************************
*  this will take our passport local mongoose package and
*  add a bunch of it's method to our user schema. It comes
*  with a lot of important functionality and features that we'll 
*  need to use in order to have user authentication 
************************************************************/
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);