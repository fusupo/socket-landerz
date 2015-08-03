var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/../client'));

io.on('connection', function(socket){
  
  console.log('a user connected');
  
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
