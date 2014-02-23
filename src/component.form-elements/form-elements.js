/* ========================================================================
 * STAN Utils: Form Elements
 * Author: Andrew Womersley
 * ======================================================================== */

 $(function() {

  'use strict';

    $('.sa-checkbox, .sa-radio').click(function(){

      var $input=$(this).find('input');

      if($input.attr('type')=='radio'){

        $("[name='"+$input.attr('name')+"']").each(function(){

          $(this) .prop('checked',false)
                  .parents('.sa-radio').removeClass('active');

        });

      }

      if($(this).hasClass('active')){

        $(this) .removeClass('active')
                .find('input').prop('checked',false);

      }else{

        $(this) .addClass('active')
                .find('input').prop('checked',true);

      }

    });

    $('.sa-checkbox, .sa-radio').each(function(){

      if($(this).find('input').prop('checked')){

        $(this).addClass('active');

      }

   });

});
