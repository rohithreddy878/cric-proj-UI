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
define(['../accUtils','../utils/CommonUtils', '../utils/Constants','ojs/ojbutton'],
 function(accUtils,CommonUtils, Constants) {
    function HomeViewModel(routerArgs) {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
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
      };


      self.goToDashboard = function(){
        let params = {
        }
        CommonUtils.changeRoute(routerArgs,"dashboard", params);

      }

    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return HomeViewModel;
  }
);