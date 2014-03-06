/* ========================================================================
 * STAN Utils: Dropdown
 * Author: Andrew Womersley
 * ======================================================================== */

 $(function() {

  'use strict';

    $('.sa-dropdown').click(function(event){

      $('.sa-dropdown').removeClass('active');

      $(this).addClass('active');

      event.stopPropagation();

    });

    $('body').on('click',function(){

      $('.sa-dropdown').removeClass('active');

    });

});
