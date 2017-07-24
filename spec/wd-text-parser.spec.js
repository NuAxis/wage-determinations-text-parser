'use strict';

const WageDeterminationTextParser = require('../lib/wd-text-parser');
const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
chai.use(require('chai-json-schema'));

let wdSchema = require('./fixture/schema/wd-schema.json');
var parser;

describe('Wage Determination Text Parser Module', function() {
  before(function() {
     parser = new WageDeterminationTextParser();
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

    it('should get wage determination object', function(done) {
      parser.parseWageDeterminationTextFile('./spec/fixture/wd-format/wage-determination-format.text', function(error, wageDetermination) {
        // console.log('Object: '+JSON.stringify(wageDetermination));
        expect(error).to.be.undefined;
        expect(wageDetermination).to.be.defined;
        expect(wageDetermination).to.have.property('headerInformation');
        expect(wageDetermination).to.have.property('modifications');
        expect(wageDetermination).to.have.property('wageGroups');
        done();
      });
     });

    it('should get wage determination object from format0', function(done) {
      parser.parseWageDeterminationTextFile('./spec/fixture/wd-format/wage-determination0.text', function(error, wageDetermination) {
        // console.log('Object: '+JSON.stringify(wageDetermination));
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

       it('should get wage determination object from file content which may contains fringe from format8', function(done) {
         let fileContent = fs.readFileSync('./spec/fixture/wd-format/wage-determination8.text', 'UTF-8');
         parser.parseWageDeterminationText(fileContent, function(error, wageDetermination) {
           expect(error).to.be.undefined;
           expect(wageDetermination).to.be.defined;
           expect(wageDetermination).to.have.property('headerInformation');
           expect(wageDetermination).to.have.property('modifications');
           expect(wageDetermination).to.have.property('wageGroups');
           done();
         });
        });

        it('should get wage determination object from file content which may contains fringe from format9', function(done) {
          let fileContent = fs.readFileSync('./spec/fixture/wd-format/wage-determination9.text', 'UTF-8');
          parser.parseWageDeterminationText(fileContent, function(error, wageDetermination) {
            expect(error).to.be.undefined;
            expect(wageDetermination).to.be.defined;
            expect(wageDetermination).to.have.property('headerInformation');
            expect(wageDetermination).to.have.property('modifications');
            expect(wageDetermination).to.have.property('wageGroups');
            done();
          });
         });

         it('should get wage determination object from file content which may contains fringe from format wd-va1-2007', function(done) {
           let fileContent = fs.readFileSync('./spec/fixture/wd-format/wd-va1-2007.text', 'UTF-8');
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
