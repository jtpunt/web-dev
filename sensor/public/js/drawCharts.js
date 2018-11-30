function setChartHandler(chart, data, title){
    var mySelect = document.getElementById('mySelect');
    mySelect.addEventListener("change", function(){
        var today = new Date();
        if(this.value === "Yesterday"){ 
            options.hAxis.viewWindow.min = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1); // Displays all of yesterday's temperature + humidity readings that occured between 12am and 12pm
            options.hAxis.viewWindow.max = new Date(today.getFullYear(), today.getMonth(), today.getDate());  
        }else if(this.value === "Today"){
            options.hAxis.viewWindow.min = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Displays all of today's temperature + humidity readings that occured between 12am and 12pm
            options.hAxis.viewWindow.max = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        }else if(this.value === "Week"){
            var dayOfWeek = today.getDay(); // g
            options.hAxis.viewWindow.min = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek); // Returns the day of the week (from 0 to 6). etc, Sunday is 0, Monday is 1,... Saturday is 6
            options.hAxis.viewWindow.max = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6 - dayOfWeek); // Returns the 
        }
        else if(this.value === "Month"){
            options.hAxis.viewWindow.min = new Date(today.getFullYear(), today.getMonth());
            options.hAxis.viewWindow.max = new Date(tempArr[tempArr.length - 1][0]);
        }else{
            options.hAxis.viewWindow.min = new Date(tempArr[0][0]);
            options.hAxis.viewWindow.max = new Date(tempArr[tempArr.length - 1][0]);
        }
        options.title=title;
        chart.draw(data, options);
    });
}
// if multi-line chart
//      add options below
//           curveType: 'function',
          // legend: { position: 'bottom' }

// how to tell the difference between the two? the amount of elements that are in the 2d array
// single-line chart data characteristics:
//      [[0..1]] - hold 2 elements - date and temp reading OR humid reading
// multi-line chart data characteristics:
//      [[0..2]] - holds 3 elements - date and temp reading AND humid reading
function drawChart(ele, title, readings) {
    google.charts.load('current', {'packages':['corechart'], callback: function(){
        var arrLen = readings[0].length; 
        if(arrLen == 2){ // single-line chart
            var data = new google.visualization.DataTable();
            data.addColumn('datetime', 'Time of Day');
            data.addColumn('number', title);
            data.addRows(readings);   
        }else if(arrLen == 3){ // multi-line chart
            console.log
            var data = google.visualization.arrayToDataTable(readings);
            options.curveType = 'function';
            options.legend = { position: 'bottom' };
        }
        var chart = new google.visualization.LineChart(document.getElementById(ele));
        options.title=title;
        chart.draw(data, options);
        setChartHandler(chart, data, title);
    }});
}