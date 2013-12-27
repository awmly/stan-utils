/* ========================================================================
 * STAN Plugins: Stan
 * Author Andrew Womersley
 * ======================================================================== */

var $STAN_Config = {
    tag: 'body',
    xs: 768,
    sm: 992,
    md: 1200
};

var $STAN;

(function(Config) {

    'use strict';

    // Define breakpoints
    var Breakpoints = [{
        'id': 'xs',
        'min-width': 0,
        'max-width': Config.xs,
        'class': 'device-xs',
        'device': 'xs'
    }, {
        'id': 'sm',
        'min-width': Config.xs,
        'max-width': Config.sm,
        'class': 'device-sm',
        'device': 'sm'
    }, {
        'id': 'md',
        'min-width': Config.sm,
        'max-width': Config.md,
        'class': 'device-md',
        'device': 'md'
    }, {
        'id': 'lg',
        'min-width': Config.md,
        'max-width': 0,
        'class': 'device-lg',
        'device': 'lg'
    }, {
        'id': 'mobile',
        'min-width': 0,
        'max-width': Config.sm,
        'class': 'mobile',
        'mobile': true
    }, {
        'id': 'desktop',
        'min-width': Config.sm,
        'max-width': 0,
        'class': 'desktop',
        'mobile': false
    }];

    var _STAN = function(deferTrigger) {

        var STAN = !! window.$STAN ? window.$STAN : {
            current_ids: []
        };
        var current_ids = [];
        var i;
        var x;
        var bp;
        var ww;
        var dfd = $.Deferred();
        var triggers = [];

        // Loop through breakpoints - reset data
        for (i in Breakpoints) {

            bp = Breakpoints[i];

            // Remove classes
            $(Config.tag).removeClass(bp.class);

            // Remove attributes
            for (x in bp) STAN[x] = false;

        }

        // Loop through breakpoints - set data
        for (i in Breakpoints) {

            bp = Breakpoints[i];

            ww = $(window).width();

            if (bp['min-width'] <= ww && ww < ((!bp['max-width']) ? 9999 : bp['max-width'])) {

                // Add class
                $(Config.tag).addClass(bp.class);

                // Add attributes
                for (x in bp) STAN[x] = bp[x];

                // Add id to current_ids
                current_ids.push(bp.id);

            }
            
            if (current_ids.indexOf(bp.id) > -1 && STAN.current_ids.indexOf(bp.id) == -1) triggers.push({ type:'active', id:bp.id });
            if (STAN.current_ids.indexOf(bp.id) > -1 && current_ids.indexOf(bp.id) == -1) triggers.push({ type:'deactive', id:bp.id });

        }

        // Set current ids
        STAN.current_ids = current_ids;

        // Assign STAN to $_STAN global
        window.$STAN = STAN;

        // If defer trigger is true - delay the activate trigger till window is ready
        if (deferTrigger) {

            $(window).on('ready', function() {
                _STAN_Triggers(triggers);
            });

        }
        else {

            _STAN_Triggers(triggers);

        }

    };

    var _STAN_Triggers=function(triggers){
        
        for(var i in triggers){
            var trigger=triggers[i];
            $(Config.tag).trigger(trigger.type+'.sa.stan', [trigger.id]);
        }

    };

    // Set resize listener
    $(window).on('resize', function() {
        _STAN(false);
    });

    // Run
    _STAN(true);


})($.extend({

    tag: 'body',
    xs: 768,
    sm: 992,
    md: 1200

}, ((typeof $STAN_Config === 'undefined') ? [] : $STAN_Config)));
