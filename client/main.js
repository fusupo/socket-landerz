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


    // function makeSVG(tag, attrs) {
    //   var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    //   for (var k in attrs)
    //     el.setAttribute(k, attrs[k]);
    //   return el;
    // }

    /////////////////////////
    function onSocketConnected() {

      player = new Player('local',
        Math.floor(Math.random() * 490),
        Math.floor(Math.random() * 490),
        Math.floor(Math.random() * 360));

      document.getElementById('svgstage').appendChild(player.$el);
      player.$el.setAttribute('transform', 'translate(' + player.getX() + ' ' + player.getY() + ') rotate(' + player.getR() + ')');

      socket.emit("new player", {
        x: player.getX(),
        y: player.getY(),
        r: player.getR()
      });
      console.log("Connected to socket server");
    }

    function onSocketDisconnect() {
      console.log("Disconnected from socket server");
    }

    function onNewPlayer(data) {
      console.log("New player connected: ", data);
      var newPlayer = new Player('remote', data.x, data.y, data.r);
      newPlayer.id = data.id;
      remotePlayers.push(newPlayer);

      document.getElementById('svgstage').appendChild(newPlayer.$el);
      newPlayer.$el.setAttribute('transform', 'translate(' + newPlayer.getX() + ' ' + newPlayer.getY() + ') rotate(' + newPlayer.getR() + ')');

    }

    function onMovePlayer(data) {

      var foo = R.find(function(item) {
        return item.id === data.id;
      }, remotePlayers);

      foo.setX(data.x);
      foo.setY(data.y);
      foo.setR(data.r);

      foo.$el.setAttribute('transform', 'translate(' + foo.getX() + ' ' + foo.getY() + ') rotate(' + foo.getR() + ')');

    }

    function onRemovePlayer(data) {

      var foo = R.find(function(item) {
        return item.id === data.id;
      }, remotePlayers);

      document.getElementById('svgstage').removeChild(foo.$el);
      // foo.$el.remove();

      remotePlayers = R.filter(function(item) {
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
          if (!isShooting) {
            startShooting();
          };
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
          stopShooting();
          break;
        default:
          return; // exit this handler for other keys
      }
      e.preventDefault();
    });

    console.log(this);

    var rot = 0;

    function step() {
      if (player) {
        if (player.update(keys)) {

          player.$el.setAttribute('transform', 'translate (' + player.getX() + ', ' + player.getY() + ') rotate(' + player.getR() + ')');

          socket.emit('move player', {
            x: player.getX(),
            y: player.getY(),
            r: player.getR()
          });

          rot++;
        }
      }
      //window.requestAnimationFrame(step);
    }

    //window.requestAnimationFrame(step.bind(this));
    setInterval(step.bind(this), 18);


    var isShooting = false;

    function startShooting() {
      isShooting = true;
      shoot();
    }

    function shoot() {
      if (isShooting) {

        console.log(player);
        
        socket.emit('shots fired', {
          x: player.getX(),
          y: player.getY(),
          r: player.getR()
        });

        console.log('shoot');
        setTimeout(shoot, 1000);
      }
    }

    function stopShooting() {
      isShooting = false;
    }

  });
