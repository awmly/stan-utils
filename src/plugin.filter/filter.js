/* ========================================================================
 * STAN Utils: Filter
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
            methods.filter.apply(this,[false]);

        });

    }).resize();

    // Define Methods
    var methods = {

        init: function(options) {

            // Iterate Through Selectors
            return this.each(function(index) {

                // Save selector in array
                Selectors.push($(this));

                // Add controller class
                $(this).addClass('sa-filter');

                // Set this
                var $this = $(this);
                var i, layer;

                // Set Options
                var settings = $.extend({
                    selector:'div',
                    setNav:false,
                    navHolder:'.filternav',
                    navHTML: '<li data-tag="{tag}">{tag} <span>{matches}</span><i class="sa-on fa fa-times"></i><i class="sa-off fa fa-check"></i></li>',
                    loadMore: '.sa-filter-load',
                    inactiveClass: false,
                    activeClass:false,
                    resultsPerPage:{ xs:4, sm:6, md:8, lg:10 },
                    currentTags:[],
                    currentPage:1,
                }, options);

                // Save settings
                $this.data('Filter', settings);

                // set Navigation
                if( settings.setNav ) methods.setNav.apply(this);

                methods.getMatches.apply(this);

                $(settings.navHolder).find('[data-tag]').click(function(){

                    settings.currentPage=1;
                    methods.filter.apply($this,[$(this)]);

                });

                $(settings.loadMore).click(function(){

                    settings.currentPage++;
                    methods.filter.apply($this,[false]);
                    $(this).blur();

                });

                methods.filter.apply($this,[false]);

            });

        },

        filter:function(tag){

            // Get settings and set this
            var settings = $(this).data('Filter');
            var $this = $(this);

            var index, display, tags, x;

            // Tigger pre filter event
            $(this).trigger('post.sa.filter', [settings]);

            if(tag){

                if(tag.hasClass('active')){
                    tag.removeClass('active');
                    index = settings.currentTags.indexOf(tag.attr('data-tag'));
                    settings.currentTags.splice(index,1);
                }else{
                    tag.addClass('active');
                    settings.currentTags.push(tag.attr('data-tag'));
                }

            }

            var Results=settings.resultsPerPage[$STAN.device]*settings.currentPage;
            var matches=0;

            $this.find(settings.selector).each(function(index){

                tags=$(this).attr('data-tags').split(",");
                display=false;

                if( !settings.currentTags.length ) display=true;
                for(x in tags){
                    if( settings.currentTags.indexOf(tags[x]) >= 0) display=true;
                }

                if(display) matches++;

                if(display && matches<=Results){
                    if(settings.activeClass)    $(this).addClass(settings.activeClass);
                    if(settings.inactiveClass)  $(this).removeClass(settings.inactiveClass);
                }else{
                    if(settings.activeClass)    $(this).removeClass(settings.activeClass);
                    if(settings.inactiveClass)  $(this).addClass(settings.inactiveClass);
                }

            });

            if(matches<=Results){
                $(settings.loadMore).css('display','none');
            }else{
                $(settings.loadMore).css('display','block');
            }

            // Tigger post filter event
            $(this).trigger('post.sa.filter', [settings]);

        },

        setNav:function(){

            // Get settings and set this
            var settings = $(this).data('Filter');
            var $this = $(this);

            var html, tags, regexp, x;

            var Tags=[];

            $this.find(settings.selector).each(function(){

                tags=$(this).attr('data-tags').split(",");

                for(x in tags){
                    if( Tags.indexOf(tags[x]) < 0) Tags.push(tags[x]);
                }

            });

            Tags.sort();

            for( x in Tags ){

                regexp = new RegExp('{tag}', 'g');

                html = settings.navHTML.replace(regexp, Tags[x]);

                $(settings.navHolder).append(html);
            }

        },

        getMatches:function(){

             // Get settings and set this
            var settings = $(this).data('Filter');
            var $this = $(this);


            $(settings.navHolder).find('[data-tag]').each(function(){

                $(this).find('span').text( $this.find('[data-tags*="'+$(this).attr('data-tag')+'"].active').length );

            });

        }

    };

    $.fn.Filter = function(method) {

        if (methods[method]) {

            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

        } else if (typeof method === 'object' || !method) {

            return methods.init.apply(this, arguments);

        } else {

            $.error('Method ' + method + ' does not exist on jQuery.Datatable');

        }

    };

}(jQuery, $STAN));
