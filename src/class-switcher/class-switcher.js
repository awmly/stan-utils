/*
 * ClassSwitcher
 */

(function($){
	
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

	    	var _this=this;

			// Iterate Through Selectors
	    	return this.each(function(index){

	    		// Set this
				var $this=$(this);

	    		// Set Options
				var settings=$.extend({
					selector:'div',
					current_class:''
				},options);
				

		    	// Save settings
				$this.data('ClassSwitcher',settings);
				
				// Find Controllers and Set Listeners
				$("[data-toggle='class-switcher'][data-target='"+_this.selector+"']").each(function(){

		    		$(this).find('li').each(function(){
			    		
			    		// Check if button has active class
			    		if($(this).hasClass('active')) methods['change'].apply($this,[$(this)]);
			    		
			    		// Add click listener
			    		$(this).click(function(){
			    			methods['change'].apply($this,[$(this)]);
			    		});

		    		});
			    
			    });
		    
		    });

	    },

	    change: function(_this){

	    	settings=$(this).data('ClassSwitcher');

	    	$this=$(this);

	    	$(_this).siblings().removeClass('active');
		    _this.addClass('active');

	    	this.children(settings.selector).removeClass(settings.current_class).addClass(_this.attr('data-class'));

	    	settings.current_class=_this.attr('data-class');

	    	// Trigger
			$(this).trigger('change.sa.class-switcher',[settings]);
	    
	    }
	
	};

 	$.fn.ClassSwitcher=function(method){

		if(methods[method]){

			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));

		}else if( typeof method === 'object' || ! method ){

			return methods.init.apply( this, arguments );

		}else{

			$.error( 'Method ' +  method + ' does not exist on jQuery.Datatable' );

		}    
  
  	};

}(jQuery));