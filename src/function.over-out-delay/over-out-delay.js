(function($, $STAN) {

  'use strict';

  $STAN.overOutDelay=function(element,over,out,delay){

    $(element).mouseenter(function(){

      $(element).attr('data-over',1);

      over();

    }).mouseleave(function(){

      $(element).attr('data-over',0);

      setTimeout(function(){

        if( $(element).attr('data-over')=='0' ) out();

      },delay);

    });

  }

}(jQuery, $STAN));
