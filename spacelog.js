// Connect to spacebrew
// Accept any type of data from spacebrew 
// log it
// and forward it along

var WebSocket = require('ws');
var server = '127.0.0.1';
var ws = new WebSocket("ws://"+server+":9000");


var myConfig = {
"config": {
 "name": "spacelogger",
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
    log.info(e.data, { id: ++id, user: 'spacelogger', name: tName, sbtype: tType, value: tValue });

}

ws.onclose = function() {
    console.log("WebSockets connection closed");
}


var jog = require('jog')
  , log = jog(new jog.FileStore('/tmp/tail'))
  , id = 0;


// tail the json "documents"
log.stream({ end: false, interval: 500 })
  .on('data', function(obj){
    console.log(obj);
  });


