/*
 * ClassSwitcher
 */

(function($){
	
	// Define Global Vars
	var Selectors=[];


	// Define Methods
	var methods={
	    
	    init: function(options){ 

	    	var _this=this;
	    	var _classes='';
	    	var _btn=false;

	    	// Set Options
			options=$.extend({

				selector:'div',
				onSwitch:false

			},options);

	    	// Find Controllers and Set Listeners
			$("[data-toggle='class-switcher'][data-target='"+_this.selector+"']").each(function(){
	    		
				class_active=$(this).attr('data-active-class');
				class_inactive=$(this).attr('data-inactive-class');

	    		$(this).find('li').each(function(){

	    			// Add to class list
		    		_classes=_classes+" "+$(this).attr('data-class');
		    		
		    		// Check if button has active class
		    		if($(this).attr('data-active')=='1') _btn=$(this);
		    		
		    		// Add click listener
		    		$(this).click(function(){
		    			methods['Switch'].apply(_this,[$(this)]);
		    		});

	    		});
		    
		    });
		    

			// Iterate Through Selectors
	    	return this.each(function(){

		    	// Set Data
		    	$(this).data('data',{
		    		current_class:0,
		    		classes:_classes,
		    		selector:_this.selector,
		    		class_active:class_active,
		    		class_inactive:class_inactive

		    	});

		    	// Set Options
		    	$(this).data('options',options);

		    	// Set Active
		    	if(_btn) $(_btn).click();
		    
		    });

	    },
	    
	    Switch: function(_this){

	    	data=this.data('data');
	    	options=this.data('options');

	    	$("[data-toggle='class-switcher'][data-target='"+data.selector+"']").find('li').removeClass(data.class_active).addClass(data.class_inactive);
		    _this.addClass(data.class_active);

	    	this.find(options.selector).removeClass(data.classes).addClass(_this.attr('data-class'));

	    	data.current_class=_this.attr('data-class');

	    	if(options.onSwitch) options.onSwitch.call(this);
	    
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