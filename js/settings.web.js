/*****************************************************************
******            WEB PAGES JAVASCRIPT SETTINGS             ******
******                                                      ******
******   Name :         settings.web.js                     ******
******   Version :      1.0.0                               ******
******   Authors :      Corentin Kouvtanovitch              ******
******                  Georges McGinley                    ******
******                                                      ******
******                   Table of Content                   ******
******                   ----------------                   ******
******  - Activator     Initializing Elements               ******
******  - Animations    Easing v1.3                         ******
******  - Class Helper  Regulator                           ******
******  - Class Helper  Switcher                            ******
******  - End Page    	Simple Text Rotator                 ******
******  - Fix           iOS Issue                           ******
******  - Mailing       Form Validating                     ******
******  - Mailing       Post                                ******
******  - Menu          Initializing                        ******
******  - Menu          Mobile Menu                         ******
******  - Mouse Wheel   Calculator                          ******
******  - Mouse Wheel   Triggers & Webkit                   ******
******  - Progress Bar  Initializing                        ******
******  - Progress Bar  Language Values                     ******
******  - Responsive    Smart Resize                        ******
******  - Video         Embedded Player                     ******
*****************************************************************/

/*****************************************************************
******          ACTIVATOR : INITIALIZING ELEMENTS           ******
*****************************************************************/

/* Setting standard function acting on different elements below */
$(document).ready(function () {
    "use strict";
    try {
/* Function fixing piechart format */
        $('.chart').easyPieChart({
            easing: 'easeOutBounce',
            onStep: function (from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
/* Function opening portfolio details, sliding speed and display*/
        $(".owl-carousel").owlCarousel({
            navigation: true,
            slideSpeed: 300,
            paginationSpeed: 400,
            singleItem: true,
            autoPlay: false
        });
/* Function fixing rotator speed and effect */
        $('#rotate').rotaterator({
            fadeSpeed: 800, 
            pauseSpeed: 800
        });
/* Function handling rotation event */
        $(window).on('orientationchange', function (event) {
            window.location.href = window.location.href;
        });
/* Function including video reader */
        $(".content-scroller").fitVids();
    } catch (ex) {}
});

/*****************************************************************
******               ANIMATIONS : EASING V1.3               ******
******            Author name : Georges McGinley            ******
*****************************************************************/

/* Allowing special animations on object elements */
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend( jQuery.easing,{
	def: 'easeOutQuad',
/* t: current time, b: beginning value, c: change in value, d: duration */
	swing: function (x, t, b, c, d) {	
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} 
		else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} 
		else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} 
		else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*****************************************************************
******               CLASS HELPER : REGULATOR               ******
*****************************************************************/

(function(window) {
    "use strict";
    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }
/* Class list support. Works only for one class at once... Need to extend function */
    var hasClass, addClass, removeClass;
    if ('classList' in document.documentElement) {
        hasClass = function(elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function(elem, c) {
            elem.classList.add(c);
        };
        removeClass = function(elem, c) {
            elem.classList.remove(c);
        };
    }
    else {
        hasClass = function(elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function(elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function(elem, c) {
            elem.className = elem.className.replace(classReg( c ),' ');
        };
    }
/*****************************************************************
******               CLASS HELPER : SWITCHER                ******
*****************************************************************/    
    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }
    var classie = {
/* Full names references */
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
/* Short names references */
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };
    if (typeof define === 'function' && define.amd) {
        define(classie);
    }
    else {
/* Global browser */
        window.classie = classie;
    }
})(window);

/*****************************************************************
******            END PAGE : SIMPLE TEXT ROTATOR            ******
*****************************************************************/

/* Setting text rotation */
(function($) {
    "use strict"; 
    $.fn.extend({ 
        rotaterator: function(options) {
            var defaults = {
                fadeSpeed: 300, pauseSpeed: 300, child:null
            };
            var options = $.extend(defaults, options);
            return this.each(function() {
                var o =options;
                var obj = $(this);                
                var items = $(obj.children(), obj);
                items.each(function() {
                    $(this).hide();
                })
                if(!o.child) {
                    var next = $(obj).children(':first');
                }
                else {
                    var next = o.child;
                }
                $(next).fadeIn(o.fadeSpeed, function() {
                    $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function() {
                        var next = $(this).next();
                        if (next.length == 0) {
                            next = $(obj).children(':first');
                        }
                        $(obj).rotaterator({
                            child : next, fadeSpeed : o.fadeSpeed, pauseSpeed : o.pauseSpeed
                        });
                    })
                });
            });
        }
    });
})(jQuery);

/*****************************************************************
******                    FIX : IOS ISSUE                   ******
*****************************************************************/

/* Setting back-to-top links for iOS devices */
var iPad = navigator.userAgent.toLowerCase().indexOf("ipad");
var iPhone = navigator.userAgent.toLowerCase().indexOf("iphone");
var iPod = navigator.userAgent.toLowerCase().indexOf("ipod");
if (iPad > -1 || iPhone > -1 || iPod > -1){
    window.onscroll = function () {
        $('.totop-link').css('position', 'absolute');
        $('.totop-link').css('top', (window.pageYOffset + window.innerHeight - 39) + 'px');
    };
}

/*****************************************************************
******              MAILING : FORM VALIDATING               ******
*****************************************************************/

/* Mail form identifying and content validate function */
function validateForm() {
    "use strict"; 
    var title = $("#name").val();
    var err=true;
    if (title=="" || title==null) {  
        $("#name").addClass("validation");
        var err= false;
    } 
    else {  
        $("#name").removeClass("validation");
    }
    var email = $("#email").val();
    if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(email))) {
        $("#email").addClass("validation"); 
        var err= false;
    }
    else {  
        $("#email").removeClass("validation"); 
    }
    var title = $("#message").val();
    if (title=="" || title==null) { 
        $("#message").addClass("validation"); 
        var err= false;
    }
    else {
        $("#message").removeClass("validation"); 
    }
    return err;
}

/*****************************************************************
******                    MAILING : POST                    ******
*****************************************************************/

/* Mail sending function */
$(document).ready(function() {
    "use strict"; 
    $("#button").click(function(e) {
        if(validateForm()) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: "../send-email.php",
                data:$("#form1").serialize(),
                success:function(result) {
                    $("#successmsg").html(result);
                }
            }); 
            $("#name").val('');
            $("#email").val('');
            $("#message").val('');
            // $("#successmsg").remove();
        }
        else {
            return false;
        }
    });
});

