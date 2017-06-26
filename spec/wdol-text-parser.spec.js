'use strict';

const WdolTextParser = require('../lib/wdol-text-parser');
const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
chai.use(require('chai-json-schema'));

let wdSchema = require('./fixture/schema/wd-schema.json');
 var parser;

describe('WDOL Text Parser module', function() {
  before(function() {
     parser = new WdolTextParser();
  });

  it('should validate the schema of wage-determination', function(done) {
    parser.parseWageDeterminationTextFile('./spec/fixture/wd-format/wage-determination1.text', function(error, wageDetermination) {
      expect(wageDetermination).to.be.jsonSchema(wdSchema);
      done();
    });
   });

  it('should get wage determination object from file path', function(done) {
    parser.parseWageDeterminationTextFile('./spec/fixture/wd-format/wage-determination1.text', function(error, wageDetermination) {
      expect(error).to.be.undefined;
      expect(wageDetermination).to.be.defined;
      expect(wageDetermination).to.have.property('headerInformation');
      expect(wageDetermination).to.have.property('modifications');
      expect(wageDetermination).to.have.property('wageGroups');
      done();
    });
   });

   it('should get wage determination object from file content', function(done) {
     let fileContent = fs.readFileSync('./spec/fixture/wd-format/wage-determination4.text', 'UTF-8');
     parser.parseWageDeterminationText(fileContent, function(error, wageDetermination) {
       expect(error).to.be.undefined;
       expect(wageDetermination).to.be.defined;
       expect(wageDetermination).to.have.property('headerInformation');
       expect(wageDetermination).to.have.property('modifications');
       expect(wageDetermination).to.have.property('wageGroups');
       done();
     });
    });

   it('should throw error when given wrong filePath', function(done) {
      parser.parseWageDeterminationTextFile('./spec/fixture/wage-determination.textd', function(error, wageDetermination) {
        expect(error).to.be.defined;
        done();
      });
    });
});
