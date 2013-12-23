$(function(){

	$('body').MQClass({
    	breakpoints:[
			{ 'id':'xs',	'min-width':0, 		'max-width':768,	'class':'device-xs',	'data-current-device':'xs' },
			{ 'id':'sm',	'min-width':768, 	'max-width':992,	'class':'device-sm',	'data-current-device':'sm' },
			{ 'id':'md',	'min-width':992, 	'max-width':1200,	'class':'device-md',	'data-current-device':'md' },
			{ 'id':'lg',	'min-width':1200, 	'max-width':0,		'class':'device-lg',	'data-current-device':'lg' }
		]
	});

	$(window).resize();
	
});