/*****************************************************************
******                  MENU : INITIALIZING                 ******
*****************************************************************/

var pagetitle = $(document).find("title").text();
(function(window, undefined) {
	"use strict"; 	
	var Page= (function() {
		var $container = $('#container'),
/* Setting references atteched to scroll containers */
			$scroller = $container.find('div.content-scroller'),
			$menu = $container.find('aside'),
/* Setting menu links */
			$links = $menu.find('nav > a'),
			$articles = $container.find('div.content-wrapper > article').not(".noscroll"),
/* Setting back-to-top button : only showing for less than 715px resolution */
			$toTop = $container.find('a.totop-link'),
/* Setting browser history reader to make jumper work */
			History = window.History,
/* Setting animations */
			animation= { 
				speed : 800, 
				easing : 'easeInOutExpo' 
			},
			scrollOptions = { 
				verticalGutter : 0, 
				hideFocus : true 
			},
/* Initializing function for menu, articles, events, grabbbbing css properties and chapters jumping */
			init= function() {	
				_initCustomScroll();
				_initEvents();
				_layout();
				_goto();	
			},
/* Adding custom scroll for less than 715px resolution devices. Makes articles not being expanded */
			_initCustomScroll = function() {
				if($(window).width() > 767) {
					$articles.jScrollPane(scrollOptions);
				}
				$menu.children('nav').jScrollPane(scrollOptions);
			},
/* Setting link jumper function with chapter links */
			_goto = function(chapter) {	
				$(document).attr("title",pagetitle);
/* Extracting chapter number through url catching from browser history state */
				var chapter = chapter || History.getState().url.queryStringToJSON().page,
				isHome = (chapter === undefined),
/* Setting chapter references and default void reference to make user land on homepage */
				$article = $(chapter ? '#' + 'chapter' + chapter : '#' + 'introduction');	
				$('#link_introduction').removeClass('active');
				$('#link_about').removeClass('active');
				$('#link_skills').removeClass('active');
				$('#link_experience').removeClass('active');
				$('#link_education').removeClass('active');
				$('#link_portfolio').removeClass('active');
				$('#link_contact').removeClass('active');	
				$('#link_'+chapter).addClass('active');	
				if( $article.length ) {
/* Getting element position for display and scrolling*/
					var left = $article.position().left,
						top	= $article.position().top,
						is_v = ($(document).height() - $(window).height() > 0),
/* Setting animation depending on scrolling orientation */
						param = (is_v) ? { 
							scrollTop : (isHome) ? top : top + $menu.outerHeight(true) 
						} : { 
							scrollLeft : left 
						},
						$elScroller	= (is_v) ? $('html, body') : $scroller;	
					$elScroller.stop().animate(param, animation.speed, animation.easing, function() {		
/* Setting active class for link in use : not relevant for this website */
						//$articles.removeClass('content-active');
						//$article.addClass('content-active');			
					});	
				}
			},
/* Setting state saver on object history to trigger it on current window */
			_saveState = function(chapter) {
				if(History.getState().url.queryStringToJSON().page !== chapter) {	
					History.pushState(null, null, '?page=' + chapter);
					$('#link_introduction').removeClass('active');
					$('#link_about').removeClass('active');
					$('#link_skills').removeClass('active');
					$('#link_experience').removeClass('active');
					$('#link_education').removeClass('active');
					$('#link_portfolio').removeClass('active');
					$('#link_contact').removeClass('active');
					$('#link_'+chapter).addClass('active');
				}
			},
/* Setting link jumper function with chapter links */
			_layout= function() {
/* Setting overflow scrolling properties based on screenwidth */
				var windowWidth	= $(window).width();
				var isipad = navigator.userAgent.toLowerCase().indexOf("ipad");
				if(isipad > -1) {
					switch(true) {
					case (windowWidth <= 768) : 
						$scroller.scrollLeft(0).css('overflow', 'visible'); 
						break;
					case (windowWidth <= 1024): 
						$scroller.css('overflow-x', 'hidden'); 
						break;
					case (windowWidth > 1024) : 
						$scroller.css('overflow', 'hidden'); 
						break;
					};
				}
				else {
					switch(true) {
					case (windowWidth <= 768) : 
						$scroller.scrollLeft(0).css('overflow', 'visible'); 
						break;
					case (windowWidth <= 1024): 
						$scroller.css('overflow-x', 'hidden'); 
						break;
					case (windowWidth > 1024) : 
						$scroller.css('overflow', 'hidden'); 
						break;
					};
				}
			},
/* Setting event initializer */
			_initEvents = function() {	
				_initWindowEvents();
				_initMenuEvents();
				_initArticleEvents();	
			},
/* Reinitializing scrollpanes on window resizing */
			_initWindowEvents	= function() {
				$(window).on({
					'smartresize' : function( event ) {	
						var isipad = navigator.userAgent.toLowerCase().indexOf("ipad");
						var ismobile =  navigator.userAgent.toLowerCase().indexOf("mobile");
						if(isipad > -1 || ismobile > -1) {}
						else {
							_layout();
							$('article.content').not(".noscroll").each( function() {
								var $article = $(this),
									aJSP = $article.data('jsp');
								if($(window).width() > 767) {	
									(aJSP === undefined) ? $article.jScrollPane(scrollOptions) : aJSP.reinitialise();	
									_initArticleEvents();									
								}	
								else {	
/* Killing custom scroll for screen size less than 715px */
									if( aJSP !== undefined)
										aJSP.destroy();									
									$container.off('click', 'article.content');									
								}								
							});							
							var nJSP = $menu.children('nav').data('jsp');
							nJSP.reinitialise();
/* Jumping to current chapter */
							_goto();
						}					
					},
/* Jumping to respecting chapter on history state change */
					'statechange' : function(event) {						
						_goto();					
					}
				});			
			},
/* On menu click, checking link chapter reference and object history state save. Then, triggers page scroll to jump to current selection */
			_initMenuEvents = function() {
				$links.on('click', function(event) {					
					var href = $(this).attr('href'), chapter = (href.search(/chapter/) !== -1) ? href.substring(8) : 0;					
					_saveState( chapter );
					if (href.indexOf("#") != -1) 
						return false;
					else 
						return true;				
				});	
/* Scrolls to the top of the page. Button only available for screensize less than 715px. */
				$toTop.on('click', function(event) {					
					$('html, body').stop().animate({ 
						scrollTop : 0 
					}, 
					animation.speed, animation.easing);					
					return false;				
				});			
			},
/* Applying save on menu click actions to blog part. */
			_initArticleEvents	= function() {				
					if($(window).width()>768) {
						$container.on('click', 'article.content', function(event) {							
							var id = $(this).attr('id'), chapter = (id.search(/chapter/) !== -1) ? id.substring(7) : 0;							
							_saveState(chapter);							
							//return false;						
						});
					}			
			};			
		return { 
			init : init 
		};		
	})();	
	Page.init();	
})(window);

