/* ========================================================================
 * STAN Utils: Popup
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

	'use strict';

	// Define Global Vars
	var Selectors = [];

	$STAN.on('resize', function() {

		if (!Selectors.length) return;

		$(Selectors).each(function() {

			// Resize check
			methods.resize.apply(this);

		});

	});

	// Click Listeners
	$(window).ready(function() {

		// Show
		$('body').on("click", "[data-toggle='popup.show']", function() {

			var src = !!$(this).attr('data-src') ? $(this).attr('data-src') : $(this).attr('href');

			methods.set_src.apply($($(this).attr('data-target')), [src]);

			return methods.show.apply($($(this).attr('data-target')));

		});

		// Hide
		$('body').on("click", "[data-toggle='popup.hide']", function() {

			return methods.hide.apply($($(this).attr('data-target')));

		});

		// Toggle
		$('body').on("click", "[data-toggle='popup.toggle']", function() {

			var src = !!$(this).attr('data-src') ? $(this).attr('data-src') : $(this).attr('href');

			methods.set_src.apply($($(this).attr('data-target')), [src]);

			return methods.toggle.apply($($(this).attr('data-target')));

		});

	});


	// Define Methods
	var methods = {

		init: function(options) {

			// Save selector in array
			$(this.selector).each(function() {

				Selectors.push($(this));

			});

			// Iterate Through Selectors
			return this.each(function(index) {

				// Set this
				var $this = $(this);

				// Set Options
				var settings = $.extend({
					type: 'html',
					src: 'about:blank',
					width: 200,
					height: 300,
					gutter: 15,
					open: false,
					auto_reopen: true,
					lock_aspect_ratio: true,
					scroll: true,
					devices: {
						xs: true,
						sm: true,
						md: true,
						lg: true
					}
				}, options);

				// Unlock aspect ratio for variable heights
				if (settings.height == 'auto') settings.lock_aspect_ratio = false;

				// Save settings
				$this.data('PopUp', settings);

				// Scroll settings
				var _scroll = (settings.scroll) ? 'yes' : 'no';
				var _class = (settings.scroll) ? '' : 'no-scroll';


				// Set HTML/iFrame/Classes
				if (settings.type == 'iframe') {

					$this.find('.popup-content').addClass('no-scroll');
					$this.find('.popup-content').html("<iframe src='about:blank' class='" + _class + "' style='width:100%;height:100%;' seamless frameborder='0' scrolling='" + _scroll +
						"'></iframe>");

				} else {

					$this.find('.popup-content').addClass(_class);

				}

				// Set close listener
				$this.find('.popup-close, .popup-mask').click(function(event) {

					methods.hide.apply($this);
					event.stopPropagation();

				});

				// Show if open and allowed on current device
				if (settings.open && settings.devices[$('body').attr('data-current-device')]) {

					$(this).css('display', 'block');

				}

				$this.on('resize.sa.popup', function() {
					methods.resize.apply($(this));
				});

				// Do resize
				methods.resize.apply(this);

			});

		},

		show: function() {

			var settings = $(this).data('PopUp');

			if (!settings.open) {

				if (settings.devices[$STAN.device]) {

					if (settings.type == 'iframe') {

						// Set iFrame source
						$(this).find('iframe').attr('src', settings.src);

					} else if (settings.type == 'ajax') {

						// Load ajax content
						$(this).find('.popup-display').css('opacity', 0);
						$(this).find('.popup-content').load(settings.src, function() {

							$(this).parent().animate({
								opacity: 1
							}, 300);

						});

					}

					// Display Popup
					$(this).css({
						display: 'block',
						opacity: 0
					}).animate({
						opacity: 1
					}, 300);

					// Do resize
					methods.resize.apply(this);

					// Set open to true
					settings.open = true;

					// Trigger
					$(this).trigger('show.sa.popup', [settings]);

					// Return false to stop default action
					return false;

				} else {

					// Return true to allow default action
					return true;

				}

			} else {

				return false;

			}

		},

		hide: function() {

			var settings = $(this).data('PopUp');

			if (settings.open) {

				// Close Popup
				$(this).animate({
					opacity: 0
				}, 300, function() {
					$(this).css('display', 'none');
				});

				// Unset iFrame src
				if (settings.type == 'iframe') {
					$(this).find('iframe').attr('src', 'about:blank');
				} else if (settings.type == 'ajax') {
					$(this).find('.popup-content').html('');
				}

				// Set open to false
				settings.open = false;

				// Trigger
				$(this).trigger('hide.sa.popup', [settings]);

			}

			// Return false to stop default action
			return false;

		},

		toggle: function(src) {

			var settings = $(this).data('PopUp');

			if (settings.open) return methods.hide.apply(this);
			else return methods.show.apply(this, [src]);

		},

		resize: function() {

			var settings = $(this).data('PopUp');

			// Resize to fit
			var w = $(window).width() - (2 * settings.gutter);
			var h = $(window).height() - (2 * settings.gutter);

			if (settings.height == 'auto') {
				$(this).find('.popup-display').css('height', 'auto');
				var ah = $(this).find('.popup-display').outerHeight();
				if (h > ah) h = ah;
			} else {
				if (h > settings.height) h = settings.height;
			}

			if (w > settings.width) w = settings.width;

			if (settings.lock_aspect_ratio) {
				if ((w / h) > (settings.width / settings.height)) w = settings.width * (h / settings.height);
				else h = settings.height * (w / settings.width);
			}

			$(this).find('.popup-display').css({
				width: w + 'px',
				height: h + 'px',
				marginTop: '-' + (h / 2) + 'px',
				marginLeft: '-' + (w / 2) + 'px'
			});

			// Check if device has changed
			if (!settings.devices[$STAN.device] && settings.open) {
				settings.reopen = true;
				methods.hide.apply(this);
			} else if (settings.devices[$STAN.device] && settings.reopen && settings.auto_reopen) {
				settings.reopen = false;
				methods.show.apply(this);
			}

		},

		set_src: function(src) {

			var settings = $(this).data('PopUp');

			if (src) settings.src = src;

		}

	};

	$.fn.PopUp = function(method) {

		if (methods[method]) {

			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

		} else if (typeof method === 'object' || !method) {

			return methods.init.apply(this, arguments);

		} else {

			$.error('Method ' + method + ' does not exist on jQuery.Datatable');

		}

	};

}(jQuery, $STAN));
