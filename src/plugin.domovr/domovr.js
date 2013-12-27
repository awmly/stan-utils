/* ========================================================================
 * STAN Plugins: DOMovr
 * Author Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

    'use strict';

    // Define Global Vars
    var Selectors = [];

    // Resize Listener for resizing slideshow height
    $(window).resize(function() {

        if (!Selectors.length) return;

        $(Selectors).each(function() {

            // Resize check
            methods.resize.apply(this);

        });

    }).resize();


    // Define Methods
    var methods = {

        init: function(options) {

            // Save selector in array
            Selectors.push(this.selector);

            // Iterate Through Selectors
            return this.each(function() {

                // Set Options
                var settings = $.extend({
                    xs: false,
                    sm: false,
                    md: false,
                    lg: false,
                    current_holder: false
                }, options);

                if (!settings.xs) {
                    if (!settings.sm) settings.xs = settings.md;
                    else settings.xs = settings.sm;
                }
                if (!settings.sm) settings.sm = settings.md;
                if (!settings.md) settings.md = settings.lg;
                if (!settings.lg) {
                    if (!settings.md) settings.lg = settings.sm;
                    else settings.lg = settings.md;
                }

                // Set Options
                $(this).data('DOMovr', settings);

                // Do resize
                methods.resize.apply(this);

            });

        },

        resize: function() {

            var settings = $(this).data('DOMovr');

            var element = settings[$STAN.device];

            if (element && element != settings.current_holder) {

                var $this = $(this).detach();

                $(settings.current_holder).removeClass('active');

                $(element).html($this).addClass('active');

                settings.current_holder = element;

                // Trigger
                $(this).trigger('moved.sa.domovr', [settings]);

            }

        }

    };

    $.fn.DOMovr = function(method) {

        if (methods[method]) {

            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

        }
        else if (typeof method === 'object' || !method) {

            return methods.init.apply(this, arguments);

        }
        else {

            $.error('Method ' + method + ' does not exist on jQuery.Datatable');

        }

    };

}(jQuery, $STAN));
