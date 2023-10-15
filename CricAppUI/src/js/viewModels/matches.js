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
        'ojs/ojarraydataprovider','oj-st-scroll-to-top/loader',
        'ojs/ojselectsingle'],
 function(ko, Context, accUtils,CommonUtils, Constants, DataUtils, ArrayDataProvider) {
    function MatchesViewModel() {
     
      var self = this;

      this.connected = () => {
        accUtils.announce('Matches page loaded.');
        document.title = "Matches";
        // Implement further logic if needed
      };

      self.selectedSeasonVal = ko.observable("");
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

      self.getLeagueEventSeasons();

      self.leagueEventsListDP = ko.observable(new ArrayDataProvider([], { }));
      self.onSeasonSelectionChange = function(){
        if(self.selectedSeasonVal() ==null || self.selectedSeasonVal()==""){
          self.leagueEventsListDP(new ArrayDataProvider([], { }));
        }
        var leagueEvents = self.getLeagueEventsForSeason(self.selectedSeasonVal());
        self.leagueEventsListDP(new ArrayDataProvider(leagueEvents, { keyAttributes: "value", }));
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
              self.seasonListDP(new ArrayDataProvider(events, { keyAttributes: "value", }));
            }
          }
        );
      }

      self.onLeagueEventSelectionChange = function(){

      }








      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return MatchesViewModel;
  }
);
