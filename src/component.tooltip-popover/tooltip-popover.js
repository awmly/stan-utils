/* ========================================================================
 * STAN Utils: Tooltip Popovers
 * Author: Andrew Womersley
 * ========================================================================*/

$(function() {

    'use strict';

    // Declare id;
    var id;

    // Auto init BS tooltips
    $('.sa-tooltip').each(function() {

        id = 'tooltip' + Math.floor((Math.random() * 10000));

        $(this).attr({
            id: id,
            'data-container': '#' + id
        }).tooltip();

    });

    // Auto init BS popovers
    $('.sa-popover').each(function() {

        id = 'popover' + Math.floor((Math.random() * 10000));

        $(this).attr({
            id: id,
            'data-container': '#' + id
        }).popover();

    });

});
