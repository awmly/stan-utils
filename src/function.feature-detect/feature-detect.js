/* ========================================================================
 * STAN Utils: Feature Detect (has)
 * Author: Andrew Womersley
 * ========================================================================*/

(function($, $STAN) {

  'use strict';

  $STAN.has = function(feature) {

    return $STAN.feature[feature];

  };

  $STAN.feature = [];

  // Placeholder
  $STAN.feature.placeholder = ('placeholder' in document.createElement('input') && 'placeholder' in document.createElement('textarea'));

  // Add event listener
  $STAN.feature.eventlistener = 'addEventListener' in window;

  // History
  $STAN.feature.history = !!(window.history && history.pushState);

  // XHR2
  $STAN.feature.xhr2 = ('XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest());

  // Canvas
  $STAN.feature.canvas = (function() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  })();

}(jQuery, $STAN));
