

/**************************************************
 ** GAME PLAYER CLASS
 **************************************************/
var Player = function(type, startX, startY, startR) {

  var x = startX;
  var y = startY;
  var r = startR;
  var id;
  var moveAmount = 4;
  var type = type;

  var v = 0;
  var acc = 1 / 10;

  var $el = makeSVG('rect', {
    x: -5,
    y: -5,
    width: 10,
    height: 10,
    stroke: 'black',
    'stroke-width': 2,
    fill: type === 'local' ? 'green' : 'red'
  });

  // Getters and setters
  var getX = function() {
    return x;
  };

  var getY = function() {
    return y;
  };

  var getR = function() {
    return r;
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

  // Update player position
  var update = function(keys) {
 
  };

  // Define which variables and methods can be accessed
  return {
    getX: getX,
    getY: getY,
    getR: getR,
    setX: setX,
    setY: setY,
    setR: setR,
    update: update,
    $el: $el,
    id: id
    //draw: draw
  };

};
