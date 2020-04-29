/*****************************************************************
******     SPLASH PAGE JAVASCRIPT CORE FUNCTIONNALITIES     ******
******                                                      ******
******   Name :         core.splash.js                      ******
******   Version :      1.0.0                               ******
******   Authors :      Corentin Kouvtanovitch              ******
******                  Tyler Smith                         ******
******                  Vincent Garreau                     ******
******                                                      ******
******                   Table of Content                   ******
******                   ----------------                   ******
******  - Carousel      Core FlexSlider v2.5 Text Slider    ******
******  - Particles     Core Particles v2.0                 ******
*****************************************************************/

/*****************************************************************
******     CAROUSEL : CORE FLEXSLIDER V2.5 TEXT SLIDER      ******
******               Author name : Tyler Smith              ******
*****************************************************************/

/* Object instance */
!function($){
    $.flexslider=function(e,t){
        var a=$(e);
        a.vars=$.extend({},$.flexslider.defaults,t);
        var n=a.vars.namespace,
        i=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,
        s=("ontouchstart"in window||i||window.DocumentTouch&&document instanceof DocumentTouch)&&a.vars.touch,
/* Deprecating this as devices released with both events */
        r="click touchend MSPointerUp keyup",
        o="",
        l,
        c="vertical"===a.vars.direction,
        d=a.vars.reverse,
        u=a.vars.itemWidth>0,
        v="fade"===a.vars.animation,
        p=""!==a.vars.asNavFor,
        m={},
        f=!0;
/* Storing reference to slider object */
        $.data(e,"flexslider",a),m={
/* Initializing private slider methods */
            init:function(){
                a.animating=!1,
/* Getting current slide and making sure it is a number */
                a.currentSlide=parseInt(a.vars.startAt?a.vars.startAt:0,10),
                isNaN(a.currentSlide)&&(a.currentSlide=0),
                a.animatingTo=a.currentSlide,
                a.atEnd=0===a.currentSlide||a.currentSlide===a.last,
                a.containerSelector=a.vars.selector.substr(0,a.vars.selector.search(" ")),
                a.slides=$(a.vars.selector,a),
                a.container=$(a.containerSelector,a),
                a.count=a.slides.length,
/* Synchronizing */
                a.syncExists=$(a.vars.sync).length>0,"slide"===a.vars.animation&&(a.vars.animation="swing"),
/* Slide position */
                a.prop=c?"top":"marginLeft",
                a.args={},
/* Slideshow private method */
                a.manualPause=!1,
                a.stopped=!1,
/* Killing sliding when invisible */
                a.started=!1,
                a.startTimeout=null,
/* On touch events and css relation */
                a.transitions=!a.vars.video&&!v&&a.vars.useCSS&&function(){
                    var e=document.createElement("div"),
                    t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];
                    for(var n in t)
                    if(void 0!==e.style[t[n]])
                    return a.pfx=t[n].replace("Perspective","").toLowerCase(),
                    a.prop="-"+a.pfx+"-transform",
                    !0;
                    return!1
                }(),
/* Setting controls containers with manual and custom ones */
                a.ensureAnimationEnd="",
                ""!==a.vars.controlsContainer&&(a.controlsContainer=$(a.vars.controlsContainer).length>0&&$(a.vars.controlsContainer)),
                ""!==a.vars.manualControls&&(a.manualControls=$(a.vars.manualControls).length>0&&$(a.vars.manualControls)),
                ""!==a.vars.customDirectionNav&&(a.customDirectionNav=2===$(a.vars.customDirectionNav).length&&$(a.vars.customDirectionNav)),
/* Randomizing */
                a.vars.randomize&&(a.slides.sort(function(){
                    return Math.round(Math.random())-.5
                }),
                a.container.empty().append(a.slides)),
                a.doMath(),
/* Initializing slider and controls */
                a.setup("init"),
                a.vars.controlNav&&m.controlNav.setup(),
                a.vars.directionNav&&m.directionNav.setup(),
                a.vars.keyboard&&(1===$(a.containerSelector).length||a.vars.multipleKeyboard)&&$(document).bind("keyup",function(e){
                    var t=e.keyCode;
                    if(!a.animating&&(39===t||37===t)){
                        var n=39===t?a.getTarget("next"):37===t?a.getTarget("prev"):!1;
                        a.flexAnimate(n,a.vars.pauseOnAction)
                    }
                }),
                a.vars.mousewheel&&a.bind("mousewheel",function(e,t,n,i){
                    e.preventDefault();
                    var s=a.getTarget(0>t?"next":"prev");
                    a.flexAnimate(s,a.vars.pauseOnAction)
                }),
                a.vars.pausePlay&&m.pausePlay.setup(),
                a.vars.slideshow&&a.vars.pauseInvisible&&m.pauseInvisible.init(),
                a.vars.slideshow&&(a.vars.pauseOnHover&&a.hover(function(){
                    a.manualPlay||a.manualPause||a.pause()
                },
                function(){
                    a.manualPause||a.manualPlay||a.stopped||a.play()
                }),
/* Killing sliding again when invisible */
                a.vars.pauseInvisible&&m.pauseInvisible.isHidden()||(a.vars.initDelay>0?a.startTimeout=setTimeout(a.play,a.vars.initDelay):a.play())),
/* Initializing animation on slides and navigation elements */                
                p&&m.asNav.setup(),
                s&&a.vars.touch&&m.touch(),
                (!v||v&&a.vars.smoothHeight)&&$(window).bind("resize orientationchange focus",m.resize),
                a.find("img").attr("draggable","false"),
                setTimeout(function(){
                    a.vars.start(a)
                },
                200)
            },
            asNav:{
                setup:function(){
                    a.asNav=!0,
                    a.animatingTo=Math.floor(a.currentSlide/a.move),
                    a.currentItem=a.currentSlide,
                    a.slides.removeClass(n+"active-slide").eq(a.currentItem).addClass(n+"active-slide"),
                    i?(e._slider=a,a.slides.each(function(){
                        var e=this;
                        e._gesture=new MSGesture,
                        e._gesture.target=e,
                        e.addEventListener("MSPointerDown",function(e){
                            e.preventDefault(),
                            e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)
                        },
                        !1),e.addEventListener("MSGestureTap",function(e){
                            e.preventDefault();
                            var t=$(this),
                            n=t.index();
                            $(a.vars.asNavFor).data("flexslider").animating||t.hasClass("active")||(a.direction=a.currentItem<n?"next":"prev",a.flexAnimate(n,a.vars.pauseOnAction,!1,!0,!0))
                        })
                    }))
                    :a.slides.on(r,function(e){
                        e.preventDefault();
                        var t=$(this),
                        i=t.index(),
                        s=t.offset().left-$(a).scrollLeft();
                        0>=s&&t.hasClass(n+"active-slide")?a.flexAnimate(a.getTarget("prev"),!0):$(a.vars.asNavFor).data("flexslider").animating||t.hasClass(n+"active-slide")||(a.direction=a.currentItem<i?"next":"prev",a.flexAnimate(i,a.vars.pauseOnAction,!1,!0,!0))
                    })
                }
            },
            controlNav:{
/* Setting up manual controls */
                setup:function(){
                    a.manualControls?m.controlNav.setupManual():m.controlNav.setupPaging()
                },
                setupPaging:function(){
                    var e="thumbnails"===a.vars.controlNav?"control-thumbs":"control-paging",
                    t=1,
                    i,
                    s;
                    if(a.controlNavScaffold=$('<ol class="'+n+"control-nav "+n+e+'"></ol>'),a.pagingCount>1)
                    for(var l=0;l<a.pagingCount;l++){
                        if(s=a.slides.eq(l),i="thumbnails"===a.vars.controlNav?'<img src="'+s.attr("data-thumb")+'"/>':"<a>"+t+"</a>","thumbnails"===a.vars.controlNav&&!0===a.vars.thumbCaptions){
                            var c=s.attr("data-thumbcaption");
                            ""!==c&&void 0!==c&&(i+='<span class="'+n+'caption">'+c+"</span>")
                        }
                        a.controlNavScaffold.append("<li>"+i+"</li>"),t++
                    }
/* Setting controls containers */            
                    a.controlsContainer?$(a.controlsContainer).append(a.controlNavScaffold):a.append(a.controlNavScaffold),
                    m.controlNav.set(),
                    m.controlNav.active(),
                    a.controlNavScaffold.delegate("a, img",r,function(e){
                        if(e.preventDefault(),""===o||o===e.type){
                            var t=$(this),
                            i=a.controlNav.index(t);
                            t.hasClass(n+"active")||(a.direction=i>a.currentSlide?"next":"prev",a.flexAnimate(i,a.vars.pauseOnAction))
                        }
/* Preventing from event duplication */
                        ""===o&&(o=e.type),
                        m.setToClearWatchedEvent()
                    })
                },
                setupManual:function(){
                    a.controlNav=a.manualControls,
                    m.controlNav.active(),
                    a.controlNav.bind(r,function(e){
                        if(e.preventDefault(),""===o||o===e.type){
                            var t=$(this),
                            i=a.controlNav.index(t);
                            t.hasClass(n+"active")||(a.direction=i>a.currentSlide?"next":"prev",a.flexAnimate(i,a.vars.pauseOnAction))
                        }
/* Preventing from event duplication again */
                        ""===o&&(o=e.type),
                        m.setToClearWatchedEvent()
                    })
                },
                set:function(){
                    var e="thumbnails"===a.vars.controlNav?"img":"a";
                    a.controlNav=$("."+n+"control-nav li "+e,a.controlsContainer?a.controlsContainer:a)
                },
                active:function(){
                    a.controlNav.removeClass(n+"active").eq(a.animatingTo).addClass(n+"active")
                },
                update:function(e,t){
                    a.pagingCount>1&&"add"===e?a.controlNavScaffold.append($("<li><a>"+a.count+"</a></li>")):1===a.pagingCount?a.controlNavScaffold.find("li").remove():a.controlNav.eq(t).closest("li").remove(),
                    m.controlNav.set(),
                    a.pagingCount>1&&a.pagingCount!==a.controlNav.length?a.update(t,e):m.controlNav.active()
                }
            },
/* Setting up custom controls and containers with html references */
            directionNav:{
                setup:function(){
                    var e=$('<ul class="'+n+'direction-nav"><li class="'+n+'nav-prev"><a class="'+n+'prev" href="#">'+a.vars.prevText+'</a></li><li class="'+n+'nav-next"><a class="'+n+'next" href="#">'+a.vars.nextText+"</a></li></ul>");
                    a.customDirectionNav?a.directionNav=a.customDirectionNav:a.controlsContainer?($(a.controlsContainer).append(e),
                    a.directionNav=$("."+n+"direction-nav li a",a.controlsContainer)):(a.append(e),
                    a.directionNav=$("."+n+"direction-nav li a",a)),
                    m.directionNav.update(),
                    a.directionNav.bind(r,function(e){
                        e.preventDefault();
                        var t;
                        (""===o||o===e.type)&&(t=a.getTarget($(this).hasClass(n+"next")?"next":"prev"),a.flexAnimate(t,a.vars.pauseOnAction)),
/* Preventing from event duplication again */                        
                        ""===o&&(o=e.type),
                        m.setToClearWatchedEvent()
                    })
                },
                update:function(){
                    var e=n+"disabled";
                    1===a.pagingCount?a.directionNav.addClass(e).attr("tabindex","-1"):a.vars.animationLoop?a.directionNav.removeClass(e).removeAttr("tabindex"):0===a.animatingTo?a.directionNav.removeClass(e).filter("."+n+"prev").addClass(e).attr("tabindex","-1"):a.animatingTo===a.last?a.directionNav.removeClass(e).filter("."+n+"next").addClass(e).attr("tabindex","-1"):a.directionNav.removeClass(e).removeAttr("tabindex")
                }
            },
            pausePlay:{
                setup:function(){
                    var e=$('<div class="'+n+'pauseplay"><a></a></div>');
                    a.controlsContainer?(a.controlsContainer.append(e),
                    a.pausePlay=$("."+n+"pauseplay a",a.controlsContainer)):(a.append(e),a.pausePlay=$("."+n+"pauseplay a",a)),
                    m.pausePlay.update(a.vars.slideshow?n+"pause":n+"play"),
                    a.pausePlay.bind(r,function(e){
                        e.preventDefault(),
                        (""===o||o===e.type)&&($(this).hasClass(n+"pause")?(a.manualPause=!0,a.manualPlay=!1,a.pause()):(a.manualPause=!1,a.manualPlay=!0,a.play())),
                        ""===o&&(o=e.type),
                        m.setToClearWatchedEvent()
                    })
                },
                update:function(e){
                    "play"===e?a.pausePlay.removeClass(n+"pause").addClass(n+"play").html(a.vars.playText):a.pausePlay.removeClass(n+"play").addClass(n+"pause").html(a.vars.pauseText)
                }
            },
            touch:function(){
                function t(t){
                    t.stopPropagation(),
                    a.animating?t.preventDefault():(a.pause(),
                    e._gesture.addPointer(t.pointerId),
                    w=0,
                    p=c?a.h:a.w,
                    f=Number(new Date),
                    l=u&&d&&a.animatingTo===a.last?0:u&&d?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:u&&a.currentSlide===a.last?a.limit:u?(a.itemW+a.vars.itemMargin)*a.move*a.currentSlide:d?(a.last-a.currentSlide+a.cloneOffset)*p:(a.currentSlide+a.cloneOffset)*p)
                }
                function n(t){
                    t.stopPropagation();
                    var a=t.target._slider;
                    if(a){
                        var n=-t.translationX,
                        i=-t.translationY;
                        return w+=c?i:n,
                        m=w,
                        y=c?Math.abs(w)<Math.abs(-n):Math.abs(w)<Math.abs(-i),
                        t.detail===t.MSGESTURE_FLAG_INERTIA?void setImmediate(function(){
                            e._gesture.stop()
                        })
                        :void((!y||Number(new Date)-f>500)&&(t.preventDefault(),!v&&a.transitions&&(a.vars.animationLoop||(m=w/(0===a.currentSlide&&0>w||a.currentSlide===a.last&&w>0?Math.abs(w)/p+2:1)),a.setProps(l+m,"setTouch"))))
                    }
                }
                function s(e){
                    e.stopPropagation();
                    var t=e.target._slider;
                    if(t){
                        if(t.animatingTo===t.currentSlide&&!y&&null!==m){
                            var a=d?-m:m,
                            n=t.getTarget(a>0?"next":"prev");
                            t.canAdvance(n)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>p/2)?t.flexAnimate(n,t.vars.pauseOnAction):v||t.flexAnimate(t.currentSlide,t.vars.pauseOnAction,!0)
                        }
                        r=null,
                        o=null,
                        m=null,
                        l=null,
                        w=0
                    }
                }
/* Setting local vars for X and Y coordinates */
                var r,o,l,p,m,f,g,h,S,y=!1,x=0,b=0,w=0;
                i?(e.style.msTouchAction="none",e._gesture=new MSGesture,e._gesture.target=e,e.addEventListener("MSPointerDown",t,!1),e._slider=a,e.addEventListener("MSGestureChange",n,!1),e.addEventListener("MSGestureEnd",s,!1)):(g=function(t){
                    a.animating?t.preventDefault():(window.navigator.msPointerEnabled||1===t.touches.length)&&(a.pause(),
                    p=c?a.h:a.w,f=Number(new Date),
                    x=t.touches[0].pageX,
                    b=t.touches[0].pageY,
                    l=u&&d&&a.animatingTo===a.last?0:u&&d?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:u&&a.currentSlide===a.last?a.limit:u?(a.itemW+a.vars.itemMargin)*a.move*a.currentSlide:d?(a.last-a.currentSlide+a.cloneOffset)*p:(a.currentSlide+a.cloneOffset)*p,
                    r=c?b:x,
                    o=c?x:b,
                    e.addEventListener("touchmove",h,!1),
                    e.addEventListener("touchend",S,!1))
                },
                h=function(e){
                    x=e.touches[0].pageX,
                    b=e.touches[0].pageY,
                    m=c?r-b:r-x,
                    y=c?Math.abs(m)<Math.abs(x-o):Math.abs(m)<Math.abs(b-o);
                    var t=500;
                    (!y||Number(new Date)-f>t)&&(e.preventDefault(),!v&&a.transitions&&(a.vars.animationLoop||(m/=0===a.currentSlide&&0>m||a.currentSlide===a.last&&m>0?Math.abs(m)/p+2:1),a.setProps(l+m,"setTouch")))
                },
                S=function(t){
                    if(e.removeEventListener("touchmove",h,!1),a.animatingTo===a.currentSlide&&!y&&null!==m){
                        var n=d?-m:m,
                        i=a.getTarget(n>0?"next":"prev");
                        a.canAdvance(i)&&(Number(new Date)-f<550&&Math.abs(n)>50||Math.abs(n)>p/2)?a.flexAnimate(i,a.vars.pauseOnAction):v||a.flexAnimate(a.currentSlide,a.vars.pauseOnAction,!0)
                    }
/* Finishing touch by undoing the touch session */
                    e.removeEventListener("touchend",S,!1),
                    r=null,
                    o=null,
                    m=null,
                    l=null
                },
                e.addEventListener("touchstart",g,!1))
            },
