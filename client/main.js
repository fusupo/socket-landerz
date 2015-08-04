var socket = io();
console.log(socket.io.engine.id);
var myID;

function toSubmit() {
  console.log($('#m').val());
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
}

socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(msg));
});

socket.on('id', function(ID) {
  console.log(ID);
});
