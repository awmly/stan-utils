/* ========================================================================
 * STAN Utils: Collapse
 * Author: Andrew Womersley
 * ======================================================================== */

 $(function(){

  'use strict';

	// Add click
	$('.sa-collapse .sa-click').click(function(){

    $(this).closest('.sa-collapse') .toggleClass('active')
                                    .find('.sa-content').first().collapse('toggle');

    if( $(this).parents('.sa-accordion').length ){

      $(this).closest('.sa-collapse').siblings('.sa-collapse.active').each(function(){

        $(this) .removeClass('active')
                .find('.sa-content').first().collapse('hide');

      });

    }

	});


	// Add BS collapse class
	$('.sa-collapse .sa-content').each(function(){

		$(this).addClass('collapse');

	});

  // Check for collapses starting open
  $('.sa-collapse.active .sa-content').each(function(){

    $(this).addClass('in');

  });

  // Device dependant logic
  $('body').on('active.sa.stan', function() {

      $('[data-collapse-devices]').each(function() {

          if ($(this).attr('data-collapse-devices').indexOf($STAN.device) >= 0) {

              $(this).removeClass('hide-click');

              if ($(this).attr('data-collapse-devices-open').indexOf($STAN.device) >= 0) {

                $(this).find('.sa-content').first().addClass('in').css('height','');

              }else{

                $(this).find('.sa-content').first().removeClass('in').addClass('collapse');

              }

          } else {

              $(this).addClass('hide-click');
              $(this).find('.sa-content').first().addClass('in').removeClass('collapse').css('height','');

          }

      });

  });

});
