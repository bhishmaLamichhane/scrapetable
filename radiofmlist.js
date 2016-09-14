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
for (i = 2; i < rowLength - 1; i++){
   //gets cells of current row
   var result_hash = {};
   var cellVal = oTable.rows[i];
   
   var sn = cellVal.getElementsByTagName('td')[0].innerHTML.trim().replace(/<\/?[^>]+(>|$)/g, ""),
       fmname = cellVal.getElementsByTagName('td')[1].innerHTML.trim().replace(/<\/?[^>]+(>|$)/g, ""),
       district = cellVal.getElementsByTagName('td')[2].innerHTML.trim().replace(/<\/?[^>]+(>|$)/g, ""),
       mhz = cellVal.getElementsByTagName('td')[3].innerHTML.trim().replace(/<\/?[^>]+(>|$)/g, ""),
       watts = cellVal.getElementsByTagName('td')[4].innerHTML.trim().replace(/<\/?[^>]+(>|$)/g, "");
   result_hash[ "sn"] = sn.replace(/&nbsp;/g, "");
   result_hash[ "fmname"] = fmname.replace(/&nbsp;/g, "");
   result_hash[ "district"] = district.replace(/&nbsp;/g, "");
   result_hash[ "mhz"] = mhz.replace(/&nbsp;/g, "");
   result_hash[ "watts"] = watts.replace(/&nbsp;/g, "");
   var contact = cellVal.getElementsByTagName('td')[5].innerHTML.trim();
   contact = contact.replace(/<\/?[^>]+(>|$)/g, "");//replace tags to ''
   contact = contact.replace(/&nbsp;/g, "");//replace &nbsp; to ''
   result_hash[ "contacts"] = JSON.stringify(contact);

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
