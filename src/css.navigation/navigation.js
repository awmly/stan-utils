$(function() {

	'use strict';

	var width, subnav;

	$(".sa-nav.nav-horizontal li").mouseover(function(){

    width=0;
		subnav=$(this).children('ul');

		if(subnav.length){

      subnav.css('width','1000px')
            .children('li').css('display','inline-block');

      subnav.children('li').each(function(){

        if($(this).outerWidth()>width) width=$(this).outerWidth();

      });

      subnav.css('width','')
            .children('li').css('display','');

			if(width>$(this).outerWidth()) subnav.css('width',width+'px');

		}

	});

});
