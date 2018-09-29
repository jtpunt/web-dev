var express    = require("express"),
    dhtSensor  = require('node-dht-sensor'),
    async      = require("asyncawait/async"),
    await      = require("asyncawait/await"),
    Sensor     = require("../models/sensor"),
    router     = express.Router();
// var passport = require("passport");
// root route
router.get("/", function(req, res){
    getSensors(function(sensors){
        (async (function getReadings(){
            var arr = [];
            sensors.forEach(function(mySensor){
                const myPin = await (readSensor(mySensor.pin, mySensor.sensor, mySensor.pin));
;               console.log(myPin, " myPin");
                arr.push(myPin);
            });
            res.render("index", {sensors: arr});
        }))();
    });
    // The render command by default will look for files in a folder called views
});

function readSensor(dbID, sensor, pin){
    return new Promise(resolve => {
        dhtSensor.read(11, pin, function(err, temperature, humidity){
            if(!err){
                var context = {};
                console.log("pin ", pin, "temp: ", temperature.toFixed(1), " humidity: ", humidity.toFixed(1));
                context._id = dbID;
                context.temperature = temperature.toFixed(1);
                context.humidity = humidity.toFixed(1);
                resolve(context);
            }
        });
    });
}
function getSensors(_callback){
    Sensor.find({}, function(err, sensors){
        if(err) console.log(err);
        else{
            _callback(sensors);
        }
    });
}
module.exports = router;