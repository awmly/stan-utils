/* ========================================================================
 * STAN Utils: Colousel
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

  'use strict';

  // Define Global Vars
  var Selectors = [];

  $STAN.on('window.resize', function() {

    if (!Selectors.length) return;

    $(Selectors).each(function() {

      // Resize check
      methods.resize.apply(this);

    });

  });

  // Click Listeners
  $(window).ready(function() {

    // Next
    $("[data-toggle='colousel.next']").click(function() {

      return methods.move.apply($($(this).attr('data-target')), ['next', true]);

    });

    // Prev
    $("[data-toggle='colousel.prev']").click(function() {

      return methods.move.apply($($(this).attr('data-target')), ['prev', true]);

    });

    // Set Index
    $("[data-toggle='colousel.set']").click(function() {

      return methods.set_index.apply($($(this).attr('data-target')), [parseInt($(this).attr('data-index')), true]);

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
          type: 'normal',
          selector: 'div',
          selector_class: false,
          transition_speed: 300,
          autoplay: false,
          autoplay_delay: 5000,
          break_autoplay_on_click: true,
          scroll_amount: {
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1
          },
          max_in_view: 0,
          current_index: 0,
          autoplay_method: 'next',
          selector_width: 0,
          max_index: 0,
          timer: false,
          action: false,
          isScroll: false,
          _inc_value: false,
        }, options);

        if (settings.type == 'normal') {

          settings.transition = 'slide';
          settings.continuous = false;

        } else if (settings.type == 'continuous') {

          settings.transition = 'slide';
          settings.continuous = true;

        } else {

          settings.transition = 'fade';
          settings.continuous = true;

        }

        // Save settings
        $this.data('Colousel', settings);


        var $Selectors = $this.find('.colousel-inner').children(settings.selector);

        // Calculate total
        settings.total = $Selectors.length;

        // Duplicate selectors if not enough
        if (settings.continuous) {

          if (settings.total > settings.max_in_view && settings.total < (settings.max_in_view * 2)) {

            $this.find('.colousel-inner').append($this.find('.colousel-inner').html());

            settings.total = settings.total * 2;
            $Selectors = $this.find('.colousel-inner').children(settings.selector);

          }

        }

        // Add classes
        if (settings.selector_class) $Selectors.addClass(settings.selector_class);

        // Loop through selectors
        $Selectors.each(function(index) {

          // Set index position
          $(this).data('ColouselIndex', index);

        });

        // Click handler for next
        $this.find('.colousel-next').click(function(event) {

          methods.move.apply($this, ['next', true]);

        });

        // Click handler for prev
        $this.find('.colousel-prev').click(function(event) {

          methods.move.apply($this, ['prev', true]);

        });

        // Do resize
        methods.resize.apply($this);

        // Set autoplay timer
        methods.autoplay.apply($this);

      });

    },

    autoplay: function() {

      // Load settings
      var settings = $(this).data('Colousel');

      // Set this
      var $this = $(this);

      if (settings.autoplay) {

        // Calculate which method to call
        if (settings.current_index == settings.max_index && !settings.continuous) {
          settings.autoplay_method = 'prev';
        } else if (settings.current_index === 0 && settings.autoplay_method == 'prev') {
          settings.autoplay_method = 'next';
        }

        // Set Timer
        settings.timer = setTimeout(function() {

          methods.move.apply($this, [settings.autoplay_method, false]);

        }, settings.autoplay_delay);

      }

    },

    resize: function() {

      // Load settings
      var settings = $(this).data('Colousel');

      // Set this
      var $this = $(this);
      var $Selectors = $this.find('.colousel-inner').children(settings.selector);

      // Reset vars
      var height = 0;
      var left = 0;
      var inview_check = 0;
      settings.inview = 0;

      // Set selector width
      $this.find('.colousel-inner').css('width', '');
      $Selectors.css('width', '');
      settings.selector_width = $Selectors.outerWidth();

      // Loop through selectors
      $Selectors.each(function(index) {

        // Check height of current selector and set height if its larger
        if ($(this).outerHeight() > height) height = $(this).outerHeight();

        // Calculate left positoion
        left = $(this).data('ColouselIndex') * settings.selector_width;

        // Set left position
        $(this).css({
          left: left + 'px',
          width: $(this).css('width')
        });

        // If left position is less than colousel width incriment in selectors in view
        inview_check = inview_check + settings.selector_width;
        if (inview_check <= $this.find('.colousel-inner').width() + 10) settings.inview++;

      });

      // Set height for container
      $(this).find('.colousel-inner').height(height);

      // Set start and end positions
      settings.start_position = settings.selector_width * -1;
      settings.end_position = settings.selector_width * settings.total;

      // Set max_index
      settings.max_index = settings.total - settings.inview;

      // Check for device uses scroll
      if (!settings.scroll_amount[$STAN.device]) {

        settings.isScroll = true;

        $this.addClass('scroll');

        $this.find('.colousel-inner').css('width', (settings.total * settings.selector_width) + 'px');

        $Selectors.each(function(index) {

          // Reset left position
          $(this).css('left', (index * settings.selector_width) + 'px');

        });

      } else {

        settings.isScroll = false;

        $this.removeClass('scroll');

        if (settings.continuous) {

          if (settings.total == settings.inview) {

            $Selectors.each(function(index) {

              // Reset left position
              $(this).css('left', (index * settings.selector_width) + 'px');

            });

            $(this).addClass('start end');

          } else {

            $(this).removeClass('start end');

          }

        }

        if (!settings.continuous) {

          // Check current_index isnt above maximum position
          if (settings.current_index > settings.max_index) settings.current_index = settings.max_index;

          // Move slider to current position
          if (settings.current_index > 0) {

            var offset = settings.current_index * settings.selector_width;
            $Selectors.css('left', '-=' + offset + 'px');

          }

          // Check start position
          if (settings.current_index === 0) $(this).addClass('start');
          else $(this).removeClass('start');

          // Check end position
          if (settings.current_index >= settings.max_index) $(this).addClass('end');
          else $(this).removeClass('end');

        }

      }

    },

    set_index: function(index) {

      var settings = $(this).data('Colousel');
      var direction = false;
      var inc_value = 0;

      if (index > settings.current_index) {
        direction = 'next';
        inc_value = index - settings.current_index;
      } else if (index < settings.current_index) {
        direction = 'prev';
        inc_value = settings.current_index - index;
      }

      if (direction) {
        settings._inc_value = inc_value;
        methods.move.apply($(this), [direction, true]);
      }

    },

    pre_move_checks: function(direction) {

      // Load settings
      var settings = $(this).data('Colousel');

      // Set this
      var $this = $(this);
      var $Selectors = $this.find('.colousel-inner').children(settings.selector);

      var inc_value;

      if (settings._inc_value) {
        inc_value = settings._inc_value;
        settings._inc_value = false;
      } else {
        inc_value = settings.scroll_amount[$STAN.device];
      }

      if (!inc_value) inc_value = 1;

      if (!settings.continuous) {

        // Incriment current position

        var diff = 0;

        if (direction == 'next') {
          settings.current_index = settings.current_index + inc_value;
          if (settings.current_index > settings.max_index) {
            diff = settings.current_index - settings.max_index;
            settings.current_index = settings.max_index;
          }

        } else {
          settings.current_index = settings.current_index - inc_value;
          if (settings.current_index < 0) {
            diff = 0 - settings.current_index;
            settings.current_index = 0;
          }
        }
        var move_amount = inc_value - diff;
        settings._distance = move_amount * settings.selector_width;
        settings._speed = move_amount * settings.transition_speed;

      }

      // If continuous - reposition selectors
      if (settings.continuous) {

        // Loop through selectors
        $Selectors.each(function() {

          // Get index position
          var $index = $(this).data('ColouselIndex');

          if (direction == 'next') {

            if ($index < 0) {
              var offset = 0 - $index;
              // Reset index and left position
              $index = settings.total - offset;
              $(this).css('left', (settings.end_position - (settings.selector_width * offset)) + 'px');

            }

            $index = $index - inc_value;

          }

          if (direction == 'prev') {

            $index = $index + inc_value;

            if ($index >= settings.total) {
              var offset = $index - settings.total;
              // Reset index and left position
              $index = offset;
              offset = inc_value - offset;
              $(this).css('left', '-' + (settings.selector_width * offset) + 'px');

            }

          }

          // Save index position
          $(this).data('ColouselIndex', $index);

        });

        settings._distance = inc_value * settings.selector_width;
        settings._speed = inc_value * settings.transition_speed;

      }

    },

    move: function(direction, isClick) {

      // Load settings
      var settings = $(this).data('Colousel');

      // Set this
      var $this = $(this);
      var $Selectors = $this.find('.colousel-inner').children(settings.selector);
      var left_modifier;

      if (direction == 'next') left_modifier = '-';
      else left_modifier = '+';


      if (((settings.continuous && settings.total > settings.inview) || (settings.current_index < settings.max_index && direction == 'next') || (settings.current_index > 0 &&
          direction == 'prev')) && !settings.action && !settings.isScroll) {

        // Set action
        settings.action = true;

        // If isClick and beak delay on click - break autplay
        if (isClick && settings.break_autoplay_on_click) settings.autoplay = false;

        // If isClick - set autoplay method to follow click action
        if (isClick) settings.autoplay_method = direction;

        // Clear timer
        clearTimeout(settings.timer);

        // Positon checks
        methods.pre_move_checks.apply($this, [direction]);

        // Call method for transition type
        methods[settings.transition].apply($this, [left_modifier]);

        // Trigger
        $(this).trigger(direction + '.sa.colousel', [settings]);

      }

    },

    slide: function(left_modifier) {

      // Load settings
      var settings = $(this).data('Colousel');

      // Set this
      var $this = $(this);
      var $Selectors = $this.find('.colousel-inner').children(settings.selector);

      // Animate selectors left
      $Selectors.animate({
        left: left_modifier + '=' + settings._distance + 'px'
      }, settings._speed);

      setTimeout(function() {

        // Set action
        settings.action = false;

        methods.resize.apply($this);

        // Reset autoplay timer
        methods.autoplay.apply($this);


      }, settings._speed + 50);

    },

    fade: function(left_modifier) {

      // Load settings
      var settings = $(this).data('Colousel');

      // Set this
      var $this = $(this);
      var $Selectors = $this.find('.colousel-inner').children(settings.selector);

      $this.find('.colousel-inner').animate({
        opacity: 0
      }, settings._speed, function() {

        $Selectors.each(function() {
          $(this).css('left', left_modifier + '=' + settings._distance + 'px');
        });

        $this.find('.colousel-inner').animate({
          opacity: 1
        }, settings._speed);

      });

      setTimeout(function() {

        // Set action
        settings.action = false;

        methods.resize.apply($this);

        // Reset autoplay timer
        methods.autoplay.apply($this);


      }, (settings._speed * 2) + 50);

    },

    next: function() {

      var $this = $(this);

      methods.move.apply($this, ['next', true]);

    },

    prev: function() {

      var $this = $(this);

      methods.move.apply($this, ['prev', true]);

    }

  };

  $.fn.Colousel = function(method) {

    if (methods[method]) {

      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

    } else if (typeof method === 'object' || !method) {

      return methods.init.apply(this, arguments);

    } else {

      $.error('Method ' + method + ' does not exist on jQuery.Datatable');

    }

  };

}(jQuery, $STAN));
