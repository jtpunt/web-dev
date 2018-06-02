
/*******************************************
* Author: Jonathan Perry
* Date: 10/16/17
* Assignment: CS 290
*******************************************/
/* Create a function which will sum an array of integers.
*  [1,2,3].forEach(foo) will call the function foo 3 times,
*  passing the arguments 1,2, and 3 respectively.
*  Objective: Use a higher-order function to achieve this
*  and do not simply directly loop through the array to
*  sum it.
*/
function sumArr(arr){
	var sum = 0;
	arr.forEach(function(v){
		sum += v;
	});
	return sum;
}
console.log(sumArr([1,2,3,4]));
/* Write a function which creates dialog functions.
*  It should take a character name as an argument. It should
*  return a function which takes a line of dialog and
*  return a string which quotes it and adds the reference to
*  the speaker. For example:
*  		var Donald = { name: "Donald Duck"};
*  		Donald.speak = dialog("Donald Duck");
*  		console.log(Donald.speak("Hello there"));
*/

var dialog = function(myChar){
	return function(speech){
		return speaker + " says \"" + "\"";
	}
}
var Donald = { name: "Donald Duck"};
Donald.speak = dialog("Donald Duck");
console.log(Donald.speak("Hello there"));