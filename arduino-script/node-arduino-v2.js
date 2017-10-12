/*
	author: Julien SAUTEREAU
	job: Developer
	level: M2 iWOCS
*/

"use strict";

var five = require("johnny-five"),
  board = new five.Board(),
  led = null,
  ledMulti = null,
  express = require('express'),
  app = express(),
  port = 8000;

const server = require('http').createServer(app);
const io = require('socket.io')(server);

board.on("ready", function() {
  console.log("### Board ready!");

  ledMulti = new five.Led.RGB({
  pins: {
    red: 6,
    green: 5,
    blue: 3
    }
  });

  
  io.on('connection', function(client) {
    client.on('join', function(handshake) {
      console.log(handshake);
    });

    client.on('rgb', function(data) {

      var button = new five.Button(2);  // Button on 2

      // Bouton cliqué
      button.on('press', function() {

            client.emit('rgb', data);
            client.broadcast.emit('rgb', data);
      });
    });

  });

});

app.get('/led/:mode', function (req, res) {
  if(ledMulti) {
    var status = "OK";
    switch(req.params.mode) {
      case "on-red":
        ledMulti.on();
	ledMulti.color("#AA0000");
        break;
      case "off":
        ledMulti.off();
        break;
      case "on-green":
	ledMulti.on();
	ledMulti.color("#00AA00");
	break;
      case "on-grey":
	ledMulti.on();
	ledMulti.color("#888888");
	break;
     /*case "blink":
       led.blink();
       break;*/
     case "stop":
       led.stop();
       break;
     default:
       status = "Unknown: " + req.params.mode;
       break;
     }
     //console.log(status);
     res.send(status);
   } else {
     res.send('Board NOT ready!')
   }
});

app.listen(port, function () {
 console.log('Listening on port ' + port);
});

const port2 = process.env.PORT || 3000;

server.listen(port2);
console.log(`Server listening on http://localhost:${port2}`);