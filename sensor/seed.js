var mongoose = require("mongoose");
var Sensor = require("./models/sensor");

var data = [
    { sensor: 11, pin: 2 },
    { sensor: 11, pin: 3 }
]

function seedDB(){
    console.log("seeding db");
    Sensor.remove({}, function(err){
        if(err) console.log(err);
        else console.log("no errors removing sensor");
        data.forEach(function(seed){
            Sensor.create(seed, function(err, sensor){
                console.log("sensor created..");
                if(err) console.log(err);
                else{
                    console.log("added a sensor");
                    // create a comment
                    sensor.save();
                }
            });
        });
    });
}

module.exports = seedDB;