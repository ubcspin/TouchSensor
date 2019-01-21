var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var five = require("johnny-five");
//var board = new five.Board();
const SerialPort = require('serialport');
const ByteLength = require('@serialport/parser-byte-length');
const Readline = require('@serialport/parser-readline');


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

console.log(__dirname)
console.log(__dirname + '/js')

app.use('/js', express.static(__dirname + '/js'));

// This is initializing the serial port
const port = new SerialPort('/dev/cu.usbmodem14301', {
  baudRate: 512000
})
//This parses the data and logs it
const parser = port.pipe(new ByteLength({length: 8}))
parser.on('data', function(buff){
  console.log(JSON.stringify(buff));
}); // will have 8 bytes per data event

//This is logic for the board
// board.on("ready", function() {

  // // Create a standard `led` component instance
  // var led = new five.Led(13);
  // //analog
  // var input = new five.Pin("A0");

  // // analogA0 = new five.Sensor({
  // //   pin: "A0",
  // //   threshold: 1
  // // });
  // // analogA1 = new five.Sensor({
  // //   pin: "A1"
  // // });
  // // sensorArray = [
  // //       analogA0
  // //       // analogA1
  // // ]
  // //digital
  // digital0 = new five.Pin(22);
  // digital1 = new five.Pin(23);
  // digital2 = new five.Pin(24);
  // digital3 = new five.Pin(25);
  // digital4 = new five.Pin(26);
  // digital5 = new five.Pin(27);
  // digital6 = new five.Pin(28);
  // digital7 = new five.Pin(29);
  // digital8 = new five.Pin(30);
  // digital9 = new five.Pin(31);

  // // digitalArray = [
  // //       digital0,
  // //       digital1,
  // //       digital2,
  // //       digital3,
  // //       digital4,
  // //       digital5,
  // //       digital6,
  // //       digital7,
  // //       digital8,
  // //       digital9
  // // ]
  // for (var i = 22; i < 32; i++) {
  // 	var pin = new five.Pin(i);
  // }
  
  // digital0.high();
  // digital1.high();
  // digital2.high();
  // digital3.high();
  // digital4.high();
  // digital5.high();
  // digital6.high();
  // digital7.high();
  // digital8.high();
  // digital9.high();
//   //TODO: have an index along with sensorvalue so matrix can know which column to light up
//   // sensorArray.forEach(function(e, i, arr){
//   //   five.Pin.read(e, function(error, value) {
//   //     console.log(e.pin, value);
//   //     led.blink(value/2);
//   //     var sensorValue = value;
//   //     handleValue(sensorValue);
//   //     // handleValue(sensorValue, pinAddress);
//   //   }); 
//   // });
//   five.Pin.read(input, function(error, value) {
//   	console.log(value);
//   	led.blink(value/2);
//   	var sensorValue = value;
//   	handleValue(sensorValue);
//   });
//   // "blink" the led in 500ms
//   // on-off phase periods
//   //led.blink(500);

//   // lastPin = digital9;
//   // currentPin = digital0;
//   // checkPins();
//   // setInterval( function() {
//   //   setNextPin();
//   // }, 50);
// });

// function prev(i) {
//   if (i < 0) {
//     return i - 1;
//   }
//   else {
//     return 9;
//   }
// }

// function loop() {
//   for (var i = 0; i < 9; i++) {
//     pinArray[i].high();
//     pinArray[prev(i)].low();

//   }
// }

// function checkPins() {
//   console.log("digitalArray", digitalArray);
//   console.log("sensorArray", sensorArray);
//   sensorArray.forEach(function(e){
//     console.log("sensor pin " + e.pin);
//   })
//   digitalArray.forEach(function(e){
//     console.log("digital pin " + e.pin);
//   })

// }



// function nextPin() {
//   var c = digitalArray.indexOf(currentPin);
//   if (c < digitalArray.length - 1) {
//     return digitalArray[c + 1];
//   } else {
//     return digitalArray[0];
//   }
// }

// function setNextPin() {
//   // if (currentPin != null) {
//     currentPin.high();
//     lastPin.low();
//     lastPin = currentPin;
//     currentPin = nextPin();
//   // }
//   // else {
//     // console.log("Pin is undefined");
//   // }
// }



// setInterval(function(){}, )

function handleValue(sensorValue) {
	//console.log(sensorValue);
	io.emit('Sensor', sensorValue);
	// for (var i = 0; i < 100; i++) {
	// 	arr.push(sensorValue);
	// 	console.log("Value at i is: " + arr[i]);
	// }
	
}

// function handleValue(sensorValue, pinAddress) {
  // var obj = {"x": pinAddress, "y": currentPin.pin, "val": sensorValue, };
  // io.emit("sensor", obj)
// }


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