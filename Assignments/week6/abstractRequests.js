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
        makeRequest(rootURL, param, appID);
        event.preventDefault();
    });
}
function httpRequest(url, method, setHeader){
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
    req.send(null);
    });
}
function makeRequest(rootURL, param, appID){
    httpRequest(rootURL + param + appID, 'GET').then(function(text){
        showResponse(JSON.parse(text));
    },function(error){
        alert("Request failed due to the following error: \n" + error);
    }); 
}
function showResponse(response){
    document.getElementById('city').textContent = response.name;
    document.getElementById('main').textContent = response.main.temp;
    document.getElementById('description').textContent = response.weather;
}



