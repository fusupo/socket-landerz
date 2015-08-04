var Player = require("./player").Player;
var R = require('ramda');
var util = require('util');

module.exports = function() {
  var players = [];

  var obj = {};

  obj.getGameState = function() {
    return gameState;
  };
  
  obj.addPlayer = function(player) {
    players.push(player);
  };
  
  obj.removePlayer = function(playerId) {

    players = R.filter(function(p){
      return p.id !== playerId;
    },players);
    
    //util.log('REMOVE PLAYER', playerId);
    //util.log(players);
  };

  obj.onNewPlayer = function(data) {
    
    var newPlayer = new Player(data.x, data.y, data.r);
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
