/* ========================================================================
* STAN Utils: Hide Till
* Author: Andrew Womersley
* ======================================================================== */

$(function() {

  'use strict';

  $('.hide-till-ready').removeClass('hide-till-ready');
  $('.none-till-ready').removeClass('none-till-ready');

  $('.hide-on-ready').remove();
  $('.none-on-ready').remove();

  $(window).load(function(){

    $('.hide-till-load').removeClass('hide-till-load');
    $('.none-till-load').removeClass('none-till-load');

    $('.hide-on-load').remove();
    $('.none-on-load').remove();

  });

  $($STAN.Tag).trigger('resize.sa.stan');

});
