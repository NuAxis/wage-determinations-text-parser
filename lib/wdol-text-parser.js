'use strict';
// request.debug = true;

module.exports = function(fileName) {
  const fs = require('fs');
  var content = '';

  // Objects definitions
  // var wageGroupObj = {};
  // var occupationObj = {};
  // var wagedetermination = {};

    let init = function(fileName) {
      content = fs.readFileSync(fileName, 'UTF-8');
    };

    init(fileName);

  let fetchHeaderIfo = function() {
    var regex = /.*(General Decision Number|State|Construction Types|Counties):.*/gi;
    let headerRows = regex[Symbol.match](content);
    var headerObj = {};
    if (headerRows.length > 2) {
      headerRows.forEach(function(row) {
           var fields = row.split(': ');
           if (fields.length == 2) {
               headerObj[fields[0]] = headerObj[fields[1]];
             }
       });
       // wagedetermination.headers = headerObj;
    }
    return headerObj;
  };

  let fetchModifications = function() {
    var regex = /Modification Number\s+Publication Date(\s{5,}\d+\s+\d{2}\/\d{2}\/\d{4})+/gi;
    let modifcationSection = regex[Symbol.match](content);

    regex = /\d{2}\/\d{2}\/\d{4}/gi;
    let modifications = regex[Symbol.match](modifcationSection);
    // headerObj.modifications = modifications;
    return modifications;
  };

  let parseWageGroups = function() {
    var regex = /[A-Z0-9\-]+\s+\d{2}\/\d{2}\/\d{4}\s+[\w\s]*rates\s+fringes[\s\S]*?\-{20,}/gi;
    let wageGroups = regex[Symbol.match](content);
    var groups = [];
    if (wageGroups.length > 0) {
      wageGroups.forEach(function(wageGroup) {
        // console.log(wageGroup);
        groups.push(parseWageGroup(wageGroup));
       });
       return groups;
    }
    return null;
  };

  let parseWageGroup = function(wageGroup) {
    // Get group information and remove rates frignes heading line
    var regex = /[A-Z0-9\-]+\s+\d{2}\/\d{2}\/\d{4}\s+[\w\s]*rates\s+fringes/gi;
  //  let wageGroupHeader = regex[Symbol.match](wageGroup);
  //  let wagegGroupCode = /[A-Z0-9\-]+\s+\d{2}\/\d{2}\/\d{4}/gi[Symbol.match](wageGroupHeader);
    // console.log('Wage Header Information :' + wagegGroupCode + '\n');
    let occupations = wageGroup.replace(regex, '');
    // console.log('Occupations :'+occupations + '\n');
    return parseOccupations(occupations);
  };

  let parseOccupations = function(occupations) {
    var occupationsObj = [];
    const OCCUPATION_GROUP_REGEX = /^([\w:&\s\(\);\/\"\'\-])+^(\s{5,}.*)+/gim;
    const OCCUPATION_REGEX = /^([\w:&,\/\(\);\'\"\*\-]\s*)+\.+\$.*/gim;
    // console.log('Occupations:  '+occupations +'\n');
    // Occupation Rate Groups
    let occupationRateGroup = OCCUPATION_GROUP_REGEX[Symbol.match](occupations);
    if (occupationRateGroup !== null && occupationRateGroup.length > 0) {
      occupationRateGroup.forEach(function(rateGroup) {
        occupationsObj.push(parseOccupationRateGroup(rateGroup));
      });
    }
    // Occupation Rates
    let occupationRateContent = occupations.replace(OCCUPATION_GROUP_REGEX, '');
    let occupationRates = OCCUPATION_REGEX[Symbol.match](occupationRateContent);
    if (occupationRates != null && occupationRates.length > 0) {
      occupationRates.forEach(function(occupationRate) {
       occupationsObj.push(parseOccupationRate(occupationRate));
     });
    }

    return occupationsObj;
  };
  var counter = 0;
  let parseOccupationRate = function(occupationRate) {
     // Sample Occpation Rate GROUP 1.....................$ 30.55     26.72
     let occupationRateRow = occupationRate.replace(/\.+/, '___');
     let occupationFields = occupationRateRow.split('___');
    //   console.log('\nOccupation: \n'+occupationRateRow);
     if (occupationFields.length == 2) {
        let title = occupationFields[0];
        let fringeraterow = occupationFields[1];
        fringeraterow = fringeraterow.replace('$ ', '');
        var fringeratefields = fringeraterow.split(/\s+/gmi);
        if (fringeratefields.length == 2) {
            console.log('Counter'+(++counter)+'\n Title: '+title+' Rate: '+fringeratefields[0]+' Fringe: '+ fringeratefields[1]);
        }
    }
    return 'occupationRate';
  };

  let parseOccupationRateGroup = function(occupationRateGroup) {
  let occupationRateGroupName = occupationRateGroup.match(/^[\s\S]*?(?=^(\s{5}.*)+)/gmi).join('');
   console.log('\nOccupation Rate Group Split: \n'+occupationRateGroupName);
    return 'occupationRateGroup';
  };

  return {
    getHeaderInformation: fetchHeaderIfo,
    getModifications: fetchModifications,
    getWageGroups: parseWageGroups,

  };
};
