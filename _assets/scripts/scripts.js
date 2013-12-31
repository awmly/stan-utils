$(function(){

	$(window).resize(function(){

		$('.site').css('margin-bottom',$('footer').outerHeight()+'px');

	}).resize();

	$('.collapse-tab').CollapseTab({
		breakpoint:768
	});

	$('header').StickyFix();

	hljs.tabReplace = '    ';
	hljs.initHighlightingOnLoad();

	$('pre code').each(function(i, e){ 
		hljs.highlightBlock(e)
	});

});