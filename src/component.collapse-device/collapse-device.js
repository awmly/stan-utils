/* ========================================================================
 * STAN Utils: XSCollapse
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

	'use strict';

  $('body').on('active.sa.stan', function() {

    $('[data-collapse-devices]').each(function() {

      if( $(this).attr('data-collapse-devices').indexOf($STAN.device)>=0 ){

        $(this).addClass('active');
        $( $(this).attr('data-target') ).removeClass('in').addClass('collapse');

      }else{

        $(this).removeClass('active');
        $( $(this).attr('data-target') ).addClass('in');

      }

    });

  });

});
