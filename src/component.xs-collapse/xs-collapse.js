/* ========================================================================
 * STAN Plugins: XSCollapse
 * Author Andrew Womersley
 * ======================================================================== */

$(function() {

	'use strict';

    $('.xscollapse').each(function() {

        $($(this).attr('data-target')).addClass('xscollapse-target');

        if($STAN.device=='xs') $(".xscollapse-target").removeClass('in').addClass('collapse');

    });

    $('body').on('active.sa.stan', function(event, id) {

        if (id == 'xs') $(".xscollapse-target").removeClass('in').addClass('collapse');

    });

    $('body').on('deactive.sa.stan', function(event, id) {

        if (id == 'xs') $(".xscollapse-target").addClass('in');

    });

});