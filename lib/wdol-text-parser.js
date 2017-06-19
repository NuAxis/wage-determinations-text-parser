'use strict';

const fs = require('fs');

module.exports = function() {
  // Regular Expressions
  // const WD_HEADER_INFORMATION = /.*(General Decision Number|State|Construction Type(s?)|count(y|ies)):.*/gi;
  const WD_MODIFICATIONS = /Modification Number\s+Publication Date(\s{5,}\d+\s+\d{2}\/\d{2}\/\d{4})+/gi;
  const WD_WAGE_GROUPS = /[A-Z0-9\-]+\s+\d{2}\/\d{2}\/\d{4}\s+[\w\s;\)\(\/.\-]*rates\s+fringes[\s\S]*?\-{20,}/gi;
  const WD_WAGE_GROUP_HEADER_INFORMATION = /[A-Z0-9\-]+\s+\d{2}\/\d{2}\/\d{4}\s+[\w\s;\)\(\/.\-]*rates\s+fringes/gi;
  const WD_WG_OCCUPATION_GROUP = /^([\w:&\s\(\);\/\"\'\-&,\$])+^(\s{5,}.*)+/gim;
  // const WD_WG_OCCUPATION_GROUP = /^(\s{0,2}?\w[\w\s\/\)\(\*\-&:,\.]*)(^\s{5,}.*\s*)+\.+\$.*/gim;
  // const WD_WG_OCCUPATION = /^([\w:&,\/\(\);\'\"\*\-]\s*)+\.+\$.*/gim;
  const WD_WG_OCCUPATION = /^\s{0,2}\w[\s\S]*?\.+\$.*/gmi;

    let loadFileContent = function(filePath) {
      try {
        return fs.readFileSync(filePath, 'UTF-8');
      } catch (e) {
        return e;
      }
    };

    let parseWageDeterminationTextFile = function(filePath, callback) {
      var content = loadFileContent(filePath);
      if (typeof content === 'string') {
        callback(undefined, parseWageDetermination(content));
      } else {
        callback(new Error('Error Loading File Content', undefined));
      }
    };

    let parseWageDeterminationText = function(content, callback) {
      if (typeof content === 'string') {
        callback(undefined, parseWageDetermination(content));
      } else {
        callback(new Error('Error Loading File Content', undefined));
      }
    };

    let parseWageDetermination = function(content) {
      let headerInformation = parseHeaderIfo(content);
      let modifications = parseModifications(content);
      let wageGroups = parseWageGroups(content);
      return {
        'headerInformation': headerInformation,
        'modifications': modifications,
        'wageGroups': wageGroups,
      };
    };

    let parseHeaderIfo = function(content) {
    return {
      wageDeterminationCode: content.match(/^General Decision Number:.*/gmi).join('').replace(/^General Decision Number:/gmi, '').trim(),
      counties: content.match(/^count(y|ies):[\s\S]*?\./gmi).join('').replace(/^count(y|ies):/gmi, '').trim(),
      constructionTypes: content.match(/^Construction Typ(e|es):.*/gmi).join('').replace(/^Construction Typ(e|es):/gmi, '').trim(),
      state: content.match(/^stat(e|es):.*/gmi).join('').replace(/^stat(e|es):/gmi, '').trim(),
    };
  };

  let parseModifications = function(content) {
    let modifcationSection = WD_MODIFICATIONS[Symbol.match](content);
    var regex = /\d{2}\/\d{2}\/\d{4}/gi;
    let modifications = regex[Symbol.match](modifcationSection);
    return modifications;
  };

  let parseWageGroups = function(content) {
    let wageGroups = WD_WAGE_GROUPS[Symbol.match](content);
    let groups = [];
    if (wageGroups.length > 0) {
      wageGroups.forEach(function(wageGroup) {
        groups.push(parseWageGroup(wageGroup));
       });
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
    parseWageDeterminationTextFile: parseWageDeterminationTextFile,
    parseWageDeterminationText: parseWageDeterminationText,
  };
};
