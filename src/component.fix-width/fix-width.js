/* ========================================================================
 * STAN Utils: FixWidth
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

	'use strict';

    var FixWidth=function(){

        var width;

        $('.fix-width').each(function(){

            width=0;

            $(this).css({position:'absolute', display:'block', visibility:'hidden', width:'1000px'});
            
            $(this).children('*').css({display:'inline-block'}).each(function(){
                if($(this).outerWidth()>width) width=$(this).outerWidth();
            }).css({display:''});

            $(this).css({position:'', display:'', visibility:'', width:width+'px'});

        });

    };

    $(window).on('load resize',FixWidth);
    $('.fix-width').parent().on('mouseover',FixWidth);

});