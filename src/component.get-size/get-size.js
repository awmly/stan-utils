/* ========================================================================
 * STAN Utils: GetSize
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

	'use strict';

  var size={};
  var width;
  var display;

  $STAN.getSize=function(element,nativeSize){

    if(typeof nativeSize=='undefined') nativeSize=false;

    if(nativeSize){
      element.parent().css('width','10000px');
      width='auto';
      display='inline-block';
    }else{
      width='100%';
      display='block';
    }

    element.css({position:'absolute', display:display, visibility:'hidden', width:width, left:0, top:0 });

    size={
      width:element.outerWidth(),
      height:element.outerHeight()
    }

    element.css({position:'', display:'', visibility:'', width:'', left:'', top:'' });

    if(nativeSize) element.parent().css('width','');

    return size;

  }

}(jQuery, $STAN));
