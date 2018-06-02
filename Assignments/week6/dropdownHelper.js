/*******************************************
* Author: Jonathan Perry
* Date: 10/16/17
* Assignment: CS 290 - Ajax Interactions
*******************************************/
document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('select[id="mySelection"]').onchange=changeEventHandler;
    var myNode = document.getElementById("help");
    myNode.innerText = "Enter in Zipcode"; 
    },false);

function changeEventHandler(event) {
    var myNode = document.getElementById("location");
    var selectValue = event.target.value; // current select value of dropdown menu
    var fields = document.querySelectorAll("input");
    var help = document.querySelector("#help"); 
    help.textContent = "Enter in " + selectValue.charAt(0).toUpperCase() + selectValue.slice(1); // capitalize first letter of select value from dropdown
    if(event.target.value === "city") myNode.placeholder = "E.G., Denver,CO"; // change the default display value for the textbox when city is selected
    else if(event.target.value === "zipcode") myNode.placeholder = "E.G., 76180"; // change the default display value for the textbox when zipcode is selected
}

var help = document.querySelector("#help");     
var fields = document.getElementById("location");
var dropdowns = document.getElementById("mySelection");
fields.addEventListener("focus", function(event){
    var text = event.target.getAttribute("data-help");
    help.textContent = text;
});
fields.addEventListener("blur", function(event){
    help.textContent = "";
});

var myNode = document.getElementById("location");
myNode.placeholder = "Search by City or Zipcode";
