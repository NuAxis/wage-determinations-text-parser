# opendj-rest-wrapper
JavaScript library for pasre wdol data from wd text files

    npm install wdol-text-parser

# Interfaces
```javascript
var parser = require('wdol-text-parser');

```

# Configuration
```Environment variables

```

# Test

    npm test

# Wage Determination JSON Object Format
{
	"headerInformation": {},
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
					"title": "POWER EQUIPMENT OPERATOR",
					"rates": [
						{
							"title": "Bulldozer",
							"rate": "27.73",
							"fringe": "14.29",
							"isGroup": false
						},
            {
              "title": "CARPENTER",
              "rate": "27.73",
              "fringe": "14.29",
              "isGroup": false
            },
            {
              "title": "ELECTRICIAN",
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
					"title": "PIPEFITTER (Includes HVAC Unit Installation)",
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
					"title": "OPERATOR: Backhoe/Excavator/Trackhoe",
					"rate": "14.11",
					"fringe": "0.00",
					"isGroup": false
				},
				{
					"title": "PLUMBER",
					"rate": "21.74",
					"fringe": "5.45",
					"isGroup": false
				},
				{
					"title": "ROOFER",
					"rate": "15.56",
					"fringe": "3.06",
					"isGroup": false
				},
				{
					"title": "SHEET METAL WORKER, Includes HVAC Duct Installation",
					"rate": "16.88",
					"fringe": "2.30",
					"isGroup": false
				},
				{
					"title": "TRUCK DRIVER:  Dump Truck",
					"rate": "11.25",
					"fringe": "0.57",
					"isGroup": false
				}
			]
		}
	]
}
