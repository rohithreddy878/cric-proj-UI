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
        '../utils/AusTourofIndia','ojs/ojarraydataprovider','ojs/ojpagingdataproviderview',
        'oj-st-scroll-to-top/loader',
        'ojs/ojselectsingle', 'ojs/ojtable','ojs/ojdialog','ojs/ojcollapsible','oj-c/button',
        'oj-c/list-view','ojs/ojlistview','oj-c/list-item-layout','ojs/ojlistitemlayout','ojs/ojformlayout',
        'ojs/ojpagingcontrol','ojs/ojdefer','ojs/ojnavigationlist','ojs/ojchart','ojs/ojbutton',
        ],
 function(ko, Context, accUtils,CommonUtils, Constants, DataUtils, AusTourofIndia,
          ArrayDataProvider,PagingDataProviderView) {
    function MatchesViewModel() {
     
      var self = this;

      this.connected = () => {
        accUtils.announce('Matches page loaded.');
        document.title = "Matches";
        // Implement further logic if needed
      };

      self.totalNoOfPagesMatchesTable = ko.observable(0);

      self.selectedSeasonVal = ko.observable('2023');//defaulting to 2023 on first load
      self.selectedLeagueEventVal = ko.observable();  //defaulting to IPL-2023 on first load

      self.seasonListDP = ko.observable(new ArrayDataProvider([], { }));


      self.matchesTableColumns = [
        {
          id:"stageColumn",
          headerText: "Stage", 
          field: "stage",
          headerClassName: "oj-sm-only-hide",
          className: "oj-sm-only-hide",
          resizable: "disabled",
          sortable:"disabled"
        },
          {
            id:"datesColumn",
            headerText: "Date(s)", 
            field: "date",
            headerClassName: "oj-sm-only-hide",
            className: "oj-sm-only-hide",
            resizable: "disabled",
          },
          {
            id:"nameColumn",
            headerText: "Match", 
            field: "name",
            headerClassName: "oj-sm-only-hide",
            className: "oj-sm-only-hide",
            resizable: "disabled",
            sortable:"disabled"
          }, /**
          {
            id:"venueColumn",
            headerText: "Venue", 
            field: "venue",
            headerClassName: "oj-sm-only-hide",
            className: "oj-sm-only-hide",
            resizable: "enabled",
            sortable:"disabled"
          },
          {
            id:"format",
            headerText: "Format", 
            field: "format",
            headerClassName: "oj-sm-only-hide",
            className: "oj-sm-only-hide",
            resizable: "disabled",
            sortable:"disabled"
          }, */
          {
            id:"resultColumn",
            headerText: "Result", 
            field: "result",
            headerClassName: "oj-sm-only-hide",
            className: "oj-sm-only-hide",
            resizable: "enabled",
            sortable:"disabled"
          },
          {
            id:"momColumn",
            headerText: "Man of the Match", 
            field: "mom",
            headerClassName: "oj-sm-only-hide",
            className: "oj-sm-only-hide",
            resizable: "enabled",
            sortable:"disabled"
          },
          {
            id:"actionsColumn",
            headerText:"Actions",
            field:"value",
            template:"actionsTemplate",
            sortable:"disabled"
          }
      ];

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
      

      self.currMatch = ko.observable();
      self.currMatchName = ko.observable("");
      self.currMatchId = ko.observable("");
      self.currTeam1 = ko.observable("");
      self.currTeam2 = ko.observable("");
      self.currPlaying111Para = ko.observable("");
      self.currPlaying112Para = ko.observable("");

      self.currInnings = ko.observableArray(new Array());
      self.currInningsDP = new ArrayDataProvider(self.currInnings, {keyAttributes: 'inningsId'});

      //self.leagueEvents = ko.observableArray([]);
      self.leagueEventsListDP = ko.observable([]);//new ArrayDataProvider(self.leagueEvents(), { keyAttributes: "value" });

      self.matchesTableTitle = ko.observable(" ");
      self.matchesArray = []
      self.matchesListDP =  ko.observable(new ArrayDataProvider(self.matchesArray, { keyAttributes: "value" }));

      self.currentPage = ko.observable();
      self.currentPageSize = Constants.MATCHES_TABLE_PAGESIZE;

      self.matchDetailsDialogTabsData = [
        { name: 'Scorecard', id: 'scorecard', icons: 'oj-ux-ico-artifact-audit-file' },
        { name: 'Visualize', id: 'visualize', icons: 'oj-ux-ico-chart-bar-stacked-vertical' },
      ];
      self.matchDetailsDialogTabsDP = new ArrayDataProvider(self.matchDetailsDialogTabsData, { keyAttributes: 'id' });
      self.matchDetailsDialogSelectedTab = ko.observable('scorecard');


      self.fetchMatchDetails = function(matchId){
        var match = null;
        var getMatchDetailsUrl = Constants.SERVICES_CONTEXT_PATH + "matches/matchDetails?matchId="+matchId;
        //console.log("fetching match details with URL: ", getMatchDetailsUrl);
        CommonUtils.ajaxCall('GET',getMatchDetailsUrl,true,"","json","",
          function(data){},    //success call back
          function(data){},    //failure call back
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

      self.getLeagueEventSeasons = function(){
        var seasons = []
        var getLeagueEventSeasonsUrl = Constants.SERVICES_CONTEXT_PATH + "leagues/seasons";
        //console.log("fetching all League Event Seasons, ", getLeagueEventSeasonsUrl);
        CommonUtils.ajaxCall('GET',getLeagueEventSeasonsUrl,true,"","json","",
          function(data){},          //success call back
          function(data){},          //failure call back
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
        //console.log("fetching all League Events for a Season, ", getLeagueEventsForSeasonUrl);
        CommonUtils.ajaxCall('GET',getLeagueEventsForSeasonUrl,true,"","json","",
          function(data){}, //success call back
          function(data){},  //failure call back
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

      self.onLeagueEventSelectionChange = function(event){
        let pv = event.detail.previousValue;
        let v = event.detail.value;
        if(v==pv){
          //do nothing
        }
        else if(v ==null || v==""){
          self.matchesArray = [];
          self.matchesTableTitle(" ");
        }
        else{
          self.selectedLeagueEventVal(v);
          self.getMatchesForLeagueEvent(le=v,pageNo=self.currentPage());
          self.matchesTableTitle("Indian Premier League"); //UPDATE DYNAMICALLY LATER 
          self.addPagingControl();
        }

      }

      self.getMatchesForLeagueEvent = function(le,pageNo){
        var matches = []
        var getMatchesForLeagueEventUrl = Constants.SERVICES_CONTEXT_PATH + "matches?leagueEvent="+le+"&pageNo="+pageNo+"&pageSize="+self.currentPageSize;
        //console.log("fetching all matches for League Event, ", getMatchesForLeagueEventUrl);
        CommonUtils.ajaxCall('GET',getMatchesForLeagueEventUrl,true,"","json","",
          function(data){},   //success call back
          function(data){},  //failure call back
          //complete call back
          (xhr, res) => { 
            //console.log(res.status);
            if (res.status == 200){
              var data = res.responseJSON.matchesList;
              $.each(data, function () {
                matches.push({
                  stage: CommonUtils.getEventStageDisplay(this.eventStage),
                  value: this.matchId,
                  date: this.date,
                  enddate: this.enddate,
                  format: this.matchType,
                  name: CommonUtils.shortenMatchName(this.name,this.team1,this.team2),
                  venue: this.venue,
                  tosswinner: this.tossWonTeam.name,
                  tosschoice: this.tossWonTeam.tossWinnerChoice,
                  result: this.matchOutcome.winner!=null?
                            this.matchOutcome.winner.displayName + " " +  this.matchOutcome.outcome.replace('Win', 'won'):
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
              //self.matchesListDP(new PagingDataProviderView(new ArrayDataProvider(matches, { keyAttributes: "value" })));
              self.matchesListDP(new ArrayDataProvider(matches, { keyAttributes: "value" }));
              var tr = res.responseJSON.totalResults;
              var t = Math.ceil(tr / Constants.MATCHES_TABLE_PAGESIZE);
              console.log("tr: ",tr, "t: ",t);
              self.totalNoOfPagesMatchesTable(t);
            }
          }
        );
      }


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
        //console.log(self.currMatch());
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
        self.currInnings([]);
        if(scorecards[0].runs!=0 || scorecards[1].runs!=0){
          scorecards.forEach(inn => {
            battersCards = []
            inn.batterScoresList.forEach(br =>{ 
              bCard = {
                'batterId': br.batterId,
                'batterName':br.batterName, 
                'battingPosition': br.battingPosition,
                'runs': br.runs,
                'balls': br.balls,
                'fours': br.fours,
                'sixes': br.sixes,
                'strikeRate': br.strikeRate,
                'outStatusString': CommonUtils.formulateOutStringForBatter(br.out,
                                                      br.wicketBowlerName,
                                                      br.wicketFielder1Name,
                                                      br.wicketFielder2Name,
                                                      br.wicketKind)
              }
              battersCards.push(bCard);
            });
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
              "battersDP": new ArrayDataProvider(battersCards, { keyAttributes: "batterId" }),
              "bowlersDP": new ArrayDataProvider(inn.bowlerScoresList, { keyAttributes: "bowlerId" }),

            };
            self.currInnings.push(innings);
          });
        }
        document.querySelector("#details-dialog").open();
        self.matchDetailsDialogSelectedTab('scorecard')
      }

      self.addPagingControl = function(){
        document.getElementById('matches-table-paging-div').style.display = 'block';
        var totalPages = self.totalNoOfPagesMatchesTable();
        var pagination = document.getElementById('matches-pagination');
        // Generate page number links dynamically
        for (var i = 1; i <= totalPages; i++) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#matches-table-div';
            a.textContent = i;
            li.appendChild(a);
            pagination.insertBefore(li, pagination.lastElementChild);
        }
        var pageLinks = pagination.getElementsByTagName('a');
        pageLinks[1].classList.add('active-page');

        // Add click event listener to the pagination element
        pagination.addEventListener('click', function(event) {
          console.log("event: ",event);
            // Check if the clicked element is a page number link
            if (event.target.tagName === 'A'){

              if(event.target.id !== 'matches-tables-prev-button' && event.target.id !== 'matches-tables-next-button') {
                var pageLinks = pagination.getElementsByTagName('a');
                for (var i = 0; i < pageLinks.length; i++) {
                    pageLinks[i].classList.remove('active-page');
                }
                event.target.classList.add('active-page'); 

                // Prevent default behavior of anchor tags
                event.preventDefault();
                var pageNumber = event.target.textContent;
                console.log('Clicked on page number:', pageNumber);
                self.getMatchesForLeagueEvent(le=self.selectedLeagueEventVal(),pageNo=pageNumber);
                self.currentPage(pageNumber);
              }
              else{
                var curr = Number(self.currentPage());
                var pageLinks = pagination.getElementsByTagName('a');
                pageLinks[curr].classList.remove('active-page');
                if(event.target.id == 'matches-tables-prev-button'){
                  curr = curr-1;
                }
                else if(event.target.id == 'matches-tables-next-button'){
                  curr = curr+1;
                }
                pageLinks[curr].classList.add('active-page');
                self.currentPage(curr);
                self.getMatchesForLeagueEvent(le=self.selectedLeagueEventVal(),pageNo=curr);
              }
            }
        });
      }

      self.currentPage.subscribe(function(newValue) {
        //console.log('Current page changed to:', newValue);
        previousAnchorTag = document.getElementById('matches-tables-prev-li');
        if(newValue==1){
          //previousAnchorTag.classList.add('disabled-paging-button');
          previousAnchorTag.style.display='None';
        }
        else{
          //previousAnchorTag.classList.remove('disabled-paging-button');
          previousAnchorTag.style.display='block';
        }
        nextAnchorTag = document.getElementById('matches-tables-next-li');
        if(newValue==self.totalNoOfPagesMatchesTable()){
          nextAnchorTag.style.display='None';
        }
        else{
          nextAnchorTag.style.display='block';
        }
        
      });

      self.inningsSelectionOptions = [];
      self.selectedInnings = ko.observable("");
      self.selectedInningsTeamName = ko.observable("");

      //self.batScoreContribsData = [];
      self.batScoreContribsDP = ko.observable(new ArrayDataProvider([],{keyAttributes:'id'}));
      self.batImpactsDP = ko.observable(new ArrayDataProvider([],{keyAttributes:'id'}));

      self.fillVisualizationDataArrays = function(inningsIndex){
        //console.log("in fillVisualizationDataArrays for innings: ", inningsIndex)
        igs = self.currInnings()[inningsIndex-1];
        self.selectedInningsTeamName(igs["name"]);
        //BATTING 
        bats = igs["battersDP"]["data"];
        //1. batScoreContribsData 
        batScoreContribsData = [];
        for (var k = 0; k < bats.length; k++) {
          //console.log("batter: ",k,": ",bats[k])
          if(bats[k]["runs"]>0){
            batScoreContribsData.push({
                "id": k,
                "name": bats[k]["batterName"],
                "runs": bats[k]["runs"],
                "balls":bats[k]["balls"]
            });
          }
        }
        self.batScoreContribsDP(new ArrayDataProvider(batScoreContribsData,{keyAttributes:'id'}));
        
        //2. batting impact 
        //IMPACT_SCORE = BATTER_RUNS*((BATTER_RUNS/TOTAL_RUNS)/(BATTER_BALLS/TOTAL_BALLS))
        batImpactsData = [];
        for (var k = 0; k < bats.length; k++) {
          if(bats[k]["runs"]>0 && igs["overs"]!=0 && igs["runs"]!=0){
            sc_ratio = bats[k]["runs"]/igs["runs"];
            balls_ratio = bats[k]["balls"]/(igs["overs"]*6);
            imp_sc = bats[k]["runs"] * (sc_ratio/balls_ratio);
            imp_sc = Math.round(imp_sc * 100) / 100;
            batImpactsData.push({
                "id": k,
                "name": bats[k]["batterName"],
                "score": imp_sc,
            });
          }
        }
        self.batImpactsDP(new ArrayDataProvider(batImpactsData,{keyAttributes:'id'}));
        
      }

      self.matchDetailsDialogSelectedTab.subscribe(function(newValue) {
        //console.log(newValue,":    ",self.inningsSelectionOptions)
        if(newValue == 'visualize'){
          num_innings=self.currInnings().length
          innSelects = new Array(num_innings);
          for(var i=0; i<num_innings; i++){
            igs = self.currInnings()[i];
            // label: ("Innings "+ String(igs["index"])+" - "+igs["name"])
            innSelects[i] = { id: ("innings"+String(i+1)), label: ("Innings "+ String(igs["index"])) }
          }
          self.inningsSelectionOptions = innSelects;
          self.selectedInnings("innings1");
        }   
      });
      self.selectedInnings.subscribe(function(newValue) {
        t = parseInt(newValue[newValue.length - 1]);
        self.fillVisualizationDataArrays(t);
          
      });

      //on start
      self.getLeagueEventSeasons();
      self.leagueEvents = self.getLeagueEventsForSeason(self.selectedSeasonVal());

      this.disconnected = () => {
        // Implement if needed
      };

      this.transitionCompleted = () => {
        // Initial variable allocations
        self.selectedLeagueEventVal(14);
        self.currentPage(1);
      };
    }

    return MatchesViewModel;
  }
);
