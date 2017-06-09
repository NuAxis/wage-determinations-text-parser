'use strict';

const fs = require('fs');

module.exports = function(fileName) {
  var content = '';
  // Regular Expressions
  const WD_HEADER_INFORMATION = /.*(General Decision Number|State|Construction Types|Counties):.*/gi;
  const WD_MODIFICATIONS = /Modification Number\s+Publication Date(\s{5,}\d+\s+\d{2}\/\d{2}\/\d{4})+/gi;
  const WD_WAGE_GROUPS = /[A-Z0-9\-]+\s+\d{2}\/\d{2}\/\d{4}\s+[\w\s;\)\(\/.\-]*rates\s+fringes[\s\S]*?\-{20,}/gi;
  const WD_WAGE_GROUP_HEADER_INFORMATION = /[A-Z0-9\-]+\s+\d{2}\/\d{2}\/\d{4}\s+[\w\s;\)\(\/.\-]*rates\s+fringes/gi;
  const WD_WG_OCCUPATION_GROUP = /^([\w:&\s\(\);\/\"\'\-&,\$])+^(\s{5,}.*)+/gim;
  const WD_WG_OCCUPATION = /^([\w:&,\/\(\);\'\"\*\-]\s*)+\.+\$.*/gim;

  // Objects definitions
  // var wageGroupObj = {};
  // var occupationObj = {};
  // var wagedetermination = {};

    let init = function(fileName) {
      content = fs.readFileSync(fileName, 'UTF-8');
    };
    init(fileName);

    let fetchHeaderIfo = function() {
    let headerRows = WD_HEADER_INFORMATION[Symbol.match](content);
    var headerObj = {};
    if (headerRows.length > 2) {
      headerRows.forEach(function(row) {
        let fields = row.split(': ');
        if (fields.length == 2) {
               headerObj[fields[0]] = headerObj[fields[1]];
             }
           });
         }
    return headerObj;
  };

  let fetchModifications = function() {
    let modifcationSection = WD_MODIFICATIONS[Symbol.match](content);
    var regex = /\d{2}\/\d{2}\/\d{4}/gi;
    let modifications = regex[Symbol.match](modifcationSection);
    return modifications;
  };

  let parseWageGroups = function() {
    let wageGroups = WD_WAGE_GROUPS[Symbol.match](content);
    let groups = [];
    if (wageGroups.length > 0) {
      wageGroups.forEach(function(wageGroup) {
        groups.push(parseWageGroup(wageGroup));
       });
       console.log(JSON.stringify(groups));
       return groups;
    }
  };

  let parseWageGroup = function(wageGroup) {
    // Get group information and remove rates frignes heading line
    let wageGroupHeader = WD_WAGE_GROUP_HEADER_INFORMATION[Symbol.match](wageGroup);
    let wagegGroupCode = /^(.*[A-Z0-9]{8}-[0-9]{3}\s+\d{2}\/\d{2}\/\d{4})/gim[Symbol.match](wageGroupHeader).toString();
    let occupations = wageGroup.replace(wageGroupHeader, '');
    let wageGroupOccupations = parseOccupations(occupations);
    return {
      'wageGroupCode': wagegGroupCode,
      'occupations': wageGroupOccupations,
    };
  };

  let parseOccupations = function(occupations) {
    let occupationsObj = [];
    // Occupation Rate Groups
    let occupationRateGroup = WD_WG_OCCUPATION_GROUP[Symbol.match](occupations);
    if (occupationRateGroup !== null && occupationRateGroup.length > 0) {
      occupationRateGroup.forEach(function(rateGroup) {
        occupationsObj.push(parseOccupationRateGroup(rateGroup));
      });
    }

    // Occupation Rates
    let occupationRateContent = occupations.replace(WD_WG_OCCUPATION_GROUP, '');
    let occupationRates = WD_WG_OCCUPATION[Symbol.match](occupationRateContent);
    if (occupationRates != null && occupationRates.length > 0) {
      occupationRates.forEach(function(occupationRate) {
       occupationsObj.push(parseOccupationRate(occupationRate));
     });
    }
    return occupationsObj;
  };

  let parseOccupationRate = function(occupationRate) {
     // Sample Occpation Rate GROUP 1.....................$ 30.55     26.72
     let occupationRateRow = occupationRate.replace(/\.+/, '___');
     let occupationFields = occupationRateRow.split('___');
     if (occupationFields.length == 2) {
        let title = occupationFields[0].replace(/\r?\n|\r/g, ' ');
        let fringeraterow = occupationFields[1];
        let rate = fringeraterow.match(/\$\s+\d+.\d+(?=(\s+\d*.?\d*)?)/gmi).join('');
        let fringe = fringeraterow.replace(rate, '').trim();

        return {
          'title': title,
          'rate': rate.replace('\$', '').trim(),
          'fringe': (fringe.trim().length > 0 ? fringe : '0.0'),
           'isGroup': false,
        };
      }
  };

  let parseOccupationRateGroup = function(occupationRateGroup) {
  let parseOccupationRateGroupObj = [];
  let occupationRateGroupName = occupationRateGroup.match(/^[\s\S]*?(?=^(\s{5}.*)+)/gmi).join('');
  let occupationRatesContent = occupationRateGroup.replace(occupationRateGroupName, '').replace(/^\s{5,}/gmi, '');
  let occupationRates = WD_WG_OCCUPATION[Symbol.match](occupationRatesContent);
   if (occupationRates != null && occupationRates.length > 0) {
     occupationRates.forEach(function(occupationRate) {
      parseOccupationRateGroupObj.push(parseOccupationRate(occupationRate));
    });
   }
   return {
     'title': occupationRateGroupName,
     'rates': parseOccupationRateGroupObj,
     'isGroup': true,
   };
  };

  return {
    getHeaderInformation: fetchHeaderIfo,
    getModifications: fetchModifications,
    getWageGroups: parseWageGroups,

  };
};
