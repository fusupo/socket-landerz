/**************************************************
 ** GAME PLAYER CLASS
 **************************************************/
var Player = function(type, startX, startY) {

  var x = startX;
  var y = startY;
  var id;
  var moveAmount = 2;
  var type = type;
  var $el = $('<div></div>');
  $el.addClass('player');
  $el.addClass(type);
  
  // Getters and setters
  var getX = function() {
    return x;
  };

  var getY = function() {
    return y;
  };

  var setX = function(newX) {
    x = newX;
  };

  var setY = function(newY) {
    y = newY;
  };

  // Update player position
  var update = function(keys) {
    // Previous position
    var prevX = x,
      prevY = y;

    // Up key takes priority over down
    if (keys.up) {
      y -= moveAmount;
    } else if (keys.down) {
      y += moveAmount;
    }

    // Left key takes priority over right
    if (keys.left) {
      x -= moveAmount;
    } else if (keys.right) {
      x += moveAmount;
    }

    return (prevX != x || prevY != y) ? true : false;
  };

  // Draw player
  // var draw = function(ctx) {
  //   ctx.fillRect(x - 5, y - 5, 10, 10);
  //};

  // Define which variables and methods can be accessed
  return {
    getX: getX,
    getY: getY,
    setX: setX,
    setY: setY,
    update: update,
    $el: $el
    //draw: draw
  };
  
};
