// looks for a file/package called cat-me in the node_modules
var catMe = require("cat-me"); 
var knockknock = require("knock-knock-jokes");
console.log("From app.js");
console.log(catMe());
console.log(knockknock());