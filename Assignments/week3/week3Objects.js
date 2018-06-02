
/*******************************************
* Author: Jonathan Perry
* Date: 10/14/17
* Assignment: CS 290 - JavaScript Objects
*******************************************/
function deepEqual(obj1, obj2){
	// RETURNS TRUE only if the two values are the same value
	// OR are objects with the same properties whos values
	// are also equal when compared with a recursive call to deepEqual
	for(prop in obj1){

	}

	// IF IT produces "object" for both values, do a deep comparison

	// LASTLY, take account that typdeof null produces "object"

	if(typeof(obj1) == "object" && typeof(obj2) == "object") && (obj1 != null && obj2 != null){
		//return obj1 === obj2;
		if(Object.keys(obj1).length != Object.keys(obj2).length){
			return false;
		}

	}
	else if(obj1 !== obj2){
		return false;
	}
	else{
		return true;
	}
}

var obj = {
	here: {is: "an"},
	object: 2
};

console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, 
	{
		here: 1, 
		object: 2
	}));
// → false
console.log(deepEqual(obj, 
	{
		here: {is: "an"}, 
		object: 2
	}));
// TRUE
function deepEqual(obj1, obj2){
	// Are the types of the arguments received both objects and not equal to null?
	if (typeof(obj1) === 'object' && obj1 != null && typeof(obj2) === 'object' && obj2 != null){
		// Do both objects have the same number of properties?
		if (Object.keys(obj1).length != Object.keys(obj2).length)
			return false; // objects do not have the same number of properties
		// Loop through each property of both objects
		for (x in obj1){ 
			for (y in obj2)
				// RETURNS TRUE only if the two values are the same value
				// OR are objects with the same properties whos values
				// are also equal when compared with a recursive call to deepEqual
				return deepEqual(obj1[x], obj2[y]);
		}
	}else{ // The types of the arguments received are not objects
		// Do the values received equal each other and are of the same type?
		return obj1 === obj2;
	}
}
