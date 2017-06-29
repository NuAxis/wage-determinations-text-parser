'use strict';

let parser = require('./lib/wd-text-parser')();
module.exports = {
    parseWageDeterminationTextFile: parser.parseWageDeterminationTextFile,
    parseWageDeterminationText: parser.parseWageDeterminationText
  };
