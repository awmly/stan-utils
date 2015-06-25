/* ========================================================================
 * STAN Utils: Card UI
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

  'use strict';

  var CardUI = function() {

    $(".sa-cards").each(function() {

      var $this = $(this);

      var selector = (typeof $(this).attr('data-selector') !== 'undefined') ? $(this).attr('data-selector') : '.card';
      var order = (typeof $(this).attr('data-order') !== 'undefined') ? $(this).attr('data-order') : 'random';

      if ($(this).find(selector).length) {

        // Get the width of the selector
        var width = $this.find(selector).outerWidth();

        // Set number of cols based on current view
        var NumCols = Math.round($this.width() / width) - 1;

        // Set our cols array which will hold the height of each column - presume a max of 12
        var Cols = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        // Define som evars
        var x, col, left, max, min;
        var cnt = 0;

        $this.find(selector).each(function() {

          min = 99999;

          if (order == 'random') {

            // Get shortest column
            for (x = 0; x <= NumCols; x++) {

              if (Cols[x] < min) {
                col = x;
                min = Cols[x];
              }

            }

          } else {
            col = cnt;
            cnt++;
            if (cnt > NumCols) cnt = 0;
          }

          // Set top and left position for card
          $(this).css({
            left: (width * col) + 'px',
            top: Cols[col] + 'px',
            opacity: 1
          });

          // Update column height
          Cols[col] += $(this).outerHeight(true);

        });


        max = 0;

        // Find highest column
        for (x = 0; x < NumCols; x++) {

          if (Cols[x] > max) max = Cols[x];

        }

        // Set holder height to match highest column
        $(this).css('height', max + 'px');

      }

    });

  }

  $STAN.on('window.resize', CardUI);
  $STAN.on('cards.position', CardUI);

});
