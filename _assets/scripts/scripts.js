$(function(){

	$(window).resize(function(){

		$('.site').css('margin-bottom',$('footer').height()+'px');

	}).resize();

	$('.collapse-tab').CollapseTab({
		breakpoint:768
	});

	$('header').StickyFix();

});