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

			return methods['next'].apply($($(this).attr('data-target')),[true]);

		});

		// Prev
		$("[data-toggle='colousel.prev']").click(function(){

			return methods['prev'].apply($($(this).attr('data-target')),[true]);

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
					break_delay_on_click:true,
					current_position:0,

					autoplay_method:'next',
					selector_width:0,
					max_position:0,
					timer:false
				},options);
				
				// Calculate total
				settings.total=$this.children(settings.selector).length;
				
		    	// Save settings
				$this.data('Colousel',settings);

				// Add classes
				if(settings.selector_class) $this.children(settings.selector).addClass(settings.selector_class);

				// Click handler for next
				$this.find('.colousel-next').click(function(event){

					methods['next'].apply($this,[true]);
				
				});

				// Click handler for prev
				$this.find('.colousel-prev').click(function(event){

					methods['prev'].apply($this,[true]);
				
				});

				// Do resize
				methods['resize'].apply($this);

				// Set autoplay timer
				methods['autoplay'].apply($this);

		    
		    });

	    },

	    autoplay:function(){

	    	// Load settings
	    	settings=$(this).data('Colousel');
	    	
	    	// Set this
	    	$this=$(this);

	    	if(settings.autoplay){

	    		// Calculate which method to call
	    		if(settings.current_position==settings.max_position){
	    			settings.autoplay_method='prev';
	    		}else if(settings.current_position==0 && settings.autoplay_method=='prev'){
	    			settings.autoplay_method='next';
	    		}

	    		// Set Timer
	    		settings.timer=setTimeout(function(){ 
	    			
	    			methods[settings.autoplay_method].apply($this,[false]);
	    		
	    		},settings.autoplay_delay);

	    	}

	    },

	    resize:function(){

	    	// Load settings
	    	settings=$(this).data('Colousel');
	    	
	    	// Set this
	    	$this=$(this);

	    	// Reset vars
	    	height=0;
	    	left=0;
	    	settings.inview=0;

	    	// Loop through selectors
	    	$(this).children(settings.selector).each(function(){

	    		// Check height of current selector and set height if its larger
	    		if($(this).outerHeight()>height) height=$(this).outerHeight();
	    		
	    		// Set left position
	    		$(this).css('left',left+'px');

	    		// Incriment left position
	    		left=left+$(this).outerWidth();

	    		// If left position is less than colousel width incriment in selectors in view
	    		if(left<=$this.width()+10) settings.inview++;
	    		
	    		// Set selector width
	    		settings.selector_width=$(this).outerWidth();

	    	});
	    	
	    	// Set height for container
	    	$(this).css('height',height+'px');

	    	// Ensure all selectors are the same width
	    	$(this).children(settings.selector).css('width',settings.selector_width+'px');

	    	// Set max_position
	    	settings.max_position=settings.total-settings.inview;

	    	// Check current_position isnt above maximum position
	    	if(settings.current_position>settings.max_position) settings.current_position=settings.max_position;

	    	// Move slider to current position
	    	if(settings.current_position>0){
	    		offset=settings.current_position*settings.selector_width;
	    		$(this).children(settings.selector).css('left','-='+offset+'px');
	    	}

	    	// Positon checks
			methods['position_checks'].apply($this);

	    	// Trigger
			$(this).trigger('resize.sa.colousel',[settings]);

	    },

	    next:function(isClick){

	    	// Load settings
	    	settings=$(this).data('Colousel');

	    	// Set this
	    	$this=$(this);
	    	
	    	if(settings.current_position<settings.max_position){

	    		// If isClick and beak delay on click - break autplay
	    		if(isClick && settings.break_delay_on_click) settings.autoplay=false;

	    		// If isClick - set autoplay method to follow click action
	    		if(isClick) settings.autoplay_method='next';

	    		// Clear timer
	    		clearTimeout(settings.timer);

	    		// Incriment current position
	    		settings.current_position++;

	    		// Animate selectors left
	    		$(this).children(settings.selector).animate({left:'-='+settings.selector_width+'px'},settings.transition_speed);

	    		// Reset autoplay timer
	    		methods['autoplay'].apply($this);
	    	
	    		// Positon checks
				methods['position_checks'].apply($this);

	    		// Trigger
				$(this).trigger('next.sa.colousel',[settings]);

			}

	    },

	    prev:function(isClick){

	    	// Load settings
	    	settings=$(this).data('Colousel');

	    	// Set this
	    	$this=$(this);
	    	
	    	if(settings.current_position>0){

	    		// If isClick and beak delay on click - break autplay
	    		if(isClick && settings.break_delay_on_click) settings.autoplay=false;

	    		// If isClick - set autoplay method to follow click action
	    		if(isClick) settings.autoplay_method='prev';

	    		// Clear timer
	    		clearTimeout(settings.timer);

	    		// Decrease current position
	    		settings.current_position--;

	    		// Animate selectors left
	    		$(this).children(settings.selector).animate({left:'+='+settings.selector_width+'px'},settings.transition_speed);

	    		// Reset autoplay timer
	    		methods['autoplay'].apply($this);

	    		// Positon checks
				methods['position_checks'].apply($this);
	    	
	    		// Trigger
				$(this).trigger('prev.sa.colousel',[settings]);

			}

	    },

	    position_checks:function(){

	    	// Load settings
	    	settings=$(this).data('Colousel');

	    	// Check start position
	    	if(settings.current_position==0) $(this).addClass('start'); else $(this).removeClass('start');

	    	// Check end position
	    	if(settings.current_position>=settings.max_position) $(this).addClass('end'); else $(this).removeClass('end');

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