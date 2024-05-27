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
