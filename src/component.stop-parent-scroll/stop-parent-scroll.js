/* ========================================================================
* STAN Utils: Stop Parent Scroll
* Author: Andrew Womersley
* ======================================================================== */

$(function() {

  'use strict';
  
  $('body').on('mousewheel touchend','.stop-parent-scroll',function(event){

    var dir = event.originalEvent.wheelDelta;
    var $t = $(this);

    if (dir > 0 && $t.scrollTop() === 0) {
      event.preventDefault();
    }

    if (dir < 0 && ($t.scrollTop() >= $t.get(0).scrollHeight - $t.innerHeight())) {
      event.preventDefault();
    }

    event.stopPropagation();

  });

  $('body').on('touchstart','.stop-parent-scroll',function(event){

    var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

    $(this).data('pageY',touch.pageY);

  });

  $('body').on('touchmove','.stop-parent-scroll',function(event){

    event.preventDefault();

    event.stopPropagation();

    var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

    var move=($(this).data('pageY')-touch.pageY)/5;

    $(this).scrollTop( $(this).scrollTop()+move );

  });

});
