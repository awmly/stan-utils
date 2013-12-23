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

	        	// Resize check
	        	methods['resize'].apply(this);

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

	    		options.current_ids=[];

		    	// Set Options
		    	$(this).data('MQClass',options);
		    	
		    	// Do resize
				methods['resize'].apply($(this));

		    });

	    },

	    resize: function(){

	    	var settings=$(this).data('MQClass');

        	for(i in settings.breakpoints){
        		
        		bp=settings.breakpoints[i];
        		
        		// Remove classes
        		$(this).removeClass(bp.class);

        		// Remove attributes
        		for(x in bp){
        			if(x.indexOf('data')>-1) $(this).attr(x,'');
        		}

        	}

        	var current_ids=[];

        	for(i in settings.breakpoints){
        		
        		bp=settings.breakpoints[i];
        		
        		ww=$(window).width();

        		if(bp['min-width']<=ww && ww<((!bp['max-width'])?9999:bp['max-width'])){
        			
        			// Add class
        			$(this).addClass(bp.class);
	        		
        			// Add attributes
	        		for(x in bp){
	        			if(x.indexOf('data')>-1) $(this).attr(x,bp[x]);
	        		}

	        		// Add id to current_ids
	        		current_ids.push(bp.id);
	        		   		
        		}

        		// Check if ID is in settings.current_ids
	        	if( current_ids.indexOf(bp.id)>-1 && settings.current_ids.indexOf(bp.id)==-1 ) $(this).trigger('active.sa.mqclass',[settings,bp.id]);
	        	if( settings.current_ids.indexOf(bp.id)>-1 && current_ids.indexOf(bp.id)==-1 ) $(this).trigger('deactive.sa.mqclass',[settings,bp.id]);	

        	}

        	settings.current_ids=current_ids;

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