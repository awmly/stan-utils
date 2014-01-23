/* ========================================================================
 * STAN Utils: ScrollTo
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

    'use strict';

    // Define Global Vars
    var Selectors = [];

    $(window).scroll(function() {

        if (!Selectors.length) return;

        $(Selectors).each(function() {

            var settings = $(this).data('scrollTo');

            if (settings.scroll_spy) methods.Scroll.apply(this);

        });

    });

    // Define Methods
    var methods = {

        init: function(options) {

            // Save selector in array
            $(this.selector).each(function() {

                Selectors.push($(this));

            });

            return this.each(function() {

                // Set this
                var $this = $(this);

                // Set Options
                var settings = $.extend({

                    selector: 'a',
                    listener: 'click',
                    offset: 0,
                    scroll_speed: 300,
                    scroll_spy: true

                }, options);

                // Save settings
                $this.data('scrollTo', settings);

                // Add listener
                $(this).on(settings.listener, settings.selector, function() {

                    methods.Listener.apply($this, [$(this)]);

                    return false;

                });

                $this.find(settings.selector).each(function() {

                    var vars = methods.getVars.apply(this, [this, settings]);

                    if (window.location.hash.substring(2) == vars.target.substring(1)) $('body,html').scrollTop(vars.position);

                });

            });

        },

        Listener: function(_this) {

            var settings = this.data('scrollTo');

            var $this = $(this);

            var vars = methods.getVars.apply(this, [_this, settings]);

            $('body,html').animate({
                scrollTop: vars.position
            }, settings.scroll_speed, function() {

                // Trigger
                $this.trigger('scroll_end.sa.scrollto', [settings]);

            });

        },

        Scroll: function() {

            var $this = $(this);

            var settings = $this.data('scrollTo');

            var scrolltop;

            $this.find(settings.selector).removeClass('active');

            var st = {
                position: 0,
                target: false
            };

            $this.find(settings.selector).each(function() {

                var vars = methods.getVars.apply(this, [this, settings]);

                if ($(window).scrollTop() >= vars.maxscroll) scrolltop = $(document).height();
                else scrolltop = $(window).scrollTop();

                if (scrolltop >= vars.position && vars.position >= st.position) st = {
                    position: vars.position,
                    element: $(this),
                    target: vars.target
                };

            });

            if (st.target) {
                $(st.element).addClass('active');
                window.location.hash = '#/' + st.target.substring(1);
            } else {
                window.location.hash = '';
            }

        },

        getVars: function(object, settings) {

            var offset;

            if ($(object).attr('data-offset')) offset = $(object).attr('data-offset');
            else if (typeof settings.offset === 'function') offset = settings.offset($(this), settings);
            else offset = settings.offset;

            var target = $(object).attr('data-target') ? $(object).attr('data-target') : $(object).attr('href');
            var position = parseInt($(target).offset().top) - parseInt(offset);
            var maxscroll = $(document).height() - $(window).height();

            return {
                offset: offset,
                target: target,
                position: position,
                maxscroll: maxscroll
            };

        }

    };

    $.fn.ScrollTo = function(method) {

        if (methods[method]) {

            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

        } else if (typeof method === 'object' || !method) {

            return methods.init.apply(this, arguments);

        } else {

            $.error('Method ' + method + ' does not exist on jQuery.Datatable');

        }

    };

}(jQuery, $STAN));
