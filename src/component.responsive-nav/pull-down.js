/* ========================================================================
 * STAN Utils: Pull Down Navigation
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

    'use strict';

    var OpenMobile = function(){

        $('.pull-nav').attr('data-open',1);

        $('.pull-nav nav').collapse('show');

        $('.pull-nav-mask').css({
            display: 'block',
            opacity: 0
        });
        $('.pull-nav-mask').animate({
            opacity: 1
        }, 200, "swing");

    };

    var CloseMobile = function() {

        $('.pull-nav').attr('data-open', 0);

        $('.pull-nav nav').collapse('hide');

        $('.pull-nav-mask').animate({
            opacity: 0
        }, 200, "swing", function() {
            $('.pull-nav-mask').css('display', 'none');
        });

    };

    $(window).on('orientationchange',function(){

      CloseMobile();

    });


    $STAN.on('resize',function() {

        var w = $STAN.windowWidth;
        var h = $STAN.windowHeight;
        var breakpoint = (typeof $('.pull-nav').attr('data-breakpoint')!=='undefined') ? $('.pull-nav').attr('data-breakpoint') : 992;

        $('.pull-nav, .pull-nav-load').removeClass('desktop mobile');

        if (w < breakpoint) {

            $('.pull-nav, .pull-nav-load').addClass('mobile');

            $('.pull-nav-mask').css({height:h-$('header').height() + 'px', top:$('header').height()+'px'});

            $('.pull-nav nav').addClass('collapse');

            if( $('.pull-nav').attr('data-open')!='1') $('.pull-nav nav').css('height',0).removeClass('in');

            $('.pull-nav ul').css({"max-height":h-$('header').height()-60 + 'px'});

        } else {

            $('.pull-nav').attr('data-open', 0).addClass('desktop');

            $('.pull-nav nav').addClass('in').css({
                height: ''
            });

            $('.pull-nav-mask').css('display', 'none');

        }

    });

    $('.pull-nav-load').click(function(event) {

        if( $('.pull-nav').attr('data-open')=='1'){
            CloseMobile();
        }else{
            OpenMobile();
        }

        event.stopPropagation();

    });

    $('.pull-nav-mask').click(function(event) {

        CloseMobile();

        event.stopPropagation();

    });



    $('.pull-nav-mask').on('wheel mousewheel touchmove', function(event) {

        event.preventDefault();

    });

});
