var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
    
mongoose.connect("mongodb://localhost/auth_demo_app");
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
/*********************************************************************
 * Secret is used to encode/decode the sessions. We aren't going to be
 * storing data inside the sessions, it's going to be encoded. This secret
 * below will be used to unencode/decode that info in the session.
 ********************************************************************/
app.use(require("express-session")({ // in-line request
    secret: "Rusty is the best and cutest dog in the world",
    resave: false, // required by default
    saveUninitialized: false // required by default
}));
/*********************************************************************
 * This code sets passport up so that it works in our application.
 * We need these 2 methods anytime we need these two lines anytime we
 * are going to use passport.
 *********************************************************************/
app.use(passport.initialize());
app.use(passport.session());
/*******************************************************************************
 * These are responsible for reading the session, taking the data from 
 * the session that's encoded and un-encoding it (that's the deserialized part).
 * and then encoding it, serializing it and putting it back in the session
 * (which is what serializeUser does)
 *******************************************************************************/
passport.use(new LocalStrategy(User.authenticate())); // UserSchema.plugin(passportLocalMongoose);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/**********
 * ROUTES
 *********/
app.get("/", function(req, res){
    res.render("home");
});
// when a req is made, it'll run isLoggedIn first
// next() refers to the function(req, res){...}) below
app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

// Auth Routes
// Show sign up form
app.get("/register", function(req, res){
    res.render("register");
});
// Handling user sign up
app.post("/register", function(req, res){
    /***********************************************************************
     * We create a new user object with just the username data from the form
     * You don't actually save the password to the database, you pass the password 
     * as a second argument to User.register. User.register will take this new user
     * that has a username and then hash that password - it'll turn it into a huge 
     * string of numbers and letters and stores that into the database. If everything
     * goes well, it will return a new user that contains the username and the hashed 
     * password.
     ***************************************************************************/
    var newUser = new User({username: req.body.username});
    console.log(newUser);
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});
// LOGIN ROUTES
// Render login form
app.get("/login", function(req, res){
    res.render("login");
});
// login logic
/**************************************************************
 * middleware - code that runs before our final route callback
 * it sits between the begeinning of your route and at the end 
 * of your route (which is the route handler).
 * passport.authenticate - takes the username/password from the 
 * request body and compares the password the user entered to the
 * hashed password in the database. 
 **************************************************************/
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}),function(req, res){
});
app.get("/logout", function(req, res) {
    // logout() - Passport is destorying all user data in the session.
    req.logout();
    res.redirect("/");
});
// next - the next function to be called
function isLoggedIn(req, res, next){ 
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started.......");
})