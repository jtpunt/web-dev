
/*******************************************
* Author: Jonathan Perry
* Date: 10/14/17
* Assignment: CS 290 - JavaScript Functions
*******************************************/

// The function 'printText' is declared before it is called.
printText("This is only a test.");
/************************************************************** 
* This works because of function hoisting in JavaScript
* where hoisting moves the function declaration to the
* the top of the current scope so that functions can be
* called before they are declared.
**************************************************************/ 
function printText(text){
	console.log(text);
}
/********************************************************************************************
* Anonymous functions are executable statements that's created during runtime.
* Because of this, if you want to call an anonymous function that is assigned to a variable,
* you must have the function declaration placed before the call itself to that function or
* this will result in an error. Uncomment the line below to see this runtime error.
********************************************************************************************/
//console.log(squareRoot(9));
var squareRoot = function(num){
	return Math.sqrt(num);
}
console.log(squareRoot(9));