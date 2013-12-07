/*
 * CollapseTab
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
	    	return this.each(function(){

	    		if($(window).width()<options.break_point) view='collapse'; else view='tab';
		    	
		    	// Set Options
				settings=$.extend({
					breakpoint:768,
					view:view
				},options);
		    	
		    	// Set Options
		    	$(this).data('CollapseTab',settings);


		    	// Add click listeners
		    	$(this).find("[data-toggle='collapse']").click(function(){

	    			methods['accordion'].apply(_this,[$(this)]);

	    		});

		    	// Do resize
	    		methods['resize'].apply(this);
		    
		    });

	    },

	    resize: function(){

	    	settings=$(this).data('CollapseTab');

        	if($(window).width()<settings.breakpoint){

				if(settings.view!='collapse'){
					
					$(this).find('.in').addClass('collapse');

					index=$(this).find('.nav-tabs li').index($(this).find('.nav-tabs .active'));

					$(this).find('.collapse:eq('+index+')').removeClass('collapse');

					$(this).trigger('sa.collapsetab.collapse',[options]);

				}

				$(this).find('.collapse').removeClass('in');

				$(this).find("[data-toggle='collapse-off']").attr('data-toggle','collapse');

				settings.view='collapse';

			}else{

				if(settings.view!='tab'){

					indx=0;
					$(this).find('.tab-pane').each(function(index){
						if($(this).find('div').hasClass('in')) indx=index;
					});

					$(this).find('.nav-tabs li').removeClass('active');
					$(this).find('.tab-pane').removeClass('active');

					$(this).find('.nav-tabs li:eq('+indx+')').addClass('active');
					$(this).find('.tab-content .tab-pane:eq('+indx+')').addClass('active');

					$(this).trigger('sa.collapsetab.tab',[options]);

				}

				$(this).find('.collapse').css('height','auto').addClass('in');

				$(this).find("[data-toggle='collapse']").attr('data-toggle','collapse-off');

				settings.view='tab';

			}

	    },

	    accordion: function(t){

	    	this.find("[data-toggle='collapse']").not(t).each(function(){
	    		tar=$(this).attr('data-target');
	    		if($(tar).hasClass('in')) $(tar).collapse('hide');
	    	});

	    }
	
	};

 	$.fn.CollapseTab=function(method){

	    if(methods[method]){
	    
	      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    
	    }else if( typeof method === 'object' || ! method ){
	    
	      return methods.init.apply( this, arguments );
	    
	    }else{
	    
	      $.error( 'Method ' +  method + ' does not exist on jQuery.Datatable' );
	    
	    }    
  
  	};

}(jQuery));