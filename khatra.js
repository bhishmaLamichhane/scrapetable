function CSV(array) {
  // Use first element to choose the keys and the order
  var keys = Object.keys(array[0]);

  // Build header
  var result = keys.join(",") + "\n";

  // Add the rows
  array.forEach(function(obj) {
    keys.forEach(function(k, ix) {
      if (ix) result += ",";
      result += obj[k];
    });
    result += "\n";
  });

  return result;
}
for (var a = 1; a < 15; a++) { //here a<= max page no in pagination bar
  var your_url = 'http://www.nepalstock.com/main/floorsheet/index/' + a + '/id/desc/';
  var text = "";
  jQuery.ajax = (function(_ajax) {

    var protocol = location.protocol,
      hostname = location.hostname,
      exRegex = RegExp(protocol + '//' + hostname),
      YQL = 'http' + (/^https/.test(protocol) ? 's' : '') + '://query.yahooapis.com/v1/public/yql?callback=?',
      query = 'select * from html where url="{URL}" and xpath="*"';

    function isExternal(url) {
      return !exRegex.test(url) && /:\/\//.test(url);
    }

    return function(o) {

      var url = o.url;

      if (/get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url)) {

        // Manipulate options so that JSONP-x request is made to YQL

        o.url = YQL;
        o.dataType = 'json';

        o.data = {
          q: query.replace(
            '{URL}',
            url + (o.data ?
              (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data) :
              '')
          ),
          format: 'xml'
        };

        // Since it's a JSONP request
        // complete === success
        if (!o.success && o.complete) {
          o.success = o.complete;
          delete o.complete;
        }

        o.success = (function(_success) {
          return function(data) {

            if (_success) {
              // Fake XHR callback.
              _success.call(this, {
                responseText: data.results[0]
                  // YQL screws with <script>s
                  // Get rid of them
                  .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
              }, 'success');
            }

          };
        })(o.success);

      }

      return _ajax.apply(this, arguments);

    };

  })(jQuery.ajax);

  $.ajax({
    url: your_url,
    type: 'GET',
    success: function(res) {
      text = res.responseText;
      debugger
      // then you can manipulate your text as you wish
      var anchors = $('<div/>').append(text).find('tbody').get();
      var oTable = anchors[0];
      //gets rows of table
      var rowLength = oTable.rows.length;
      var result_array = [];

      //loops through rows
      for (i = 2; i < rowLength - 4; i++) {
        //gets cells of current row
        var result_hash = {};
        var cellVal = oTable.rows[i];


        result_hash["sn"] = cellVal.getElementsByTagName('td')[0].innerHTML.trim();
        result_hash["contact_no"] = cellVal.getElementsByTagName('td')[1].innerHTML.trim();
        result_hash["stock_symbol"] = cellVal.getElementsByTagName('td')[2].innerHTML.trim();
        result_hash["buyer_broker"] = cellVal.getElementsByTagName('td')[3].innerHTML.trim();
        result_hash["seller_broker"] = cellVal.getElementsByTagName('td')[4].innerHTML.trim();
        result_hash["quantity"] = cellVal.getElementsByTagName('td')[5].innerHTML.trim();
        result_hash["rate"] = cellVal.getElementsByTagName('td')[6].innerHTML.trim();
        result_hash["amount"] = cellVal.getElementsByTagName('td')[7].innerHTML.trim();
        result_array.push(result_hash);
      }
      var csvfile = CSV(result_array);
      var encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvfile);
      //window.open(encodedUri,final.csv);   this wasn't done as the output filename couldn't be changed with this method !
      var downloadLink = document.createElement("a");
      downloadLink.href = encodedUri;
      downloadLink.download = "data.csv";

      document.body.appendChild(downloadLink);
      downloadLink.click(); //for exporting the csv file
    }
  });

  // var parser = new DOMParser()
  //   , doc = parser.parseFromString(text, "text/html");

  // var oTable = doc.getElementsByTagName('tbody')[0];
}