/*
 * Media Query Value
 */

(function($){
	
	// Define Global Vars
	var Selectors=[];

	/*
	 * Resize Listener for resizing slideshow height
	 */
	$(window).resize(function(){

		if(!Selectors.length) return;
		
		for(i in Selectors){
			
	        $(Selectors[i]).each(function(){

	        	options=$(this).data('options');

	        	for(i in options.breakpoints){
	        		
	        		bp=options.breakpoints[i];
	        		
	        		// Remove classes
	        		$(this).removeClass(bp.class);

	        		// Remove attributes
	        		for(x in bp){
	        			if(x.indexOf('data')>-1) $(this).attr(x,'');
	        		}

	        	}

	        	for(i in options.breakpoints){
	        		
	        		bp=options.breakpoints[i];
	        		
	        		ww=$(window).width();

	        		if(bp['min-width']<=ww && ww<((!bp['max-width'])?9999:bp['max-width'])){
	        			
	        			// Add class
	        			$(this).addClass(bp.class);
		        		
	        			// Add attributes
		        		for(x in bp){
		        			if(x.indexOf('data')>-1) $(this).attr(x,bp[x]);
		        		}
	        		
	        		}

	        	}

	        });

	    }

	}).resize();


	// Define Methods
	var methods={
	    
	    init: function(options){ 

	    	var _this=this;

			// Save selector in array
			Selectors.push(this.selector);
		    
			// Iterate Through Selectors
	    	return this.each(function(index){

		    	// Set Options
		    	$(this).data('options',options);
		    	
		    	// Invoke resize
		    	$(window).resize();

		    });

	    }
	
	};

 	$.fn.MQClass=function(method){

	    if(methods[method]){
	    
	      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    
	    }else if( typeof method === 'object' || ! method ){
	    
	      return methods.init.apply( this, arguments );
	    
	    }else{
	    
	      $.error( 'Method ' +  method + ' does not exist on jQuery.Datatable' );
	    
	    }    
  
  	};

}(jQuery));