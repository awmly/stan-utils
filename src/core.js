$(function(){

	$('body').MQClass({
    	breakpoints:[
			{ 'min-width':0, 	'max-width':768,	'class':'device-xs',	'data-current-device':'xs' },
			{ 'min-width':768, 	'max-width':992,	'class':'device-sm',	'data-current-device':'sm' },
			{ 'min-width':992, 	'max-width':1200,	'class':'device-md',	'data-current-device':'md' },
			{ 'min-width':1200, 'max-width':0,		'class':'device-lg',	'data-current-device':'lg' }
		]
	});

});