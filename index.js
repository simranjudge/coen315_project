var express = require('express');
var app = express();
var path = require("path");
const url = 'http:\/\/api.bart.gov/api';
const key = 'key=MW9S-E7SL-26DU-VV8V';
const format_json = 'json=y';
const http = require('http');

var fs = require('fs');
//console.log(path.join(__dirname, "img"));
console.log(process.cwd());
//app.use(express.static(path.join(__dirname, 'img'))); //  "public" off of current is root
app.use("/img", express.static(__dirname + '/img'));
app.use("/", express.static(__dirname + '/'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

global.waterLevel;
global.moistureLevel;
global.plantonetube = false;
global.planttwotube = false;
global.plantthreetube = false;


app.get('/', function (req, res) {
        fs.readFile('./index.html', function(err, html){
                if(err){
                        throw err;
                }
                res.writeHeader(200, {"Content-Type": "text/html"});
                res.write(html);
                res.end();
        });
})

app.post('/currentWaterLevel', function (request, response){
    //receive post request with current water level from the ESP8266 Server
    //parse request to get water level value (in JSON?)
    //store waterlevel in waterLevel variable
})

app.post('/plantOneTube', function (request, response){
    //receive post request from watering tube going into plant one
    //store data in plantonetube variable
    plantonetube = request.body;
})

app.post('/plantTwoTube', function (request, response){
    //receive post request from watering tube going into plant two
    //store data in planttwotube
})

app.post('/plantThreeTube', function (request, response){
    //receive post request from watering tube going into plant one
    //store data in plantthreetube
})

app.get('/currentWaterLevel', function (request, response){
    //returns value of currentWaterLevel

})

app.get('/waterThreshold1', function (request, response){

})

app.get('/waterThreshold2', function (request, response){

})

app.get('/moistureThreshold', function(request, response){

})

var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
