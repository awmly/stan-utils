$(function() {

	'use strict';

	var width, subnav;

	$(".sa-nav.nav-horizontal.sa-block li").mouseover(function(){

    width=0;
		subnav=$(this).children('ul');

		if(subnav.length){

      subnav.css('width','1000px')
            .children('li').css('display','inline-block');

      subnav.children('li').each(function(){

        if($(this).width()>width) width=$(this).width();

      });

      subnav.css('width','')
            .children('li').css('display','');

			if(width>$(this).width()) subnav.css('width',width+'px');

		}

	});

});
