'use strict';

var chai = require('chai');
var expect = chai.expect;

describe('Server Tests', function() {

  // should start emitting game state on client connect
  // should stop emitting game state on client diconnect
  // game state obect chould contain
  // -- list of clients
  // -- -- positions
  // -- -- velocities
  // should have gamestate object
  // should update game state on receipt of client input
  // client input object should include
  // -- diection
  // -- velocity

  it('should dummy test', function() {
    var foo = 'bar';
    expect(foo).to.equal('bar');
  });
});
