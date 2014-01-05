/* ========================================================================
 * STAN Utils: CollapseTab
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

    'use strict';

    // Define Global Vars
    var Selectors = [];

    // Resize Listener for resizing slideshow height
    $(window).resize(function() {

        if (!Selectors.length) return;

        $(Selectors).each(function() {

            // Resize check
            methods.resize.apply(this);

        });

    }).resize();


    // Click Listeners
    $(window).ready(function() {

        // Show
        $("[data-toggle='collapse-tab']").click(function() {

            methods.show.apply($($(this).attr('data-target')), [$(this)]);

            return false;

        });

    });

    // Define Methods
    var methods = {

        init: function(options) {

            // Save selector in array
            $(this.selector).each(function(){

                Selectors.push( $(this) );

            });

            // Iterate Through Selectors
            return this.each(function() {

                var $this = $(this);

                // Set Options
                var settings = $.extend({
                    breakpoint: 768,
                    view: false
                }, options);

                // Set Options
                $(this).data('CollapseTab', settings);

                $(this).find('.tab-pane.active>div').addClass('in');

                // Add click listeners
                $(this).find("[data-toggle='collapse']").click(function() {

                    methods.accordion.apply($this, [$(this)]);

                });

                // Do resize
                methods.resize.apply(this);

            });

        },

        show: function(_this) {

            var settings = $(this).data('CollapseTab');

            if (settings.view == 'tab') {

                $(".nav-tabs [href='" + $(_this).attr('href') + "']").tab('show');

            }
            else {

                $($(_this).attr('href') + ">div").collapse('show');
                methods.accordion.apply($(this), [$("[data-target='" + $(_this).attr('href') + ">div']")]);

            }

        },

        accordion: function(t) {

            this.find("[data-toggle='collapse']").not(t).each(function() {
                var tar = $(this).attr('data-target');
                if ($(tar).hasClass('in')) $(tar).collapse('hide');
            });

        },

        resize: function() {

            var settings = $(this).data('CollapseTab');

            if ($(window).width() < settings.breakpoint) {

                if (settings.view != 'collapse') {

                    $(this).find('.tab-pane').addClass('active');

                    $(this).find('.in').addClass('collapse');

                    var index = $(this).find('.nav-tabs li').index($(this).find('.nav-tabs .active'));

                    $(this).find('.collapse:eq(' + index + ')').removeClass('collapse');

                    $(this).trigger('collapse.sa.collapsetab', [settings]);

                }

                $(this).find('.collapse').removeClass('in');

                $(this).find("[data-toggle='collapse-off']").attr('data-toggle', 'collapse');

                settings.view = 'collapse';

            }
            else {

                if (settings.view != 'tab') {

                    var indx = 0;
                    $(this).find('.tab-pane').each(function(index) {
                        if ($(this).find('div').hasClass('in')) indx = index;
                    });

                    $(this).find('.nav-tabs li').removeClass('active');
                    $(this).find('.tab-pane').removeClass('active');

                    $(this).find('.nav-tabs li:eq(' + indx + ')').addClass('active');
                    $(this).find('.tab-content .tab-pane:eq(' + indx + ')').addClass('active');

                    $(this).trigger('tab.sa.collapsetab', [settings]);

                }

                $(this).find('.collapse').css('height', 'auto').addClass('in');

                $(this).find("[data-toggle='collapse']").attr('data-toggle', 'collapse-off');

                settings.view = 'tab';

            }

        }

    };

    $.fn.CollapseTab = function(method) {

        if (methods[method]) {

            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

        }
        else if (typeof method === 'object' || !method) {

            return methods.init.apply(this, arguments);

        }
        else {

            $.error('Method ' + method + ' does not exist on jQuery.Datatable');

        }

    };

}(jQuery, $STAN));
