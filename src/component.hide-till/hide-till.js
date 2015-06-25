/* ========================================================================
 * STAN Utils: Hide Till
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

  'use strict';

  $('body').addClass('stan-ready');

  $('.hide-on-ready').remove();
  $('.none-on-ready').remove();

  $(window).load(function() {

    $('body').addClass('stan-loaded');

    $('.hide-on-load').remove();
    $('.none-on-load').remove();

  });

});
