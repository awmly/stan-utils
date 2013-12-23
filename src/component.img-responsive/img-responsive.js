/*
 * IMG-RESPONSIVE
 */

$(function(){

	$(window).resize(function(){
		
		$("img[data-resp-src^='{']").each(function(){

			var t=$(this);

			if(t.attr('data-resp-src')){
        	
	        	var src=jQuery.parseJSON(t.attr('data-resp-src'));

	        	var device=!! $('body').attr('data-current-device') ? $('body').attr('data-current-device') : 'xs';

	        	t.attr('src',src[device]);

	        }

		});

	});

});