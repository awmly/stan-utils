/* ========================================================================
 * STAN Utils: HasIconBtn
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

	'use strict';

    var HasIconBtn=function(){

        var padding;
        var margin;
        var side;
        var offset;

        $('.has-icon, .has-btn').each(function(){

            if($(this).hasClass('has-right')) side='right';
            else side='left';

            offset=!! $(this).attr('data-offset-pos') ? $(this).attr('data-offset-pos') : parseInt($(this).css('padding-'+side));

            if($(this).find('.btn').length){
                padding=$(this).find('.btn').outerWidth()+10+parseInt(offset);
                margin=$(this).find('.btn').outerHeight()/2;
            }else{
                padding=$(this).find('i').outerWidth()+10+parseInt(offset);
                margin=$(this).find('i').outerHeight()/2;
            }



            if($(this).attr('data-pad-parent')){

              $(this).parent().css('padding-'+side,padding+'px');
              $(this).find('.btn,i').css(side,'-'+padding+'px');

            }else{

              $(this).css('padding-'+side,padding+'px');
              $(this).find('.btn,i').css(side,offset+'px');

            }

            $(this).find('.btn,i').css('margin-top','-'+margin+'px');

        });

    };

    $(window).on('load resize',HasIconBtn);

});
