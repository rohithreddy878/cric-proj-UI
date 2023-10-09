/**
  Copyright (c) 2015, 2021, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
'use strict';
define(
    ['knockout', 'ojL10n!./resources/nls/oj-st-scroll-to-top-strings', 'ojs/ojcontext', 'ojs/ojknockout'], function (ko, componentStrings, Context) {
    
    function ScrollToTopViewModel(context) {
        var self = this;
        self.scrollToTopDivId = ko.observable('scroll-to-top-div' + context.uniqueId);
        
        //At the start of your viewModel constructor
        var busyContext = Context.getContext(context.element).getBusyContext();
        var options = {"description": "Web Component Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.messageText = ko.observable('Hello from oj-st-scroll-to-top');
        self.properties = context.properties;
        self.res = componentStrings['oj-st-scroll-to-top'];
        // Example for parsing context properties
        // if (context.properties.name) {
        //     parse the context properties here
        // }

        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();

      // display scroll to top only when page scroll is more than page
      window.onscroll = function () {
        var scrollTop = document.getElementById(self.scrollToTopDivId());
        if (document.documentElement.scrollTop > 20)
          scrollTop.style.display = 'block';
        else
          scrollTop.style.display = 'none';
      }

      // scroll to top utility
      self.scrollToTop = function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }

    };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.connected = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.disconnected = function(context){
    //};

    //ExampleComponentModel.prototype.propertyChanged = function(context){
    //};

    return ScrollToTopViewModel;
});
