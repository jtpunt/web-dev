/*******************************************
* Author: Jonathan Perry
* Date: 10/16/17
* Assignment: CS 290 - AJAX Interactions
*******************************************/
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
    var rootURL = 'http://httpbin.org/post';
    document.getElementById('urlSubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var payload = {'firstName':null, 'lastName':null, 'dob':null};
        payload.firstName = document.getElementById('firstName').value; 
        payload.lastName = document.getElementById('lastName').value; 
        payload.dob = document.getElementById('dob').value; 
        handleRequest(rootURL, payload);
        event.preventDefault();
    });
}   
function httpRequest(url, method, setHeader, payload){
    return new Promise(function(succeed, fail){
        var req = new XMLHttpRequest();
        req.open(method, url, true);
        if (setHeader) req.setRequestHeader('Content-Type', 'application/json'); // true - set request header
        req.addEventListener("load", function(){
            if(req.status < 400) succeed(JSON.parse(JSON.parse(req.responseText).data));
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
    httpRequest(targetURL,'POST', true, payload).then(function(text){ // true - set request header
        showResponse(text);
    },function(error){
        alert("Request failed due to the following error: \n" + error);
    }); 
}
function showResponse(response){
    document.getElementById('fName').textContent = response.firstName;
    document.getElementById('lName').textContent = response.lastName;
    document.getElementById('dobSpan').textContent = response.dob;
}