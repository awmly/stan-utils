/* ========================================================================
 * STAN Utils: HasIconBtn
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

  'use strict';

    var InsetOffset=function(){

        var padding;
        var width;
        var height;
        var side;
        var outset;

        $('.sa-inset,.sa-outset').each(function(){

            // Set side
            if($(this).hasClass('sa-right')) side='right';
            else side='left';

            // Reset inline css padding
            $(this).parent().css('padding-'+side,'');

            // Get offset
            padding=parseInt($(this).parent().css('padding-'+side));


            width=$(this).width();
            height=$(this).outerHeight();

            console.log(width);


            if( $(this).hasClass('sa-outset') ){

              $(this).parent().parent().css('padding-'+side,width+'px');
              $(this).css(side,'-'+width+'px');

            }else{

              $(this).parent().css('padding-'+side,(padding+width)+'px');
              $(this).css(side,padding+'px');

            }

            // Set margin top
            $(this).css('margin-top','-'+(height/2)+'px');

        });

    };

    $('.sa-inset,.sa-outset').each(function(){
      if($(this).parent().css('position')=='static') $(this).parent().addClass('relative');
    });

    $(window).on('load resize',InsetOffset);

});
