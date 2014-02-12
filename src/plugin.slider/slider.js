/* ========================================================================
 * STAN Utils: Slider
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
            methods.resize.apply(this);

        });

    }).resize();

    // Click Listeners
    $(window).ready(function() {

        // Show
        $("[data-toggle='slider']").click(function() {

            return methods.set.apply($($(this).attr('data-target')), [$(this).attr('data-index')]);

        });

    });


    // Define Methods
    var methods = {

        init: function(options) {

            // Save selector in array
            $(this.selector).each(function() {

                Selectors.push($(this));

            });

            // Add selector to options
            options.selector = this.selector;

            // Iterate Through Selectors
            return this.each(function(index) {

                // Set this
                var $this = $(this);
                var i, layer;

                // Set Options
                var settings = $.extend({
                    height: '.layer0 img',
                    activeIndex: 0,
                    autoplay: false,
                    autoplay_break_on_click: true,
                    autoplay_delay: 5000,
                    layers: []
                }, options);

                settings.action = settings.timer = settings.animationLength = false;

                // Save settings
                $this.data('Slider', settings);

                // Set aspect ratio type
                if(typeof settings.height==='object') settings.aspect_ratio='variable'; else settings.aspect_ratio='fixed';

                // Set total
                settings.total = $this.find('.cell').length;
                $this.find('.counter .total').text(settings.total);

                // Set currentIndex
                settings.currentIndex = settings.nextIndex = settings.activeIndex;

                // Hide cells
                $this.find('.cell').css({
                    visibility: 'hidden'
                });

                // Layers
                for (i in settings.layers) {

                  layer = $.extend({
                    animationDuration: 300,
                    animationEasing: 'linear',
                    nextDelay: 0,
                    currentDelay: 0,
                    cssPreMove: false,
                    cssActive: false,
                    cssPostMove: false,
                    selector:[]
                  }, settings.layers[i]);


                  // set layer selector
                  if(layer.external) {

                    layer.selector = $("[data-target='" + settings.selector + "'].layer" + i);

                  } else {

                    layer.selector = $this.find('.layer'+i);

                  }

                  // set layer presets
                  if (layer.animationPreset == 'fade') {

                      layer.cssPreMove = {
                          opacity: 0
                      };
                      layer.cssActive = {
                          opacity: 1
                      };
                      layer.cssPostMove = {
                          opacity: 0
                      };

                  } else if (layer.animationPreset == 'slide') {

                      layer.cssPreMove = {
                          left: '100%'
                      };
                      layer.cssActive = {
                          left: 0
                      };
                      layer.cssPostMove = {
                          left: '-100%'
                      };

                  }

                  // set animationLength
                  if((layer.nextDelay+layer.animationDuration)>settings.animationLength){
                    settings.animationLength=layer.nextDelay+layer.animationDuration;
                  }

                  // apply pre move css
                  $(layer.selector).css(layer.cssPreMove);

                  // save layer data base to settings
                  settings.layers[i]=layer;

                }

                // Set radio buttons
                for (i = 0; i < settings.total; i++) {
                    $this.find('.radio').append('<span></span>');
                }

                // Set radio button listener
                $this.find('.radio span').click(function(event) {

                    methods.set.apply($this, [$(this).index()]);

                });

                // Add load events
                $this.find('img').load(function() {

                    methods.resize.apply($this);

                });

                // Click handler for next
                $this.find('.slider-next').click(function(event) {

                    methods.move.apply($this, ['next', true]);

                });

                // Click handler for prev
                $this.find('.slider-prev').click(function(event) {

                    methods.move.apply($this, ['prev', true]);

                });

                // Update active indexes
                methods.animate_complete.apply($this);

                // Do resize
                methods.resize.apply(this);

                // Set load event
                $(window).on('load', function() {

                    $this.css({
                      visibility: 'visible'
                    });

                    $this.find('.cell').eq(settings.activeIndex).css({
                      visibility: 'visible'
                    });

                    for (i in settings.layers) {

                      $(settings.layers[i].selector).eq(settings.activeIndex).css(settings.layers[i].cssActive);

                    }

                });

            });

        },

        move: function(direction, isClick) {

            // Get settings and set this
            var settings = $(this).data('Slider');
            var $this = $(this);

            // Check slider is not currently in action
            if (!settings.action) {

                // Set action to true
                settings.action = true;

                // Clear autoplay
                clearTimeout(settings.timer);
                if (settings.autoplay_break_on_click && isClick) settings.autoplay = false;

                // Set indexes
                if (direction == 'next') {
                    settings.nextIndex = settings.currentIndex + 1;
                    if (settings.nextIndex == settings.total) settings.nextIndex = 0;
                } else {
                    settings.nextIndex = settings.currentIndex - 1;
                    if (settings.nextIndex < 0) settings.nextIndex = settings.total - 1;
                }

                // Animate
                methods.animate.apply($this, [direction]);

            }

        },

        set: function(index) {

            // Get settings and set this
            var settings = $(this).data('Slider');
            var $this = $(this);
            var direction;

            // Check slider is not currently in action
            if (!settings.action && index != settings.currentIndex) {

                // Set action to true
                settings.action = true;

                // Clear autoplay
                clearTimeout(settings.timer);
                if (settings.autoplay_break_on_click) settings.autoplay = false;

                // Set direction
                direction = (index > settings.currentIndex) ? 'next' : 'prev';

                // Set nextIndex
                settings.nextIndex = parseInt(index);

                // Animate
                methods.animate.apply($this, [direction]);

            }

        },

        animate: function(direction) {

            // Get settings and set this
            var settings = $(this).data('Slider');
            var $this = $(this);
            var i, layer, cssPreMove, cssPostMove;
            var next = [];
            var current = [];

            // Tigger pre move event
            $(this).trigger('pre-move.sa.slider', [settings]);

            // Get BGR cells
            var $next = $this.find('.cell').eq(settings.nextIndex);
            var $current = $this.find('.cell').eq(settings.currentIndex);

            // Set CSS for next/current cells
            $current.css({
                'z-index': 10
            });
            $next.css({
                visibility: 'visible',
                'z-index': 20
            });

            // Animate layers
            for (i in settings.layers) {

                layer = settings.layers[i];

                // Set Pre/Post CSS dependant on direction
                cssPreMove = (direction == 'next') ? layer.cssPreMove : layer.cssPostMove;
                cssPostMove = (direction == 'next') ? layer.cssPostMove : layer.cssPreMove;

                // get next
                next[i] = $(layer.selector).eq(settings.nextIndex);
                current[i] = $(layer.selector).eq(settings.currentIndex);

                // Set next CSS and animate
                current[i].delay(layer.currentDelay).animate(cssPostMove, layer.animationDuration, layer.animationEasing);
                next[i].css(cssPreMove);
                next[i].delay(layer.nextDelay).animate(layer.cssActive, layer.animationDuration, layer.animationEasing);

            }

            // Set post animation timeout
            setTimeout(function() {

              // Tigger post move event
              $this.trigger('post-move.sa.slider', [settings]);

              // Animation complete
              methods.animate_complete.apply($this);

            }, settings.animationLength);

        },

        animate_complete: function() {

            // Get settings and set this
            var settings = $(this).data('Slider');
            var $this = $(this);

            // Update index
            settings.currentIndex = settings.nextIndex;

            // Add/remove active classes
            $this.find('.cell')
                .removeClass('active')
                .eq(settings.nextIndex).addClass('active');

            // Update counter
            $this.find('.counter .current').text(settings.currentIndex + 1);

            // Update radio buttons
            $this.find('.radio span').removeClass('active');
            $this.find('.radio span').eq(settings.currentIndex).addClass('active');

            // Update any external listeners
            $("[data-toggle='slider'][data-target='" + settings.selector + "']").removeClass('slider-active');
            $("[data-toggle='slider'][data-target='" + settings.selector + "'][data-index='" + settings.currentIndex + "']").addClass('slider-active');

            // Set Timer
            if (settings.autoplay) {
                settings.timer = setTimeout(function() {

                    methods.move.apply($this, ['next', false]);

                }, settings.autoplay_delay);
            }

            // Set action to false
            settings.action = false;

        },

        resize: function() {

            // Get settings and set this
            var settings = $(this).data('Slider');
            var $this = $(this);


            // Set vars to hold image with and height
            var iw = 0;
            var ih = 0;

            // Perform size fixes
            if (settings.aspect_ratio == 'fixed') {

                // Get image max width and height
                $this.find(settings.height).each(function() {
                    if ($(this).height() > ih) ih = $(this).height();
                });

                // Set height
                $this.css({
                    height: ih + 'px'
                });

            } else {

                // Set slider height
                $this.css('height', settings.height[$STAN.device] + 'px');

            }

        }

    };

    $.fn.Slider = function(method) {

        if (methods[method]) {

            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

        } else if (typeof method === 'object' || !method) {

            return methods.init.apply(this, arguments);

        } else {

            $.error('Method ' + method + ' does not exist on jQuery.Datatable');

        }

    };

}(jQuery, $STAN));
