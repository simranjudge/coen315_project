var express = require("express");
var app = express();
var path = require("path");
const url = "http://api.bart.gov/api";
const key = "key=MW9S-E7SL-26DU-VV8V";
const format_json = "json=y";
const http = require("http");
const { zip } = require("lodash");
var fs = require("fs");
var cors = require('cors');
app.use(cors());
//console.log(path.join(__dirname, "img"));
console.log(process.cwd());
//app.use(express.static(path.join(__dirname, 'img'))); //  "public" off of current is root
app.use("/img", express.static(__dirname + "/img"));
app.use("/", express.static(__dirname + "/"));
app.options('*', cors());
var  bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

global.resources = {
  waterLevels: [40],
  moistureLevels: [20, 40, 10],
  plantTubes: [1, 0, 1],
  lightBulbs: [0, 1, 1],
  lightSensors: [1, 0, 0]
};


app.post("/:resource", (req, res) => {
  console.log(req.body);
  vals = req.body.sensor.split(",");
  for(var i=0; i<vals.length; i++) { vals[i] = +vals[i]; } 
  //console.log(req);
  //finalVals = vals.length === 1 ? _.fill(Array(arrayLength), vals[0]) : vals; //handle waterLevel variable
  resources[req.params.resource] = vals;
});

app.get("/plants", (req, res) => {
  //Object.entries(resources).reduce((listOfPlants, [key, plantValues]) => {
  //  plantValues.forEach(([value, id]) => listOfPlants[id][key] = value));
  //  return listOfPlants;
  //},{});
  var myJSON = JSON.stringify(resources);
  res.send(myJSON); 
});

// [{...resourceNames},]
app.post("/", function(req, res){
	//console.log(req);
	console.log(req.body);
	res.send("got it");
});

app.get("/", function(req, res) {
  fs.readFile("./index.html", function(err, html) {
    if (err) {
      throw err;
    }
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  });
});


var server = app.listen(80, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

