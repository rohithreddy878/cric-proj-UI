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
define(['knockout', 'ojs/ojcontext','../accUtils','../utils/CommonUtils', '../utils/Constants','../utils/DataUtils','../utils/AusTourofIndia',
        'ojs/ojarraydataprovider','oj-st-scroll-to-top/loader',
        'ojs/ojselectsingle', "ojs/ojtable",'ojs/ojdialog'],
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
            console.log("inside complete callback of get all League Event Seasons",res);
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


      self.leagueEvents = [];
      self.leagueEventsListDP = ko.observableArray([]);

      self.onSeasonSelectionChange = function(event){
        let pv = event.detail.previousValue;
        let v = event.detail.value;
        console.log(pv, v,(pv==v));
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
            console.log("inside complete callback of get all League Events for Season",res);
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
              self.leagueEvents = events;
              self.leagueEventsListDP(new ArrayDataProvider(events, { keyAttributes: "value" }));
              console.log(events);
              //return events;
            }
          }
        );
      }

      self.matchesArray = []
      self.matchesListDP =  ko.observableArray([]);

      self.onLeagueEventSelectionChange = function(event){
        let pv = event.detail.previousValue;
        let v = event.detail.value;
        console.log(pv, v,(pv==v));
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
            console.log("inside complete callback of get matches for League Event",res);
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
                    winner: this.matchOutcome.winner.name,
                    outcome: this.matchOutcome.outcome,
                    mom: this.matchOutcome.manOfTheMatch.name
                })
              });
              self.matchesArray = matches;
              self.matchesListDP(new ArrayDataProvider(matches, { keyAttributes: "value" }));
            }
          }
        );
      }


      self.matchesTableColumn = [
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
      
      //for local testing
      var mts = [];  //AusTourofIndia.matches;
      $.each(AusTourofIndia.matches, function () {
        mts.push({
            value: this.matchId,
            date: this.date,
            enddate: this.enddate,
            name: this.name,
            venue: this.venue,
            tosswinner: this.tossWonTeam.name,
            tosschoice: this.tossWonTeam.tossWinnerChoice,
            result: this.matchOutcome.winner.name + " " +  this.matchOutcome.outcome,
            mom: this.matchOutcome.manOfTheMatch.commonName!=null? this.matchOutcome.manOfTheMatch.commonName: this.matchOutcome.manOfTheMatch.name
        })
      });
      self.matchesListDP(new ArrayDataProvider(mts, { keyAttributes: "value" }));  

      self.currMatch = ko.observable();
      self.currMatchName = ko.observable("");
      self.onOpenMatchDetailsClick = function(data, context){
        console.log(context.data);
        let mid = context.data;
        mts.forEach(m=>{
          if(m["value"]==mid){
            self.currMatch(m);
            self.currMatchName(m.name);
          }
        });
        console.log(self.currMatch());
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
