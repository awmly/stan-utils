/*!
 * STAN Utils 0.0.1
 * Copyright 2014 Andrew Womersley
 */

/*!
 * STAN Utils 0.0.1
 * Copyright 2014 Andrew Womersley
 */

/*!
 * STAN Utils 0.0.1
 * Copyright 2014 Andrew Womersley
 */

/*!
 * STAN Utils 0.0.1
 * Copyright 2014 Andrew Womersley
 */

/*!
 * STAN Utils 0.0.1
 * Copyright 2014 Andrew Womersley
 */

/*!
 * STAN Utils 0.0.1
 * Copyright 2014 Andrew Womersley
 */

/*!
 * STAN Utils 0.0.1
 * Copyright 2014 Andrew Womersley
 */

var $STAN;!function(a){"use strict";var b=a.tag?a.tag:"body",c={xs:{min_width:0,classes:"device-xs mobile",data:{mobile:!0,desktop:!1}},sm:{min_width:768,classes:"device-sm mobile",data:{mobile:!0,desktop:!1}},md:{min_width:992,classes:"device-md desktop",data:{mobile:!1,desktop:!0}},lg:{min_width:1200,classes:"device-lg desktop",data:{mobile:!1,desktop:!0}}};for(var d in c)"object"==typeof a[d]&&(c[d]=$.extend(c[d],a[d]));c.xs.max_width=c.sm.min_width,c.sm.max_width=c.md.min_width,c.md.max_width=c.lg.min_width,c.lg.max_width=9999;var e=function(a){var d,e,g,h,i,j=window.$STAN?window.$STAN:[],k=[];for(d in c){h=c[d],$(b).removeClass(h.classes);for(g in h.data)j[g]=!1}e=j.device;for(d in c)if(h=c[d],i=$(window).width(),h.min_width<=i&&i<h.max_width){$(b).addClass(h.classes),e!=d&&k.push({type:"active",device:d}),j.device=d,j.classes=h.classes;for(g in h.data)j[g]=h.data[g]}else e==d&&k.push({type:"deactive",device:d});window.$STAN=j,a?$(window).on("ready",function(){f(k)}):f(k)},f=function(a){for(var c in a){var d=a[c];$(b).trigger(d.type+".sa.stan",[d.device])}};$(window).on("resize",function(){e(!1)}),e(!0)}("undefined"==typeof $STAN_Config?[]:$STAN_Config),$(function(){"use strict";var a=function(){var a,b,c,d,e;$("[data-auto-class]").each(function(){for(b=$(this).attr("data-auto-class").split("}"),a=0;a<b.length-1;a++)c=b[a].match(/[^{]*/g),d=$.trim(c[0]),e=$.trim(c[2]),$(this).find(d).addClass(e)})};$(document).on("ready",a)}),$(function(){"use strict";$(".sa-checkbox").click(function(){$(this).hasClass("active")?($(this).removeClass("active"),$(this).find("input").val(0)):($(this).addClass("active"),$(this).find("input").val(1))}),$(".sa-checkbox").each(function(){1==$(this).find("input").val()&&$(this).addClass("active")})}),$(function(){"use strict";$(".sa-collapse .sa-click").click(function(){$(this).parents(".sa-collapse").find(".sa-content").collapse("toggle")}),$(".sa-collapse .sa-content").on("hide.bs.collapse",function(){$(this).parents(".sa-collapse").removeClass("active")}).on("show.bs.collapse",function(){$(this).parents(".sa-collapse").addClass("active")}),$(".sa-collapse .sa-content").each(function(){$(this).addClass("collapse")}),$(".sa-collapse.active .sa-content").each(function(){$(this).addClass("in")}),$("body").on("active.sa.stan",function(){$("[data-collapse-devices]").each(function(){$(this).attr("data-collapse-devices").indexOf($STAN.device)>=0?($(this).removeClass("hide-click"),$(this).attr("data-collapse-devices-open").indexOf($STAN.device)>=0?$(this).find(".sa-content").addClass("in").css("height",""):$(this).find(".sa-content").removeClass("in").addClass("collapse")):($(this).addClass("hide-click"),$(this).find(".sa-content").addClass("in").removeClass("collapse").css("height",""))})})}),$(function(){"use strict";var a=function(){$("img[data-img-box]").each(function(){var a=$(this),b=a.parent().width(),c=a.parent().height();a.removeClass("maxwidth maxheight"),a.addClass("fit"==a.attr("data-img-box")?a.width()/a.height()>b/c?"maxwidth":"maxheight":a.width()/a.height()<b/c?"maxwidth":"maxheight");var d=(c-a.height())/2,e=(b-a.width())/2;a.css({"margin-top":d+"px","margin-left":e+"px"})})};$("img[data-img-box]").each(function(){$(this).parent().css("overflow","hidden")}),$(window).on("resize",a),$("img[data-img-box]").on("load",a)}),$(function(){"use strict";var a=function(){$("img[data-resp-src^='{']").each(function(){var a=$(this);if(a.attr("data-resp-src")){var b=jQuery.parseJSON(a.attr("data-resp-src")),c=$STAN.device?$STAN.device:"xs";a.attr("src",b[c])}})};$(window).on("resize",a),a()}),$(function(){"use strict";var a=function(){var a,b,c;$(".sa-inset,.sa-outset").each(function(){c=$(this).hasClass("sa-right")?"right":"left",$(this).parent().css("padding-"+c,""),a=parseInt($(this).parent().css("padding-"+c)),b=$(this).outerWidth(!0),b||(b=$STAN.getSize("clone",$(this)).outerWidthMargin),$(this).hasClass("sa-outset")?($(this).parent().parent().css("padding-"+c,b+"px"),$(this).css(c,"-"+b+"px")):($(this).parent().css("padding-"+c,a+b+"px"),$(this).css(c,a+"px"))})};$(".sa-inset,.sa-outset").each(function(){"static"==$(this).parent().css("position")&&$(this).parent().addClass("relative")}),$(window).on("load resize",a)}),$(function(){"use strict";$(".sa-tabs>ul a").click(function(a){a.preventDefault(),$(this).tab("show")}),$(".sa-tabs").each(function(a){$(this).addClass("sa-tabs-"+a),$(this).find(">ul a").each(function(b){$(this).attr("data-target",".sa-tabs-"+a+" .tab-pane-"+b)}),$(this).find(".tab-pane").each(function(a){$(this).addClass("tab-pane-"+a)}),$(this).find(">ul li:nth-child(1)").addClass("active"),$(this).find(".tab-pane-0").addClass("active")})}),$(function(){"use strict";var a;"ontouchstart"in document.documentElement||$("html").addClass("no-touch"),$("html:not(.no-touch) .touch-hover").bind("click touchend",function(b){return $(this).hasClass("hover")?(b.stopPropagation(),!0):(a=$(this),$(".hover").each(function(){$(this).has(a).length||$(this).removeClass("hover")}),a.addClass("hover"),b.preventDefault(),b.stopPropagation(),void 0)}),$("html").on("click touchend",":not(.touch-hover)",function(){$("*").removeClass("hover")})}),$(function(){"use strict";$(".stop-parent-scroll").on("mousewheel, touchend",function(a){var b=a.originalEvent.wheelDelta,c=$(this);b>0&&0===c.scrollTop()&&a.preventDefault(),0>b&&c.scrollTop()==c.get(0).scrollHeight-c.innerHeight()&&a.preventDefault(),a.stopPropagation()}),$(".stop-parent-scroll").on("touchstart",function(a){var b=a.originalEvent.touches[0]||a.originalEvent.changedTouches[0];$(this).data("pageY",b.pageY)}),$(".stop-parent-scroll").on("touchmove",function(a){a.preventDefault(),a.stopPropagation();var b=a.originalEvent.touches[0]||a.originalEvent.changedTouches[0],c=($(this).data("pageY")-b.pageY)/5;$(this).scrollTop($(this).scrollTop()+c)});var a=window.devicePixelRatio?window.devicePixelRatio:1;a>1&&$("body").addClass("x2")}),$(function(){"use strict";var a,b;$(".sa-nav.nav-horizontal li").mouseover(function(){a=0,b=$(this).children("ul"),b.length&&(b.css("width","1000px").children("li").css("display","inline-block"),b.children("li").each(function(){$(this).outerWidth()>a&&(a=$(this).outerWidth())}),b.css("width","").children("li").css("display",""),a>$(this).outerWidth()&&b.css("width",a+"px"))})}),function(a,b){"use strict";var c,d={},e=function(a){return{outerWidthMargin:a.outerWidth(!0),outerHeightMargin:a.outerHeight(!0),outerWidth:a.outerWidth(),outerHeight:a.outerHeight(),width:a.width(),height:a.height()}};b.getSize=function(b,f,g){return"undefined"==typeof g&&(g={}),g.visibility="hidden","clone"==b&&(c=f.clone().css(g),a("body").append(c),d=e(c),c.remove()),d}}(jQuery,$STAN),function(a){"use strict";var b={init:function(b){return this.each(function(){var c=a(this),d=a.extend({items:"h2",li_class:"",a_class:"",add_li_active_class:!1,add_a_active_class:!0},b);c.data("AnchorNav",d),a(d.items).each(function(){var b=a(this).text().replace(/\W/g,"");a(this).attr("id",b),c.append("<li class='"+d.li_class+"'><a href='#"+b+"' class='"+d.a_class+"'>"+a(this).text()+"</a></li>")}),d.add_li_active_class&&c.find("li").click(function(){c.find("li").removeClass("active"),a(this).addClass("active")}),d.add_a_active_class&&c.find("a").click(function(){c.find("a").removeClass("active"),a(this).addClass("active")})})}};a.fn.AnchorNav=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.Datatable"):b.init.apply(this,arguments)}}(jQuery,$STAN),function(a){"use strict";var b={init:function(c){var d=this;return this.each(function(){var e=a(this),f=a.extend({selector:"div",current_class:""},c);e.data("ClassSwitcher",f),a("[data-toggle='class-switcher'][data-target='"+d.selector+"']").each(function(){a(this).find("li").each(function(){a(this).hasClass("active")&&b.change.apply(e,[a(this)]),a(this).click(function(){b.change.apply(e,[a(this)])})})})})},change:function(b){{var c=a(this).data("ClassSwitcher");a(this)}a(b).siblings().removeClass("active"),b.addClass("active"),this.children(c.selector).removeClass(c.current_class).addClass(b.attr("data-class")),c.current_class=b.attr("data-class"),a(this).trigger("change.sa.class-switcher",[c])}};a.fn.ClassSwitcher=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.Datatable"):b.init.apply(this,arguments)}}(jQuery,$STAN),function(a){"use strict";var b=[];a(window).resize(function(){b.length&&a(b).each(function(){c.resize.apply(this)})}).resize(),a(window).ready(function(){a("[data-toggle='collapse-tab']").click(function(){return c.show.apply(a(a(this).attr("data-target")),[a(this)]),!1})});var c={init:function(d){return a(this.selector).each(function(){b.push(a(this))}),this.each(function(){var b=a(this),e=a.extend({breakpoint:768,view:!1},d);a(this).data("CollapseTab",e),a(this).find(".tab-pane.active>div").addClass("in"),a(this).find("[data-toggle='collapse']").click(function(){c.accordion.apply(b,[a(this)])}),c.resize.apply(this)})},show:function(b){var d=a(this).data("CollapseTab");"tab"==d.view?a(".nav-tabs [href='"+a(b).attr("href")+"']").tab("show"):(a(a(b).attr("href")+">div").collapse("show"),c.accordion.apply(a(this),[a("[data-target='"+a(b).attr("href")+">div']")]))},accordion:function(b){this.find("[data-toggle='collapse']").not(b).each(function(){var b=a(this).attr("data-target");a(b).hasClass("in")&&a(b).collapse("hide")})},resize:function(){var b=a(this).data("CollapseTab");if(a(window).width()<b.breakpoint){if("collapse"!=b.view){a(this).find(".tab-pane").addClass("active"),a(this).find(".in").addClass("collapse");var c=a(this).find(".nav-tabs li").index(a(this).find(".nav-tabs .active"));a(this).find(".collapse:eq("+c+")").removeClass("collapse"),a(this).trigger("collapse.sa.collapsetab",[b])}a(this).find(".collapse").removeClass("in"),a(this).find("[data-toggle='collapse-off']").attr("data-toggle","collapse"),b.view="collapse"}else{if("tab"!=b.view){var d=0;a(this).find(".tab-pane").each(function(b){a(this).find("div").hasClass("in")&&(d=b)}),a(this).find(".nav-tabs li").removeClass("active"),a(this).find(".tab-pane").removeClass("active"),a(this).find(".nav-tabs li:eq("+d+")").addClass("active"),a(this).find(".tab-content .tab-pane:eq("+d+")").addClass("active"),a(this).trigger("tab.sa.collapsetab",[b])}a(this).find(".collapse").css("height","auto").addClass("in"),a(this).find("[data-toggle='collapse']").attr("data-toggle","collapse-off"),b.view="tab"}}};a.fn.CollapseTab=function(b){return c[b]?c[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.Datatable"):c.init.apply(this,arguments)}}(jQuery,$STAN),function(a,b){"use strict";var c=[];a(window).resize(function(){c.length&&a(c).each(function(){d.resize.apply(this)})}).resize(),a(window).ready(function(){a("[data-toggle='colousel.next']").click(function(){return d.move.apply(a(a(this).attr("data-target")),["next",!0])}),a("[data-toggle='colousel.prev']").click(function(){return d.move.apply(a(a(this).attr("data-target")),["prev",!0])})});var d={init:function(b){return a(this.selector).each(function(){c.push(a(this))}),this.each(function(){var c=a(this),e=a.extend({type:"normal",selector:"div",selector_class:!1,transition_speed:300,autoplay:!1,autoplay_delay:5e3,break_autoplay_on_click:!0,scroll_amount:{xs:1,sm:1,md:1,lg:1},max_in_view:0,current_index:0,autoplay_method:"next",selector_width:0,max_index:0,timer:!1,action:!1,isScroll:!1},b);"normal"==e.type?(e.transition="slide",e.continuous=!1):"continuous"==e.type?(e.transition="slide",e.continuous=!0):(e.transition="fade",e.continuous=!0),c.data("Colousel",e);var f=c.find(".colousel-inner").children(e.selector);e.total=f.length,e.continuous&&(e.total>e.max_in_view&&e.total<2*e.max_in_view&&c.find(".colousel-inner").append(c.find(".colousel-inner").html()),e.total=2*e.total,f=c.find(".colousel-inner").children(e.selector)),e.selector_class&&f.addClass(e.selector_class),f.each(function(b){a(this).data("ColouselIndex",b)}),c.find(".colousel-next").click(function(){d.move.apply(c,["next",!0])}),c.find(".colousel-prev").click(function(){d.move.apply(c,["prev",!0])}),d.resize.apply(c),d.autoplay.apply(c)})},autoplay:function(){var b=a(this).data("Colousel"),c=a(this);b.autoplay&&(b.current_index!=b.max_index||b.continuous?0===b.current_index&&"prev"==b.autoplay_method&&(b.autoplay_method="next"):b.autoplay_method="prev",b.timer=setTimeout(function(){d.move.apply(c,[b.autoplay_method,!1])},b.autoplay_delay))},resize:function(){var c=a(this).data("Colousel"),d=a(this),e=d.find(".colousel-inner").children(c.selector),f=0,g=0,h=0;if(c.inview=0,d.find(".colousel-inner").css("width",""),e.css("width",""),c.selector_width=e.outerWidth(),e.each(function(){a(this).outerHeight()>f&&(f=a(this).outerHeight()),g=a(this).data("ColouselIndex")*c.selector_width,a(this).css({left:g+"px",width:a(this).css("width")}),h+=c.selector_width,h<=d.find(".colousel-inner").width()+10&&c.inview++}),a(this).css("height",f+"px"),c.start_position=-1*c.selector_width,c.end_position=c.selector_width*c.total,c.max_index=c.total-c.inview,c.scroll_amount[b.device]){if(c.isScroll=!1,d.removeClass("scroll"),c.continuous&&(c.total==c.inview?(e.each(function(b){a(this).css("left",b*c.selector_width+"px")}),a(this).addClass("start end")):a(this).removeClass("start end")),!c.continuous){if(c.current_index>c.max_index&&(c.current_index=c.max_index),c.current_index>0){var i=c.current_index*c.selector_width;e.css("left","-="+i+"px")}0===c.current_index?a(this).addClass("start"):a(this).removeClass("start"),c.current_index>=c.max_index?a(this).addClass("end"):a(this).removeClass("end")}}else c.isScroll=!0,d.addClass("scroll"),d.find(".colousel-inner").css("width",c.total*c.selector_width+"px"),e.each(function(b){a(this).css("left",b*c.selector_width+"px")})},pre_move_checks:function(c){var d=a(this).data("Colousel"),e=a(this),f=e.find(".colousel-inner").children(d.selector),g=d.scroll_amount[b.device];if(g||(g=1),!d.continuous){var h=0;"next"==c?(d.current_index=d.current_index+g,d.current_index>d.max_index&&(h=d.current_index-d.max_index,d.current_index=d.max_index)):(d.current_index=d.current_index-g,d.current_index<0&&(h=0-d.current_index,d.current_index=0));var i=g-h;d._distance=i*d.selector_width,d._speed=i*d.transition_speed}d.continuous&&(f.each(function(){var b=a(this).data("ColouselIndex");if("next"==c){if(0>b){var e=0-b;b=d.total-e,a(this).css("left",d.end_position-d.selector_width*e+"px")}b-=g}if("prev"==c&&(b+=g,b>=d.total)){var e=b-d.total;b=e,e=g-e,a(this).css("left","-"+d.selector_width*e+"px")}a(this).data("ColouselIndex",b)}),d._distance=g*d.selector_width,d._speed=g*d.transition_speed)},move:function(b,c){{var e,f=a(this).data("Colousel"),g=a(this);g.find(".colousel-inner").children(f.selector)}e="next"==b?"-":"+",!(f.continuous&&f.total>f.inview||f.current_index<f.max_index&&"next"==b||f.current_index>0&&"prev"==b)||f.action||f.isScroll||(f.action=!0,c&&f.break_autoplay_on_click&&(f.autoplay=!1),c&&(f.autoplay_method=b),clearTimeout(f.timer),d.pre_move_checks.apply(g,[b]),d[f.transition].apply(g,[e]),a(this).trigger(b+".sa.colousel",[f]))},slide:function(b){var c=a(this).data("Colousel"),e=a(this),f=e.find(".colousel-inner").children(c.selector);f.animate({left:b+"="+c._distance+"px"},c._speed),setTimeout(function(){c.action=!1,d.resize.apply(e),d.autoplay.apply(e)},c._speed+50)},fade:function(b){var c=a(this).data("Colousel"),e=a(this),f=e.find(".colousel-inner").children(c.selector);e.find(".colousel-inner").animate({opacity:0},c._speed,function(){f.each(function(){a(this).css("left",b+"="+c._distance+"px")}),e.find(".colousel-inner").animate({opacity:1},c._speed)}),setTimeout(function(){c.action=!1,d.resize.apply(e),d.autoplay.apply(e)},2*c._speed+50)},next:function(){d.move.apply($this,["next",!0])},prev:function(){d.move.apply($this,["prev",!0])}};a.fn.Colousel=function(b){return d[b]?d[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.Datatable"):d.init.apply(this,arguments)}}(jQuery,$STAN),function(a,b){"use strict";var c=[];a(window).resize(function(){c.length&&a(c).each(function(){d.resize.apply(this)})}).resize();var d={init:function(b){return a(this.selector).each(function(){c.push(a(this))}),this.each(function(){var c=a.extend({xs:!1,sm:!1,md:!1,lg:!1,current_holder:!1},b);c.xs||(c.xs=c.sm?c.sm:c.md),c.sm||(c.sm=c.md),c.md||(c.md=c.lg),c.lg||(c.lg=c.md?c.md:c.sm),a(this).data("DOMovr",c),d.resize.apply(this)})},resize:function(){var c=a(this).data("DOMovr"),d=c[b.device];if(d&&d!=c.current_holder){var e=a(this).detach();a(c.current_holder).removeClass("active"),a(d).html(e).addClass("active"),c.current_holder=d,a(this).trigger("moved.sa.domovr",[c])}}};a.fn.DOMovr=function(b){return d[b]?d[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.Datatable"):d.init.apply(this,arguments)}}(jQuery,$STAN),function(a,b){"use strict";var c=[];a(window).resize(function(){c.length&&a(c).each(function(){d.fix.apply(this)})}).resize();var d={init:function(b){return a(this.selector).each(function(){c.push(a(this))}),this.each(function(){var c=a(this),e=a.extend({selector:"div",devices:{xs:0,sm:0,md:0,lg:0}},b);c.data("FixedSize",e),d.fix.apply(this)})},fix:function(){var c=a(this).data("FixedSize"),d=c.devices[b.device];a(this).find(c.selector).css("height","auto"),d&&(a(this).each(function(){var b=0,e=[];if(a(this).find(c.selector).each(function(c){if(a(this).outerHeight()>b&&(b=a(this).outerHeight()),e.push(this),(c+1)%d===0){for(var f in e)a(e[f]).css("height",b+"px");b=0,e=[]}}),b)for(var f in e)a(e[f]).css("height",b+"px")}),a(this).trigger("resize.sa.fixedsize",[c]))}};a.fn.FixedSize=function(b){return d[b]?d[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.Datatable"):d.init.apply(this,arguments)}}(jQuery,$STAN),function(a,b){"use strict";var c=[];a(window).resize(function(){c.length&&a(c).each(function(){d.resize.apply(this)})}).resize(),a(window).ready(function(){a("[data-toggle='popup.show']").click(function(){return d.set_src.apply(a(a(this).attr("data-target")),[a(this).attr("data-src")]),d.show.apply(a(a(this).attr("data-target")))}),a("[data-toggle='popup.hide']").click(function(){return d.hide.apply(a(a(this).attr("data-target")))}),a("[data-toggle='popup.toggle']").click(function(){return d.set_src.apply(a(a(this).attr("data-target")),[a(this).attr("data-src")]),d.toggle.apply(a(a(this).attr("data-target")))})});var d={init:function(b){return a(this.selector).each(function(){c.push(a(this))}),this.each(function(){var c=a(this),e=a.extend({type:"html",src:"about:blank",width:200,height:300,gutter:15,open:!1,auto_reopen:!0,lock_aspect_ratio:!0,scroll:!0,devices:{xs:!0,sm:!0,md:!0,lg:!0}},b);c.data("PopUp",e);var f=e.scroll?"yes":"no",g=e.scroll?"":"no-scroll";"iframe"==e.type?(c.find(".popup-display").addClass(g),c.find(".popup-display").html("<iframe src='about:blank' class='"+g+"' style='width:100%;height:100%;' seamless frameborder='0' scrolling='"+f+"'></iframe>")):c.find(".popup-display").addClass(g),c.click(function(){d.hide.apply(c)}),c.find(".popup-display").click(function(a){a.stopPropagation()}),e.open&&e.devices[a("body").attr("data-current-device")]&&a(this).css("display","block"),d.resize.apply(this)})},show:function(){var c=a(this).data("PopUp");return c.open?!1:c.devices[b.device]?(a(this).find("iframe").attr("src",c.src),a(this).css("display","block"),c.open=!0,a(this).trigger("show.sa.popup",[c]),!1):!0},hide:function(){var b=a(this).data("PopUp");return b.open&&(a(this).css("display","none"),"iframe"==b.type&&a(this).find("iframe").attr("src","about:blank"),b.open=!1,a(this).trigger("hide.sa.popup",[b])),!1},toggle:function(b){var c=a(this).data("PopUp");return c.open?d.hide.apply(this):d.show.apply(this,[b])},resize:function(){var c=a(this).data("PopUp"),e=a(window).width()-2*c.gutter,f=a(window).height()-2*c.gutter;e>c.width&&(e=c.width),f>c.height&&(f=c.height),c.lock_aspect_ratio&&(e/f>c.width/c.height?e=c.width*(f/c.height):f=c.height*(e/c.width)),a(this).find(".popup-display").css({width:e+"px",height:f+"px",marginTop:"-"+f/2+"px",marginLeft:"-"+e/2+"px"}),!c.devices[b.device]&&c.open?(c.reopen=!0,d.hide.apply(this)):c.devices[b.device]&&c.reopen&&c.auto_reopen&&(c.reopen=!1,d.show.apply(this))},set_src:function(b){var c=a(this).data("PopUp");b&&(c.src=b)}};a.fn.PopUp=function(b){return d[b]?d[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.Datatable"):d.init.apply(this,arguments)}}(jQuery,$STAN),function(a){"use strict";var b={init:function(c){return this.each(function(){var d=a(this),e=a.extend({search_url:"",http_request:"GET",data:[],searching:!1},c);d.data("Predinput",e),d.find("input").attr("autocomplete","off"),d.find("input").keyup(function(a){b.keyup.apply(d,[a])}),d.find("input").keydown(function(a){13==a.keyCode&&a.preventDefault()}),d.find(".clear").click(function(){d.find("input").val(""),a(this).css("display","none"),b.hide_results.apply(d),d.find("input").focus(),d.trigger("clear.sa.predinput",[e])}),d.click(function(a){a.stopPropagation()}),a("body").click(function(){b.hide_results.apply(d)})})},keyup:function(c){var d=a(this).data("Predinput"),e=a(this),f=a(this).find(".results");if(40==c.keyCode||38==c.keyCode||13==c.keyCode){var g=parseInt(f.find("ul").attr("data-index"));40==c.keyCode?(g++,g==f.find("ul li").length&&g--):38==c.keyCode?(g--,0>g&&(g=0)):13==c.keyCode&&(b.hide_results.apply(e),e.trigger("selected.sa.predinput",[d])),f.find("ul").attr("data-index",g);var h=f.find("ul li:nth-child("+(g+1)+")");f.find("ul li").removeClass("active"),h.addClass("active"),e.find("input").val(h.text())}else d.searching?d.search_again=!0:(d.searching=!0,b.search.apply(e));e.find("input").val()?e.find(".clear").css("display","block"):e.find(".clear").css("display","none")},search:function(){var c=a(this).data("Predinput"),d=a(this),e=a(this).find(".results");e.html("").css("display","block"),a.ajax({url:c.search_url,cache:!1,type:c.http_request,data:{search:a(this).find("input").val(),data:JSON.stringify(c.data)}}).done(function(f){e.html(f),e.find("ul").attr("data-index","-1"),e.find("li").each(function(b){a(this).attr("data-index",b)}),e.find("li").mouseover(function(){a(this).siblings().removeClass("active"),a(this).addClass("active"),a(this).parent().attr("data-index",a(this).attr("data-index"))}),e.find("li").click(function(){d.find("input").val(a(this).text()),b.hide_results.apply(d),d.trigger("selected.sa.predinput",[c])}),c.searching=!1,c.search_again&&(c.search_again=!1,c.searching=!0,b.search.apply(d)),d.trigger("search.sa.predinput",[c])})},hide_results:function(){a(this).find(".results").css("display","none")}};a.fn.Predinput=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.Datatable"):b.init.apply(this,arguments)}}(jQuery,$STAN),function(a){"use strict";var b=[];a(window).scroll(function(){b.length&&a(b).each(function(){var b=a(this).data("scrollTo");b.scroll_spy&&c.Scroll.apply(this)})});var c={init:function(d){return a(this.selector).each(function(){b.push(a(this))}),this.each(function(){var b=a(this),e=a.extend({selector:"a",listener:"click",offset:0,scroll_speed:300,scroll_spy:!0},d);b.data("scrollTo",e),a(this).on(e.listener,e.selector,function(){return c.Listener.apply(b,[a(this)]),!1}),b.find(e.selector).each(function(){var b=c.getVars.apply(this,[this,e]);window.location.hash.substring(2)==b.target.substring(1)&&a("body,html").scrollTop(b.position)})})},Listener:function(b){var d=this.data("scrollTo"),e=a(this),f=c.getVars.apply(this,[b,d]);a("body,html").animate({scrollTop:f.position},d.scroll_speed,function(){e.trigger("scroll_end.sa.scrollto",[d])})},Scroll:function(){var b,d=a(this),e=d.data("scrollTo");d.find(e.selector).removeClass("active");var f={position:0,target:!1};d.find(e.selector).each(function(){var d=c.getVars.apply(this,[this,e]);b=a(window).scrollTop()>=d.maxscroll?a(document).height():a(window).scrollTop(),b>=d.position&&d.position>=f.position&&(f={position:d.position,element:a(this),target:d.target})}),f.target?(a(f.element).addClass("active"),window.location.hash="#/"+f.target.substring(1)):window.location.hash=""},getVars:function(b,c){var d;d=a(b).attr("data-offset")?a(b).attr("data-offset"):"function"==typeof c.offset?c.offset(a(this),c):c.offset;var e=a(b).attr(a(b).attr("data-target")?"data-target":"href"),f=parseInt(a(e).offset().top)-parseInt(d),g=a(document).height()-a(window).height();return{offset:d,target:e,position:f,maxscroll:g}}};a.fn.ScrollTo=function(b){return c[b]?c[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.Datatable"):c.init.apply(this,arguments)}}(jQuery,$STAN),function(a,b){"use strict";var c=[];a(window).resize(function(){c.length&&a(c).each(function(){var c=a(this).data("slideOut");!c.devices[b.device]&&c.open?(c.reopen=!0,d.hide.apply(this)):c.devices[b.device]&&c.reopen&&c.auto_reopen&&(c.reopen=!1,d.show.apply(this))})}).resize(),a(window).ready(function(){a("[data-toggle='slideout.show']").click(function(){return d.show.apply(a(a(this).attr("data-target")))}),a("[data-toggle='slideout.hide']").click(function(){return d.hide.apply(a(a(this).attr("data-target")))}),a("[data-toggle='slideout.toggle']").click(function(){return d.toggle.apply(a(a(this).attr("data-target")))})});var d={init:function(e){return a(this.selector).each(function(){c.push(a(this))}),this.each(function(){var c=a(this),f=a.extend({pos:"left",open:!1,speed:300,auto_reopen:!0,auto_close:!1,devices:{xs:!0,sm:!0,md:!0,lg:!0}},e);c.data("slideOut",f),c.addClass("slideout slideout-"+f.pos),c.css(f.open&&f.devices[b.device]?{display:"block"}:d.getPosValue.apply(this,[f.pos])),f.auto_close&&a(this).mouseover(function(){d.clearTmr.apply(this)}).mouseout(function(){d.setTmr.apply(this)})})},getPosValue:function(b){var c;("top"==b||"bottom"==b)&&(c=a(this).outerHeight()),("left"==b||"right"==b)&&(c=a(this).outerWidth());var d={};return d[b]=-1*c,d},clearTmr:function(){var b=a(this).data("slideOut");clearTimeout(b.tmr)},setTmr:function(){var b=a(this).data("slideOut");d.clearTmr.apply(this);var c=this;b.tmr=setTimeout(function(){d.hide.apply(c)},1e3*parseInt(b.auto_close))},show:function(){var c=a(this).data("slideOut");if(c.devices[b.device]){if(!c.open){var e=d.getPosValue.apply(this,[c.pos]);e.display="block",a(this).css(e);var e={};e[c.pos]=0,a(this).animate(e,c.speed,function(){c.open=!0,a(this).trigger("show.sa.slideout",[c])})}return c.auto_close&&d.setTmr.apply(this),!1}return!0},hide:function(){var b=a(this).data("slideOut");if(b.open){var c=d.getPosValue.apply(this,[b.pos]);a(this).animate(c,b.speed,function(){a(this).css({display:"none"}),b.open=!1,a(this).trigger("hide.sa.slideout",[b])})}return!1},toggle:function(){var b=a(this).data("slideOut");return b.open?d.hide.apply(this):d.show.apply(this)}};a.fn.SlideOut=function(b){return d[b]?d[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.Datatable"):d.init.apply(this,arguments)}}(jQuery,$STAN),function(a,b){"use strict";var c=[];a(window).resize(function(){c.length&&a(c).each(function(){d.resize.apply(this)})}).resize(),a(window).ready(function(){a("body").on("click","[data-toggle='slider.set']",function(){var b=a(this).attr("data-target")?a(a(this).attr("data-target")):a(this).parents(".slider");return d.set.apply(b,[a(this).attr("data-index")])}),a("body").on("click","[data-toggle='slider.next']",function(){var b=a(this).attr("data-target")?a(a(this).attr("data-target")):a(this).parents(".slider");d.move.apply(b,["next",!0])}),a("body").on("click","[data-toggle='slider.prev']",function(){var b=a(this).attr("data-target")?a(a(this).attr("data-target")):a(this).parents(".slider");d.move.apply(b,["prev",!0])})});var d={init:function(b){return a(this.selector).each(function(){c.push(a(this))}),b.selector=this.selector,this.each(function(){var c,e,f=a(this),g=a.extend({height:".layer0 img",activeIndex:0,autoplay:!1,autoplay_break_on_click:!0,autoplay_delay:5e3,layers:[]},b);g.action=g.timer=g.animationLength=!1,f.data("Slider",g),g.aspect_ratio="object"==typeof g.height?"variable":"fixed",g.total=f.find(".frame").length,f.find(".counter .total").text(g.total),g.total<2&&f.find(".next, .prev, .dots").css("display","none"),g.currentIndex=g.nextIndex=g.activeIndex,f.find(".frame").css({visibility:"hidden"});for(c in g.layers)e=a.extend({baseCSS:!1,inCSS:!1,inDelay:0,inDuration:300,inEasing:"linear",outCSS:!1,outDelay:0,outDuration:300,outEasing:"linear",external:!1,reverse_for_prev:!1,selector:[]},g.layers[c]),e.selector=e.external?a("[data-target='"+g.selector+"'].layer"+c):f.find(".layer"+c),"fade"==e.presetCSS?(e.baseCSS={opacity:0},e.inCSS={opacity:1},e.outCSS={opacity:0}):"slide"==e.presetCSS&&(e.baseCSS={left:"100%"},e.inCSS={left:0},e.outCSS={left:"-100%"},e.selector.addClass("absolute")),e.inDelay+e.inDuration>g.animationLength&&(g.animationLength=e.inDelay+e.inDuration),a(e.selector).css(e.baseCSS),g.layers[c]=e;if(!f.find(".dots").html())for(c=0;c<g.total;c++)f.find(".dots").append('<span data-toggle="slider.set" data-index="'+c+'"></span>');f.find("img").load(function(){d.resize.apply(f)}),d.animate_complete.apply(f),d.resize.apply(this),a(window).on("load",function(){f.css({visibility:"visible"}),f.find(".frame").eq(g.activeIndex).css({visibility:"visible"});for(c in g.layers)a(g.layers[c].selector).eq(g.activeIndex).css(g.layers[c].inCSS)})})},move:function(b,c){var e=a(this).data("Slider"),f=a(this);e.action||(e.action=!0,clearTimeout(e.timer),e.autoplay_break_on_click&&c&&(e.autoplay=!1),"next"==b?(e.nextIndex=e.currentIndex+1,e.nextIndex==e.total&&(e.nextIndex=0)):(e.nextIndex=e.currentIndex-1,e.nextIndex<0&&(e.nextIndex=e.total-1)),d.animate.apply(f,[b]))},set:function(b){var c,e=a(this).data("Slider"),f=a(this);e.action||b==e.currentIndex||(e.action=!0,clearTimeout(e.timer),e.autoplay_break_on_click&&(e.autoplay=!1),c=b>e.currentIndex?"next":"prev",e.nextIndex=parseInt(b),d.animate.apply(f,[c]))},animate:function(b){var c,e,f,g,h=a(this).data("Slider"),i=a(this),j=[],k=[];a(this).trigger("pre-move.sa.slider",[h]);var l=i.find(".frame").eq(h.nextIndex),m=i.find(".frame").eq(h.currentIndex);m.css({"z-index":10}),l.css({visibility:"visible","z-index":20});for(c in h.layers)e=h.layers[c],e.reverse_for_prev?(f="next"==b?e.baseCSS:e.outCSS,g="next"==b?e.outCSS:e.baseCSS):(f=e.baseCSS,g=e.outCSS),j[c]=a(e.selector).eq(h.nextIndex),k[c]=a(e.selector).eq(h.currentIndex),k[c].delay(e.outDelay).animate(g,e.outDuration,e.outEasing),j[c].css(f),j[c].delay(e.inDelay).animate(e.inCSS,e.inDuration,e.inEasing);setTimeout(function(){i.trigger("post-move.sa.slider",[h]),d.animate_complete.apply(i)},h.animationLength)},animate_complete:function(){var b=a(this).data("Slider"),c=a(this);b.currentIndex=b.nextIndex,c.find(".frame").removeClass("active").eq(b.nextIndex).addClass("active"),c.find(".counter .current").text(b.currentIndex+1),c.find("[data-toggle='slider.set']").removeClass("active"),c.find("[data-toggle='slider.set'][data-index='"+b.currentIndex+"']").addClass("active"),a("[data-target='"+b.selector+"'][data-toggle='slider.set']").removeClass("active"),a("[data-target='"+b.selector+"'][data-toggle='slider.set'][data-index='"+b.currentIndex+"']").addClass("active"),b.autoplay&&b.total>1&&(b.timer=setTimeout(function(){d.move.apply(c,["next",!1])},b.autoplay_delay)),b.action=!1},resize:function(){var c=a(this).data("Slider"),d=a(this),e=0;
"fixed"==c.aspect_ratio?(d.find(c.height).each(function(){a(this).height()>e&&(e=a(this).height())}),d.css({height:e+"px"})):d.css("height",c.height[b.device])}};a.fn.Slider=function(b){return d[b]?d[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.Datatable"):d.init.apply(this,arguments)}}(jQuery,$STAN),function(a,b){"use strict";var c=[];a(window).resize(function(){c.length&&a(c).each(function(){d.stick.apply(this)})}).resize(),a(window).scroll(function(){c.length&&a(c).each(function(){d.stick.apply(this)})}).scroll();var d={init:function(b){var d=this,e=a.extend({top:0,maxtop:!1,sticky_class:"",stick_to:"window",zindex:1e3,devices:{xs:!0,sm:!0,md:!0,lg:!0},_css:{top:d.css("top"),position:d.css("position"),zindex:d.css("z-index")},_status:"unstuck"},b);return a(this.selector).each(function(){c.push(a(this))}),this.each(function(b){var c="sticky-"+d.selector.substring(1)+"-"+b;a(this).after("<div class='sticky-placeholder' id='"+c+"' style='display:none;height:"+a(this).height()+"px;'></div>"),e.offset=a(this).offset(),e.placeholder="#"+c,a(this).data("StickyFix",e)})},stick:function(){var c,d,e=a(this).data("StickyFix"),f=e.offset.top-a(window).scrollTop();f<e.top&&e.devices[b.device]?(c="function"==typeof e.maxtop?e.maxtop(a(this),e):"number"==typeof e.maxtop?e.maxtop:99999,a(window).scrollTop()>c?(d=e.top-(a(window).scrollTop()-c),a(this).css("top",d+"px")):("unstuck"==e._status&&a(this).trigger("stuck.sa.stickyfix",[e]),a(this).addClass(e.sticky_class).css({"z-index":e.zindex,top:e.top+"px",position:"fixed"}),e._status="stuck",a(e.placeholder).css("display","block"),"parent"==e.stick_to&&a(this).css({width:a(e.placeholder).width()+"px",left:a(e.placeholder).offset().left+"px"}))):("stuck"==e._status&&a(this).trigger("unstuck.sa.stickyfix",[e]),a(this).removeClass(e.sticky_class).css({top:e._css.top,position:e._css.position,"z-index":e._css.zindex}),e._status="unstuck",a(e.placeholder).css("display","none"),"parent"==e.stick_to&&a(this).css({width:"auto",left:"auto"}))}};a.fn.StickyFix=function(b){return d[b]?d[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.Datatable"):d.init.apply(this,arguments)}}(jQuery,$STAN);