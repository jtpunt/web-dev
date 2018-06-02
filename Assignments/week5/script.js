/*******************************************
* Author: Jonathan Perry
* Date: 10/16/17
* Assignment: CS 290 - 
*        DOM and Events
*******************************************/
/*******************************************
* This function uses the Document Object Model
* to create new elements in HTML. In this function,
* a table with a header,table body, and individual
* cell text is created with each table cell uniquely 
* identified.
********************************************/
function loadTable(){
    var table = document.createElement("table"); // create table
    var tHeader = table.createTHead(); // create table header
    var tBody = document.createElement('tbody');
    tBody.setAttribute("id", "tBody");
    table.setAttribute("border", "1");
    var hRow = tHeader.insertRow(0); // complete row set up for table header

    for(var i = 0; i < 3; i++){ // Create 4 rows
        var bRow = tBody.insertRow(i); // complete row set up for table body
        for(var k = 0; k < 4; k++){ // Create 4 nodes per row
            if(i === 0){ /* executes only if the outer loop is on it's first iteration so that only 
                4 inner loops execute to create each node/textNode for the table's header */
                var hNode = hRow.insertCell(k); // complete node set up for table header
                hNode.appendChild(document.createTextNode("Header " + (k+1)));
            }
            var nodeName = "row" + (i+1) + "col" + (k+1);
            var bNode = bRow.insertCell(k); // create node for row i col k
            bNode.setAttribute("id", nodeName); // set individual id's for each node
            bNode.appendChild(document.createTextNode((k+1) + "," + (i+1)));
        }
    }
    document.body.appendChild(table); // Append the table to the html's body tag
    table.appendChild(tBody); // append the table's body to our table
}
/*******************************************
* In this function, 5 buttons are created 
* with individual onclick functions for moving
* on screen across the table amd the first cell
* the user starts at when the page loads is 
* "selected".
********************************************/
function loadButtons(){
    var body = document.body;
    var buttonsMovements = ["Move Up", "Move Down", "Move Left", "Move Right", "Mark Node"];
    var selectedNode = document.getElementById("row1col1");
    selectedNode.style.border = "3px solid black"; // top-left non-header node which is "selected"

    var myButton = buttonFunctions();
    buttonsMovements.forEach(function(movements){
        var button = document.createElement("button");
        button.appendChild(document.createTextNode(movements));
        body.appendChild(button);
        button.addEventListener("click", function() {
            myButton(movements); 
        });
     });
}
/*******************************************
* This function contains functions needed 
* for keeping track of the current cell that 
* is "selected", checking to see which button 
* was used to call this function, updating the
* past cell we were just on so that they're 
* no longer "selected", and changing the color
* the current cell to yellow after the "Mark Node"
* button has been clicked.
********************************************/
function buttonFunctions(){
    var rootNode = getRootNode();
    var currentNode = rootNode.children[0].children[0]; // brings us to the top-left non-header node
    var updateNodeColor = function(myNode){
        currentNode.style.backgroundColor = "yellow";
    }
    var updateNode = function(myNode){
        if(myNode !== -1){ // Did we make a valid movement?
            currentNode = myNode; // update currentNode
            currentNode.style.border = "3px solid black";  // update node so it is "selected"
        }else{ // we did not make a valid movement - currentNode is not updated
            currentNode.style.border = "3px solid black"; // update node again so it is "reselected"
            console.log("Out of bounds error caught!"); // notify user that an error has occured
        }
    }
    var checkButton = function(myButton) {
        switch(myButton){
            case "Move Up":
                updateNode(getNodeAbove(currentNode));
                break;
            case "Move Down":
                updateNode(getNodeBelow(currentNode));
                break;
            case "Move Left":
                updateNode(getNodeLeft(currentNode));
                break;
            case "Move Right":
                updateNode(getNodeRight(currentNode));
                break;
            case "Mark Node":
                updateNodeColor(currentNode);
                currentNode.style.border = "3px solid black";
                break;
        }
    };
    var buttonCall = function(myButton) {
        currentNode.style.border = "1px solid black";  
        checkButton(myButton);
    }
    return buttonCall;
}
/**************************************
* DOM Navigation and Search Functions
***************************************/
function getRootNode(){
    return document.getElementById("tBody");
}
function getRow(rowNum){
    if(rowNum < 0 || rowNum > 2) return -1; 
    var rootNode = getRootNode();
    return rootNode.children[rowNum];
}
function getNode(rowNum, colNum){
    if(rowNum < 0 || rowNum > 2) return -1; // 3 rows maximum
    if(colNum < 0 || colNum > 3) return -1;  // 4 columns maximum each row
    return getRow(rowNum).children[colNum]; 
}
function getChildrenLength(parent){
    return parent.children.length - 1;
}
function getColIndex(node){
    var rowParent = node.parentNode;
    for (var i = 0; i <= getChildrenLength(rowParent); i++) {
        if (rowParent.children[i] === node)
            return i;
    }
}
function getRowIndex(node){
    var rowParent = node.parentNode;
    var rootNode = getRootNode();
    for (var i = 0; i <= getChildrenLength(rowParent); i++) {
        if (rootNode.children[i] === rowParent)
            return i;
    }
}
function getNodeAbove(node){
    var rowIndex = getRowIndex(node);
    var colIndex = getColIndex(node);
    if(rowIndex === -1 || colIndex === -1) return -1;
    return getNode(rowIndex - 1, colIndex);
}
function getNodeBelow(node){
    var rowIndex = getRowIndex(node);
    var colIndex = getColIndex(node);
    if(rowIndex === -1 || colIndex === -1) return -1;
    return getNode(rowIndex + 1, colIndex);
}
function getNodeLeft(node){
    if (node.previousSibling) return node.previousSibling;
    return -1;
}
function getNodeRight(node){
    if(node.nextElementSibling) return node.nextElementSibling;
    return -1;
}
loadTable();
loadButtons();