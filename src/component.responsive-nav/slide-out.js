/* ========================================================================
 * STAN Utils: Responsive Navigation
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

    'use strict';

    var CloseMobile = function() {

        $('.slide-nav').animate({
            left: '-100%'
        }, 200, "swing", function() {
            $('.slide-nav').css({
                visibility: 'hidden'
            });
        });

        $('.slide-nav-mask').animate({
            opacity: 0
        }, 200, "swing", function() {
            $('.slide-nav-mask').css('display', 'none');
        });

        ResetNav();

    };

    var ResetNav = function() {

        $('.slide-nav nav').css('left', 0);
        $('.slide-nav').find('li').removeClass('open');
        $('.slide-nav').attr('data-open', 0);

    };

    $(window).resize(function() {

        var w = $(window).width();
        var h = $(window).height();
        var breakpoint = (typeof $('.slide-nav').attr('data-breakpoint')!=='undefined') ? $('.slide-nav').attr('data-breakpoint') : 992;

        $('.slide-nav, .slide-nav-load').removeClass('desktop mobile');

        if (w < breakpoint) {

            $('.slide-nav, .slide-nav-load').addClass('mobile');
            $('.slide-nav, .slide-nav-mask').css('height', h + 'px');

        } else {

            $('.slide-nav').addClass('desktop').css({
                height: '',
                visibility: '',
                left: ''
            });

            $('.slide-nav-mask').css('display', 'none');

            ResetNav();
        }

    });

    $('.slide-nav-load').click(function(event) {

        $('.slide-nav').css({
            visibility: 'visible',
            left: '-100%'
        })
        $('.slide-nav').attr('data-open', 1).animate({
            left: 0
        }, 200, "swing");
        $('.slide-nav-mask').css({
            display: 'block',
            opacity: 0
        });
        $('.slide-nav-mask').animate({
            opacity: 1
        }, 200, "swing");

        event.stopPropagation();

    });

    $('.slide-nav-mask').click(function(event) {

        CloseMobile();

        event.stopPropagation();

    });

    $('.slide-nav a').click(function() {

        if ($(this).parents('.slide-nav').hasClass('mobile') && !$('.slide-nav nav').is(':animated')) {

            var p = $(this).parent();

            if ($(p).find('.sub:not(.desktop-only)').length) {

                $(p).addClass('open');
                $('.slide-nav nav').animate({
                    left: '-=100%'
                }, 200, "swing");

                $(p).find('h2').attr('data-url', $(this).attr('href'));
                return false;

            }

        }

    });

    $('.slide-nav .bwd').click(function() {

        var p = $(this).closest('li');

        $('.slide-nav nav').animate({
            left: '+=100%'
        }, 200, "swing", function() {
            $(p).removeClass('open');
        });

    });

    $('.slide-nav .fwd').click(function() {

        CloseMobile();

    });

    $('.slide-nav h2').click(function() {

        document.location.href = $(this).attr('data-url');

    });

    $('.slide-nav-mask').on('wheel mousewheel touchmove', function(event) {

        event.preventDefault();

    });

});
