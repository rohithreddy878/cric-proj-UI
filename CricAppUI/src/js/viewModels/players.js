/**
 * @license
 * Copyright (c) 2014, 2023, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define(['knockout', 'ojs/ojcontext','../accUtils','../utils/CommonUtils', '../utils/Constants',
        '../utils/DataUtils','ojs/ojarraydataprovider',
        'oj-st-scroll-to-top/loader','oj-player-card/loader',
        'ojs/ojlistview','ojs/ojinputsearch'],
 function(ko, Context,accUtils,CommonUtils, Constants, DataUtils, ArrayDataProvider) {
    function PlayersViewModel(routerArgs) {

      var self = this;
      this.connected = () => {
        accUtils.announce('Players page loaded.');
        document.title = "Players";
        // Implement further logic if needed
      };

      self.playerSearcVal = ko.observable("");
      self.searchPlayers = function(){
        console.log(self.playerSearcVal());
      }

      self.playersToDisplay = ko.observable(new ArrayDataProvider([], {keyAttributes: "playerId"}));

      self.viewPlayerClick = function(){
  
      }
      self.favPlayers = ko.observable();
      self.fetchFavouritePlayers = function(){
        var getFavouritePlayersUrl = Constants.FLASK_SERVICES_CONTEXT_PATH + "favourites/players";
        console.log("fetching Favourite Players details, ", getFavouritePlayersUrl);
        var favs = [];
        CommonUtils.ajaxCall('GET',getFavouritePlayersUrl,true,"","json","",
          function(data){},    //success call back
          function(data){},    //failure call back
          //complete call back
          (xhr, res) => { 
            //console.log("inside complete callback",res);
            if (res.status == 200){
              var data = res.responseJSON.data;
              $.each(data, function () {
                favs.push({
                    playerName: this.commonName==null?this.name:this.commonName,
                    playerId: this.playerId,
                    playerRole: this.role,
                    playerFullName: this.name,
                    battingStyle: this.batStyle,
                    bowlingStyle: this.bowlStyle,
                    country: this.country
                })
              });
            }
            DataUtils.favouritePlayersList(new ArrayDataProvider(favs, {
              keyAttributes: "playerId",
            }));
            self.favPlayers(new ArrayDataProvider(favs, {
              keyAttributes: "playerId",
            }));
          }
        );
      }
      self.fetchFavouritePlayers();
      //self.favPlayers = ko.observable(DataUtils.favouritePlayersList());
      console.log(DataUtils.favouritePlayersList());

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
    return PlayersViewModel;
  }
);
