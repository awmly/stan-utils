/* ========================================================================
 * STAN Utils: Responsive Preload
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

  'use strict';

  $STAN.responsiveImages=function(){

    $("[data-resp-img='true']").each(function(){

      var src = $(this).attr('data-base')+$(this).attr('data-'+$STAN.device);

      if( $(this).attr('defer-src') ){
        $(this).attr('defer-src',src);
      }else if( $(this).attr('delay-src') ){
        $(this).attr('delay-src',src);
      }else{
        $(this).attr('src',src);
      }

    });

  };

  $STAN.loadDelayedImages=function(){

    $("img[delay-src]").each(function(){

        if( $(this).attr('delay-src') ){
            $(this).attr('src', $(this).attr('delay-src') );
            $(this).attr('delay-src','');
        }

    });

  };

  $STAN.loadDeferedImages=function($target){

      $target.find("img[defer-src]").each(function(){

        if( $(this).attr('defer-src') ){
            $(this).attr('src', $(this).attr('defer-src') );
            $(this).attr('defer-src','');
        }

      });

  };

  $(".load-defered-img").click(function(){

      var $target=!! $(this).attr('data-target') ? $($(this).attr('data-target')) : $(this);

      $STAN.loadDeferedImages($target);

  });

  $('body').on('active.sa.stan', $STAN.responsiveImages );

  $STAN.responsiveImages();
  $STAN.loadDelayedImages();

}(jQuery, $STAN));
