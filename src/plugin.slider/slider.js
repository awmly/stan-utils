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

        // Set
        $("body").on("click","[data-toggle='slider.set']",function() {

          var target=!! $(this).attr('data-target') ? $($(this).attr('data-target')) : $(this).parents('.slider');

          return methods.set.apply(target, [$(this).attr('data-index')]);

        });

        // Next
        $("body").on("click","[data-toggle='slider.next']",function() {

          var target=!! $(this).attr('data-target') ? $($(this).attr('data-target')) : $(this).parents('.slider');

          methods.move.apply(target, ['next', true]);

        });

        // Prev
        $("body").on("click","[data-toggle='slider.prev']",function() {

          var target=!! $(this).attr('data-target') ? $($(this).attr('data-target')) : $(this).parents('.slider');

          methods.move.apply(target, ['prev', true]);

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
                settings.total = $this.find('.frame').length;
                $this.find('.counter .total').text(settings.total);

                // Hide controls if less than 2 frames
                if(settings.total<2) $this.find('.next, .prev, .dots').css('display','none');


                // Set currentIndex
                settings.currentIndex = settings.nextIndex = settings.activeIndex;

                // Layers
                for (i in settings.layers) {

                  layer = $.extend({
                    baseCSS: false,
                    inCSS: false,
                    inDelay: 0,
                    inDuration: 300,
                    inEasing: 'linear',
                    outCSS: false,
                    outDelay: 0,
                    outDuration: 300,
                    outEasing: 'linear',
                    external: false,
                    reverse_for_prev: false,
                    selector:[]
                  }, settings.layers[i]);


                  // set layer selector
                  if(layer.external) {

                    layer.selector = $("[data-target='" + settings.selector + "'].layer" + i);

                  } else {

                    layer.selector = $this.find('.layer'+i);

                  }

                  // set layer to full width and height if slide show is fixed height
                  if(settings.aspect_ratio=='variable') layer.selector.addClass('fill-frame');

                  // set layer presets
                  if (layer.presetCSS == 'fade') {

                      layer.baseCSS = {
                          opacity: 0
                      };
                      layer.inCSS = {
                          opacity: 1
                      };
                      layer.outCSS = {
                          opacity: 0
                      };

                  } else if (layer.presetCSS == 'slide') {

                      layer.baseCSS = {
                          left: '100%'
                      };
                      layer.inCSS = {
                          left: 0
                      };
                      layer.outCSS = {
                          left: '-100%'
                      };

                      layer.selector.addClass('absolute');

                  }

                  // set animationLength
                  if((layer.inDelay+layer.inDuration)>settings.animationLength){
                    settings.animationLength=layer.inDelay+layer.inDuration;
                  }

                  // apply base css
                  $(layer.selector).css(layer.baseCSS);

                  // save layer data base to settings
                  settings.layers[i]=layer;

                }

                // Set dots buttons if dots container is empty
                if(!$this.find('.dots').html()){
                    for (i = 0; i < settings.total; i++) {
                        $this.find('.dots').append('<span data-toggle="slider.set" data-index="'+i+'"></span>');
                    }
                }

                // Add load events
                $this.find('img').load(function() {

                    methods.resize.apply($this);

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

                    $this.find('.frame').eq(settings.activeIndex).css({
                      'z-index':20
                    });

                    for (i in settings.layers) {

                      $(settings.layers[i].selector).eq(settings.activeIndex).css(settings.layers[i].inCSS);

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

            // Remove active classes
            $this.find("[data-toggle='slider.set']").removeClass('active');
            $("[data-target='" + settings.selector + "'][data-toggle='slider.set']").removeClass('active');

            // Get frames
            var $next = $this.find('.frame').eq(settings.nextIndex);
            var $current = $this.find('.frame').eq(settings.currentIndex);

            // Set CSS for next/current frames
            $current.css({
                'z-index': 10
            });
            $next.css({
                'z-index': 20
            });

            // Animate layers
            for (i in settings.layers) {

                layer = settings.layers[i];

                // Set Pre/Post CSS dependant on direction
                if(layer.reverse_for_prev){
                    cssPreMove = (direction == 'next') ? layer.baseCSS : layer.outCSS;
                    cssPostMove = (direction == 'next') ? layer.outCSS : layer.baseCSS;
                }else{
                    cssPreMove = layer.baseCSS;
                    cssPostMove = layer.outCSS;
                }


                // get next
                next[i] = $(layer.selector).eq(settings.nextIndex);
                current[i] = $(layer.selector).eq(settings.currentIndex);

                // Set next CSS and animate
                current[i].delay(layer.outDelay).animate(cssPostMove, layer.outDuration, layer.outEasing);
                next[i].css(cssPreMove);
                next[i].delay(layer.inDelay).animate(layer.inCSS, layer.inDuration, layer.inEasing);

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
            $this.find('.frame')
                .removeClass('active')
                .eq(settings.nextIndex).addClass('active');

            // Update counter
            $this.find('.counter .current').text(settings.currentIndex + 1);

            // Add active classes
            $this.find("[data-toggle='slider.set'][data-index='" + settings.currentIndex + "']").addClass('active');
            $("[data-target='" + settings.selector + "'][data-toggle='slider.set'][data-index='" + settings.currentIndex + "']").addClass('active');

            // Set Timer
            if (settings.autoplay && settings.total>1) {
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


            // Set vars to hold frame height
            var fh = 0;

            // Perform size fixes
            if (settings.aspect_ratio == 'fixed') {

                // Get height of frames
                $this.find('.frame').each(function() {
                    if ($(this).children().height() > fh) fh = $(this).children().height();
                });

                // Set height of frames
                $this.find('.frame').css({
                    height: fh + 'px'
                }).parents('div').css({
                    height: fh + 'px'
                });

            } else {

                // Set height of main slider
                $this.css('height', settings.height[$STAN.device]);

                // Set height of frames
                $this.find('.frame').css({
                  height: settings.height[$STAN.device]
                }).parents('div').css({
                  height: settings.height[$STAN.device]
                });

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
