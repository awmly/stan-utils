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
			var settings=$.extend({
				top:0,
				maxtop:false,
				sticky_class:'',
				stick_to:'window',
				unstuck_position:'static', //REMOVE!!
				devices:{ xs:true, sm:true, md:true, lg:true }
			},options);

			// Save selector in array
			Selectors.push(this.selector);
		    
			// Iterate Through Selectors
	    	return this.each(function(index){

	    		placeholder="sticky-"+_this.selector.substring(1)+"-"+index;

	    		$(this).after("<div class='sticky-placeholder' id='"+placeholder+"' style='display:none;height:"+$(this).height()+"px;'></div>");

		    	// Set Data
		    	settings.offset=$(this).offset();
		    	settings.placeholder='#'+placeholder;

		    	// Save settings
		    	$(this).data('StickyFix',settings);
		    
		    });

	    },

	    stick:function(){

	    	var settings=$(this).data('StickyFix');

			t=settings.offset.top-$(window).scrollTop();

			if(t<settings.top && settings.devices[$('body').attr('data-current-device')]){
				
				if(typeof settings.maxtop==='function') maxtop=settings.maxtop();
				else if(typeof settings.maxtop==='number') maxtop=settings.maxtop;
				else maxtop=99999;

				if($(window).scrollTop()>maxtop){
					pos=settings.top-($(window).scrollTop()-maxtop);
					$(this).css('top',pos+'px');
				}else{
					// Trigger
					if($(this).attr('data-sticky')!='stuck') $(this).trigger('stuck.sa.stickyfix',[settings]);
					$(this).addClass(settings.sticky_class).css({'z-index':999,top:settings.top+'px',position:'fixed'}).attr('data-sticky','stuck');
					$(settings.placeholder).css('display','block');
					if(settings.stick_to=='parent') $(this).css({width:$(settings.placeholder).width()+'px',left:$(settings.placeholder).offset().left+'px'});
				}
			}else{
				// Trigger
				if($(this).attr('data-sticky')=='stuck') $(this).trigger('unstuck.sa.stickyfix',[settings]);
				$(this).removeClass(settings.sticky_class).css({top:'auto',position:settings.unstuck_position}).attr('data-sticky','');
				$(settings.placeholder).css('display','none');
				if(settings.stick_to=='parent') $(this).css({width:'auto',left:'auto'});
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