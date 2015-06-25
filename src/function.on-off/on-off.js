/* ========================================================================
 * STAN Utils: On / Off
 * Author: Andrew Womersley
 * ========================================================================*/

(function($, $STAN) {

  'use strict';

  var events = [];

  // Shortcut events
  $STAN.on = function(_events, _callback) {

    var _event = _events.split(" ");

    for (var x in _event) {

      if (!events[_event[x]]) {
        events[_event[x]] = [];
      }

      events[_event[x]].push(_callback);

    }

    return $STAN;

  };

  $STAN.trigger = function(_event) {

    if (events[_event]) {

      var args = Array.prototype.slice.call(arguments, 1);

      for (var x in events[_event]) {
        events[_event][x].apply(null, args);
      }

    }

    return $STAN;

  };

}(jQuery, $STAN));
