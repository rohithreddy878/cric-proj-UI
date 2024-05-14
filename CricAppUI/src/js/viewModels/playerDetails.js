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
        'oj-st-scroll-to-top/loader','oj-player-card/loader','ojs/ojinputtext','oj-c/button',
        'ojs/ojlistview','ojs/ojinputsearch','ojs/ojdrawerlayout'],
 function(ko, Context,accUtils,CommonUtils, Constants, DataUtils, ArrayDataProvider) {
    function PlayerDetailsViewModel(routerArgs) {

      var self = this;
      this.connected = () => {
        accUtils.announce('Player details page loaded.');
        document.getElementById("appn-header").style.display = "none";
        document.getElementById("appn-short-header").style.display = "block";
        pName=routerArgs.params.playerName;
        document.title = pName; //change it to player name
        // Implement further logic if needed
      };

      self.currentPlayerId = ko.observable();
      self.currentPlayerName = ko.observable("");
      self.currentPlayerInfo = ko.observable({});

      self.hasBatted = ko.observable(false);
      self.hasBowled = ko.observable(false);
      self.noOfDelsBatted = ko.observable(0);
      self.noOfDelsBowled = ko.observable(0);

      self.drawerOpened = ko.observable(false);
      self.drawerToggle = () => self.drawerOpened(!self.drawerOpened());
      self.drawerNavSelection = ko.observable("basic");

    /********************** logic to extract module params *************************/
      
      try{
        let pName = routerArgs.params.playerName;
        let pId = routerArgs.params.playerId;
        if(pId==0 || pId=="" || pId==null){
            CommonUtils.changeRoute(routerArgs, "dashboard", {});
        }
        else if(pName=="" || pName==null){
            CommonUtils.changeRoute(routerArgs, "dashboard", {});
        }
        else{
            self.currentPlayerId(pId);
            self.currentPlayerName(pName);
        }

      }
      catch(ex){ // any exceptions in query params in url will be caught here  
        //console.log("something wrong in try", ex)
      }
    /********************** functions *************************/
      self.getPlayerBasicDetails = function(){
        var getPlayerBasicDetailsUrl = Constants.FLASK_SERVICES_CONTEXT_PATH + "players/"+self.currentPlayerId();
        CommonUtils.ajaxCall('GET',getPlayerBasicDetailsUrl,true,"","json","",
          function(data){},    //success call back
          function(data){},    //failure call back
          //complete call back
          (xhr, res) => { 
            if (res.status == 200){
              var data = res.responseJSON.data;
              self.currentPlayerInfo(data);
            }
          }
        );
        var updatePlayerHasBattedUrl = Constants.FLASK_SERVICES_CONTEXT_PATH + "players/"+self.currentPlayerId()+"/playedAs/"+"batter";
        CommonUtils.ajaxCall('GET',updatePlayerHasBattedUrl,true,"","json","",
            function(data){},    //success call back
            function(data){},    //failure call back
            //complete call back
            (xhr, res) => { 
                if (res.status == 200){
                    var data = res.responseJSON.data;
                    if(data.count>0){
                        self.hasBatted(true);
                        self.noOfDelsBatted(data.count);
                    }
                }
            }
        );
        var updatePlayerHasBowledUrl = Constants.FLASK_SERVICES_CONTEXT_PATH + "players/"+self.currentPlayerId()+"/playedAs/"+"bowler";
        CommonUtils.ajaxCall('GET',updatePlayerHasBowledUrl,true,"","json","",
            function(data){},    //success call back
            function(data){},    //failure call back
            //complete call back
            (xhr, res) => { 
                if (res.status == 200){
                    var data = res.responseJSON.data;
                    if(data.count>0){
                        self.hasBowled(true);
                        self.noOfDelsBowled(data.count);
                    }
                }
            }
        );
      }

      self.goBackToPlayersPage = function(){
        CommonUtils.changeRoute(routerArgs, "players", {});
      }

      //on initial load:
      self.getPlayerBasicDetails();

      this.disconnected = () => {
        // Implement if needed
        document.getElementById("appn-short-header").style.display = "none";
        document.getElementById("appn-header").style.display = "flex";
      };

      this.transitionCompleted = () => {
        // Implement if needed
      };


    }
  
    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return PlayerDetailsViewModel;
  }
);
