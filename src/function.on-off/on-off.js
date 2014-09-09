/* ========================================================================
 * STAN Utils: On / Off
 * Author: Andrew Womersley
 * ========================================================================*/

 (function($, $STAN) {

    'use strict';

    // Shortcut events
    $STAN.on=function(_event,_callback){

      if(_event=='xs' || _event=='sm' || _event=='md' || _event=='lg'){

        $($STAN.Tag).on('active.sa.stan',function(event,device){
          if(device==_event) _callback();
        });

      }else{

        $($STAN.Tag).on(_event + '.sa.stan',_callback);

      }

    };

    $STAN.off=function(_event,_callback){

      if(_event=='xs' || _event=='sm' || _event=='md' || _event=='lg'){

        $($STAN.Tag).on('deactive.sa.stan',function(event,device){
          if(device==_event) _callback();
        });

      }

    };

}(jQuery, $STAN));
