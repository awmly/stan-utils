/*
 * PopUp
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

	/*
	 * Click Listeners
	 */
	$(window).ready(function(){
		
		// Show
		$("[data-toggle='popup.show']").click(function(){

			methods['set_src'].apply($($(this).attr('data-target')),[$(this).attr('data-src')]);

			return methods['show'].apply($($(this).attr('data-target')));

		});

		// Hide
		$("[data-toggle='popup.hide']").click(function(){

			return methods['hide'].apply($($(this).attr('data-target')));

		});

		// Toggle
		$("[data-toggle='popup.toggle']").click(function(){

			methods['set_src'].apply($($(this).attr('data-target')),[$(this).attr('data-src')]);

			return methods['toggle'].apply($($(this).attr('data-target')));

		});

	});


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
					type:'html',
					src:'about:blank',
					width:200,
					height:300,
					gutter:15,
					open:false,
					auto_reopen:true,
					lock_aspect_ratio:true,
					scroll:true,
					devices:{ xs:true, sm:true, md:true, lg:true }
				},options);
				

		    	// Save settings
				$this.data('PopUp',settings);

				// Scroll settings
				_scroll=(settings.scroll) ? 'yes' : 'no';
				_class=(settings.scroll) ? '' : 'no-scroll';

				// Set HTML/iFrame/Classes
				if(settings.type=='iframe'){

					$this.find('.popup-display').html("<iframe src='about:blank' class='"+_class+"' style='width:100%;height:100%;' seamless frameborder='0' scrolling='"+_scroll+"'></iframe>")

				}else{

					$this.find('.popup-display').addClass(_class);

				}

				// Set close listener
				$this.click(function(){

					methods['hide'].apply($this);

				});

				$this.find('.popup-display').click(function(event){

					event.stopPropagation();

				});

				// Show if open and allowed on current device
				if(settings.open && settings.devices[$('body').attr('data-current-device')]){

					$(this).css('display','block');
				
				}

				// Do resize
				methods['resize'].apply(this);
		    
		    });

	    },

	    show:function(){

	    	settings=$(this).data('PopUp');

	    	if(!settings.open){

		    	if(settings.devices[$('body').attr('data-current-device')]){

		    		// Set iFrame source
		    		$(this).find('iframe').attr('src',settings.src);

		    		// Display Popup
		    		$(this).css('display','block');
					
					// Set open to true			
			    	settings.open=true;

			    	// Return false to stop default action
			    	return false;

		    	}else{

		    		// Return true to allow default action
		    		return true;
		    	
		    	}

		    }else{

		    	return false;

		    }

	    },

	    hide:function(){

	    	settings=$(this).data('PopUp');

	    	if(settings.open){

	    		// Close Popup
		    	$(this).css('display','none');

		    	// Unset iFrame src
		    	if(settings.type=='iframe') $(this).find('iframe').attr('src','about:blank');

		    	// Set open to false
		    	settings.open=false;

		    }

		    // Return false to stop default action
		    return false;
			
	    },

	    toggle:function(src){

	    	settings=$(this).data('PopUp');

	    	if(settings.open) return methods['hide'].apply(this);
	    	else return methods['show'].apply(this,[src]);
			
	    },

	    resize:function(){

	    	settings=$(this).data('PopUp');

	    	// Resize to fit
			w=$(window).width()-(2*settings.gutter);
			h=$(window).height()-(2*settings.gutter);

			if(w>settings.width) w=settings.width;
			if(h>settings.height) h=settings.height;

			if(settings.lock_aspect_ratio){
				if((w/h)>(settings.width/settings.height)) 	w=settings.width*(h/settings.height);
				else 										h=settings.height*(w/settings.width);
			}

			$(this).find('.popup-display').css({width:w+'px',height:h+'px',marginTop:'-'+(h/2)+'px',marginLeft:'-'+(w/2)+'px'});

			// Check if device has changed
    		if(!settings.devices[$('body').attr('data-current-device')] && settings.open){
    			settings.reopen=true;
    			methods['hide'].apply(this);
    		}else if(settings.devices[$('body').attr('data-current-device')] && settings.reopen && settings.auto_reopen){
    			settings.reopen=false;
    			methods['show'].apply(this);
    		}

	    },

	    set_src:function(src){

	    	settings=$(this).data('PopUp');

	    	if(src) settings.src=src;

	    }
	
	};

 	$.fn.PopUp=function(method){

		if(methods[method]){

			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));

		}else if( typeof method === 'object' || ! method ){

			return methods.init.apply( this, arguments );

		}else{

			$.error( 'Method ' +  method + ' does not exist on jQuery.Datatable' );

		}    
  
  	};

}(jQuery));