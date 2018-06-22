var express    = require('express'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    app        = express();
// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_all", {useMongoClient: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

Blog.create({
    title: "Test Blog",
    image: "https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559_960_720.jpg",
    body: "HELLO THIS IS A BLOG"
});
// RESTFUL ROUTES
app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err) console.log(err);
        else{
            res.render('index', {blogs: blogs});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Blog App started on port: ", process.env.PORT); 
});