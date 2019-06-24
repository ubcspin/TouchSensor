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

// This parses the data and logs it, reading 1 byte at a time
const parser = port.pipe(new ByteLength({length: 1}));

// sensorArray will hold an entire frame of data sent from Arduino
var sensorArray = [];
var isHeaderGood = false;
var width = -1;

// length of the sensorArray. Calculated based on width
var maxSize = -1;

// msg is the object to send to the front-end
var msg = {
	width: 0,
	timestamp: 0,
	valuesArray: [],
	checksum: 0
}
/////////////////////END OF INITIALIZATION/////////////////////////////////
function callArduino() {
// Parser used to read data from Arduino, one byte at a time
parser.on('data', function(buff){
	
	// Push first element into sensorArray
	var buffAsNumber = buff.readUInt8();
	sensorArray.push(buffAsNumber);

	// Empty the array until we get the first 0xff value
	if(check(sensorArray[0]) === false) {
		sensorArray = [];
	}
	// Check to see if first 4 bytes are 0xff values, if not, empty sensorArray
	// Precondition: the first byte is already 0xff
	if (sensorArray.length === 4) {
		isHeaderGood = (quadCheck(sensorArray.slice(0,4)));
		
		if (!isHeaderGood) {
			sensorArray = [];
		}
	}
	// Set the width and the maxSize
	if (isHeaderGood && sensorArray.length === 6) {
		width = bitShift(sensorArray[4], sensorArray[5]);
		msg.width = width;
		// + 11 is the fixed size of the header+checksum. * 2 as each number is 2 bytes
		maxSize = width * 2 + 11;
	}
	// Set the timestamp for this frame
	if (sensorArray.length === 10) {
		msg.timestamp =	bitShiftTimeStamp(sensorArray[6], sensorArray[7], sensorArray[8], sensorArray[9]);
	}
 
	// Read the values from Arduino and set the values in the msg object
	if ((sensorArray.length === maxSize - 1)) {
			var bitShiftedValuesArray = bitShiftValues(sensorArray);
			msg.valuesArray = bitShiftedValuesArray;
	}

	// Set the checksum and confirm it matches. Reset variables and values to initial state
	if (sensorArray.length === maxSize) {
			msg.checksum = sensorArray[maxSize-1];
			if (doesChecksumMatch(msg)) {
				sendObject(msg);
			}
			
			sensorArray = [];
			isHeaderGood = false;
			// reset the values in the msg object
			msg.width = 0;
			msg.timestamp = 0;
			msg.valuesArray = [];
			msg.checksum = 0;
			
	}
		
});
} 

// Check if buff is 0xff (255)
function check(element) {
	var checkValue = 255;
	if (element == checkValue) {
		return true;
	} 
	return false;
	
}
// Check if the first 4 elements of sensorArray contain 0xff values
function quadCheck(subArray) {
	var count = 0;
	for(var i = 0; i < 4; i++) {
		if (check(subArray[i])) {
			count++;
		}
	}
	if (count === 4) {
		return true;
	}
	return false;
}

function bitShift(numberByte1, numberByte2) {
	
	var byte1 = numberByte1;
	var byte2 = numberByte2;

	var result = 0;
	result = (byte2 << 8) + byte1;
	
	return result;
}
// Bit shift the timestamp
function bitShiftTimeStamp(numberByte1, numberByte2, numberByte3, numberByte4) {
	var byte1 = numberByte1;
	var byte2 = numberByte2;
	var byte3 = numberByte3;
	var byte4 = numberByte4;

	var result = 0;
	result = (byte4 << 24) + (byte3 << 16) + (byte2 << 8) + byte1;
	
	return result;
}

//Input: The sensorArray with all values except checksum
//Output: sensorArray with values all bit shifted
function bitShiftValues(sensorArray) {
	var shiftedValuesArray = [];
	var headerLength = 10;
	var lastValueIndex = maxSize - 2;
    for (var i = headerLength; i < lastValueIndex; i+=2) {
        var result = bitShift(sensorArray[i], sensorArray[i+1]);
        
        shiftedValuesArray.push(result);
		}
    return shiftedValuesArray;
}

function doesChecksumMatch(msg) {
	let sumOfAllValues = 0;
	let valuesArrayForChecksum = msg.valuesArray;
	for (var i = 0; i < valuesArrayForChecksum.length; i++) {
		sumOfAllValues += valuesArrayForChecksum[i];
	}
	sumOfAllValues = sumOfAllValues + msg.timestamp + msg.width;
	sumOfAllValues = sumOfAllValues.toString(16); //change the number to hex
	let lastByteOfSum = 0;
	for (var i = sumOfAllValues.length-2; i < sumOfAllValues.length; i++) {
		lastByteOfSum += sumOfAllValues[i];
	}
	
	return isChecksumEqual(lastByteOfSum, msg.checksum);
}

function isChecksumEqual(lastByteOfSum, checksum) {
	let hexChecksum = parseInt(checksum.toString(16), 16);
	let lastByte = parseInt(lastByteOfSum, 16);
	
	if (lastByte === hexChecksum) {
		return true;
	}
	return false;
}
///////////////////////////////////////////////////////////////////////////

// Sends the array of values (msg) to React
function sendObject(msg) {
	console.log("emit msg");
	io.emit('Sensor', msg);
}


io.on('connection', function(socket){
  console.log('socket io server connected');
  socket.on("demo", function(){
	  callArduino()
	});
  socket.on('disconnect', function() {
	io.emit("errorCustom", "There is no server connected");
  })
});

io.on('error', function(){
	console.log("no socket io connection");
})



http.listen(8080, function(){
  console.log('listening on *:8080');
});