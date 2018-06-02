
/*******************************************
* Author: Jonathan Perry
* Date: 10/16/17
* Assignment: CS 290
*******************************************/
function buildList(list){
    var result = [];
    for (var i = 0; i < list.length; i++){
        var item = 'item' + list[i];
        result.push(function(item, i){
        	return function(){ 
        		alert(item + ' ' + list[i]) 
        	}
        }(item, i)); // Push's left parenthesis closed here
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}
