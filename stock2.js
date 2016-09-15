function CSV(array) {
    // Use first element to choose the keys and the order
    var keys = Object.keys(array[0]);

    // Build header
    var result = keys.join(",") + "\n";

    // Add the rows
    array.forEach(function(obj){
        keys.forEach(function(k, ix){
            if (ix) result += ",";
            result += obj[k];
        });
        result += "\n";
    });

    return result;
}
var oTable = document.getElementsByTagName('tbody')[0];

//gets rows of table
var rowLength = oTable.rows.length;
var result_array = [];

//loops through rows
for (i = 2; i < rowLength; i++){
   //gets cells of current row
   var result_hash = {};
   var cellVal = oTable.rows[i];

   
   result_hash[ "stock_name"] = cellVal.getElementsByTagName('td')[2].innerHTML.trim();
   result_hash[ "stock_symbol"] = cellVal.getElementsByTagName('td')[3].innerHTML.trim();
   result_hash[ "sector"] = cellVal.getElementsByTagName('td')[4].innerHTML.trim();
   result_array.push(result_hash);
}
var csvfile = CSV(result_array);
var encodedUri = encodeURI("data:text/csv;charset=utf-8,"+csvfile);
//window.open(encodedUri,final.csv);   this wasn't done as the output filename couldn't be changed with this method !
var downloadLink = document.createElement("a");
downloadLink.href = encodedUri;
downloadLink.download = "data.csv";

document.body.appendChild(downloadLink);
downloadLink.click();                   //for exporting the csv file
document.body.removeChild(downloadLink);
$("a[rel=next]")[0].click();
