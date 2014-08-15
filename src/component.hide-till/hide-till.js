/* ========================================================================
 * STAN Utils: Hide Till
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

    'use strict';

    $('.hide-till-ready').removeClass('hide-till-ready');

    $('.hide-on-ready').remove();

    $(window).load(function(){

        $('.hide-till-load').removeClass('hide-till-load');

        $('.hide-on-load').remove();

    });

});
