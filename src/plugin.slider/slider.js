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

            return methods.set.apply($($(this).attr('data-target')),[$(this).attr('data-index')]);

        });

    });


    // Define Methods
    var methods = {

        init: function(options) {

            // Save selector in array
            $(this.selector).each(function(){

                Selectors.push( $(this) );

            });

            // Add selector to options
            options.selector=this.selector;

            // Iterate Through Selectors
            return this.each(function(index) {

                // Set this
                var $this = $(this);
                var i;

                // Set Options
                var settings = $.extend({
                    aspect_ratio: 'fixed',
                    image_display: 'fit',
                    height:{
                      xs:100,
                      sm:100,
                      md:100,
                      lg:100
                    },
                    activeIndex:0,

                    animationType:'fade',
                    animationDuration:300,
                    animationEasing:'swing',
                    nextDelay:0,
                    currentDelay:0,

                    animationTypeText:'fade',
                    animationDurationText:300,
                    animationEasingText:'swing',
                    nextDelayText:0,
                    currentDelayText:0,

                    currentIndex:0,
                    nextIndex:0,
                    total:0,
                    action:false
                }, options);

                // Set total
                settings.total=$this.find('.bgr img').length;

                // Set currentIndex
                settings.currentIndex=settings.nextIndex=settings.activeIndex;

                // Save settings
                $this.data('Slider', settings);

                // Add aspect ratio class
                $this.addClass(settings.aspect_ratio);

                // Position cells
                if(settings.animationType=='fade'){

                  $this.find('.bgr .cell').css({ visibility:'hidden', opacity:0 });

                  $this.find('.bgr .cell').eq(settings.activeIndex).css({ visibility:'visible', opacity:1 });

                }

                // Set radio buttons
                for(i=0;i<settings.total;i++){
                  $this.find('.radio').append('<span></span>');
                }

                // Set radio button listener
                $this.find('.radio span').click(function(event) {

                    methods.set.apply($this, [$(this).index()]);

                });

                // Add load events
                $this.find('img').load(function(){

                  if(settings.aspect_ratio=='variable'){
                    methods.imgload.apply($this,[$(this)]);
                  }else{
                    methods.resize.apply($this);
                  }

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

            });

        },

        move: function(direction,isClick) {

          // Get settings and set this
          var settings = $(this).data('Slider');
          var $this = $(this);

          // Check slider is not currently in action
          if(!settings.action){

            // Set action to true
            settings.action=true;

            // Set indexes
            if(direction=='next'){
              settings.nextIndex=settings.currentIndex+1;
              if(settings.nextIndex==settings.total) settings.nextIndex=0;
            }else{
              settings.nextIndex=settings.currentIndex-1;
              if(settings.nextIndex<0) settings.nextIndex=settings.total-1;
            }

            // Animate
            methods.animate.apply($this);

          }

        },

        set: function(index){

          // Get settings and set this
          var settings = $(this).data('Slider');
          var $this = $(this);

          // Check slider is not currently in action
          if(!settings.action && index!=settings.currentIndex){

            // Set action to true
            settings.action=true;

            // Set nextIndex
            settings.nextIndex=parseInt(index);

            // Animate
            methods.animate.apply($this);

          }

        },

        animate: function(){

          // Get settings and set this
          var settings = $(this).data('Slider');
          var $this = $(this);

          // Get cells
          var $next=$this.find('.bgr .cell').eq(settings.nextIndex);
          var $current=$this.find('.bgr .cell').eq(settings.currentIndex);

          // Perform animate based on animation type
          if(settings.animationType=='fade'){

            methods.animate_fade.apply($this,[$next,$current]);

          }else if(settings.animationType=='slide'){

            methods.animate_slide.apply($this,[$next,$current]);

          }

        },

        animate_fade: function($next,$current){

          // Get settings and set this
          var settings = $(this).data('Slider');
          var $this = $(this);

          // Set pre move CSS
          $next.css('visibility','visible');

          // Animate
          $current.delay(settings.currentDelay).animate({ opacity:0 }, settings.animationDuration, settings.animationEasing);
          $next.delay(settings.nextDelay).animate({ opacity:1 }, settings.animationDuration, settings.animationEasing, function() {

            // Set post move CSS
            $current.css('visibility','hidden');

            // Animate complete
            methods.animate_complete.apply($this);

          });

        },

        animate_slide: function($next,$current){

          // Get settings and set this
          var settings = $(this).data('Slider');
          var $this = $(this);



        },

        animate_complete: function(){

          // Get settings and set this
          var settings = $(this).data('Slider');
          var $this = $(this);

          // Update index
          settings.currentIndex=settings.nextIndex;

          // Update radio buttons
          $this.find('.radio span').removeClass('active');
          $this.find('.radio span').eq(settings.currentIndex).addClass('active');

          // Update any external listeners
          $("[data-toggle='slider'][data-target='"+settings.selector+"']").removeClass('active');
          $("[data-toggle='slider'][data-target='"+settings.selector+"'][data-index='"+settings.currentIndex+"']").addClass('active');

          // Set action to false
          settings.action=false;

        },

        resize: function(){

          // Get settings and set this
          var settings = $(this).data('Slider');
          var $this = $(this);


          // Set vars to hold image with and height
          var iw=0;
          var ih=0;

          // Perform size fixes
          if(settings.aspect_ratio=='fixed'){

              // Set image width to auto to allow image to be native size
              $this.find('.bgr img').css('width','auto');

              // Get image max width and height
              $this.find('.bgr img').each(function(){
                if($(this).width()>iw) iw=$(this).width();
                if($(this).height()>ih) ih=$(this).height();
              });

              // Remove with auto
              $this.find('.bgr img').css('width','');

              // Calculate new height
              var h = ih * ($this.width() / iw);

              // Set height
              $this.css({height:h+'px'});

          }else{

              // Set slider height
              $this.css('height',settings.height[$STAN.device]+'px');

              // Loop through images - set width, height and margins
              $this.find('.bgr img').each(function(){

                methods.imgload.apply($this,[$(this)]);

              });

          }

        },

        imgload:function($image){

          // Get settings and set this
          var settings = $(this).data('Slider');
          var $this = $(this);


          // Set slider width and height
          var sw=$this.width();
          var sh=settings.height[$STAN.device];


          // Remove image size modifiers
          $image.removeClass('maxwidth maxheight');


          // Add image modifiers
          if(settings.image_display=='fit'){

            if( ($image.width()/$image.height()) > (sw/sh) ){
              $image.addClass('maxwidth');
            }else{
              $image.addClass('maxheight');
            }

          }else{

            if( ($image.width()/$image.height()) < (sw/sh) ){
              $image.addClass('maxwidth');
            }else{
              $image.addClass('maxheight');
            }

          }

          // Calculate margins
          var mt=($this.height()-$image.height())/2;
          var ml=($this.width()-$image.width())/2;


          // Set margins
          $image.css({ 'margin-top':mt+'px', 'margin-left':ml+'px' });

        }

    };

    $.fn.Slider = function(method) {

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
