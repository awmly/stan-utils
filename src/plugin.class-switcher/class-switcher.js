/* ========================================================================
 * STAN Utils: ClassSwitcher
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

    'use strict';

    // Click Listeners
    $(window).ready(function() {

        // Set class
        $("body").on("click", "[data-toggle='class-switcher']", function() {

            methods.setClass.apply($(this).attr('data-target'), [$(this).attr('data-class')]);

        });

    });

    // Define Methods
    var methods = {

        init: function(options) {

            // Add selector to options
            options._Selector = this.selector;

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
                if ($("[data-toggle='class-switcher'][data-target='" + settings._Selector + "'].active").length) {

                    methods.setClass.apply($this, [$("[data-toggle='class-switcher'][data-target='" + settings._Selector + "'].active").attr('data-class')]);

                } else {

                    methods.setClass.apply($this, [$("[data-toggle='class-switcher'][data-target='" + settings._Selector + "']").eq(0).attr('data-class')]);

                }

            });

        },

        setClass: function(_Class) {

            var settings = $(this).data('ClassSwitcher');
            var $this = $(this);

            if ($("[data-toggle='class-switcher'][data-target='" + settings._Selector + "'][data-class='" + _Class + "']").length) {

                $this.find(settings.selector).removeClass(settings.currentClass);

                settings.currentClass = _Class;

            }

            $this.find(settings.selector).addClass(settings.currentClass);

            $("[data-toggle='class-switcher'][data-target='" + settings._Selector + "']").removeClass('active');
            $("[data-toggle='class-switcher'][data-target='" + settings._Selector + "'][data-class='" + settings.currentClass + "']").addClass('active');

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
