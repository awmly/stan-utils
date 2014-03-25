/* ========================================================================
 * STAN Utils: Stan
 * Author: Andrew Womersley
 * ======================================================================== */

var $STAN;

(function(CustomConfig) {

    'use strict';

    var Tag = !! CustomConfig.tag ? CustomConfig.tag : 'body';

    var Config = {

        xs: {
            min_width: 0,
            classes: 'device-xs mobile',
            data: {
                mobile: true,
                desktop: false
            }
        },
        sm: {
            min_width: 768,
            classes: 'device-sm mobile',
            data: {
                mobile: true,
                desktop: false
            }
        },
        md: {
            min_width: 992,
            classes: 'device-md desktop',
            data: {
                mobile: false,
                desktop: true
            }
        },
        lg: {
            min_width: 1200,
            classes: 'device-lg desktop',
            data: {
                mobile: false,
                desktop: true
            }
        }

    };

    // Merge Config with CustomConfig
    for (var i in Config) {
        if (typeof CustomConfig[i] === 'object') Config[i] = $.extend(Config[i], CustomConfig[i]);
    }

    // Set Max Widths
    Config.xs.max_width = Config.sm.min_width;
    Config.sm.max_width = Config.md.min_width;
    Config.md.max_width = Config.lg.min_width;
    Config.lg.max_width = 9999;


    var _STAN = function(deferTrigger) {

        var STAN = !! window.$STAN ? window.$STAN : [];
        var device;
        var current_device;
        var triggers = [];
        var x;
        var bp;
        var ww;

        // Loop through breakpoints - reset data
        for (device in Config) {

            bp = Config[device];

            // Remove classes
            $(Tag).removeClass(bp.classes);

            // Remove data attributes
            for (x in bp.data) STAN[x] = false;

        }

        current_device = STAN.device;

        // Loop through breakpoints - set data
        for (device in Config) {

            bp = Config[device];

            ww = $(window).width();

            if (bp.min_width <= ww && ww < bp.max_width) {

                // Add class
                $(Tag).addClass(bp.classes);

                if (current_device != device) triggers.push({
                    type: 'active',
                    device: device
                });

                // Add attributes
                STAN.device = device;
                STAN.classes = bp.classes;
                for (x in bp.data) STAN[x] = bp.data[x];

            }
            else {

                if (current_device == device) triggers.push({
                    type: 'deactive',
                    device: device
                });

            }

        }

        // Assign STAN to $_STAN global
        window.$STAN = STAN;

        // If defer trigger is true - delay the activate trigger till window is ready
        if (deferTrigger) {

            $(window).on('ready', function() {
                _STAN_Triggers(triggers);
            });

        }
        else {

            _STAN_Triggers(triggers);

        }

    };

    var _STAN_Triggers = function(triggers) {

        for (var i in triggers) {
            var trigger = triggers[i];
            $(Tag).trigger(trigger.type + '.sa.stan', [trigger.device]);
        }

    };

    // Set resize listener
    $(window).on('resize', function() {
        _STAN(false);
    });

    $(window).load(function(){
      $(window).resize();
    });

    // Run
    _STAN(true);


})( ((typeof $STAN_Config === 'undefined') ? [] : $STAN_Config) );

/* ========================================================================
 * STAN Utils: AutoClass
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

  'use strict';

    var AutoClass=function(){

        var x, autoclass, parts, selector, classes;

        $('[data-auto-class]').each(function(){

            // Get auto class attribute
            autoclass=$(this).attr('data-auto-class').split("}");

            for(x=0;x<autoclass.length-1;x++){

              // Get parts
              parts=autoclass[x].match(/[^{]*/g);

              // Set selector
              selector=$.trim(parts[0]);

              // Set classes
              classes=$.trim(parts[2]);

              // Apply classes to selector
              $(this).find(selector).addClass(classes);

            }

        });

    };

    $(document).on('ready',AutoClass);

});

/* ========================================================================
 * STAN Utils: Card UI
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

  'use strict';

  var CardUI=function(){

    $(".sa-cards").each(function() {

      var $this = $(this);

      var selector = (typeof $(this).attr('data-selector')!=='undefined') ? $(this).attr('data-selector') : '.card';

      if( $(this).find(selector).length ){

        // Get the width of the selector
        var width = $this.find(selector).outerWidth();

        // Set number of cols based on current view
        var NumCols = Math.round($this.width() / width) - 1;

        // Set our cols array which will hold the height of each column - presume a max of 12
        var Cols = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        // Define som evars
        var x, col, left, max, min;

        $this.find(selector).each(function() {

            min = 99999;

            // Get shortest column
            for (x = 0; x <= NumCols; x++) {

                if (Cols[x] < min){
                    col = x;
                    min = Cols[x];
                }

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

    });

  }

  $(window).on('resize', CardUI);

  $('.sa-cards').on('position.sa.cards', CardUI);

});

/* ========================================================================
 * STAN Utils: Collapse
 * Author: Andrew Womersley
 * ======================================================================== */

 $(function(){

  'use strict';

  // Add click
  $('.sa-collapse .sa-click').click(function(){

    if( !$(this).closest('.sa-collapse').hasClass('inactive') ){

      $(this).closest('.sa-collapse') .toggleClass('active')
                                      .find('.sa-content').first().collapse('toggle');

      if( $(this).parents('.sa-accordion').length ){

        $(this).closest('.sa-collapse').siblings('.sa-collapse.active').each(function(){

          $(this) .removeClass('active')
                  .find('.sa-content').first().collapse('hide');

        });

      }

    }

  });


  // Add BS collapse class
  $('.sa-collapse .sa-content').each(function(){

    $(this).addClass('collapse');

  });

  // Check for collapses starting open
  $('.sa-collapse.active').each(function(){

    $(this).find('.sa-content').first().addClass('in');

  });

  // Device dependant logic
  $('body').on('active.sa.stan', function() {

      $('[data-collapse-devices]').each(function() {

          if ($(this).attr('data-collapse-devices').indexOf($STAN.device) >= 0) {

              $(this).removeClass('inactive');

              if ($(this).attr('data-collapse-devices-open')) {

                if($(this).attr('data-collapse-devices-open').indexOf($STAN.device) >= 0){
                  $(this).addClass('active').find('.sa-content').first().addClass('in').css('height','');
                }else{
                  $(this).removeClass('active').find('.sa-content').first().removeClass('in').addClass('collapse');
                }

              }else{

                $(this).removeClass('active').find('.sa-content').first().removeClass('in').addClass('collapse');

              }

          } else {

              $(this).addClass('inactive');
              $(this).addClass('active').find('.sa-content').first().addClass('in').removeClass('collapse').css('height','');

          }

      });

  });

});

/* ========================================================================
 * STAN Utils: Dropdown
 * Author: Andrew Womersley
 * ======================================================================== */

 $(function() {

  'use strict';

    $('.sa-dropdown').click(function(event){

      $('.sa-dropdown').removeClass('active');

      $(this).addClass('active');

      event.stopPropagation();

    });

    $('body').on('click',function(){

      $('.sa-dropdown').removeClass('active');

    });

});

