/* ========================================================================
 * STAN Utils: VAlign
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

	'use strict';

    var VAlign=function(){

        var margin;

        $('.valign-mid').each(function(){    

            margin=($(this).parent().height()-$(this).height())/2;
            $(this).css('margin-top',margin+'px');

        });

        $('.valign-btm').each(function(){    

            margin=$(this).parent().height()-$(this).height();
            $(this).css('margin-top',margin+'px');

        });

    };

    $(window).on('load resize',VAlign);

});