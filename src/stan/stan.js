/* ========================================================================
 * STAN Utils: Stan
 * Author: Andrew Womersley
 * ======================================================================== */

var $STAN;

(function(CustomConfig) {

    'use strict';

    var Tag = !! CustomConfig.tag ? CustomConfig.tag : 'body';

    var Config = {

        xs: {
            min_width: 0,
            classes: 'device-xs mobile',
            data: {
                mobile: true,
                desktop: false
            }
        },
        sm: {
            min_width: 768,
            classes: 'device-sm mobile',
            data: {
                mobile: true,
                desktop: false
            }
        },
        md: {
            min_width: 992,
            classes: 'device-md desktop',
            data: {
                mobile: false,
                desktop: true
            }
        },
        lg: {
            min_width: 1200,
            classes: 'device-lg desktop',
            data: {
                mobile: false,
                desktop: true
            }
        }

    };

    // Merge Config with CustomConfig
    for (var i in Config) {
        if (typeof CustomConfig[i] === 'object') Config[i] = $.extend(Config[i], CustomConfig[i]);
    }

    // Set Max Widths
    Config.xs.max_width = Config.sm.min_width;
    Config.sm.max_width = Config.md.min_width;
    Config.md.max_width = Config.lg.min_width;
    Config.lg.max_width = 9999;


    var _STAN = function(deferTrigger) {

        var STAN = !! window.$STAN ? window.$STAN : [];
        var device;
        var current_device;
        var triggers = [];
        var x;
        var bp;
        var ww;

        // Loop through breakpoints - reset data
        for (device in Config) {

            bp = Config[device];

            // Remove classes
            $(Tag).removeClass(bp.classes);

            // Remove data attributes
            for (x in bp.data) STAN[x] = false;

        }

        current_device = STAN.device;

        // Loop through breakpoints - set data
        for (device in Config) {

            bp = Config[device];

            ww = $(window).width();

            if (bp.min_width <= ww && ww < bp.max_width) {

                // Add class
                $(Tag).addClass(bp.classes);

                if (current_device != device) triggers.push({
                    type: 'active',
                    device: device
                });

                // Add attributes
                STAN.device = device;
                STAN.classes = bp.classes;
                for (x in bp.data) STAN[x] = bp.data[x];

            }
            else {

                if (current_device == device) triggers.push({
                    type: 'deactive',
                    device: device
                });

            }

        }

        // Assign STAN to $_STAN global
        window.$STAN = STAN;

        // If defer trigger is true - delay the activate trigger till window is ready
        if (deferTrigger) {

            $(window).on('ready', function() {
                //_STAN_Triggers(triggers);
            });

        }
        else {

            _STAN_Triggers(triggers);

        }

    };

    var _STAN_Triggers = function(triggers) {

        for (var i in triggers) {
            var trigger = triggers[i];
            $(Tag).trigger(trigger.type + '.sa.stan', [trigger.device]);
        }

    };

    // Set resize listener
    $(window).on('resize', function() {
        _STAN(false);
    });

    $(window).load(function(){
      $(window).resize();
    });

    // Run
    _STAN(true);


})( ((typeof $STAN_Config === 'undefined') ? [] : $STAN_Config) );
