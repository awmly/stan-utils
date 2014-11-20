/* ========================================================================
 * STAN Utils: Get Max
 * Author: Andrew Womersley
 * ========================================================================*/

 (function($, $STAN) {

    'use strict';

    $STAN.getMax = function($selector, property) {

        var t;
        var value=0;

        $selector.each(function(){

            t=parseInt($(this).css(property));

            if( t>value ) value=t;

        });

        return value;

    };

    $STAN.getMin = function($selector, property) {

      var t;
      var value=99999999;

      $selector.each(function(){

        t=parseInt($(this).css(property));

        if( t<value ) value=t;

      });

      return value;

    };

}(jQuery, $STAN));
