var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const SerialPort = require('serialport');
const ByteLength = require('@serialport/parser-byte-length');



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

// sensorArray holds the values from sensor that will be sent to front-end
var sensorArray = [];
var isHeaderGood = false;
var width = -1;


//length of the array from Arduino
//TODO: Make this dynamic based on the width value from Arduino
var maxSize = -1;
/////////////////////END OF INITIALIZATION/////////////////////////////////

// Parser used to read data from Arduino one byte at a time
parser.on('data', function(buff){
	
	//Push first element into sensorArray
	var buffNumber = buff.readUInt8();
	//console.log(buffNumber);
	sensorArray.push(buffNumber);
	//Empty the array until we get the first 0xff value
	if(check(sensorArray[0]) === false) {
		sensorArray = [];
	}
	//Check to see if first 4 bytes are 0xff values, if not, then empty sensorArray
	//Precondition: the first byte is already 0xff
	if (sensorArray.length === 4) {
		isHeaderGood = (quadCheck(sensorArray.slice(0,4)));
		//console.log(isHeaderGood);
		if (!isHeaderGood) {
			sensorArray = [];
		}
	}
	//Set the width and the maxSize
	if (isHeaderGood && sensorArray.length === 6) {
		width = bitShiftWithoutFloor(sensorArray[4], sensorArray[5]);
		maxSize = width * 2 + 11;
		
	}
	//TODO: have a function here that reads the 5th and 6th byte for size(maxSize needs to be intialized to -1 ) the check will be, if length is 6 and maxSize is -1 (not init yet)
	//Once sensorArray is filled to the capacity based on width
	//we call sendArray and empty the sensorArray
	if ((sensorArray.length === maxSize)) {
			var shiftedArray = bitShiftArray(sensorArray);
			sendArray(shiftedArray);
			//console.log(shiftedArray);
			sensorArray = [];
			isHeaderGood = false;
	}
		
}); 

//Checks to see if buff is 0xff (255). If it is, return true, else false
function check(element) {
	var checkValue = 255;//Buffer.from([0xff]);
	if (element == checkValue) {
		return true;
	} 
	return false;
	
}
//Checks that the first 4 elements of sensorArray contain 0xff values
function quadCheck(subArray) {
	//console.log(subArray);
	var j = 0;
	for(var i = 0; i < 4; i++) {
		if (check(subArray[i])) {
			j++;
			//console.log(j);
		}
	}
	if (j == 4) {
		return true;
	}
	return false;
}
function bitShiftWithoutFloor(numberByte1, numberByte2) {
	//console.log(numberByte1 + numberByte2);
	var a = numberByte1;
	var b = numberByte2;
	var filter = 0xffff;

    var c = b << 8;
    var a = a | c;
    var d = b >> 8;
    var a = a | d;
    var a = a & filter;
    //var a = Math.floor(a / 4);
    return a;
}
//Shift the bits of 2 bytes
function bitShift(numberByte1, numberByte2) {
	var a = numberByte1;
	var b = numberByte2;
	var filter = 0xffff;

    var c = b << 8;
    var a = a | c;
     var d = b >> 8;
     var a = a | d;
    var a = a & filter;
    var a = Math.floor(a / 4);
    return a;
}
//TODO: Still need to use width bytes, timestamp (start i earlier), and checksum, +11
//Input: Entire complete array of type number
//Output: Entire array sent to front end without 0xfff 4 byte header
function bitShiftArray(sensorArray) {
	let shiftedArray = [];
	let bufferLength = maxSize - 1;//width * 2 + 10;
    for (var i = 4; i < bufferLength; i+=2) {
        var result = bitShiftWithoutFloor(sensorArray[i], sensorArray[i+1]);
        
        shiftedArray.push(result);
		}
    return shiftedArray;
}
///////////////////////////////////////////////////////////////////////////

// Sends the array of values (msg) to React
function sendArray(shiftedArray) {
//	console.log(sensorArray);
	io.emit('Sensor', shiftedArray);
}


io.on('connection', function(socket){
  console.log('socket io server connected');
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});