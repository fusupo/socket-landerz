var Player = require("./player").Player;
var Bullet = require("./bullet").Bullet;
var R = require('ramda');
var util = require('util');
var uuid = require('uuid');

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

  obj.onShotsFired = function(data){

    var newBullet = new Bullet(data.x, data.y, data.r);
    newBullet.id = uuid.v1();
    newBullet.src = this.id;

    return newBullet;
    
  };

  obj.addBullet = function(bullet){
    bullets.push(bullet);
  };

  //setInterval(function(){console.log('interval')}, 1000);
  
  return obj;
};
