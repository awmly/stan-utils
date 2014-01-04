/* ========================================================================
 * STAN Utils: Alerts
 * Author Andrew Womersley
 * ======================================================================== */

$(function() {

	'use strict';

    var Alerts=function(){

        var padding;

        $('.alert.has-icon, .alert.has-btn').each(function(){    

            if($(this).find('.btn').length){
                padding=$(this).find('.btn').outerWidth()+30;
            }else{
                padding=$(this).find('i').outerWidth()+30;
            }
            
            if($(this).hasClass('icon-right') || $(this).hasClass('btn-right')){
                $(this).css('padding-right',padding+'px');
            }else{
                $(this).css('padding-left',padding+'px');
            }

        });

    };

    $(window).on('load resize',Alerts);

});