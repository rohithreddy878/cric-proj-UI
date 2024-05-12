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
        'ojs/ojselectsingle', 'ojs/ojtable','oj-c/button','ojs/ojbutton'],
 function(ko, Context, accUtils,CommonUtils, Constants, DataUtils, AusTourofIndia,
          ArrayDataProvider) {
    function MatchesViewModel(routerArgs) {
     
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

      

      self.currMatch = ko.observable();
      self.currMatchName = ko.observable("");
      self.currMatchId = ko.observable("");

      //self.leagueEvents = ko.observableArray([]);
      self.leagueEventsListDP = ko.observable([]);//new ArrayDataProvider(self.leagueEvents(), { keyAttributes: "value" });

      self.matchesTableTitle = ko.observable(" ");
      self.matchesArray = []
      self.matchesListDP =  ko.observable(new ArrayDataProvider(self.matchesArray, { keyAttributes: "value" }));

      self.currentPage = ko.observable();
      self.currentPageSize = Constants.MATCHES_TABLE_PAGESIZE;


      self.getLeagueEventSeasons = function(){
        var seasons = []
        var getLeagueEventSeasonsUrl = Constants.FLASK_SERVICES_CONTEXT_PATH + "leagues/seasons";
        //console.log("fetching all League Event Seasons, ", getLeagueEventSeasonsUrl);
        CommonUtils.ajaxCall('GET',getLeagueEventSeasonsUrl,true,"","json","",
          function(data){},          //success call back
          function(data){},          //failure call back
          //complete call back
          (xhr, res) => { 
            //console.log("inside complete callback of get all League Event Seasons",res);
            if (res.status == 200){
              var data = res.responseJSON.data;
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
        var getLeagueEventsForSeasonUrl = Constants.FLASK_SERVICES_CONTEXT_PATH + "leagues/events/"+season;
        //console.log("fetching all League Events for a Season, ", getLeagueEventsForSeasonUrl);
        CommonUtils.ajaxCall('GET',getLeagueEventsForSeasonUrl,true,"","json","",
          function(data){}, //success call back
          function(data){},  //failure call back
          //complete call back
          (xhr, res) => { 
            //console.log("inside complete callback of get all League Events for Season",res);
            if (res.status == 200){
              var data = res.responseJSON.data;
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
                  date: CommonUtils.formatDateForDisplay(this.date),
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
              //console.log("tr: ",tr, "t: ",t);
              self.totalNoOfPagesMatchesTable(t);
            }
          }
        );
      }


      self.onOpenMatchDetailsClick = function(data, context){
        let mId = context.data;
        let params = {
          matchId: mId,
        }
        CommonUtils.changeRoute(routerArgs, "matchDetails", params);
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
                //console.log('Clicked on page number:', pageNumber);
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
