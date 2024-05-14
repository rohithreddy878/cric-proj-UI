/**
 * @license
 * Copyright (c) 2014, 2023, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your about ViewModel code goes here
 */
define(['../accUtils','../utils/CommonUtils', '../utils/Constants',
          'oj-st-scroll-to-top/loader'
       ],
 function(accUtils,CommonUtils, Constants) {
    function AnalysesViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.
      this.connected = () => {
        accUtils.announce('Analyses page loaded.');
        document.title = "Analyze";
        // Implement further logic if needed
      };

      


      this.disconnected = () => {
        // Implement if needed
      };

      this.transitionCompleted = () => {
        // Implement if needed
      };
    }
    return AnalysesViewModel;
  }
);
