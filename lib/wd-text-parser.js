'use strict';

const fs = require('fs');
let WageDeterminationError = require('./wd-error');
let WDErrorDescription = require('./wd-error-description');

const WD_CODE = /^General Decision Number:.*/gmi;
const WD_STATE = /^stat(e|es):.*/gmi;
const WD_COUNTY = /^count(y|ies):[\s\S]*?\./gmi;
const WD_CONSTRUCTION_TYPE = /^Construction Typ(e|es):.*/gmi;
const WD_MODIFICATIONS = /Modification Number\s+Publication Date(\s{5,}\d+\s+\d{2}\/\d{2}\/\d{4})+/gi;
const WD_WAGE_GROUPS = /^.*?[A-Z]{4}[0-9]{4}-[0-9]{3}\s+\d{2}\/\d{2}\/\d{4}[\s\S]*?rates\s+fringes[\s\S]*?(\-{64,})$/gmi;
const WD_WAGE_GROUP_HEADER_INFORMATION = /^.*?[A-Z]{4}[0-9]{4}-[0-9]{3}\s+\d{2}\/\d{2}\/\d{4}[\s\S]*?rates\s+fringes\n+/gmi;
const WD_WG_OCCUPATION = /[\s\S]*?\.+\$.*/gmi;
const WD_WG_OCCUPATION_GROUP = /^\w[\S\s]*?(^\s+.*\n*)+/gmi;
const WD_WG_QUALIFIER_TEXT = 'GROUP QUALIFIER NOTES:';