/* ========================================================================
 * STAN Utils: Form Elements
 * Author: Andrew Womersley
 * ======================================================================== */

 $(function() {

  'use strict';

    $('.sa-checkbox, .sa-radio').click(function(){

      var $input=$(this).find('input');

      if($input.attr('type')=='radio'){

        $("[name='"+$input.attr('name')+"']").each(function(){

          $(this) .prop('checked',false)
                  .parents('.sa-radio').removeClass('active');

        });

      }

      if($(this).hasClass('active')){

        $(this) .removeClass('active')
                .find('input').prop('checked',false);

      }else{

        $(this) .addClass('active')
                .find('input').prop('checked',true);

      }

    });

    $('.sa-checkbox, .sa-radio').each(function(){

      if($(this).find('input').prop('checked')){

        $(this).addClass('active');

      }

   });

});

/* ========================================================================
 * STAN Utils: ImgBox
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

	'use strict';

	var imgBox=function(){

		$("img[data-img-box]").each(function() {

			var $image = $(this);

			// Set parent width and heights
			var pw = $image.parent().width();
            var ph = $image.parent().height()

            // Remove image size modifiers
            $image.removeClass('maxwidth maxheight');

            // Add image modifiers
            if ($image.attr('data-img-box') == 'fit') {

                if (($image.width() / $image.height()) > (pw / ph)) {
                    $image.addClass('maxwidth');
                } else {
                    $image.addClass('maxheight');
                }

            } else {

                if (($image.width() / $image.height()) < (pw / ph)) {
                    $image.addClass('maxwidth');
                } else {
                    $image.addClass('maxheight');
                }

            }

            // Calculate margins
            var mt = (ph - $image.height()) / 2;
            var ml = (pw - $image.width()) / 2;


            // Set margins
            $image.css({
                'margin-top': mt + 'px',
                'margin-left': ml + 'px'
            });

		});

	}

  $("img[data-img-box]").each(function() {

    $(this).parent().css('overflow','hidden');

  });

	$(window).on('resize', imgBox);

	$("img[data-img-box]").on('load', imgBox);

});

/* ========================================================================
 * STAN Utils: ImgResponsive
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

	'use strict';

	var imgResonsive=function(){

		$("img[data-resp-src^='{']").each(function() {

			var t = $(this);

			if (t.attr('data-resp-src')) {

				var src = jQuery.parseJSON(t.attr('data-resp-src'));

				var device = !! $STAN.device ? $STAN.device : 'xs';

				t.attr('src', src[device]);

			}

		});

	}

	$(window).on('resize',imgResonsive);

	imgResonsive();

});

/* ========================================================================
 * STAN Utils: InsetOutset
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

  'use strict';

    var InsetOutset=function(){

        var padding, width, side, outset, clone;

        $('.sa-inset,.sa-outset').each(function(){

            // Set side
            if($(this).hasClass('sa-right')) side='right';
            else side='left';

            // Reset inline css padding
            $(this).parent().css('padding-'+side,'');

            // Get offset
            padding=parseInt($(this).parent().css('padding-'+side));

            // Get width
            width=$(this).outerWidth(true);

            // If width is zero (hidden) - use getSize to find its width
            if(!width) width=$STAN.getSize($(this)).outerWidthMargin;

            // Apply paddings
            if( $(this).hasClass('sa-outset') ){

              $(this).parent().parent().css('padding-'+side,width+'px');
              $(this).css(side,'-'+width+'px');

            }else{

              $(this).parent().css('padding-'+side,(padding+width)+'px');
              $(this).css(side,padding+'px');

            }

        });

    };

    $('.sa-inset,.sa-outset').each(function(){
      if($(this).parent().css('position')=='static') $(this).parent().addClass('relative');
    });

    $(window).on('load resize',InsetOutset);

});

/* ========================================================================
 * STAN Utils: Responsive Navigation
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

    'use strict';

    var CloseMobile = function() {

        $('.resp-nav').animate({
            left: '-100%'
        }, 200, "swing", function() {
            $('.resp-nav').css({
                visibility: 'hidden'
            });
        });

        $('.resp-nav-mask').animate({
            opacity: 0
        }, 200, "swing", function() {
            $('.resp-nav-mask').css('display', 'none');
        });

        ResetNav();

    }

    var ResetNav = function() {

        $('.resp-nav nav').css('left', 0);
        $('.resp-nav').find('li').removeClass('open');
        $('.resp-nav').attr('data-open', 0);

    }

    $(window).resize(function() {

        var w = $(window).width();
        var h = $(window).height();
        var breakpoint = (typeof $('.resp-nav').attr('data-breakpoint')!=='undefined') ? $('.resp-nav').attr('data-breakpoint') : 992;

        $('.resp-nav, .resp-nav-load').removeClass('desktop mobile');

        if (w < breakpoint) {

            $('.resp-nav, .resp-nav-load').addClass('mobile');
            $('.resp-nav, .resp-nav-mask').css('height', h + 'px');

        } else {

            $('.resp-nav').addClass('desktop').css({
                height: '',
                visibility: '',
                left: ''
            });

            $('.resp-nav-mask').css('display', 'none');

            ResetNav();
        }

    }).resize();

    $('.resp-nav-load').click(function(event) {

        $('.resp-nav').css({
            visibility: 'visible',
            left: '-100%'
        })
        $('.resp-nav').attr('data-open', 1).animate({
            left: 0
        }, 200, "swing");
        $('.resp-nav-mask').css({
            display: 'block',
            opacity: 0
        });
        $('.resp-nav-mask').animate({
            opacity: 1
        }, 200, "swing");

        event.stopPropagation();

    });

    $('.resp-nav-mask').click(function(event) {

        CloseMobile();

        event.stopPropagation();

    });

    $('.resp-nav a').click(function() {

        if ($(this).parents('.resp-nav').hasClass('mobile') && !$('.resp-nav nav').is(':animated')) {

            var p = $(this).parent();

            if ($(p).find('.sub:not(.desktop-only)').length) {

                $(p).addClass('open');
                $('.resp-nav nav').animate({
                    left: '-=100%'
                }, 200, "swing");

                $(p).find('h2').attr('data-url', $(this).attr('href'));
                return false;

            }

        }

    });

    $('.resp-nav .bwd').click(function() {

        var p = $(this).closest('li');

        $('.resp-nav nav').animate({
            left: '+=100%'
        }, 200, "swing", function() {
            $(p).removeClass('open');
        });

    });

    $('.resp-nav .fwd').click(function() {

        CloseMobile();

    });

    $('.resp-nav h2').click(function() {

        document.location.href = $(this).attr('data-url');

    });

    $('.resp-nav-mask').on('wheel mousewheel touchmove', function(event) {

        event.preventDefault();

    });

});

/* ========================================================================
 * STAN Utils: Tabs
 * Author: Andrew Womersley
 * ========================================================================*/

