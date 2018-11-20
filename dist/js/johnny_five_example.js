var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  // Create a standard `led` component instance
  var led = new five.Led(13);
  var input = new five.Pin("A0");


  five.Pin.read(input, function(error, value) {
  	console.log(value);
  	led.blink(value/2);
  });
  // "blink" the led in 500ms
  // on-off phase periods
  //led.blink(500);
});