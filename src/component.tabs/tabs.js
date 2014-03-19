/* ========================================================================
 * STAN Utils: Tabs
 * Author: Andrew Womersley
 * ========================================================================*/

 $(function(){

  'use strict';

  $('.sa-tabs>ul a').click(function(event){

    event.preventDefault();

    $(this).tab('show');

  });

  $('.sa-tabs').each(function(tabsindex){

    $(this).addClass('sa-tabs-'+tabsindex);

    $(this).find('>ul a').each(function(index){

      $(this).attr('data-target','.sa-tabs-'+tabsindex+' .tab-pane-'+index);

    });

    $(this).find('.tab-pane').each(function(index){

      $(this).addClass('tab-pane-'+index);

    });

    // check active
    $(this).find('>ul li:nth-child(1)').addClass('active');
    $(this).find('.tab-pane-0').addClass('active');

  });



});
