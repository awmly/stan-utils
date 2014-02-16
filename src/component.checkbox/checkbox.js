/* ========================================================================
 * STAN Utils: Checkbox
 * Author: Andrew Womersley
 * ======================================================================== */

 $(function() {

  'use strict';

    $('.sa-checkbox').click(function(){

      if($(this).hasClass('active')){

        $(this).removeClass('active');
        $(this).find('input').val(0);

      }else{

        $(this).addClass('active');
        $(this).find('input').val(1);

      }

    });

    $('.sa-checkbox').each(function(){

      if($(this).find('input').val()==1){
        $(this).addClass('active');
      }

   });

});
