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

// sensorArray holds all the values from sensor, including header/timestamp
var sensorArray = [];
var isHeaderGood = false;
var width = -1;


//length of the array sensorArray to be set based on width in parser
var maxSize = -1;

//msg is the object to send to the front-end
var msg = {
	width: 0,
	timestamp: 0,
	valuesArray: [],
	checksum: 0
}
/////////////////////END OF INITIALIZATION/////////////////////////////////

// Parser used to read data from Arduino one byte at a time
parser.on('data', function(buff){
	
	//Push first element into sensorArray
	var buffAsNumber = buff.readUInt8();
	sensorArray.push(buffAsNumber);

	//Empty the array until we get the first 0xff value
	if(check(sensorArray[0]) === false) {
		sensorArray = [];
	}
	//Check to see if first 4 bytes are 0xff values, if not, then empty sensorArray
	//Precondition: the first byte is already 0xff
	if (sensorArray.length === 4) {
		isHeaderGood = (quadCheck(sensorArray.slice(0,4)));
		
		if (!isHeaderGood) {
			sensorArray = [];
		}
	}
	//Set the width and the maxSize
	if (isHeaderGood && sensorArray.length === 6) {
		width = bitShift(sensorArray[4], sensorArray[5]);
		msg.width = width;
		//console.log(msg);
		//+ 11 is the size of the header, * 2 as each number is 2 bytes
		maxSize = width * 2 + 11;
		
	}
	//set the timestamp here
	if (sensorArray.length === 10) {
	
		msg.timestamp =	bitShiftTimeStamp(sensorArray[6], sensorArray[7], sensorArray[8], sensorArray[9]);
		//console.log("Timestamp is :" + msg.timestamp);
	}
 
	//Read the values from Arduino and set the values in the msg object
	if ((sensorArray.length === maxSize - 1)) {
			
			var bitShiftedValuesArray = bitShiftValues(sensorArray);
			msg.valuesArray = bitShiftedValuesArray;
			//console.log(bitShiftedValuesArray);
			
			//console.log(msg);
	}
	// Set the checksum and reset global variables and object to initial state
	if (sensorArray.length === maxSize) {
			msg.checksum = sensorArray[maxSize-1];
			if(doesChecksumMatch(msg)) {
				//console.log("Yes we get here");
				sendObject(msg);
			}
			//console.log(msg);
			sensorArray = [];
			isHeaderGood = false;
			//reset the values in the msg object
			msg.width = 0;
			msg.timestamp = 0;
			msg.valuesArray = [];
			msg.checksum = 0;
			//console.log(msg);
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
function bitShift(numberByte1, numberByte2) {
	
	var byte1 = numberByte1;
	var byte2 = numberByte2;

	var result = 0;
	result = (byte2 << 8) + byte1;
	
	return result;
}
//Shift the bits of 2 bytes
function bitShiftTimeStamp(numberByte1, numberByte2, numberByte3, numberByte4) {
	var byte1 = numberByte1;
	var byte2 = numberByte2;
	var byte3 = numberByte3;
	var byte4 = numberByte4;

	var result = 0;
	result = (byte4 << 24) + (byte3 << 16) + (byte2 << 8) + byte1;
	//console.log("Result is " + result);
	return result;
}

//Input: Entire complete array of type number
//Output: Entire array sent to front end without 0xfff 4 byte header
function bitShiftValues(sensorArray) {
	var shiftedValuesArray = [];
	var lastValueIndex = maxSize - 2;//width * 2 + 10;
    for (var i = 10; i < lastValueIndex; i+=2) {
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
	//lastByteOfSum = lastByteOfSum.toString(10);
	//console.log("The sum is: " + sumOfAllValues);
	//console.log("The last 2 hex values are :" + lastByteOfSum);
	return isChecksumEqual(lastByteOfSum, msg.checksum);
}

function isChecksumEqual(lastByteOfSum, checksum) {
	let hexChecksum = parseInt(checksum.toString(16), 16);
	let lastByte = parseInt(lastByteOfSum, 16);
	//console.log("Check here: " + lastByte + " and here " + hexChecksum);
	//console.log(typeof hexChecksum);
	//console.log(typeof lastByteOfSum);
	if (lastByte === hexChecksum) {
		//console.log("Yes, it's true");
		return true;
	}
	return false;
}
///////////////////////////////////////////////////////////////////////////

// Sends the array of values (msg) to React
function sendObject(msg) {
//	console.log(sensorArray);
	io.emit('Sensor', msg);
}


io.on('connection', function(socket){
  console.log('socket io server connected');
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});