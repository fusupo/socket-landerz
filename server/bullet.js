var Bullet = function(startX, startY, startR) {
  var x = startX,
    y = startY,
    r = startR,
    id,
    src,
    age = 0;

  var h = 5;

  var rr = (Math.PI / 180) * r;
  var a = h * Math.cos(rr);
  var b = h * Math.sin(rr);

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

  var update = function() {
   
    x += a;
    y += b;
  };

  return {
    getX: getX,
    getY: getY,
    getR: getR,
    setX: setX,
    setY: setY,
    setR: setR,
    src: src,
    id: id,
    age: age,
    update: update
  };

};

exports.Bullet = Bullet;
