/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
'use strict';
define(['knockout','jquery','./Constants' ,'ojL10n!./resources/nls/oj-player-card-strings', 'ojs/ojcontext',
        'ojs/ojarraydataprovider',
        'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojactioncard','ojs/ojtoolbar','ojs/ojchart',
        'ojs/ojselectsingle',"oj-c/list-item-layout", "ojs/ojlistview"], 
  function (ko,$, Constants,componentStrings, Context, ArrayDataProvider) {

    function PlayerCardComponentModel(context) {
        var self = this;
        var element = context.element;

        self.uniqueId = context.uniqueId;

        //At the start of your viewModel constructor
        var busyContext = Context.getContext(context.element).getBusyContext();
        var options = { "description": "Web Component Startup - Waiting for data" };
        self.busyResolve = busyContext.addBusyState(options);

        self.contextCellId = ko.observable('context-cell' + self.uniqueId);
        self.contextCardId = ko.observable('context-card' + self.uniqueId);

        // Component properties
        self.properties = context.properties;
        var tileContainer;

        self.isNotAdmin = ko.observable(true);
        var props = [
          { "key":  "Name",
            "value": self.properties.playerFullName },
          { "key":  "Role",
            "value": self.properties.playerRole },
          { "key":  "Country",
            "value": self.properties.country },
          { "key":  "Batting",
            "value": self.properties.battingStyle },
          { "key":  "Bowling",
            "value": self.properties.bowlingStyle },

        ];
        self.playerProperties = new ArrayDataProvider(props,{});
        
        self.cardClick = function (event) {
          if (event.type === 'click' || (event.type === 'keypress' && event.keyCode === 13)) {
            var params = {
              'bubbles': true,
              'detail': { 'value': context.properties.playerName }
            };
            element.dispatchEvent(new CustomEvent('cardClick', params));
          }
        };
        
        function addListener() {
          //tileContainer.addEventListener('click', self.clickTile);
        };

        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();

        self.connected = function(){
          //tileContainer = element.querySelector('.player-card-app-name-div');
          addListener();
        }

        $(document).ready(function(){
        });

    };


    return PlayerCardComponentModel;
});
