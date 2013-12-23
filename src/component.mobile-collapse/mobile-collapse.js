$(function(){

	$('.xscollapse').each(function(){

		$($(this).attr('data-target')).addClass('xscollapse-target');

	});

	$('body').on('active.sa.mqclass',function(event,settings,id){
	
		if(id=='xs') $(".xscollapse-target").removeClass('in').addClass('collapse');
	
	});

	$('body').on('deactive.sa.mqclass',function(event,settings,id){
	
		if(id=='xs') $(".xscollapse-target").addClass('in');
	
	});
	
});