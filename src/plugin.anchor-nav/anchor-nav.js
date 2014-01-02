/* ========================================================================
 * STAN Plugins: AnchorNav
 * Author Andrew Womersley
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
                    li_class: '',
                    a_class: '',
                    add_li_active_class:false,
                    add_a_active_class:true
                }, options);


                // Save settings
                $this.data('AnchorNav', settings);

                // Find Controllers and Set Listeners
                $(settings.items).each(function() {

                    var id=$(this).text().replace(/\W/g, '');
                    $(this).attr('id',id);
                    $this.append("<li class='"+settings.li_class+"'><a href='#"+id+"' class='"+settings.a_class+"'>"+$(this).text()+"</a></li>");

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