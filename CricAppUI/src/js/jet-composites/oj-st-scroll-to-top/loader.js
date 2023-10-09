/**
  Copyright (c) 2015, 2021, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
define(['ojs/ojcomposite', 'text!./oj-st-scroll-to-top-view.html', './oj-st-scroll-to-top-viewModel', 'text!./component.json', 'css!./oj-st-scroll-to-top-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('oj-st-scroll-to-top', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);