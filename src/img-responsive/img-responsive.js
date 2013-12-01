/*
 * IMG-RESPONSIVE
 */

(function($){

	var Selectors=[];

	$(window).resize(function(){

		if(!Selectors.length) return;
		
		for(i in Selectors){
			
			$(Selectors[i]).each(function(){

				var t=$(this);

				if(t.attr('data-src')){
	        	
		        	var src=jQuery.parseJSON(t.attr('data-src'));

		        	t.attr('src',src[$('body').attr('data-current-device')]);

		        }

			});

	    }

	}).resize();


	$.fn.ImgResponsive=function(){

		Selectors.push(this.selector);

		// Invoke resize
		$(window).resize();

    	return this;
	
	}

}(jQuery));