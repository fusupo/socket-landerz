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
        gameState.bullets = {};

        R.forEach(function(p) {
            gameState.players[p.id] = {
                x: p.getX(),
                y: p.getY(),
                r: p.getR()
            };
        }, players);

        R.forEach(function(b) {
            gameState.bullets[b.id] = {
                x: b.getX(),
                y: b.getY(),
                r: b.getR()
            };
        }, bullets);

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
        var p = this.getPlayer(id);
        if (dir === 'x' || dir === 'space') {
            this.addBullet(this.onShotsFired({
                x: p.getX(),
                y: p.getY(),
                r: p.getR()
            }));
        } else {
            this.getPlayer(id).addKey(dir);
        }
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

        R.forEach(function(b) {
            b.update();
        }, bullets);

        var maxAge = 50;
        // var bullets = game.getBullets();

        // R.forEach(function(item) {
        //   item.age++;
        //   item.update();
        // }, bullets);

        // var old = R.reject(function(item) {
        //   return item.age < maxAge;
        // }, bullets);

        var xxx = R.filter(function(item) {
            return item.getAge() < maxAge;
        }, bullets);

        this.setBullets(xxx);

        // var data = R.map(function(item) {
        //   return {
        //     id: item.id,
        //     x: item.getX(),
        //     y: item.getY(),
        //     r: item.getR()
        //   };
        // }, bullets);
        // io.emit('update shots', data);

        // R.forEach(function(item) {
        //   io.emit('remove shot', {
        //     id: item.id,
        //     x: item.getX(),
        //     y: item.getY(),
        //     r: item.getR()
        //   });
        // }, old);
    };

    ///////

    return obj;

};
