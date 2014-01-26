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

  $STAN.getSize=function(type,target,css){

    if(typeof css=='undefined') css={};

    css.visibility="hidden";

    if(type=='clone'){

      clone = target.clone().css(css);

      $('body').append(clone);

      size=setSize(clone);

      clone.remove();

    }else if(type=='x'){

      //element.parent().css('width','10000px');
      //width='auto';
      //display='inline-block';

    }

    return size;

  }

}(jQuery, $STAN));
