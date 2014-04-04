/* ========================================================================
 * STAN Utils: ClassSwitcher
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

    'use strict';

    // Click Listeners
    $(window).ready(function() {

        // Set click listener
        $("body").on("click", "[data-toggle='class-switcher']", function() {

            methods.setClass.apply($(this).attr('data-target'), [$(this).attr('data-class')]);

        });

    });

    // Define Methods
    var methods = {

        init: function(options) {

            // Add selector to options
            options.target = this.selector;

            // Iterate Through Selectors
            return this.each(function(index) {

                // Set this
                var $this = $(this);

                // Set Options
                var settings = $.extend({
                    selector: 'div',
                    currentClass: ''
                }, options);


                // Save settings
                $this.data('ClassSwitcher', settings);

                // Check for active
                if ($("[data-toggle='class-switcher'][data-target='" + settings.target + "'].active").length) {

                    // Apply classes from active element
                    methods.setClass.apply($this, [$("[data-toggle='class-switcher'][data-target='" + settings.target + "'].active").attr('data-class')]);

                } else {

                    // Apply classes from first element
                    methods.setClass.apply($this, [$("[data-toggle='class-switcher'][data-target='" + settings.target + "']").eq(0).attr('data-class')]);

                }

            });

        },

        setClass: function(_Class) {

            // Get settings
            var settings = $(this).data('ClassSwitcher');
            var $this = $(this);

            // If _Class is set remove and update currentClass
            if (_Class) {

                // remoce currentClass
                $this.find(settings.selector).removeClass(settings.currentClass);

                // Update currentClass
                settings.currentClass = _Class;

            }

            // Add currentClass to selectors
            $this.find(settings.selector).addClass(settings.currentClass);

            // Update active classes
            $("[data-toggle='class-switcher'][data-target='" + settings.target + "']").removeClass('active');
            $("[data-toggle='class-switcher'][data-target='" + settings.target + "'][data-class='" + settings.currentClass + "']").addClass('active');

            // Trigger event
            $(this).trigger('change.sa.class-switcher', [settings]);



        }

    };

    $.fn.ClassSwitcher = function(method) {

        if (methods[method]) {

            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

        } else if (typeof method === 'object' || !method) {

            return methods.init.apply(this, arguments);

        } else {

            $.error('Method ' + method + ' does not exist on jQuery.Datatable');

        }

    };

}(jQuery, $STAN));
