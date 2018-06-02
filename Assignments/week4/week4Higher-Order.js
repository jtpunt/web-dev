
/*******************************************
* Author: Jonathan Perry
* Date: 10/16/17
* Assignment: CS 290
*******************************************/
function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
    this.logMe = function(bool) {
       var str = this.year + " " + this.make + " " + this.model;
       if (bool) str += " " + this.type;
       console.log(str);
    }
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){
    /*your code here*/
    var BreakLoop = {};
    var tempArr = array;
    do {
    	swapped = false;
    	try {
    		tempArr.forEach(function(value, i, arr){
    			if(arr[i+1] === undefined) throw BreakLoop; // This prevents going out of bounds of the array by breaking out of the forEach loop
    			if(comparator(arr[i], arr[i+1])){
      				var temp = arr[i];
      				arr[i] = arr[i+1];
      				arr[i+1] = temp;
      				swapped = true;
      			}
    		});
    	} catch(e){ if(e !== BreakLoop) throw e; } 
  	}while(swapped);
  	return tempArr;
}    

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    return int1 < int2;
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    /* your code here*/
    return auto1.year < auto2.year;
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    /* your code here*/
    return auto1.make.toLowerCase() < auto2.make.toLowerCase();
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    /* your code here*/
    var index1, index2;
    var myArray = ["sedan", "wagon", "suv", "pickup", "roadster"];
    myArray.forEach(function(carType, index){
    	    if(auto1.type.toLowerCase() === carType) index1 = index;
    	    if(auto2.type.toLowerCase() === carType) index2 = index;
    });
    if(index1 === index2) return yearComparator(auto1, auto2);
 	return index1 < index2;

}
function printArr(arr, bool) {
  arr.forEach(function(value, i, arr){
  	value.logMe(bool);
  });
}
/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */
console.log("*****");
console.log("The cars sorted by year are:");
printArr(sortArr(yearComparator, automobiles), false);
console.log("\nThe cars sorted by make are:");
printArr(sortArr(makeComparator, automobiles), false);
console.log("\nThe cars sorted by type are:");
printArr(sortArr(typeComparator, automobiles), true);
console.log("*****");