/*****************************************************************
******                 MENU : MOBILE MENU                   ******
*****************************************************************/

/* Grabbing webmenu links for mobile menu transition */
var $menu = $('#menu1'),$menulink = $('.menu-link');
$menulink.click(function () {
    $menulink.toggleClass('active');
    $menu.toggleClass('active');
    return false;
});
$('nav#menu1 a').click(function () {
    $('#menu1').removeClass('active');
});

/*****************************************************************
******               MOUSE WHEEL : CALCULATOR               ******
*****************************************************************/

/* Setting mouse wheeling position*/
(function($){
	var mwheelI = {
		pos: [-260, -260]
	},
/* Setting mouse wheeling position difference to make event trigger */
	minDif = 3,
	doc = document,
	root = doc.documentElement,
	body = doc.body,
	longDelay, shortDelay;
	function unsetPos(){
		if(this === mwheelI.elem){
			mwheelI.pos = [-260, -260];
			mwheelI.elem = false;
			minDif = 3;
		}
	}
/* Setting event triggers */
	$.event.special.mwheelIntent = {
		setup: function(){
			var jElm = $(this).bind('mousewheel', $.event.special.mwheelIntent.handler);
			if( this !== doc && this !== root && this !== body ){
				jElm.bind('mouseleave', unsetPos);
			}
			jElm = null;
			return true;
		},
		teardown: function(){
			$(this).unbind('mousewheel', $.event.special.mwheelIntent.handler).unbind('mouseleave', unsetPos);
			return true;
		},
		handler: function(e, d){
			var pos = [e.clientX, e.clientY];
			if( this === mwheelI.elem || Math.abs(mwheelI.pos[0] - pos[0]) > minDif || Math.abs(mwheelI.pos[1] - pos[1]) > minDif ){
				mwheelI.elem = this;
				mwheelI.pos = pos;
				minDif = 250;			
				clearTimeout(shortDelay);
				shortDelay = setTimeout(function(){
					minDif = 10;
				}, 
				200);
				clearTimeout(longDelay);
				longDelay = setTimeout(function(){
					minDif = 3;
				}, 
				1500);
				e = $.extend({}, e, {
					type: 'mwheelIntent'
				});
				return $.event.handle.apply(this, arguments);
			}
		}
	};
	$.fn.extend({
		mwheelIntent: function(fn) {
			return fn ? this.bind("mwheelIntent", fn) : this.trigger("mwheelIntent");
		},	
		unmwheelIntent: function(fn) {
			return this.unbind("mwheelIntent", fn);
		}
	});
/* Making document always scrollable */
	$(function(){
		body = doc.body;
		$(doc).bind('mwheelIntent.mwheelIntentDefault', $.noop);
	});
})(jQuery);

