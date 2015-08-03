console.log('loaded that muther');
var socket = io();
// $('form').submit(function(e) {

// });

function toSubmit() {
  console.log($('#m').val());
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
}
