'use strict';

var chai = require('chai');
var WdolTextParser = require('../lib/wdolTextParser');
var expect = chai.expect;

describe('WDOL Text Parser module', function() {
  describe('WDOL Text Parser', function() {
    afterEach(function() {
    });

    it('should initialize the module', function(done) {
      var parser = new WdolTextParser();
      expect(parser).to.be.an('object');
      done();
    });
  });
});