/*****************************************************************
******            MOUSE WHEEL : TRIGGERS & WEBKIT           ******
*****************************************************************/

/* Setting triggers for custom scrolling events */
(function($) {
    "use strict"; 
    var types = ['DOMMouseScroll', 'mousewheel'];
    if ($.event.fixHooks) {
        for (var i=types.length; i;) {
            $.event.fixHooks[types[--i]] = $.event.mouseHooks;
        }
    }
    $.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener) {
                for (var i=types.length; i;) {
                    this.addEventListener(types[--i], handler, false);
                }
            } 
            else {
                this.onmousewheel = handler;
            }
        },
        teardown: function() {
            if (this.removeEventListener) {
                for (var i=types.length; i;) {
                    this.removeEventListener(types[--i], handler, false);
                }
            } 
            else {
                this.onmousewheel = null;
            }
        }
    };
    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn): this.trigger("mousewheel");
        },
        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });
    function handler(event) {
        var orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";
/* Setting old school scrollwheel delta */
        if (orgEvent.wheelDelta) { 
            delta = orgEvent.wheelDelta/180; 
        }
        if (orgEvent.detail) { 
            delta = -orgEvent.detail/1; 
        }
/* Setting multidimensionnal scroll deltas for touchpads */
        deltaY = delta;
        if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = -1*delta;
        }    
