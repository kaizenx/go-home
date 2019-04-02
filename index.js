var schedule = require('node-schedule');
const https = require('https');
var fs = require("fs");

// const data = require('./results.json')
// // var obj = JSON.parse(data.routes.legs)
// console.log(data.routes[0].legs[0].duration.value)


var j = schedule.scheduleJob('*/5 * * * *', function (fireDate) {
  console.log('Checking traffic conditions at ' + fireDate);
  var request = require("request");
  fs.readFile("results.json", function (err, buf) {
    var results = buf.toString()
  });
  
  var options = {
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/directions/json',
    qs:
    {
      destination: 'jalan%20sentul%20indah',
      mode: 'driving',
      key: 'AIzaSyClbupkhkNfOPqJmJDqofNReRibuT1pK5o',
      origin: 'bukit%20damansara'
    },
    headers:
    {
      'Postman-Token': '1fd9110a-b562-4402-8f1f-0b95c343ee54',
      'cache-control': 'no-cache'
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    const results = JSON.parse(body)
    console.log(results.routes[0].legs[0].duration.value)
  });


});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
});