var express    = require("express"),
    dhtSensor  = require('node-dht-sensor'),
    async      = require("asyncawait/async"),
    await      = require("asyncawait/await"),
    Sensor     = require("../models/sensor"),
    router     = express.Router();
    
router.get("/", function(req, res){
    getSensors(function(sensors){
        res.render("sensors", {sensors: sensors});
    });
});
router.post("/", function(req, res){
    Sensor.create({ sensor: req.body.model, pin: req.body.pin}, function(err, sensor){
        if(err) console.log(err);
        else{
            console.log(sensor, " created");
            sensor.save();
            getSensors(function(sensors){
                res.render("sensors", {sensors: sensors});
            });
        }
    });
});
//EDIT
router.get("/:sensor_id/edit", function(req, res){
    Sensor.findById(req.params.sensor_id, function(err, foundSensor){
        if(err) res.redirect("back");
        else{
            console.log(foundSensor);
            res.render("edit", {sensor: foundSensor});
        }
    });
});
router.delete("/:sensor_id", function(req, res){
    Sensor.findByIdAndRemove(req.params.sensor_id, function(err){
        if(err) res.redirect("back");
        else{
            getSensors(function(sensors){
                res.render("sensors", {sensors: sensors});
            });
        }
    });
});
function getSensors(_callback){
    Sensor.find({}, function(err, sensor){
        if(err) console.log(err);
        else{
            _callback(sensor);
        }
    });
}
module.exports = router;