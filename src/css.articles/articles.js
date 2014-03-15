/* ========================================================================
 * STAN Utils: Articles
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

    'use strict';

    $('article.click').click(function(){
      document.location.href=$(this).find("a").eq(0).attr('href');
    });
    $('article.click a').click(function(event){
      event.stopPropagation();
    });

});
