/* ========================================================================
 * STAN Utils: Card UI
 * Author: Andrew Womersley
 * ======================================================================== */

$(function() {

    'use strict';

    var HitTestCount=0;

    var CardHitTest = function($card,$siblings,top,left,width,height){

        var t = top;
        var l = left;
        var w = width;
        var h = height;
        var b = t+h;
        var r = l+w;

        /*var ct = top;
        var cl = left;
        var cw = 100;
        var ch = 30;
        var cb = ct+ch;
        var cr = cl+cw;*/



        var st, sl, sw, sh, sb, sr;
        //console.log(t + " " +l + " " + w + " " + h);

        var HIT=false;

        $siblings.each(function(index){

          if($(this).data('active') && !HIT){

            var st = $(this).data('top');
            var sl = $(this).data('left');
            var sw = $(this).data('width');
            var sh = $(this).outerHeight(true);
            var sb = st+sh;
            var sr = sl+sw;

            HitTestCount++;

            //console.log(index+" "+st+" "+sb);

            //console.log(t + " " + st + " " + b + " " + sb);
            //if( (t>=st && t<sb) || (b>st && b<=sb) ){
            if( t<sb && b>st){
              //console.log("HIT TOP");
              //console.log(l + " " + r + " " + sl + " " + sr);
              if( l<sr && r>sl ){
                //console.log("HIT SIDES");
                HIT=true;
              }
            }

          }

        });

        if(!HIT){

          //console.log("OK");
          return true;

        }else{

          //console.log("HIT");
          return false;

        }

    };

    var CardUI = function() {

        $(".sa-cards").each(function() {

            var $this = $(this);

            var selector = (typeof $(this).attr('data-selector') !== 'undefined') ? $(this).attr('data-selector') : '.card';
            var maxCols = (typeof $(this).attr('data-maxcols') !== 'undefined') ? $(this).attr('data-maxcols') : '12';

            if ($(this).find(selector).length) {

                var max, _Pos, _Col, _Col2, pos, col, top, span, width, colid, ok;

                var minwidth=$this.outerWidth()/maxCols;

                $(this).find(selector).data('active',false);
                _Col=[ [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0] ];
                _Col2=[0];

                $this.find(selector).each(function(index) {

                  if($STAN.device=='xs'){

                    $(this).removeClass('absolute').css({
                        left: 'auto',
                        top: 'auto'
                    });

                  }else{

                    width = $(this).outerWidth();
                    span = maxCols / Math.round(($this.parent().width()+30) / width);

                    pos=9999;
                    top=9999;

                    //console.log(_Col2);

                    //for(var x in _Col){

                      //_Pos=_Col[x];
                    //  _Pos=_Col2;

                      //console.log("COL: "+x);
                      //console.log(_Pos);

                      for(var y in _Col2){
                        ok=false;
                        for(var x=0; x<maxCols; x++){
                          if(_Col2[y]>=0){
                            if( CardHitTest( $(this), $this.find(selector), _Col2[y], x*100, 100, 50 ) ){

                              ok=true

                            }
                          }
                        }
                        if(!ok) _Col2[y]=-1;
                      }

                    //}

                    for(var x=0; x<maxCols; x++){

                      _Pos=_Col2;

                      for(var y in _Pos){

                        if(_Pos[y]<top ){
                          colid=parseInt(span)+parseInt(x);

                          if(colid<=maxCols && _Pos[y]>=0){

                            if( CardHitTest( $(this), $this.find(selector), _Pos[y], x*100, span*100, $(this).outerHeight(true) ) ){
                              col = x;
                              pos = y
                              top = _Pos[y];
                            }

                          }
                        }

                      } // end _Pos loop

                    } // end _Col loop

                    $(this).addClass('absolute').css({
                        left: (minwidth * col) + 'px',
                        top: top + 'px'
                    }).data('active',true).data('top',top).data('left',(100 * col)).data('width',(100* span));

                    for(var x=0; x<span; x++){
                      colid=parseInt(col)+parseInt(x);
                      //console.log(colid);
                      //_Col[colid].push( (top+$(this).outerHeight(true)) );

                    }

                    _Col2.push( (top+$(this).outerHeight(true)) );

                    } // end if device XS

                  }); // end selector each

                  max = 0;

                  // Find highest column
                  for(var y in _Col2){

                      if (_Col2[y] > max) max = _Col2[y];

                  }

                  // Set holder height to match highest column
                  if($STAN.device=='xs'){
                    $(this).css('height', 'auto');
                  }else{
                    $(this).css('height', max + 'px');
                  }
                  //console.log(HitTestCount);



            } // end if selector length

        }); // end sa-cards each

    }; // end function

    //$(window).on('resize', CardUI);

    $('body').on('active.sa.stan', CardUI);

    $('.sa-cards').on('position.sa.cards', CardUI);

});
