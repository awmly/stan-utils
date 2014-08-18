/* ========================================================================
 * STAN Utils: Responsive Preload
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

    'use strict';

    var preloadImage = function (){

      $("img[data-src]").each(function(){

            if( !$(this).attr('src') ){
                $(this).attr('src', $(this).attr('data-src') );
                $(this).attr('data-src','');
            }

      });

    };

    var responsiveImage = function(){

        $("[data-resp-img='true']").each(function(){

          var src = $(this).attr('data-'+$STAN.device);

          if( $(this).attr('data-src') ){
            $(this).attr('data-src',src);
          }else{
            $(this).attr('src',src);
          }

        });

    };

    $(window).load(function(){

      responsiveImage();
      preloadImage();

    });

    $('body').on('active.sa.stan', responsiveImage );

});
