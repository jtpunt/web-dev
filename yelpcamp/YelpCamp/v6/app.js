var express       = require("express"),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds"),
    app           = express();

mongoose.connect("mongodb://localhost/yelp_camp_v6", {useMongoClient: true});
seedDB(); // reset the db and load test data

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
// console.log(__dirname);
app.set('view engine', 'ejs');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// w/e function we provide to it will be called on every route
app.use(function(req, res, next){
    // w/e we put in res.locals is what's available inside of our template
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function(req, res){
    // The render command by default will look for files in a folder called views
    res.render("landing");
});
// INDEX ROUTE - show all campgrounds
app.get("/campgrounds", function(req, res){
    console.log(req.user);
    // Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err) 
            console.log(err);
        else 
            res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user});
    });
});
// CREATE - add new campgrounds to database
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, addedCampground){ 
        if(err){
            console.log(err);
        }else{
            console.log("NEWLY CREATED CAMPGROUND: ");
            console.log(addedCampground); 
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});
// NEW - Show form to create new campground
app.get("/campgrounds/new", function(req, res) {
   res.render("campgrounds/new"); 
});
// SHOW - Shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    // Find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err)
            console.log(err);
        else{
            console.log(foundCampground);
              // Render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
// =========================
// COMMENTS ROUTES
// =========================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err)
            console.log(err);
        else
            res.render("comments/new", {campground: campground});
    });
});
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    // look up campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err)
            console.log(err);
        else{
            // create new comment
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if(err)
                    console.log(err);
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
        
    });
  // connect new comment to campground
  // redirect campground show page
});
/****************
 * AUTH ROUTES
 ***************/
app.get("/register", function(req, res) {
    res.render("register");
});
// handle sign up logic
app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        // log the user in after creating them in the database
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});
// show login form
app.get("/login", function(req, res) {
    res.render("login");
});
// handling login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
});

// logic route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started.......");
});