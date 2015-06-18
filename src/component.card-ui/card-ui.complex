/* ========================================================================
 * STAN Utils: Card UI
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

	'use strict';

	var HitTestCount = 0;

	var CardHitTest = function($card, $siblings, top, left, width, height) {

		var t = top;
		var l = left;
		var w = width;
		var h = height;
		var b = t + h;
		var r = l + w;

		var st, sl, sw, sh, sb, sr;

		var HIT = false;

		$siblings.each(function(index) {

			if ($(this).data('active') && !HIT) {

				var st = $(this).data('top');
				var sl = $(this).data('left');
				var sw = $(this).data('width');
				var sh = $(this).outerHeight(true);
				var sb = st + sh;
				var sr = sl + sw;

				HitTestCount++;

				if (t < sb && b > st) {
					if (l < sr && r > sl) {
						HIT = true;
					}
				}

			}

		});

		if (!HIT) {

			return true;

		} else {

			return false;

		}

	};

	var CardUI = function() {

		$(".sa-cards").each(function() {

			var $this = $(this);

			var selector = (typeof $(this).attr('data-selector') !== 'undefined') ? $(this).attr('data-selector') : '.card';
			var maxCols = (typeof $(this).attr('data-maxcols') !== 'undefined') ? $(this).attr('data-maxcols') : '12';

			if ($(this).find(selector).length) {

				var max, _Pos, _Col, pos, col, top, span, width, colid, ok;

				var minwidth = $this.outerWidth() / maxCols;

				$(this).find(selector).data('active', false);
				_Col = [0];

				$this.find(selector).each(function(index) {

					if ($STAN.device == 'xs') {

						$(this).removeClass('absolute').css({
							left: 'auto',
							top: 'auto'
						});

					} else {

						width = $(this).outerWidth();
						span = maxCols / Math.round(($this.parent().width() + 30) / width);

						pos = 9999;
						top = 9999;

						for (var y in _Col) {
							ok = false;
							for (var x = 0; x < maxCols; x++) {
								if (_Col[y] >= 0) {
									if (CardHitTest($(this), $this.find(selector), _Col[y], x * 100, 100, 50)) {

										ok = true

									}
								}
							}
							if (!ok) _Col[y] = -1;
						}

						for (var x = 0; x < maxCols; x++) {

							_Pos = _Col;

							for (var y in _Pos) {

								if (_Pos[y] < top) {
									colid = parseInt(span) + parseInt(x);

									if (colid <= maxCols && _Pos[y] >= 0) {

										if (CardHitTest($(this), $this.find(selector), _Pos[y], x * 100, span * 100, $(this).outerHeight(true))) {
											col = x;
											pos = y
											top = _Pos[y];
										}

									}
								}

							} // end _Pos loop

						} // end _Col loop

						$(this).addClass('absolute').css({
							left: (minwidth * col) + 'px',
							top: top + 'px'
						}).data('active', true).data('top', top).data('left', (100 * col)).data('width', (100 * span));

						for (var x = 0; x < span; x++) {
							colid = parseInt(col) + parseInt(x);
						}

						_Col.push((top + $(this).outerHeight(true)));

					} // end if device XS

				}); // end selector each

				max = 0;

				// Find highest column
				for (var y in _Col) {

					if (_Col[y] > max) max = _Col[y];

				}

				// Set holder height to match highest column
				if ($STAN.device == 'xs') {
					$(this).css('height', 'auto');
				} else {
					$(this).css('height', max + 'px');
				}

			} // end if selector length

		}); // end sa-cards each

	}; // end function

	$('body').on('active.sa.stan', CardUI);

	$('.sa-cards').on('position.sa.cards', CardUI);

});
