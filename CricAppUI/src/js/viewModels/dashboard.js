define(['knockout', 'ojs/ojcontext','../accUtils','../utils/CommonUtils', '../utils/Constants',
        'ojs/ojarraydataprovider', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 
        'ojs/ojknockouttemplateutils','oj-st-scroll-to-top/loader','ojs/ojdialog',"ojs/ojnavigationlist",
        'oj-c/button'],
 function(ko, Context,accUtils,CommonUtils, Constants, ArrayDataProvider,  ResponsiveUtils, ResponsiveKnockoutUtils,
          KnockoutTemplateUtils) {
    function DashboardViewModel(routerArgs) {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.
      var self = this;
      this.connected = () => {
        accUtils.announce('Dashboard page loaded.');
        document.title = "Dashboard";
        // Implement further logic if needed
        document.getElementById("navigation-div").style.display = "block";
        document.getElementById("proceed-button-div").style.display = "none";
      };
      self.KnockoutTemplateUtils = KnockoutTemplateUtils;
      self.selection = ko.observable("");
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
        document.getElementById('global-loader-progresscircle').style.display = "none";
      };

      self.errorPageMsg = ko.observable();
      self.errorPageTitle = ko.observable();
      self.errorFlag = ko.observable();

      self.reloadPage = function () {
        window.location.reload();
      }



      // Media queries for repsonsive layouts
      const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      

    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return DashboardViewModel;
  }
);
