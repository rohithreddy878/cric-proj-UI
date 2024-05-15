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
        'ojs/ojlistview','ojs/ojinputsearch','ojs/ojdrawerlayout','ojs/ojformlayout',
        'ojs/ojactioncard','ojs/ojwaterfalllayout','oj-c/avatar'],
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

      self.playerBattingWfDP =  ko.observable(new ArrayDataProvider([], {}));
      self.playerBowlingWfDP =  ko.observable(new ArrayDataProvider([], {}));

      

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
  

      self.getPlayerCareerStats = function(){
        var getPlayerStatsUrl = Constants.FLASK_SERVICES_CONTEXT_PATH + "stats/players/"+self.currentPlayerId();
        CommonUtils.ajaxCall('GET',getPlayerStatsUrl,true,"","json","",
          function(data){},    //success call back
          function(data){},    //failure call back
          //complete call back
          (xhr, res) => { 
            if (res.status == 200){
              var data = res.responseJSON.data;
              stats= {
                "totalMatches": data.totalMatches,

                // batting
                "inningsBatted": data.inningsBatted,
                "runsScored": parseInt(data.runsScored),
                "ballsFaced": data.ballsFaced,
                "4s": data['4s'],
                "6s": data['6s'],
                "notOuts": data.notOuts,
                "highestScore": parseInt(data.highestScore),
                "100s": data['100s'],
                "50s": data['50s'],
                "30s": data['30s'],
                "battingSR":data.ballsFaced!=0?((100*parseInt(data.runsScored))/data.ballsFaced).toFixed(2):0,
                "battingAvg":(data.inningsBatted-data.notOuts)!=0?((parseInt(data.runsScored))/(data.inningsBatted-data.notOuts)).toFixed(2):'-',

                //balling
                "inningsBowled": data.inningsBowled,
                "ballsBowled": data.ballsBowled,
                "oversBowled":(Math.floor(data.ballsBowled/6))+((data.ballsBowled%6)/10),
                "runsConceded": parseInt(data.runsConceded),
                "wickets": data.wickets,
                "3wHauls": data['3wHauls'],
                "4wHauls": data['4wHauls'],
                "economy":data.ballsBowled !== 0 ? parseFloat((Math.round((parseInt(data.runsConceded)/(data.ballsBowled/6))*100)/100).toFixed(2)) : 0,
                "bowlingSR":data.wickets!=0 ? (data.ballsBowled/data.wickets).toFixed(2) : 0,
                "bowlingAvg":data.wickets!=0 ? (parseInt(data.runsConceded)/data.wickets).toFixed(2) : 0,
              }
              console.log("stats: ", stats)
            }
          }
        );
        self.formWaterfallDetailsForStats(stats);
      }

      self.formWaterfallDetailsForStats = function(stats){
        battingWfData=[
          {
            id: "matches",
            name: "Matches",
            value: stats.totalMatches==0?'0':stats.totalMatches,
            priority: 'high',
            avatarShape:'square',
            avatarSize:'lg',
            avatarBg:'gray'
          },
          {
            id: "innings",
            name: "Innings",
            value: stats.inningsBatted==0?'0':stats.inningsBatted,
            priority: 'low',
            avatarShape:'square',
            avatarSize:'lg',
            avatarBg:'gray'
          },
          {
            id: "runsScored",
            name: "Runs",
            value: stats.runsScored==0?'0':stats.runsScored,
            priority: 'high',
            avatarShape:'square',
            avatarSize:'lg',
            avatarBg:'blue'
          },
          {
            id: "ballsFaced",
            name: "Balls",
            value: stats.ballsFaced==0?'0':stats.ballsFaced,
            priority: 'low',
            avatarShape:'square',
            avatarSize:'lg',
            avatarBg:'blue'
          },
          {
            id: "battingSR",
            name: "Strike Rate",
            value: stats.battingSR==0?'0':stats.battingSR,
            priority: 'high',
            avatarShape:'square',
            avatarSize:'xl',
            avatarBg:'pink'
          },
          {
            id: "sixes",
            name: "Sixes",
            value: stats["6s"]==0?'0':stats["6s"],
            priority: 'high',
            avatarShape:'circle',
            avatarSize:'md',
            avatarBg:'pink'
          },
          {
            id: "fours",
            name: "Fours",
            value: stats["4s"]==0?'0':stats["4s"],
            priority: 'low',
            avatarShape:'circle',
            avatarSize:'lg',
            avatarBg:'pink'
          },
          {
            id: "battingAvg",
            name: "Average",
            value: stats.battingAvg==0?'0':stats.battingAvg,
            priority: 'high',
            avatarShape:'square',
            avatarSize:'xl',
            avatarBg:'pink'
          },
          {
            id: "notOuts",
            name: "Not Out",
            value: stats.notOuts==0?'0':stats.notOuts,
            priority: 'low',
            avatarShape:'circle',
            avatarSize:'md',
            avatarBg:'gray'
          },
          {
            id: "centuries",
            name: "Centuries",
            value: stats["100s"]==0?'0':stats["100s"],
            priority: 'low',
            avatarShape:'circle',
            avatarSize:'md',
            avatarBg:'blue'
          },
          {
            id: "thirties",
            name: "30s",
            value: stats["30s"]==0?'0':stats["30s"],
            priority: 'low',
            avatarShape:'circle',
            avatarSize:'md',
            avatarBg:'blue'
          },

        ];
        self.playerBattingWfDP(new ArrayDataProvider(battingWfData, {keyAttributes: 'id'}));
        bowlingWfData=[
          {
            id: "matches",
            name: "Matches",
            value: stats.totalMatches==0?'0':stats.totalMatches,
            priority: 'high',
            avatarShape:'square',
            avatarSize:'lg',
            avatarBg:'gray'
          },
          {
            id: "innings",
            name: "Innings",
            value: stats.inningsBowled==0?'0':stats.inningsBowled,
            priority: 'low',
            avatarShape:'square',
            avatarSize:'lg',
            avatarBg:'gray'
          },
          {
            id: "oversBowled",
            name: "Overs",
            value: stats.oversBowled==0?'0':stats.oversBowled,
            priority: 'high',
            avatarShape:'square',
            avatarSize:'xl',
            avatarBg:'blue'
          },
          {
            id: "runsConceded",
            name: "Runs",
            value: stats.runsConceded==0?'0':stats.runsConceded,
            priority: 'low',
            avatarShape:'square',
            avatarSize:'lg',
            avatarBg:'blue'
          },
          {
            id: "wickets",
            name: "Wickets",
            value: stats.wickets==0?'0':stats.wickets,
            priority: 'high',
            avatarShape:'circle',
            avatarSize:'xl',
            avatarBg:'pink'
          },
          {
            id: "economy",
            name: "Economy",
            value: stats.economy==0?'0':stats.economy,
            priority: 'high',
            avatarShape:'circle',
            avatarSize:'lg',
            avatarBg:'pink'
          },
          {
            id: "bowlingSR",
            name: "Bowling SR",
            value: stats.bowlingSR==0?'0':stats.bowlingSR,
            priority: 'high',
            avatarShape:'square',
            avatarSize:'lg',
            avatarBg:'pink'
          },
          {
            id: "bowlingAvg",
            name: "Bowling Avg",
            value: stats.bowlingAvg==0?'0':stats.bowlingAvg,
            priority: 'high',
            avatarShape:'square',
            avatarSize:'lg',
            avatarBg:'pink'
          },
          {
            id: "3wHauls",
            name: "3-w Hauls",
            value: stats["3wHauls"]==0?'0':stats["3wHauls"],
            priority: 'low',
            avatarShape:'circle',
            avatarSize:'md',
            avatarBg:'blue'
          },
          {
            id: "4wHauls",
            name: "4-w Hauls",
            value: stats["4wHauls"]==0?'0':stats["4wHauls"],
            priority: 'low',
            avatarShape:'circle',
            avatarSize:'md',
            avatarBg:'blue'
          },

        ];
        self.playerBowlingWfDP(new ArrayDataProvider(bowlingWfData, {keyAttributes: 'id'}));
      }


      self.goBackToPlayersPage = function(){
        CommonUtils.changeRoute(routerArgs, "players", {});
      }

      //on initial load:
      self.getPlayerBasicDetails();
      self.getPlayerCareerStats();

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
