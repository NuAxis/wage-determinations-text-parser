'use strict';

const parser = require('../index');
const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
chai.use(require('chai-json-schema'));

let wdSchema = require('./fixture/schema/wd-schema.json');

describe('Wage Determination Index', function() {
  before(function() {
  });

  describe('Validation', function() {
    it('should throw error parsing non required fields', function(done) {
      parser.parseWageDeterminationTextFile('./spec/fixture/wd-format/wd-invalid-format.text', function(error, wageDetermination) {
        expect(error).be.define;
        done();
      });
     });

     it('should throw error on invalide file format or content', function(done) {
       parser.parseWageDeterminationTextFile('./spec/fixture/wd-format/wd-partial-invalid-format.text', function(error, wageDetermination) {
         expect(error).be.define;
         done();
       });
      });

      it('should throw error when given wrong file path', function(done) {
         parser.parseWageDeterminationTextFile('./spec/dsdfa', function(error, wageDetermination) {
           expect(error).to.be.defined;
           done();
         });
       });

       it('should throw error on providing non-text format', function(done) {
         parser.parseWageDeterminationText(12345678, function(error, wageDetermination) {
           expect(error).to.be.defined;
           done();
         });
        });
  });

  describe('Different Text Formats', function() {
    it('should validate the schema of wage-determination', function(done) {
      parser.parseWageDeterminationTextFile('./spec/fixture/wd-format/wage-determination1.text', function(error, wageDetermination) {
        expect(wageDetermination).to.be.jsonSchema(wdSchema);
        done();
      });
    });

    it('should get wage determination object from format0', function(done) {
      parser.parseWageDeterminationTextFile('./spec/fixture/wd-format/wage-determination0.text', function(error, wageDetermination) {
        expect(error).to.be.undefined;
        expect(wageDetermination).to.be.defined;
        expect(wageDetermination).to.have.property('headerInformation');
        expect(wageDetermination).to.have.property('modifications');
        expect(wageDetermination).to.have.property('wageGroups');
        done();
      });
     });
    it('should get wage determination object from format1', function(done) {
      parser.parseWageDeterminationTextFile('./spec/fixture/wd-format/wage-determination1.text', function(error, wageDetermination) {
        expect(error).to.be.undefined;
        expect(wageDetermination).to.be.jsonSchema(wdSchema);
        expect(wageDetermination).to.be.defined;
        expect(wageDetermination).to.have.property('headerInformation');
        expect(wageDetermination).to.have.property('modifications');
        expect(wageDetermination).to.have.property('wageGroups');
        // console.log('Object: '+JSON.stringify(wageDetermination));
        done();
      });
     });

    it('should get wage determination object from format3', function(done) {
      parser.parseWageDeterminationTextFile('./spec/fixture/wd-format/wage-determination3.text', function(error, wageDetermination) {
        expect(error).to.be.undefined;
        expect(wageDetermination).to.be.jsonSchema(wdSchema);
        expect(wageDetermination).to.be.defined;
        expect(wageDetermination).to.have.property('headerInformation');
        expect(wageDetermination).to.have.property('modifications');
        expect(wageDetermination).to.have.property('wageGroups');
        // console.log('Object: '+JSON.stringify(wageDetermination));
        done();
      });
     });

     it('should get wage determination object from format4', function(done) {
       let fileContent = fs.readFileSync('./spec/fixture/wd-format/wage-determination4.text', 'UTF-8');
       parser.parseWageDeterminationText(fileContent, function(error, wageDetermination) {
         expect(error).to.be.undefined;
         expect(wageDetermination).to.be.jsonSchema(wdSchema);
         expect(wageDetermination).to.be.defined;
         expect(wageDetermination).to.have.property('headerInformation');
         expect(wageDetermination).to.have.property('modifications');
         expect(wageDetermination).to.have.property('wageGroups');
         done();
       });
      });

      it('should get wage determination object from file content which may contains fringe from format7', function(done) {
        let fileContent = fs.readFileSync('./spec/fixture/wd-format/wage-determination7.text', 'UTF-8');
        parser.parseWageDeterminationText(fileContent, function(error, wageDetermination) {
          expect(error).to.be.undefined;
          expect(wageDetermination).to.be.defined;
          expect(wageDetermination).to.have.property('headerInformation');
          expect(wageDetermination).to.have.property('modifications');
          expect(wageDetermination).to.have.property('wageGroups');
          done();
        });
       });
  });
});
