/* ========================================================================
 * STAN Plugins: ImgResponsive
 * Author Andrew Womersley
 * ======================================================================== */

$(function() {

	'use strict';

	var imgResonsive=function(){

		$("img[data-resp-src^='{']").each(function() {

			var t = $(this);

			if (t.attr('data-resp-src')) {

				var src = jQuery.parseJSON(t.attr('data-resp-src'));

				var device = !! $STAN.device ? $STAN.device : 'xs';

				t.attr('src', src[device]);

			}

		});

	}

	$(window).on('resize',imgResonsive);

	imgResonsive();

});
