/* ========================================================================
 * STAN Utils: Swiper
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

    'use strict';

    // Define Global Vars
    var Selectors = [];

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
                    left:false,
                    right:false,
                    up:false,
                    down:false,
                    sensitivity:'medium'
                }, options);

                // Save settings
                $this.data('Swiper', settings);

                $this.on('touchstart mousedown',function(event){

                  var settings=$this.data('Swiper');

                  var coX=!! event.pageX ? event.pageX : event.originalEvent.touches[0].pageX;
                  var coY=!! event.pageY ? event.pageY : event.originalEvent.touches[0].pageY;

                  settings.coX=coX;
                  settings.coY=coY;
                  settings.swiped=false;

                });

                $this.on('touchmove mouseup',function(event){

                  var settings=$this.data('Swiper');

                  var coX=!! event.pageX ? event.pageX : event.originalEvent.touches[0].pageX;
                  var coY=!! event.pageY ? event.pageY : event.originalEvent.touches[0].pageY;

                  var distX=settings.coX-coX;
                  var distY=settings.coY-coY;

                  var dirX, dirY, dir, dist, size;

                  if(distX<0){
                    dirX='right';
                    distX=distX*-1;
                  }else{
                    dirX='left';
                  }

                  if(distY<0){
                    dirY='down';
                    distY=distY*-1;
                  }else{
                    dirY='up';
                  }

                  if(distX>distY){
                    dir=dirX;
                    dist=distX;
                    size=$(this).width();
                  }else{
                    dir=dirY;
                    dist=distY;
                    size=$(this).height();
                  }

                  if(settings[dir] && !settings.swiped){

                    var percent=(dist/size)*100;

                    if(percent>80 || (percent>50 && settings.sensitivity=='medium') || (percent>20 && settings.sensitivity=='low')){

                      settings.direction=dir;
                      settings.distance=dist;

                      $(this).trigger('swipe.sa.swiper', [settings]);
                      $(this).trigger(dir+'.sa.swiper', [settings]);
                      settings.swiped=true;

                    }

                    event.preventDefault();
                    return false;

                  }else{

                    return true;

                  }


                });

            });

        }


    };

    $.fn.Swiper = function(method) {

        if (methods[method]) {

            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

        } else if (typeof method === 'object' || !method) {

            return methods.init.apply(this, arguments);

        } else {

            $.error('Method ' + method + ' does not exist on jQuery.Datatable');

        }

    };

}(jQuery, $STAN));