/* Defining smooth height */
            resize:function(){
                !a.animating&&a.is(":visible")&&(u||a.doMath(),v?m.smoothHeight():u?(a.slides.width(a.computedW),a.update(a.pagingCount),a.setProps()):c?(a.viewport.height(a.h),a.setProps(a.h,"setTotal")):(a.vars.smoothHeight&&m.smoothHeight(),a.newSlides.width(a.computedW),a.setProps(a.computedW,"setTotal")))
            },
            smoothHeight:function(e){
                if(!c||v){
                    var t=v?a:a.viewport;
                    e?t.animate({
                        height:a.slides.eq(a.animatingTo).height()
                    },
                    e):t.height(a.slides.eq(a.animatingTo).height())
                }
            },
            sync:function(e){
                var t=$(a.vars.sync).data("flexslider"),
                n=a.animatingTo;
                switch(e){
                    case"animate":t.flexAnimate(n,a.vars.pauseOnAction,!1,!0);
                        break;
                    case"play":t.playing||t.asNav||t.play();
                        break;
                    case"pause":t.pause()
                }
            },
/* Appending clone to current level and child elements with an id */
            uniqueID:function(e){
                return e.filter("[id]").add(e.find("[id]")).each(function(){
                    var e=$(this);
                    e.attr("id",e.attr("id")+"_clone")
                }),
                e
            },
            pauseInvisible:{
                visProp:null,init:function(){
                    var e=m.pauseInvisible.getHiddenProp();
                    if(e){
                        var t=e.replace(/[H|h]idden/,"")+"visibilitychange";
                        document.addEventListener(t,function(){
/* Stoping or pausing timer to prevent from sliding while invisible */
                            m.pauseInvisible.isHidden()?a.startTimeout?clearTimeout(a.startTimeout):a.pause():a.started?a.play():a.vars.initDelay>0?setTimeout(a.play,a.vars.initDelay):a.play()
                        })
                    }
                },
                isHidden:function(){
                    var e=m.pauseInvisible.getHiddenProp();
                    return e?document[e]:!1
                },
/* Hidding if supported, then loop over know prefixes to find one or doing nothing if not supported */
                getHiddenProp:function(){
                    var e=["webkit","moz","ms","o"];
                    if("hidden"in document)
                    return"hidden";
                    for(var t=0;t<e.length;t++)
                    if(e[t]+"Hidden"in document)
                    return e[t]+"Hidden";
                    return null
                }
            },
            setToClearWatchedEvent:function(){
                clearTimeout(l),l=setTimeout(function(){
                    o=""
                },
                3e3)
            }
        },
