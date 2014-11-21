/* ========================================================================
 * STAN Utils: Helpers
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

    'use strict';

    // Stop parent scroll
    $('.stop-parent-scroll').on('mousewheel touchend', function(event) {

      var dir = event.originalEvent.wheelDelta;
      var $t = $(this);

      if (dir > 0 && $t.scrollTop() === 0) {
        event.preventDefault();
      }

      if (dir < 0 && ($t.scrollTop() == $t.get(0).scrollHeight - $t.innerHeight())) {
        event.preventDefault();
      }

      event.stopPropagation();

    });

    $('.stop-parent-scroll').on('touchstart', function(event) {

      var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

      $(this).data('pageY',touch.pageY);

    });

    $('.stop-parent-scroll').on('touchmove', function(event) {

      event.preventDefault();

      event.stopPropagation();

      var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

      var move=($(this).data('pageY')-touch.pageY)/5;

      $(this).scrollTop( $(this).scrollTop()+move );

    });


    // Set pixel ratio
    var pxRatio = !! window.devicePixelRatio ? window.devicePixelRatio : 1;

    if (pxRatio > 1) $('body').addClass('x2');

});
