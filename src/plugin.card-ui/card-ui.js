/* ========================================================================
 * STAN Utils: Card UI
 * Author: Andrew Womersley
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
            methods.position.apply(this);

        });

    }).resize();

    // Define Methods
    var methods = {

        init: function(options) {

            // Iterate Through Selectors
            return this.each(function(index) {

                // Save selector in array
                Selectors.push($(this));

                // Add controller class
                $(this).addClass('sa-cards');

                // Set this
                var $this = $(this);

                // Set Options
                var settings = $.extend({
                    selector: 'div',
                    cardsPerRow: {
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 1
                    }
                }, options);

                // Save settings
                $this.data('CardUI', settings);

                // Make sure the selector is positon absolute
                $this.find(settings.selector).css('position', 'absolute');

                // Do position
                methods.position.apply(this);

            });

        },

        position: function() {

            // Get settings and set this
            var settings = $(this).data('CardUI');
            var $this = $(this);

            // Get the width of the selector
            var width = $this.find(settings.selector).outerWidth();

            // Set number of cols based on current view
            var NumCols = Math.round($this.parent().width() / width) - 1;

            // Set our cols array which will hold the height of each column - presume a max of 12
            var Cols = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            // Define som evars
            var x, col, left, max, min;

            $this.find(settings.selector).each(function() {

                min = Cols[0];
                col = 0;

                // Get shortest column
                for (x = NumCols; x >= 0; x--) {

                    if (Cols[x] < min) col = x;

                }

                // Set top and left position for card
                $(this).css({
                    left: (width * col) + 'px',
                    top: Cols[col] + 'px'
                });

                // Update column height
                Cols[col] += $(this).outerHeight(true);

            });


            max = 0;

            // Find highest column
            for (x = 0; x < NumCols; x++) {

                if (Cols[x] > max) max = Cols[x];

            }

            // Set holder height to match highest column
            $(this).css('height', max + 'px');

        }

    };

    $.fn.CardUI = function(method) {

        if (methods[method]) {

            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

        } else if (typeof method === 'object' || !method) {

            return methods.init.apply(this, arguments);

        } else {

            $.error('Method ' + method + ' does not exist on jQuery.Datatable');

        }

    };

}(jQuery, $STAN));
