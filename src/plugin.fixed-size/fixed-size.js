/* ========================================================================
* STAN Utils: FixedSize
* Author: Andrew Womersley
* ======================================================================== */

(function($, $STAN) {

  'use strict';

  // Define Global Vars
  var Selectors = [];

  $STAN.on('resize',function() {

    if (!Selectors.length) return;

    $(Selectors).each(function() {

      // Resize check
      methods.fix.apply(this);

    });

  });


  // Define Methods
  var methods = {

    init: function(options) {

      // Save selector in array
      $(this.selector).each(function(){

        Selectors.push( $(this) );

      });

      // Iterate Through Selectors
      return this.each(function() {

        // Set this
        var $this = $(this);

        // Set Options
        var settings = $.extend({
          selector: 'div',
          devices: {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0
          }
        }, options);

        if(typeof settings.selector==='string') settings.selector=[settings.selector];

        // Save settings
        $this.data('FixedSize', settings);

        // Do fix
        methods.fix.apply(this);

      });

    },

    fix: function() {

      var settings = $(this).data('FixedSize');

      for(var x in settings.selector){

        methods.checkSize.apply(this,[settings.selector[x]]);

      }

      // Inititate event trigger
      $(this).trigger('resize.sa.fixedsize', [settings]);


    },

    checkSize: function(selector){

      var h = 0;
      var t = [];
      var lastTop, thisTop, newLine;

      // Reset height of elements
      $(this).find(selector).css('height', 'auto');

      $(this).find(selector).each(function(index) {

        thisTop=$(this).offset().top;

        if(lastTop<thisTop+20 && lastTop>thisTop-20) newLine=false; else newLine=true;
        if(newLine && h>0){

          for (var x in t) $(t[x]).css('height', h + 'px');
          h = 0;
          t = [];
        }

        if ($(this).outerHeight() > h) h = $(this).outerHeight();
        t.push(this);

        lastTop=thisTop;

      });

      // Check for uncomplete row
      if (h) {
        for (var x in t) $(t[x]).css('height', h + 'px');
      }

    }

  };

  $.fn.FixedSize = function(method) {

    if (methods[method]) {

      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

    }
    else if (typeof method === 'object' || !method) {

      return methods.init.apply(this, arguments);

    }
    else {

      $.error('Method ' + method + ' does not exist on jQuery.Datatable');

    }

  };

}(jQuery, $STAN));
