define(['../accUtils','../utils/CommonUtils', '../utils/Constants',
          'oj-st-scroll-to-top/loader'
       ],
 function(accUtils,CommonUtils, Constants) {
    function MeViewModel() {
      this.connected = () => {
        accUtils.announce('me page loaded.');
        document.title = "Rohith Reddy Santa";
        // Implement further logic if needed
      };

      


      this.disconnected = () => {
        // Implement if needed
      };

      this.transitionCompleted = () => {
        // Implement if needed
        document.getElementById('global-loader-progresscircle').style.display = "none";
      };
    }
    return MeViewModel;
  }
);
