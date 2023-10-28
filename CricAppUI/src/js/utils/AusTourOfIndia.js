define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout'], function (oj, ko, $) {

    function AusTourofIndia() {
        var self = this;

        self.matches = [
            {
                "ballsPerOver": 6,
                "cricsheetId": "1389390",
                "date": "2023-09-27",
                "endDate": "2023-09-27",
                "eventGroup": null,
                "eventStage": "3",
                "inningsList": [
                    {
                        "deliveriesList": [],
                        "inningsId": 22762,
                        "number": 1,
                        "powerplaysList": [
                            {
                                "from": "0.1",
                                "kind": "mandatory",
                                "powerplayId": 26747,
                                "to": "9.6"
                            },
                            {
                                "from": "10.1",
                                "kind": "mandatory",
                                "powerplayId": 26748,
                                "to": "39.6"
                            },
                            {
                                "from": "40.1",
                                "kind": "mandatory",
                                "powerplayId": 26749,
                                "to": "49.6"
                            }
                        ],
                        "targetOvers": null,
                        "targetRuns": null,
                        "team": {
                            "displayName": "AUS",
                            "gender": "MALE",
                            "name": "Australia",
                            "oldNames": null,
                            "teamId": 16,
                            "type": "INTERNATIONAL"
                        }
                    },
                    {
                        "deliveriesList": [],
                        "inningsId": 22763,
                        "number": 2,
                        "powerplaysList": [
                            {
                                "from": "0.1",
                                "kind": "mandatory",
                                "powerplayId": 26750,
                                "to": "9.6"
                            },
                            {
                                "from": "10.1",
                                "kind": "mandatory",
                                "powerplayId": 26751,
                                "to": "39.6"
                            },
                            {
                                "from": "40.1",
                                "kind": "mandatory",
                                "powerplayId": 26752,
                                "to": "49.4"
                            }
                        ],
                        "targetOvers": "50",
                        "targetRuns": 353,
                        "team": {
                            "displayName": "IND",
                            "gender": "MALE",
                            "name": "India",
                            "oldNames": null,
                            "teamId": 14,
                            "type": "INTERNATIONAL"
                        }
                    }
                ],
                "leagueEvent": {
                    "league": {
                        "format": "ODI",
                        "leagueId": 48,
                        "name": "One-day internationals"
                    },
                    "leagueEventId": 397,
                    "manOfTheSeries1": null,
                    "manOfTheSeries2": null,
                    "matchType": "ODI",
                    "name": "Australia tour of India",
                    "season": "2023/24",
                    "winnerTeam": null
                },
                "matchId": 10437,
                "matchOutcome": {
                    "manOfTheMatch": {
                        "batStyle": "Right hand Bat",
                        "bowlStyle": "Right arm Offbreak",
                        "commonName": "Glenn Maxwell",
                        "country": "Australia",
                        "cricinfoId": "325026",
                        "cricsheetId": "b681e71e",
                        "cricsheetName": "GJ Maxwell",
                        "name": "Glenn James Maxwell",
                        "playerId": 4863,
                        "role": "Batting Allrounder"
                    },
                    "matchOutcomeId": 10435,
                    "method": null,
                    "outcome": "Win by 66 Runs",
                    "winner": {
                        "displayName": "AUS",
                        "gender": "MALE",
                        "name": "Australia",
                        "oldNames": null,
                        "teamId": 16,
                        "type": "INTERNATIONAL"
                    }
                },
                "matchType": "ODI",
                "name": "Australia vs India",
                "playing11List": [
                    {
                        "captain": null,
                        "keeper": null,
                        "player1": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": "Legbreak",
                            "commonName": "David Warner",
                            "country": "Australia",
                            "cricinfoId": "219889",
                            "cricsheetId": "dcce6f09",
                            "cricsheetName": "DA Warner",
                            "name": "David Andrew Warner",
                            "playerId": 3417,
                            "role": "Opening Batter"
                        },
                        "player10": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Legbreak",
                            "commonName": null,
                            "country": "Australia",
                            "cricinfoId": "1170471",
                            "cricsheetId": "52c952d9",
                            "cricsheetName": "T Sangha",
                            "name": "Tanveer Sangha",
                            "playerId": 13397,
                            "role": "Bowler"
                        },
                        "player11": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": "Right arm Fast medium",
                            "commonName": "Josh Hazlewood",
                            "country": "Australia",
                            "cricinfoId": "288284",
                            "cricsheetId": "03806cf8",
                            "cricsheetName": "JR Hazlewood",
                            "name": "Josh Reginald Hazlewood",
                            "playerId": 6674,
                            "role": "Bowler"
                        },
                        "player2": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Medium",
                            "commonName": "Mitchell Marsh",
                            "country": "Australia",
                            "cricinfoId": "272450",
                            "cricsheetId": "3d8feaf8",
                            "cricsheetName": "MR Marsh",
                            "name": "Mitchell Ross Marsh",
                            "playerId": 8934,
                            "role": "Allrounder"
                        },
                        "player3": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Legbreak Googly",
                            "commonName": "Steve Smith",
                            "country": "Australia",
                            "cricinfoId": "267192",
                            "cricsheetId": "30a45b23",
                            "cricsheetName": "SPD Smith",
                            "name": "Steven Peter Devereux Smith",
                            "playerId": 12513,
                            "role": "Middle order Batter"
                        },
                        "player4": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Legbreak",
                            "commonName": "Marnus Labuschagne",
                            "country": "Australia",
                            "cricinfoId": "787987",
                            "cricsheetId": "fa433be6",
                            "cricsheetName": "M Labuschagne",
                            "name": "Marnus Labuschagne",
                            "playerId": 8554,
                            "role": "Batting Allrounder"
                        },
                        "player5": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": null,
                            "commonName": "Alex Carey",
                            "country": "Australia",
                            "cricinfoId": "326434",
                            "cricsheetId": "69d03465",
                            "cricsheetName": "AT Carey",
                            "name": "Alex Tyson Carey",
                            "playerId": 1992,
                            "role": "Wicketkeeper Batter"
                        },
                        "player6": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Offbreak",
                            "commonName": "Glenn Maxwell",
                            "country": "Australia",
                            "cricinfoId": "325026",
                            "cricsheetId": "b681e71e",
                            "cricsheetName": "GJ Maxwell",
                            "name": "Glenn James Maxwell",
                            "playerId": 4863,
                            "role": "Batting Allrounder"
                        },
                        "player7": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Fast medium",
                            "commonName": "Cameron Green",
                            "country": "Australia",
                            "cricinfoId": "1076713",
                            "cricsheetId": "eaa76d3c",
                            "cricsheetName": "C Green",
                            "name": "Cameron Donald Green",
                            "playerId": 2883,
                            "role": "Batting Allrounder"
                        },
                        "player8": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Fast",
                            "commonName": "Pat Cummins",
                            "country": "Australia",
                            "cricinfoId": "489889",
                            "cricsheetId": "ded9240e",
                            "cricsheetName": "PJ Cummins",
                            "name": "Patrick James Cummins",
                            "playerId": 10135,
                            "role": "Bowler"
                        },
                        "player9": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": "Left arm Fast",
                            "commonName": "Mitchell Starc",
                            "country": "Australia",
                            "cricinfoId": "311592",
                            "cricsheetId": "3fb19989",
                            "cricsheetName": "MA Starc",
                            "name": "Mitchell Aaron Starc",
                            "playerId": 8102,
                            "role": "Bowler"
                        },
                        "playing11Id": 20859,
                        "subsInPlayer": null,
                        "subsOutPlayer": null,
                        "subsReason": null,
                        "team": {
                            "displayName": "AUS",
                            "gender": "MALE",
                            "name": "Australia",
                            "oldNames": null,
                            "teamId": 16,
                            "type": "INTERNATIONAL"
                        }
                    },
                    {
                        "captain": null,
                        "keeper": null,
                        "player1": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Offbreak",
                            "commonName": "Rohit Sharma",
                            "country": "India",
                            "cricinfoId": "34102",
                            "cricsheetId": "740742ef",
                            "cricsheetName": "RG Sharma",
                            "name": "Rohit Gurunath Sharma",
                            "playerId": 10807,
                            "role": "Top order Batter"
                        },
                        "player10": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Fast",
                            "commonName": "Mohammed Siraj",
                            "country": "India",
                            "cricinfoId": "940973",
                            "cricsheetId": "2f49c897",
                            "cricsheetName": "Mohammed Siraj",
                            "name": "Mohammed Siraj",
                            "playerId": 8818,
                            "role": "Bowler"
                        },
                        "player11": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Fast medium",
                            "commonName": "Prasidh Krishna",
                            "country": "India",
                            "cricinfoId": "917159",
                            "cricsheetId": "85e0cf10",
                            "cricsheetName": "M Prasidh Krishna",
                            "name": "Muralikrishna Prasidh Krishna",
                            "playerId": 8894,
                            "role": "Bowler"
                        },
                        "player2": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": "Right arm Offbreak",
                            "commonName": "Washington Sundar",
                            "country": "India",
                            "cricinfoId": "719715",
                            "cricsheetId": "f19ccfad",
                            "cricsheetName": "Washington Sundar",
                            "name": "Washington Sundar",
                            "playerId": 13870,
                            "role": "Bowling Allrounder"
                        },
                        "player3": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Medium",
                            "commonName": "Virat Kohli",
                            "country": "India",
                            "cricinfoId": "253802",
                            "cricsheetId": "ba607b88",
                            "cricsheetName": "V Kohli",
                            "name": "Virat Kohli",
                            "playerId": 13708,
                            "role": "Top order Batter"
                        },
                        "player4": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Offbreak, Legbreak Googly",
                            "commonName": "Shreyas Iyer",
                            "country": "India",
                            "cricinfoId": "642519",
                            "cricsheetId": "85ec8e33",
                            "cricsheetName": "SS Iyer",
                            "name": "Shreyas Santosh Iyer",
                            "playerId": 12663,
                            "role": "Top order Batter"
                        },
                        "player5": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": null,
                            "commonName": "KL Rahul",
                            "country": "India",
                            "cricinfoId": "422108",
                            "cricsheetId": "b17e2f24",
                            "cricsheetName": "KL Rahul",
                            "name": "Kannaur Lokesh Rahul",
                            "playerId": 7234,
                            "role": "Wicketkeeper Batter"
                        },
                        "player6": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Medium, Right arm Offbreak",
                            "commonName": "Suryakumar Yadav",
                            "country": "India",
                            "cricinfoId": "446507",
                            "cricsheetId": "271f83cd",
                            "cricsheetName": "SA Yadav",
                            "name": "Suryakumar Ashok Yadav",
                            "playerId": 11677,
                            "role": "Batter"
                        },
                        "player7": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": "Slow Left arm Orthodox",
                            "commonName": "Ravindra Jadeja",
                            "country": "India",
                            "cricinfoId": "234675",
                            "cricsheetId": "fe93fd9d",
                            "cricsheetName": "RA Jadeja",
                            "name": "Ravindrasinh Anirudhsinh Jadeja",
                            "playerId": 10519,
                            "role": "Allrounder"
                        },
                        "player8": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": "Left arm Wrist spin",
                            "commonName": "Kuldeep Yadav",
                            "country": "India",
                            "cricinfoId": "559235",
                            "cricsheetId": "8d2c70ad",
                            "cricsheetName": "Kuldeep Yadav",
                            "name": "Kuldeep Yadav",
                            "playerId": 7462,
                            "role": "Bowler"
                        },
                        "player9": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Fast",
                            "commonName": "Jasprit Bumrah",
                            "country": "India",
                            "cricinfoId": "625383",
                            "cricsheetId": "462411b3",
                            "cricsheetName": "JJ Bumrah",
                            "name": "Jasprit Jasbirsingh Bumrah",
                            "playerId": 6340,
                            "role": "Bowler"
                        },
                        "playing11Id": 20860,
                        "subsInPlayer": null,
                        "subsOutPlayer": null,
                        "subsReason": null,
                        "team": {
                            "displayName": "IND",
                            "gender": "MALE",
                            "name": "India",
                            "oldNames": null,
                            "teamId": 14,
                            "type": "INTERNATIONAL"
                        }
                    }
                ],
                "team1": {
                    "displayName": "AUS",
                    "gender": "MALE",
                    "name": "Australia",
                    "oldNames": null,
                    "teamId": 16,
                    "type": "INTERNATIONAL"
                },
                "team2": {
                    "displayName": "IND",
                    "gender": "MALE",
                    "name": "India",
                    "oldNames": null,
                    "teamId": 14,
                    "type": "INTERNATIONAL"
                },
                "tossWinnerChoice": "bat",
                "tossWonTeam": {
                    "displayName": "AUS",
                    "gender": "MALE",
                    "name": "Australia",
                    "oldNames": null,
                    "teamId": 16,
                    "type": "INTERNATIONAL"
                },
                "venue": "Saurashtra Cricket Association Stadium, Rajkot"
            },
            {
                "ballsPerOver": 6,
                "cricsheetId": "1389389",
                "date": "2023-09-24",
                "endDate": "2023-09-24",
                "eventGroup": null,
                "eventStage": "2",
                "inningsList": [
                    {
                        "deliveriesList": [],
                        "inningsId": 19426,
                        "number": 1,
                        "powerplaysList": [
                            {
                                "from": "0.1",
                                "kind": "mandatory",
                                "powerplayId": 19449,
                                "to": "9.6"
                            },
                            {
                                "from": "10.1",
                                "kind": "mandatory",
                                "powerplayId": 19450,
                                "to": "39.6"
                            },
                            {
                                "from": "40.1",
                                "kind": "mandatory",
                                "powerplayId": 19451,
                                "to": "49.6"
                            }
                        ],
                        "targetOvers": null,
                        "targetRuns": null,
                        "team": {
                            "displayName": "IND",
                            "gender": "MALE",
                            "name": "India",
                            "oldNames": null,
                            "teamId": 14,
                            "type": "INTERNATIONAL"
                        }
                    },
                    {
                        "deliveriesList": [],
                        "inningsId": 19427,
                        "number": 2,
                        "powerplaysList": [
                            {
                                "from": "0.1",
                                "kind": "mandatory",
                                "powerplayId": 19452,
                                "to": "6.6"
                            },
                            {
                                "from": "7.1",
                                "kind": "mandatory",
                                "powerplayId": 19453,
                                "to": "26.6"
                            },
                            {
                                "from": "27.1",
                                "kind": "mandatory",
                                "powerplayId": 19454,
                                "to": "28.2"
                            }
                        ],
                        "targetOvers": "33",
                        "targetRuns": 317,
                        "team": {
                            "displayName": "AUS",
                            "gender": "MALE",
                            "name": "Australia",
                            "oldNames": null,
                            "teamId": 16,
                            "type": "INTERNATIONAL"
                        }
                    }
                ],
                "leagueEvent": {
                    "league": {
                        "format": "ODI",
                        "leagueId": 48,
                        "name": "One-day internationals"
                    },
                    "leagueEventId": 397,
                    "manOfTheSeries1": null,
                    "manOfTheSeries2": null,
                    "matchType": "ODI",
                    "name": "Australia tour of India",
                    "season": "2023/24",
                    "winnerTeam": null
                },
                "matchId": 8751,
                "matchOutcome": {
                    "manOfTheMatch": {
                        "batStyle": "Right hand Bat",
                        "bowlStyle": "Right arm Offbreak, Legbreak Googly",
                        "commonName": "Shreyas Iyer",
                        "country": "India",
                        "cricinfoId": "642519",
                        "cricsheetId": "85ec8e33",
                        "cricsheetName": "SS Iyer",
                        "name": "Shreyas Santosh Iyer",
                        "playerId": 12663,
                        "role": "Top order Batter"
                    },
                    "matchOutcomeId": 8749,
                    "method": "D/L",
                    "outcome": "Win by 99 Runs",
                    "winner": {
                        "displayName": "IND",
                        "gender": "MALE",
                        "name": "India",
                        "oldNames": null,
                        "teamId": 14,
                        "type": "INTERNATIONAL"
                    }
                },
                "matchType": "ODI",
                "name": "India vs Australia",
                "playing11List": [
                    {
                        "captain": null,
                        "keeper": null,
                        "player1": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Offbreak",
                            "commonName": "Ruturaj Gaikwad",
                            "country": "India",
                            "cricinfoId": "1060380",
                            "cricsheetId": "45a43fe2",
                            "cricsheetName": "RD Gaikwad",
                            "name": "Ruturaj Dashrat Gaikwad",
                            "playerId": 10703,
                            "role": "Batter"
                        },
                        "player10": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Fast",
                            "commonName": "Mohammed Shami",
                            "country": "India",
                            "cricinfoId": "481896",
                            "cricsheetId": "8cf9814c",
                            "cricsheetName": "Mohammed Shami",
                            "name": "Mohammed Shami Ahmed",
                            "playerId": 8817,
                            "role": "Bowler"
                        },
                        "player11": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Fast medium",
                            "commonName": "Prasidh Krishna",
                            "country": "India",
                            "cricinfoId": "917159",
                            "cricsheetId": "85e0cf10",
                            "cricsheetName": "M Prasidh Krishna",
                            "name": "Muralikrishna Prasidh Krishna",
                            "playerId": 8894,
                            "role": "Bowler"
                        },
                        "player2": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Offbreak",
                            "commonName": "Shubman Gill",
                            "country": "India",
                            "cricinfoId": "1070173",
                            "cricsheetId": "b4b99816",
                            "cricsheetName": "Shubman Gill",
                            "name": "Shubman Gill",
                            "playerId": 12098,
                            "role": "Opening Batter"
                        },
                        "player3": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Offbreak, Legbreak Googly",
                            "commonName": "Shreyas Iyer",
                            "country": "India",
                            "cricinfoId": "642519",
                            "cricsheetId": "85ec8e33",
                            "cricsheetName": "SS Iyer",
                            "name": "Shreyas Santosh Iyer",
                            "playerId": 12663,
                            "role": "Top order Batter"
                        },
                        "player4": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": null,
                            "commonName": "KL Rahul",
                            "country": "India",
                            "cricinfoId": "422108",
                            "cricsheetId": "b17e2f24",
                            "cricsheetName": "KL Rahul",
                            "name": "Kannaur Lokesh Rahul",
                            "playerId": 7234,
                            "role": "Wicketkeeper Batter"
                        },
                        "player5": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": null,
                            "commonName": "Ishan Kishan",
                            "country": "India",
                            "cricinfoId": "720471",
                            "cricsheetId": "752f7486",
                            "cricsheetName": "Ishan Kishan",
                            "name": "Ishan Pranav Kumar Pandey Kishan",
                            "playerId": 5824,
                            "role": "Wicketkeeper Batter"
                        },
                        "player6": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Medium, Right arm Offbreak",
                            "commonName": "Suryakumar Yadav",
                            "country": "India",
                            "cricinfoId": "446507",
                            "cricsheetId": "271f83cd",
                            "cricsheetName": "SA Yadav",
                            "name": "Suryakumar Ashok Yadav",
                            "playerId": 11677,
                            "role": "Batter"
                        },
                        "player7": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": "Slow Left arm Orthodox",
                            "commonName": "Ravindra Jadeja",
                            "country": "India",
                            "cricinfoId": "234675",
                            "cricsheetId": "fe93fd9d",
                            "cricsheetName": "RA Jadeja",
                            "name": "Ravindrasinh Anirudhsinh Jadeja",
                            "playerId": 10519,
                            "role": "Allrounder"
                        },
                        "player8": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Offbreak",
                            "commonName": "Ravichandran Ashwin",
                            "country": "India",
                            "cricinfoId": "26421",
                            "cricsheetId": "495d42a5",
                            "cricsheetName": "R Ashwin",
                            "name": "Ravichandran Ashwin",
                            "playerId": 10603,
                            "role": "Bowling Allrounder"
                        },
                        "player9": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Medium",
                            "commonName": "Shardul Thakur",
                            "country": "India",
                            "cricinfoId": "475281",
                            "cricsheetId": "1abb78f8",
                            "cricsheetName": "SN Thakur",
                            "name": "Shardul Narendra Thakur",
                            "playerId": 12453,
                            "role": "Bowler"
                        },
                        "playing11Id": 17487,
                        "subsInPlayer": null,
                        "subsOutPlayer": null,
                        "subsReason": null,
                        "team": {
                            "displayName": "IND",
                            "gender": "MALE",
                            "name": "India",
                            "oldNames": null,
                            "teamId": 14,
                            "type": "INTERNATIONAL"
                        }
                    },
                    {
                        "captain": null,
                        "keeper": null,
                        "player1": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Offbreak",
                            "commonName": "Matthew Short",
                            "country": "Australia",
                            "cricinfoId": "605575",
                            "cricsheetId": "a90e53ec",
                            "cricsheetName": "MW Short",
                            "name": "Matthew William Short",
                            "playerId": 9197,
                            "role": "Top order Batter"
                        },
                        "player10": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": "Right arm Fast medium",
                            "commonName": "Josh Hazlewood",
                            "country": "Australia",
                            "cricinfoId": "288284",
                            "cricsheetId": "03806cf8",
                            "cricsheetName": "JR Hazlewood",
                            "name": "Josh Reginald Hazlewood",
                            "playerId": 6674,
                            "role": "Bowler"
                        },
                        "player11": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": "Left arm Fast medium",
                            "commonName": null,
                            "country": "Australia",
                            "cricinfoId": "1123718",
                            "cricsheetId": "83c3e8e3",
                            "cricsheetName": "SH Johnson",
                            "name": "Spencer Henry Johnson",
                            "playerId": 12052,
                            "role": "Bowler"
                        },
                        "player2": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": "Legbreak",
                            "commonName": "David Warner",
                            "country": "Australia",
                            "cricinfoId": "219889",
                            "cricsheetId": "dcce6f09",
                            "cricsheetName": "DA Warner",
                            "name": "David Andrew Warner",
                            "playerId": 3417,
                            "role": "Opening Batter"
                        },
                        "player3": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Legbreak Googly",
                            "commonName": "Steve Smith",
                            "country": "Australia",
                            "cricinfoId": "267192",
                            "cricsheetId": "30a45b23",
                            "cricsheetName": "SPD Smith",
                            "name": "Steven Peter Devereux Smith",
                            "playerId": 12513,
                            "role": "Middle order Batter"
                        },
                        "player4": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Legbreak",
                            "commonName": "Marnus Labuschagne",
                            "country": "Australia",
                            "cricinfoId": "787987",
                            "cricsheetId": "fa433be6",
                            "cricsheetName": "M Labuschagne",
                            "name": "Marnus Labuschagne",
                            "playerId": 8554,
                            "role": "Batting Allrounder"
                        },
                        "player5": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": null,
                            "commonName": "Josh Inglis",
                            "country": "Australia",
                            "cricinfoId": "662235",
                            "cricsheetId": "989889ff",
                            "cricsheetName": "JP Inglis",
                            "name": "Joshua Patrick Inglis",
                            "playerId": 6638,
                            "role": "Wicketkeeper Batter"
                        },
                        "player6": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": null,
                            "commonName": "Alex Carey",
                            "country": "Australia",
                            "cricinfoId": "326434",
                            "cricsheetId": "69d03465",
                            "cricsheetName": "AT Carey",
                            "name": "Alex Tyson Carey",
                            "playerId": 1992,
                            "role": "Wicketkeeper Batter"
                        },
                        "player7": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Fast medium",
                            "commonName": "Cameron Green",
                            "country": "Australia",
                            "cricinfoId": "1076713",
                            "cricsheetId": "eaa76d3c",
                            "cricsheetName": "C Green",
                            "name": "Cameron Donald Green",
                            "playerId": 2883,
                            "role": "Batting Allrounder"
                        },
                        "player8": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Fast medium",
                            "commonName": "Sean Anthony Abbott",
                            "country": "Australia",
                            "cricinfoId": "398666",
                            "cricsheetId": "1a2676c5",
                            "cricsheetName": "SA Abbott",
                            "name": "Sean Anthony Abbott",
                            "playerId": 11401,
                            "role": "Bowling Allrounder"
                        },
                        "player9": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Legbreak Googly",
                            "commonName": "Adam Zampa",
                            "country": "Australia",
                            "cricinfoId": "379504",
                            "cricsheetId": "14f96089",
                            "cricsheetName": "A Zampa",
                            "name": "Adam Zampa",
                            "playerId": 2132,
                            "role": "Bowler"
                        },
                        "playing11Id": 17488,
                        "subsInPlayer": null,
                        "subsOutPlayer": null,
                        "subsReason": null,
                        "team": {
                            "displayName": "AUS",
                            "gender": "MALE",
                            "name": "Australia",
                            "oldNames": null,
                            "teamId": 16,
                            "type": "INTERNATIONAL"
                        }
                    }
                ],
                "team1": {
                    "displayName": "IND",
                    "gender": "MALE",
                    "name": "India",
                    "oldNames": null,
                    "teamId": 14,
                    "type": "INTERNATIONAL"
                },
                "team2": {
                    "displayName": "AUS",
                    "gender": "MALE",
                    "name": "Australia",
                    "oldNames": null,
                    "teamId": 16,
                    "type": "INTERNATIONAL"
                },
                "tossWinnerChoice": "field",
                "tossWonTeam": {
                    "displayName": "AUS",
                    "gender": "MALE",
                    "name": "Australia",
                    "oldNames": null,
                    "teamId": 16,
                    "type": "INTERNATIONAL"
                },
                "venue": "Holkar Cricket Stadium, Indore"
            },
            {
                "ballsPerOver": 6,
                "cricsheetId": "1389388",
                "date": "2023-09-22",
                "endDate": "2023-09-22",
                "eventGroup": null,
                "eventStage": "1",
                "inningsList": [
                    {
                        "deliveriesList": [],
                        "inningsId": 18479,
                        "number": 1,
                        "powerplaysList": [
                            {
                                "from": "0.1",
                                "kind": "mandatory",
                                "powerplayId": 17383,
                                "to": "9.6"
                            },
                            {
                                "from": "10.1",
                                "kind": "mandatory",
                                "powerplayId": 17384,
                                "to": "39.6"
                            },
                            {
                                "from": "40.1",
                                "kind": "mandatory",
                                "powerplayId": 17385,
                                "to": "49.6"
                            }
                        ],
                        "targetOvers": null,
                        "targetRuns": null,
                        "team": {
                            "displayName": "AUS",
                            "gender": "MALE",
                            "name": "Australia",
                            "oldNames": null,
                            "teamId": 16,
                            "type": "INTERNATIONAL"
                        }
                    },
                    {
                        "deliveriesList": [],
                        "inningsId": 18480,
                        "number": 2,
                        "powerplaysList": [
                            {
                                "from": "0.1",
                                "kind": "mandatory",
                                "powerplayId": 17386,
                                "to": "9.6"
                            },
                            {
                                "from": "10.1",
                                "kind": "mandatory",
                                "powerplayId": 17387,
                                "to": "39.6"
                            },
                            {
                                "from": "40.1",
                                "kind": "mandatory",
                                "powerplayId": 17388,
                                "to": "48.4"
                            }
                        ],
                        "targetOvers": "50",
                        "targetRuns": 277,
                        "team": {
                            "displayName": "IND",
                            "gender": "MALE",
                            "name": "India",
                            "oldNames": null,
                            "teamId": 14,
                            "type": "INTERNATIONAL"
                        }
                    }
                ],
                "leagueEvent": {
                    "league": {
                        "format": "ODI",
                        "leagueId": 48,
                        "name": "One-day internationals"
                    },
                    "leagueEventId": 397,
                    "manOfTheSeries1": null,
                    "manOfTheSeries2": null,
                    "matchType": "ODI",
                    "name": "Australia tour of India",
                    "season": "2023/24",
                    "winnerTeam": null
                },
                "matchId": 8271,
                "matchOutcome": {
                    "manOfTheMatch": {
                        "batStyle": "Right hand Bat",
                        "bowlStyle": "Right arm Fast",
                        "commonName": "Mohammed Shami",
                        "country": "India",
                        "cricinfoId": "481896",
                        "cricsheetId": "8cf9814c",
                        "cricsheetName": "Mohammed Shami",
                        "name": "Mohammed Shami Ahmed",
                        "playerId": 8817,
                        "role": "Bowler"
                    },
                    "matchOutcomeId": 8269,
                    "method": null,
                    "outcome": "Win by 5 Wickets",
                    "winner": {
                        "displayName": "IND",
                        "gender": "MALE",
                        "name": "India",
                        "oldNames": null,
                        "teamId": 14,
                        "type": "INTERNATIONAL"
                    }
                },
                "matchType": "ODI",
                "name": "Australia vs India",
                "playing11List": [
                    {
                        "captain": null,
                        "keeper": null,
                        "player1": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Medium",
                            "commonName": "Mitchell Marsh",
                            "country": "Australia",
                            "cricinfoId": "272450",
                            "cricsheetId": "3d8feaf8",
                            "cricsheetName": "MR Marsh",
                            "name": "Mitchell Ross Marsh",
                            "playerId": 8934,
                            "role": "Allrounder"
                        },
                        "player10": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Fast medium",
                            "commonName": "Sean Anthony Abbott",
                            "country": "Australia",
                            "cricinfoId": "398666",
                            "cricsheetId": "1a2676c5",
                            "cricsheetName": "SA Abbott",
                            "name": "Sean Anthony Abbott",
                            "playerId": 11401,
                            "role": "Bowling Allrounder"
                        },
                        "player11": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Legbreak Googly",
                            "commonName": "Adam Zampa",
                            "country": "Australia",
                            "cricinfoId": "379504",
                            "cricsheetId": "14f96089",
                            "cricsheetName": "A Zampa",
                            "name": "Adam Zampa",
                            "playerId": 2132,
                            "role": "Bowler"
                        },
                        "player2": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": "Legbreak",
                            "commonName": "David Warner",
                            "country": "Australia",
                            "cricinfoId": "219889",
                            "cricsheetId": "dcce6f09",
                            "cricsheetName": "DA Warner",
                            "name": "David Andrew Warner",
                            "playerId": 3417,
                            "role": "Opening Batter"
                        },
                        "player3": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Legbreak Googly",
                            "commonName": "Steve Smith",
                            "country": "Australia",
                            "cricinfoId": "267192",
                            "cricsheetId": "30a45b23",
                            "cricsheetName": "SPD Smith",
                            "name": "Steven Peter Devereux Smith",
                            "playerId": 12513,
                            "role": "Middle order Batter"
                        },
                        "player4": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Legbreak",
                            "commonName": "Marnus Labuschagne",
                            "country": "Australia",
                            "cricinfoId": "787987",
                            "cricsheetId": "fa433be6",
                            "cricsheetName": "M Labuschagne",
                            "name": "Marnus Labuschagne",
                            "playerId": 8554,
                            "role": "Batting Allrounder"
                        },
                        "player5": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Fast medium",
                            "commonName": "Cameron Green",
                            "country": "Australia",
                            "cricinfoId": "1076713",
                            "cricsheetId": "eaa76d3c",
                            "cricsheetName": "C Green",
                            "name": "Cameron Donald Green",
                            "playerId": 2883,
                            "role": "Batting Allrounder"
                        },
                        "player6": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": null,
                            "commonName": "Josh Inglis",
                            "country": "Australia",
                            "cricinfoId": "662235",
                            "cricsheetId": "989889ff",
                            "cricsheetName": "JP Inglis",
                            "name": "Joshua Patrick Inglis",
                            "playerId": 6638,
                            "role": "Wicketkeeper Batter"
                        },
                        "player7": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Medium",
                            "commonName": "\"Marcus Stoinis",
                            "country": "Australia",
                            "cricinfoId": "325012",
                            "cricsheetId": "d9273ee7",
                            "cricsheetName": "MP Stoinis",
                            "name": "Marcus Peter Stoinis",
                            "playerId": 8900,
                            "role": "Batting Allrounder"
                        },
                        "player8": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Offbreak",
                            "commonName": "Matthew Short",
                            "country": "Australia",
                            "cricinfoId": "605575",
                            "cricsheetId": "a90e53ec",
                            "cricsheetName": "MW Short",
                            "name": "Matthew William Short",
                            "playerId": 9197,
                            "role": "Top order Batter"
                        },
                        "player9": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Fast",
                            "commonName": "Pat Cummins",
                            "country": "Australia",
                            "cricinfoId": "489889",
                            "cricsheetId": "ded9240e",
                            "cricsheetName": "PJ Cummins",
                            "name": "Patrick James Cummins",
                            "playerId": 10135,
                            "role": "Bowler"
                        },
                        "playing11Id": 16527,
                        "subsInPlayer": null,
                        "subsOutPlayer": null,
                        "subsReason": null,
                        "team": {
                            "displayName": "AUS",
                            "gender": "MALE",
                            "name": "Australia",
                            "oldNames": null,
                            "teamId": 16,
                            "type": "INTERNATIONAL"
                        }
                    },
                    {
                        "captain": null,
                        "keeper": null,
                        "player1": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Offbreak",
                            "commonName": "Ruturaj Gaikwad",
                            "country": "India",
                            "cricinfoId": "1060380",
                            "cricsheetId": "45a43fe2",
                            "cricsheetName": "RD Gaikwad",
                            "name": "Ruturaj Dashrat Gaikwad",
                            "playerId": 10703,
                            "role": "Batter"
                        },
                        "player10": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Fast",
                            "commonName": "Jasprit Bumrah",
                            "country": "India",
                            "cricinfoId": "625383",
                            "cricsheetId": "462411b3",
                            "cricsheetName": "JJ Bumrah",
                            "name": "Jasprit Jasbirsingh Bumrah",
                            "playerId": 6340,
                            "role": "Bowler"
                        },
                        "player11": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Fast",
                            "commonName": "Mohammed Shami",
                            "country": "India",
                            "cricinfoId": "481896",
                            "cricsheetId": "8cf9814c",
                            "cricsheetName": "Mohammed Shami",
                            "name": "Mohammed Shami Ahmed",
                            "playerId": 8817,
                            "role": "Bowler"
                        },
                        "player2": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Offbreak",
                            "commonName": "Shubman Gill",
                            "country": "India",
                            "cricinfoId": "1070173",
                            "cricsheetId": "b4b99816",
                            "cricsheetName": "Shubman Gill",
                            "name": "Shubman Gill",
                            "playerId": 12098,
                            "role": "Opening Batter"
                        },
                        "player3": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Offbreak, Legbreak Googly",
                            "commonName": "Shreyas Iyer",
                            "country": "India",
                            "cricinfoId": "642519",
                            "cricsheetId": "85ec8e33",
                            "cricsheetName": "SS Iyer",
                            "name": "Shreyas Santosh Iyer",
                            "playerId": 12663,
                            "role": "Top order Batter"
                        },
                        "player4": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": null,
                            "commonName": "KL Rahul",
                            "country": "India",
                            "cricinfoId": "422108",
                            "cricsheetId": "b17e2f24",
                            "cricsheetName": "KL Rahul",
                            "name": "Kannaur Lokesh Rahul",
                            "playerId": 7234,
                            "role": "Wicketkeeper Batter"
                        },
                        "player5": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": null,
                            "commonName": "Ishan Kishan",
                            "country": "India",
                            "cricinfoId": "720471",
                            "cricsheetId": "752f7486",
                            "cricsheetName": "Ishan Kishan",
                            "name": "Ishan Pranav Kumar Pandey Kishan",
                            "playerId": 5824,
                            "role": "Wicketkeeper Batter"
                        },
                        "player6": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Medium, Right arm Offbreak",
                            "commonName": "Suryakumar Yadav",
                            "country": "India",
                            "cricinfoId": "446507",
                            "cricsheetId": "271f83cd",
                            "cricsheetName": "SA Yadav",
                            "name": "Suryakumar Ashok Yadav",
                            "playerId": 11677,
                            "role": "Batter"
                        },
                        "player7": {
                            "batStyle": "Left hand Bat",
                            "bowlStyle": "Slow Left arm Orthodox",
                            "commonName": "Ravindra Jadeja",
                            "country": "India",
                            "cricinfoId": "234675",
                            "cricsheetId": "fe93fd9d",
                            "cricsheetName": "RA Jadeja",
                            "name": "Ravindrasinh Anirudhsinh Jadeja",
                            "playerId": 10519,
                            "role": "Allrounder"
                        },
                        "player8": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Offbreak",
                            "commonName": "Ravichandran Ashwin",
                            "country": "India",
                            "cricinfoId": "26421",
                            "cricsheetId": "495d42a5",
                            "cricsheetName": "R Ashwin",
                            "name": "Ravichandran Ashwin",
                            "playerId": 10603,
                            "role": "Bowling Allrounder"
                        },
                        "player9": {
                            "batStyle": "Right hand Bat",
                            "bowlStyle": "Right arm Medium",
                            "commonName": "Shardul Thakur",
                            "country": "India",
                            "cricinfoId": "475281",
                            "cricsheetId": "1abb78f8",
                            "cricsheetName": "SN Thakur",
                            "name": "Shardul Narendra Thakur",
                            "playerId": 12453,
                            "role": "Bowler"
                        },
                        "playing11Id": 16528,
                        "subsInPlayer": null,
                        "subsOutPlayer": null,
                        "subsReason": null,
                        "team": {
                            "displayName": "IND",
                            "gender": "MALE",
                            "name": "India",
                            "oldNames": null,
                            "teamId": 14,
                            "type": "INTERNATIONAL"
                        }
                    }
                ],
                "team1": {
                    "displayName": "AUS",
                    "gender": "MALE",
                    "name": "Australia",
                    "oldNames": null,
                    "teamId": 16,
                    "type": "INTERNATIONAL"
                },
                "team2": {
                    "displayName": "IND",
                    "gender": "MALE",
                    "name": "India",
                    "oldNames": null,
                    "teamId": 14,
                    "type": "INTERNATIONAL"
                },
                "tossWinnerChoice": "field",
                "tossWonTeam": {
                    "displayName": "IND",
                    "gender": "MALE",
                    "name": "India",
                    "oldNames": null,
                    "teamId": 14,
                    "type": "INTERNATIONAL"
                },
                "venue": "Punjab Cricket Association IS Bindra Stadium, Mohali, Chandigarh"
            }
        ];

    }
    return new AusTourofIndia();
});