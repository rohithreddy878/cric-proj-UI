define(['knockout', 'ojs/ojcontext','../accUtils','../utils/CommonUtils', '../utils/Constants',
        '../utils/DataUtils','ojs/ojarraydataprovider',
        'oj-st-scroll-to-top/loader','oj-player-card/loader','ojs/ojinputtext',
        'ojs/ojlistview','ojs/ojinputsearch'],
 function(ko, Context,accUtils,CommonUtils, Constants, DataUtils, ArrayDataProvider) {
    function PlayersViewModel(routerArgs) {

      var self = this;
      this.connected = () => {
        accUtils.announce('Players page loaded.');
        document.title = "Players";
        // Implement further logic if needed
      };

      self.favPlayers = ko.observable();
      self.playersToDisplay = ko.observable(new ArrayDataProvider([], {keyAttributes: "playerId"}));
      self.showResults = ko.observable(false);
      self.playerSearchVal = ko.observable("");

      self.fetchFavouritePlayers = function(){
        var getFavouritePlayersUrl = Constants.FLASK_SERVICES_CONTEXT_PATH + "favourites/players";
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

      self.searchAndDisplayPlayers = function(){
        searchString = self.playerSearchVal();
        var getsearchPlayersForDisplayUrl = Constants.FLASK_SERVICES_CONTEXT_PATH + "search/players/"+searchString;
        var players = [];
        CommonUtils.ajaxCall('GET',getsearchPlayersForDisplayUrl,true,"","json","",
          function(data){},    //success call back
          function(data){},    //failure call back
          //complete call back
          (xhr, res) => { 
            if (res.status == 200){
              var data = res.responseJSON.data;
              $.each(data, function () {
                players.push({
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
            self.playersToDisplay(new ArrayDataProvider(players, {keyAttributes: "playerId",}));
          }
        );
      }

      self.playerSearchVal.subscribe(function(newValue) {
        //console.log(newValue,":    ",self.inningsSelectionOptions)
        if(newValue != "" && newValue != null){
          self.showResults(true);
        }   
        else if(newValue == "" || newValue == null){
          self.showResults(false);
        }
      });


      self.viewPlayerClick = function(event){
        let params = {
          playerName: event.detail.name,
          playerId: event.detail.value,
        }
        document.getElementById('global-loader-progresscircle').style.display = "block";
        CommonUtils.changeRoute(routerArgs, "playerDetails", params);
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
        self.fetchFavouritePlayers();
        document.getElementById('global-loader-progresscircle').style.display = "none";
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
