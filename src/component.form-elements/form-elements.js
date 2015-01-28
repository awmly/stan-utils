/* ========================================================================
 * STAN Utils: Form Elements
 * Author: Andrew Womersley
 * ======================================================================== */

 $(function() {

  'use strict';

    $('.sa-checkbox, .sa-radio, .sa-select-multiple label').click(function(event){

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

      event.preventDefault();

    });

    $('.sa-checkbox, .sa-radio, .sa-select-multiple label').each(function(){

      if($(this).find('input').prop('checked')){

        $(this).addClass('active');

      }

   });


   // data-toggle='input-sync' data-target='.moduleid' data-action='/scripts/backend/get-modules'
   $("[data-toggle='input-sync']").change(function(){

     $t=$(this);

     $( $t.attr('data-target') ).load( $t.attr('data-action'), { syncid: $t.val() } );

   }).change();


   // data-toggle='set-value' data-target='[name="configure"]' data-value='1' data-no-submit
   $("[data-toggle='set-value']").click(function(){

     $t=$(this);

     $( $t.attr('data-target') ).val( $t.attr('data-value') );

     if( $t.is('[data-no-submit]') ) return false;

   });

});
