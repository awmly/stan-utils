/* ========================================================================
 * STAN Utils: ImgResponsive
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

    'use strict';

    var scrollSpy = function() {

        var activeAt;
        var scrollTop=$(window).scrollTop();

        $("[data-scroll-spy]").each(function(){

            activeAt=$(this).attr("data-scroll-spy");

            if( !isNaN(parseFloat(activeAt)) && isFinite(activeAt) ){ // is number

                activeAt=parseInt(activeAt);

            }else{ // is selector

                activeAt=eval(activeAt);

            }

            if(scrollTop>activeAt){
                $(this).addClass('active');
            }else{
                $(this).removeClass('active');
            }

        });

    };

    $(window).scroll(scrollSpy);

    scrollSpy();

});
