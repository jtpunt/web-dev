var scores = [90,98,89,100,100,86,94];
var scores2 = [40,65,77,82,80,54,73,63,95,49];

function average(arr){
    var sum = 0; // accumulator variable
    arr.forEach(function(score){
        sum += score; // add all scores together
    });
    // divide by total number of scores and then round it
    return Math.round(sum/arr.length);
}
console.log("Average score for environmnet science");
console.log(average(scores));
console.log("Average score for organic chemistry");
console.log(average(scores2));