/* Public methods functions coupled to previous private functions */
        a.flexAnimate=function(e,t,i,r,o){
            if(a.vars.animationLoop||e===a.currentSlide||(a.direction=e>a.currentSlide?"next":"prev"),p&&1===a.pagingCount&&(a.direction=a.currentItem<e?"next":"prev"),!a.animating&&(a.canAdvance(e,o)||i)&&a.is(":visible")){
                if(p&&r){
                    var l=$(a.vars.asNavFor).data("flexslider");
                    if(a.atEnd=0===e||e===a.count-1,l.flexAnimate(e,!0,!1,!0,o),a.direction=a.currentItem<e?"next":"prev",l.direction=a.direction,Math.ceil((e+1)/a.visible)-1===a.currentSlide||0===e)
                    return a.currentItem=e,a.slides.removeClass(n+"active-slide").eq(e).addClass(n+"active-slide"),!1;
                    a.currentItem=e,
                    a.slides.removeClass(n+"active-slide").eq(e).addClass(n+"active-slide"),
                    e=Math.floor(e/a.visible)
                }
                if(a.animating=!0,a.animatingTo=e,t&&a.pause(),a.vars.before(a),a.syncExists&&!o&&m.sync("animate"),a.vars.controlNav&&m.controlNav.active(),u||a.slides.removeClass(n+"active-slide").eq(e).addClass(n+"active-slide"),a.atEnd=0===e||e===a.last,a.vars.directionNav&&m.directionNav.update(),e===a.last&&(a.vars.end(a),a.vars.animationLoop||a.pause()),v)s?(a.slides.eq(a.currentSlide).css({
                    opacity:0,
                    zIndex:1
                }),
                a.slides.eq(e).css({
                    opacity:1,
                    zIndex:2
                }),
                a.wrapup(f)):(a.slides.eq(a.currentSlide).css({
                    zIndex:1
                })
                .animate({
                    opacity:0
                },
                a.vars.animationSpeed,a.vars.easing),a.slides.eq(e).css({
                    zIndex:2
                })
                .animate({
                    opacity:1
                },
                a.vars.animationSpeed,
                a.vars.easing,
                a.wrapup));
/* Setting up infinite loop with unbinding and re-binding transitions */
                else{
                    var f=c?a.slides.filter(":first").height():a.computedW,g,h,S;
                    u?(g=a.vars.itemMargin,S=(a.itemW+g)*a.move*a.animatingTo,h=S>a.limit&&1!==a.visible?a.limit:S):h=0===a.currentSlide&&e===a.count-1&&a.vars.animationLoop&&"next"!==a.direction?d?(a.count+a.cloneOffset)*f:0:a.currentSlide===a.last&&0===e&&a.vars.animationLoop&&"prev"!==a.direction?d?0:(a.count+1)*f:d?(a.count-1-e+a.cloneOffset)*f:(e+a.cloneOffset)*f,a.setProps(h,"",a.vars.animationSpeed),
                    a.transitions?(a.vars.animationLoop&&a.atEnd||(a.animating=!1,a.currentSlide=a.animatingTo),
                    a.container.unbind("webkitTransitionEnd transitionend"),
                    a.container.bind("webkitTransitionEnd transitionend",
                    function(){
                        clearTimeout(a.ensureAnimationEnd),
                        a.wrapup(f)
                    }),
/* Insuring the end-event on transitions */
                    clearTimeout(a.ensureAnimationEnd),
                    a.ensureAnimationEnd=setTimeout(function(){
                        a.wrapup(f)
                    },
                    a.vars.animationSpeed+100)):
                    a.container.animate(a.args,a.vars.animationSpeed,a.vars.easing,function(){
                        a.wrapup(f)
                    })
                }
                a.vars.smoothHeight&&m.smoothHeight(a.vars.animationSpeed)
            }
        },
        a.wrapup=function(e){
            v||u||(0===a.currentSlide&&a.animatingTo===a.last&&a.vars.animationLoop?a.setProps(e,"jumpEnd"):a.currentSlide===a.last&&0===a.animatingTo&&a.vars.animationLoop&&a.setProps(e,"jumpStart")),
            a.animating=!1,
            a.currentSlide=a.animatingTo,
/* Setting up the after animation callback */
            a.vars.after(a)
        },
        a.animateSlides=function(){
            !a.animating&&f&&a.flexAnimate(a.getTarget("next"))
        },
        a.pause=function(){
            clearInterval(a.animatedSlides),
            a.animatedSlides=null,
            a.playing=!1,
            a.vars.pausePlay&&m.pausePlay.update("play"),
            a.syncExists&&m.sync("pause")
        },
        a.play=function(){
            a.playing&&clearInterval(a.animatedSlides),
            a.animatedSlides=a.animatedSlides||setInterval(a.animateSlides,a.vars.slideshowSpeed),
            a.started=a.playing=!0,
            a.vars.pausePlay&&m.pausePlay.update("pause"),
            a.syncExists&&m.sync("play")
        },
        a.stop=function(){
            a.pause(),
            a.stopped=!0
        },
