/* ========================================================================
 * STAN Utils: XSCollapse
 * Author: Andrew Womersley
 * ========================================================================

$(function() {

    'use strict';

    $('body').on('active.sa.stan', function() {

        $('[data-collapse-devices]').each(function() {

            if ($(this).attr('data-collapse-devices').indexOf($STAN.device) >= 0) {

                $(this).addClass('active');

                if ($(this).attr('data-collapse-devices-open').indexOf($STAN.device) >= 0) {

                  $( $(this).attr('data-target') ).addClass('in').css('height','');

                }else{

                  $( $(this).attr('data-target') ).removeClass('in').addClass('collapse');

                }

            } else {

                $(this).removeClass('active');
                $( $(this).attr('data-target') ).addClass('in').css('height','');

            }

        });

    });

}); */
