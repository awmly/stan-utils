/* ========================================================================
 * STAN Utils: Log
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

  'use strict';

  $STAN.log=function(msg){

    if (typeof console == "object") {

      console.log(msg);

    }

  };

}(jQuery, $STAN));
