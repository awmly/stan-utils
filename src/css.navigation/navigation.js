$(function() {

	'use strict';

	var size;
	var subnav;

	$("nav[class^='nav-'] li").mouseover(function(){

		subnav=$(this).children('ul');

		if(subnav.length){
			
			size=$STAN.getSize(subnav,true);
			
			if(size.width>$(this).width()) subnav.css('width',size.width+'px');
		
		}

	});

});