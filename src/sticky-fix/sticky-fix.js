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

	        	methods['stick'].apply(this);

	        });

	    }

	}).resize();

	$(window).scroll(function(){

		if(!Selectors.length) return;
		
		for(i in Selectors){
			
	        $(Selectors[i]).each(function(){

	        	methods['stick'].apply(this);

	        });

	    }

	}).scroll();


	// Define Methods
	var methods={
	    
	    init: function(options){ 

	    	var _this=this;

	    	// Set Options
			options=$.extend({
				top:0,
				maxtop:false,
				sticky_class:'',
				stick_to:'parent',
				unstuck_position:'static',
				devices:{ xs:true, sm:true, md:true, lg:true }
			},options);

			// Save selector in array
			Selectors.push(this.selector);
		    
			// Iterate Through Selectors
	    	return this.each(function(index){

	    		placeholder="sticky-"+_this.selector.substring(1)+"-"+index;

	    		$(this).after("<div class='sticky-placeholder' id='"+placeholder+"' style='display:none;height:"+$(this).height()+"px;'></div>");

		    	// Set Data
		    	options.offset=$(this).offset();
		    	options.placeholder='#'+placeholder;

		    	// Set Options
		    	$(this).data('options',options);
		    
		    });

	    },

	    stick:function(){

	    	options=$(this).data('options');

			t=options.offset.top-$(window).scrollTop();

			if(t<options.top && options.devices[$('body').attr('data-current-device')]){
				
				if(typeof options.maxtop==='function') maxtop=options.maxtop();
				else if(typeof options.maxtop==='number') maxtop=options.maxtop;
				else maxtop=99999;

				if($(window).scrollTop()>maxtop){
					pos=options.top-($(window).scrollTop()-maxtop);
					$(this).css('top',pos+'px');
				}else{
					$(this).addClass(options.sticky_class).css({'z-index':99999,top:options.top+'px',position:'fixed'}).attr('data-sticky','stuck');
					$(options.placeholder).css('display','block');
					if(options.stick_to=='parent') $(this).css({width:$(options.placeholder).width()+'px',left:$(options.placeholder).offset().left+'px'});
				}
			}else{
				$(this).removeClass(options.sticky_class).css({top:'auto',position:options.unstuck_position}).attr('data-sticky','');
				$(options.placeholder).css('display','none');
				if(options.stick_to=='parent') $(this).css({width:'auto',left:'auto'});
			}

	    }
	
	};

 	$.fn.StickyFix=function(method){

	    if(methods[method]){
	    
	      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    
	    }else if( typeof method === 'object' || ! method ){
	    
	      return methods.init.apply( this, arguments );
	    
	    }else{
	    
	      $.error( 'Method ' +  method + ' does not exist on jQuery.Datatable' );
	    
	    }    
  
  	};

}(jQuery));