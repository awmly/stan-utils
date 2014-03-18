/* ========================================================================
 * STAN Utils: Card UI
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
            methods.position.apply(this);

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
                $(this).addClass('sa-cards');

                // Set this
                var $this = $(this);
                var i, layer;

                // Set Options
                var settings = $.extend({
                    selector:'div',
                    activeClass:'active',
                    animate:false,
                    cardsPerRow: { xs:1, sm:1, md:1, lg:1 }
                }, options);

                // Save settings
                $this.data('CardUI', settings);


                $this.find(settings.selector).each(function(){

                  $(this).css('position','absolute');

                  if(settings.animate) $(this).addClass('animate-card');

                });

                // Do position
                methods.position.apply(this);

                setTimeout(function(){ $this.css('visibility','visible'); },500);



            });

        },

        position: function() {

            // Get settings and set this
            var settings = $(this).data('CardUI');
            var $this = $(this);

            var NumCols=settings.cardsPerRow[$STAN.device];

            var Cols=[0,0,0,0,0,0,0,0,0,0,0,0];

            var width=$this.find(settings.selector).outerWidth();

            var x, col, left, top;

            $this.find(settings.selector+"."+settings.activeClass).each(function(){

              top=99999;

              for(x=0;x<NumCols;x++){

                if(Cols[x]<top){
                  top=Cols[x];
                  left=width*x;
                  col=x;
                }

              }

              $(this).css({ left:left+'px', top:top+'px' });
              Cols[col]+=$(this).outerHeight(true);

            });

            for(x=0;x<NumCols;x++){

              if(Cols[x]>top){
                top=Cols[x];
              }

            }

            $(this).css('height',top+'px');

        }

    };

    $.fn.CardUI = function(method) {

        if (methods[method]) {

            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

        } else if (typeof method === 'object' || !method) {

            return methods.init.apply(this, arguments);

        } else {

            $.error('Method ' + method + ' does not exist on jQuery.Datatable');

        }

    };

}(jQuery, $STAN));
