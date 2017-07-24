# wage-determinations-text-parser
JavaScript library for parsing wage determination text file or file content from https://www.wdol.gov/dba.aspx and produces JSON object. Usage of library , schema  and example of JSON object is described below.

```javascript
npm install wage-determinations-text-parser
```

# Interfaces
```javascript
let parser = require('wage-determinations-text-parser');
parser.parseWageDeterminationTextFile('path/to/wage/determination/file', function(error, wageDetermination) {
  // error will be set if parser if unable to parse or provided file content is invalid.
  // wageDetermination object will be set if parser successfully parse the file text content
});

```

```javascript
let fs = require('fs');
let parser = require('wage-determinations-text-parser');
let fileContent = fs.readFileSync('path/to/wage/determination/file', 'UTF-8');
parser.parseWageDeterminationText(fileContent, function(error, wageDetermination) {
  // error will be set if parser if unable to parse or provided content is invalid.
  // wageDetermination object will be set if parser successfully parse the text content
});

```
# Test
```
    npm test
```

# Wage Determination JSON Object Schema
``` json
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "definitions": {},
    "id": "http://example.com/example.json",
    "properties": {
        "headerInformation": {
            "properties": {
                "constructionTypes": {
                    "type": "string"
                },
                "counties": {
                    "type": "string"
                },
                "state": {
                    "type": "string"
                },
                "wageDeterminationCode": {
                    "type": "string"
                }
            },
            "type": "object"
        },
        "modifications": {
            "items": {
                "type": "string"
            },
            "type": "array"
        },
        "wageGroups": {
            "items": {
                "properties": {
                    "occupations": {
                        "items": {
                            "properties": {
                                "fringe": {
                                    "type": "string"
                                },
                                "isGroup": {
                                    "type": "boolean"
                                },
                                "rate": {
                                    "type": "string"
                                },
                                "title": {
                                    "type": "string"
                                }
                            },
                            "type": "object"
                        },
                        "type": "array"
                    },
                    "wageGroupQualifier": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "type": "array"
        }
    },
    "type": "object"
}

```
# Wage Determination JSON Object Sample:  
``` json
{
	"headerInformation": {
		"wageDeterminationCode": " CA20170032 07/07/2017",
		"counties": " Tulare County in California.",
		"constructionTypes": " Heavy (Heavy and Dredging) and Highway",
		"state": " California"
	},
	"modifications": [
		"01/06/2017",
		"01/27/2017",
		"03/03/2017"
	],
	"wageGroups": [
		{
			"wageGroupQualifier": "\n",
			"occupations": [
				{
					"title": "Asbestos Removal\nworker/hazardous material\nhandler (Includes\npreparation, wetting,\nstripping, removal,\nscrapping, vacuuming, bagging\nand disposing of all\ninsulation materials from\nmechanical systems, whether\nthey contain asbestos or not)",
					"rate": "28.20",
					"fringe": "8.95",
					"isGroup": false
				}
			]
		},
		{
			"wageGroupQualifier": "\n\nDEPTH PAY (Surface Diving):\n050 to 100 ft    $2.00 per foot\n101 to 150 ft    $3.00 per foot\n151 to 220 ft    $4.00 per foot\n\nSATURATION DIVING:\n  The standby rate shall apply until saturation starts.  The\n  saturation diving rate applies when divers are under\n  pressure continuously until work task and decompression are\n  complete. The diver rate shall be paid for all saturation\n  hours.\n\nDIVING IN ENCLOSURES:\n  Where it is necessary for Divers to enter pipes or tunnels,\n  or other enclosures where there is no vertical ascent, the\n  following premium shall be paid:  Distance traveled from\n  entrance 26 feet to 300 feet:  $1.00 per foot.  When it is\n  necessary for a diver to enter any pipe, tunnel or other\n  enclosure less than 48\" in height, the premium will be\n  $1.00 per foot.\n\nWORK IN COMBINATION OF CLASSIFICATIONS:\n  Employees working in any combination of classifications\n  within the diving crew (except dive supervisor) in a shift\n  are paid in the classification with the highest rate for\n  that shift.\n\n",
			"occupations": [
				{
					"title": "Diver\n",
					"rates": [
						{
							"title": "Assistant Tender, ROV\nTender/Technician",
							"rate": "43.65",
							"fringe": "31.40",
							"isGroup": false
						},
						{
							"title": "Diver standby",
							"rate": "48.61",
							"fringe": "31.40",
							"isGroup": false
						},
						{
							"title": "Diver Tender",
							"rate": "47.82",
							"fringe": "31.40",
							"isGroup": false
						},
						{
							"title": "Diver wet",
							"rate": "93.17",
							"fringe": "31.40",
							"isGroup": false
						},
						{
							"title": "Manifold Operator (mixed\ngas)",
							"rate": "52.82",
							"fringe": "31.40",
							"isGroup": false
						},
						{
							"title": "Manifold Operator (Standby)",
							"rate": "47.82",
							"fringe": "31.40",
							"isGroup": false
						}
					],
					"isGroup": true
				}
			]
		},
		{
			"wageGroupQualifier": "\n",
			"occupations": [
				{
					"title": "Piledriver",
					"rate": "44.65",
					"fringe": "31.40",
					"isGroup": false
				}
			]
		},
		{
			"wageGroupQualifier": "\n\nAREA DESCRIPTIONS\n\n  AREA 1: ALAMEDA,BUTTE, CONTRA COSTA, KINGS, MARIN, MERCED,\n  NAPA, SACRAMENTO, SAN BENITO, SAN FRANCISCO, SAN JOAQUIN,\n  SAN MATEO, SANTA CLARA, SANTA CRUZ, SOLANO, STANISLAUS,\n  SUTTER, YOLO, AND YUBA COUNTIES\n\nAREA 2:  MODOC COUNTY\n\n  THE REMAINGING COUNTIES ARE SPLIT BETWEEN AREA 1 AND AREA 2\n  AS NOTED BELOW:\n\nALPINE COUNTY:\nArea 1:  Northernmost part\nArea 2:  Remainder\n\nCALAVERAS COUNTY:\nArea 1: Remainder\nArea 2: Eastern part\n\nCOLUSA COUNTY:\nArea 1:  Eastern part\nArea 2:  Remainder\n\nELDORADO COUNTY:\nArea 1:  North Central part\nArea 2:  Remainder\n\nFRESNO COUNTY:\nArea 1: Remainder\nArea 2: Eastern part\n\nGLENN COUNTY:\nArea 1:  Eastern part\nArea 2: Remainder\n\nLASSEN COUNTY:\n  Area 1:  Western part along the Southern portion of border\n  with Shasta County\nArea 2:  Remainder\n\nMADERA COUNTY:\nArea 1: Except Eastern part\nArea 2: Eastern part\n\nMARIPOSA COUNTY\nArea 1: Except Eastern part\nArea 2: Eastern part\n\nMONTERREY COUNTY\nArea 1: Except Southwestern part\nArea 2: Southwestern part\n\nNEVADA COUNTY:\n  Area 1:  All but the Northern portion along the border of\n  Sierra County\nArea 2:  Remainder\n\nPLACER COUNTY:\nArea 1:  Al but the Central portion\nArea 2:  Remainder\n\nPLUMAS COUNTY:\nArea 1:  Western portion\nArea 2:  Remainder\n\nSHASTA COUNTY:\nArea 1:  All but the Northeastern corner\nArea 2:  Remainder\n\nSIERRA COUNTY:\nArea 1:  Western part\nArea 2:  Remainder\n\nSISKIYOU COUNTY:\nArea 1:  Central part\nArea 2:  Remainder\n\nSONOMA COUNTY:\nArea 1:  All but the Northwestern corner\nArea 2:  Remainder\n\nTEHAMA COUNTY:\n  Area 1:  All but the Western border with Mendocino &amp; Trinity\n  Counties\nArea 2:  Remainder\n\nTRINITY COUNTY:\n  Area 1:  East Central part and the Northeastern border with\n  Shasta County\nArea 2:  Remainder\n\nTUOLUMNE COUNTY:\nArea 1: Except Eastern part\nArea 2: Eastern part\n\n",
			"occupations": [
				{
					"title": "Dredging: (DREDGING:\nCLAMSHELL &amp; DIPPER DREDGING;\nHYDRAULIC SUCTION DREDGING:)\n",
					"rates": [
						{
							"title": "AREA 1:\n",
							"rates": [
								{
									"title": "(1) Leverman",
									"rate": "44.77",
									"fringe": "31.25",
									"isGroup": false
								},
								{
									"title": "(2) Dredge Dozer; Heavy\nduty repairman",
									"rate": "39.81",
									"fringe": "31.25",
									"isGroup": false
								},
								{
									"title": "(3) Booster Pump\nOperator; Deck\nEngineer; Deck mate;\nDredge Tender; Winch\nOperator",
									"rate": "38.69",
									"fringe": "31.25",
									"isGroup": false
								},
								{
									"title": "(4) Bargeman; Deckhand;\nFireman; Leveehand; Oiler",
									"rate": "35.39",
									"fringe": "31.25",
									"isGroup": false
								}
							],
							"isGroup": true
						},
						{
							"title": "AREA 2:\n",
							"rates": [
								{
									"title": "(1) Leverman",
									"rate": "46.77",
									"fringe": "31.25",
									"isGroup": false
								},
								{
									"title": "(2) Dredge Dozer; Heavy\nduty repairman",
									"rate": "41.81",
									"fringe": "31.25",
									"isGroup": false
								},
								{
									"title": "(3) Booster Pump\nOperator; Deck\nEngineer; Deck mate;\nDredge Tender; Winch\nOperator",
									"rate": "40.69",
									"fringe": "31.25",
									"isGroup": false
								},
								{
									"title": "(4) Bargeman; Deckhand;\nFireman; Leveehand; Oiler",
									"rate": "37.39",
									"fringe": "31.25",
									"isGroup": false
								}
							],
							"isGroup": true
						}
					],
					"isGroup": true
				}
			]
		}
	]
}

```
