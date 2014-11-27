/* ========================================================================
 * STAN Utils: Collapse
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

    'use strict';

    // Add click
    $('.sa-collapse .sa-click').click(function() {

        if (!$(this).closest('.sa-collapse').hasClass('inactive')) {

            if( $(this).closest('.sa-collapse').hasClass('active') ){

                $(this).closest('.sa-collapse').removeClass('active')
                    .find('.collapse-content').first().collapse('hide');
            }else{

              $(this).closest('.sa-collapse').addClass('active')
                  .find('.collapse-content').first().collapse('show');

            }

            if ($(this).parents('.sa-accordion').length) {

                $(this).closest('.sa-collapse').siblings('.sa-collapse.active').each(function() {

                    $(this).removeClass('active')
                        .find('.collapse-content').first().collapse('hide');

                });

            }

        }

    });


    // Add BS collapse class
    $('.sa-collapse .collapse-content').each(function() {

        $(this).addClass('collapse');

    });

    // Check for collapses starting open
    $('.sa-collapse.active').each(function() {

        $(this).find('.collapse-content').first().addClass('in');

    });

    // Device dependant logic
    $('body').on('active.sa.stan', function() {

        $('[data-collapse-devices]').each(function() {

            if ( $(this).attr('data-collapse-devices')=='all' || $(this).attr('data-collapse-devices').indexOf($STAN.device) >= 0) {

                $(this).removeClass('inactive');

                if ($(this).attr('data-collapse-devices-open')) {

                    if ($(this).attr('data-collapse-devices-open')=='all' || $(this).attr('data-collapse-devices-open').indexOf($STAN.device) >= 0) {
                        $(this).addClass('active').find('.collapse-content').first().addClass('in').css('height', '');
                    } else {
                        $(this).removeClass('active').find('.collapse-content').first().removeClass('in').addClass('collapse');
                    }

                } else {

                    $(this).removeClass('active').find('.collapse-content').first().removeClass('in').addClass('collapse');

                }

            } else {

                $(this).removeClass('inactive');
                $(this).addClass('active').find('.collapse-content').first().addClass('in').removeClass('collapse').css('height', '');

            }

        });

    }).trigger('active.sa.stan');

});
