/*
 * Colousel
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
		
		// Next
		$("[data-toggle='colousel.next']").click(function(){

			return methods['move'].apply($($(this).attr('data-target')),['next',true]);

		});

		// Prev
		$("[data-toggle='colousel.prev']").click(function(){

			return methods['move'].apply($($(this).attr('data-target')),['prev',true]);

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
						continuous:true,
						selector:'div',
						selector_class:false,
						transition_speed:300,
						autoplay:false,
						autoplay_delay:5000,
						break_autoplay_on_click:true,
						current_index:0,
						autoplay_method:'next',
						selector_width:0,
						max_index:0,
						timer:false,
						action:false,
					},options);
					
					
					
			    // Save settings
					$this.data('Colousel',settings);


					var $Selectors=$this.find('.colousel-inner').children(settings.selector);

					// Calculate total
					settings.total=$Selectors.length;

					// Add classes
					if(settings.selector_class) $Selectors.addClass(settings.selector_class);

					// Loop through selectors
		    	$Selectors.each(function(index){
		    		
		    		// Set index position
		    		$(this).data('ColouselIndex',index);

		    	});

					// Click handler for next
					$this.find('.colousel-next').click(function(event){

						methods['move'].apply($this,['next',true]);
					
					});

					// Click handler for prev
					$this.find('.colousel-prev').click(function(event){

						methods['move'].apply($this,['prev',true]);
					
					});

					// Do resize
					methods['resize'].apply($this);

					// Set autoplay timer
					methods['autoplay'].apply($this);

		    });

	    },

	    autoplay:function(){

	    	// Load settings
	    	var settings=$(this).data('Colousel');
	    	
	    	// Set this
	    	var $this=$(this);

	    	if(settings.autoplay){

	    		// Calculate which method to call
	    		if(settings.current_index==settings.max_index && !settings.continuous){
	    			settings.autoplay_method='prev';
	    		}else if(settings.current_index==0 && settings.autoplay_method=='prev'){
	    			settings.autoplay_method='next';
	    		}

	    		// Set Timer
	    		settings.timer=setTimeout(function(){ 
	    			
	    			methods['move'].apply($this,[settings.autoplay_method,false]);
	    		
	    		},settings.autoplay_delay);

	    	}

	    },

	    resize:function(){

	    	// Load settings
	    	var settings=$(this).data('Colousel');
	    	
	    	// Set this
	    	var $this=$(this);
	    	var $Selectors=$this.find('.colousel-inner').children(settings.selector);

	    	// Reset vars
	    	var height=0;
	    	var left=0;
	    	var inview_check=0;
	    	settings.inview=0;

	    	// Set selector width
	    	settings.selector_width=$Selectors.outerWidth();

	    	// Loop through selectors
	    	$Selectors.each(function(index){

	    		// Check height of current selector and set height if its larger
	    		if($(this).outerHeight()>height) height=$(this).outerHeight();
	    		
	    		// Calculate left positoion
	    		left=$(this).data('ColouselIndex')*settings.selector_width;

	    		// Set left position
	    		$(this).css('left',left+'px');

	    		// If left position is less than colousel width incriment in selectors in view
	    		inview_check=inview_check+settings.selector_width;
	    		if(inview_check<=$this.find('.colousel-inner').width()+10) settings.inview++;

	    	});
	    	
	    	// Set height for container
	    	$(this).css('height',height+'px');

	    	// Set start and end positions
	    	settings.start_position=settings.selector_width*-1;
		    settings.end_position=settings.selector_width*(settings.total-1);

		    // Set max_index
		    settings.max_index=settings.total-settings.inview;

		    if(!settings.continuous){

		    	// Check current_index isnt above maximum position
		    	if(settings.current_index>settings.max_index) settings.current_index=settings.max_index;

		    	// Move slider to current position
		    	if(settings.current_index>0){
		    		
		    		var offset=settings.current_index*settings.selector_width;
		    		$Selectors.css('left','-='+offset+'px');
		    	
		    	}

		    }

	    	// Trigger
				$(this).trigger('resize.sa.colousel',[settings]);

	    },

	    pre_move_checks:function(method){

	    	// Load settings
	    	var settings=$(this).data('Colousel');

	    	// Set this
	    	var $this=$(this);
	    	var $Selectors=$this.find('.colousel-inner').children(settings.selector);

	    	// If continuous - reposition selectors
	    	if(settings.continuous){

		    	// Loop through selectors
		    	$Selectors.each(function(){

		    		// Get index position
		    		var $index=$(this).data('ColouselIndex');
		    		
		    		if(method=='next'){

		    				if($index==-1){

		    					// Reset index and left position
		    					$index=settings.total-1;
		    					$(this).css('left',settings.end_position+'px');
		    				
		    				}

		    				$index--;
		    				
		    		}

		    		if(method=='prev'){
		    				
		    				$index++;
		    				
		    				if($index==settings.total){

		    					// Reset index and left position
		    					$index=0;
		    					$(this).css('left',settings.start_position+'px');
		    				
		    				}
		    				
		    		}

		    		// Save index position
		    		$(this).data('ColouselIndex',$index);

		    	});

	    	}

	    },

	    post_move_checks:function(method){

	    	// Load settings
	    	var settings=$(this).data('Colousel');

	    	// Set this
	    	var $this=$(this);
	    	var $Selectors=$this.find('.colousel-inner').children(settings.selector);

	    	// If not continuous check for index positions
	    	if(!settings.continuous){

	    		// Check start position
	    		if(settings.current_index==0) $(this).addClass('start'); else $(this).removeClass('start');

	    		// Check end position
	    		if(settings.current_index>=settings.max_index) $(this).addClass('end'); else $(this).removeClass('end');

	    	}

	    },

	    move:function(direction,isClick){

	    	// Load settings
	    	var settings=$(this).data('Colousel');

	    	// Set this
	    	var $this=$(this);
	    	var $Selectors=$this.find('.colousel-inner').children(settings.selector);

	    	if(direction=='next'){
	    		inc_value=1;
	    		left_modifier='-';
	    	}else{
	    		inc_value=-1;
	    		left_modifier='+';
	    	}

	    	// Set this
	    	var $this=$(this);
	    	
	    	if((settings.continuous
	    		|| (settings.current_index<settings.max_index && direction=='next')
	    		|| (settings.current_index>0 && direction=='prev'))
	    		&& !settings.action
	    	){

	    		// Set action
	    		settings.action=true;

	    		// If isClick and beak delay on click - break autplay
	    		if(isClick && settings.break_autoplay_on_click) settings.autoplay=false;

	    		// If isClick - set autoplay method to follow click action
	    		if(isClick) settings.autoplay_method=direction;

	    		// Clear timer
	    		clearTimeout(settings.timer);

	    		// Incriment current position
	    		settings.current_index=settings.current_index+inc_value;

	    		
	    		// Positon checks
					methods['pre_move_checks'].apply($this,[direction]);

	    		// Animate selectors left
	    		$Selectors.animate({left:left_modifier+'='+settings.selector_width+'px'},settings.transition_speed);

	    		setTimeout(function(){ 
	    			
	    			// Set action
	    			settings.action=false;

	    			

	    			methods['resize'].apply($this);

	    			// Positon checks
						methods['post_move_checks'].apply($this,[direction]);
						
						// Reset autoplay timer
	    			methods['autoplay'].apply($this);
	    			
	    		
	    		},settings.transition_speed+50);

	    		// Trigger
					$(this).trigger('next.sa.colousel',[settings]);

				}

	    },

	    next:function(){

	    	methods['move'].apply($this,['next',true]);

	    },

	    prev:function(){

	    	methods['move'].apply($this,['prev',true]);

	    }
	
	};

 	$.fn.Colousel=function(method){

		if(methods[method]){

			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));

		}else if( typeof method === 'object' || ! method ){

			return methods.init.apply( this, arguments );

		}else{

			$.error( 'Method ' +  method + ' does not exist on jQuery.Datatable' );

		}    
  
  };

}(jQuery));