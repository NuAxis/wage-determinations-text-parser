# wage-determination-text-parser
JavaScript library for parsing wage determination text file. It takes wage determination file or content of text file found at https://www.wdol.gov/dba.aspx and produces JSON object described Wage Determination Object JSON Schema section.

    npm install wdol-text-parser

# Interfaces
```javascript
var parser = require('wdol-text-parser');

```
# Test
```
    npm test
```

# Wage Determination Object JSON Schema
``` json

{
  "type": "object",
    "properties": {
        "headerInformation": {
            "properties": {
                "constructionTypes": {
                    "description": "Names of constructions on which wage determination applied ",
                    "type": "string"
                },
                "counties": {
                    "description": "Names of counties in which wage determination applicable",
                    "type": "string"
                },
                "state": {
                    "description": "State in which wages are applied ",
                    "type": "string"
                },
                "wageDeterminationCode": {
                    "description": "Defines code which is combination of effective year and State code",
                    "pattern": "",
                    "type": "string"
                }
            },
            "required": [
                "state",
                "constructionTypes",
                "counties",
                "wageDeterminationCode"
            ],
            "type": "object"
        },
        "modifications": {
            "items": {
                "description": "List of modifications of the current wage determination. ",
                "type": "string"
            },
            "type": "array"
        },
        "wageGroups": {
            "items": {
                "additionalProperties": false,
                "properties": {
                    "occupations": {
                        "items": {
                            "properties": {
                                "fringe": {
                                    "description": "Fringe of the occupation ",
                                    "type": "string"
                                },
                                "isGroup": {
                                    "description": "Defines if the current occupation contains sub occupations ",
                                    "type": "boolean"
                                },
                                "rate": {
                                    "description": "Rate of the occupation",
                                    "type": "string"
                                },
                                "title": {
                                    "description": "Name of the occupation ",
                                    "type": "string"
                                }
                            },
                            "type": "object"
                        },
                        "type": "array"
                    },
                    "wageGroupCode": {
                        "description": "Unique wage group which is combination of effective date of the wage.",
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "type": "array"
        }
    },
    "required": [
        "modifications",
        "headerInformation"
    ]

}

```
# Example:  
``` json
{
	"headerInformation": {
		"wageDeterminationCode": "VA160003 12/23/2016",
		"counties": "Pittsylvania County in Virginia.",
		"constructionTypes": "Building",
		"state": "Virginia"
	},
	"modifications": [
		"12/23/2016"
	],
	"wageGroups": [
		{
			"wageGroupCode": " ASBE0024-006 10/01/2016",
			"occupations": [
				{
					"title": "  ASBESTOS WORKER/HEAT & FROST INSULATOR - MECHANICAL (Duct, Pipe & Mechanical System Insulation)",
					"rate": "35.03",
					"fringe": "15.32",
					"isGroup": false
				}
			]
		},
		{
			"wageGroupCode": "ELEC0666-001 03/01/2016",
			"occupations": [
				{
					"title": "  ELECTRICIAN",
					"rate": "29.53",
					"fringe": "43%",
					"isGroup": false
				}
			]
		},
		{
			"wageGroupCode": "ENGI0147-015 06/01/2015",
			"occupations": [
				{
					"title": "\n\nPOWER EQUIPMENT OPERATOR\n",
					"rates": [
						{
							"title": "Bulldozer",
							"rate": "27.73",
							"fringe": "14.29",
							"isGroup": false
						},
						{
							"title": "Electrican",
							"rate": "27.73",
							"fringe": "14.29",
							"isGroup": false
						}
					],
					"isGroup": true
				}
			]
		},
		{
			"wageGroupCode": "PLUM0540-008 05/01/2016",
			"occupations": [
				{
					"title": "  PIPEFITTER (Includes HVAC Unit Installation)",
					"rate": "26.75",
					"fringe": "15.38",
					"isGroup": false
				}
			]
		},
		{
			"wageGroupCode": "SUVA2013-013 01/11/2016",
			"occupations": [
				{
					"title": "  CARPENTER",
					"rate": "15.60",
					"fringe": "0.00",
					"isGroup": false
				},
				{
					"title": " LABORER:  Common or General",
					"rate": "12.30",
					"fringe": "1.40",
					"isGroup": false
				},
				{
					"title": " TRUCK DRIVER:  Dump Truck",
					"rate": "11.25",
					"fringe": "0.57",
					"isGroup": false
				}
			]
		}
	]
}

```
