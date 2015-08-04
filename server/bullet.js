var Bullet = function(startX, startY, startR) {
  var x = startX,
      y = startY,
      r = startR,
      id,
      src,
      age;
  
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
    src: src,
    id: id
  };

};

exports.Bullet = Bullet;
