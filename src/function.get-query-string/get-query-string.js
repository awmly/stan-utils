/* ========================================================================
 * STAN Utils: GetQueryString
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

    'use strict';

    $STAN.getQueryString = function(replaceSpaces) {

        // Get query string
        var qs = window.location.search.substring(1);

        // Set req exp pattern
        var patt = new RegExp(/([^&=]+)=?([^&]*)/g);

        // Set params object to store qs values
        var params = {};

        // Set matches variable
        var matches;

        // Loop through pattern matches
        while (matches = patt.exec(qs)) {

            // Set param
            if (replaceSpaces) {

                // Replace + and %20 for spaces
                params[matches[1]] = matches[2].replace(/(\+|\%20)/g, ' ');

            } else {

                // Leave string as is
                params[matches[1]] = matches[2];

            }

        }

        // Return params object
        return params;

    }

}(jQuery, $STAN));