$(function() {

    'use strict';

    // Main collapse tab function
    var CollapseTab = function() {

        // Get window width
        var w = $(window).width();

        $(".sa-collapse-tabs").each(function() {

            // Get breakpoint if set - if not use default
            var breakpoint = (typeof $(this).attr('data-breakpoint') !== 'undefined') ? $(this).attr('data-breakpoint') : 992;

            // Remove desktop and mobile classes
            $(this).removeClass('desktop mobile');

            // Check if width is larger/smaller than breakpoint
            if (w < breakpoint) {

                // Add mobile class to main collapse tabs
                $(this).addClass('mobile');

            } else {

                // Add desktop class to main collapse tabs
                $(this).addClass('desktop');

            }

        });

    }

    // Read hash
    var readHash = function() {

        // Set active based on hash
        var hash = window.location.hash.substring(1);

        $('.sa-tabs, .sa-collapse-tabs').each(function(tabsindex) {

            if (hash) {
                if ($(this).find(".tab-nav [data-id='" + hash + "']").length) {

                    $(this).find(".tab-nav [data-id]").removeClass('active');
                    $(this).find(".tab-nav [data-id='" + hash + "']").addClass('active');

                }
            }

            // Get index of active tab
            var index = $(this).find(".tab-nav li.active").index();

            // Store index
            $(this).data('index', index);

            // Make active nav's tab-pane visible
            $(this).find(".tab-pane").removeClass('active');
            $(this).find(".tab-pane").eq(index).addClass('active');


            // Collapse Tab logic
            if ($(this).hasClass('sa-collapse-tabs')) {

                // Remove active collapse classes
                $(this).find('.sa-content').removeClass('in').addClass('collapse').css('height', 0);

                // Add active collapse classes
                $(this).find('.sa-content').eq(index).addClass('in').removeClass('collapse').css('height', 'auto');
            }

        });

    }


    // Added needed HTML markup
    $('.sa-tabs, .sa-collapse-tabs').each(function(tabsindex) {

        $(this).addClass('sa-tabs-' + tabsindex);

        $(this).find('.tab-nav li').each(function(index) {

            $(this).attr('data-target', '.sa-tabs-' + tabsindex + ' .tab-pane-' + index);

        });

        $(this).find('.tab-pane').each(function(index) {

            $(this).addClass('tab-pane-' + index);

        });

        // Check there is an active class
        if (!$(this).find(".tab-nav li.active").length) {
            $(this).find(".tab-nav li").eq(0).addClass('active');
        }

    });

    // Add click listener
    $('.tab-nav li').click(function(event) {

        event.preventDefault();

        // Show tab
        $(this).tab('show');

    });

    // Click event to show collapse
    $('.sa-collapse-tabs .sa-click').click(function() {

        if ($(this).parents('.sa-collapse-tabs').hasClass('mobile')) {

            $(this).parent().find('.sa-content').collapse('toggle');

        }

    });

    // BS tab shown event
    $('.tab-nav li').on('shown.bs.tab', function(event) {

        // Update active classes
        $(event.target).siblings().removeClass('active');
        $(event.target).addClass('active');

        if ($(event.target).attr('data-id')) {

            // Update hash
            window.location.hash = $(event.target).attr('data-id');

        } else {

            // Manually invoke refresh
            readHash();

        }

    });

    // BS collpase show event to trigger accordion effect
    $('.sa-collapse-tabs .sa-content').on('show.bs.collapse', function() {

        $(this).parent().siblings().find('.sa-content.in').collapse('hide');

    });


    // BS collapse shown event to update hash
    $('.sa-collapse-tabs .sa-content').on('shown.bs.collapse', function() {

        var index = $(this).parent().index();

        window.location.hash = $(this).parents('.sa-collapse-tabs').find('.tab-nav li').eq(index).attr('data-id');

    });


    // Add collapse classes
    $('.sa-collapse-tabs .sa-content').addClass('collapse');

    // Add resize listener
    $(window).on('resize', CollapseTab);

    // Set hashchange event
    $(window).on('hashchange', readHash);

    readHash();

});

/* ========================================================================
 * STAN Utils: Tooltip Popovers
 * Author: Andrew Womersley
 * ========================================================================*/

$(function() {

    'use strict';

    // Declare id;
    var id;

    // Auto init BS tooltips
    $('.sa-tooltip').each(function() {

        id = 'tooltip' + Math.floor((Math.random() * 10000));

        $(this).attr({
            id: id,
            'data-container': '#' + id
        }).tooltip();

    });

    // Auto init BS popovers
    $('.sa-popover').each(function() {

        id = 'popover' + Math.floor((Math.random() * 10000));

        $(this).attr({
            id: id,
            'data-container': '#' + id
        }).popover();

    });

});

