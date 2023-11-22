/**
 * @license
 * Copyright (c) 2014, 2023, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['knockout', 'ojs/ojcontext','../accUtils','../utils/CommonUtils', '../utils/Constants','../utils/DataUtils',
        '../utils/AusTourofIndia','ojs/ojarraydataprovider','oj-st-scroll-to-top/loader',
        'ojs/ojselectsingle', "ojs/ojtable",'ojs/ojdialog','ojs/ojcollapsible',"oj-c/button",
        'oj-c/list-view','ojs/ojlistview','oj-c/list-item-layout','ojs/ojlistitemlayout'],
 function(ko, Context, accUtils,CommonUtils, Constants, DataUtils, AusTourofIndia,ArrayDataProvider) {
    function MatchesViewModel() {
     
      var self = this;

      this.connected = () => {
        accUtils.announce('Matches page loaded.');
        document.title = "Matches";
        // Implement further logic if needed
      };

      self.selectedSeasonVal = ko.observable('2023/24');
      self.selectedLeagueEventVal = ko.observable();

      self.seasonListDP = ko.observable(new ArrayDataProvider([], { }));

      self.fetchMatchDetails = function(matchId){
        var match = null;
        var getMatchDetailsUrl = Constants.SERVICES_CONTEXT_PATH + "matches/matchDetails?matchId="+matchId;
        console.log("fetching match details with URL: ", getMatchDetailsUrl);
        CommonUtils.ajaxCall('GET',getMatchDetailsUrl,true,"","json","",
          //success call back
          function(data){
            console.log("successful to get match details..");
          },
          //failure call back
          function(data){
            console.log("failed to to get match details");
          },
          //complete call back
          (xhr, res) => { 
            //console.log("inside complete callback of get match details",res);
            if (res.status == 200){
              var data = res.responseJSON;
              match=data;
            }
          }
        );
        return match;
      }

      self.fetchMatchScorecards = function(matchId){
        var scorecards = null;
        var getMatchScorecardsUrl = Constants.SERVICES_CONTEXT_PATH + "matches/scorecards?matchId="+matchId;
        console.log("fetching match Scorecards with URL: ", getMatchScorecardsUrl);
        CommonUtils.ajaxCall('GET',getMatchScorecardsUrl,true,"","json","",
          //success call back
          function(data){
            console.log("successful to get match Scorecards..");
          },
          //failure call back
          function(data){
            console.log("failed to to get match Scorecards");
          },
          //complete call back
          (xhr, res) => { 
            //console.log("inside complete callback of get match details",res);
            if (res.status == 200){
              var data = res.responseJSON;
              scorecards=data;
            }
          }
        );
        return scorecards;
      }

      self.getLeagueEventSeasons = function(){
        var seasons = []
        var getLeagueEventSeasonsUrl = Constants.SERVICES_CONTEXT_PATH + "leagues/seasons";
        console.log("fetching all League Event Seasons, ", getLeagueEventSeasonsUrl);
        CommonUtils.ajaxCall('GET',getLeagueEventSeasonsUrl,true,"","json","",
          //success call back
          function(data){
            console.log("successful to all League Event Seasons..");
            //DataUtils.favouritePlayersList(data);
          },
          //failure call back
          function(data){
            console.log("failed to get all League Event Seasons");
          },
          //complete call back
          (xhr, res) => { 
            //console.log("inside complete callback of get all League Event Seasons",res);
            if (res.status == 200){
              var data = res.responseJSON;
              $.each(data, function () {
                seasons.push({
                    value: this
                })
              });
              self.seasonListDP(new ArrayDataProvider(seasons, { keyAttributes: "value", }));
            }
          }
        );
      }

      //self.leagueEvents = ko.observableArray([]);
      self.leagueEventsListDP = ko.observable([]);//new ArrayDataProvider(self.leagueEvents(), { keyAttributes: "value" });

      self.onSeasonSelectionChange = function(event){
        let pv = event.detail.previousValue;
        let v = event.detail.value;
        //console.log(pv, v,(pv==v));
        if(v==pv){
          //self.leagueEventsListDP(new ArrayDataProvider(self.leagueEvents, { keyAttributes: "value" }));
        }
        else if(v ==null || v==""){
          self.leagueEvents = [];
        }
        else{
          self.getLeagueEventsForSeason(v);
        }
      }

      self.getLeagueEventsForSeason = function(season){
        var events = []
        var getLeagueEventsForSeasonUrl = Constants.SERVICES_CONTEXT_PATH + "leagues/events?season="+season;
        console.log("fetching all League Events for a Season, ", getLeagueEventsForSeasonUrl);
        CommonUtils.ajaxCall('GET',getLeagueEventsForSeasonUrl,true,"","json","",
          //success call back
          function(data){
            console.log("successful to get all League Events for Season..");
          },
          //failure call back
          function(data){
            console.log("failed to get all League Events for Season");
          },
          //complete call back
          (xhr, res) => { 
            //console.log("inside complete callback of get all League Events for Season",res);
            if (res.status == 200){
              var data = res.responseJSON;
              $.each(data, function () {
                events.push({
                    value: this.leagueEventId,
                    name: this.name,
                    season: this.season,
                    matchType: this.matchType,
                    league: this.league.name,
                    format: this.league.format
                })
              });
              //self.leagueEvents =events;
              self.leagueEventsListDP(new ArrayDataProvider(events, { keyAttributes: "value" }));
              //return events;
            }
          }
        );
      }

      self.matchesArray = []
      self.matchesListDP =  ko.observable(new ArrayDataProvider(self.matchesArray, { keyAttributes: "value" }));

      self.onLeagueEventSelectionChange = function(event){
        let pv = event.detail.previousValue;
        let v = event.detail.value;
        if(v==pv){
          //do nothing
        }
        else if(v ==null || v==""){
          self.matchesArray = [];
        }
        else{
          self.getMatchesForLeagueEvent(v);
        }

      }



      self.getMatchesForLeagueEvent = function(le){
        var matches = []
        var getMatchesForLeagueEventUrl = Constants.SERVICES_CONTEXT_PATH + "matches?leagueEvent="+le;
        console.log("fetching all matches for League Event, ", getMatchesForLeagueEventUrl);
        CommonUtils.ajaxCall('GET',getMatchesForLeagueEventUrl,true,"","json","",
          //success call back
          function(data){
            console.log("successful to get matches for League Event..");
          },
          //failure call back
          function(data){
            console.log("failed to get matches for League Event");
          },
          //complete call back
          (xhr, res) => { 
            console.log(res.status);
            //console.log("inside complete callback of get matches for League Event",res);
            if (res.status == 200){
              var data = res.responseJSON;
              $.each(data, function () {
                matches.push({
                  value: this.matchId,
                  date: this.date,
                  enddate: this.enddate,
                  name: this.name,
                  venue: this.venue,
                  tosswinner: this.tossWonTeam.name,
                  tosschoice: this.tossWonTeam.tossWinnerChoice,
                  result: this.matchOutcome.winner!=null?
                            this.matchOutcome.winner.name + " " +  this.matchOutcome.outcome:
                            this.matchOutcome.outcome,
                  mom:    this.matchOutcome.manOfTheMatch!=null?
                          (this.matchOutcome.manOfTheMatch.commonName!=null? 
                                  this.matchOutcome.manOfTheMatch.commonName: 
                                  this.matchOutcome.manOfTheMatch.name):
                          "--",
                  //playing111:this.playing11List[0],
                  //playing112:this.playing11List[1],
                })
              });
              self.matchesArray = matches;
              self.matchesListDP(new ArrayDataProvider(matches, { keyAttributes: "value" }));
            }
          }
        );
      }


      self.matchesTableColumns = [
          {
            id:"datesColumn",
            headerText: "Date(s)", 
            field: "date",
            headerClassName: "oj-sm-only-hide",
            className: "oj-sm-only-hide",
            resizable: "enabled",
          },
          {
            id:"nameColumn",
            headerText: "Match", 
            field: "name",
            headerClassName: "oj-sm-only-hide",
            className: "oj-sm-only-hide",
            resizable: "enabled",
          },
          {
            id:"venueColumn",
            headerText: "Venue", 
            field: "venue",
            headerClassName: "oj-sm-only-hide",
            className: "oj-sm-only-hide",
            resizable: "enabled",
          },
          {
            id:"resultColumn",
            headerText: "Result", 
            field: "result",
            headerClassName: "oj-sm-only-hide",
            className: "oj-sm-only-hide",
            resizable: "enabled",
          },
          {
            id:"momColumn",
            headerText: "Man of the Match", 
            field: "mom",
            headerClassName: "oj-sm-only-hide",
            className: "oj-sm-only-hide",
            resizable: "enabled",
          },
          {
            id:"actionsColumn",
            headerText:"Actions",
            field:"value",
            template:"actionsTemplate"
          }
      ];

      self.battingScorecardsTableColumns = [
        {
          id:"batter",
          headerText: "batter", 
          field: "batterName",
          headerClassName: "oj-sm-only-hide",
          className: "oj-sm-only-hide",
          resizable: "enabled",
        },
        {
          id:"runs",
          headerText: "runs", 
          field: "runs",
          headerClassName: "oj-sm-only-hide",
          className: "oj-sm-only-hide",
          resizable: "disabled",
        },
        {
          id:"balls",
          headerText: "balls", 
          field: "balls",
          headerClassName: "oj-sm-only-hide",
          className: "oj-sm-only-hide",
          resizable: "disabled",
        },
        {
          id:"fours",
          headerText: "4s", 
          field: "fours",
          headerClassName: "oj-sm-only-hide",
          className: "oj-sm-only-hide",
          resizable: "disabled",
        },
        {
          id:"sixes",
          headerText: "6s", 
          field: "sixes",
          headerClassName: "oj-sm-only-hide",
          className: "oj-sm-only-hide",
          resizable: "disabled",
        },
        {
          id:"strikeRate",
          headerText: "SR", 
          field: "strikeRate",
          headerClassName: "oj-sm-only-hide",
          className: "oj-sm-only-hide",
          resizable: "disabled",
        },
      ];
      self.bowlingScorecardsTableColumns = [
        {
          id:"bowler",
          headerText: "bowler", 
          field: "bowlerName",
          headerClassName: "oj-sm-only-hide",
          className: "oj-sm-only-hide",
          resizable: "enabled",
        },
        {
          id:"overs",
          headerText: "overs", 
          field: "overs",
          headerClassName: "oj-sm-only-hide",
          className: "oj-sm-only-hide",
          resizable: "disabled",
        },
        {
          id:"runs",
          headerText: "runs", 
          field: "runs",
          headerClassName: "oj-sm-only-hide",
          className: "oj-sm-only-hide",
          resizable: "disabled",
        },
        {
          id:"wickets",
          headerText: "wickets", 
          field: "wickets",
          headerClassName: "oj-sm-only-hide",
          className: "oj-sm-only-hide",
          resizable: "disabled",
        },
        {
          id:"noballs",
          headerText: "No Balls", 
          field: "noballs",
          headerClassName: "oj-sm-only-hide",
          className: "oj-sm-only-hide",
          resizable: "disabled",
        },
        {
          id:"wides",
          headerText: "wides", 
          field: "wides",
          headerClassName: "oj-sm-only-hide",
          className: "oj-sm-only-hide",
          resizable: "disabled",
        },
        {
          id:"economy",
          headerText: "economy", 
          field: "economy",
          headerClassName: "oj-sm-only-hide",
          className: "oj-sm-only-hide",
          resizable: "disabled",
        },
      ];
      
      //for local testing 
      /** 
      var mts = [];  //AusTourofIndia.matches;
      $.each(AusTourofIndia.matches, function () {
        console.log("assinging---",this)
        mts.push({
            value: this.matchId,
            date: this.date,
            enddate: this.enddate,
            name: this.name,
            venue: this.venue,
            tosswinner: this.tossWonTeam.name,
            tosschoice: this.tossWonTeam.tossWinnerChoice,
            result: this.matchOutcome.winner.name + " " +  this.matchOutcome.outcome,
            mom: this.matchOutcome.manOfTheMatch.commonName!=null? 
                    this.matchOutcome.manOfTheMatch.commonName: 
                    this.matchOutcome.manOfTheMatch.name,
            playing111:this.playing11List[0],
            playing112:this.playing11List[1],
        })
      });
      self.matchesListDP(new ArrayDataProvider(mts, { keyAttributes: "value" }));  
      */

      self.currMatch = ko.observable();
      self.currMatchName = ko.observable("");
      self.currMatchId = ko.observable("");
      self.currTeam1 = ko.observable("");
      self.currTeam2 = ko.observable("");
      self.currPlaying111Para = ko.observable("");
      self.currPlaying112Para = ko.observable("");

      self.currInnings = ko.observableArray(new Array());
      self.currInningsDP = new ArrayDataProvider(self.currInnings, {keyAttributes: 'inningsId'});


      self.onOpenMatchDetailsClick = function(data, context){
        //console.log(context.data);
        let mId = context.data;
        self.matchesArray.forEach(m=>{
          if(m["value"]==mId){
            self.currMatchId(m.matchId);
          }
        });
        var matchDetails = self.fetchMatchDetails(mId);
        var mt = matchDetails.match;
        self.currMatch(matchDetails);
        self.currMatchName(mt.name);
        var pList = matchDetails.playing11List;
        ar1 = CommonUtils.formPlaying11Para(pList[0]);
        self.currPlaying111Para(ar1[1]);
        self.currTeam1(ar1[0]);
        ar2 = CommonUtils.formPlaying11Para(pList[1]);
        self.currPlaying112Para(ar2[1]);
        self.currTeam2(ar2[0]);

        //fetch scorecard using self.currMatchId:
        var scorecards = self.fetchMatchScorecards(mId);
        if(scorecards[0].runs!=0 || scorecards[1].runs!=0){
          scorecards.forEach(inn => {
            innings = {
              "extras": inn.extras,
              "index": inn.index,
              "inningsId": inn.inningsId,
              "matchId": inn.matchId,
              "name": inn.name,
              "overs": inn.overs,
              "runs": inn.runs,
              "wickets": inn.wickets,
              "score":inn.runs+"-"+inn.wickets+"("+inn.overs+" Ov)",
              "battersDP": new ArrayDataProvider(inn.batterScoresList, { keyAttributes: "batterId" }),
              "bowlersDP": new ArrayDataProvider(inn.bowlerScoresList, { keyAttributes: "bowlerId" }),

            };
            self.currInnings.push(innings);
          });
        }
        document.querySelector("#details-dialog").open();
      }

      //on start
      self.getLeagueEventSeasons();
      self.leagueEvents = self.getLeagueEventsForSeason(self.selectedSeasonVal());

      this.disconnected = () => {
        // Implement if needed
      };

      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    return MatchesViewModel;
  }
);
