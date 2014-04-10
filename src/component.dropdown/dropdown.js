/* ========================================================================
 * STAN Utils: Dropdown
 * Author: Andrew Womersley
 * ======================================================================== */

 $(function() {

  'use strict';

  var width, subnav, pad;

    $('.sa-dropdown').click(function(event){

      $('.sa-dropdown').removeClass('active');

        width = 0;
        subnav = $(this).children('ul');

        pad = subnav.outerWidth()-subnav.width();

      subnav.css('width', '1000px')
            .children('li').css('display', 'inline-block');

        subnav.children('li').each(function() {

            if ($(this).outerWidth() > width) width = $(this).outerWidth();

        });

        width=width+pad;

        subnav.css('width', '')
            .children('li').css('display', '');

        if (width > subnav.outerWidth()) subnav.css('width', width + 'px');




      $(this).addClass('active');

      event.stopPropagation();

    });

    $('body').on('click',function(){

      $('.sa-dropdown').removeClass('active');

    });

});
