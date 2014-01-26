/* ========================================================================
 * STAN Utils: AutoClass
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

  'use strict';

    var AutoClass=function(){

        var x, autoclass, parts, selector, classes;

        $('[data-auto-class]').each(function(){

            // Get auto class attribute
            autoclass=$(this).attr('data-auto-class').split("}");

            for(x=0;x<autoclass.length-1;x++){

              // Get parts
              parts=autoclass[x].match(/[^{]*/g);

              // Set selector
              selector=$.trim(parts[0]);

              // Set classes
              classes=$.trim(parts[2]);

              // Apply classes to selector
              $(this).find(selector).addClass(classes);

            }

        });

    };

    $(document).on('ready',AutoClass);

});
