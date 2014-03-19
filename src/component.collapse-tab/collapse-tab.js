/* ========================================================================
 * STAN Utils: Collapse Tabs
 * Author: Andrew Womersley
 * ======================================================================== */

 $(function(){

  'use strict';

  var CollapseTab=function(){

    var w = $(window).width();
    var h = $(window).height();

    $(".sa-collapse-tabs").each(function() {

      var breakpoint = (typeof $(this).attr('data-breakpoint')!=='undefined') ? $(this).attr('data-breakpoint') : 992;

      $(this).removeClass('desktop mobile');

      if (w < breakpoint) {

          $(this).addClass('mobile');

          $(this).find('.sa-collapse').removeClass('inactive');

      } else {

          $(this).addClass('desktop');

          $(this).find('.sa-collapse').addClass('inactive');

      }

    });

  }

  // Tab click
  $('.sa-collapse-tabs>ul li').click(function(){

    // Get index
    var index=$(this).index();

    // Get parent
    var par = $(this).parents('.sa-collapse-tabs');

    // Remove active collapse classes
    $(par).find('.sa-collapse .sa-content').removeClass('in').addClass('collapse').css('height',0);

    // Add active collapse classes
    $(par).find('.sa-collapse .sa-content').eq(index).addClass('in').removeClass('collapse').css('height','auto');

  });


  // Collapse click
  $('.sa-collapse-tabs .sa-collapse').click(function(){

    // Get index
    var index=$(this).index();

    // Get parent
    var par = $(this).parents('.sa-collapse-tabs');

    // Remove active classes from tab panes
    $(par).find('.tab-pane').removeClass('active');

    // Add active classes to tab pane
    $(par).find('.tab-pane').eq(index).addClass('active');

    // Remove active classes from tab nav
    $(par).find('>ul li').removeClass('active');

    // Add active classes to tab nav
    $(par).find('>ul li').eq(index).addClass('active');

  });


  $(window).on('resize', CollapseTab);

});
