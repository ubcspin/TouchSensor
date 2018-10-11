var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index_example.html');
});

console.log(__dirname)
console.log(__dirname + '/js')

app.use('/js', express.static(__dirname + '/js'));

// app.get('/js/socket.io.js', function(req, res){
	// return error
// });

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
	});
  socket.on('Get Array', function() {
	var arr = [1,2,3];
	console.log('sent array');
	io.emit('Array contains:', arr);
	});
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});