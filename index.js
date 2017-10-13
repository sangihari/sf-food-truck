var apiKey = require('./config.json').app_token
var request = require('request');
var columnify = require('columnify');

function GetSortOrder(prop) {
    return function(a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

request.get("https://data.sfgov.org/resource/bbb8-hzi6.json?$$app_token=" + apiKey + "&$limit=10",function(error,response,body){
    if (!error && response.statusCode == 200) {
        var data = response.body;
        var result = [];
        var result = JSON.parse(data);
        var arr = [];
        var columns = [];

        for(var x in result){
            arr.push(result[x]);
        }
        arr.sort(GetSortOrder('applicant')); //Pass the attribute to be sorted on

        for (var item in arr) {
            columns.push({'Name': arr[item].applicant,'Address': arr[item].location});
        }
        console.log(columnify(columns));
    }
    else {
        console.log(error);
    }

});