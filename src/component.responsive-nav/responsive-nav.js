/* ========================================================================
 * STAN Utils: Responsive Navigation
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

    'use strict';

    var CloseMobile=function(){

      $('.resp-nav').animate({left:'-100%'},200, "swing",function(){
        $('.resp-nav').css({visibility:'hidden'});
      });

      $('.resp-nav-mask').animate({opacity:0},200, "swing",function(){
        $('.resp-nav-mask').css('display','none');
      });

      ResetNav();

    }

    var ResetNav=function(){

      $('.resp-nav nav').css('left',0);
      $('.resp-nav').find('li').removeClass('open');
      $('.resp-nav').attr('data-open',0);

    }

    $(window).resize(function() {

        var w = $(window).width();
        var h = $(window).height();

        $('.resp-nav, .resp-nav-load').removeClass('desktop mobile');

        if (w < 992) {

            $('.resp-nav, .resp-nav-load').addClass('mobile');
            $('.resp-nav, .resp-nav-mask').css('height', h + 'px');

        } else {

            $('.resp-nav').addClass('desktop').css({
                height: '',
                visibility:'',
                left:''
            });

            $('.resp-nav-mask').css('display','none');

            ResetNav();
        }

    }).resize();

    $('.resp-nav-load').click(function(event){

      $('.resp-nav').css({visibility:'visible',left:'-100%'})
      $('.resp-nav').attr('data-open',1).animate({left:0},200, "swing");
      $('.resp-nav-mask').css({display:'block', opacity:0});
      $('.resp-nav-mask').animate({opacity:1},200, "swing");

      event.stopPropagation();

    });

    $('.resp-nav-mask').click(function(event){

      CloseMobile();

      event.stopPropagation();

    });

    $('.resp-nav a').click(function() {

        if($(this).parents('.resp-nav').hasClass('mobile') && !$('.resp-nav nav').is(':animated') ){

          var p = $(this).parent();

          if ($(p).find('.sub:not(.desktop-only)').length) {

            $(p).addClass('open');
            $('.resp-nav nav').animate({
                left: '-=100%'
            }, 200, "swing");

            $(p).find('h2').attr('data-url', $(this).attr('href'));
            return false;

          }

        }

    });

    $('.resp-nav .bwd').click(function() {

        var p = $(this).closest('li');

        $('.resp-nav nav').animate({
            left: '+=100%'
        }, 200, "swing", function() {
            $(p).removeClass('open');
        });

    });

    $('.resp-nav .fwd').click(function() {

        CloseMobile();

    });

    $('.resp-nav h2').click(function() {

        document.location.href = $(this).attr('data-url');

    });

    $('.resp-nav-mask').on('wheel mousewheel touchmove', function(event) {

        event.preventDefault();

    });

});
