$(document).ready(function() {
  var socket = io();
  var remotePlayers = [];
  var player;
  var myID;

  /////////////////////////

  socket.on("connect", onSocketConnected);
  socket.on("remove player", onRemovePlayer);
  socket.on("disconnect", onSocketDisconnect);
  socket.on("new player", onNewPlayer);
  socket.on("move player", onMovePlayer);
  socket.on("remove player", onRemovePlayer);

  /////////////////////////

  function onSocketConnected() {

    player = new Player('local', 10, 23);

    $('#stage').append(player.$el);
    player.$el.css('left', 10);
    player.$el.css('top', 23);

    socket.emit("new player", {
      x: 10, //localPlayer.getX(),
      y: 23 //localPlayer.getY()
    });
    console.log("Connected to socket server");
  }

  function onSocketDisconnect() {
    console.log("Disconnected from socket server");
  }


  // other client has disconnected
  function onRemovePlater(data) {
    console.log("Player Removed: " + data.id);
  }


  function onNewPlayer(data) {
    console.log("New player connected: " + data.id);
    var newPlayer = new Player(data.x, data.y);
    newPlayer.id = data.id;
    remotePlayers.push(newPlayer);
  }

  function onMovePlayer(data) {

  }

  function onRemovePlayer(data) {

  }

  /////////////////////////

});