/* Granting navigation functionnalities */
        a.canAdvance=function(e,t){
            var n=p?a.pagingCount-1:a.last;
            return t?!0:p&&a.currentItem===a.count-1&&0===e&&"prev"===a.direction?!0:p&&0===a.currentItem&&e===a.pagingCount-1&&"next"!==a.direction?!1:e!==a.currentSlide||p?a.vars.animationLoop?!0:a.atEnd&&0===a.currentSlide&&e===n&&"next"!==a.direction?!1:a.atEnd&&a.currentSlide===n&&0===e&&"next"===a.direction?!1:!0:!1
        },
        a.getTarget=function(e){
            return a.direction=e,
            "next"===e?a.currentSlide===a.last?0:a.currentSlide+1:0===a.currentSlide?a.last:a.currentSlide-1
        },
        a.setProps=function(e,t,n){
            var i=function(){
                var n=e?e:(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo,i=function(){
                    if(u)
                    return"setTouch"===t?e:d&&a.animatingTo===a.last?0:d?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:a.animatingTo===a.last?a.limit:n;
                    switch(t){
                        case"setTotal":
                            return d?(a.count-1-a.currentSlide+a.cloneOffset)*e:(a.currentSlide+a.cloneOffset)*e;
                        case"setTouch":
                            return d?e:e;
                        case"jumpEnd":
                            return d?e:a.count*e;
                        case"jumpStart":
                            return d?a.count*e:e;
                        default:
                            return e
                    }
                }();
                return-1*i+"px"
            }();
            a.transitions&&(i=c?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)",n=void 0!==n?n/1e3+"s":"0s",a.container.css("-"+a.pfx+"-transition-duration",n),a.container.css("transition-duration",n)),
            a.args[a.prop]=i,
            (a.transitions||void 0===n)&&a.container.css(a.args),
            a.container.css("transform",i)
        },
        a.setup=function(e){
            if(v)a.slides.css({
                width:"100%",
                "float":"left",
                marginRight:"-100%",
                position:"relative"
            }),
            "init"===e&&(s?a.slides.css({
                opacity:0,
                display:"block",
                webkitTransition:"opacity "+a.vars.animationSpeed/1e3+"s ease",
                zIndex:1
            })
            .eq(a.currentSlide).css({
                opacity:1,
                zIndex:2
            })
            :0==a.vars.fadeFirstSlide?a.slides.css({
                opacity:0,
                display:"block",
                zIndex:1
            })
            .eq(a.currentSlide).css({
                zIndex:2
            })
            .css({
                opacity:1
            })
            :a.slides.css({
                opacity:0,
                display:"block",
                zIndex:1
            })
            .eq(a.currentSlide).css({
                zIndex:2
            })
            .animate({
                opacity:1
            },
            a.vars.animationSpeed,
            a.vars.easing)),
            a.vars.smoothHeight&&m.smoothHeight();
            else {
                var t,i;
                "init"===e&&(a.viewport=$('<div class="'+n+'viewport"></div>').css({
                    overflow:"hidden",
                    position:"relative"
                })
/* Clearing out old slides clones */
                .appendTo(a).append(a.container),
                a.cloneCount=0,
                a.cloneOffset=0,
                d&&(i=$.makeArray(a.slides).reverse(),
                a.slides=$(i),
                a.container.empty().append(a.slides))),
                a.vars.animationLoop&&!u&&(a.cloneCount=2,a.cloneOffset=1,"init"!==e&&a.container.find(".clone").remove(),a.container.append(m.uniqueID(a.slides.first().clone().addClass("clone")).attr("aria-hidden","true")).prepend(m.uniqueID(a.slides.last().clone().addClass("clone")).attr("aria-hidden","true"))),
                a.newSlides=$(a.vars.selector,a),
                t=d?a.count-1-a.currentSlide+a.cloneOffset:a.currentSlide+a.cloneOffset,
                c&&!u?(a.container.height(200*(a.count+a.cloneCount)+"%").css("position","absolute").width("100%"),
                setTimeout(function(){
                    a.newSlides.css({
                        display:"block"
                    }),
                    a.doMath(),
                    a.viewport.height(a.h),
                    a.setProps(t*a.h,"init")
                },
                "init"===e?100:0)):(a.container.width(200*(a.count+a.cloneCount)+"%"),
                a.setProps(t*a.computedW,"init"),
                setTimeout(function(){
                    a.doMath(),
                    a.newSlides.css({
                        width:a.computedW,
                        "float":"left",
                        display:"block"
                    }),
                    a.vars.smoothHeight&&m.smoothHeight()
                },
                "init"===e?100:0))
            }
            u||a.slides.removeClass(n+"active-slide").eq(a.currentSlide).addClass(n+"active-slide"),
            a.vars.init(a)
        },
        a.doMath=function(){
            var e=a.slides.first(),
            t=a.vars.itemMargin,
            n=a.vars.minItems,
            i=a.vars.maxItems;
            a.w=void 0===a.viewport?a.width():a.viewport.width(),
            a.h=e.height(),
            a.boxPadding=e.outerWidth()-e.width(),
            u?(a.itemT=a.vars.itemWidth+t,a.minW=n?n*a.itemT:a.w,a.maxW=i?i*a.itemT-t:a.w,a.itemW=a.minW>a.w?(a.w-t*(n-1))/n:a.maxW<a.w?(a.w-t*(i-1))/i:a.vars.itemWidth>a.w?a.w:a.vars.itemWidth,a.visible=Math.floor(a.w/a.itemW),a.move=a.vars.move>0&&a.vars.move<a.visible?a.vars.move:a.visible,a.pagingCount=Math.ceil((a.count-a.visible)/a.move+1),a.last=a.pagingCount-1,a.limit=1===a.pagingCount?0:a.vars.itemWidth>a.w?a.itemW*(a.count-1)+t*(a.count-1):(a.itemW+t)*a.count-a.w-t):(a.itemW=a.w,a.pagingCount=a.count,a.last=a.count-1),
            a.computedW=a.itemW-a.boxPadding
        },
/* Updating current slide and animation if necessary */
        a.update=function(e,t){
            a.doMath(),
            u||(e<a.currentSlide?a.currentSlide+=1:e<=a.currentSlide&&0!==e&&(a.currentSlide-=1),a.animatingTo=a.currentSlide),a.vars.controlNav&&!a.manualControls&&("add"===t&&!u||a.pagingCount>a.controlNav.length?m.controlNav.update("add"):("remove"===t&&!u||a.pagingCount<a.controlNav.length)&&(u&&a.currentSlide>a.last&&(a.currentSlide-=1,a.animatingTo-=1),m.controlNav.update("remove",a.last))),
/* Updating control navigators */
            a.vars.directionNav&&m.directionNav.update()
        },
        a.addSlide=function(e,t){
            var n=$(e);
            a.count+=1,
            a.last=a.count-1,
            c&&d?void 0!==t?a.slides.eq(a.count-t).after(n):a.container.prepend(n):void 0!==t?a.slides.eq(t).before(n):a.container.append(n),
            a.update(t,"add"),
            a.slides=$(a.vars.selector+":not(.clone)",a),
            a.setup(),
            a.vars.added(a)
        },
/* Removing slide */
        a.removeSlide=function(e){
            var t=isNaN(e)?a.slides.index($(e)):e;
            a.count-=1,
            a.last=a.count-1,isNaN(e)?$(e,a.slides).remove():c&&d?a.slides.eq(a.last).remove():a.slides.eq(e).remove(),
            a.doMath(),
            a.update(t,"remove"),
            a.slides=$(a.vars.selector+":not(.clone)",a),
            a.setup(),
            a.vars.removed(a)
        },
        m.init()
    },
    $(window).blur(function(e){
        focused=!1
    })
/* Ensuring slider is not focused if window loses it */
    .focus(function(e){
        focused=!0
    }),
/* Setting up default settings */
    $.flexslider.defaults={
        namespace:"flex-",
        selector:".slides > li",
        animation:"fade",
        easing:"swing",
        direction:"horizontal",
        reverse:!1,
        animationLoop:!0,
        smoothHeight:!1,
        startAt:0,
        slideshow:!0,
        slideshowSpeed:7e3,
        animationSpeed:600,
        initDelay:0,
        randomize:!1,
        fadeFirstSlide:!0,
        thumbCaptions:!1,
/* Setting up default usability settings */
        pauseOnAction:!0,
        pauseOnHover:!1,
        pauseInvisible:!0,
        useCSS:!0,
        touch:!0,
        video:!1,
/* Setting up default primary controls settings */
        controlNav:!0,
        directionNav:!0,
        prevText:"Previous",
        nextText:"Next",
/* Setting up default secondary navigation settings */
        keyboard:!0,
        multipleKeyboard:!1,
        mousewheel:!1,
        pausePlay:!1,
        pauseText:"Pause",
        playText:"Play",
/* Setting up default special properties settings */
        controlsContainer:"",
        manualControls:"",
        customDirectionNav:"",
        sync:"",
        asNavFor:"",
/* Setting up default caorusel options settings */
        itemWidth:0,
        itemMargin:0,
        minItems:1,
        maxItems:0,
        move:0,
        allowOneSlide:!0,
/* Setting up default API callback settings */
        start:function(){},
        before:function(){},
        after:function(){},
        end:function(){},
        added:function(){},
        removed:function(){},
        init:function(){}
    },
/* Setting up plugin function */
    $.fn.flexslider=function(e){
        if(void 0===e&&(e={}),"object"==typeof e)
        return this.each(function(){
            var t=$(this),
            a=e.selector?e.selector:".slides > li",
            n=t.find(a);
            1===n.length&&e.allowOneSlide===!0||0===n.length?(n.fadeIn(400),
            e.start&&e.start(t)):void 0===t.data("flexslider")&&new $.flexslider(this,e)
        });
/* Helper to quickly perform functions on the slider */
        var t=$(this).data("flexslider");
        switch(e){
            case"play":
                t.play();
                break;
            case"pause":
                t.pause();
                break;
            case"stop":
                t.stop();
                break;
            case"next":
                t.flexAnimate(t.getTarget("next"),!0);
                break;
            case"prev":
            case"previous":
                t.flexAnimate(t.getTarget("prev"),!0);
                break;
            default:
                "number"==typeof e&&t.flexAnimate(e,!0)
        }
    }
}(jQuery);

