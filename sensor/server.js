var express        = require("express"),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    sensor         = require('node-dht-sensor'),
    Sensor         = require("./models/sensor"),
    Chart          = require("./models/chart"),
    seedDB         = require("./seed"),
    schedule       = require('node-schedule'),
    http          = require('http');
    app            = express();
// requiring routes
var indexRoutes   = require("./routes/index"),
    sensorRoutes  = require("./routes/sensors"),
    chartRoutes   = require("./routes/charts");

var lightsOn = schedule.scheduleJob('09 20 * * *', function(){
    http.get("http://192.168.1.129:5000/", (resp)=> { console.log(resp)});
});
var lightsOff = schedule.scheduleJob('00 14 * * *', function(){
    http.get("http://192.168.1.129:5000/", (resp)=> { console.log(resp)});
});
mongoose.connect("mongodb://jtpunt:1ch33s31@ds219191.mlab.com:19191/dht-sensors", function(err){
    if(err){
        console.log("Error connecting to mongodb", err);
    }else{
        console.log("No errors occured");
    }
});
// seedDB();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(__dirname + "/public"));
app.use('/static', express.static('public')); // static directory is going to be our directory called public
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(methodOverride("_method")); // _method is what we are telling it to look for
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// w/e function we provide to it will be called on every route
app.use(function(req, res, next){
    // w/e we put in res.locals is what's available inside of our template
    res.locals.currentUser = req.user;
    next();
});
// Shortens the route declarations
app.use("/", indexRoutes);
app.use("/sensors", sensorRoutes);
app.use("/charts", chartRoutes);
var port = 8080;
app.listen(port,process.env.IP, function(){
    console.log("server started on port ", port); 
});
