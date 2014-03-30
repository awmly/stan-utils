/* ========================================================================
 * STAN Utils: InsetOutset
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

    'use strict';

    var InsetOutset = function() {

        var padding, width, side, outset, clone;

        $('.sa-inset,.sa-outset').each(function() {

            // Set side
            if ($(this).hasClass('sa-right')) side = 'right';
            else side = 'left';

            // Reset inline css padding
            $(this).parent().css('padding-' + side, '');

            // Get offset
            padding = parseInt($(this).parent().css('padding-' + side));

            // Get width
            width = $(this).outerWidth(true);

            // If width is zero (hidden) - use getSize to find its width
            if (!width) width = $STAN.getSize($(this)).outerWidthMargin;

            // Apply paddings
            if ($(this).hasClass('sa-outset')) {

                $(this).parent().parent().css('padding-' + side, width + 'px');
                $(this).css(side, '-' + width + 'px');

            } else {

                $(this).parent().css('padding-' + side, (padding + width) + 'px');
                $(this).css(side, padding + 'px');

            }

        });

    };

    // Add required parent class
    $('.sa-inset,.sa-outset').each(function() {
        if ($(this).parent().css('position') == 'static') $(this).parent().addClass('relative');
    });

    // Add function listeners
    $(window).on('load resize', InsetOutset);

    // Turn visibility back on
    $('.sa-inset,.sa-outset').css('visibility','visible');

});
