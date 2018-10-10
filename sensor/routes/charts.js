var express    = require("express"),
    Chart     = require("../models/chart"),
    router     = express.Router();

router.get("/", function(req, res){
	Chart.find({}, function(err, chart){
        if(err) console.log(err);
        else{
            //console.log(chart);
            res.render("charts", {charts: chart});
        }
    });
});
module.exports = router;
