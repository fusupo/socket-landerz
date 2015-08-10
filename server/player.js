"use strict";

var Player = function(startX, startY, startR) {
  var x = startX,
    y = startY,
    r = startR,
    keys = {},
    id;
  var v = 0;
  var acc = 1 / 10;
  var moveAmount = 4;

  var getX = function() {
    return x;
  };

  var getY = function() {
    return y;
  };

  var getR = function() {
    return r;
  };

  var addKey = function(dir) {
    keys[dir] = true;
  };

  var deleteKey = function(dir) {
    delete keys[dir];
  };

  var setX = function(newX) {
    x = newX;
  };

  var setY = function(newY) {
    y = newY;
  };

  var setR = function(newR) {
    r = newR;
  };

  var update = function() {
    // Previous position
    var prevX = x;
    var prevY = y;
    var prevR = r;

    var h;

    // Up key takes priority over down
    if (keys.up) {
      v = Math.min(v + acc, moveAmount);
    } else if (keys.down) {
      v = Math.max(v - acc, -moveAmount);
    } else {

      Math.abs(v) === v ? v -= acc : v += acc;

      if (v < 2 * acc && v > -2 * acc) {
        v = 0;
      }
    }

    // console.log(v);
    h = v;

    if (h !== undefined && h !== 0) {
      var rr = (Math.PI / 180) * r;
      var a = h * Math.cos(rr);
      var b = h * Math.sin(rr);
      x += a;
      y += b;
    }

    // Left key takes priority over right
    if (keys.left) {
      r -= moveAmount;
    } else if (keys.right) {
      r += moveAmount;
    }

    return (prevX !== x || prevY !== y || prevR !== r) ? true : false;
  };

  return {
    getX: getX,
    getY: getY,
    getR: getR,
    setX: setX,
    setY: setY,
    setR: setR,
    addKey: addKey,
    deleteKey: deleteKey,
    update: update,
    id: id
  };
};

exports.Player = Player;
