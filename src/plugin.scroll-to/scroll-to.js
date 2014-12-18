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

        return true;

    });

    // Define Methods
    var methods = {

        init: function(options) {

            // Add selector to options
            options.selector = this.selector;

            return this.each(function() {

                // Save selector in array
                Selectors.push($(this));

                // Set this
                var $this = $(this);

                // Set Options
                var settings = $.extend({

                    listener: 'click',
                    offset: 0,
                    scroll_speed: 300,
                    scroll_spy: true,
                    active_class:'active'

                }, options);

                // Save settings
                $this.data('scrollTo', settings);

                // Add listener
                $(this).on(settings.listener, function() {

                    methods.Listener.apply($this, [$(this)]);

                    if(settings.scroll_spy) return false; else return true;

                });

                var vars = methods.getVars.apply($this, [$this, settings]);

                if (window.location.hash == vars.target){
                  $('body,html').scrollTop(vars.position);
                }

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

            $('body').find(settings.selector).each(function(){

              $(this).removeClass(settings.active_class);
              if($(this).attr('data-active-class')) $(this).removeClass( $(this).attr('data-active-class') );

          });

            var st = {
                position: 0,
                target: false
            };

            $('body').find(settings.selector).each(function() {

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
                $(st.element).addClass(settings.active_class);
                if($(st.element).attr('data-active-class')) $(st.element).addClass( $(st.element).attr('data-active-class') );
                if(window.location.hash!=st.target){
                  window.location.hash = st.target;
                  $this.trigger('hash_change.sa.scrollto', [settings]);
                }
            } else {
                if (window.location.hash!='#/') {
                    window.location.hash = '#/';
                    $this.trigger('hash_change.sa.scrollto', [settings]);
                }
            }



        },

        getVars: function(object, settings) {

            var offset;

            if ($(object).attr('data-offset')) offset = $(object).attr('data-offset');
            else if (typeof settings.offset === 'function') offset = settings.offset($(this), settings);
            else offset = settings.offset;

            var target = $(object).attr('data-target') ? $(object).attr('data-target') : $(object).attr('href');
            var maxscroll = $(document).height() - $(window).height();
            var selector = $("[data-id='" + target.substring(1) + "']");

            if (selector.length) {

                // Ensure selector and parent are displayed
                $([selector,selector.parent()]).addClass('block');

                // Get positon
                var position = selector.offset().top - parseInt(offset);

                // Revert display
                $([selector,selector.parent()]).removeClass('block');

            } else {
                var position = 0;
            }

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