/*****************************************************************
******           PARTICLES : CORE PARTICLES V2.0            ******
******             Author name : Vincent Garreau            ******
*****************************************************************/

function hexToRgb(e){
    var a=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    e=e.replace(a,function(e,a,t,i){
        return a+a+t+t+i+i
    });
    var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return t?{
        r:parseInt(t[1],16),
        g:parseInt(t[2],16),
        b:parseInt(t[3],16)
    }
    :null
}
function clamp(e,a,t){
    return Math.min(Math.max(e,a),t)
}
function isInArray(e,a){
    return a.indexOf(e)>-1
}
var pJS=function(e,a){
    var t=document.querySelector("#"+e+" > .particles-js-canvas-el");
    this.pJS={
        canvas:{
            el:t,
            w:t.offsetWidth,
            h:t.offsetHeight
        },
        particles:{
            number:{
                value:400,
                density:{
                    enable:!0,
                    value_area:800
                }
            },
            color:{
                value:"#fff"
            },
            shape:{
                type:"circle",
                stroke:{
                    width:0,
                    color:"#ff0000"
                },
                polygon:{
                    nb_sides:5
                },
                image:{
                    src:"",
                    width:100,
                    height:100
                }
            },
            opacity:{
                value:1,
                random:!1,
                anim:{
                    enable:!1,
                    speed:2,
                    opacity_min:0,
                    sync:!1
                }
            },
            size:{
                value:20,
                random:!1,
                anim:{
                    enable:!1,
                    speed:20,
                    size_min:0,
                    sync:!1
                }
            },
            line_linked:{
                enable:!0,
                distance:100,
                color:"#fff",
                opacity:1,
                width:1
            },
            move:{
                enable:!0,
                speed:2,
                direction:"none",
                random:!1,
                straight:!1,
                out_mode:"out",
                bounce:!1,
                attract:{
                    enable:!1,
                    rotateX:3e3,
                    rotateY:3e3
                }
            },
            array:[]
        },
        interactivity:{
            detect_on:"canvas",
            events:{
                onhover:{
                    enable:!0,
                    mode:"grab"
                },
                onclick:{
                    enable:!0,
                    mode:"push"
                },
                resize:!0
            },
            modes:{
                grab:{
                    distance:100,
                    line_linked:{
                        opacity:1
                    }
                },
                bubble:{
                    distance:200,
                    size:80,
                    duration:.4
                },
                repulse:{
                    distance:200,
                    duration:.4
                },
                push:{
                    particles_nb:4
                },
                remove:{
                    particles_nb:2
                }
            },
            mouse:{}
        },
        retina_detect:!1,
        fn:{
            interact:{},
            modes:{},
            vendors:{}
        },
        tmp:{}
    };
    var i=this.pJS;
    a&&Object.deepExtend(i,a),i.tmp.obj={
        size_value:i.particles.size.value,
        size_anim_speed:i.particles.size.anim.speed,
        move_speed:i.particles.move.speed,
        line_linked_distance:i.particles.line_linked.distance,
        line_linked_width:i.particles.line_linked.width,
        mode_grab_distance:i.interactivity.modes.grab.distance,
        mode_bubble_distance:i.interactivity.modes.bubble.distance,
        mode_bubble_size:i.interactivity.modes.bubble.size,
        mode_repulse_distance:i.interactivity.modes.repulse.distance
    },
    i.fn.retinaInit=function(){
        i.retina_detect&&window.devicePixelRatio>1?(i.canvas.pxratio=window.devicePixelRatio,i.tmp.retina=!0):(i.canvas.pxratio=1,i.tmp.retina=!1),
        i.canvas.w=i.canvas.el.offsetWidth*i.canvas.pxratio,
        i.canvas.h=i.canvas.el.offsetHeight*i.canvas.pxratio,
        i.particles.size.value=i.tmp.obj.size_value*i.canvas.pxratio,
        i.particles.size.anim.speed=i.tmp.obj.size_anim_speed*i.canvas.pxratio,
        i.particles.move.speed=i.tmp.obj.move_speed*i.canvas.pxratio,
        i.particles.line_linked.distance=i.tmp.obj.line_linked_distance*i.canvas.pxratio,
        i.interactivity.modes.grab.distance=i.tmp.obj.mode_grab_distance*i.canvas.pxratio,
        i.interactivity.modes.bubble.distance=i.tmp.obj.mode_bubble_distance*i.canvas.pxratio,
        i.particles.line_linked.width=i.tmp.obj.line_linked_width*i.canvas.pxratio,
        i.interactivity.modes.bubble.size=i.tmp.obj.mode_bubble_size*i.canvas.pxratio,
        i.interactivity.modes.repulse.distance=i.tmp.obj.mode_repulse_distance*i.canvas.pxratio
    },
    i.fn.canvasInit=function(){
        i.canvas.ctx=i.canvas.el.getContext("2d")
    },
    i.fn.canvasSize=function(){
        i.canvas.el.width=i.canvas.w,
        i.canvas.el.height=i.canvas.h,
        i&&i.interactivity.events.resize&&window.addEventListener("resize",function(){
            i.canvas.w=i.canvas.el.offsetWidth,
            i.canvas.h=i.canvas.el.offsetHeight,
            i.tmp.retina&&(i.canvas.w*=i.canvas.pxratio,i.canvas.h*=i.canvas.pxratio),
            i.canvas.el.width=i.canvas.w,
            i.canvas.el.height=i.canvas.h,
            i.particles.move.enable||(i.fn.particlesEmpty(),i.fn.particlesCreate(),i.fn.particlesDraw(),i.fn.vendors.densityAutoParticles()),
            i.fn.vendors.densityAutoParticles()
        })
    },
    i.fn.canvasPaint=function(){
        i.canvas.ctx.fillRect(0,0,i.canvas.w,i.canvas.h)
    },
    i.fn.canvasClear=function(){
        i.canvas.ctx.clearRect(0,0,i.canvas.w,i.canvas.h)
    },
    i.fn.particle=function(e,a,t){
        if(this.radius=(i.particles.size.random?Math.random():1)*i.particles.size.value,
        i.particles.size.anim.enable&&(this.size_status=!1,this.vs=i.particles.size.anim.speed/100,i.particles.size.anim.sync||(this.vs=this.vs*Math.random())),
        this.x=t?t.x:Math.random()*i.canvas.w,
        this.y=t?t.y:Math.random()*i.canvas.h,
        this.x>i.canvas.w-2*this.radius?this.x=this.x-this.radius:this.x<2*this.radius&&(this.x=this.x+this.radius),
        this.y>i.canvas.h-2*this.radius?this.y=this.y-this.radius:this.y<2*this.radius&&(this.y=this.y+this.radius),
        i.particles.move.bounce&&i.fn.vendors.checkOverlap(this,t),
        this.color={},
        "object"==typeof e.value)
        if(e.value instanceof Array){
            var s=e.value[Math.floor(Math.random()*i.particles.color.value.length)];
            this.color.rgb=hexToRgb(s)
        }
        else 
        void 0!=e.value.r&&void 0!=e.value.g&&void 0!=e.value.b&&(this.color.rgb={
            r:e.value.r,
            g:e.value.g,
            b:e.value.b
        }),
        void 0!=e.value.h&&void 0!=e.value.s&&void 0!=e.value.l&&(this.color.hsl={
            h:e.value.h,
            s:e.value.s,
            l:e.value.l
        });
        else
        "random"==e.value?this.color.rgb={
            r:Math.floor(256*Math.random())+0,g:Math.floor(256*Math.random())+0,
            b:Math.floor(256*Math.random())+0
        }:
        "string"==typeof e.value&&(this.color=e,this.color.rgb=hexToRgb(this.color.value));
        this.opacity=(i.particles.opacity.random?Math.random():1)*i.particles.opacity.value,
        i.particles.opacity.anim.enable&&(this.opacity_status=!1,this.vo=i.particles.opacity.anim.speed/100,i.particles.opacity.anim.sync||(this.vo=this.vo*Math.random()));
        var n={};
        switch(i.particles.move.direction){
            case"top":
                n={
                    x:0,
                    y:-1
                };
                break;
            case"top-right":
                n={
                    x:.5,
                    y:-.5
                };
                break;
            case"right":
                n={
                    x:1,
                    y:-0
                };
                break;
            case"bottom-right":
                n={
                    x:.5,
                    y:.5
                };
                break;
            case"bottom":
                n={
                    x:0,
                    y:1
                };
                break;
            case"bottom-left":
                n={
                    x:-.5,
                    y:1
                };
                break;
            case"left":
                n={
                    x:-1,
                    y:0
                };
                break;
            case"top-left":
                n={
                    x:-.5,
                    y:-.5
                };
                break;
            default:
                n={
                    x:0,
                    y:0
                }
        }
        i.particles.move.straight?(this.vx=n.x,this.vy=n.y,i.particles.move.random&&(this.vx=this.vx*Math.random(),this.vy=this.vy*Math.random())):(this.vx=n.x+Math.random()-.5,this.vy=n.y+Math.random()-.5),
        this.vx_i=this.vx,
        this.vy_i=this.vy;
        var r=i.particles.shape.type;
        if("object"==typeof r){
            if(r instanceof Array){
                var c=r[Math.floor(Math.random()*r.length)];
                this.shape=c
            }
        }
        else 
        this.shape=r;
        if("image"==this.shape){
            var o=i.particles.shape;
            this.img={
                src:o.image.src,
                ratio:o.image.width/o.image.height
            },
            this.img.ratio||(this.img.ratio=1),
            "svg"==i.tmp.img_type&&void 0!=i.tmp.source_svg&&(i.fn.vendors.createSvgImg(this),i.tmp.pushing&&(this.img.loaded=!1))
        }
    },
    i.fn.particle.prototype.draw=function(){
        function e(){
            i.canvas.ctx.drawImage(r,a.x-t,a.y-t,2*t,2*t/a.img.ratio)
        }
        var a=this;
        if(void 0!=a.radius_bubble)var t=a.radius_bubble;
        else 
        var t=a.radius;
        if(void 0!=a.opacity_bubble)var s=a.opacity_bubble;
        else 
        var s=a.opacity;
        if(a.color.rgb)var n="rgba("+a.color.rgb.r+","+a.color.rgb.g+","+a.color.rgb.b+","+s+")";
        else 
        var n="hsla("+a.color.hsl.h+","+a.color.hsl.s+"%,"+a.color.hsl.l+"%,"+s+")";
        switch(i.canvas.ctx.fillStyle=n,i.canvas.ctx.beginPath(),a.shape){
            case"circle":
                i.canvas.ctx.arc(a.x,a.y,t,0,2*Math.PI,!1);
                break;
            case"edge":
                i.canvas.ctx.rect(a.x-t,a.y-t,2*t,2*t);
                break;
            case"triangle":
                i.fn.vendors.drawShape(i.canvas.ctx,a.x-t,a.y+t/1.66,2*t,3,2);
                break;
            case"polygon":
                i.fn.vendors.drawShape(i.canvas.ctx,a.x-t/(i.particles.shape.polygon.nb_sides/3.5),
                a.y-t/.76,2.66*t/(i.particles.shape.polygon.nb_sides/3),
                i.particles.shape.polygon.nb_sides,1);
                break;
            case"star":
                i.fn.vendors.drawShape(i.canvas.ctx,a.x-2*t/(i.particles.shape.polygon.nb_sides/4),
                a.y-t/1.52,2*t*2.66/(i.particles.shape.polygon.nb_sides/3),
                i.particles.shape.polygon.nb_sides,2);
                break;
            case"image":
                if("svg"==i.tmp.img_type)var r=a.img.obj;
                else 
                var r=i.tmp.img_obj;r&&e()
        }
        i.canvas.ctx.closePath(),
        i.particles.shape.stroke.width>0&&(i.canvas.ctx.strokeStyle=i.particles.shape.stroke.color,i.canvas.ctx.lineWidth=i.particles.shape.stroke.width,i.canvas.ctx.stroke()),
        i.canvas.ctx.fill()
    },
    i.fn.particlesCreate=function(){
        for(var e=0;e<i.particles.number.value;e++)i.particles.array.push(new i.fn.particle(i.particles.color,i.particles.opacity.value))
    },
    i.fn.particlesUpdate=function(){
        for(var e=0;e<i.particles.array.length;e++){
            var a=i.particles.array[e];
            if(i.particles.move.enable){
                var t=i.particles.move.speed/2;
                a.x+=a.vx*t,a.y+=a.vy*t
            }
            if(i.particles.opacity.anim.enable&&(1==a.opacity_status?(a.opacity>=i.particles.opacity.value&&(a.opacity_status=!1),a.opacity+=a.vo):(a.opacity<=i.particles.opacity.anim.opacity_min&&(a.opacity_status=!0),a.opacity-=a.vo),a.opacity<0&&(a.opacity=0)),
            i.particles.size.anim.enable&&(1==a.size_status?(a.radius>=i.particles.size.value&&(a.size_status=!1),a.radius+=a.vs):(a.radius<=i.particles.size.anim.size_min&&(a.size_status=!0),a.radius-=a.vs),a.radius<0&&(a.radius=0)),
            "bounce"==i.particles.move.out_mode)var s={
                x_left:a.radius,
                x_right:i.canvas.w,
                y_top:a.radius,
                y_bottom:i.canvas.h
            };
            else var s={
                x_left:-a.radius,
                x_right:i.canvas.w+a.radius,
                y_top:-a.radius,
                y_bottom:i.canvas.h+a.radius
            };
            switch(a.x-a.radius>i.canvas.w?(a.x=s.x_left,a.y=Math.random()*i.canvas.h):a.x+a.radius<0&&(a.x=s.x_right,a.y=Math.random()*i.canvas.h),
            a.y-a.radius>i.canvas.h?(a.y=s.y_top,a.x=Math.random()*i.canvas.w):a.y+a.radius<0&&(a.y=s.y_bottom,a.x=Math.random()*i.canvas.w),
            i.particles.move.out_mode){
                case"bounce":
                    a.x+a.radius>i.canvas.w?a.vx=-a.vx:a.x-a.radius<0&&(a.vx=-a.vx),
                    a.y+a.radius>i.canvas.h?a.vy=-a.vy:a.y-a.radius<0&&(a.vy=-a.vy)
            }
            if(isInArray("grab",i.interactivity.events.onhover.mode)&&i.fn.modes.grabParticle(a),
            (isInArray("bubble",i.interactivity.events.onhover.mode)||isInArray("bubble",i.interactivity.events.onclick.mode))&&i.fn.modes.bubbleParticle(a),
            (isInArray("repulse",i.interactivity.events.onhover.mode)||isInArray("repulse",i.interactivity.events.onclick.mode))&&i.fn.modes.repulseParticle(a),
            i.particles.line_linked.enable||i.particles.move.attract.enable)
            for(var n=e+1;n<i.particles.array.length;n++){
                var r=i.particles.array[n];
                i.particles.line_linked.enable&&i.fn.interact.linkParticles(a,r),
                i.particles.move.attract.enable&&i.fn.interact.attractParticles(a,r),
                i.particles.move.bounce&&i.fn.interact.bounceParticles(a,r)
            }
        }
    },
    i.fn.particlesDraw=function(){
        i.canvas.ctx.clearRect(0,0,i.canvas.w,i.canvas.h),
        i.fn.particlesUpdate();
        for(var e=0;e<i.particles.array.length;e++){
            var a=i.particles.array[e];a.draw()
        }
    },
    i.fn.particlesEmpty=function(){
        i.particles.array=[]
    },
    i.fn.particlesRefresh=function(){
        cancelRequestAnimFrame(i.fn.checkAnimFrame),
        cancelRequestAnimFrame(i.fn.drawAnimFrame),
        i.tmp.source_svg=void 0,
        i.tmp.img_obj=void 0,
        i.tmp.count_svg=0,
        i.fn.particlesEmpty(),
        i.fn.canvasClear(),
        i.fn.vendors.start()
    },
    i.fn.interact.linkParticles=function(e,a){
        var t=e.x-a.x,s=e.y-a.y,
        n=Math.sqrt(t*t+s*s);
        if(n<=i.particles.line_linked.distance){
            var r=i.particles.line_linked.opacity-n/(1/i.particles.line_linked.opacity)/i.particles.line_linked.distance;
            if(r>0){
                var c=i.particles.line_linked.color_rgb_line;
                i.canvas.ctx.strokeStyle="rgba("+c.r+","+c.g+","+c.b+","+r+")",
                i.canvas.ctx.lineWidth=i.particles.line_linked.width,
                i.canvas.ctx.beginPath(),
                i.canvas.ctx.moveTo(e.x,e.y),
                i.canvas.ctx.lineTo(a.x,a.y),
                i.canvas.ctx.stroke(),
                i.canvas.ctx.closePath()
            }
        }
    },
    i.fn.interact.attractParticles=function(e,a){
        var t=e.x-a.x,s=e.y-a.y,
        n=Math.sqrt(t*t+s*s);
        if(n<=i.particles.line_linked.distance){
            var r=t/(1e3*i.particles.move.attract.rotateX),
            c=s/(1e3*i.particles.move.attract.rotateY);e.vx-=r,e.vy-=c,a.vx+=r,a.vy+=c
        }
    },
    i.fn.interact.bounceParticles=function(e,a){
        var t=e.x-a.x,
        i=e.y-a.y,
        s=Math.sqrt(t*t+i*i),
        n=e.radius+a.radius;
        n>=s&&(e.vx=-e.vx,e.vy=-e.vy,a.vx=-a.vx,a.vy=-a.vy)
    },
    i.fn.modes.pushParticles=function(e,a){
        i.tmp.pushing=!0;
        for(var t=0;e>t;t++)i.particles.array.push(new i.fn.particle(i.particles.color,i.particles.opacity.value,{
            x:a?a.pos_x:Math.random()*i.canvas.w,y:a?a.pos_y:Math.random()*i.canvas.h   
        })),
        t==e-1&&(i.particles.move.enable||i.fn.particlesDraw(),i.tmp.pushing=!1)
    },
    i.fn.modes.removeParticles=function(e){
        i.particles.array.splice(0,e),
        i.particles.move.enable||i.fn.particlesDraw()
    },
    i.fn.modes.bubbleParticle=function(e){
        function a(){
            e.opacity_bubble=e.opacity,
            e.radius_bubble=e.radius
        }
        function t(a,t,s,n,c){
            if(a!=t)
            if(i.tmp.bubble_duration_end){
                if(void 0!=s){
                    var o=n-p*(n-a)/i.interactivity.modes.bubble.duration,
                    l=a-o;
                    d=a+l,
                    "size"==c&&(e.radius_bubble=d),
                    "opacity"==c&&(e.opacity_bubble=d)
                }
            }
            else if
            (r<=i.interactivity.modes.bubble.distance){
                if(void 0!=s)var v=s;
                else 
                var v=n;
                if(v!=a){
                    var d=n-p*(n-a)/i.interactivity.modes.bubble.duration;
                    "size"==c&&(e.radius_bubble=d),
                    "opacity"==c&&(e.opacity_bubble=d)
                }
            }
            else
            "size"==c&&(e.radius_bubble=void 0),
            "opacity"==c&&(e.opacity_bubble=void 0)
        }
        if(i.interactivity.events.onhover.enable&&isInArray("bubble",i.interactivity.events.onhover.mode)){
            var s=e.x-i.interactivity.mouse.pos_x,
            n=e.y-i.interactivity.mouse.pos_y,
            r=Math.sqrt(s*s+n*n),
            c=1-r/i.interactivity.modes.bubble.distance;
            if(r<=i.interactivity.modes.bubble.distance){
                if(c>=0&&"mousemove"==i.interactivity.status){
                    if(i.interactivity.modes.bubble.size!=i.particles.size.value)
                    if(i.interactivity.modes.bubble.size>i.particles.size.value){
                        var o=e.radius+i.interactivity.modes.bubble.size*c;
                        o>=0&&(e.radius_bubble=o)
                    }
                    else {
                        var l=e.radius-i.interactivity.modes.bubble.size,
                        o=e.radius-l*c;
                        o>0?e.radius_bubble=o:e.radius_bubble=0
                    }
                    if(i.interactivity.modes.bubble.opacity!=i.particles.opacity.value)
                    if(i.interactivity.modes.bubble.opacity>i.particles.opacity.value){
                        var v=i.interactivity.modes.bubble.opacity*c;
                        v>e.opacity&&v<=i.interactivity.modes.bubble.opacity&&(e.opacity_bubble=v)
                    }
                    else {
                        var v=e.opacity-(i.particles.opacity.value-i.interactivity.modes.bubble.opacity)*c;
                        v<e.opacity&&v>=i.interactivity.modes.bubble.opacity&&(e.opacity_bubble=v)
                    }
                }
            }
            else 
            a();
            "mouseleave"==i.interactivity.status&&a()
        }
        else if
        (i.interactivity.events.onclick.enable&&isInArray("bubble",i.interactivity.events.onclick.mode)){
            if(i.tmp.bubble_clicking){
                var s=e.x-i.interactivity.mouse.click_pos_x,
                n=e.y-i.interactivity.mouse.click_pos_y,
                r=Math.sqrt(s*s+n*n),
                p=((new Date).getTime()-i.interactivity.mouse.click_time)/1e3;
                p>i.interactivity.modes.bubble.duration&&(i.tmp.bubble_duration_end=!0),
                p>2*i.interactivity.modes.bubble.duration&&(i.tmp.bubble_clicking=!1,i.tmp.bubble_duration_end=!1)
            }
            i.tmp.bubble_clicking&&(t(i.interactivity.modes.bubble.size,i.particles.size.value,e.radius_bubble,e.radius,"size"),t(i.interactivity.modes.bubble.opacity,i.particles.opacity.value,e.opacity_bubble,e.opacity,"opacity"))
        }
    },
    i.fn.modes.repulseParticle=function(e){
        function a(){
            var a=Math.atan2(d,p);
            if(e.vx=u*Math.cos(a),e.vy=u*Math.sin(a),"bounce"==i.particles.move.out_mode){
                var t={
                    x:e.x+e.vx,
                    y:e.y+e.vy
                };
                t.x+e.radius>i.canvas.w?e.vx=-e.vx:t.x-e.radius<0&&(e.vx=-e.vx),
                t.y+e.radius>i.canvas.h?e.vy=-e.vy:t.y-e.radius<0&&(e.vy=-e.vy)
            }
        }
        if(i.interactivity.events.onhover.enable&&isInArray("repulse",i.interactivity.events.onhover.mode)&&"mousemove"==i.interactivity.status){
            var t=e.x-i.interactivity.mouse.pos_x,
            s=e.y-i.interactivity.mouse.pos_y,n=Math.sqrt(t*t+s*s),
            r={
                x:t/n,
                y:s/n
            },
            c=i.interactivity.modes.repulse.distance,
            o=100,
            l=clamp(1/c*(-1*Math.pow(n/c,2)+1)*c*o,0,50),
            v={
                x:e.x+r.x*l,
                y:e.y+r.y*l
            };
            "bounce"==i.particles.move.out_mode?(v.x-e.radius>0&&v.x+e.radius<i.canvas.w&&(e.x=v.x),v.y-e.radius>0&&v.y+e.radius<i.canvas.h&&(e.y=v.y)):(e.x=v.x,e.y=v.y)
        }
        else if
        (i.interactivity.events.onclick.enable&&isInArray("repulse",i.interactivity.events.onclick.mode))
        if(i.tmp.repulse_finish||(i.tmp.repulse_count++,i.tmp.repulse_count==i.particles.array.length&&(i.tmp.repulse_finish=!0)),i.tmp.repulse_clicking){
            var c=Math.pow(i.interactivity.modes.repulse.distance/6,3),
            p=i.interactivity.mouse.click_pos_x-e.x,
            d=i.interactivity.mouse.click_pos_y-e.y,
            m=p*p+d*d,u=-c/m*1;c>=m&&a()
        }
        else 
        0==i.tmp.repulse_clicking&&(e.vx=e.vx_i,e.vy=e.vy_i)
    },
    i.fn.modes.grabParticle=function(e){
        if(i.interactivity.events.onhover.enable&&"mousemove"==i.interactivity.status){
            var a=e.x-i.interactivity.mouse.pos_x,
            t=e.y-i.interactivity.mouse.pos_y,
            s=Math.sqrt(a*a+t*t);
            if(s<=i.interactivity.modes.grab.distance){
                var n=i.interactivity.modes.grab.line_linked.opacity-s/(1/i.interactivity.modes.grab.line_linked.opacity)/i.interactivity.modes.grab.distance;
                if(n>0){
                    var r=i.particles.line_linked.color_rgb_line;
                    i.canvas.ctx.strokeStyle="rgba("+r.r+","+r.g+","+r.b+","+n+")",
                    i.canvas.ctx.lineWidth=i.particles.line_linked.width,
                    i.canvas.ctx.beginPath(),
                    i.canvas.ctx.moveTo(e.x,e.y),
                    i.canvas.ctx.lineTo(i.interactivity.mouse.pos_x,i.interactivity.mouse.pos_y),
                    i.canvas.ctx.stroke(),i.canvas.ctx.closePath()
                }
            }
        }
    },
    i.fn.vendors.eventsListeners=function(){
        "window"==i.interactivity.detect_on?i.interactivity.el=window:i.interactivity.el=i.canvas.el,
        (i.interactivity.events.onhover.enable||i.interactivity.events.onclick.enable)&&(i.interactivity.el.addEventListener("mousemove",function(e){
            if(i.interactivity.el==window)var a=e.clientX,
            t=e.clientY;
            else 
            var a=e.offsetX||e.clientX,
            t=e.offsetY||e.clientY;
            i.interactivity.mouse.pos_x=a,
            i.interactivity.mouse.pos_y=t,
            i.tmp.retina&&(i.interactivity.mouse.pos_x*=i.canvas.pxratio,i.interactivity.mouse.pos_y*=i.canvas.pxratio),
            i.interactivity.status="mousemove"
        }),
        i.interactivity.el.addEventListener("mouseleave",function(e){
            i.interactivity.mouse.pos_x=null,
            i.interactivity.mouse.pos_y=null,
            i.interactivity.status="mouseleave"
        })),
        i.interactivity.events.onclick.enable&&i.interactivity.el.addEventListener("click",function(){
            if(i.interactivity.mouse.click_pos_x=i.interactivity.mouse.pos_x,i.interactivity.mouse.click_pos_y=i.interactivity.mouse.pos_y,i.interactivity.mouse.click_time=(new Date).getTime(),i.interactivity.events.onclick.enable)
            switch(i.interactivity.events.onclick.mode){
                case"push":
                    i.particles.move.enable?i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb,i.interactivity.mouse):1==i.interactivity.modes.push.particles_nb?i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb,i.interactivity.mouse):i.interactivity.modes.push.particles_nb>1&&i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb);
                    break;
                case"remove":
                    i.fn.modes.removeParticles(i.interactivity.modes.remove.particles_nb);
                    break;
                case"bubble":
                    i.tmp.bubble_clicking=!0;
                    break;
                case"repulse":
                    i.tmp.repulse_clicking=!0,
                    i.tmp.repulse_count=0,
                    i.tmp.repulse_finish=!1,
                    setTimeout(function(){
                        i.tmp.repulse_clicking=!1
                    },
                    1e3*i.interactivity.modes.repulse.duration)
            }
        })
    },
    i.fn.vendors.densityAutoParticles=function(){
        if(i.particles.number.density.enable){
            var e=i.canvas.el.width*i.canvas.el.height/1e3;
            i.tmp.retina&&(e/=2*i.canvas.pxratio);
            var a=e*i.particles.number.value/i.particles.number.density.value_area,
            t=i.particles.array.length-a;
            0>t?i.fn.modes.pushParticles(Math.abs(t)):i.fn.modes.removeParticles(t)
        }
    },
    i.fn.vendors.checkOverlap=function(e,a){
        for(var t=0;t<i.particles.array.length;t++){
            var s=i.particles.array[t],
            n=e.x-s.x,
            r=e.y-s.y,
            c=Math.sqrt(n*n+r*r);
            c<=e.radius+s.radius&&(e.x=a?a.x:Math.random()*i.canvas.w,e.y=a?a.y:Math.random()*i.canvas.h,i.fn.vendors.checkOverlap(e))
        }
    },
    i.fn.vendors.createSvgImg=function(e){
        var a=i.tmp.source_svg,
        t=/#([0-9A-F]{3,6})/gi,
        s=a.replace(t,function(a,t,i,s){
            if(e.color.rgb)var n="rgba("+e.color.rgb.r+","+e.color.rgb.g+","+e.color.rgb.b+","+e.opacity+")";
            else 
            var n="hsla("+e.color.hsl.h+","+e.color.hsl.s+"%,"+e.color.hsl.l+"%,"+e.opacity+")";
            return n
        }),
        n=new Blob([s],
        {
            type:"image/svg+xml;charset=utf-8"
        }),
        r=window.URL||window.webkitURL||window,
        c=r.createObjectURL(n),
        o=new Image;
        o.addEventListener("load",function(){
            e.img.obj=o,
            e.img.loaded=!0,
            r.revokeObjectURL(c),
            i.tmp.count_svg++
        }),
        o.src=c
    },
    i.fn.vendors.destroypJS=function(){
        cancelAnimationFrame(i.fn.drawAnimFrame),
        t.remove(),
        pJSDom=null
    },
    i.fn.vendors.drawShape=function(e,a,t,i,s,n){
        var r=s*n,
        c=s/n,
        o=180*(c-2)/c,
        l=Math.PI-Math.PI*o/180;
        e.save(),
        e.beginPath(),
        e.translate(a,t),
        e.moveTo(0,0);
        for(var v=0;r>v;v++)e.lineTo(i,0),
        e.translate(i,0),
        e.rotate(l);
        e.fill(),
        e.restore()
    },
    i.fn.vendors.exportImg=function(){
        window.open(i.canvas.el.toDataURL("image/png"),"_blank")
    },
    i.fn.vendors.loadImg=function(e){
        if(i.tmp.img_error=void 0,""!=i.particles.shape.image.src)
        if("svg"==e){
            var a=new XMLHttpRequest;
            a.open("GET",i.particles.shape.image.src),
            a.onreadystatechange=function(e){
                4==a.readyState&&(200==a.status?(i.tmp.source_svg=e.currentTarget.response,i.fn.vendors.checkBeforeDraw()):(console.log("Error pJS - Image not found"),i.tmp.img_error=!0))
            },
            a.send()
        }
        else {
            var t=new Image;
            t.addEventListener("load",function(){
                i.tmp.img_obj=t,
                i.fn.vendors.checkBeforeDraw()
            }),
            t.src=i.particles.shape.image.src
        }
        else 
        console.log("Error pJS - No image.src"),
        i.tmp.img_error=!0
    },
    i.fn.vendors.draw=function(){
        "image"==i.particles.shape.type?"svg"==i.tmp.img_type?i.tmp.count_svg>=i.particles.number.value?(i.fn.particlesDraw(),i.particles.move.enable?i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw):cancelRequestAnimFrame(i.fn.drawAnimFrame)):i.tmp.img_error||(i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw)):void 0!=i.tmp.img_obj?(i.fn.particlesDraw(),i.particles.move.enable?i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw):cancelRequestAnimFrame(i.fn.drawAnimFrame)):i.tmp.img_error||(i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw)):(i.fn.particlesDraw(),i.particles.move.enable?i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw):cancelRequestAnimFrame(i.fn.drawAnimFrame))
    },
    i.fn.vendors.checkBeforeDraw=function(){
        "image"==i.particles.shape.type?"svg"==i.tmp.img_type&&void 0==i.tmp.source_svg?i.tmp.checkAnimFrame=requestAnimFrame(check):(cancelRequestAnimFrame(i.tmp.checkAnimFrame),i.tmp.img_error||(i.fn.vendors.init(),i.fn.vendors.draw())):(i.fn.vendors.init(),i.fn.vendors.draw())
    },
    i.fn.vendors.init=function(){
        i.fn.retinaInit(),
        i.fn.canvasInit(),
        i.fn.canvasSize(),
        i.fn.canvasPaint(),
        i.fn.particlesCreate(),
        i.fn.vendors.densityAutoParticles(),
        i.particles.line_linked.color_rgb_line=hexToRgb(i.particles.line_linked.color)
    },
    i.fn.vendors.start=function(){
        isInArray("image",i.particles.shape.type)?(i.tmp.img_type=i.particles.shape.image.src.substr(i.particles.shape.image.src.length-3),i.fn.vendors.loadImg(i.tmp.img_type)):i.fn.vendors.checkBeforeDraw()
    },
    i.fn.vendors.eventsListeners(),
    i.fn.vendors.start()
};
Object.deepExtend=function(e,a){
    for(var t in a)a[t]&&a[t].constructor&&a[t].constructor===Object?(e[t]=e[t]||{},arguments.callee(e[t],a[t])):e[t]=a[t];
    return e
},
window.requestAnimFrame=function(){
    return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){
        window.setTimeout(e,1e3/60)
    }
}(),
window.cancelRequestAnimFrame=function(){
    return window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout
}(),
window.pJSDom=[],
window.particlesJS=function(e,a){
    "string"!=typeof e&&(a=e,e="particles-js"),
    e||(e="particles-js");
    var t=document.getElementById(e),
    i="particles-js-canvas-el",
    s=t.getElementsByClassName(i);
    if(s.length)
    for(;s.length>0;)t.removeChild(s[0]);
    var n=document.createElement("canvas");
    n.className=i,
    n.style.width="100%",
    n.style.height="100%";
    var r=document.getElementById(e).appendChild(n);
    null!=r&&pJSDom.push(new pJS(e,a))
},
window.particlesJS.load=function(e,a,t){
    var i=new XMLHttpRequest;
    i.open("GET",a),
    i.onreadystatechange=function(a){
        if(4==i.readyState)
        if(200==i.status){
            var s=JSON.parse(a.currentTarget.response);
            window.particlesJS(e,s),
            t&&t()
        }
        else console.log("Error pJS - XMLHttpRequest status: "+i.status),
        console.log("Error pJS - File config not found")
    },
    i.send()
};