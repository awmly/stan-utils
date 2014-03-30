/* ========================================================================
 * STAN Utils: Touch Hover
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

    'use strict';

    var $this;

    if (!("ontouchstart" in document.documentElement)) $('html').addClass('no-touch');

    $('html:not(.no-touch) .touch-hover').bind('click touchend', function(event) {

        if ($(this).hasClass('hover')) {

            event.stopPropagation();
            return true;

        } else {

            $this = $(this);

            $('.hover').each(function() {
                if (!$(this).has($this).length) $(this).removeClass('hover');
            });

            $this.addClass('hover');
            event.preventDefault();
            event.stopPropagation();

        }

    });

    $('html').on("click touchend", ":not(.touch-hover)", function(event) {
        $('*').removeClass('hover');
    });

});
