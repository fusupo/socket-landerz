var Player = require("./player").Player;
var Bullets = require("./bullet").Bullet;
var R = require('ramda');
var util = require('util');

module.exports = function() {
  var players = [];
  var bullets = [];
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

  /////////////////////////

  obj.onShotsFired = function(){
    var newBullet = new Bullet(data.x, data.y, data.r);
    newBullet.src = this.id;

    return newBullet;
  };

  
  return obj;
};
