'use strict';

  const WdolTextParser = require('../lib/wdol-text-parser');
  const chai = require('chai');
  const expect = chai.expect;

 var parser;

describe('WDOL Text Parser module', function() {
  before(function() {
     parser = new WdolTextParser('./lib/content/wage-determination.text');
  });

  it('should parser headre information', function(done) {
       let result = parser.getHeaderInformation();
       expect(result).to.be.a('object');
       done();
  });

  it('should parse Modifcation Section', function(done) {
       let result = parser.getModifications();
       expect(result).to.be.a('array');
       done();
  });

  it('should parse Wage Groups', function(done) {
       let result = parser.getWageGroups();
       expect(result).to.be.a('array');
       done();
  });
});
