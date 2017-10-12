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

board.on("ready", function() {
  console.log("### Board ready!");
  led = new five.Led(13);
  ledMulti = new five.Led.RGB({
  pins: {
    red: 6,
    green: 5,
    blue: 3
    }
  });

});

app.get('/led/:mode', function (req, res) {
  if(led) {
    var status = "OK";
    switch(req.params.mode) {
      case "on-red":
        ledMulti.on();
	ledMulti.color("#FF0000");
        break;
      case "off":
        ledMulti.off();
        break;
      case "on-green":
	ledMulti.on();
	ledMulti.color("#00FF00");
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
     console.log(status);
     res.send(status);
   } else {
     res.send('Board NOT ready!')
   }
});

app.listen(port, function () {
 console.log('Listening on port ' + port);
});
