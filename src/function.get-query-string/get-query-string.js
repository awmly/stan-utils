/* ========================================================================
 * STAN Utils: GetQueryString
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

  'use strict';

  $STAN.getQueryString=function(){

    // Get query string
    var qs=window.location.search.substring(1);

    // Set req exp pattern
    var patt = new RegExp(/([^&=]+)=?([^&]*)/g);

    // Set params object to store qs values
    var params={};

    // Set matches variable
    var matches;

    // Loop through pattern matches
    while (matches = patt.exec(qs)){

      // Set param - replace + and %20 for spaces
      params[matches[1]] = matches[2].replace(/(\+|\%20)/g,' ');

    }

    // Return params object
    return params;

  }

}(jQuery, $STAN));
