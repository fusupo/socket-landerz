"use strict";

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
    var gameState = {};
    gameState.players = {};

    R.forEach(function(p) {
      gameState.players[p.id] = {
        x: p.getX(),
        y: p.getY(),
        r: p.getR()
      };
    }, players);

    return gameState;
  };

  obj.addPlayer = function(player) {
    players.push(player);
  };

  obj.removePlayer = function(playerId) {
    players = R.filter(function(p) {
      return p.id !== playerId;
    }, players);
  };

  obj.onNewPlayer = function(data) {
    var newPlayer = new Player(data.x, data.y, data.r);
    newPlayer.id = this.id;
    return newPlayer;
  };

  obj.getPlayers = function() {
    return players;
  };

  obj.getPlayer = function(id) {
    return R.find(function(p) {
      return p.id === id;
    }, players);
  };

  obj.addKey = function(id, dir) {
    this.getPlayer(id).addKey(dir);
  };

  obj.deleteKey = function(id, dir) {
    this.getPlayer(id).deleteKey(dir);
  };

  /////////////////////////

  obj.onShotsFired = function(data) {
    var newBullet = new Bullet(data.x, data.y, data.r);
    newBullet.id = uuid.v4();
    newBullet.src = this.id;
    return newBullet;
  };

  obj.addBullet = function(bullet) {
    bullets.push(bullet);
  };

  obj.getBullets = function() {
    return bullets;
  };

  obj.setBullets = function(arr) {
    bullets = arr;
  };

  ///////

  obj.update = function() {
    R.forEach(function(p) {
      p.update();
    }, players);
  };

  ///////

  return obj;

};
