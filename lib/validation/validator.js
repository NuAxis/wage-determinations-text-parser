'use strict';

let WageDeterminationError = require('./wd-error');
let WDErrorDescription = require('./wd-error-description');
const REGEX = require('../wd-regex');

module.exports = function() {
  let validate = function(wageDetermination) {
    if (typeof wageDetermination !== 'string') {
        return new WageDeterminationError(
          'Invalid File Content',
          'File content should be text or UTF-8 econded',
          '');
    }

    let errors = [];
    let wageDeterminationCodeRow = match(REGEX.WD_CODE, wageDetermination);
    if (wageDeterminationCodeRow == null) {
      errors.push(WDErrorDescription.WD_CODE);
    }

    let countiesCodeRow = match(REGEX.WD_COUNTY, wageDetermination);
    if (countiesCodeRow == null) {
      errors.push(WDErrorDescription.COUNTY);
    }

    let constructionTypesRow = match(REGEX.WD_CONSTRUCTION_TYPE, wageDetermination);
    if (constructionTypesRow == null) {
      errors.push(WDErrorDescription.CONSTRUCTION_TYPE);
    }

    let stateRow = match(REGEX.WD_STATE, wageDetermination);
    if (stateRow == null) {
      errors.push(WDErrorDescription.STATE);
    }
    let modifcationSection = match(REGEX.WD_MODIFICATIONS, wageDetermination);
    if (modifcationSection == null) {
      errors.push(WDErrorDescription.MODIFCATIONS);
    }

    let wageGroups = wageDetermination.match(REGEX.WD_WAGE_GROUPS);
    if (wageGroups == null) {
      errors.push(WDErrorDescription.WAGE_GROUPS);
    }

    if(wageGroups != null && wageGroups.length > 0) {
      let occupations = wageGroups.join('\n').match(REGEX.WD_WG_OCCUPATION);
      if (occupations == null || occupations.length == 0) {
        errors.push(WDErrorDescription.WG_OCCUPATIONS);
      }
    }

    if (errors.length > 0) {
      if (errors != null && (Array.isArray(errors))) {
        let descriptions = [];
        errors.forEach(function(description) {
          descriptions.push(description.prettyFormat());
        });
        return new WageDeterminationError(
          'Missing Required Fields',
          descriptions.join('\n'),
          'The document must contain the required data'
        );
      }
    }
    return null;
  };

  //  Helper Methods
  let match = function(pattern, subject) {
    let result = subject.match(pattern);
    if (result != null) {
      return result.join('');
    }
    return null;
  };

  return {
    validate: validate,
  };
};
