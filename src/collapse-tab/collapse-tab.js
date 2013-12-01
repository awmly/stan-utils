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
			
	        $(Selectors[i].selector).each(function(){

	        	data=$(this).data('data');

	        	if($(window).width()<Selectors[i].options.break_point){

					if(data.view!='collapse'){
						
						$(this).find('.in').addClass('collapse');

						index=$(this).find('.nav-tabs li').index($(this).find('.nav-tabs .active'));

						$(this).find('.collapse:eq('+index+')').removeClass('collapse');

					}

					$(this).find('.collapse').removeClass('in');

					$(this).find("[data-toggle='collapse-off']").attr('data-toggle','collapse');

					data.view='collapse';

				}else{

					if(data.view!='tab'){

						indx=0;
						$(this).find('.tab-pane').each(function(index){
							if($(this).find('div').hasClass('in')) indx=index;
						});

						$(this).find('.nav-tabs li').removeClass('active');
						$(this).find('.tab-pane').removeClass('active');

						$(this).find('.nav-tabs li:eq('+indx+')').addClass('active');
						$(this).find('.tab-content .tab-pane:eq('+indx+')').addClass('active');

					}

					$(this).find('.collapse').css('height','auto').addClass('in');

					$(this).find("[data-toggle='collapse']").attr('data-toggle','collapse-off');

					data.view='tab';

				}

	        });

	    }

	}).resize();


	// Define Methods
	var methods={
	    
	    init: function(options){ 

	    	var _this=this;

	    	// Set Options
			options=$.extend({
				break_point:768
			},options);

			// Save selector in array
			Selectors.push({
				selector:this.selector,
				options:options
			});
		    
			// Iterate Through Selectors
	    	return this.each(function(){

	    		if($(window).width()<options.break_point) view='collapse'; else view='tab';
		    	// Set Data
		    	$(this).data('data',{
		    		view:view
		    	});

		    	// Set Options
		    	$(this).data('options',options);


		    	$(this).find("[data-toggle='collapse']").click(function(){

	    			methods['Accordion'].apply(_this,[$(this)]);

	    		});
		    
		    });

	    },

	    Accordion: function(t){

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