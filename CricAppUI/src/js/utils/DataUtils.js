define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout'], function (oj, ko, $) {

    function DataUtils() {
        var self = this;

        self.favouritePlayersList = ko.observableArray([]);

    }
    return new DataUtils();
});