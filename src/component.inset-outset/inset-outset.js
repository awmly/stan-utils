/* ========================================================================
 * STAN Utils: InsetOutset
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

	'use strict';

	var InsetOutset = function() {

		var padding, paddingTop, width, side, outset, clone;

		$('.sa-inset,.sa-outset').each(function() {

			// Set side
			if ($(this).hasClass('sa-right')) side = 'right';
			else side = 'left';

			// Reset inline css padding
			$(this).parent().css('padding-' + side, '');

			// Get offset
			padding = parseInt($(this).parent().css('padding-' + side));
			paddingTop = parseInt($(this).parent().css('padding-top'));

			// Get width
			width = $(this).outerWidth(true);

			// If width is zero (hidden)  or less than 10 ie bug) - use getSize to find its width
			if (!width || width < 10) width = $STAN.getSize($(this)).outerWidthMargin;

			// Apply paddings
			if ($(this).hasClass('sa-outset')) {

				$(this).parent().parent().css('padding-' + side, width + 'px');
				$(this).css(side, '-' + width + 'px');

			} else {

				$(this).parent().css('padding-' + side, (padding + width) + 'px');
				$(this).css(side, padding + 'px');

			}

			if ($(this).hasClass('sa-top')) {
				$(this).css('margin-top', paddingTop + 'px');
			}

		});

		// Turn visibility back on
		$('.sa-inset,.sa-outset').css('visibility', 'visible');

	};

	// Add required parent class
	$('.sa-inset,.sa-outset').each(function() {
		if ($(this).parent().css('position') == 'static') $(this).parent().addClass('relative');
	});

	// Add function listeners
	$(window).on('load resize insetoutset', InsetOutset);

});
