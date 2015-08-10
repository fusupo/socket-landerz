

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
   //  // Previous position
   //  var prevX = x;
   //  var prevY = y;
   //  var prevR = r;

   //  var h;
   //  // Up key takes priority over down
   //  if (keys.up) {
   //    v = Math.min(v + acc, moveAmount);
   //  } else if (keys.down) {
   //    v = Math.max(v - acc, -moveAmount);
   //  } else {

   //    Math.abs(v) === v ? v -= acc : v += acc;
      
   //    if (v < 2*acc && v > -2*acc) {
   //      v = 0;
   //    }
   //  }
   // // console.log(v);
   //  h = v;

   //  if (h !== undefined && h !== 0) {
   //    var rr = (Math.PI / 180) * r;
   //    var a = h * Math.cos(rr);
   //    var b = h * Math.sin(rr);
   //    x += a;
   //    y += b;
   //  }

   //  // Left key takes priority over right
   //  if (keys.left) {
   //    r -= moveAmount;
   //  } else if (keys.right) {
   //    r += moveAmount;
   //  }

   //  return (prevX != x || prevY != y || prevR != r) ? true : false;
  };

  // Draw player
  // var draw = function(ctx) {
  //   ctx.fillRect(x - 5, y - 5, 10, 10);
  //};

  // Define which variables and methods can be accessed
  return {
    getX: getX,
    getY: getY,
    getR: getR,
    setX: setX,
    setY: setY,
    setR: setR,
    update: update,
    $el: $el
      //draw: draw
  };

};
