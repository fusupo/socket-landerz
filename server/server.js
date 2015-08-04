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
  util.log('listening on *:' + port);
});

//util.log(game);

function onSocketConnection(client) {

  util.log("New player has connected: " + client.id);
  client.on("disconnect", onClientDisconnect);
  client.on("new player", onNewPlayer);
  client.on("move player", onMovePlayer);
  
  client.on("shots fired", onShotsFired);

}

function onClientDisconnect() {

  util.log("Player has disconnected: " + this.id);

  this.broadcast.emit("remove player", {
    id: this.id
  });

  game.removePlayer(this.id);

}

function onNewPlayer(data) {

  var newPlayer = game.onNewPlayer.bind(this)(data);

  this.broadcast.emit("new player", {
    id: newPlayer.id,
    x: newPlayer.getX(),
    y: newPlayer.getY(),
    r: newPlayer.getR()
  });

  var i, existingPlayer;
  var players = game.getPlayers();

  for (i = 0; i < players.length; i++) {
    existingPlayer = players[i];
    this.emit("new player", {
      id: existingPlayer.id,
      x: existingPlayer.getX(),
      y: existingPlayer.getY(),
      r: existingPlayer.getR()
    });
  }

  game.addPlayer(newPlayer);

}

function onMovePlayer(data) {
  util.log(this.id, data);
  data.id = this.id;
  this.broadcast.emit("move player", data);
}

////////////////////////

function onShotsFired(data){
  var newBullet = game.onShotsFired.bind(this)(data);

  this.broadcast.emit("shots fired", {
      id: newBullet.id,
      x: newBullet.getX(),
      y: newBullet.getY(),
      r: newBullet.getR()
  });
}









