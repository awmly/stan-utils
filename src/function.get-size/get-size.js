/* ========================================================================
 * STAN Utils: GetSize
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

	'use strict';

  var size={};
  var width, display, clone;

  var setSize=function(target){

    return {
      outerWidthMargin:target.outerWidth(true),
      outerHeightMargin:target.outerHeight(true),
      outerWidth:target.outerWidth(),
      outerHeight:target.outerHeight(),
      width:target.width(),
      height:target.height()
    }

  };

  $STAN.getSize=function(target,css){

    if(typeof css=='undefined') css={};

    css.visibility="hidden";

    clone = target.clone().css(css);

    $('body').append(clone);

    size=setSize(clone);

    clone.remove();

    return size;

  }

}(jQuery, $STAN));
