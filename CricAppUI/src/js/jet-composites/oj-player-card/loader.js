/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
define(['ojs/ojcomposite', 'text!./oj-player-card-view.html', './oj-player-card-viewModel', 'text!./component.json', 'css!./oj-player-card-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('oj-player-card', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);
