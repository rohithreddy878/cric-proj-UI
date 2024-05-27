define(['../accUtils','../utils/CommonUtils', '../utils/Constants','ojs/ojbutton'],
 function(accUtils,CommonUtils, Constants) {
    function HomeViewModel(routerArgs) {

      var self = this;

      this.connected = () => {
        accUtils.announce('home page loaded.');
        document.title = "Home";
        document.getElementById("footer-element").style.display = "none";
        document.getElementById("navigation-div").style.display = "none";
        document.getElementById("proceed-button-div").style.display = "block";

      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
        document.getElementById("footer-element").style.display = "Block";
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
        document.getElementById('global-loader-progresscircle').style.display = "none";
      };
      $(document).ready(function() {
        document.getElementById('global-loader-progresscircle').style.display = "none";
      });


    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return HomeViewModel;
  }
);