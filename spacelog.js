// Connect to spacebrew
// Accept any type of data from spacebrew 
// log it
// and forward it along

var Jog = require('Jog');
var WebSocket = require('ws');

var data = {};
data.file = "tail";
data.id = 0;

var sb = {};
sb.server = '127.0.0.1';
sb.name = "spacelog";
sb.desc = "This will log incoming data to a file called /tmp/tail for later use.";

if (process.argv.length > 2) {
  for ( var i = 2; i < process.argv.length; i ++ ) {
    var expression = /([-a-zA-Z]+)=([-a-zA-Z0-9\.]+)/;
    var m = process.argv[i].match(expression);
    if (m) {
      if (m[1] == "server") { 
        sb.server = m[2];
        console.log("set server hostname: " + sb.server);
      }
      else if (m[1] == "name") {
        sb.name = m[2];
        console.log("set app name: " + sb.name);
      }
      else if (m[1] == "file") {
        data.file = m[2];
        console.log("set file name: " + data.file);
      }
    }
  }
}

sb.config = {
  "config": {
    "name": sb.name,
    "description": sb.desc,
    "publish": {
      "messages": []
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

data.path = require('path').resolve(__dirname, ('tmp/' + data.file + '.dat'));
data.log = Jog(new Jog.FileStore(data.path)); 

sb.conn = new WebSocket("ws://"+sb.server+":9000");  

sb.conn.onopen = function() {
  console.log("WebSockets connection opened");
  // send my config
  sb.conn.send(JSON.stringify(sb.config));
}

sb.conn.onmessage = function(e) {
    console.log("Got WebSockets message: " + e.data);
    var tMsg = JSON.parse(e.data);
    var tName = tMsg.message.name;
    var tType = tMsg.message.type;
    var tValue = tMsg.message.value;
    data.log.info( { data: ++data.id, user: sb.name, name: tName, sbtype: tType, value: tValue } );

}

sb.conn.onclose = function() {
    console.log("WebSockets connection closed");
}

sb.conn.onerror = function(e) {
  console.log("onerror ", e);

}

// When the "error" event is emitted for the spacebrew connection, this is called
sb.conn.on("error", function(error) {
  console.log("+++++++ ERROR +++++++");
  console.error(error);
});

// tail the json "documents"
data.log.stream({ end: false, interval: 500 })
  .on('data', function(obj){
    console.log(obj);
  });


