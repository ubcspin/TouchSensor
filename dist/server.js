var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const SerialPort = require('serialport');
const ByteLength = require('@serialport/parser-byte-length');
const Readline = require('@serialport/parser-readline');


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

console.log(__dirname);
console.log(__dirname + '/js');

app.use('/js', express.static(__dirname + '/js'));

// This is initializing the serial port
const port = new SerialPort('/dev/cu.usbmodem14301', {
  baudRate: 512000
});

//This parses the data and logs it, reading 1 byte at a time
const parser = port.pipe(new ByteLength({length: 1}));

// Array msg holds the values being streamed from sensor
let msg = [];
// arr is 0xff used to build test Array
const arr = [0xff];
// Array test is used as a comparison in parser to look for 0xffffffff
let test = [];
test.push(Buffer.from(arr));
test.push(Buffer.from(arr));
test.push(Buffer.from(arr));
test.push(Buffer.from(arr));
//length of the array from Arduino
const maxSize = 520;

// Parser used to read data from Arduino one byte at a time
parser.on('data', function(buff){
	let temp = msg.slice(0, 4);
	let element = buff.toString('hex');
	
	let counter = 0;
	if(temp.length === 4) {
		
	for (var i = 0; i < 4; i++) {
		if (test[i].equals(temp[i])) {
			counter++;
		}
	}
}
	if (counter === 4) {
		attachElement(buff);
	} 
	else if (element == "ff") {
		attachElement(buff);
	} else {
		msg = [];
	}

		
}); 

// Add one byte of data (buff) to the msg array. 
// If the array is full, call handleValue and empty the array.
function attachElement(buff) {
	msg.push(buff);
	
	if (msg.length == maxSize) {
		handleValue(msg);
		msg = [];
	}
}
// Sends the array of values (msg) to React
function handleValue(msg) {
	io.emit('Sensor', msg);
}


io.on('connection', function(socket){
  console.log('socket io server connected');
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});