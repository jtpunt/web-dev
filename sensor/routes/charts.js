var express    = require("express"),
    Chart     = require("../models/chart"),
    router     = express.Router();

router.get("/", function(req, res){
    Chart.find({}, {"_id" : false}, function(err, chart){ //remove _id from query result
        if(err) console.log(err);
        else{
          chart.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
          });
          res.render("charts", {charts: chart, scripts: ["/static/js/drawCharts.js"]});
        }
    });
});
module.exports = router;
