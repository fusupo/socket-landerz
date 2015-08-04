var socket = io();
var remotePlayers = [];
var myID;

// function toSubmit() {
//   console.log($('#m').val());
//   socket.emit('chat message', $('#m').val());
//   $('#m').val('');
//   return false;
// }

////////////////

// socket.on('chat message', function(msg) {
//   $('#messages').append($('<li>').text(msg));
// });

// socket.on('id', function(ID) {
//   console.log(ID);
// });

////////////////

socket.on("connect", onSocketConnected);
socket.on("client disconnect", onClientDisconnect);
socket.on("disconnect", onSocketDisconnect);
socket.on("new player", onNewPlayer);
socket.on("move player", onMovePlayer);
socket.on("remove player", onRemovePlayer);

function onSocketConnected() {
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
function onClientDisconnect(data){
  console.log("Other player has disconnected: " + data.id);
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

//////////////
