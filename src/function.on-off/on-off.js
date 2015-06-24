/* ========================================================================
 * STAN Utils: On / Off
 * Author: Andrew Womersley
 * ========================================================================*/

(function($, $STAN) {

  'use strict';

  var events = [];

  // Shortcut events
  $STAN.on = function(_event, _callback) {

    if (!events[_event]) {
      events[_event] = [];
    }

    events[_event].push(_callback);

  };

  $STAN.trigger = function(_event) {

    if (events[_event]) {

      var args = Array.prototype.slice.call(arguments, 1);

      for (var x in events[_event]) {
        events[_event][x].apply(null, args);
      }

    }

  };

}(jQuery, $STAN));
