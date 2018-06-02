/*******************************************
* Author: Jonathan Perry
* Date: 10/16/17
* Assignment: CS 290 - Ajax Interactions
*******************************************/
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
    var appID = '&appid=4917cc7f7342a72f2c84f306da69cc7e';
    var rootURL = 'http://api.openweathermap.org/data/2.5/weather?';
    var param = ""; // holds the value of the parameters to search by city/zipcode
    document.getElementById('urlSubmit').addEventListener('click', function(event){
        var sendBy = document.querySelector('select[id="mySelection"]'); // get the value of the current drop down selection
        if(sendBy.value == "city") param = "q="; // Are we searching by city?
        else param = "zip="; // or by zipcode?
        param += document.getElementById("location").value;
        handleRequest(rootURL + param + appID);
        event.preventDefault();
    });
}
function httpRequest(url, method, setHeader, payload){
    return new Promise(function(succeed, fail){
        var req = new XMLHttpRequest();
        req.open(method, url, true);
        if (setHeader) req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener("load", function(){
            if(req.status < 400) succeed(req.responseText);
            else fail(new Error("Request failed: " + req.statusText));
        });
        req.addEventListener("error", function(){
            fail(new Error("Network Error"));
        });
    if(payload !== undefined) req.send(JSON.stringify(payload)); // do we have a payload to send?
    else req.send(null);
    });
}
function handleRequest(targetURL, payload){
    httpRequest(targetURL, 'GET', false).then(function(text){
        showResponse(JSON.parse(text));
    },function(error){
        alert("Request failed due to the following error: \n" + error);
    }); 
}
function showResponse(response){
    document.getElementById('city').innerHTML = "Today's Forecast For: " + response.name;
    document.getElementById('temp').textContent = response.main.temp;
    document.getElementById('humidity').textContent = response.main.humidity;
    document.getElementById('pressure').textContent = response.main.pressure;
    document.getElementById('high').textContent = response.main.temp_max;
    document.getElementById('low').textContent = response.main.temp_min;
}