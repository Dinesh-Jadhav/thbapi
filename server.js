var express = require("express");
var app = express();
var request = require("request")
var cors = require("cors");
const cron = require("node-cron");
var cloudscraper = require('cloudscraper');

var final = [];

var counter = 0;

var url = "https://www.bloomberg.com/markets2/api/datastrip/USDTHB%3ACUR"

const PORT = process.env.PORT || 3000;
var listener = app.listen(PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Authorization, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.get("/all/", async function(req, res) {
  //counter++;
  //console.log(counter);
  //res.send(doStuff());

	// request.get({
	// 	"headers": {
	// 	    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  //   'accept-language': 'en-US,en;q=0.9',
  //   'cache-control': 'max-age=0',
  //   'upgrade-insecure-requests': '10',
  //   'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36' },
	// 	"url": "https://www.bloomberg.com/markets2/api/datastrip/USDTHB%3ACUR"
	// 	}, (error, response, body) => {
	//     if(error) {
	// 	return console.log(error);
	//     }
	//        // console.log(response);
	// 	console.log(body);
	// 	res.send(body);
	// });

  var options = {
  method: 'GET',
  url:'https://www.bloomberg.com/markets2/api/datastrip/USDTHB%3ACUR',
};

cloudscraper(options).then(function (htmlString) {
      console.log(htmlString);
      console.log("aasdkfjh");
      res.send(htmlString);
   }).catch(function (err) {
     console.log(err)
   })

});


function doStuff() {
  request({
  headers: {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'max-age=0',
    'upgrade-insecure-requests': '10',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
  },
      url: url,
      json: true
  }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          // console.log(response) // Print the json response
          var result = JSON.parse(JSON.stringify(response));
          // console.log(result.body[0]);
          final = [];
          final.push(result.body[0])
          // final.amount = result.body[0].price;
          // final.change = result.body[0].priceChange1Day;
          // final.percent = result.body[0].percentChange1Day;
      }
      console.log(final);
  })
  return final;
}
