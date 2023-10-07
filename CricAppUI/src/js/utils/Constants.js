define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout'], function (oj, ko, $) {

    function Constants() {
        var self = this;
        
        self.APPLICATION_NAME = "The Cover Drive Zone";

        //self.SERVICES_CONTEXT_PATH = "/cric/services/";
        self.SERVICES_CONTEXT_PATH = "http://localhost:9000/cric/services/";
        self.UI_CONTEXT_PATH = "/cric/web/thecoverdrivezone/";


        self.TIMEZONE_MEANING = ' UTC';


        // UI error flag
        self.CRICUI0001 = 'CRICUI0001'; // when all the ajax calls fail
        self.CRICUI0001_ERR_TITLE = 'Page Not Available';
        self.CRICUI0001_ERR_MSG = 'Observed an issue while fetching data, please refresh the page again and contact admin if issue persists.';
        self.CRICUI0002 = 'CRICUI0002'; // when user hits wrong uri
        self.CRICUI0002_ERR_TITLE = 'Page Not Available';
        self.CRICUI0002_ERR_MSG = 'Observed an issue while fetching data, requested uri does not exist, please try again with a valid uri.';




    }
    return new Constants();
});
