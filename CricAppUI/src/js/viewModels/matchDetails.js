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
define(['knockout', 'ojs/ojcontext','../accUtils','../utils/CommonUtils', '../utils/Constants','../utils/DataUtils',
        'ojs/ojarraydataprovider',
        'ojs/ojarraytreedataprovider','ojs/ojpalette', 'ojs/ojpaletteutils','oj-st-scroll-to-top/loader',
        'ojs/ojselectsingle', 'ojs/ojtable','ojs/ojdialog','ojs/ojcollapsible','oj-c/button',
        'oj-c/list-view','ojs/ojlistview','oj-c/list-item-layout','ojs/ojlistitemlayout','ojs/ojformlayout',
        'ojs/ojpagingcontrol','ojs/ojdefer','ojs/ojnavigationlist','ojs/ojchart','ojs/ojbutton',
        'ojs/ojtreemap',"ojs/ojaccordion","ojs/ojradioset","ojs/ojlabel"],
 function(ko, Context,accUtils,CommonUtils, Constants, DataUtils, ArrayDataProvider,
          ArrayTreeDataProvider,ojpalette_1, ojpaletteutils_1) {
    function MatchDetailsViewModel(routerArgs) {

      var self = this;
      this.connected = () => {
        accUtils.announce('Match details page loaded.');
        document.getElementById("appn-header").style.display = "none";
        document.getElementById("appn-short-header").style.display = "block";

        mId=routerArgs.params.matchId;
        document.title = mId; //try to change it to match name eg CSK v GT
        // Implement further logic if needed
      };

      self.currentMatchId = ko.observable();
      self.currentMatchName = ko.observable("");
      self.currentMatchDate = ko.observable("");
      self.currentMatchInfo = ko.observable({});


      self.currTeam1 = ko.observable("");
      self.currTeam2 = ko.observable("");
      self.currPlaying111Para = ko.observable("");
      self.currPlaying112Para = ko.observable("");

      self.currInnings = ko.observableArray(new Array());
      self.currInningsDP = new ArrayDataProvider(self.currInnings, {keyAttributes: 'inningsId'});


      self.battingScorecardsTableColumns = [
        {
          id:"batter",
          headerText: "batter",
          headerTemplate:'batterHeadingTemplate', 
          field: "batterName",
          template:"batterNameTemplate",
          headerClassName: "oj-sm-only-hide",
          className: "oj-sm-only-hide",
          resizable: "enabled",
        },
        {
          id:"outStatus",
          headerText: "",
          field: "outStatusString",
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
          headerTemplate:'bowlerHeadingTemplate', 
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


      self.matchDetailsDialogTabsData = [
        { name: 'Scorecard', id: 'scorecard', icons: 'oj-ux-ico-artifact-audit-file' },
        { name: 'Visualize', id: 'visualize', icons: 'oj-ux-ico-chart-bar-stacked-vertical' },
      ];
      self.matchDetailsDialogTabsDP = new ArrayDataProvider(self.matchDetailsDialogTabsData, { keyAttributes: 'id' });
      self.matchDetailsDialogSelectedTab = ko.observable('scorecard');

      self.inningsSelectionOptions = [];
      self.selectedInnings = ko.observable("");
      self.selectedInningsTitle = ko.observable("");
      self.selectedChartOption = ko.observable("bat-contribs");

      //self.batScoreContribsData = [];
      self.batScoreContribsDP = ko.observable(new ArrayDataProvider([],{}));
      self.batImpactsDP = ko.observable(new ArrayTreeDataProvider([],{}));
      self.bowlerEconomiesDP = ko.observable(new ArrayDataProvider([],{}));
      self.runsScoredMethodsDP = ko.observable(new ArrayDataProvider([],{}));

    /********************** logic to extract module params *************************/
      
      try{
        let mId = routerArgs.params.matchId;
        if(mId==0 || mId=="" || mId==null){
            CommonUtils.changeRoute(routerArgs, "dashboard", {});
        }
        else{
            self.currentMatchId(mId);
        }
      }
      catch(ex){ // any exceptions in query params in url will be caught here  
        //console.log("something wrong in try", ex)
      }
    /********************** functions *************************/

      self.onOpenMatchDetailsClick = function(){
        let mId = self.currentMatchId();
        var matchDetails = self.fetchMatchDetails(mId);
        var mt = matchDetails;
        self.currentMatchInfo(matchDetails);
        self.currentMatchName(mt.name);
        self.currentMatchDate(CommonUtils.formatDateForDisplay(mt.date));
        var pList = matchDetails.playing11List;
        ar1 = CommonUtils.formPlaying11Para(pList[0]);
        self.currPlaying111Para(ar1[1]);
        self.currTeam1(ar1[0]);
        ar2 = CommonUtils.formPlaying11Para(pList[1]);
        self.currPlaying112Para(ar2[1]);
        self.currTeam2(ar2[0]);
        matchTeams=[matchDetails.team1, matchDetails.team2];
       //fetch scorecard using self.currentMatchId:
        var scorecards = self.fetchMatchScorecards(mId);
        self.currInnings([]);
        if(scorecards[0].runs!=0 || scorecards[1].runs!=0){
          scorecards.forEach(inn => {
            inn.teamName
            battersCards = []
            inn.batterScoresList.forEach(br =>{ 
              bCard = {
                'batterId': br.batterId,
                'batterName':br.batterName, 
                //'battingPosition': br.battingPosition,
                'runs': br.runs,
                'balls': br.balls,
                'fours': br.fours,
                'sixes': br.sixes,
                'strikeRate': br.balls !== 0 ? parseFloat((Math.round((100*br.runs/br.balls)*100)/100).toFixed(2)) : 0,
                'outStatusString': CommonUtils.formulateOutStringForBatter(br.out,
                                                      br.wicketBowlerName,
                                                      br.wicketFielder1Name,
                                                      br.wicketFielder2Name,
                                                      br.wicketKind)
              }
              battersCards.push(bCard);
            });
            bowlerCards = []
            inn.bowlerScoresList.forEach(bw =>{ 
                bwCard = {
                  'bowlerId': bw.bowlerId,
                  'bowlerName':bw.bowlerName, 
                  'runs': bw.runs,
                  'wickets':bw.wickets,
                  'overs': (Math.floor(bw.balls/6))+((bw.balls%6)/10),
                  'balls': bw.balls,
                  'noballs': bw.noballs,
                  'wides':bw.wides,
                  'economy': bw.balls !== 0 ? parseFloat((Math.round((bw.runs/(bw.balls/6))*100)/100).toFixed(2)) : 0,
                }
                bowlerCards.push(bwCard);
            });
            innings = {
              "extras": inn.extras,
              "index": inn.index,
              "inningsId": inn.inningsId,
              "matchId": inn.matchId,
              "teamName": inn.teamName,
              "overs": inn.overs,
              "runs": inn.runs,
              "wickets": inn.wickets,
              "teamDisplayName":inn.teamDisplayName,
              "color":matchTeams.find(team => team.name === inn.teamName).primaryColour.toLowerCase(),
              "score":inn.runs+"-"+inn.wickets+"("+inn.overs+" Ov)",
              "battersDP": new ArrayDataProvider(battersCards, { keyAttributes: "batterId" }),
              "bowlersDP": new ArrayDataProvider(bowlerCards, { keyAttributes: "bowlerId" }),
            

            };
            self.currInnings.push(innings);
          });
        }
        self.matchDetailsDialogSelectedTab('visualize')
          
      }

      self.fetchMatchDetails = function(matchId){
        var match = null;
        var getMatchDetailsUrl = Constants.FLASK_SERVICES_CONTEXT_PATH + "matches/"+matchId;
        //console.log("fetching match details with URL: ", getMatchDetailsUrl);
        CommonUtils.ajaxCall('GET',getMatchDetailsUrl,true,"","json","",
          function(data){},    //success call back
          function(data){},    //failure call back
          //complete call back
          (xhr, res) => { 
            //console.log("inside complete callback of get match details",res);
            if (res.status == 200){
              var data = res.responseJSON.data;
              match=data;
            }
          }
        );
        return match;
      }

      self.fetchMatchScorecards = function(matchId){
        var scorecards = null;
        var getMatchScorecardsUrl = Constants.FLASK_SERVICES_CONTEXT_PATH + "scorecards/"+matchId;
        //console.log("fetching match Scorecards with URL: ", getMatchScorecardsUrl);
        CommonUtils.ajaxCall('GET',getMatchScorecardsUrl,true,"","json","",
          function(data){},          //success call back
          function(data){},           //failure call back
          //complete call back
          (xhr, res) => { 
            //console.log("inside complete callback of get match details",res);
            if (res.status == 200){
              //console.log("this is the res object: ",res)
              var data = res.responseJSON.data;
              scorecards=data;
            }
          }
        );
        return scorecards;
      }

      self.getColoursForDataTree = function(inn_index, player_index, bins){
        {
          const colorPalatteOptions = ["magma","inferno","plasma","viridis"];
          colorsPalette = ojpalette_1.getColorValuesFromPalette(colorPalatteOptions[inn_index],bins);
          c = ojpaletteutils_1.getColorValue(colorsPalette,((player_index)/bins));
          return c;
        };

      }

      self.fillVisualizationDataArrays = function(inningsIndex){
        //console.log("in fillVisualizationDataArrays for innings: ", inningsIndex)
        igs = self.currInnings()[inningsIndex-1];
        score = igs.runs+"-"+igs.wickets+"("+igs.overs+" Ov)"
        self.selectedInningsTitle("Innings "+inningsIndex+", "+igs.teamDisplayName+" : "+score);
        //BATTING runs scored
        bats = igs["battersDP"]["data"];
        //1. batScoreContribsData 
        batScoreContribsData = [];
        for (var k = 0; k < bats.length; k++) {
          //console.log("batter: ",k,": ",bats[k])
          if(bats[k]["runs"]>0){
            batScoreContribsData.push({
                "name": bats[k]["batterName"],
                "runs": bats[k]["runs"],
                "runsAndBalls":bats[k]["runs"]+"("+bats[k]["balls"]+")",
                "colour": self.getColoursForDataTree(inningsIndex,k,bats.length)
            });
          }
        }
        self.batScoreContribsDP(new ArrayDataProvider(batScoreContribsData,{keyAttributes:'name'}));
        
        //2. batting impact 
        //IMPACT_SCORE = BATTER_RUNS*((BATTER_RUNS/TOTAL_RUNS)/(BATTER_BALLS/TOTAL_BALLS))
        nodes=[]
        sum_scores=0;
        for (var k = 0; k < bats.length; k++) {
          if(bats[k]["runs"]>0 && igs["overs"]!=0 && igs["runs"]!=0){
            sc_ratio = bats[k]["runs"]/igs["runs"];
            balls_ratio = bats[k]["balls"]/(igs["overs"]*6);
            imp_sc = bats[k]["runs"] * (sc_ratio/balls_ratio);
            imp_sc = Math.round(imp_sc * 100) / 100;
            sum_scores=sum_scores+imp_sc
            nodes.push({
                "name": bats[k]["batterName"],
                "score": imp_sc,
                "runsAndBalls":bats[k]["runs"]+"("+bats[k]["balls"]+")",
                "colour": self.getColoursForDataTree(inningsIndex,k,bats.length)

            });
          }
        }
        batttersData = [{
          "name":"Batters",
          "score":sum_scores,
          "nodes":nodes,

        }];
        self.batImpactsDP(new ArrayTreeDataProvider(batttersData,{keyAttributes:'name',childrenAttribute: "nodes",}));

        //3. batScoreContribsData 
        runsScoredMethodsData = [];
        fours=0;
        sixes=0;
        runningBetween=0;
        for (var k = 0; k < bats.length; k++) {
          fours=fours+bats[k]["fours"]*4;
          sixes=sixes+bats[k]["sixes"]*6;
          runsWithBoundaries=(bats[k]["fours"]*4)+(bats[k]["sixes"]*6);
          runningBetween= runningBetween+(bats[k]["runs"]-runsWithBoundaries);
        }
        runsScoredMethodsData=[
          {
            "method": "Running between the wickets",
            "runs": runningBetween,
          },
          {
            "method": "Fours",
            "runs": fours,
          },
          {
            "method": "Sixes",
            "runs": sixes,
          },
          {
            "method": "Extras",
            "runs": igs["extras"],
          }
        ]
        self.runsScoredMethodsDP(new ArrayDataProvider(runsScoredMethodsData,{keyAttributes:'method'}));

        //4. Bowling - economies
        bowls = igs["bowlersDP"]["data"];
        bowlerEconomies = [];
        for (var k = 0; k < bowls.length; k++) {
          if(bowls[k]["balls"]>0){
            bowlerEconomies.push({
                "name": bowls[k]["bowlerName"],
                "economy": bowls[k]["economy"],
                "group":"Bowlers",
                "desc":bowls[k]["overs"]+"-0-"+bowls[k]["runs"]+"-"+bowls[k]["wickets"],
                "colour": self.getColoursForDataTree(inningsIndex,k,bowls.length)
            });
          }
        }
        self.bowlerEconomiesDP(new ArrayDataProvider(bowlerEconomies,{keyAttributes:'name'}));
        
      }

      self.matchDetailsDialogSelectedTab.subscribe(function(newValue) {
        //console.log(newValue,":    ",self.inningsSelectionOptions)
        if(newValue == 'visualize'){
          num_innings=self.currInnings().length
          innSelects = new Array(num_innings);
          for(var i=0; i<num_innings; i++){
            igs = self.currInnings()[i];
            // label: ("Innings "+ String(igs["index"])+" - "+igs.team.displayName)
            innSelects[i] = { id: ("innings"+String(i+1)), label: ("Innings "+ String(igs.index)+" - "+igs.teamDisplayName) }
          }
          self.inningsSelectionOptions = innSelects;
          self.selectedInnings("innings1");
        }  
      });

      self.selectedInnings.subscribe(function(newValue) {
        t = parseInt(newValue[newValue.length - 1]);
        self.fillVisualizationDataArrays(t);
          
      });


      self.goBackToMatchesPage = function(){
        CommonUtils.changeRoute(routerArgs, "matches", {});
      }

      //on initial load
      self.onOpenMatchDetailsClick();

    /*************************************************************************/
      this.disconnected = () => {
        // Implement if needed
        document.getElementById("appn-short-header").style.display = "none";
        document.getElementById("appn-header").style.display = "flex";
      };

      this.transitionCompleted = () => {
        // Implement if needed
        document.title = self.currentMatchName();
      };


    }
  
    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return MatchDetailsViewModel;
  }
);
