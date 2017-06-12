# opendj-rest-wrapper
JavaScript library for pasre wdol data from wd text files

    npm install wdol-text-parser

# Interfaces
```javascript
var parser = require('wdol-text-parser');

```

# Configuration
```
Environment variables

```

# Test

    npm test
```
# Wage Determination JSON Object Format
``` json

{
	"headerInformation": {
		"wageDeterminationCode": "Define effective date of wagedetermination and its code",
		"counties": "Defines in which counties that wagedetermination is implied",
		"constructionTypes": "Defines construction types in which wagedetermination is implied ",
		"state":" Defines the name of state in which wagedetermination is applicable "
	},
	"modifications": [
		"12/23/2016"
	],
	"wageGroups": [
		{
			"wageGroupCode":" Defines code and effective date of wage group",
			"occupations" [
				{
					"title": "Defines title of the occupation ",
					"rates": [
						{
							"title": " // title of the sub occuapation",
							"rate": "// rate of the sub occuapation",
							"fringe": " // fringe of the sub occuapation",
							"isGroup" "// defines if occupation contain more, occupations"
						}

					],
					"isGroup": "defines if occupation contains list of sub occupation rates "
				},
        {
          "title": "Bulldozer",
          "rate": "27.73",
          "fringe": "14.29",
          "isGroup": false
        }
			]
		}
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
							"title": "Carpanter",
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
					"title": " OPERATOR: Backhoe/Excavator/Trackhoe",
					"rate": "14.11",
					"fringe": "0.00",
					"isGroup": false
				},
				{
					"title": " PLUMBER",
					"rate": "21.74",
					"fringe": "5.45",
					"isGroup": false
				},
				{
					"title": " ROOFER",
					"rate": "15.56",
					"fringe": "3.06",
					"isGroup": false
				},
				{
					"title": " SHEET METAL WORKER, Includes HVAC Duct Installation",
					"rate": "16.88",
					"fringe": "2.30",
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
