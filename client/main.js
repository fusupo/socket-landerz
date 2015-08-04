  
$(document).ready(function() {
  var socket = io();
  var player;
  var remotePlayers = [];

  var myID;
  var keys = {};

  /////////////////////////

  socket.on("connect", onSocketConnected);
  socket.on("disconnect", onSocketDisconnect);
  socket.on("new player", onNewPlayer);
  socket.on("remove player", onRemovePlayer);
  socket.on("move player", onMovePlayer);

  /////////////////////////

  function onSocketConnected() {

    player = new Player('local', Math.floor(Math.random() * 490), Math.floor(Math.random() * 490));

    $('#stage').append(player.$el);
    player.$el.css('left', player.getX());
    player.$el.css('top', player.getY());

    socket.emit("new player", {
      x: player.getX(),
      y: player.getY()
    });
    console.log("Connected to socket server");
  }

  function onSocketDisconnect() {
    console.log("Disconnected from socket server");
  }
   
  function onNewPlayer(data) {
    console.log("New player connected: " + data.id);
    var newPlayer = new Player('remote', data.x, data.y);
    newPlayer.id = data.id;
    remotePlayers.push(newPlayer);

    $('#stage').append(newPlayer.$el);
    newPlayer.$el.css('left', newPlayer.getX());
    newPlayer.$el.css('top', newPlayer.getY());
    
  }

  function onMovePlayer(data) {

  }

  function onRemovePlayer(data) {
    console.log("Player Removed: " + data.id);

    var foo = R.find(function(item){
      return item.id === data.id;
    }, remotePlayers);
    console.log(foo);

    foo.$el.remove();

    remotePlayers = R.filter(function(item){
      return item.id === data.id;
    }, remotePlayers);
    
  }

  /////////////////////////

  $(document).keydown(function(e) {
    var key = e.which;

    switch (key) {
      case 37: // left
        keys['left'] = key;
        break;
      case 38: // up
        keys['up'] = key;
        break;
      case 39: // right
        keys['right'] = key;
        break;
      case 40: // down
        keys['down'] = key;
        break;
      case 32: // space
        keys['space'] = key;
        break;
      case 90: // z
        keys['z'] = key;
        break;
      case 88: // x
        keys['x'] = key;
        break;
      default:
        return; // exit this handler for other keys
    }
    e.preventDefault();
  });

  $(document).keyup(function(e) {
    var key = e.which;

    switch (key) {
      case 37: // left
        delete keys['left'];
        break;
      case 38: // up
        delete keys['up'];
        break;
      case 39: // right
        delete keys['right'];
        break;
      case 40: // down
        delete keys['down'];
        break;
      case 32: // space
        delete keys['space'];
        break;
      case 90: // z
        delete keys['z'];
        break;
      case 88: // x
        delete['x'];
        break;
      default:
        return; // exit this handler for other keys
    }
    e.preventDefault();
  });

  console.log(this);

  function step() {
    if (player) {
     // console.log(this);
      player.update(keys);
      $('#stage').append(player.$el);
      player.$el.css('left', player.getX());
      player.$el.css('top', player.getY());
    }
    //window.requestAnimationFrame(step);
  }

  //window.requestAnimationFrame(step.bind(this));
  setInterval(step.bind(this), 1000/30);

});