module.exports = function() {
    let loadFileContent = function(filePath) {
      try {
        return fs.readFileSync(filePath, 'UTF-8');
      } catch (e) {
        return e;
      }
    };

    let parseWageDeterminationTextFile = function(filePath, callback) {
      var content = loadFileContent(filePath);
      try {
        callback(undefined, parseWageDetermination(content));
      } catch (exception) {
        callback(exception, undefined);
      }
    };

    let parseWageDeterminationText = function(content, callback) {
      try {
        callback(undefined, parseWageDetermination(content));
      } catch (exception) {
        callback(exception, undefined);
      }
    };

    let parseWageDetermination = function(wageDetermination) {
      let errors = validateWageDeterminationText(wageDetermination);
      if (errors.length > 0) {
        throw new WageDeterminationError('Invalid File Format', JSON.stringify(errors), 'See the example of valide file format');
      }
      let headerInformation = parseHeaderIfo(wageDetermination);
      let modifications = parseModifications(wageDetermination);
      let wageGroups = parseWageGroups(wageDetermination);
      return {
        'headerInformation': headerInformation,
        'modifications': modifications,
        'wageGroups': wageGroups,
      };
    };

    let validateWageDeterminationText = function(wageDetermination) {
      let errors = [];
      let wageDeterminationCodeRow = match(WD_CODE, wageDetermination);
      if (wageDeterminationCodeRow == null) {
        errors.push(WDErrorDescription.WD_CODE);
      }

      let countiesCodeRow = match(WD_COUNTY, wageDetermination);
      if (countiesCodeRow == null) {
        errors.push(WDErrorDescription.COUNTY);
      }

      let constructionTypesRow = match(WD_CONSTRUCTION_TYPE, wageDetermination);
      if (constructionTypesRow == null) {
        errors.push(WDErrorDescription.CONSTRUCTION_TYPE);
      }

      let stateRow = match(WD_STATE, wageDetermination);
      if (stateRow == null) {
        errors.push(WDErrorDescription.STATE);
      }
      let modifcationSection = match(WD_MODIFICATIONS, wageDetermination);
      if (modifcationSection == null) {
        errors.push(WDErrorDescription.MODIFCATIONS);
      }

      let wageGroups = wageDetermination.match(WD_WAGE_GROUPS);
      if (wageGroups == null) {
        errors.push(WDErrorDescription.WAGE_GROUPS);
      }

      if(wageGroups != null && wageGroups.length > 0) {
        let occupations = wageGroups.join('\n').match(WD_WG_OCCUPATION);
        if (occupations == null || occupations.length == 0) {
          errors.push(WDErrorDescription.WG_OCCUPATIONS);
        }
      }

      return errors;
    };

    let parseHeaderIfo = function(content) {
      let wageDeterminationCodeRow = match(WD_CODE, content);
      let countiesCodeRow = match(WD_COUNTY, content);
      let constructionTypesRow = match(WD_CONSTRUCTION_TYPE, content);
      let stateRow = match(WD_STATE, content);
      return {
        wageDeterminationCode: (wageDeterminationCodeRow !== null ? replace(/^General Decision Number:/gmi, wageDeterminationCodeRow) : null),
        counties: (countiesCodeRow !== null ? replace(/^count(y|ies):/gmi, countiesCodeRow): null),
        constructionTypes: (constructionTypesRow !== null ? replace(/^Construction Typ(e|es):/gmi, constructionTypesRow) : null),
        state: (stateRow !== null ? replace(/^stat(e|es):/gmi, stateRow) : null),
    };
  };

  let parseModifications = function(content) {
    let modifcationSection = match(WD_MODIFICATIONS, content);
    let modifications = modifcationSection !== null ? modifcationSection.match(/\d{2}\/\d{2}\/\d{4}/gi) : null;
    return modifications;
  };

  let parseWageGroups = function(content) {
    let wageGroups = content.match(WD_WAGE_GROUPS);
    let groups = [];
    if (wageGroups !== null && wageGroups.length > 0) {
      wageGroups.forEach(function(wageGroup) {
        groups.push(parseWageGroup(wageGroup));
       });
       return groups;
    }
  };

 // TODO: improve exception handling
  let parseWageGroup = function(wageGroup) {
    let wageGroupHeader = '';
    let wageGroupCode = '';
    // Get group information and remove rates frignes heading line
    let result = matchAndReplace(WD_WAGE_GROUP_HEADER_INFORMATION, wageGroup);
    if (result != null) {
      wageGroupHeader = result.match;
      wageGroup = result.updatedSubject;
    }
    // Wage Group Code from wagegroup header
    result = match(/^(.*[A-Z0-9]{8}-[0-9]{3}\s+\d{2}\/\d{2}\/\d{4})/gmi, wageGroupHeader);
    if (result !== null) {
      wageGroupCode = result.match;
    }
     // wagegroup qualifier
    let wageGroupQualifier = '';
    let wageGroupOccupationsContent = '';
    let rates = wageGroup.match(/.*\.+\$.*/gmi);
    if (rates !== null && rates.length > 0) {
         let lastRate = rates[rates.length -1];
         let addingCustomPlaceHolderRegex = new RegExp('^' + escapeRegExp(lastRate), 'gmi');
         wageGroup = wageGroup.replace(addingCustomPlaceHolderRegex, lastRate + '\n' + WD_WG_QUALIFIER_TEXT);
         let wageGroupQualitfierRegex = new RegExp('^' + escapeRegExp(WD_WG_QUALIFIER_TEXT) + '[\\s\\S]*?(\\-{64,})$', 'gmi');
         result = matchAndReplace(wageGroupQualitfierRegex, wageGroup);
         if (result !== null) {
           // remove custom placeholder for detecting notes in text format
           wageGroupQualifier = result.match;
           wageGroupQualifier = wageGroupQualifier.replace(new RegExp('^' + escapeRegExp(WD_WG_QUALIFIER_TEXT), 'gmi'), '');
           if (wageGroupQualifier.match(/^\-+/gmi)) {
             wageGroupQualifier = wageGroupQualifier.replace(/^\-+/gmi, '');
           }
           wageGroupOccupationsContent = result.updatedSubject;
         }
         let wageGroupOccupations = parseOccupations(wageGroupOccupationsContent);
         return {
           'wageGroupCode': wageGroupCode,
           'wageGroupQualifier': wageGroupQualifier,
           'occupations': wageGroupOccupations,
         };
    }
    return null;
  };

 let matchAndReplace = function(pattern, subject) {
   let matched = match(pattern, subject);
   if (matched != null) {
     return {
       'match': matched,
       'updatedSubject': subject.replace(pattern, ''),
     };
   }
   return null;
 };

  let parseOccupations = function(occupations) {
    let occupationGroupObject = [];
    occupations = reformatText(occupations);
    let allLinesOfOccupations = occupations.match(/^.*[\S\s]$/gmi);
    let singleLevelQualifiedBucket = [];
    let multilevelOccupations = [];
    if (allLinesOfOccupations.length !== null && allLinesOfOccupations.length > 0) {
      for(let i = 0; i < allLinesOfOccupations.length; i++) {
        let currentLine = allLinesOfOccupations[i];
        let spaceCountLine = countNumberOfWhiteSpacesBeforeStartOfText(currentLine);
        if(spaceCountLine == 0) {
          singleLevelQualifiedBucket.push(currentLine);
          if (currentLine.match(/^.*\.+\$.*/gmi) != null) {
            let flatOccupation = singleLevelQualifiedBucket.join('\n');
            singleLevelQualifiedBucket = [];
            occupationGroupObject.push(parseOccupation(flatOccupation));
          }
        } else if(spaceCountLine > 0) {
          if (singleLevelQualifiedBucket.length > 0) {
              multilevelOccupations.push(singleLevelQualifiedBucket.join('\n'));
              singleLevelQualifiedBucket = [];
          }
          multilevelOccupations.push(currentLine);
        }
      }
    }

    if (multilevelOccupations.length > 0) {
      let occupationGroups = multilevelOccupations.join('\n').match(WD_WG_OCCUPATION_GROUP);
      if (occupationGroups !== null && occupationGroups.length > 0) {
        occupationGroups.forEach(function(occupationGroup) {
          // console.log('MultiGroups:\n'+ occupationGroup);
          let levels = measureDepthOfOccupationGroup(occupationGroup);
          let spacecount = levels[1]; // fetch the name till level one which is group name
          let groupNameRegexString = '^\\w[\\s\\S]*?(?=^(\\s{' + spacecount + '}.*)+)';
          let groupNameRegex = new RegExp(groupNameRegexString, 'gmi');
          let result = matchAndReplace(groupNameRegex, occupationGroup);
          if (result != null ) {
            let occupationGroupName = result.match;
            occupationGroup = result.updatedSubject;
            // console.log('GroupName: '+ occupationGroupName);
            // console.log('SubGroups: \n'+ occupationGroup);
            occupationGroupObject.push({
              title: occupationGroupName,
              rates: parseOccupations(occupationGroup),
              isGroup: true,
            });
          }
        });
        return occupationGroupObject;
      }
    }
    return occupationGroupObject;
  };

  let parseOccupation = function(occupation) {
     // Sample Occpation Rate GROUP 1.....................$ 30.55     26.72
     let result = occupation.match(WD_WG_OCCUPATION);
     if (result == null && result.length == 0) return null;
     let title = '';
     let rate = 0.0;
     let fringe = 0.0;

     let titleResult = matchAndReplace(/^[\s\S]+?\.+\$/gmi, occupation);
     if (titleResult == null) return null;
     title = titleResult.match.replace(/\.+\$/g, '');
     let occupationRateRow = titleResult.updatedSubject;
     let rates = occupationRateRow.match(/[\d]*\.\d+/gmi);
     if (rates != null && rates.length > 0) {
       rate = rates[0];
       if (rates.length > 1) {
         fringe = rates[1];
       }
     }
     return {
       'title': title,
       'rate': rate,
       'fringe': fringe,
        'isGroup': false,
     };
  };

  //  Helper Methods
  let match = function(pattern, subject) {
    let result = subject.match(pattern);
    if (result != null) {
      return result.join('');
    }
    return null;
  };

  let replace = function(pattern, subject) {
    return subject.replace(pattern, '');
  };

  let measureDepthOfOccupationGroup = function(occupationGroup) {
    let occupationGroupLines = occupationGroup.match(/(^.*)/gmi);
    let occupationGroupLinesSpaces = [];
    if (occupationGroupLines != null && occupationGroupLines.length > 0) {
      occupationGroupLines.forEach(function(line) {
        let spacecount = countNumberOfWhiteSpacesBeforeStartOfText(line);
        if ((spacecount <= -1) ||
        (spacecount < occupationGroupLinesSpaces[occupationGroupLinesSpaces.length-1] && spacecount > 0)) {
          return;
        } else {
          occupationGroupLinesSpaces.push(spacecount);
        }
      });
    }
    let occupationGroupDepth = occupationGroupLinesSpaces.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    });
    return occupationGroupDepth;
  };

  let countNumberOfWhiteSpacesBeforeStartOfText = function(value) {
     return Number(value.search(/\S/gmi));
  };

  let reformatText = function(value) {
    var whiteSpacesBeforeText = Number(value.search(/\S/gmi));
    var regex = new RegExp('^\\s{' + whiteSpacesBeforeText + '}', 'gmi');
    return value.replace(regex, '');
  };

  let escapeRegExp = function(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  return {
    parseWageDeterminationTextFile: parseWageDeterminationTextFile,
    parseWageDeterminationText: parseWageDeterminationText,
  };
};
