/* ========================================================================
 * STAN Plugins: PredInput
 * Author Andrew Womersley
 * ======================================================================== */

(function($, $STAN) {

    'use strict';

    // Define Methods
    var methods = {

        init: function(options) {

            // Iterate Through Selectors
            return this.each(function(index) {

                // Set this
                var $this = $(this);

                // Set Options
                var settings = $.extend({

                    search_url: '',
                    http_request: 'GET',
                    data: [],
                    searching: false

                }, options);

                // Save settings
                $this.data('Predinput', settings);

                // Turn off autocomplete on input box
                $this.find('input').attr('autocomplete', 'off');

                // Add Key press listeners
                $this.find('input').keyup(function(event) {

                    methods.keyup.apply($this, [event]);

                });

                // Stop return from submitting the form
                $this.find('input').keydown(function(event) {

                    if (event.keyCode == 13) event.preventDefault();

                });

                // Clear search
                $this.find('.clear').click(function(event) {

                    $this.find('input').val('');
                    $(this).css('display', 'none');
                    methods.hide_results.apply($this);
                    $this.find('input').focus();

                    // Trigger
                    $this.trigger('clear.sa.predinput', [settings]);

                });

                // Stop propagtion on click
                $this.click(function(event) {

                    event.stopPropagation();

                });

                // Hide when off click
                $('body').click(function() {

                    methods.hide_results.apply($this);

                });

            });

        },

        keyup: function(e) {

            // Load settings
            var settings = $(this).data('Predinput');

            // Set objects
            var $this = $(this);
            var $res = $(this).find('.results');

            // Check for down, up and return keys
            if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13) {

                // Get current index
                var index = parseInt($res.find('ul').attr('data-index'));

                if (e.keyCode == 40) { // down

                    index++;
                    if (index == $res.find('ul li').length) index--;

                }
                else if (e.keyCode == 38) { // up

                    index--;
                    if (index < 0) index = 0;

                }
                else if (e.keyCode == 13) {

                    methods.hide_results.apply($this);

                    // Trigger
                    $this.trigger('selected.sa.predinput', [settings]);

                }

                // Save index
                $res.find('ul').attr('data-index', index);

                // Get object for current index
                var $index = $res.find('ul li:nth-child(' + (index + 1) + ')');

                // Remove active class
                $res.find('ul li').removeClass('active');

                // Add active class to
                $index.addClass('active');

                // Set search string
                $this.find('input').val($index.text());

            }
            else {

                if (!settings.searching) {
                    settings.searching = true;
                    methods.search.apply($this);
                }
                else {
                    settings.search_again = true;
                }

            }

            if ($this.find('input').val()) {
                $this.find('.clear').css('display', 'block');
            }
            else {
                $this.find('.clear').css('display', 'none');
            }

        },

        search: function() {

            // Load settings
            var settings = $(this).data('Predinput');

            // Set objects
            var $this = $(this);
            var $res = $(this).find('.results');

            // Clear results HTML
            $res.html('').css('display', 'block');

            // Do seach
            $.ajax({

                url: settings.search_url,
                cache: false,
                type: settings.http_request,
                data: {
                    search: $(this).find('input').val(),
                    data: JSON.stringify(settings.data)
                }

            }).done(function(results) {

                $res.html(results);

                $res.find('ul').attr('data-index', '-1');

                $res.find('li').each(function(index) {
                    $(this).attr('data-index', index);
                });

                $res.find('li').mouseover(function() {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    $(this).parent().attr('data-index', $(this).attr('data-index'));
                });

                $res.find('li').click(function() {
                    $this.find('input').val($(this).text());
                    methods.hide_results.apply($this);

                    // Trigger
                    $this.trigger('selected.sa.predinput', [settings]);

                });

                settings.searching = false;

                if (settings.search_again) {
                    settings.search_again = false;
                    settings.searching = true;
                    methods.search.apply($this);
                }

                // Trigger
                $this.trigger('search.sa.predinput', [settings]);

            });

        },

        hide_results: function() {
            $(this).find('.results').css('display', 'none');
        }

    };

    $.fn.Predinput = function(method) {

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
