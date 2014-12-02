/* ========================================================================
* STAN Utils: Dropdown
* Author: Andrew Womersley
* ======================================================================== */

$(function() {

  'use strict';

  var width, subnav, pad;

  $('.sa-dropdown').click(function(event){

    if($(this).hasClass('active')){

      $('.sa-dropdown').removeClass('active');

    }else{

      $('.sa-dropdown').removeClass('active');
      $(this).addClass('active');

      width = 0;
      subnav = $(this).find('ul');


      pad = subnav.outerWidth()-subnav.width();

      subnav.css('width', '1000px')
      .children('li').css('display', 'inline-block');

      subnav.children('li').each(function() {

        if ($(this).outerWidth() > width) width = $(this).outerWidth();

      });

      width=width+pad+5;

      subnav.css('width', '')
      .children('li').css('display', '');

      if (width > subnav.outerWidth()) subnav.css('width', width + 'px');
      else if (width < $(this).outerWidth()) subnav.css('width', $(this).outerWidth() + 'px');

      event.stopPropagation();

    }

  });

  $('body').on('click',function(){

    $('.sa-dropdown').removeClass('active');

  });

});
