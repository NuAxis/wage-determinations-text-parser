module.exports = {
  WD_CODE: {
    title: 'Wage Determination Code',
    message: 'Missing Wage Determination Code',
    example: 'General Decision Number: CA20170032 07/07/2017',
    prettyFormat: function() {
      return this.title + '\n' +
      this.message + '\n' +
      'File should contain \''+this.example +'\''+
      '\n------------------------------------';
    },
  },
  STATE: {
    title: 'State',
    message: 'Missing State information in the wage determination ',
    example: 'State: Virginia',
    prettyFormat: function() {
      return this.title + '\n' +
      this.message + '\n' +
      'File should contain \''+this.example +'\''+
      '\n------------------------------------';
    },
  },
  COUNTY: {
    title: 'County',
    message: 'Missing counties ',
    example: 'County: Tulare County in California.',
    prettyFormat: function() {
      return this.title + '\n' +
      this.message + '\n' +
      'File should contain \''+this.example +'\''+
      '\n------------------------------------';
    },
  },
  CONSTRUCTION_TYPE: {
    title: 'Construction Type',
    message: 'Missing Construction Types.',
    example: ' Construction Type: HIGHWAY',
    prettyFormat: function() {
      return this.title + '\n' +
      this.message + '\n' +
      'File should contain \''+this.example +'\''+
      '\n------------------------------------';
    },
  },
  MODIFCATIONS: {
    title: 'Modifcations',
    message: 'Missing Modifications',
    example: 'Modification Number     Publication Date\n              0             02/08/2008',
    prettyFormat: function() {
      return this.title + '\n' +
      this.message + '\n' +
      'File should contain \''+this.example +'\''+
      '\n------------------------------------';
    },
  },
  WAGE_GROUPS: {
    title: 'Wage Group',
    message: 'There must be at least one wage group in the wage determination',
    example: 'ELEC0637-006 01/01/2004  \n' +
 '                                     Rates          Fringes  \n' +
 '\nElectricians (Including \n ' +
 'Traffic Signal  \n' +
 'Installers/Maintainers)  \n' +
 '        Electricians/Traffic  \n' +
 '        Signal  ' +
 '        Installers/Maintainers......$ 17.87        4.35+4.5%  \n' +
 '        Groundmen/Truck Drivers.....$ 10.57        4.35+4.5%  \n' +
 '        Operators...................$ 14.06        4.35+4.5%  \n' +
 'Operators...................$ 14.06        4.35+4.5%  \n' +
 'Operators...................$ 14.06        4.35+4.5%  \n' +
 '  ---------------------------------------------------------------- \n ',
 prettyFormat: function() {
   return this.title + '\n' +
   this.message + '\n' +
   'File should contain \n\''+this.example +'\''+
   '\n------------------------------------';
 },
  },
  WG_OCCUPATIONS: {
    title: 'Occupation',
    message: 'There must be at least one occupation in wage group',
    example: 'Electricians (Including  ' +
    'Traffic Signal  ' +
    'Installers/Maintainers)  \n' +
    '        Electricians/Traffic  ' +
    '        Signal  \n' +
    '        Installers/Maintainers......$ 17.87        4.35+4.5%  \n' +
    '        Groundmen/Truck Drivers.....$ 10.57        4.35+4.5%  \n' +
    '        Operators...................$ 14.06        4.35+4.5%  \n' +
    'Operators...................$ 14.06        4.35+4.5%  \n' +
    'Operators...................$ 14.06        4.35+4.5% \n ',
    prettyFormat: function() {
      return this.title + '\n' +
      this.message + '\n' +
      'File should contain \n\''+this.example +'\''+
      '\n------------------------------------';
    },
  },
};
