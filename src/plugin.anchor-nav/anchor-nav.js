/* ========================================================================
 * STAN Utils: AnchorNav
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

    'use strict';

    // Define Methods
    var methods = {

        init: function(options) {

            var _this = this;

            // Iterate Through Selectors
            return this.each(function(index) {

                // Set this
                var $this = $(this);

                // Set Options
                var settings = $.extend({
                    items: 'h2',
                    add_li_active_class:false,
                    add_a_active_class:true,
                    attribute:'id',
                    navHTML: "<li><a href='#{id}'>{text}</a></li>",
                }, options);


                // Save settings
                $this.data('AnchorNav', settings);

                // Set regexp for html tag replace
                var regexpid = new RegExp('{id}', 'g');

                // Set regexp for html tag replace
                var regexptext = new RegExp('{text}', 'g');

                var html, id, text;

                // Find Controllers and Set Listeners
                $(settings.items).each(function() {

                    text = !! $(this).attr('data-nav-text') ? $(this).attr('data-nav-text') : $(this).text();

                    id=text.replace(/\W/g, '-').toLowerCase();

                    $(this).attr(settings.attribute,id);

                    html = settings.navHTML.replace(regexpid, id);
                    html = html.replace(regexptext, text);

                    $this.append(html);

                });

                if(settings.add_li_active_class){
                    $this.find('li').click(function(){
                        $this.find('li').removeClass('active');
                        $(this).addClass('active');
                    });
                }

                if(settings.add_a_active_class){
                    $this.find('a').click(function(){
                        $this.find('a').removeClass('active');
                        $(this).addClass('active');
                    });
                }

            });

        }

    };

    $.fn.AnchorNav = function(method) {

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
