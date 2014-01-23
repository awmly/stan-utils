/* ========================================================================
 * STAN Utils: HasIconBtn
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

  'use strict';

    var InsetOffset=function(){

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
            width=$(this).outerWidth();

            // If width is zero (hidden) - use getSize to find its width
            if(!width) width=$STAN.getSize('clone',$(this)).width;

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

    $(window).on('load resize',InsetOffset);

});
