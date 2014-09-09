/* ========================================================================
 * STAN Utils: Tabs
 * Author: Andrew Womersley
 * ========================================================================*/

$(function() {

    'use strict';

    // Main collapse tab function
    var CollapseTab = function() {

        // Get window width
        var w = $(window).width();

        $(".sa-collapse-tabs").each(function() {

            // Get breakpoint if set - if not use default
            var breakpoint = (typeof $(this).attr('data-breakpoint') !== 'undefined') ? $(this).attr('data-breakpoint') : 992;

            // Remove desktop and mobile classes
            $(this).removeClass('desktop mobile');

            // Check if width is larger/smaller than breakpoint
            if (w < breakpoint) {

                if( $(this).data('index')<0 ){

                  $(this).find(".tab-pane").eq(0).removeClass('active');
                  $(this).find(".tab-nav li").eq(0).removeClass('active');

                }

                // Add mobile class to main collapse tabs
                $(this).addClass('mobile');

            } else {

                // Check for active index
                if( $(this).data('index')<0 ){

                  $(this).find(".tab-pane").eq(0).addClass('active');
                  $(this).find(".tab-nav li").eq(0).addClass('active');

                }

                // Add desktop class to main collapse tabs
                $(this).addClass('desktop');

            }

        });

    };

    // Read hash
    var readHash = function() {

        // Set active based on hash
        var hash = window.location.hash.substring(1);

        $('.sa-tabs, .sa-collapse-tabs').each(function(tabsindex) {

            if (hash) {
                if ($(this).find(".tab-nav [data-id='" + hash + "']").length) {

                    $(this).find(".tab-nav [data-id]").removeClass('active');
                    $(this).find(".tab-nav [data-id='" + hash + "']").addClass('active');

                }
            }

            // Get index of active tab
            var index = $(this).find(".tab-nav li.active").index();

            // Store index
            $(this).data('index', index);

            if(index>=0){

              // Make active nav's tab-pane visible
              $(this).find(".tab-pane").removeClass('active');
              $(this).find(".tab-pane").eq(index).addClass('active');

              // Collapse Tab logic
              if ($(this).hasClass('sa-collapse-tabs')) {

                  // Remove active collapse classes
                  $(this).find('.sa-content').removeClass('in').addClass('collapse').css('height', 0);

                  // Add active collapse classes
                  $(this).find('.sa-content').eq(index).addClass('in').removeClass('collapse').css('height', 'auto');
              }

            }

        });

    };


    // Added needed HTML markup
    $('.sa-tabs, .sa-collapse-tabs').each(function(tabsindex) {

        $(this).addClass('sa-tabs-' + tabsindex);

        $(this).find('.tab-nav li').each(function(index) {

            $(this).attr('data-target', '.sa-tabs-' + tabsindex + ' .tab-pane-' + index);

        });

        $(this).find('.tab-pane').each(function(index) {

            $(this).addClass('tab-pane-' + index);

        });

        // Check there is an active class
        if (!$(this).find(".tab-nav li.active").length) {
            //$(this).find(".tab-nav li").eq(0).addClass('active');
        }

    });

    // Add click listener
    $('.tab-nav li').click(function(event) {

        event.preventDefault();

        // Show tab
        $(this).tab('show');

    });

    // Click event to show collapse
    $('.sa-collapse-tabs .sa-click').click(function() {

        if ($(this).parents('.sa-collapse-tabs').hasClass('mobile')) {

            var collapse=$(this).parent().find('.sa-content');

            //if( !collapse.hasClass('in') ) collapse.collapse('show');
            collapse.collapse('toggle');

        }

    });

    // BS tab shown event
    $('.tab-nav li').on('shown.bs.tab', function(event) {

        // Update active classes
        $(event.target).siblings().removeClass('active');
        $(event.target).addClass('active');

        if ($(event.target).attr('data-id')) {

            // Update hash
            window.location.hash = $(event.target).attr('data-id');

        } else {

            // Manually invoke refresh
            readHash();

        }

    });

    // BS collpase show event to trigger accordion effect
    $('.sa-collapse-tabs .sa-content').on('show.bs.collapse', function() {

        $(this).parent().siblings().find('.sa-content.in').collapse('hide');

    });

    //////////////
    $('.sa-collapse-tabs .sa-content').on('hidden.bs.collapse', function(event) {

        $(event.target).parent().removeClass('active');

    });


    // BS collapse shown event to update hash
    $('.sa-collapse-tabs .sa-content').on('shown.bs.collapse', function() {

        var index = $(this).parent().index();

        var hash = $(this).parents('.sa-collapse-tabs').find('.tab-nav li').eq(index).attr('data-id') || false;

        if("#"+hash==window.location.hash){
          readHash();
        }else{
          window.location.hash = hash;
        }

    });


    // Add collapse classes
    $('.sa-collapse-tabs .sa-content').addClass('collapse');

    // Add resize listener
    $STAN.on('resize', CollapseTab);

    // Set hashchange event
    $(window).on('hashchange', readHash);

    readHash();

});
