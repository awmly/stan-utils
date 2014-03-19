$(function(){

  $(window).on('load resize',function(){

    $('.site').css('min-height',$(window).height()-$('footer').outerHeight()+'px');

  });


  $('header').StickyFix();

  $('.sidebar').AnchorNav({
    items:'.content>h1',
    add_a_active_class:false
  }).StickyFix({
    top:70,
    maxtop:function(_this,_settings){ return $('.content').height()+$('.content').offset().top-$(_this).height()-_settings.top;  },
    stick_to: 'parent',
    devices: { xs:false, sm:true, md:true, lg:true },
    zindex:999
  }).ScrollTo({
      offset:70
  });

  hljs.tabReplace = '    ';
  hljs.initHighlightingOnLoad();

  $('pre code').each(function(i, e){
    hljs.highlightBlock(e)
  });

});
