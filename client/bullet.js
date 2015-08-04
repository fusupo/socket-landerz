var Bullet = function(startX, startY, startR) {

  var x = startX;
  var y = startY;
  var r = startR;
  var id;

  var $el = makeSVG('circle', {
    cx: 0,
    cy: 0,
    r: 2.5,
    width: 5,
    height: 5,
    fill: 'white'
  });

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

  return {
    getX: getX,
    getY: getY,
    getR: getR,
    setX: setX,
    setY: setY,
    setR: setR,
    $el: $el
   };
};

