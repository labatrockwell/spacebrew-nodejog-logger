// Connect to spacebrew
// Accept any type of data from spacebrew 
// log it
// and forward it along

var Jog = require('Jog');
var WebSocket = require('ws');

var fileName = "tail";
var logId = 0;

var sb = {};
    sb.server = 'test';
    sb.name = "spacelog";
    sb.desc = "This will log incoming data to a file called /tmp/tail for later use.";
    sb.config = {
  "config": {
    "name": sb.name,
    "description": sb.desc,
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
        fileName = m[2];
        console.log("set file name: " + fileName);
      }
    }
  }
}

var filepath = path.resolve(__dirname, (fileName + '.dat'));
var log = Jog(new Jog.FileStore(filepath)); 
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
    log.info( { logId: ++logId, user: sb.name, name: tName, sbtype: tType, value: tValue } );

}

sb.conn.onclose = function() {
    console.log("WebSockets connection closed");
}

sb.conn.onerror = function(e) {
  console.log("onerror ", e);

}

// tail the json "documents"
log.stream({ end: false, interval: 500 })
  .on('data', function(obj){
    console.log(obj);
  });

sb.conn.on("error", function(error) {
  // When the "error" event is emitted, this is called
  console.log("+++++++ ERROR +++++++");
  console.error(error);
});

