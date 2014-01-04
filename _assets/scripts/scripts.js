$(function(){

	$(window).resize(function(){

		$('.site').css('margin-bottom',$('footer').outerHeight()+'px');

	}).resize();

	$('.collapse-tab').CollapseTab({
		breakpoint:768
	});

	$('header').StickyFix();

	$('.sidebar').AnchorNav({
		items:'.content>h1',
		a_class:'sidebarscroll',
		add_a_active_class:false
	}).StickyFix({
		top:70,
		maxtop:function(){ return $('.content').height()+$('.content').offset().top-$('.sidebar').height()-70 },
		stick_to: 'parent',
		devices: { xs:false, sm:true, md:true, lg:true },
		zindex:999
	}).ScrollTo({
	    offset:70
	});

	hljs.tabReplace = '    ';
	hljs.initHighlightingOnLoad();

	$('pre code').each(function(i, e){ 
		hljs.highlightBlock(e)
	});

});