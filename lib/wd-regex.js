'use strict';
module.exports = {
  WD_CODE: /^General Decision Number:.*/gmi,
  WD_STATE: /^stat(e|es):.*/gmi,
  WD_COUNTY: /^count(y|ies):[\s\S]*?\./gmi,
  WD_CONSTRUCTION_TYPE: /^Construction Typ(e|es):.*/gmi,
  WD_MODIFICATIONS: /Modification Number\s+Publication Date(\s{5,}\d+\s+\d{2}\/\d{2}\/\d{4})+/gi,
  WD_WAGE_GROUPS: /^.*?[A-Z]{4}[0-9]{4}-[0-9]{3}\s+\d{2}\/\d{2}\/\d{4}[\s\S]*?rates\s+fringes[\s\S]*?(\-{64,})$/gmi,
  WD_WAGE_GROUP_HEADER_INFORMATION: /^.*?[A-Z]{4}[0-9]{4}-[0-9]{3}\s+\d{2}\/\d{2}\/\d{4}[\s\S]*?rates\s+fringes\n+/gmi,
  WD_WG_OCCUPATION: /[\s\S]*?\.+\$.*/gmi,
  WD_WG_OCCUPATION_GROUP: /^\S[\S\s]*?(^\s+.*\n*)+/gmi,
  WD_WG_QUALIFIER_TEXT: 'GROUP QUALIFIER NOTES:',
};
