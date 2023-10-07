/**
 * @license
 * Copyright (c) 2014, 2023, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['knockout', 'ojs/ojcontext','../accUtils','../utils/CommonUtils', '../utils/Constants',
        'ojs/ojarraydataprovider', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 
        'ojs/ojknockouttemplateutils'],
 function(ko, Context,accUtils,CommonUtils, Constants, ArrayDataProvider,  ResponsiveUtils, ResponsiveKnockoutUtils,
          KnockoutTemplateUtils) {
    function DashboardViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.
      var self = this;
      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      this.connected = () => {
        accUtils.announce('Dashboard page loaded.');
        document.title = "Dashboard";
        // Implement further logic if needed
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
      };

      let navData2 = [
        { path: 'players', detail: { label: 'Players', iconClass: 'oj-ux-ico-human-8' } },
        { path: 'matches', detail: { label: 'Matches', iconClass: 'oj-ux-ico-unmatched' } },
        { path: 'anlayses', detail: { label: 'Analize', iconClass: 'oj-ux-ico-chart-bubble' } }
      ];
      self.navDataProvider2 = new ArrayDataProvider(navData2, {keyAttributes: "path"});

      // Media queries for repsonsive layouts
      const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      self.navOptionChanged = function(event){
        console.log("selection changed..");
        console.log(event.detail.value);
      }

    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return DashboardViewModel;
  }
);
