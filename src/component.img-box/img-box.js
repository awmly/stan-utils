/* ========================================================================
 * STAN Utils: ImgBox
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

	'use strict';

	var imgBox = function() {

		$("img[data-img-box]").each(function() {

			var $image = $(this);

			// Set parent width and heights
			var pw = $image.parent().width();
			var ph = $image.parent().height();

			// Remove image size modifiers
			$image.removeClass('fullwidth fullheight maxwidth maxheight');

			// Add image modifiers
			if ($image.attr('data-img-box') == 'fit-full') {

				if (($image.width() / $image.height()) > (pw / ph)) {
					$image.addClass('fullwidth');
				} else {
					$image.addClass('fullheight');
				}

			} else if ($image.attr('data-img-box') == 'fit-max') {

				if (($image.width() / $image.height()) > (pw / ph)) {
					$image.addClass('maxwidth');
				} else {
					$image.addClass('maxheight');
				}

			} else if ($image.attr('data-img-box') == 'fill-full') {

				if (($image.width() / $image.height()) < (pw / ph)) {
					$image.addClass('fullwidth');
				} else {
					$image.addClass('fullheight');
				}

			} else if ($image.attr('data-img-box') == 'fill-max') {

				// No action needed!

			}

			// Calculate margins
			var mt = (ph - $image.height()) / 2;
			var ml = (pw - $image.width()) / 2;


			// Set margins
			$image.css({
				'margin-top': mt + 'px',
				'margin-left': ml + 'px'
			});

		});

	}

	$("img[data-img-box]").each(function() {

		$(this).parent().css('overflow', 'hidden');

	});

	$(window).on('resize', imgBox);

	$("img[data-img-box]").on('load', imgBox);

	imgBox();

});
