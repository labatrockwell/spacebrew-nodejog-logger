// Connect to spacebrew
// Accept any type of data from spacebrew 
// log it
// and forward it along

var Jog = require('Jog');
var log = Jog(new Jog.FileStore('/tmp/tail')); 
var id = 0;

var WebSocket = require('ws');
var server = '10.0.1.11';
// var ws = {};
var ws = new WebSocket("ws://"+server+":9000");

var sbName = "spacelog";

var myConfig = {
  "config": {
    "name": sbName,
    "description": "This will log incoming data to a file called /tmp/tail for later use.",
    "publish": {
      "messages": [
      ]
    },
    "subscribe": {
      "messages": [
        {
          "name": "booleanData",
          "type": "boolean"
        },
        {
          "name": "rangeData",
          "type": "range"
        },
        {
          "name": "stringData",
          "type": "string"
        }
      ]
    }
  }
};

ws.onopen = function() {
  console.log("WebSockets connection opened");
  // send my config
  ws.send(JSON.stringify(myConfig));
}

ws.onmessage = function(e) {
    console.log("Got WebSockets message: " + e.data);
    var tMsg = JSON.parse(e.data);
    var tName = tMsg.message.name;
    var tType = tMsg.message.type;
    var tValue = tMsg.message.value;
    log.info( { id: ++id, user: sbName, name: tName, sbtype: tType, value: tValue } );

}

ws.onclose = function() {
    console.log("WebSockets connection closed");
}

ws.onerror = function(e) {
  console.log("onerror ", e);

}

// tail the json "documents"
log.stream({ end: false, interval: 500 })
  .on('data', function(obj){
    console.log(obj);
  });