/* Setting webkit */
        if (orgEvent.wheelDeltaY !== undefined) { 
            deltaY = orgEvent.wheelDeltaY/20; 
        }
        if (orgEvent.wheelDeltaX !== undefined) { 
            deltaX = -1*orgEvent.wheelDeltaX/20; 
        }
/* Setting event and delta to apply on arguments */
        args.unshift(event, delta, deltaX, deltaY);    
        return ($.event.dispatch || $.event.handle).apply(this, args);
    }
})(jQuery);

/*****************************************************************
******             PROGRESS BAR : INITIALIZING             ******
*****************************************************************/

/* Setting progress bars basis value with animation */
function progressBar(percent, $element) {
	"use strict"; 
	var progressBarWidth = percent * $element.width() / 100;
	$element.find('div').animate({
        width: percent+'%' 
    }, 
    500).html("<span>"+percent + "</span>");
}

/*****************************************************************
******           PROGRESS BAR : LANGUAGES VALUES            ******
*****************************************************************/

/* Setting language levels for skills display */
progressBar(99, $('#progressBar'));
progressBar(80, $('#progressBar2'));
progressBar(60, $('#progressBar3'));

/*****************************************************************
******              RESPONSIVE : SMART RESIZE               ******
*****************************************************************/

/* Setting resizing function to make a smart content adapt */
(function(window, $, undefined) {
	"use strict"; 
	var $event = $.event, resizeTimeout;
	$event.special.smartresize = {
		setup: function() {
			$(this).bind("resize", $event.special.smartresize.handler);
		},
		teardown: function() {
			$(this).unbind("resize", $event.special.smartresize.handler);
		},
		handler: function(event, execAsap) {
/* Saving initial context */
			var context = this, args = arguments;
/* Setting correct event type */
			event.type = "smartresize";
			if (resizeTimeout) 
			{ 
				clearTimeout(resizeTimeout); 
			}
			resizeTimeout = setTimeout(function() {
				jQuery.event.handle.apply(context, args);
			}, 
			execAsap === "execAsap"? 0 : 50);
		}
	};
	$.fn.smartresize = function(fn) {
		return fn ? this.bind("smartresize", fn) : this.trigger("smartresize", ["execAsap"]);
	};
})(window, jQuery);

/*****************************************************************
******               VIDEO : EMBEDDED PLAYER                ******
*****************************************************************/

/* Setting standard function to allow video display */
(function($) {
    'use strict';
    $.fn.fitVids = function(options) {
        var settings = {
            customSelector: null, 
            ignore: null
        };
/* Setting video player container properties and html reference */
        if(!document.getElementById('fit-vids-style')) {
            var head = document.head || document.getElementsByTagName('head')[0];
            var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
            var div = document.createElement("div");
            div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
            head.appendChild(div.childNodes[1]);
        }
/* Setting video player iframes for external integration and respective options display */
        if (options) {
            $.extend(settings, options);
        }
        return this.each(function() {
            var selectors = [
                'iframe[src*="player.vimeo.com"]', 
                'iframe[src*="youtube.com"]', 
                'iframe[src*="youtube-nocookie.com"]', 
                'iframe[src*="kickstarter.com"][src*="video.html"]', 
                'object', 
                'embed'
            ];
            if (settings.customSelector) {
                selectors.push(settings.customSelector);
            }
            var ignoreList = '.fitvidsignore';
            if(settings.ignore) {
                ignoreList = ignoreList + ', ' + settings.ignore;
            }
/* Disabling the video handler for ignore list */
            var $allVideos = $(this).find(selectors.join(','));
            $allVideos = $allVideos.not('object object');
            $allVideos = $allVideos.not(ignoreList);
            $allVideos.each(function() {
                var $this = $(this);
/* Setting container and fullscreen display ratios */
                if($this.parents(ignoreList).length > 0) {
                    return;
                }
                if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { 
                    return; 
                }
                if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width')))) {
                    $this.attr('height', 9);
                    $this.attr('width', 16);
                }
                var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(), width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(), aspectRatio = height / width;
                if(!$this.attr('id')) {
                    var videoID = 'fitvid' + Math.floor(Math.random()*999999);
                    $this.attr('id', videoID);
                }
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
                $this.removeAttr('height').removeAttr('width');
            });
        });
    };
})(window.jQuery);