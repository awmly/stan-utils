/*
 * FixedSize
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
	        	methods['fix'].apply(this);
	        
	        });

	    }

	}).resize();


	// Define Methods
	var methods={
	    
	    init: function(options){ 

			// Save selector in array
			Selectors.push(this.selector);
		    
			// Iterate Through Selectors
	    	return this.each(function(index){

	    		// Set this
				var $this=$(this);


	    		// Set Options
				var settings=$.extend({
					//[ selector:'div', devices:{ xs:true, sm:true, md:true, lg:true } ] 
				},options);
				

		    	// Save settings
				$this.data('FixedSize',settings);


				// Do fix
				methods['fix'].apply(this);
		    
		    });

	    },

	    fix:function(){

	    	$settings=$(this).data('FixedSize');

	    	for(i in $settings){

	    		settings=$settings[i];

				var split=settings.devices[$('body').attr('data-current-device')];
				
				// Reset height of elements
				$(this).find(settings.selector).css('height','auto');

				// If split value is set
				if(split){

					$(this).each(function(){

						var h=0;
						var t=[];

				        $(this).find(settings.selector).each(function(index){

				            if($(this).outerHeight()>h) h=$(this).outerHeight();
				            t.push(this);
				            
				            if((index+1)%split==0){
				            	for(x in t) $(t[x]).css('height',h+'px');
				            	h=0;
				            	t=[];
				            }

				        });

				        // Check for uncomplete row
				        if(h){
				        	for(x in t) $(t[x]).css('height',h+'px');
				        }

					});

			    	// Inititate event trigger
			    	$(this).trigger('sa.fixedsize.fix',[settings]);

		        }

		    }

	    }
	
	};

 	$.fn.FixedSize=function(method){

		if(methods[method]){

			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));

		}else if( typeof method === 'object' || ! method ){

			return methods.init.apply( this, arguments );

		}else{

			$.error( 'Method ' +  method + ' does not exist on jQuery.Datatable' );

		}    
  
  	};

}(jQuery));