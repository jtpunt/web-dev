var express    = require("express"),
    Chart     = require("../models/chart"),
    router     = express.Router();

router.get("/", function(req, res){
    Chart.find({}, {"_id" : false}, function(err, chart){ //remove _id from query result
        if(err) console.log(err);
        else{
          chart.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
          });
          res.render("charts", {charts: chart, scripts: ["/static/js/drawCharts.js"]});
        }
    });
	// Chart.find({}, {"_id" : false}, function(err, chart){ //remove _id from query result
 //        if(err) console.log(err);
 //        else{
 //        	Chart.aggregate([{ "$group": { "_id": "$_refID", "total" : { "$sum": 1 }}}], // maybe instead of the refID, we sort by the pin #
 //   				 function(err,docs) {
 //      				if (err) console.log(err);
 //      					console.log( docs );
 //      					res.render("charts", {charts: chart, scripts: ["/static/js/drawCharts.js"]});
 //    		});
 //        }
 //    });
});
module.exports = router;
