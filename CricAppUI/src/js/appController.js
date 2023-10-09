/**
 * @license
 * Copyright (c) 2014, 2023, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define(['knockout', 'ojs/ojcontext','utils/CommonUtils', 'utils/Constants',
        'ojs/ojmodule-element-utils', 'ojs/ojresponsiveutils', 
        'ojs/ojresponsiveknockoututils', 'ojs/ojcorerouter', 'ojs/ojmodulerouter-adapter', 
        'ojs/ojknockoutrouteradapter', 'ojs/ojurlparamadapter', 'ojs/ojarraydataprovider', 
        'ojs/ojknockouttemplateutils', 'ojs/ojmodule-element', 'ojs/ojknockout',
        'ojs/ojbutton'],
  function(ko, Context,CommonUtils, Constants,moduleUtils, ResponsiveUtils, ResponsiveKnockoutUtils, CoreRouter, 
           ModuleRouterAdapter, KnockoutRouterAdapter, UrlParamAdapter, ArrayDataProvider, 
           KnockoutTemplateUtils) {

     function ControllerViewModel() {
        var self = this;
        this.KnockoutTemplateUtils = KnockoutTemplateUtils;

        // Handle announcements sent when pages change, for Accessibility.
        this.manner = ko.observable('polite');
        this.message = ko.observable();

        announcementHandler = (event) => {
          this.message(event.detail.message);
          this.manner(event.detail.manner);
        };

      document.getElementById('globalBody').addEventListener('announce', announcementHandler, false);

      // Media queries for repsonsive layouts
      const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      let navData = [
        { path: '', redirect: 'home' },
        { path: 'home', detail: { label: 'Home' }  },
        { path: 'dashboard', detail: { label: 'Dashboard' } },
        { path: 'players', detail: { label: 'Players'} },
        { path: 'matches', detail: { label: 'Matches' } },
        { path: 'analyses', detail: { label: 'Analize' } }
      ];
      // Router setup
      let router = new CoreRouter(navData, {
        urlAdapter: new UrlParamAdapter()
      });
      router.sync();

      this.moduleAdapter = new ModuleRouterAdapter(router);

      this.selection = new KnockoutRouterAdapter(router);

      // Setup the navDataProvider with the routes, excluding the first redirected route.
      this.navDataProvider = new ArrayDataProvider(navData.slice(1), {keyAttributes: "path"});

      let navDataList = ['dashboard', 'players', 'matches',  'analyses'];
      let navData2 = [
        { path: 'dashboard', detail: { label: 'Home' , iconClass: 'oj-ux-ico-home' } },
        { path: 'players', detail: { label: 'Players', iconClass: 'oj-ux-ico-human-8' } },
        { path: 'matches', detail: { label: 'Matches', iconClass: 'oj-ux-ico-unmatched' } },
        { path: 'analyses', detail: { label: 'Analize', iconClass: 'oj-ux-ico-chart-bubble' } }
      ];
      self.navDataProvider2 = new ArrayDataProvider(navData2, {keyAttributes: "path"});
      self.selection2 = ko.observable("dashboard");

      router.beforeStateChange.subscribe(function (args) {
        var state = args.state;
        var accept = args.accept;
        var path = state.path;
        // If we don't want to leave, block navigation
        if(navDataList.includes(path)){
          //console.log("inside with path:-- ", path);
          self.selection2(path);
        }
      });


      this.goToDashboard = function(){
        let params = {
        }
        router.go(
          {
              path: "dashboard",
              params: params
          });

      }


      self.navOptionChanged = function(event){
        let v = event.detail.value;
        //console.log("selection changed..", v);
        let params = {
        }
        router.go(
          {
              path: v,
              params: params
          });
      }

      // Footer
      this.footerLinks = [
        { name: 'About', linkId: 'about', linkTarget:'http://www.oracle.com/us/corporate/index.html#menu-about', target:"_blank"},
        { name: "Feedback", linkId: "feedback", linkTarget: "mailto:rohithreddysanta@mail.com", target:"_blank"},
        { name: 'Data Source', linkId: 'dataSource', linkTarget:'https://cricsheet.org/', target:"_blank"},
      ];
     }

     // release the application bootstrap busy state
     Context.getPageContext().getBusyContext().applicationBootstrapComplete();

     return new ControllerViewModel();
  }
);
