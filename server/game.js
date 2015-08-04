Player = require("./Player").Player;

module.exports = function() {
  var gameState = {
    clients: {}
  };
  
  var obj = {};

  obj.getGameState = function(){
    return gameState;
  };
  obj.addClient = function(clientID){
    gameState.clients[clientID] = {};
  };
  obj.removeClient = function(clientID){
    delete gameState.clients[clientID];
  };
  
  return obj;
};
