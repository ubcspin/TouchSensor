var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var five = require("johnny-five");
var board = new five.Board();


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

console.log(__dirname)
console.log(__dirname + '/js')

app.use('/js', express.static(__dirname + '/js'));

//This is logic for the board
board.on("ready", function() {

  // Create a standard `led` component instance
  var led = new five.Led(13);
  var input = new five.Pin("A0");


  five.Pin.read(input, function(error, value) {
  	//console.log(value);
  	led.blink(value/2);
  	var sensorValue = value;
  	handleValue(sensorValue);
  });
  // "blink" the led in 500ms
  // on-off phase periods
  //led.blink(500);
});

function handleValue(sensorValue) {
	//console.log(sensorValue);
	io.emit('Sensor', sensorValue);
	// for (var i = 0; i < 100; i++) {
	// 	arr.push(sensorValue);
	// 	console.log("Value at i is: " + arr[i]);
	// }
	
}


io.on('connection', function(socket){
  console.log('socket io server connected');
  //io.emit('test');
  //THIS IS THE BUTTON LOGIC FOR RANDOM VALUES///////////////////////////////
 //  socket.on('Get Array', function(){
  	
	// var length = 100;
	// var arr = [];
	
	// arr[0] = this.handleValue();
	// console.log("this is return value" + arr[0]);

	// for (var i = 0; i < length; i++) {
	// 	let randomNumber = Math.random(10);
		
	// 	if (randomNumber >= 0.5) {
	// 		arr.push({id: i, element: i, pressed: true});
	// 	}
	// 	else {
	// 		arr.push({id: i, element: i, pressed: false})
	// 	}
	// }

	// console.log('sending element');
	// io.emit('Array Contains', arr);
	
	// });
	////////////////////////////////////////////////////////////////////////////
	socket.on('Get Array', function(){
		var arr = [];

		arr[0] = {id: 0, element: 0, pressed: true}
	io.emit('Array Contains', arr)

	});
	
});






http.listen(8080, function(){
  console.log('listening on *:8080');
});