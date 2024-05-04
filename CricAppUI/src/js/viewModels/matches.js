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
        '../utils/AusTourofIndia','ojs/ojarraydataprovider',"ojs/ojpagingdataproviderview",
        'oj-st-scroll-to-top/loader',
        'ojs/ojselectsingle', "ojs/ojtable",'ojs/ojdialog','ojs/ojcollapsible',"oj-c/button",
        'oj-c/list-view','ojs/ojlistview','oj-c/list-item-layout','ojs/ojlistitemlayout',
        "ojs/ojpagingcontrol"],
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

      self.selectedSeasonVal = ko.observable('2023');
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

      self.matchesTableTitle = ko.observable(" ");
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
          self.matchesTableTitle(" ");
        }
        else{
          self.selectedLeagueEventVal(v);
          self.getMatchesForLeagueEvent(le=v,pageNo=self.currentPage());
          self.matchesTableTitle("Indian Premier League"); //UPDATE DYNAMICALLY LATER 
          self.addPagingControl();
        }

      }

      self.currentPage = ko.observable(1);
      self.currentPageSize = Constants.MATCHES_TABLE_PAGESIZE;

      self.getMatchesForLeagueEvent = function(le,pageNo){
        var matches = []
        var getMatchesForLeagueEventUrl = Constants.SERVICES_CONTEXT_PATH + "matches?leagueEvent="+le+"&pageNo="+pageNo+"&pageSize="+self.currentPageSize;
        console.log("fetching all matches for League Event, ", getMatchesForLeagueEventUrl);
        CommonUtils.ajaxCall('GET',getMatchesForLeagueEventUrl,true,"","json","",
          //success call back
          function(data){
            //console.log("successful to get matches for League Event..");
          },
          //failure call back
          function(data){
            //console.log("failed to get matches for League Event");
          },
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
                            this.matchOutcome.winner.displayName + " " +  this.matchOutcome.outcome:
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
          },
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
          },
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

      self.addPagingControl = function(){
        document.getElementById('matches-table-paging-div').style.display = 'block';
        var totalPages = self.totalNoOfPagesMatchesTable();
        console.log("calling addPagingControl with total pages: ", totalPages);
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
          
            // Check if the clicked element is a page number link
            if (event.target.tagName === 'A'){

              if(event.target.textContent !== 'Previous' && event.target.textContent !== 'Next') {
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
                console.log('Clicked on:', event.target.textContent);
                if(event.target.textContent == 'Previous'){
                  curr = curr-1;
                }
                else if(event.target.textContent == 'Next'){
                  curr = curr+1;
                }
                pageLinks[curr].classList.add('active-page');
                self.currentPage(curr);
                self.getMatchesForLeagueEvent(le=self.selectedLeagueEventVal(),pageNo=curr);
              }
            }
        });
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
