/* ========================================================================
 * STAN Utils: Filter
 * Author: Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

    'use strict';

    // Define Global Vars
    var Selectors = [];

    $STAN.on('window.resize',function() {

        if (!Selectors.length) return;

        $(Selectors).each(function() {

            // Resize check
            methods.filter.apply(this, [false]);

        });

    });

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
                    selector: 'div',
                    activeClass: 'active',
                    inactiveClass: 'inactive',
                    setNav: false,
                    navHolder: '.filternav',
                    navHTML: '<li data-tag="{tag}">{tag} <span></span><i class="sa-on fa fa-times"></i><i class="sa-off fa fa-check"></i></li>',
                    resultsPerPage: {
                        xs: 4,
                        sm: 6,
                        md: 8,
                        lg: 10
                    },
                    currentTags: [],
                    currentPage: 1,
                }, options);

                // Save settings
                $this.data('Filter', settings);

                // set Navigation
                if (settings.setNav) methods.setNav.apply(this);

                // Update matches
                methods.getMatches.apply(this);

                // Set active classes from hash
                methods.getHash.apply(this);

                // Do filter
                methods.filter.apply($this);

                // Add click listeners to navigation
                $(settings.navHolder).find('[data-tag]').click(function() {

                    // Update filter
                    methods.updateTags.apply($this, [$(this)]);

                });

                // Add click listeners to load more
                $this.find('.sa-load').click(function() {

                    // Incriment current page
                    settings.currentPage++;

                    // Update filter
                    methods.filter.apply($this);

                    // Remove focus from button
                    $(this).blur();

                });

                // Set hashchange event
                $(window).on('hashchange', function() {

                    // Reset pages to 1
                    settings.currentPage = 1;

                    // Update filter
                    methods.getHash.apply($this);

                });

                // Show filter holder
                setTimeout(function() {
                    $this.css('visibility', 'visible');
                }, 500);

            });

        },

        updateTags: function(tag) {

            // Get settings and set this
            var settings = $(this).data('Filter');
            var $this = $(this);

            // Tigger pre filter event
            $(this).trigger('pre.sa.filter', [settings]);

            // Check if tag is in currentTags
            var index = $.inArray(tag.attr('data-tag'),settings.currentTags);

            if(index>=0){

                // Remove tag
                settings.currentTags.splice(index, 1);

            }else{

                // Add tag
                settings.currentTags.push(tag.attr('data-tag'));

            }

            // Update hash
            window.location.hash=settings.currentTags.join('|').replace(/ /g,'+');

        },

        getHash:function(){

            // Get settings and set this
            var settings = $(this).data('Filter');
            var $this = $(this);

            // Declare some vars
            var x;

            // Get tags from hash and explode at pipes
            var tags=window.location.hash.substring(1).split("|");

            // Reset currentTags
            settings.currentTags=[];

            // Clear active classes
            $(settings.navHolder).find("[data-tag]").removeClass('active');

            // If tags is set
            if(tags[0]){

                for(x in tags){

                    // Add active class to nav element
                    $(settings.navHolder).find("[data-tag='"+tags[x]+"']").addClass('active');

                    // Add tag to currentTags array
                    settings.currentTags.push(tags[x]);

                }

            }

            // Do filter
            methods.filter.apply($this);

        },

        filter: function() {

            // Get settings and set this
            var settings = $(this).data('Filter');
            var $this = $(this);

            // Declare some vars
            var display, tags, x;

            // Set maximum results
            var Results = settings.resultsPerPage[$STAN.device] * settings.currentPage;

            // Set matches to zero
            var matches = 0;

            // Loop through selectors
            $this.find(settings.selector).each(function(index) {

                // Get selectors tags
                tags = $(this).attr('data-tags').split(",");

                // Set display to false
                display = false;

                // If no filters are set - set display to true
                if (!settings.currentTags.length) display = true;

                for (var x in tags) {

                    // If selector has active filter - set display to true
                    if ($.inArray(tags[x],settings.currentTags) >= 0) display = true;

                }

                // Incriment matches if display=true
                if (display) matches++;

                // Add/remove activate and inactive classes from filters depending on display
                if (display && matches <= Results) {
                    $(this).addClass(settings.activeClass).removeClass(settings.inactiveClass);
                } else {
                    $(this).removeClass(settings.activeClass).addClass(settings.inactiveClass);
                }

            });

            // Show/hide load more button depending on number of results
            if (matches <= Results) {
                $this.find('.sa-load').css('display', 'none');
            } else {
                $this.find('.sa-load').css('display', 'block');
            }

            // Tigger post filter event
            $(this).trigger('post.sa.filter', [settings]);

        },

        setNav: function() {

            // Get settings and set this
            var settings = $(this).data('Filter');
            var $this = $(this);

            // Set tags array
            var Tags = [];

            // Declare some vars
            var html, tags, tagexp, labelexp, x;

            // Loop through selectors and get all tags
            $this.find(settings.selector).each(function() {

                // Get tags from attribute
                tags = $(this).attr('data-tags').split(",");

                for (var x in tags) {

                    // Add tag to array if not already added
                    if ($.inArray(tags[x],Tags) < 0 && tags[x]) Tags.push(tags[x]);



                }

            });

            // Sort tags in alphabetical order
            Tags.sort();

            // Set regexp for html tag replace
            tagexp = new RegExp('{tag}', 'g');
            labelexp = new RegExp('{label}', 'g');

            // Loop though tags
            for (x in Tags) {

                // Replace tag name in HTML string
                html = settings.navHTML.replace(tagexp, Tags[x]);
                html = html.replace(labelexp, decodeURIComponent(Tags[x].replace(/\+/g, ' ')));

                // Add HTML to nav
                $(settings.navHolder).append(html);

            }

        },

        getMatches: function() {

            // Get settings and set this
            var settings = $(this).data('Filter');
            var $this = $(this);

            // Loop through navigation and update matches totals
            $(settings.navHolder).find('[data-tag]').each(function() {

                $(this).find('span').text($this.find('[data-tags*="' + $(this).attr('data-tag') + '"]').length);

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
