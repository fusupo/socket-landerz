Player = require("./player").Player;

module.exports = function() {
  var players = [];

  var obj = {};

  obj.getGameState = function() {
    return gameState;
  };
  
  obj.addPlayer = function(player) {
    players.push(player);
  };
  
  // obj.removeClient = function(clientID) {
  //   delete gameState.clients[clientID];
  // };

  obj.onNewPlayer = function(data) {
    
    var newPlayer = new Player(data.x, data.y);
    newPlayer.id = this.id;

    return newPlayer;
  };

  obj.onMovePlayer = function(data) {

  };

  obj.getPlayers = function(){
    return players;
  };

  return obj;
};
