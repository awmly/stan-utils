/* ========================================================================
* STAN Utils: Retina Images
* Author: Andrew Womersley
* ======================================================================== */

$(function() {

  'use strict';

  // Set pixel ratio
  var pxRatio = !! window.devicePixelRatio ? window.devicePixelRatio : 1;

  if (pxRatio > 1) $('body').addClass('x2');

});
