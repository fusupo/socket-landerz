var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var game = require('./game')();
var util = require('util');

var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/../client'));

io.on('connection', onSocketConnection);

http.listen(port, function() {
  console.log('listening on *:' + port);
});

//console.log(game);

function onSocketConnection(client) {

  util.log("New player has connected: " + client.id);
  client.on("disconnect", onClientDisconnect);
  client.on("new player", onNewPlayer);
  client.on("move player", game.onMovePlayer);

  // console.log('a user connected', socket.id);

  // socket.send(socket.id);

  // socket.on('chat message', function(msg) {
  //   console.log('message: ', arguments);
  //   io.emit('chat message', msg);
  // });

  // socket.on('disconnect', function() {
  //   console.log('user disconnected');
  // });

}

function onClientDisconnect() {
  util.log("Player has disconnected: " + this.id);
}

function onNewPlayer(data) {

  var newPlayer = game.onNewPlayer.bind(this)(data);

  this.broadcast.emit("new player", {
    id: newPlayer.id,
    x: newPlayer.getX(),
    y: newPlayer.getY()
  });

  var i, existingPlayer;
  var players = game.getPlayers();

  for (i = 0; i < players.length; i++) {
    existingPlayer = players[i];
    this.emit("new player", {
      id: existingPlayer.id,
      x: existingPlayer.getX(),
      y: existingPlayer.getY()
    });
  }

  game.addPlayer(newPlayer);
  
}

function onMovePlayer(data) {
  
}