/* ========================================================================
 * STAN Utils: Touch Hover
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

	'use strict';

    var $this;

    if(!("ontouchstart" in document.documentElement)) $('html').addClass('no-touch');

    $('html:not(.no-touch) .touch-hover').bind('click touchend', function(event) {

        if($(this).hasClass('hover')){

            event.stopPropagation();
            return true;

        }else{

            $this=$(this);

            $('.hover').each(function(){
                if(!$(this).has($this).length) $(this).removeClass('hover');
            });

            $this.addClass('hover');
            event.preventDefault();
            event.stopPropagation();

        }

    });

    $('html').on("click touchend", ":not(.touch-hover)", function(event) {
        $('*').removeClass('hover');
        //event.stopPropagation();
    });

});

/* ========================================================================
 * STAN Utils: Articles
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

    'use strict';

    $('article.click').click(function(){
      document.location.href=$(this).find("a").eq(0).attr('href');
    });
    $('article.click a').click(function(event){
      event.stopPropagation();
    });

});

/* ========================================================================
 * STAN Utils: Helpers
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

    'use strict';

    // Stop parent scroll
    $('.stop-parent-scroll').on('mousewheel touchend', function(event) {

      var dir = event.originalEvent.wheelDelta;
      var $t = $(this);

      if (dir > 0 && $t.scrollTop() === 0) {
          event.preventDefault();
      }

      if (dir < 0 && ($t.scrollTop() == $t.get(0).scrollHeight - $t.innerHeight())) {
          event.preventDefault();
      }

      event.stopPropagation();

    });

    $('.stop-parent-scroll').on('touchstart', function(event) {

      var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

      $(this).data('pageY',touch.pageY);

    });

    $('.stop-parent-scroll').on('touchmove', function(event) {

      event.preventDefault();

      event.stopPropagation();

      var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

      var move=($(this).data('pageY')-touch.pageY)/5;

      $(this).scrollTop( $(this).scrollTop()+move );

    });


    // Set pixel ratio
    var pxRatio = !! window.devicePixelRatio ? window.devicePixelRatio : 1;

    if (pxRatio > 1) $('body').addClass('x2');

});

$(function() {

    'use strict';

    var width, subnav;

    $(".sa-nav.nav-horizontal li").mouseover(function() {

        width = 0;
        subnav = $(this).children('ul');

        if (subnav.length) {

            subnav.css('width', '1000px')
                .children('li').css('display', 'inline-block');

            subnav.children('li').each(function() {

                if ($(this).outerWidth() > width) width = $(this).outerWidth();

            });

            subnav.css('width', '')
                .children('li').css('display', '');

            if (width > subnav.outerWidth()) subnav.css('width', width + 'px');

        }

    });

});

/* ========================================================================
 * STAN Utils: GetQueryString
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

  'use strict';

  $STAN.getQueryString=function(){

    // Get query string
    var qs=window.location.search.substring(1);

    // Set req exp pattern
    var patt = new RegExp(/([^&=]+)=?([^&]*)/g);

    // Set params object to store qs values
    var params={};

    // Set matches variable
    var matches;

    // Loop through pattern matches
    while (matches = patt.exec(qs)){

      // Set param - replace + and %20 for spaces
      params[matches[1]] = matches[2].replace(/(\+|\%20)/g,' ');

    }

    // Return params object
    return params;

  }

}(jQuery, $STAN));

/* ========================================================================
 * STAN Utils: GetSize
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

	'use strict';

  var size={};
  var width, display, clone;

  var setSize=function(target){

    return {
      outerWidthMargin:target.outerWidth(true),
      outerHeightMargin:target.outerHeight(true),
      outerWidth:target.outerWidth(),
      outerHeight:target.outerHeight(),
      width:target.width(),
      height:target.height()
    }

  };

  $STAN.getSize=function(target,css){

    if(typeof css=='undefined') css={};

    css.visibility="hidden";

    clone = target.clone().css(css);

    $('body').append(clone);

    size=setSize(clone);

    clone.remove();

    return size;

  }

}(jQuery, $STAN));

(function($, $STAN) {

  'use strict';

  $STAN.overOutDelay=function(element,over,out,delay){

    $(element).mouseenter(function(){

      $(element).attr('data-over',1);

      over();

    }).mouseleave(function(){

      $(element).attr('data-over',0);

      setTimeout(function(){

        if( $(element).attr('data-over')=='0' ) out();

      },delay);

    });

  }

}(jQuery, $STAN));

/* ========================================================================
 * STAN Utils: AnchorNav
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

    'use strict';

    // Define Methods
    var methods = {

        init: function(options) {

            var _this = this;

            // Iterate Through Selectors
            return this.each(function(index) {

                // Set this
                var $this = $(this);

                // Set Options
                var settings = $.extend({
                    items: 'h2',
                    li_class: '',
                    a_class: '',
                    add_li_active_class:false,
                    add_a_active_class:true
                }, options);


                // Save settings
                $this.data('AnchorNav', settings);

                // Find Controllers and Set Listeners
                $(settings.items).each(function() {

                    var id=$(this).text().replace(/\W/g, '');
                    $(this).attr('id',id);
                    $this.append("<li class='"+settings.li_class+"'><a href='#"+id+"' class='"+settings.a_class+"'>"+$(this).text()+"</a></li>");

                });

                if(settings.add_li_active_class){
                    $this.find('li').click(function(){
                        $this.find('li').removeClass('active');
                        $(this).addClass('active');
                    });
                }

                if(settings.add_a_active_class){
                    $this.find('a').click(function(){
                        $this.find('a').removeClass('active');
                        $(this).addClass('active');
                    });
                }

            });

        }

    };

    $.fn.AnchorNav = function(method) {

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
/* ========================================================================
 * STAN Utils: ClassSwitcher
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

    'use strict';

    // Define Methods
    var methods = {

        init: function(options) {

            var _this = this;

            // Iterate Through Selectors
            return this.each(function(index) {

                // Set this
                var $this = $(this);

                // Set Options
                var settings = $.extend({
                    selector: 'div',
                    current_class: ''
                }, options);


                // Save settings
                $this.data('ClassSwitcher', settings);

                // Find Controllers and Set Listeners
                $("[data-toggle='class-switcher'][data-target='" + _this.selector + "']").each(function() {

                    $(this).find('li').each(function() {

                        // Check if button has active class
                        if ($(this).hasClass('active')) methods.change.apply($this, [$(this)]);

                        // Add click listener
                        $(this).click(function() {
                            methods.change.apply($this, [$(this)]);
                        });

                    });

                });

            });

        },

        change: function(_this) {

            var settings = $(this).data('ClassSwitcher');

            var $this = $(this);

            $(_this).siblings().removeClass('active');
            _this.addClass('active');

            this.children(settings.selector).removeClass(settings.current_class).addClass(_this.attr('data-class'));

            settings.current_class = _this.attr('data-class');

            // Trigger
            $(this).trigger('change.sa.class-switcher', [settings]);

        }

    };

    $.fn.ClassSwitcher = function(method) {

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

/* ========================================================================
 * STAN Utils: Colousel
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
            $(this.selector).each(function(){

                Selectors.push( $(this) );

            });

            // Iterate Through Selectors
            return this.each(function(index) {

                // Set this
                var $this = $(this);

                // Set Options
                var settings = $.extend({
                    type:'normal',
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
                    max_in_view:0,
                    current_index: 0,
                    autoplay_method: 'next',
                    selector_width: 0,
                    max_index: 0,
                    timer: false,
                    action: false,
                    isScroll:false,
                    _inc_value:false,
                }, options);

                if(settings.type=='normal'){

                  settings.transition='slide';
                  settings.continuous=false;

                }else if(settings.type=='continuous'){

                  settings.transition='slide';
                  settings.continuous=true;

                }else{

                  settings.transition='fade';
                  settings.continuous=true;

                }

                // Save settings
                $this.data('Colousel', settings);


                var $Selectors = $this.find('.colousel-inner').children(settings.selector);

                // Calculate total
                settings.total = $Selectors.length;

                // Duplicate selectors if not enough
                if(settings.continuous){

                  if(settings.total>settings.max_in_view && settings.total<(settings.max_in_view*2)) $this.find('.colousel-inner').append($this.find('.colousel-inner').html());

                  settings.total=settings.total*2;
                  $Selectors = $this.find('.colousel-inner').children(settings.selector);

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
                }
                else if (settings.current_index === 0 && settings.autoplay_method == 'prev') {
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
            $this.find('.colousel-inner').css('width','');
            $Selectors.css('width','');
            settings.selector_width = $Selectors.outerWidth();

            // Loop through selectors
            $Selectors.each(function(index) {

                // Check height of current selector and set height if its larger
                if ($(this).outerHeight() > height) height = $(this).outerHeight();

                // Calculate left positoion
                left = $(this).data('ColouselIndex') * settings.selector_width;

                // Set left position
                $(this).css({left:left + 'px',width:$(this).css('width')});

                // If left position is less than colousel width incriment in selectors in view
                inview_check = inview_check + settings.selector_width;
                if (inview_check <= $this.find('.colousel-inner').width() + 10) settings.inview++;

            });

            // Set height for container
            $(this).css('height', height + 'px');

            // Set start and end positions
            settings.start_position = settings.selector_width * -1;
            settings.end_position = settings.selector_width * settings.total;

            // Set max_index
            settings.max_index = settings.total - settings.inview;

            // Check for device uses scroll
            if(!settings.scroll_amount[$STAN.device]){

              settings.isScroll=true;

              $this.addClass('scroll');

              $this.find('.colousel-inner').css('width',(settings.total*settings.selector_width)+'px');

              $Selectors.each(function(index) {

                  // Reset left position
                  $(this).css('left', (index * settings.selector_width) + 'px');

              });

            }else{

              settings.isScroll=false;

              $this.removeClass('scroll');

              if (settings.continuous) {

                if(settings.total==settings.inview){

                  $Selectors.each(function(index) {

                    // Reset left position
                    $(this).css('left', (index * settings.selector_width) + 'px');

                  });

                  $(this).addClass('start end');

                }else{

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

        set_index: function(index){

          var settings = $(this).data('Colousel');
          var direction = false;
          var inc_value = 0;

          if(index>settings.current_index){
            direction='next';
            inc_value=index-settings.current_index;
          }else if(index<settings.current_index){
            direction='prev';
            inc_value=settings.current_index-index;
          }

          if(direction){
            settings._inc_value=inc_value;
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

            if(settings._inc_value){
              inc_value=settings._inc_value;
              settings._inc_value=false;
            }else{
              inc_value = settings.scroll_amount[$STAN.device];
            }

            if (!inc_value) inc_value=1;

            if (!settings.continuous) {

                // Incriment current position

                var diff = 0;

                if (direction == 'next') {
                    settings.current_index = settings.current_index + inc_value;
                    if (settings.current_index > settings.max_index) {
                        diff = settings.current_index - settings.max_index;
                        settings.current_index = settings.max_index;
                    }

                }
                else {
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


            if (((settings.continuous && settings.total>settings.inview) || (settings.current_index < settings.max_index && direction == 'next') || (settings.current_index > 0 && direction == 'prev')) && !settings.action && !settings.isScroll) {

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

        slide: function(left_modifier){

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

        fade: function(left_modifier){

          // Load settings
          var settings = $(this).data('Colousel');

          // Set this
          var $this = $(this);
          var $Selectors = $this.find('.colousel-inner').children(settings.selector);

          $this.find('.colousel-inner').animate({
              opacity:0
          }, settings._speed,function(){

            $Selectors.each(function(){
              $(this).css('left',left_modifier + '=' + settings._distance + 'px');
            });

            $this.find('.colousel-inner').animate({
              opacity:1
            }, settings._speed);

          });

          setTimeout(function() {

              // Set action
              settings.action = false;

              methods.resize.apply($this);

              // Reset autoplay timer
              methods.autoplay.apply($this);


          }, (settings._speed*2) + 50);

        },

        next: function() {

            methods.move.apply($this, ['next', true]);

        },

        prev: function() {

            methods.move.apply($this, ['prev', true]);

        }

    };

    $.fn.Colousel = function(method) {

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

/* ========================================================================
 * STAN Utils: DOMovr
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


    // Define Methods
    var methods = {

        init: function(options) {

            // Save selector in array
            $(this.selector).each(function(){

                Selectors.push( $(this) );

            });

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

/* ========================================================================
 * STAN Utils: Filter
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
            methods.filter.apply(this, [false]);

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
                $(this).addClass('sa-filter');

                // Set this
                var $this = $(this);
                var i, layer;

                // Set Options
                var settings = $.extend({
                    selector: 'div',
                    activeClass: 'active',
                    inactiveClass: 'inactive',
                    setNav: false,
                    navHolder: '.filternav',
                    navHTML: '<li data-tag="{tag}">{tag} <span>{matches}</span><i class="sa-on fa fa-times"></i><i class="sa-off fa fa-check"></i></li>',
                    resultsPerPage: {
                        xs: 4,
                        sm: 6,
                        md: 8,
                        lg: 10
                    },
                    currentTags: [],
                    currentPage: 1,
                }, options);

                // Save settings
                $this.data('Filter', settings);

                // set Navigation
                if (settings.setNav) methods.setNav.apply(this);

                // Update matches
                methods.getMatches.apply(this);

                // Set active classes from hash
                methods.getHash.apply(this);

                // Do filter
                methods.filter.apply($this);

                // Add click listeners to navigation
                $(settings.navHolder).find('[data-tag]').click(function() {

                    // Update filter
                    methods.updateTags.apply($this, [$(this)]);

                });

                // Add click listeners to load more
                $this.find('.sa-load').click(function() {

                    // Incriment current page
                    settings.currentPage++;

                    // Update filter
                    methods.filter.apply($this);

                    // Remove focus from button
                    $(this).blur();

                });

                // Set hashchange event
                $(window).on('hashchange', function() {

                    // Reset pages to 1
                    settings.currentPage = 1;

                    // Update filter
                    methods.getHash.apply($this);

                });

                // Show filter holder
                setTimeout(function() {
                    $this.css('visibility', 'visible');
                }, 500);

            });

        },

        updateTags: function(tag) {

            // Get settings and set this
            var settings = $(this).data('Filter');
            var $this = $(this);

            // Tigger pre filter event
            $(this).trigger('post.sa.filter', [settings]);

            // Check if tag is in currentTags
            var index = settings.currentTags.indexOf(tag.attr('data-tag'));

            if(index>=0){

                // Remove tag
                settings.currentTags.splice(index, 1);

            }else{

                // Add tag
                settings.currentTags.push(tag.attr('data-tag'));

            }

            // Update hash
            window.location.hash=settings.currentTags.join('|').replace(/ /g,'+');

        },

        getHash:function(){

            // Get settings and set this
            var settings = $(this).data('Filter');
            var $this = $(this);

            // Declare some vars
            var x;

            // Get tags from hash and explode at pipes
            var tags=window.location.hash.substring(1).replace(/\+/g,' ').split("|");

            // Reset currentTags
            settings.currentTags=[];

            // Clear active classes
            $(settings.navHolder).find("[data-tag]").removeClass('active');

            // If tags is set
            if(tags[0]){

                for(x in tags){

                    // Add active class to nav element
                    $(settings.navHolder).find("[data-tag='"+tags[x]+"']").addClass('active');

                    // Add tag to currentTags array
                    settings.currentTags.push(tags[x]);

                }

            }

            // Do filter
            methods.filter.apply($this);

        },

        filter: function() {

            // Get settings and set this
            var settings = $(this).data('Filter');
            var $this = $(this);

            // Declare some vars
            var display, tags, x;

            // Set maximum results
            var Results = settings.resultsPerPage[$STAN.device] * settings.currentPage;

            // Set matches to zero
            var matches = 0;

            // Loop through selectors
            $this.find(settings.selector).each(function(index) {

                // Get selectors tags
                tags = $(this).attr('data-tags').split(",");

                // Set display to false
                display = false;

                // If no filters are set - set display to true
                if (!settings.currentTags.length) display = true;

                for (x in tags) {

                    // If selector has active filter - set display to true
                    if (settings.currentTags.indexOf(tags[x]) >= 0) display = true;

                }

                // Incriment matches if display=true
                if (display) matches++;

                // Add/remove activate and inactive classes from filters depending on display
                if (display && matches <= Results) {
                    $(this).addClass(settings.activeClass).removeClass(settings.inactiveClass);
                } else {
                    $(this).removeClass(settings.activeClass).addClass(settings.inactiveClass);
                }

            });

            // Show/hide load more button depending on number of results
            if (matches <= Results) {
                $this.find('.sa-load').css('display', 'none');
            } else {
                $this.find('.sa-load').css('display', 'block');
            }

            // Tigger post filter event
            $(this).trigger('post.sa.filter', [settings]);

        },

        setNav: function() {

            // Get settings and set this
            var settings = $(this).data('Filter');
            var $this = $(this);

            // Set tags array
            var Tags = [];

            // Declare some vars
            var html, tags, regexp, x;

            // Loop through selectors and get all tags
            $this.find(settings.selector).each(function() {

                // Get tags from attribute
                tags = $(this).attr('data-tags').split(",");

                for (x in tags) {

                    // Add tag to array if not already added
                    if (Tags.indexOf(tags[x]) < 0) Tags.push(tags[x]);

                }

            });

            // Sort tags in alphabetical order
            Tags.sort();

            // Set regexp for html tag replace
            regexp = new RegExp('{tag}', 'g');

            // Loop though tags
            for (x in Tags) {

                // Replace tag name in HTML string
                html = settings.navHTML.replace(regexp, Tags[x]);

                // Add HTML to nav
                $(settings.navHolder).append(html);

            }

        },

        getMatches: function() {

            // Get settings and set this
            var settings = $(this).data('Filter');
            var $this = $(this);

            // Loop through navigation and update matches totals
            $(settings.navHolder).find('[data-tag]').each(function() {

                $(this).find('span').text($this.find('[data-tags*="' + $(this).attr('data-tag') + '"]').length);

            });

        }

    };

    $.fn.Filter = function(method) {

        if (methods[method]) {

            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

        } else if (typeof method === 'object' || !method) {

            return methods.init.apply(this, arguments);

        } else {

            $.error('Method ' + method + ' does not exist on jQuery.Datatable');

        }

    };

}(jQuery, $STAN));

/* ========================================================================
 * STAN Utils: FixedSize
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

    'use strict';

    // Define Global Vars
    var Selectors = [];

    // Resize Listener
    $(window).resize(function() {

        if (!Selectors.length) return;

        $(Selectors).each(function() {

            // Resize check
            methods.fix.apply(this);

        });

    }).resize();


    // Define Methods
    var methods = {

        init: function(options) {

            // Save selector in array
            $(this.selector).each(function(){

                Selectors.push( $(this) );

            });

            // Iterate Through Selectors
            return this.each(function() {

                // Set this
                var $this = $(this);

                // Set Options
                var settings = $.extend({
                    selector: 'div',
                    devices: {
                        xs: 0,
                        sm: 0,
                        md: 0,
                        lg: 0
                    }
                }, options);

                // Save settings
                $this.data('FixedSize', settings);

                // Do fix
                methods.fix.apply(this);

            });

        },

        fix: function() {

            var settings = $(this).data('FixedSize');

            var split = settings.devices[$STAN.device];

            // Reset height of elements
            $(this).find(settings.selector).css('height', 'auto');

            // If split value is set
            if (split) {

                $(this).each(function() {

                    var h = 0;
                    var t = [];

                    $(this).find(settings.selector).each(function(index) {

                        if ($(this).outerHeight() > h) h = $(this).outerHeight();
                        t.push(this);

                        if ((index + 1) % split === 0) {
                            for (var x in t) $(t[x]).css('height', h + 'px');
                            h = 0;
                            t = [];
                        }

                    });

                    // Check for uncomplete row
                    if (h) {
                        for (var x in t) $(t[x]).css('height', h + 'px');
                    }

                });

                // Inititate event trigger
                $(this).trigger('resize.sa.fixedsize', [settings]);

            }

        }

    };

    $.fn.FixedSize = function(method) {

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

/* ========================================================================
 * STAN Utils: Popup
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
        $("[data-toggle='popup.show']").click(function() {

            methods.set_src.apply($($(this).attr('data-target')), [$(this).attr('data-src')]);

            return methods.show.apply($($(this).attr('data-target')));

        });

        // Hide
        $("[data-toggle='popup.hide']").click(function() {

            return methods.hide.apply($($(this).attr('data-target')));

        });

        // Toggle
        $("[data-toggle='popup.toggle']").click(function() {

            methods.set_src.apply($($(this).attr('data-target')), [$(this).attr('data-src')]);

            return methods.toggle.apply($($(this).attr('data-target')));

        });

    });


    // Define Methods
    var methods = {

        init: function(options) {

            // Save selector in array
            $(this.selector).each(function(){

                Selectors.push( $(this) );

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


                // Save settings
                $this.data('PopUp', settings);

                // Scroll settings
                var _scroll = (settings.scroll) ? 'yes' : 'no';
                var _class = (settings.scroll) ? '' : 'no-scroll';

                // Set HTML/iFrame/Classes
                if (settings.type == 'iframe') {

                    $this.find('.popup-display').addClass(_class);
                    $this.find('.popup-display').html("<iframe src='about:blank' class='" + _class + "' style='width:100%;height:100%;' seamless frameborder='0' scrolling='" + _scroll + "'></iframe>");

                }
                else {

                    $this.find('.popup-display').addClass(_class);

                }

                // Set close listener
                $this.click(function() {

                    methods.hide.apply($this);

                });

                $this.find('.popup-display').click(function(event) {

                    event.stopPropagation();

                });

                // Show if open and allowed on current device
                if (settings.open && settings.devices[$('body').attr('data-current-device')]) {

                    $(this).css('display', 'block');

                }

                // Do resize
                methods.resize.apply(this);

            });

        },

        show: function() {

            var settings = $(this).data('PopUp');

            if (!settings.open) {

                if (settings.devices[$STAN.device]) {

                    // Set iFrame source
                    $(this).find('iframe').attr('src', settings.src);

                    // Display Popup
                    $(this).css('display', 'block');

                    // Set open to true
                    settings.open = true;

                    // Trigger
                    $(this).trigger('show.sa.popup', [settings]);

                    // Return false to stop default action
                    return false;

                }
                else {

                    // Return true to allow default action
                    return true;

                }

            }
            else {

                return false;

            }

        },

        hide: function() {

            var settings = $(this).data('PopUp');

            if (settings.open) {

                // Close Popup
                $(this).css('display', 'none');

                // Unset iFrame src
                if (settings.type == 'iframe') $(this).find('iframe').attr('src', 'about:blank');

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

            if (w > settings.width) w = settings.width;
            if (h > settings.height) h = settings.height;

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
            }
            else if (settings.devices[$STAN.device] && settings.reopen && settings.auto_reopen) {
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

        }
        else if (typeof method === 'object' || !method) {

            return methods.init.apply(this, arguments);

        }
        else {

            $.error('Method ' + method + ' does not exist on jQuery.Datatable');

        }

    };

}(jQuery, $STAN));

/* ========================================================================
 * STAN Utils: PredInput
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

    'use strict';

    // Define Methods
    var methods = {

        init: function(options) {

            // Iterate Through Selectors
            return this.each(function(index) {

                // Set this
                var $this = $(this);

                // Set Options
                var settings = $.extend({

                    search_url: '',
                    http_request: 'GET',
                    data: [],
                    searching: false

                }, options);

                // Save settings
                $this.data('Predinput', settings);

                // Turn off autocomplete on input box
                $this.find('input').attr('autocomplete', 'off');

                // Add Key press listeners
                $this.find('input').keyup(function(event) {

                    methods.keyup.apply($this, [event]);

                });

                // Stop return from submitting the form
                $this.find('input').keydown(function(event) {

                    if (event.keyCode == 13) event.preventDefault();

                });

                // Clear search
                $this.find('.clear').click(function(event) {

                    $this.find('input').val('');
                    $(this).css('display', 'none');
                    methods.hide_results.apply($this);
                    $this.find('input').focus();

                    // Trigger
                    $this.trigger('clear.sa.predinput', [settings]);

                });

                // Stop propagtion on click
                $this.click(function(event) {

                    event.stopPropagation();

                });

                // Hide when off click
                $('body').click(function() {

                    methods.hide_results.apply($this);

                });

            });

        },

        keyup: function(e) {

            // Load settings
            var settings = $(this).data('Predinput');

            // Set objects
            var $this = $(this);
            var $res = $(this).find('.results');

            // Check for down, up and return keys
            if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13) {

                // Get current index
                var index = parseInt($res.find('ul').attr('data-index'));

                if (e.keyCode == 40) { // down

                    index++;
                    if (index == $res.find('ul li').length) index--;

                }
                else if (e.keyCode == 38) { // up

                    index--;
                    if (index < 0) index = 0;

                }
                else if (e.keyCode == 13) {

                    methods.hide_results.apply($this);

                    // Trigger
                    $this.trigger('selected.sa.predinput', [settings]);

                }

                // Save index
                $res.find('ul').attr('data-index', index);

                // Get object for current index
                var $index = $res.find('ul li:nth-child(' + (index + 1) + ')');

                // Remove active class
                $res.find('ul li').removeClass('active');

                // Add active class to
                $index.addClass('active');

                // Set search string
                $this.find('input').val($index.text());

            }
            else {

                if (!settings.searching) {
                    settings.searching = true;
                    methods.search.apply($this);
                }
                else {
                    settings.search_again = true;
                }

            }

            if ($this.find('input').val()) {
                $this.find('.clear').css('display', 'block');
            }
            else {
                $this.find('.clear').css('display', 'none');
            }

        },

        search: function() {

            // Load settings
            var settings = $(this).data('Predinput');

            // Set objects
            var $this = $(this);
            var $res = $(this).find('.results');

            // Clear results HTML
            $res.html('').css('display', 'block');

            // Do seach
            $.ajax({

                url: settings.search_url,
                cache: false,
                type: settings.http_request,
                data: {
                    search: $(this).find('input').val(),
                    data: JSON.stringify(settings.data)
                }

            }).done(function(results) {

                $res.html(results);

                $res.find('ul').attr('data-index', '-1');

                $res.find('li').each(function(index) {
                    $(this).attr('data-index', index);
                });

                $res.find('li').mouseover(function() {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    $(this).parent().attr('data-index', $(this).attr('data-index'));
                });

                $res.find('li').click(function() {
                    $this.find('input').val($(this).text());
                    methods.hide_results.apply($this);

                    // Trigger
                    $this.trigger('selected.sa.predinput', [settings]);

                });

                settings.searching = false;

                if (settings.search_again) {
                    settings.search_again = false;
                    settings.searching = true;
                    methods.search.apply($this);
                }

                // Trigger
                $this.trigger('search.sa.predinput', [settings]);

            });

        },

        hide_results: function() {
            $(this).find('.results').css('display', 'none');
        }

    };

    $.fn.Predinput = function(method) {

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

                if( $this.find(settings.selector).length ){

                  Selectors.push($this);

                }

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
                if(window.location.hash!='/'){
                    window.location.hash = '/';
                }
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

/* ========================================================================
 * STAN Utils: SlideOut
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

                var settings = $(this).data('slideOut');

                if (!settings.devices[$STAN.device] && settings.open) {
                    settings.reopen = true;
                    methods.hide.apply(this);
                }
                else if (settings.devices[$STAN.device] && settings.reopen && settings.auto_reopen) {
                    settings.reopen = false;
                    methods.show.apply(this);
                }

            });

    }).resize();

    // Click Listeners
    $(window).ready(function() {

        // Show
        $("[data-toggle='slideout.show']").click(function() {

            return methods.show.apply($($(this).attr('data-target')));

        });

        // Hide
        $("[data-toggle='slideout.hide']").click(function() {

            return methods.hide.apply($($(this).attr('data-target')));

        });

        // Toggle
        $("[data-toggle='slideout.toggle']").click(function() {

            return methods.toggle.apply($($(this).attr('data-target')));

        });

    });


    // Define Methods
    var methods = {

        init: function(options) {

            // Save selector in array
            $(this.selector).each(function(){

                Selectors.push( $(this) );

            });

            // Iterate Through Selectors
            return this.each(function(index) {

                // Set this
                var $this = $(this);

                // Set Options
                var settings = $.extend({
                    pos: 'left',
                    open: false,
                    speed: 300,
                    auto_reopen: true,
                    auto_close: false,
                    devices: {
                        xs: true,
                        sm: true,
                        md: true,
                        lg: true
                    }
                }, options);


                // Save settings
                $this.data('slideOut', settings);

                $this.addClass('slideout slideout-' + settings.pos);


                // Hide if not open or if not set for current device
                if (!settings.open || !settings.devices[$STAN.device]) {

                    // Set CSS to closed position
                    $this.css(methods.getPosValue.apply(this, [settings.pos]));

                }
                else {

                    // Turn on display
                    $this.css({
                        display: 'block'
                    });

                }

                // Set Mouseover listeners
                if (settings.auto_close) {

                    $(this).mouseover(function() {
                        methods.clearTmr.apply(this);
                    }).mouseout(function() {
                        methods.setTmr.apply(this);
                    });

                }

            });

        },

        getPosValue: function(pos) {

            var val;

            if (pos == 'top' || pos == 'bottom') val = $(this).outerHeight();
            if (pos == 'left' || pos == 'right') val = $(this).outerWidth();

            var css = {}
            css[pos] = val * -1;

            return css;

        },

        clearTmr: function() {

            var settings = $(this).data('slideOut');
            clearTimeout(settings.tmr);

        },

        setTmr: function() {

            var settings = $(this).data('slideOut');

            methods.clearTmr.apply(this);

            var $this = this;
            settings.tmr = setTimeout(function() {
                methods.hide.apply($this);
            }, parseInt(settings.auto_close) * 1000);

        },

        show: function() {

            var settings = $(this).data('slideOut');

            if (settings.devices[$STAN.device]) {

                if (!settings.open) {

                    // Recalculate hidden position incase the height of div has changed
                    var css = methods.getPosValue.apply(this, [settings.pos]);
                    css['display'] = 'block';
                    $(this).css(css);

                    // Set 0 position
                    var css = {}
                    css[settings.pos] = 0;

                    // Animate
                    $(this).animate(css, settings.speed, function() {

                        // Set open to true			
                        settings.open = true;

                        // Trigger
                        $(this).trigger('show.sa.slideout', [settings]);

                    });

                }

                // Set auto close timer
                if (settings.auto_close) methods.setTmr.apply(this);


                // Return false to stop default action
                return false;

            }
            else {

                // Return true to allow default action
                return true;

            }

        },

        hide: function() {

            var settings = $(this).data('slideOut');

            if (settings.open) {

                // Get CSS data
                var css = methods.getPosValue.apply(this, [settings.pos]);

                // Animate
                $(this).animate(css, settings.speed, function() {
                    $(this).css({
                        display: 'none'
                    });

                    // Set open to false
                    settings.open = false;

                    // Trigger
                    $(this).trigger('hide.sa.slideout', [settings]);

                });

            }

            // Return false to stop default action
            return false;

        },

        toggle: function() {

            var settings = $(this).data('slideOut');

            if (settings.open) return methods.hide.apply(this);
            else return methods.show.apply(this);

        }

    };

    $.fn.SlideOut = function(method) {

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

        // Autoplay set
        $("body").on("click","[data-toggle='slider.autoplay-set']",function() {

          var target=!! $(this).attr('data-target') ? $($(this).attr('data-target')) : $(this).parents('.slider');

          methods.setAutoplay.apply(target, [true]);

        });

        // Autoplay clear
        $("body").on("click","[data-toggle='slider.autoplay-clear']",function() {

          var target=!! $(this).attr('data-target') ? $($(this).attr('data-target')) : $(this).parents('.slider');

          methods.clearAutoplay.apply(target);

        });

    });


    // Define Methods
    var methods = {

        init: function(options) {

            // Add selector to options
            options.selector = this.selector;

            // Iterate Through Selectors
            return this.each(function(index) {

                // Save selector in array
                Selectors.push($(this));

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
                $this.find("[data-role='slider.counter'] .total").text(settings.total);

                // Hide controls if less than 2 frames
                if(settings.total<2){

                  $this.find("[data-toggle='slider.next']").css('display','none');
                  $("[data-target='" + settings.selector + "'][data-toggle='slider.next']").css('display','none');

                  $this.find("[data-toggle='slider.prev']").css('display','none');
                  $("[data-target='" + settings.selector + "'][data-toggle='slider.prev']").css('display','none');

                  $this.find("[data-role='slider.navigation']").css('display','none');
                  $("[data-target='" + settings.selector + "'][data-role='slider.navigation']").css('display','none');

                  $this.find("[data-role='slider.counter']").css('display','none');
                  $("[data-target='" + settings.selector + "'][data-role='slider.counter']").css('display','none');

                }


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

                // Set dot buttons if navigation container is empty
                if(!$this.find("[data-role='slider.navigation']").html()){
                    for (i = 0; i < settings.total; i++) {
                        $this.find("[data-role='slider.navigation']").append('<span data-toggle="slider.set" data-index="'+i+'"></span>');
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
                if (settings.autoplay_break_on_click && isClick) methods.clearAutoplay.apply($this);

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
                if (settings.autoplay_break_on_click) methods.clearAutoplay.apply($this);

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

              // Animation complete
              methods.animate_complete.apply($this);

              // Tigger post move event
              $this.trigger('post-move.sa.slider', [settings]);

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
            $this.find("[data-role='slider.counter'] .current").text(settings.currentIndex + 1);

            // Add active classes
            $this.find("[data-toggle='slider.set'][data-index='" + settings.currentIndex + "']").addClass('active');
            $("[data-target='" + settings.selector + "'][data-toggle='slider.set'][data-index='" + settings.currentIndex + "']").addClass('active');

            // Set Timer
            methods.setAutoplay.apply($this,[false]);

            // Set action to false
            settings.action = false;

        },

        setAutoplay: function(setAutoPlay){

          var settings = $(this).data('Slider');
          var $this = $(this);
          var delay=1;

          if(setAutoPlay && !settings.autoplay){

            // Turn autoplay on
            settings.autoplay = true;

            // Trigger event
            $(this).trigger('autoplay-set.sa.slider', [settings]);

          }else{
            delay=settings.autoplay_delay
          }

          if (settings.autoplay && settings.total>1) {

              // Set active class on clear
              $this.find("[data-toggle='slider.autoplay-clear']").addClass('active');
              $("[data-target='" + settings.selector + "'][data-toggle='slider.autoplay-clear']").addClass('active');

              // Remove active classes from set
              $this.find("[data-toggle='slider.autoplay-set']").removeClass('active');
              $("[data-target='" + settings.selector + "'][data-toggle='slider.autoplay-set']").removeClass('active');

              settings.timer = setTimeout(function() {

                  methods.move.apply($this, ['next', false]);

              }, delay);

          }else{

            methods.clearAutoplay.apply($this);

          }

        },

        clearAutoplay: function(){

          var settings = $(this).data('Slider');
          var $this = $(this);

          if(settings.autoplay){

            // Trigger event
            $(this).trigger('autoplay-clear.sa.slider', [settings]);

          }

          if(settings.total > 1){

            // Set active class on set
            $this.find("[data-toggle='slider.autoplay-set']").addClass('active');
            $("[data-target='" + settings.selector + "'][data-toggle='slider.autoplay-set']").addClass('active');

            // Remove active classes from clear
            $this.find("[data-toggle='slider.autoplay-clear']").removeClass('active');
            $("[data-target='" + settings.selector + "'][data-toggle='slider.autoplay-clear']").removeClass('active');

          }

          settings.autoplay = false;

          clearTimeout(settings.timer);

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
                }).parent().closest('div').css({
                    height: fh + 'px'
                });

            } else {

                // Set height of main slider
                $this.css('height', settings.height[$STAN.device]);

                // Set height of frames
                $this.find('.frame').css({
                  height: settings.height[$STAN.device]
                }).parent().closest('div').css({
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

/* ========================================================================
 * STAN Utils: StickyFix
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

            methods.stick.apply(this);

        });

    }).resize();

    $(window).scroll(function() {

        if (!Selectors.length) return;

        $(Selectors).each(function() {

            methods.stick.apply(this);

        });

    }).scroll();


    // Define Methods
    var methods = {

        init: function(options) {

            var $this = this;

            // Set Options
            var settings = $.extend({
                top: 0,
                maxtop: false,
                maxscroll: 99999,
                sticky_class: '',
                stick_to: 'window',
                zindex:1000,
                devices: {
                    xs: true,
                    sm: true,
                    md: true,
                    lg: true
                },
                _css:{
                    top: $this.css('top'),
                    position: $this.css('position'),
                    zindex: $this.css('z-index')
                },
                _status: 'unstuck'
            }, options);

            // Save selector in array
            $(this.selector).each(function(){

                Selectors.push( $(this) );

            });

            // Iterate Through Selectors
            return this.each(function(index) {

                var placeholder = "sticky-" + $this.selector.substring(1) + "-" + index;

                $(this).after("<div class='sticky-placeholder' id='" + placeholder + "' style='display:none;height:" + $(this).height() + "px;'></div>");

                // Set Data
                settings.offset = $(this).offset();
                settings.placeholder = '#' + placeholder;

                // Save settings
                $(this).data('StickyFix', settings);

            });

        },

        stick: function() {

            var settings = $(this).data('StickyFix');

            var t = settings.offset.top - $(window).scrollTop();

            var maxtop;
            var maxscroll;
            var topscroll;
            var pos;

            if (t < settings.top && settings.devices[$STAN.device]) {

                if (typeof settings.maxtop === 'function') maxtop = settings.maxtop($(this),settings);
                else if (typeof settings.maxtop === 'number') maxtop = settings.maxtop;
                else maxtop = 99999;

                maxscroll = settings.maxscroll + maxtop;

                if ($(window).scrollTop() > maxtop) {

                    if( $(window).scrollTop()>maxscroll ){
                      pos = settings.top - ( maxscroll - maxtop );
                    }else{
                      pos = settings.top - ($(window).scrollTop() - maxtop);
                    }

                    $(this).css('top', pos + 'px');

                }
                else {

                    // Trigger
                    if (settings._status == 'unstuck') $(this).trigger('stuck.sa.stickyfix', [settings]);

                      $(this).addClass(settings.sticky_class).css({
                          'z-index': settings.zindex,
                          top: settings.top + 'px',
                          position: 'fixed'
                      });

                      settings._status='stuck';

                      $(settings.placeholder).css('display', 'block');

                      if (settings.stick_to == 'parent') $(this).css({
                          width: $(settings.placeholder).width() + 'px',
                          left: $(settings.placeholder).offset().left + 'px'
                      });



                }

            }
            else {

                // Trigger
                if (settings._status == 'stuck') $(this).trigger('unstuck.sa.stickyfix', [settings]);

                  $(this).removeClass(settings.sticky_class).css({
                      top: settings._css.top,
                      position: settings._css.position,
                      'z-index': settings._css.zindex
                  });

                  settings._status='unstuck';

                  $(settings.placeholder).css('display', 'none');

                  if (settings.stick_to == 'parent') $(this).css({
                      width: 'auto',
                      left: 'auto'
                  });



            }

        }

    };

    $.fn.StickyFix = function(method) {

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

//# sourceMappingURL=stan-utils.js.map