'use strict';

  const WdolTextParser = require('../lib/wdol-text-parser');
  const chai = require('chai');
  const expect = chai.expect;

 var parser;

describe('WDOL Text Parser module', function() {
  before(function() {
     parser = new WdolTextParser();
  });

  it('should get wage determination object', function(done) {
     parser.getWageDetermination('./spec/fixture/wage-determination.text', function(error, wageDetermination) {
       expect(error).to.be.undefined;
       expect(wageDetermination).to.be.defined;
       expect(wageDetermination).to.have.property('headerInformation');
       expect(wageDetermination).to.have.property('modifications');
       expect(wageDetermination).to.have.property('wageGroups');
       done();
     });
   });

   it('should throw error when given wrong filePath', function(done) {
      parser.getWageDetermination('./spec/fixture/wage-determination.textd', function(error, wageDetermination) {
        expect(error).to.be.defined;
        done();
      });
    });
});
