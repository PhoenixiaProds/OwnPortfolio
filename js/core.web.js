/*****************************************************************
******              WEB PAGES JAVASCRIPT CORE               ******
******                                                      ******
******   Name :         core.web.js                         ******
******   Version :      1.0.0                               ******
******   Authors :      Corentin Kouvtanovitch              ******
******                  Benjamin Arthur Lupton              ******
******                                                      ******
******                   Table of Content                   ******
******                   ----------------                   ******
******  - Block         Core Masonry                        ****** !!!
******  - Display       Core Image Loader                   ****** !!!
******  - Initializer   Core Ready Functions                ****** !!!
******  - Gallery       Core Grid Gallery                   ******
******  - History       Core Navigation                     ******
******  - Strings       Core String                         ******
*****************************************************************/

/*****************************************************************
******                 BLOCK : CORE MASONRY                 ******
*****************************************************************/

/* Setting standard function acting on different elements below */
(function(t) {
    function e(){}
    function i(t) {
        function i(e) {
            e.prototype.option||(e.prototype.option=function(e) {
                t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))
            })
        }
        function o(e,i) {
            t.fn[e]=function(o) {
                if("string"==typeof o) {
                    for(var s=n.call(arguments,1),a=0,h=this.length;
                    h>a;a++) {
                        var p=this[a],u=t.data(p,e);
                        if(u)if(t.isFunction(u[o])&&"_"!==o.charAt(0)) {
                            var f=u[o].apply(u,s);
                            if(void 0!==f)return f
                        }
                        else r("no such method '"+o+"' for "+e+" instance");
                        else r("cannot call methods on "+e+" prior to initialization; "+"attempted to call '"+o+"'")
                    }
                    return this
                }
                return this.each(function() {
                    var n=t.data(this,e);
                    n?(n.option(o),n._init()):(n=new i(this,o),t.data(this,e,n))
                })
            }
        }
        if(t) {
            var r="undefined"==typeof console?e:function(t) {
                console.error(t)
            };
            return t.bridget=function(t,e) {
                i(e),o(t,e)
            },
            t.bridget
        }
    }
    var n=Array.prototype.slice;
    "function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],i):i(t.jQuery)
})
(window),function(t) {
    function e(e) {
        var i=t.event;
        return i.target=i.target||i.srcElement||e,i
    }
    var i=document.documentElement,n=function(){};
    i.addEventListener?n=function(t,e,i) {
        t.addEventListener(e,i,!1)
    }
    :i.attachEvent&&(n=function(t,i,n) {
        t[i+n]=n.handleEvent?function() {
            var i=e(t);n.handleEvent.call(n,i)
        }
        :function() {
            var i=e(t);n.call(t,i)
        },
        t.attachEvent("on"+i,t[i+n])
    });
    var o=function(){};
    i.removeEventListener?o=function(t,e,i) {
        t.removeEventListener(e,i,!1)
    }
    :i.detachEvent&&(o=function(t,e,i) {
        t.detachEvent("on"+e,t[e+i]);
        try {
            delete t[e+i]
        }
        catch(n) {
            t[e+i]=void 0
        }
    });
    var r= {
        bind:n,unbind:o
    };
    "function"==typeof define&&define.amd?define("eventie/eventie",r):"object"==typeof exports?module.exports=r:t.eventie=r
}
(this),function(t) {
    function e(t) {
        "function"==typeof t&&(e.isReady?t():r.push(t))
    }
    function i(t) {
        var i="readystatechange"===t.type&&"complete"!==o.readyState;
        if(!e.isReady&&!i) {
            e.isReady=!0;
            for(var n=0,s=r.length;s>n;n++) {
                var a=r[n];a()
            }
        }
    }
    function n(n) {
        return n.bind(o,"DOMContentLoaded",i),n.bind(o,"readystatechange",i),n.bind(t,"load",i),e
    }
    var o=t.document,r=[];
    e.isReady=!1,"function"==typeof define&&define.amd?(e.isReady="function"==typeof requirejs,define("doc-ready/doc-ready",["eventie/eventie"],n)):t.docReady=n(t.eventie)
}
(this),function() {
    function t(){}
    function e(t,e) {
        for(var i=t.length;i--;)if(t[i].listener===e)return i;
        return-1
    }
    function i(t) {
        return function() { 
            return this[t].apply(this,arguments)
        }
    }
    var n=t.prototype,o=this,r=o.EventEmitter;
    n.getListeners=function(t) {
        var e,i,n=this._getEvents();
        if(t instanceof RegExp) {
            e={};
            for(i in n)n.hasOwnProperty(i)&&t.test(i)&&(e[i]=n[i])
        }
        else e=n[t]||(n[t]=[]);
        return e
    },
    n.flattenListeners=function(t) {
        var e,i=[];
        for(e=0;t.length>e;e+=1)i.push(t[e].listener);
        return i
    },
    n.getListenersAsObject=function(t) {
        var e,i=this.getListeners(t);
        return i instanceof Array&&(e={},e[t]=i),e||i
    },
    n.addListener=function(t,i) {
        var n,o=this.getListenersAsObject(t),r="object"==typeof i;
        for(n in o)o.hasOwnProperty(n)&&-1===e(o[n],i)&&o[n].push(r?i: {
            listener:i,once:!1
        });
        return this
    },
    n.on=i("addListener"),n.addOnceListener=function(t,e) {
        return this.addListener(t, {
            listener:e,once:!0
        })
    },
    n.once=i("addOnceListener"),n.defineEvent=function(t) {
        return this.getListeners(t),this
    },
    n.defineEvents=function(t) {
        for(var e=0;t.length>e;e+=1)this.defineEvent(t[e]);
        return this
    },
    n.removeListener=function(t,i) {
        var n,o,r=this.getListenersAsObject(t);
        for(o in r)r.hasOwnProperty(o)&&(n=e(r[o],i),-1!==n&&r[o].splice(n,1));
        return this
    },
    n.off=i("removeListener"),n.addListeners=function(t,e) {
        return this.manipulateListeners(!1,t,e)
    },
    n.removeListeners=function(t,e) {
        return this.manipulateListeners(!0,t,e)
    },
    n.manipulateListeners=function(t,e,i) {
        var n,o,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;
        if("object"!=typeof e||e instanceof RegExp)for(n=i.length;n--;)r.call(this,e,i[n]);
        else for(n in e)e.hasOwnProperty(n)&&(o=e[n])&&("function"==typeof o?r.call(this,n,o):s.call(this,n,o));
        return this
    },
    n.removeEvent=function(t) {
        var e,i=typeof t,n=this._getEvents();
        if("string"===i)delete n[t];
        else if(t instanceof RegExp)for(e in n)n.hasOwnProperty(e)&&t.test(e)&&delete n[e];
        else delete this._events;
        return this
    },
    n.removeAllListeners=i("removeEvent"),n.emitEvent=function(t,e) {
        var i,n,o,r,s=this.getListenersAsObject(t);
        for(o in s)if(s.hasOwnProperty(o))for(n=s[o].length;n--;)i=s[o][n],i.once===!0&&this.removeListener(t,i.listener),r=i.listener.apply(this,e||[]),r===this._getOnceReturnValue()&&this.removeListener(t,i.listener);
        return this
    },
    n.trigger=i("emitEvent"),n.emit=function(t) {
        var e=Array.prototype.slice.call(arguments,1);
        return this.emitEvent(t,e)
    },
    n.setOnceReturnValue=function(t) {
        return this._onceReturnValue=t,this
    },
    n._getOnceReturnValue=function() {
        return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0
    },
    n._getEvents=function() {
        return this._events||(this._events={})
    },
    t.noConflict=function() {
        return o.EventEmitter=r,t
    },
    "function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function() {
        return t
    })
    :"object"==typeof module&&module.exports?module.exports=t:this.EventEmitter=t
}
.call(this),function(t) {
    function e(t) {
        if(t) {
            if("string"==typeof n[t])return t;
            t=t.charAt(0).toUpperCase()+t.slice(1);
            for(var e,o=0,r=i.length;r>o;o++)if(e=i[o]+t,"string"==typeof n[e])return e
        }
    }
    var i="Webkit Moz ms Ms O".split(" "),n=document.documentElement.style;
    "function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function() {
        return e
    })
    :"object"==typeof exports?module.exports=e:t.getStyleProperty=e
}
(window),function(t) {
    function e(t) {
        var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);
        return i&&e
    }
    function i() {
        for(var t= {
            width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0
        },
        e=0,i=s.length;i>e;e++) {
            var n=s[e];
            t[n]=0
        }
        return t
    }
    function n(t) {
        function n(t) {
            if("string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType) {
                var n=r(t);
                if("none"===n.display)return i();
                var o={};
                o.width=t.offsetWidth,o.height=t.offsetHeight;
                for(var u=o.isBorderBox=!(!p||!n[p]||"border-box"!==n[p]),f=0,c=s.length;c>f;f++) {
                    var d=s[f],l=n[d];
                    l=a(t,l);
                    var m=parseFloat(l);
                    o[d]=isNaN(m)?0:m
                }
                var y=o.paddingLeft+o.paddingRight,g=o.paddingTop+o.paddingBottom,v=o.marginLeft+o.marginRight,b=o.marginTop+o.marginBottom,_=o.borderLeftWidth+o.borderRightWidth,E=o.borderTopWidth+o.borderBottomWidth,L=u&&h,x=e(n.width);
                x!==!1&&(o.width=x+(L?0:y+_));
                var z=e(n.height);
                return z!==!1&&(o.height=z+(L?0:g+E)),o.innerWidth=o.width-(y+_),o.innerHeight=o.height-(g+E),o.outerWidth=o.width+v,o.outerHeight=o.height+b,o
            }
        }
        function a(t,e) {
            if(o||-1===e.indexOf("%"))return e;
            var i=t.style,n=i.left,r=t.runtimeStyle,s=r&&r.left;
            return s&&(r.left=t.currentStyle.left),i.left=e,e=i.pixelLeft,i.left=n,s&&(r.left=s),e
        }
        var h,p=t("boxSizing");
        return function() {
            if(p) {
                var t=document.createElement("div");
                t.style.width="200px",t.style.padding="1px 2px 3px 4px",t.style.borderStyle="solid",t.style.borderWidth="1px 2px 3px 4px",t.style[p]="border-box";
                var i=document.body||document.documentElement;
                i.appendChild(t);
                var n=r(t);
                h=200===e(n.width),i.removeChild(t)
            }
        }(),
        n
    }
    var o=t.getComputedStyle,r=o?function(t) {
        return o(t,null)
    }
    :function(t) {
        return t.currentStyle
    },
    s=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];
    "function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],n):"object"==typeof exports?module.exports=n(require("get-style-property")):t.getSize=n(t.getStyleProperty)
}
(window),function(t,e) {
    function i(t,e) {
        return t[a](e)
    }
    function n(t) {
        if(!t.parentNode) {
            var e=document.createDocumentFragment();
            e.appendChild(t)
        }
    }
    function o(t,e) {
        n(t);
        for(var i=t.parentNode.querySelectorAll(e),o=0,r=i.length;
        r>o;o++)if(i[o]===t)return!0;
        return!1
    }
    function r(t,e) {
        return n(t),i(t,e)
    }
    var s,a=function() {
        if(e.matchesSelector)return"matchesSelector";
        for(var t=["webkit","moz","ms","o"],i=0,n=t.length;n>i;i++) {
            var o=t[i],r=o+"MatchesSelector";
            if(e[r])return r
        }
    }();
    if(a) {
        var h=document.createElement("div"),p=i(h,"div");
        s=p?i:r
    }
    else s=o;
    "function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function() {
        return s
    })
    :window.matchesSelector=s
}
(this,Element.prototype),function(t) {
    function e(t,e) {
        for(var i in e)t[i]=e[i];
        return t
    }
    function i(t) {
        for(var e in t)return!1;
        return e=null,!0
    }
    function n(t) {
        return t.replace(/([A-Z])/g,function(t) {
            return"-"+t.toLowerCase()
        })
    }
    function o(t,o,r) {
        function a(t,e) {
            t&&(this.element=t,this.layout=e,this.position= {
                x:0,y:0
            },
            this._create())
        }
        var h=r("transition"),p=r("transform"),u=h&&p,f=!!r("perspective"),c= {
            WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"
        }
        [h],d=["transform","transition","transitionDuration","transitionProperty"],l=function() {
            for(var t={},e=0,i=d.length;i>e;e++) {
                var n=d[e],o=r(n);
                o&&o!==n&&(t[n]=o)
            }
            return t
        }();
        e(a.prototype,t.prototype),a.prototype._create=function() {
            this._transn= {
                ingProperties:{},clean:{},onEnd:{}
            },
            this.css( {
                position:"absolute"
            })
        },
        a.prototype.handleEvent=function(t) {
            var e="on"+t.type;
            this[e]&&this[e](t)
        },
        a.prototype.getSize=function() {
            this.size=o(this.element)
        },
        a.prototype.css=function(t) {
            var e=this.element.style;
            for(var i in t) {
                var n=l[i]||i;e[n]=t[i]
            }
        },
        a.prototype.getPosition=function() {
            var t=s(this.element),e=this.layout.options,i=e.isOriginLeft,n=e.isOriginTop,o=parseInt(t[i?"left":"right"],10),r=parseInt(t[n?"top":"bottom"],10);
            o=isNaN(o)?0:o,r=isNaN(r)?0:r;
            var a=this.layout.size;
            o-=i?a.paddingLeft:a.paddingRight,r-=n?a.paddingTop:a.paddingBottom,this.position.x=o,this.position.y=r
        },
        a.prototype.layoutPosition=function() {
            var t=this.layout.size,e=this.layout.options,i={};
            e.isOriginLeft?(i.left=this.position.x+t.paddingLeft+"px",i.right=""):(i.right=this.position.x+t.paddingRight+"px",i.left=""),e.isOriginTop?(i.top=this.position.y+t.paddingTop+"px",i.bottom=""):(i.bottom=this.position.y+t.paddingBottom+"px",i.top=""),this.css(i),this.emitEvent("layout",[this])
        };
        var m=f?function(t,e) {
            return"translate3d("+t+"px, "+e+"px, 0)"
        }
        :function(t,e) {
            return"translate("+t+"px, "+e+"px)"
        };
        a.prototype._transitionTo=function(t,e) {
            this.getPosition();
            var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;
            if(this.setPosition(t,e),s&&!this.isTransitioning)return this.layoutPosition(),void 0;
            var a=t-i,h=e-n,p={},u=this.layout.options;
            a=u.isOriginLeft?a:-a,h=u.isOriginTop?h:-h,p.transform=m(a,h),this.transition( {
                to:p,onTransitionEnd: {
                    transform:this.layoutPosition
                },
                isCleaning:!0
            })
        },
        a.prototype.goTo=function(t,e) {
            this.setPosition(t,e),this.layoutPosition()
        },
        a.prototype.moveTo=u?a.prototype._transitionTo:a.prototype.goTo,a.prototype.setPosition=function(t,e) {
            this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)
        },
        a.prototype._nonTransition=function(t) {
            this.css(t.to),t.isCleaning&&this._removeStyles(t.to);
            for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)
        },
        a.prototype._transition=function(t) {
            if(!parseFloat(this.layout.options.transitionDuration))return this._nonTransition(t),void 0;
            var e=this._transn;
            for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];
            for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);
            if(t.from) {
                this.css(t.from);
                var n=this.element.offsetHeight;
                n=null
            }
            this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0
        };
        var y=p&&n(p)+",opacity";a.prototype.enableTransition=function() {
            this.isTransitioning||(this.css( {
                transitionProperty:y,transitionDuration:this.layout.options.transitionDuration
            }),
            this.element.addEventListener(c,this,!1))
        },
        a.prototype.transition=a.prototype[h?"_transition":"_nonTransition"],a.prototype.onwebkitTransitionEnd=function(t) {
            this.ontransitionend(t)
        },
        a.prototype.onotransitionend=function(t) {
            this.ontransitionend(t)
        };
        var g= {
            "-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"
        };
        a.prototype.ontransitionend=function(t) {
            if(t.target===this.element) {
                var e=this._transn,n=g[t.propertyName]||t.propertyName;
                if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd) {
                    var o=e.onEnd[n];
                    o.call(this),delete e.onEnd[n]
                }
                this.emitEvent("transitionEnd",[this])
            }
        },
        a.prototype.disableTransition=function() {
            this.removeTransitionStyles(),this.element.removeEventListener(c,this,!1),this.isTransitioning=!1
        },
        a.prototype._removeStyles=function(t) {
            var e={};
            for(var i in t)e[i]="";
            this.css(e)
        };
        var v= {
            transitionProperty:"",transitionDuration:""
        };
        return a.prototype.removeTransitionStyles=function() {
            this.css(v)
        },
        a.prototype.removeElem=function() {
            this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])
        },
        a.prototype.remove=function() {
            if(!h||!parseFloat(this.layout.options.transitionDuration))return this.removeElem(),void 0;var t=this;
            this.on("transitionEnd",function() {
                return t.removeElem(),!0
            }),
            this.hide()
        },
        a.prototype.reveal=function() {
            delete this.isHidden,this.css( {
                display:""
            });
            var t=this.layout.options;
            this.transition( {
                from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0
            })
        },
        a.prototype.hide=function() {
            this.isHidden=!0,this.css( {
                display:""
            });
            var t=this.layout.options;
            this.transition( {
                from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd: {
                    opacity:function() {
                        this.isHidden&&this.css( {
                            display:"none"
                        })
                    }
                }
            })
        },
        a.prototype.destroy=function() {
            this.css( {
                position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""
            })
        },
        a
    }
    var r=document.defaultView,s=r&&r.getComputedStyle?function(t) {
        return r.getComputedStyle(t,null)
    }
    :function(t) {
        return t.currentStyle
    };
    "function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],o):(t.Outlayer={},t.Outlayer.Item=o(t.EventEmitter,t.getSize,t.getStyleProperty))
}
(window),function(t) {
    function e(t,e) {
        for(var i in e)t[i]=e[i];
        return t
    }
    function i(t) {
        return"[object Array]"===f.call(t)
    }
    function n(t) {
        var e=[];
        if(i(t))e=t;
        else if(t&&"number"==typeof t.length)for(var n=0,o=t.length;o>n;n++)e.push(t[n]);
        else e.push(t);
        return e
    }
    function o(t,e) {
        var i=d(e,t);-1!==i&&e.splice(i,1)
    }
    function r(t) {
        return t.replace(/(.)([A-Z])/g,function(t,e,i) {
            return e+"-"+i
        })
        .toLowerCase()
    }
    function s(i,s,f,d,l,m) {
        function y(t,i) {
            if("string"==typeof t&&(t=a.querySelector(t)),!t||!c(t))return h&&h.error("Bad "+this.constructor.namespace+" element: "+t),void 0;
            this.element=t,this.options=e({},this.options),this.option(i);
            var n=++v;
            this.element.outlayerGUID=n,b[n]=this,this._create(),this.options.isInitLayout&&this.layout()
        }
        function g(t,i) {
            t.prototype[i]=e({},y.prototype[i])
        }
        var v=0,b={};
        return y.namespace="outlayer",y.Item=m,y.prototype.options= {
            containerStyle: {
                position:"relative"
            },
            isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,transitionDuration:"0.4s",hiddenStyle: {
                opacity:0,transform:"scale(0.001)"
            },
            visibleStyle: {
                opacity:1,transform:"scale(1)"
            }
        },
        e(y.prototype,f.prototype),y.prototype.option=function(t) {
            e(this.options,t)
        },
        y.prototype._create=function() {
            this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()
        },
        y.prototype.reloadItems=function() {
            this.items=this._itemize(this.element.children)
        },
        y.prototype._itemize=function(t) {
            for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0,r=e.length;r>o;o++) {
                var s=e[o],a=new i(s,this);n.push(a)
            }
            return n
        },
        y.prototype._filterFindItemElements=function(t) {
            t=n(t);
            for(var e=this.options.itemSelector,i=[],o=0,r=t.length;
                r>o;o++) {
                    var s=t[o];
                    if(c(s))if(e) {
                        l(s,e)&&i.push(s);
                        for(var a=s.querySelectorAll(e),h=0,p=a.length;
                        p>h;h++)i.push(a[h])
                    }
                    else i.push(s)
                }
                return i
            },
            y.prototype.getItemElements=function() {
                for(var t=[],e=0,i=this.items.length;i>e;e++)t.push(this.items[e].element);
                return t
            },
            y.prototype.layout=function() {
                this._resetLayout(),this._manageStamps();
                var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;
                this.layoutItems(this.items,t),this._isLayoutInited=!0
            },
            y.prototype._init=y.prototype.layout,y.prototype._resetLayout=function() {
                this.getSize()
            },
            y.prototype.getSize=function() {
                this.size=d(this.element)
            },
            y.prototype._getMeasurement=function(t,e) {
                var i,n=this.options[t];
                n?("string"==typeof n?i=this.element.querySelector(n):c(n)&&(i=n),this[t]=i?d(i)[e]:n):this[t]=0
            },
            y.prototype.layoutItems=function(t,e) {
                t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()
            },
            y.prototype._getItemsForLayout=function(t) {
                for(var e=[],i=0,n=t.length;n>i;i++) {
                    var o=t[i];
                    o.isIgnored||e.push(o)
                }
                return e
            },
            y.prototype._layoutItems=function(t,e) {
                function i() {
                    n.emitEvent("layoutComplete",[n,t])
                }
                var n=this;
                if(!t||!t.length)return i(),void 0;
                this._itemsOn(t,"layout",i);
                for(var o=[],r=0,s=t.length;s>r;r++) {
                    var a=t[r],h=this._getItemLayoutPosition(a);
                    h.item=a,h.isInstant=e||a.isLayoutInstant,o.push(h)
                }
                this._processLayoutQueue(o)
            },
            y.prototype._getItemLayoutPosition=function() {
                return {
                    x:0,y:0
                }
            },
            y.prototype._processLayoutQueue=function(t) {
                for(var e=0,i=t.length;i>e;e++) {
                    var n=t[e];
                    this._positionItem(n.item,n.x,n.y,n.isInstant)
                }
            },
            y.prototype._positionItem=function(t,e,i,n) {
                n?t.goTo(e,i):t.moveTo(e,i)
            },
            y.prototype._postLayout=function() {
                var t=this._getContainerSize();
                t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))
            },
            y.prototype._getContainerSize=u,y.prototype._setContainerMeasure=function(t,e) {
                if(void 0!==t) {
                    var i=this.size;
                    i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"
                }
            },
            y.prototype._itemsOn=function(t,e,i) {
                function n() {
                    return o++,o===r&&i.call(s),!0
                }
                for(var o=0,r=t.length,s=this,a=0,h=t.length;h>a;a++) {
                    var p=t[a];
                    p.on(e,n)
                }
            },
            y.prototype.ignore=function(t) {
                var e=this.getItem(t);
                e&&(e.isIgnored=!0)
            },
            y.prototype.unignore=function(t) {
                var e=this.getItem(t);
                e&&delete e.isIgnored
            },
            y.prototype.stamp=function(t) {
                if(t=this._find(t)) {
                    this.stamps=this.stamps.concat(t);
                    for(var e=0,i=t.length;i>e;e++) {
                        var n=t[e];
                        this.ignore(n)
                    }
                }
            },
            y.prototype.unstamp=function(t) {
                if(t=this._find(t))for(var e=0,i=t.length;i>e;e++) {
                    var n=t[e];
                    o(n,this.stamps),this.unignore(n)
                }
            },
            y.prototype._find=function(t) {
                return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n(t)):void 0
            },
            y.prototype._manageStamps=function() {
                if(this.stamps&&this.stamps.length) {
                    this._getBoundingRect();
                    for(var t=0,e=this.stamps.length;e>t;t++) {
                        var i=this.stamps[t];
                        this._manageStamp(i)
                    }
                }
            },
            y.prototype._getBoundingRect=function() {
                var t=this.element.getBoundingClientRect(),e=this.size;
                this._boundingRect= {
                    left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)
                }
            },
            y.prototype._manageStamp=u,y.prototype._getElementOffset=function(t) {
                var e=t.getBoundingClientRect(),i=this._boundingRect,n=d(t),o= {
                    left:e.left-i.left-n.marginLeft,top:e.top-i.top-n.marginTop,right:i.right-e.right-n.marginRight,bottom:i.bottom-e.bottom-n.marginBottom
                };
                return o
            },
            y.prototype.handleEvent=function(t) {
                var e="on"+t.type;
                this[e]&&this[e](t)
            },
            y.prototype.bindResize=function() {
                this.isResizeBound||(i.bind(t,"resize",this),this.isResizeBound=!0)
            },
            y.prototype.unbindResize=function() {
                i.unbind(t,"resize",this),this.isResizeBound=!1
            },
            y.prototype.onresize=function() {
                function t() {
                    e.resize(),delete e.resizeTimeout
                }
                this.resizeTimeout&&clearTimeout(this.resizeTimeout);
                var e=this;
                this.resizeTimeout=setTimeout(t,100)
            },
            y.prototype.resize=function() {
                var t=d(this.element),e=this.size&&t;
                e&&t.innerWidth===this.size.innerWidth||this.layout()
            },
            y.prototype.addItems=function(t) {
                var e=this._itemize(t);
                return e.length&&(this.items=this.items.concat(e)),e
            },
            y.prototype.appended=function(t) {
                var e=this.addItems(t);
                e.length&&(this.layoutItems(e,!0),this.reveal(e))
            },
            y.prototype.prepended=function(t) {
                var e=this._itemize(t);
                if(e.length) {
                    var i=this.items.slice(0);
                    this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)
                }
            },
            y.prototype.reveal=function(t) {
                var e=t&&t.length;
                if(e)for(var i=0;e>i;i++) {
                    var n=t[i];n.reveal()
                }
            },
            y.prototype.hide=function(t) {
                var e=t&&t.length;
                if(e)for(var i=0;e>i;i++) {
                    var n=t[i];
                    n.hide()
                }
            },
            y.prototype.getItem=function(t) {
                for(var e=0,i=this.items.length;i>e;e++) {
                    var n=this.items[e];
                    if(n.element===t)return n
                }
            },
            y.prototype.getItems=function(t) {
                if(t&&t.length) {
                    for(var e=[],i=0,n=t.length;n>i;i++) {
                        var o=t[i],r=this.getItem(o);
                        r&&e.push(r)
                    }
                    return e
                }
            },
            y.prototype.remove=function(t) {
                t=n(t);
                var e=this.getItems(t);
                if(e&&e.length) {
                    this._itemsOn(e,"remove",function() {
                        this.emitEvent("removeComplete",[this,e])
                    });
                    for(var i=0,r=e.length;r>i;i++) {
                        var s=e[i];
                        s.remove(),o(s,this.items)
                    }
                }
            },
            y.prototype.destroy=function() {
                var t=this.element.style;
                t.height="",t.position="",t.width="";
                for(var e=0,i=this.items.length;i>e;e++) {
                    var n=this.items[e];
                    n.destroy()
                }
                this.unbindResize(),delete this.element.outlayerGUID,p&&p.removeData(this.element,this.constructor.namespace)
            },
            y.data=function(t) {
                var e=t&&t.outlayerGUID;
                return e&&b[e]
            },
            y.create=function(t,i) {
                function n() {
                    y.apply(this,arguments)
                }
                return Object.create?n.prototype=Object.create(y.prototype):e(n.prototype,y.prototype),n.prototype.constructor=n,g(n,"options"),e(n.prototype.options,i),n.namespace=t,n.data=y.data,n.Item=function() {
                    m.apply(this,arguments)
                },
                n.Item.prototype=new m,s(function() {
                    for(var e=r(t),i=a.querySelectorAll(".js-"+e),o="data-"+e+"-options",s=0,u=i.length;u>s;s++) {
                        var f,c=i[s],d=c.getAttribute(o);
                        try {
                            f=d&&JSON.parse(d)
                        }
                        catch(l) {
                            h&&h.error("Error parsing "+o+" on "+c.nodeName.toLowerCase()+(c.id?"#"+c.id:"")+": "+l);
                            continue
                        }
                        var m=new n(c,f);
                        p&&p.data(c,t,m)
                    }
                }),
                p&&p.bridget&&p.bridget(t,n),n
            },
            y.Item=m,y
    }
    var a=t.document,h=t.console,p=t.jQuery,u=function(){},f=Object.prototype.toString,c="object"==typeof HTMLElement?function(t) {
        return t instanceof HTMLElement
    }
    :function(t) {
        return t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName
    },
    d=Array.prototype.indexOf?function(t,e) {
        return t.indexOf(e)
    }
    :function(t,e) {
        for(var i=0,n=t.length;n>i;i++)if(t[i]===e)return i;
        return-1
    };
    "function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],s):t.Outlayer=s(t.eventie,t.docReady,t.EventEmitter,t.getSize,t.matchesSelector,t.Outlayer.Item)
}
(window),function(t) {
    function e(t,e) {
        var n=t.create("masonry");
        return n.prototype._resetLayout=function() {
            this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();
            var t=this.cols;
            for(this.colYs=[];t--;)this.colYs.push(0);
            this.maxY=0
        },
        n.prototype.measureColumns=function() {
            if(this.getContainerWidth(),!this.columnWidth) {
                var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth
            }
            this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)
        },
        n.prototype.getContainerWidth=function() {
            var t=this.options.isFitWidth?this.element.parentNode:this.element,i=e(t);
            this.containerWidth=i&&i.innerWidth
        },
        n.prototype._getItemLayoutPosition=function(t) {
            t.getSize();
            var e=t.size.outerWidth%this.columnWidth,n=e&&1>e?"round":"ceil",o=Math[n](t.size.outerWidth/this.columnWidth);
            o=Math.min(o,this.cols);
            for(var r=this._getColGroup(o),s=Math.min.apply(Math,r),a=i(r,s),h= {
                x:this.columnWidth*a,y:s
            },
            p=s+t.size.outerHeight,u=this.cols+1-r.length,f=0;u>f;f++)this.colYs[a+f]=p;
            return h
        },
        n.prototype._getColGroup=function(t) {
            if(2>t)return this.colYs;
            for(var e=[],i=this.cols+1-t,n=0;i>n;n++) {
                var o=this.colYs.slice(n,n+t);
                e[n]=Math.max.apply(Math,o)
            }
            return e
        },
        n.prototype._manageStamp=function(t) {
            var i=e(t),n=this._getElementOffset(t),o=this.options.isOriginLeft?n.left:n.right,r=o+i.outerWidth,s=Math.floor(o/this.columnWidth);
            s=Math.max(0,s);
            var a=Math.floor(r/this.columnWidth);
            a-=r%this.columnWidth?0:1,a=Math.min(this.cols-1,a);
            for(var h=(this.options.isOriginTop?n.top:n.bottom)+i.outerHeight,p=s;a>=p;p++)this.colYs[p]=Math.max(h,this.colYs[p])
        },
        n.prototype._getContainerSize=function() {
            this.maxY=Math.max.apply(Math,this.colYs);
            var t= {
                height:this.maxY
            };
            return this.options.isFitWidth&&(t.width=this._getContainerFitWidth()),t
        },
        n.prototype._getContainerFitWidth=function() {
            for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;
            return(this.cols-t)*this.columnWidth-this.gutter
        },
        n.prototype.resize=function() {
            var t=this.containerWidth;this.getContainerWidth(),t!==this.containerWidth&&this.layout()
        },
        n
    }
    var i=Array.prototype.indexOf?function(t,e) {
        return t.indexOf(e)
    }
    :function(t,e) {
        for(var i=0,n=t.length;n>i;i++) {
            var o=t[i];
            if(o===e)return i
        }
        return-1
    };
    "function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):t.Masonry=e(t.Outlayer,t.getSize)
}(window);

/*****************************************************************
******             DISPLAY : CORE IMAGE LOADER              ******
*****************************************************************/

/* Setting standard function acting on different elements below */
(function() {
    function e(){}
    function t(e,t)
    {
        for(var n=e.length;n--;)if(e[n].listener===t)return n;
        return-1
    }
    function n(e) {
        return function() {
            return this[e].apply(this,arguments)
        }
    }
    var i=e.prototype,r=this,o=r.EventEmitter;
    i.getListeners=function(e) {
        var t,n,i=this._getEvents();
        if("object"==typeof e) {
            t={};
            for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])
        }
        else t=i[e]||(i[e]=[]);
        return t
    },
    i.flattenListeners=function(e) {
        var t,n=[];
        for(t=0;e.length>t;t+=1)n.push(e[t].listener);
        return n
    },
    i.getListenersAsObject=function(e) {
        var t,n=this.getListeners(e);
        return n instanceof Array&&(t={},t[e]=n),t||n
    },
    i.addListener=function(e,n) {
        var i,r=this.getListenersAsObject(e),o="object"==typeof n;
        for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n: {
            listener:n,once:!1
        });
        return this
    },
    i.on=n("addListener"),i.addOnceListener=function(e,t) {
        return this.addListener(e, {
            listener:t,once:!0
        })
    },
    i.once=n("addOnceListener"),i.defineEvent=function(e) {
        return this.getListeners(e),this 
    },
    i.defineEvents=function(e) {
        for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);
        return this
    },
    i.removeListener=function(e,n) {
        var i,r,o=this.getListenersAsObject(e);
        for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));
        return this
    },
    i.off=n("removeListener"),i.addListeners=function(e,t) {
        return this.manipulateListeners(!1,e,t)
    },
    i.removeListeners=function(e,t) {
        return this.manipulateListeners(!0,e,t)
    },
    i.manipulateListeners=function(e,t,n) {
        var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;
        if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);
        else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));
        return this
    },
    i.removeEvent=function(e) {
        var t,n=typeof e,i=this._getEvents();
        if("string"===n)delete i[e];
        else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];
        else delete this._events;
        return this
    },
    i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t) {
        var n,i,r,o,s=this.getListenersAsObject(e);
        for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);
        return this
    },
    i.trigger=n("emitEvent"),i.emit=function(e) {
        var t=Array.prototype.slice.call(arguments,1);
        return this.emitEvent(e,t)
    },
    i.setOnceReturnValue=function(e) {
        return this._onceReturnValue=e,this
    },
    i._getOnceReturnValue=function() {
        return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0
    },
    i._getEvents=function() {
        return this._events||(this._events={})
    },
    e.noConflict=function() {
        return r.EventEmitter=o,e
    },
    "function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function() {
        return e
    })
    :"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e
})
.call(this),function(e) {
    function t(t) {
        var n=e.event;return n.target=n.target||n.srcElement||t,n
    }
    var n=document.documentElement,i=function(){};
    n.addEventListener?i=function(e,t,n) {
        e.addEventListener(t,n,!1)
    }
    :n.attachEvent&&(i=function(e,n,i) 
    {
        e[n+i]=i.handleEvent?function() {
            var n=t(e);
            i.handleEvent.call(i,n)
        }
        :function() {
            var n=t(e);i.call(e,n)
        },
        e.attachEvent("on"+n,e[n+i])
    });
    var r=function(){};
    n.removeEventListener?r=function(e,t,n) {
        e.removeEventListener(t,n,!1)
    }
    :n.detachEvent&&(r=function(e,t,n) {
        e.detachEvent("on"+t,e[t+n]);
        try{delete e[t+n]}catch(i) {
            e[t+n]=void 0
        }
    });
    var o= {
        bind:i,unbind:r
    };
    "function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o
}
(this),function(e,t) {
    "function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i) {
        return t(e,n,i)
    })
    :"object"==typeof exports?module.exports=t(e,require("eventEmitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)
}
(this,function(e,t,n) {
    function i(e,t) {
        for(var n in t)e[n]=t[n];
        return e
    }
    function r(e) {
        return"[object Array]"===d.call(e)
    }
    function o(e) {
        var t=[];
        if(r(e))t=e;
        else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);
        else t.push(e);
        return t
    }
    function s(e,t,n) {
        if(!(this instanceof s))return new s(e,t);
        "string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);
        var r=this;
        setTimeout(function() {
            r.check()
        })
    }
    function c(e) {
        this.img=e
    }
    function f(e) {
        this.src=e,v[e]=this
    }
    var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function() {
        this.images=[];
        for(var e=0,t=this.elements.length;t>e;e++) {
            var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);
            for(var i=n.querySelectorAll("img"),r=0,o=i.length;o>r;r++) {
                var s=i[r];
                this.addImage(s)
            }
        }
    },
    s.prototype.addImage=function(e) {
        var t=new c(e);
        this.images.push(t)
    },
    s.prototype.check=function() {
        function e(e,r) {
            return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0
        }
        var t=this,n=0,i=this.images.length;
        if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;
        for(var r=0;i>r;r++) {
            var o=this.images[r];
            o.on("confirm",e),o.check()
        }
    },
    s.prototype.progress=function(e) {
        this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;
        var t=this;setTimeout(function() {
            t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)
        })
    },
    s.prototype.complete=function() {
        var e=this.hasAnyBroken?"fail":"done";
        this.isComplete=!0;
        var t=this;setTimeout(function() {
            if(t.emit(e,t),t.emit("always",t),t.jqDeferred) {
                var n=t.hasAnyBroken?"reject":"resolve";
                t.jqDeferred[n](t)
            }
        })
    },
    a&&(a.fn.imagesLoaded=function(e,t) {
        var n=new s(this,e,t);
        return n.jqDeferred.promise(a(this))
    }),
    c.prototype=new t,c.prototype.check=function() {
        var e=v[this.img.src]||new f(this.img.src);
        if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;
        if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;
        e.on("confirm",function(e,n) {
            return t.confirm(e.isLoaded,n),!0
        }),
        e.check()
    },
    c.prototype.confirm=function(e,t) {
        this.isLoaded=e,this.emit("confirm",this,t)
    };
    var v={};
    return f.prototype=new t,f.prototype.check=function() {
        if(!this.isChecked) {
            var e=new Image;
            n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0
        }
    },
    f.prototype.handleEvent=function(e) {
        var t="on"+e.type;
        this[t]&&this[t](e)
    },
    f.prototype.onload=function(e) {
        this.confirm(!0,"onload"),this.unbindProxyEvents(e)
    },
    f.prototype.onerror=function(e) {
        this.confirm(!1,"onerror"),this.unbindProxyEvents(e)
    },
    f.prototype.confirm=function(e,t) {
        this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)
    },
    f.prototype.unbindProxyEvents=function(e) {
        n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)
    },
    s
});

/*****************************************************************
******          INITIALIZER : CORE READY FUNCTIONS          ******
*****************************************************************/

/* Setting standard function acting on different elements below */
(function(a) {
    function l() {
        var a=window.outerWidth||b.clientWidth;b.className=b.className.replace(/ (w|lt)-\d+/g,""),f("w-"+Math.round(a/100)*100),h(c.screens,function(b) {
            a<=b&&f("lt-"+b)
        }),
        i.feature()
    }
    function h(a,b) {
        for(var c=0,d=a.length;c<d;c++)b.call(a,a[c],c)
    }
    function g(a) {
        var c=new RegExp("\\b"+a+"\\b");b.className=b.className.replace(c,"")
    }
    function f(a) {
        d[d.length]=a
    }
    var b=a.documentElement,c= {
        screens:[320,480,640,768,1024,1280,1440,1680,1920],section:"-section",page:"-page",head:"head"
    },
    d=[];
    if(window.head_conf)for(var e in head_conf)head_conf[e]!==undefined&&(c[e]=head_conf[e]);
    var i=window[c.head]=function() {
        i.ready.apply(null,arguments)
    };
    i.feature=function(a,c,e) 
    {
        if(!a)b.className+=" "+d.join(" "),d=[];
        else {
            Object.prototype.toString.call(c)=="[object Function]"&&(c=c.call()),f((c?"":"no-")+a),i[a]=!!c,e||(g("no-"+a),g(a),i.feature());
            return i
        }
    };
    var j=navigator.userAgent.toLowerCase();
    j=/(webkit)[ \/]([\w.]+)/.exec(j)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(j)||/(msie) ([\w.]+)/.exec(j)||!/compatible/.test(j)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(j)||[],j[1]=="msie"&&(j[1]="ie",j[2]=document.documentMode||j[2]),f(j[1]),i.browser= {
        version:j[2]
    },
    i.browser[j[1]]=!0;
    if(i.browser.ie)
    {
        f("ie"+parseFloat(j[2]));
        for(var k=3;k<11;k++)parseFloat(j[2])<k&&f("lt-ie"+k);
        h("abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video".split("|"),function(b)
        {
            a.createElement(b)
        })
    }
    h(location.pathname.split("http://phoenixia-prods.com/"),function(a,d) {
        if(this.length>2&&this[d+1]!==undefined)d&&f(this.slice(1,d+1).join("-")+c.section);
        else
        {
            var e=a||"index",g=e.indexOf(".");
            g>0&&(e=e.substring(0,g)),b.id=e+c.page,d||f("root"+c.section)
        }
    }),
    l(),window.onresize=l,i.feature("js",!0).feature()
})
(document),function() {
    function h(a) {
        var b=a.charAt(0).toUpperCase()+a.substr(1),c=(a+" "+d.join(b+" ")+b).split(" ");
        return!!g(c)
    }
    function g(a) {
        for(var c in a)if(b[a[c]]!==undefined)return!0
    }
    var a=document.createElement("i"),b=a.style,c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="Webkit Moz O ms Khtml".split(" "),e=window.head_conf&&head_conf.head||"head",f=window[e],i= {
        gradient:function() {
            var a="background-image:",d="gradient(linear,left top,right bottom,from(#9f9),to(#fff));",e="linear-gradient(left top,#eee,#fff);";
            b.cssText=(a+c.join(d+a)+c.join(e+a)).slice(0,-a.length);
            return!!b.backgroundImage
        },
        rgba:function() {
            b.cssText="background-color:rgba(0,0,0,0.5)";
            return!!b.backgroundColor
        },
        opacity:function() {
            return a.style.opacity===""
        },
        textshadow:function() {
            return b.textShadow===""
        },
        multiplebgs:function() {
            b.cssText="background:url(//:),url(//:),red url(//:)";
            return(new RegExp("(url\\s*\\(.*?){3}")).test(b.background)
        },
        boxshadow:function() {
            return h("boxShadow")
        },
        borderimage:function() {
            return h("borderImage")
        },
        borderradius:function() {
            return h("borderRadius")
        },
        cssreflections:function() {
            return h("boxReflect")
        },
        csstransforms:function() {
            return h("transform")
        },
        csstransitions:function() {
            return h("transition")
        },
        fontface:function() {
            var a=navigator.userAgent,b;
            if(0)return!0;
            if(b=a.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/))return b[1]>="4.0.249.4"||1*b[1].split(".")[0]>5;
            if((b=a.match(/Safari\/(\d+\.\d+)/))&&!/iPhone/.test(a))return b[1]>="525.13";
            if(/Opera/.test({}.toString.call(window.opera)))return opera.version()>="10.00";
            if(b=a.match(/rv:(\d+\.\d+\.\d+)[^b].*Gecko\//))return b[1]>="1.9.1";
            return!1
        }
    };
    for(var j in i)i[j]&&f.feature(j,i[j].call(),!0);
    f.feature()
}(),
function(a) {
    function z() {
        d||(d=!0,s(e,function(a) {
            p(a)
        }))
    }
    function y(c,d) {
        var e=a.createElement("script");
        e.type="text/"+(c.type||"javascript"),e.src=c.src||c,e.async=!1,e.onreadystatechange=e.onload=function() {
            var a=e.readyState;
            !d.done&&(!a||/loaded|complete/.test(a))&&(d.done=!0,d())
        },
        (a.body||b).appendChild(e)
    }
    function x(a,b) {
        if(a.state==o)return b&&b();
        if(a.state==n)return k.ready(a.name,b);
        if(a.state==m)return a.onpreload.push(function() {
            x(a,b)
        });
        a.state=n,y(a.url,function() {
            a.state=o,b&&b(),s(g[a.name],function(a) {
                p(a)
            }),
            u()&&d&&s(g.ALL,function(a){p(a)})
        })
    }
    function w(a,b) {
        a.state===undefined&&(a.state=m,a.onpreload=[],y( {
            src:a.url,type:"cache"
        },
        function() {
            v(a)
        }))
    }
    function v(a) {
        a.state=l,s(a.onpreload,function(a) {
            a.call()
        })
    }
    function u(a) {
        a=a||h;
        var b;
        for(var c in a) {
            if(a.hasOwnProperty(c)&&a[c].state!=o)return!1;b=!0
        }
        return b
    }
    function t(a) {
        return Object.prototype.toString.call(a)=="[object Function]"
    }
    function s(a,b) {
        if(!!a) {
            typeof a=="object"&&(a=[].slice.call(a));
            for(var c=0;c<a.length;c++)b.call(a,a[c],c)
        }
    }
    function r(a) {
        var b;
        if(typeof a=="object")for(var c in a)a[c]&&(b= {
            name:c,url:a[c]
        });
        else b= {
            name:q(a),url:a
        };
        var d=h[b.name];
        if(d&&d.url===b.url)return d;
        h[b.name]=b;
        return b
    }
    function q(a) {
        var b=a.split("https://phoenixia-prods.com/"),c=b[b.length-1],d=c.indexOf("?");
        return d!=-1?c.substring(0,d):c
    }
    function p(a) {
        a._done||(a(),a._done=1)
    }
    var b=a.documentElement,c,d,e=[],f=[],g={},h={},i=a.createElement("script").async===!0||"MozAppearance"in a.documentElement.style||window.opera,j=window.head_conf&&head_conf.head||"head",k=window[j]=window[j]||function() {
        k.ready.apply(null,arguments)
    },
    l=1,m=2,n=3,o=4;
    i?k.js=function() {
        var a=arguments,b=a[a.length-1],c={};
        t(b)||(b=null),s(a,function(d,e) {
            d!=b&&(d=r(d),c[d.name]=d,x(d,b&&e==a.length-2?function() {
                u(c)&&p(b)
            }
            :null))
        });
        return k
    }
    :k.js=function() {
        var a=arguments,b=[].slice.call(a,1),d=b[0];
        if(!c) {
            f.push(function() {
                k.js.apply(null,a)
            });
            return k
        }
        d?(s(b,function(a) {
            t(a)||w(r(a))
        }),
        x(r(a[0]),t(d)?d:function() {
            k.js.apply(null,b)
        }))
        :x(r(a[0]));
        return k
    },
    k.ready=function(b,c) {
        if(b==a) {
            d?p(c):e.push(c);
            return k
        }
        t(b)&&(c=b,b="ALL");
        if(typeof b!="string"||!t(c))return k;
        var f=h[b];
        if(f&&f.state==o||b=="ALL"&&u()&&d) {
            p(c);
            return k
        }
        var i=g[b];
        i?i.push(c):i=g[b]=[c];
        return k
    },
    k.ready(a,function() {
        u()&&s(g.ALL,function(a) {
            p(a)
        }),
        k.feature&&k.feature("domloaded",!0)
    });
    if(window.addEventListener)a.addEventListener("DOMContentLoaded",z,!1),window.addEventListener("load",z,!1);
    else if(window.attachEvent) {
        a.attachEvent("onreadystatechange",function() {
            a.readyState==="complete"&&z()
        });
        var A=1;
        try {
            A=window.frameElement
        }
        catch(B){}!A&&b.doScroll&&function() {
            try {
                b.doScroll("left"),z()
            }
            catch(a) {
                setTimeout(arguments.callee,1);
                return
            }
        }(),
        window.attachEvent("onload",z)
    }
    !a.readyState&&a.addEventListener&&(a.readyState="loading",a.addEventListener("DOMContentLoaded",handler=function() {
        a.removeEventListener("DOMContentLoaded",handler,!1),a.readyState="complete"
    },
    !1)),setTimeout(function() {
        c=!0,s(f,function(a) {
            a()
        })
    },
    300)
}(document)

/*****************************************************************
******             GALLERY : CORE GRID GALLERY              ******
*****************************************************************/

/* Creating function elements */
;(function(window) {
	"use strict"; 
	var docElem = window.document.documentElement, transEndEventNames = {
		'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend'
	},
	transEndEventName = transEndEventNames[Modernizr.prefixed('transition')], support = {
		transitions : Modernizr.csstransitions, support3d : Modernizr.csstransforms3d
	};
	function setTransform(el, transformStr) {
		el.style.WebkitTransform = transformStr;
		el.style.msTransform = transformStr;
		el.style.transform = transformStr;
	}
	function getViewportW() {
		var client = docElem['clientWidth'], inner = window['innerWidth'];
		if(client < inner) return inner;
		else return client;
	}
	function extend(a, b) {
		for(var key in b) { 
			if(b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}
	function CBPGridGallery(el, options) {
		this.el = el;
		this.options = extend({}, this.options);
  		extend(this.options, options);
  		this._init();
	}
	CBPGridGallery.prototype.options = {};
	CBPGridGallery.prototype._init = function() {
/* Setting up main grid */
		this.grid = this.el.querySelector('section.grid-wrap > ul.grid');
/* Setting up main grid items */
		this.gridItems = [].slice.call(this.grid.querySelectorAll('li:not(.grid-sizer)'));
/* Setting up total items count */
		this.itemsCount = this.gridItems.length;
/* Setting up slideshow grid */
		this.slideshow = this.el.querySelector('section.slideshow > ul');
/* Setting up slideshow grid items */
		this.slideshowItems = [].slice.call(this.slideshow.children);
/* Setting up index of current slideshow item */
		this.current = -1;
/* Setting up slideshow control buttons */
		this.ctrlPrev = this.el.querySelector('section.slideshow > nav > span.nav-prev');
		this.ctrlNext = this.el.querySelector('section.slideshow > nav > span.nav-next');
		this.ctrlClose = this.el.querySelector('section.slideshow > nav > span.nav-close');
/* Initializing masonry grid */
		this._initMasonry();
/* Initializing events */
		this._initEvents();
	};
	CBPGridGallery.prototype._initMasonry = function() {
		var grid = this.grid;
		imagesLoaded(grid, function() {
			new Masonry(grid, {
                itemSelector: 'li', columnWidth: grid.querySelector('.grid-sizer')
			});
		});
	};
	CBPGridGallery.prototype._initEvents = function() {
        var self = this;
/* Opening slideshow when clicking the main grid items */
		this.gridItems.forEach( function(item, idx) {
			item.addEventListener('click', function() {
				self._openSlideshow(idx);
			} );
        } );
/* Slideshow controls */
		this.ctrlPrev.addEventListener('click', function() { 
            self._navigate('prev'); 
        });
		this.ctrlNext.addEventListener('click', function() { 
            self._navigate('next'); 
        });
		this.ctrlClose.addEventListener('click', function() { 
            self._closeSlideshow(); 
        });
/* Resizing window */
		window.addEventListener('resize', function() { 
            self._resizeHandler(); 
        });
/* Keyboard navigation events */
		document.addEventListener('keydown', function(ev) {
			if (self.isSlideshowVisible) {
				var keyCode = ev.keyCode || ev.which;
				switch (keyCode) {
					case 37:
						self._navigate('prev');
						break;
					case 39:
						self._navigate('next');
						break;
					case 27:
						self._closeSlideshow();
						break;
				}
			}
        } );
/* Prevneting from scrolling when slideshow is visible */
		window.addEventListener('scroll', function() {
			if (self.isSlideshowVisible) {
				window.scrollTo( self.scrollPosition ? self.scrollPosition.x : 0, self.scrollPosition ? self.scrollPosition.y : 0 );
			}
			else {
				self.scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
			}
		});
	};
	CBPGridGallery.prototype._openSlideshow = function(pos) {
		this.isSlideshowVisible = true;
		this.current = pos;
		classie.addClass( this.el, 'slideshow-open');
/* Positioning slideshow items with setting up viewport items */
		this._setViewportItems();
		classie.addClass( this.currentItem, 'current');
		classie.addClass( this.currentItem, 'show');
		if(this.prevItem) {
			classie.addClass(this.prevItem, 'show');
			var translateVal = Number(-1 * ( getViewportW() / 2 + this.prevItem.offsetWidth / 2));
			setTransform( this.prevItem, support.support3d ? 'translate3d(' + translateVal + 'px, 0, -150px)' : 'translate(' + translateVal + 'px)' );
		}
		if(this.nextItem) {
			classie.addClass(this.nextItem, 'show');
			var translateVal = Number(getViewportW() / 2 + this.nextItem.offsetWidth / 2);
			setTransform(this.nextItem, support.support3d ? 'translate3d(' + translateVal + 'px, 0, -150px)' : 'translate(' + translateVal + 'px)' );
		}
	};
	CBPGridGallery.prototype._navigate = function(dir) {
		if(this.isAnimating) return;
		if(dir === 'next' && this.current === this.itemsCount - 1 ||  dir === 'prev' && this.current === 0 ) {
			this._closeSlideshow();
			return;
		}
        this.isAnimating = true;
/* Resetting viewport items */
		this._setViewportItems();
		var self = this,
            itemWidth = this.currentItem.offsetWidth,
/* Positionning current and centered items on both sides */
			transformLeftStr = support.support3d ? 'translate3d(-' + Number(getViewportW() / 2 + itemWidth / 2) + 'px, 0, -150px)' : 'translate(-' + Number( getViewportW() / 2 + itemWidth / 2) + 'px)',
			transformRightStr = support.support3d ? 'translate3d(' + Number(getViewportW() / 2 + itemWidth / 2) + 'px, 0, -150px)' : 'translate(' + Number( getViewportW() / 2 + itemWidth / 2) + 'px)',
			transformCenterStr = '', transformOutStr, transformIncomingStr,
			incomingItem;
		if(dir === 'next') {
			transformOutStr = support.support3d ? 'translate3d( -' + Number((getViewportW() * 2) / 2 + itemWidth / 2) + 'px, 0, -150px )' : 'translate(-' + Number( (getViewportW() * 2) / 2 + itemWidth / 2) + 'px)';
			transformIncomingStr = support.support3d ? 'translate3d( ' + Number((getViewportW() * 2) / 2 + itemWidth / 2) + 'px, 0, -150px )' : 'translate(' + Number( (getViewportW() * 2) / 2 + itemWidth / 2) + 'px)';
		}
		else {
			transformOutStr = support.support3d ? 'translate3d( ' + Number((getViewportW() * 2) / 2 + itemWidth / 2) + 'px, 0, -150px )' : 'translate(' + Number( (getViewportW() * 2) / 2 + itemWidth / 2) + 'px)';
			transformIncomingStr = support.support3d ? 'translate3d( -' + Number((getViewportW() * 2) / 2 + itemWidth / 2) + 'px, 0, -150px )' : 'translate(-' + Number( (getViewportW() * 2) / 2 + itemWidth / 2) + 'px)';
        }
/* Removing class animatable from slideshow grid if it already has */
		classie.removeClass( self.slideshow, 'animatable');
		if(dir === 'next' && this.current < this.itemsCount - 2 || dir === 'prev' && this.current > 1) {
/* On incoming item */
			incomingItem = this.slideshowItems[dir === 'next' ? this.current + 2 : this.current - 2];
			setTransform(incomingItem, transformIncomingStr);
			classie.addClass(incomingItem, 'show');
		}
		var slide = function() {
/* Adding class animatable to slideshow grid */
			classie.addClass(self.slideshow, 'animatable');
/* Setting up overlays */
			classie.removeClass(self.currentItem, 'current');
			var nextCurrent = dir === 'next' ? self.nextItem : self.prevItem;
			classie.addClass( nextCurrent, 'current');
			setTransform(self.currentItem, dir === 'next' ? transformLeftStr : transformRightStr);
			if(self.nextItem) {
				setTransform(self.nextItem, dir === 'next' ? transformCenterStr : transformOutStr);
			}
			if(self.prevItem) {
				setTransform(self.prevItem, dir === 'next' ? transformOutStr : transformCenterStr);
			}
			if(incomingItem) {
				setTransform(incomingItem, dir === 'next' ? transformRightStr : transformLeftStr);
			}
			var onEndTransitionFn = function(ev) {
				if(support.transitions) {
					if(ev.propertyName.indexOf('transform') === -1) return false;
					this.removeEventListener(transEndEventName, onEndTransitionFn);
				}
				if(self.prevItem && dir === 'next') {
					classie.removeClass( self.prevItem, 'show');
				}
				else if(self.nextItem && dir === 'prev') {
					classie.removeClass( self.nextItem, 'show');
				}
				if( dir === 'next') {
					self.prevItem = self.currentItem;
					self.currentItem = self.nextItem;
					if(incomingItem) {
						self.nextItem = incomingItem;
					}
				}
				else {
					self.nextItem = self.currentItem;
					self.currentItem = self.prevItem;
					if(incomingItem) {
						self.prevItem = incomingItem;
					}
				}
				self.current = dir === 'next' ? self.current + 1 : self.current - 1;
				self.isAnimating = false;
			};
			if(support.transitions) {
				self.currentItem.addEventListener(transEndEventName, onEndTransitionFn);
			}
			else {
				onEndTransitionFn();
			}
		};
		setTimeout(slide, 25);
	}
	CBPGridGallery.prototype._closeSlideshow = function(pos) {        
/* Removing class slideshow-open from grid gallery element */
        classie.removeClass(this.el, 'slideshow-open');
/* Removing class animatable from the slideshow grid */
		// remove class animatable from the slideshow grid
		classie.removeClass(this.slideshow, 'animatable');
		var self = this,
			onEndTransitionFn = function(ev) {
				if(support.transitions) {
					if(ev.target.tagName.toLowerCase() !== 'ul') return;
					this.removeEventListener(transEndEventName, onEndTransitionFn);
                }
/* Removing classes show and current from slideshow items */
				classie.removeClass(self.currentItem, 'current');
				classie.removeClass(self.currentItem, 'show');
				if(self.prevItem) {
					classie.removeClass(self.prevItem, 'show');
				}
				if(self.nextItem) {
					classie.removeClass(self.nextItem, 'show');
                }
/* Resseting also any transforms for all the items */
                self.slideshowItems.forEach( function( item ) { 
                    setTransform( item, ''); 
                });
				self.isSlideshowVisible = false;
			};
		if(support.transitions) {
			this.el.addEventListener(transEndEventName, onEndTransitionFn);
		}
		else {
			onEndTransitionFn();
		}        
	};
	CBPGridGallery.prototype._setViewportItems = function() {
		this.currentItem = null;
		this.prevItem = null;
		this.nextItem = null;
		if(this.current > 0) {
			this.prevItem = this.slideshowItems[this.current - 1];
		}
		if(this.current < this.itemsCount - 1) {
			this.nextItem = this.slideshowItems[this.current + 1];
		}
		this.currentItem = this.slideshowItems[this.current ];
	}
	CBPGridGallery.prototype._resizeHandler = function() {
		var self = this;
		function delayed() {
			self._resize();
			self._resizeTimeout = null;
		}
		if (this._resizeTimeout) {
			clearTimeout(this._resizeTimeout);
		}
		this._resizeTimeout = setTimeout(delayed, 50);
	}
	CBPGridGallery.prototype._resize = function() {
		if (this.isSlideshowVisible) {
/* Updating width value */
			if(this.prevItem) {
				var translateVal = Number(-1 * (getViewportW() / 2 + this.prevItem.offsetWidth / 2));
				setTransform(this.prevItem, support.support3d ? 'translate3d(' + translateVal + 'px, 0, -150px)' : 'translate(' + translateVal + 'px)');
			}
			if( this.nextItem ) {
				var translateVal = Number(getViewportW() / 2 + this.nextItem.offsetWidth / 2);
				setTransform(this.nextItem, support.support3d ? 'translate3d(' + translateVal + 'px, 0, -150px)' : 'translate(' + translateVal + 'px)');
			}
		}
    }
/* Adding to global namespace */
	window.CBPGridGallery = CBPGridGallery;
})(window);

/*****************************************************************
******               HISTORY : CORE NAVIGATION              ******
******         Author name : Benjamin Arthur Lupton         ******
*****************************************************************/

/* Caracters handling functions */
window.JSON||(window.JSON={}),
function(){
    function f(a){
        return a<10?"0"+a:a
    }
/* Replacing offending characters with safe escape sequences */
    function quote(a){
        return escapable.lastIndex=0,
        escapable.test(a)?'"'+a.replace(escapable,function(a){
            var b=meta[a];
            return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
        })
        +'"':'"'+a+'"'
    }
/* Producing string from holder [key] */
    function str(a,b){
        var c,d,e,f,g=gap,h,i=b[a];
/* Calling JSON to obtain replacement value else calling replacer function */
        i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));
        switch(typeof i){
            case"string":
                return quote(i);
            case"number": // JSON numbers must be infinite. Enconding noon-finite numbers as null.
                return isFinite(i)?String(i):"null";
            case"boolean": // Converting value to string of boolean or null
            case"null":
                return String(i);
            case"object": // Type of null is 'object' here
            if(!i)
            return"null";
/* Making array to hold partial results of stringifying the object value */
                gap+=indent,
                h=[];
                if(Object.prototype.toString.apply(i)==="[object Array]"){
                    f=i.length;
                    for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";
/* Joining elements separated by commas then wrapping them in brackets */                    
                    return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",
                    gap=g,
                    e
                }
/* Using replacer to select members to target if replacer is an array */
                if(rep&&typeof rep=="object"){
                    f=rep.length;
                    for(c=0;c<f;c+=1)d=rep[c],
                    typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))
                }
/* Otherwise iterating through all keys of the object */
                else 
                for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));
/* Joining elements separated by commas then wrapping them in braces */
                return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e
        }
    }
    "use strict",
    typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){
        return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
    },
    String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){
        return this.valueOf()
    });
    var JSON=window.JSON,
    cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
    meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},
    rep;
/* Giving method to stringify if JSON object doest not already have */    
    typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){
/* Taking value and optionals replacer and space parameter to return JSON text */        
        var d;gap="",
        indent="";
        if(typeof c=="number")
        for(d=0;d<c;d+=1)indent+=" ";
        else 
        typeof c=="string"&&(indent=c);
        rep=b;
        if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")
        return str("",{
            "":a
        });
/* Returning error if replacer is not a function or an array */
        throw new Error("JSON.stringify")
    }),
/* Giving method to parse if JSON object doest not already have */
    typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){
/* Taking text and optional reviver function to return JS value if text is a valid JSON text */        
        function walk(a,b){
            var c,d,e=a[b];
            if(e&&typeof e=="object")
            for(c in e)Object.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);
            return reviver.call(a,b,e)
        }
/* Parsing in 4 stages : Replacing unicode characters with escape sequences, running text against regular expression to fit JSON pattern, using eval function to copile the text into JS structure and finally recursively walk the structure for possible transormation */
        var j;
        text=String(text),
        cx.lastIndex=0,
        cx.test(text)&&(text=text.replace(cx,function(a){
            return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))
        return j=eval("("+text+")"),
        typeof reviver=="function"?walk({
            "":j
        },
        ""):j;
/* Returning error if text is not JSON parseable */
        throw new SyntaxError("JSON.parse")
    })
}(),
/* jQuery adapting function */
function(a,b){
    "use strict";
/* Localising globals */
    var c=a.History=a.History||{},
    d=a.jQuery;
/* Checking existence */
    if(typeof c.Adapter!="undefined")
    throw new Error("History.js Adapter has already been loaded...");
/* Adding adapter */
    c.Adapter={
        bind:function(a,b,c){
            d(a).bind(b,c)
        },
        trigger:function(a,b,c){
            d(a).trigger(b,c)
        },
        extractEventData:function(a,c,d){
            var e=c&&c.originalEvent&&c.originalEvent[a]||d&&d[a]||b;
            return e
        },
        onDomLoad:function(a){
            d(a)
        }
    },
/* Trying and initializing history */
typeof c.init!="undefined"&&c.init()
}(window),
/* Adding HTML4 support depending on the HTML5 support */
function(a,b){
    "use strict";
    var c=a.document,
    d=a.setTimeout||d,
    e=a.clearTimeout||e,
    f=a.setInterval||f,
    g=a.History=a.History||{};
/* Checking existence again */
    if(typeof g.initHtml4!="undefined")
    throw new Error("History.js HTML4 Support has already been loaded...");
/* Initializing HTML4 support */
    g.initHtml4=function(){
        if(typeof g.initHtml4.initialized!="undefined")
/* Already loaded */
        return!1;
        g.initHtml4.initialized=!0,
/* Checking if history is enabled */
        g.enabled=!0,
/* Storing hashes in an array */
        g.savedHashes=[],
/* Checking if the current hash is the last one */
        g.isLastHash=function(a){
            var b=g.getHashByIndex(),
            c;
            return c=a===b,c
        },
/* Pushing the hash */
        g.saveHash=function(a){
            return g.isLastHash(a)?!1:(g.savedHashes.push(a),!0)
        },
/* Getting a hash by index */
        g.getHashByIndex=function(a){
            var b=null;
            return typeof a=="undefined"?b=g.savedHashes[g.savedHashes.length-1]:a<0?b=g.savedHashes[g.savedHashes.length+a]:b=g.savedHashes[a],
            b
        },
/* Hashed array of discarded hashes */
        g.discardedHashes={},
/* Hashed array of discarded states */
        g.discardedStates={},
/* Discarding state by ignoring it through history */
        g.discardState=function(a,b,c){
            var d=g.getHashByState(a),
            e;
/* Creating discard object */
            return e={
                discardedState:a,
                backState:c,
                forwardState:b
            },
/* Adding the object to discarded states */
            g.discardedStates[d]=e,
            !0
        },
/* Same than state discarding applied to hash discarding */
        g.discardHash=function(a,b,c){
            var d={
                discardedHash:a,
                backState:c,
                forwardState:b
            };
            return g.discardedHashes[a]=d,
            !0
        },
/* Checking to see if state is discarded */
        g.discardedState=function(a){
            var b=g.getHashByState(a),
            c;
            return c=g.discardedStates[b]||!1,
            c
        },
/* Checking to see if hash is discarded */
        g.discardedHash=function(a){
            var b=g.discardedHashes[a]||!1;
            return b
        },
/* Allowing a discarded state to be used again */
        g.recycleState=function(a){
            var b=g.getHashByState(a);
            return g.discardedState(a)&&delete g.discardedStates[b],
            !0
        },
/* Emulating HTML4 support by manually checking hash changes */
        g.emulated.hashChange&&(g.hashChangeInit=function(){
/* Defining checker function and variables */
            g.checkerFunction=null;
            var b="",d,e,h,i;
/* Using iframe on IE to emulate back and forward buttons */
            return g.isInternetExplorer()?(d="historyjs-iframe",e=c.createElement("iframe"),e.setAttribute("id",d),e.style.display="none",c.body.appendChild(e),e.contentWindow.document.open(),e.contentWindow.document.close(),h="",i=!1,g.checkerFunction=function(){
                if(i)
                return!1;
                i=!0;
                var c=g.getHash()||"",
                d=g.unescapeHash(e.contentWindow.document.location.hash)||"";
                return c!==b?(b=c,d!==c&&(h=d=c,e.contentWindow.document.open(),e.contentWindow.document.close(),e.contentWindow.document.location.hash=g.escapeHash(c)),g.Adapter.trigger(a,"hashchange")):d!==h&&(h=d,g.setHash(d,!1)),i=!1,!0
            })
/* Defining checker function */
            :g.checkerFunction=function(){
                var c=g.getHash();
                return c!==b&&(b=c,g.Adapter.trigger(a,"hashchange")),
                !0
            },
            g.intervalList.push(f(g.checkerFunction,g.options.hashChangeInterval)),
            !0
        },
        g.Adapter.onDomLoad(g.hashChangeInit)),g.emulated.pushState&&(g.onHashChange=function(b){
            var d=b&&b.newURL||c.location.href,
            e=g.getHashByUrl(d),
            f=null,
            h=null,
            i=null,
            j;
            return g.isLastHash(e)?(g.busy(!1),!1):(g.doubleCheckComplete(),g.saveHash(e),e&&g.isTraditionalAnchor(e)?(g.Adapter.trigger(a,"anchorchange"),g.busy(!1),!1):(f=g.extractState(g.getFullUrl(e||c.location.href,!1),!0),g.isLastSavedState(f)?(g.busy(!1),!1):(h=g.getHashByState(f),j=g.discardedState(f),j?(g.getHashByIndex(-2)===g.getHashByState(j.forwardState)?g.back(!1):g.forward(!1),!1):(g.pushState(f.data,f.title,f.url,!1),!0))))
        },
        g.Adapter.bind(a,"hashchange",g.onHashChange),
/* Ensuring URL is fully encoded */
        g.pushState=function(b,d,e,f){
            if(g.getHashByUrl(e))
            throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
            if(f!==!1&&g.busy())
            return g.pushQueue({
                scope:g,
                callback:g.pushState,
                args:arguments,
                queue:f
            }),
            !1;
            g.busy(!0);
/* Fetching state object */
            var h=g.createStateObject(b,d,e),
            i=g.getHashByState(h),
            j=g.getState(!1),
            k=g.getHashByState(j),
            l=g.getHash();
/* Storing new state */
            return g.storeState(h),
            g.expectedStateId=h.id,
/* Recycling the state */
            g.recycleState(h),
/* Forcing title update */
            g.setTitle(h),
            i===k?(g.busy(!1),!1):i!==l&&i!==g.getShortUrl(c.location.href)?(g.setHash(i,!1),!1):(g.saveState(h),g.Adapter.trigger(a,"statechange"),g.busy(!1),!0)
        },
/* Replacing state and trigger on pop state */
        g.replaceState=function(a,b,c,d){
            if(g.getHashByUrl(c))
            throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
            if(d!==!1&&g.busy())
            return g.pushQueue({
                scope:g,
                callback:g.replaceState,
                args:arguments,
                queue:d
            }),
            !1;
            g.busy(!0);
            var e=g.createStateObject(a,b,c),
            f=g.getState(!1),
            h=g.getStateByIndex(-2);
            return g.discardState(f,e,h),
            g.pushState(e.data,e.title,e.url,!1),
            !0
        }),
        g.emulated.pushState&&g.getHash()&&!g.emulated.hashChange&&g.Adapter.onDomLoad(function(){
            g.Adapter.trigger(a,"hashchange")
        })
    },
    typeof g.init!="undefined"&&g.init()
}(window),
/* Initializing history core */
function(a,b){
    "use strict";
    var c=a.console||b,
    d=a.document,
    e=a.navigator,
    f=a.sessionStorage||!1,
    g=a.setTimeout,
    h=a.clearTimeout,
    i=a.setInterval,
    j=a.clearInterval,
    k=a.JSON,
    l=a.alert,
    m=a.History=a.History||{},
    n=a.history;
    k.stringify=k.stringify||k.encode,
    k.parse=k.parse||k.decode;
    if(typeof m.init!="undefined")
    throw new Error("History.js Core has already been loaded...");
/* Initializing through check status of adapter, core and HMTL4 support */    
    m.init=function(){
        return typeof m.Adapter=="undefined"?!1:(typeof m.initCore!="undefined"&&m.initCore(),typeof m.initHtml4!="undefined"&&m.initHtml4(),!0)
    },
/* Setting up history core options */
    m.initCore=function(){
        if(typeof m.initCore.initialized!="undefined")
        return!1;
        m.initCore.initialized=!0,
        m.options=m.options||{},
        m.options.hashChangeInterval=m.options.hashChangeInterval||100,
        m.options.safariPollInterval=m.options.safariPollInterval||500,
        m.options.doubleCheckInterval=m.options.doubleCheckInterval||500,
        m.options.storeInterval=m.options.storeInterval||1e3,
        m.options.busyDelay=m.options.busyDelay||250,
        m.options.debug=m.options.debug||!1,
        m.options.initialTitle=m.options.initialTitle||d.title,
        m.intervalList=[],
/* Clearing all set interval instances */
        m.clearAllIntervals=function(){
            var a,
            b=m.intervalList;
            if(typeof b!="undefined"&&b!==null){
                for(a=0;a<b.length;a++)j(b[a]);
                m.intervalList=null
            }
        },
/* Logging passed arguments if debug enables */
        m.debug=function(){
            (m.options.debug||!1)&&m.log.apply(m,arguments)
        },
/* Logging passed arguments */
        m.log=function(){
            var a=typeof c!="undefined"&&typeof c.log!="undefined"&&typeof c.log.apply!="undefined",
            b=d.getElementById("log"),
            e,f,g,h,i;
/* Writting to console */
            a?(h=Array.prototype.slice.call(arguments),
            e=h.shift(),
            typeof c.debug!="undefined"?c.debug.apply(c,[e,h]):c.log.apply(c,[e,h])):e="\n"+arguments[0]+"\n";
/* Writting to log */
            for(f=1,g=arguments.length;f<g;++f){
                i=arguments[f];
                if(typeof i=="object"&&typeof k!="undefined")
                try{
                    i=k.stringify(i)
                }
/* Recursive object */
                catch(j){}e+="\n"+i+"\n"
            }
            return b?(b.value+=e+"\n-----\n",b.scrollTop=b.scrollHeight-b.clientHeight):a||l(e),
            !0
        },
/* Getting the major version of IE */
        m.getInternetExplorerMajorVersion=function(){
            var a=m.getInternetExplorerMajorVersion.cached=typeof m.getInternetExplorerMajorVersion.cached!="undefined"?m.getInternetExplorerMajorVersion.cached:function(){
                var a=3,
                b=d.createElement("div"),
                c=b.getElementsByTagName("i");
                while((b.innerHTML="<!--[if gt IE "+ ++a+"]><i></i><![endif]-->")&&c[0]);
                return a>4?a:!1
            }();
            return a
        },
/* Checking is using IE */
        m.isInternetExplorer=function(){
            var a=m.isInternetExplorer.cached=typeof m.isInternetExplorer.cached!="undefined"?m.isInternetExplorer.cached:Boolean(m.getInternetExplorerMajorVersion());
            return a
        },
/* Checking features needing to be emulated */
        m.emulated={
            pushState:!Boolean(a.history&&a.history.pushState&&a.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),
            hashChange:Boolean(!("onhashchange"in a||"onhashchange"in d)||m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8)
        },
/* Checking  if history is enabled */
        m.enabled=!m.emulated.pushState,
/* Checking for bugs based on browsers */
        m.bugs={
            setHash:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),safariPoll:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
            ieDoubleCheck:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8),
            hashEscape:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<7)
        },
/* Checking if object is empty */
        m.isEmptyObject=function(a){
            for(var b in a)
            return!1;
            return!0
        },
/* Cloning object and eliminating references of the original contexts */
        m.cloneObject=function(a){
            var b,c;
            return a?(b=k.stringify(a),c=k.parse(b)):c={},
            c
        },
/* Pretty URL method */
        m.getRootUrl=function(){
            var a=d.location.protocol+"//"+(d.location.hostname||d.location.host);
            if(d.location.port||!1)a+=":"+d.location.port;
            return a+="/",
            a
        },
/* Fetching "href" attribute element if it exists */
        m.getBaseHref=function(){
            var a=d.getElementsByTagName("base"),
            b=null,
            c="";
/* Testing for base element */
            return a.length===1&&(b=a[0],c=b.href.replace(/[^\/]+$/,"")),
/* Adjusting trailing slash */
            c=c.replace(/\/+$/,""),
            c&&(c+="/"),
            c
        },
/* Fetching href base or root URL */
        m.getBaseUrl=function(){
            var a=m.getBaseHref()||m.getBasePageUrl()||m.getRootUrl();
            return a
        },
/* Fetching URL of current page */
        m.getPageUrl=function(){
            var a=m.getState(!1,!1),
            b=(a||{}).url||d.location.href,
            c;
            return c=b.replace(/\/+$/,"").replace(/[^\/]+$/,function(a,b,c){
                return/\./.test(a)?a:a+"/"
            }),
            c
        },
/* Fetching URL of the directory of current page */
        m.getBasePageUrl=function(){
            var a=d.location.href.replace(/[#\?].*/,"").replace(/[^\/]+$/,function(a,b,c){
                return/[^\/]$/.test(a)?"":a
            })
            .replace(/\/+$/,"")+"/";
            return a
        },
/* Ensuring to have an absolute URL, not a relative one */
        m.getFullUrl=function(a,b){
            var c=a,
            d=a.substring(0,1);
            return b=typeof b=="undefined"?!0:b,
            /[a-z]+\:\/\//.test(a)||(d==="/"?c=m.getRootUrl()+a.replace(/^\/+/,""):d==="#"?c=m.getPageUrl().replace(/#.*/,"")+a:d==="?"?c=m.getPageUrl().replace(/[\?#].*/,"")+a:b?c=m.getBaseUrl()+a.replace(/^(\.\/)+/,""):c=m.getBasePageUrl()+a.replace(/^(\.\/)+/,"")),
            c.replace(/\#$/,"")
        },
/* Ensuring we have relative URL and not absolute one */
        m.getShortUrl=function(a){
            var b=a,
            c=m.getBaseUrl(),
            d=m.getRootUrl();
            return m.emulated.pushState&&(b=b.replace(c,"")),
            b=b.replace(d,"/"),
/* Ensuring we can still detect it as a state */
            m.isTraditionalAnchor(b)&&(b="./"+b),
/* Cleaning URL */
            b=b.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),
            b
        },
/* Storing specific session data */
        m.store={},
        m.idToState=m.idToState||{},
        m.stateToId=m.stateToId||{},
        m.urlToId=m.urlToId||{},
        m.storedStates=m.storedStates||[],
        m.savedStates=m.savedStates||[],
        m.normalizeStore=function(){
            m.store.idToState=m.store.idToState||{},
            m.store.urlToId=m.store.urlToId||{},
            m.store.stateToId=m.store.stateToId||{}
        },
/* Getting object ocntaining the data, title and URL of current state */
        m.getState=function(a,b){
            typeof a=="undefined"&&(a=!0),
            typeof b=="undefined"&&(b=!0);
            var c=m.getLastSavedState();
            return!c&&b&&(c=m.createStateObject()),
            a&&(c=m.cloneObject(c),c.url=c.cleanUrl||c.url),
            c
        },
/* Getting an ID for a state */
        m.getIdByState=function(a){
            var b=m.extractId(a.url),
            c;
            if(!b){
/* Finding ID via state string */
                c=m.getStateString(a);
                if(typeof m.stateToId[c]!="undefined")b=m.stateToId[c];
                else 
                if(typeof m.store.stateToId[c]!="undefined")b=m.store.stateToId[c];
                else{
/* Generating new ID */
                    for(;;){
                        b=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");
                        if(typeof m.idToState[b]=="undefined"&&typeof m.store.idToState[b]=="undefined")
                        break
                    }
/* Applying new state to the ID */
                    m.stateToId[c]=b,
                    m.idToState[b]=a
                }
            }
            return b
        },
/* Expanding state object */
        m.normalizeState=function(a){
            var b,c;
            if(!a||typeof a!="object")a={};
            if(typeof a.normalized!="undefined")
            return a;
            if(!a.data||typeof a.data!="object")a.data={};
/* Creating */
            b={},
            b.normalized=!0,
            b.title=a.title||"",
            b.url=m.getFullUrl(m.unescapeString(a.url||d.location.href)),
            b.hash=m.getShortUrl(b.url),
            b.data=m.cloneObject(a.data),
/* Fetching ID */
            b.id=m.getIdByState(b),
/* Cleaning URL */
            b.cleanUrl=b.url.replace(/\??\&_suid.*/,""),
            b.url=b.cleanUrl,
/* Checking for alternative URLs */
            c=!m.isEmptyObject(b.data);
/* Applying values */
            if(b.title||c)b.hash=m.getShortUrl(b.url).replace(/\??\&_suid.*/,""),
            /\?/.test(b.hash)||(b.hash+="?"),
            b.hash+="&_suid="+b.id;
            return b.hashedUrl=m.getFullUrl(b.hash),
/* Updating URL in case of duplicate */
            (m.emulated.pushState||m.bugs.safariPoll)&&m.hasUrlDuplicate(b)&&(b.url=b.hashedUrl),
            b
        },
/* Creating object based on the data, title and URL state parameters */
        m.createStateObject=function(a,b,c){
            var d={
                data:a,
                title:b,
                url:c
            };
            return d=m.normalizeState(d),
            d
        },
/* Getting state by its ID */
        m.getStateById=function(a){
            a=String(a);
            var c=m.idToState[a]||m.store.idToState[a]||b;
            return c
        },
/* Getting a state's string */
        m.getStateString=function(a){
            var b,c,d;
            return b=m.normalizeState(a),
            c={
                data:b.data,
                title:a.title,
                url:a.url
            },
            d=k.stringify(c),
            d
        },
/* Getting a state's ID */
        m.getStateId=function(a){
            var b,c;
            return b=m.normalizeState(a),
            c=b.id,
            c
        },
/* Creating hash for the state object */
        m.getHashByState=function(a){
            var b,c;
            return b=m.normalizeState(a),
            c=b.hash,
            c
        },
/* Getting state ID by it's URL or hash */
        m.extractId=function(a){
            var b,c,d;
            return c=/(.*)\&_suid=([0-9]+)$/.exec(a),
            d=c?c[1]||a:a,
            b=c?String(c[2]||""):"",
            b||!1
        },
/* Checking to see if URL is traditional anchor */
        m.isTraditionalAnchor=function(a){
            var b=!/[\/\?\.]/.test(a);
            return b
        },
/* Getting state by it's URL or hash */
        m.extractState=function(a,b){
            var c=null,d,e;
            return b=b||!1,
/* Fetching SUID */
            d=m.extractId(a),
            d&&(c=m.getStateById(d)),
            c||(e=m.getFullUrl(a),d=m.getIdByUrl(e)||!1,d&&(c=m.getStateById(d)),!c&&b&&!m.isTraditionalAnchor(a)&&(c=m.createStateObject(null,null,e))),
            c
        },
/* Getting state ID by a state URL */
        m.getIdByUrl=function(a){
            var c=m.urlToId[a]||m.store.urlToId[a]||b;
            return c
        },
/* Getting an object containing the data, title and URL of current state */
        m.getLastSavedState=function(){
            return m.savedStates[m.savedStates.length-1]||b
        },
        m.getLastStoredState=function(){
            return m.storedStates[m.storedStates.length-1]||b
        },
/* Checking if URL will have hash conflict */
        m.hasUrlDuplicate=function(a){
            var b=!1,c;
            return c=m.extractState(a.url),
            b=c&&c.id!==a.id,
            b
        },
/* Storing a state */
        m.storeState=function(a){
            return m.urlToId[a.url]=a.id,
            m.storedStates.push(m.cloneObject(a)),
            a
        },
/* Testing to see if the state is the last one */
        m.isLastSavedState=function(a){
            var b=!1,c,d,e;
            return m.savedStates.length&&(c=a.id,d=m.getLastSavedState(),e=d.id,b=c===e),
            b
        },
/* Pushing a state */
        m.saveState=function(a){
            return m.isLastSavedState(a)?!1:(m.savedStates.push(m.cloneObject(a)),!0)
        },
/* Getting a state by the index */
        m.getStateByIndex=function(a){
            var b=null;
            return typeof a=="undefined"?b=m.savedStates[m.savedStates.length-1]:a<0?b=m.savedStates[m.savedStates.length+a]:b=m.savedStates[a],
            b
        },
/* Getting current document hash */
        m.getHash=function(){
            var a=m.unescapeHash(d.location.hash);
            return a
        },
/* Normalizing and unescaping a hash */
        m.unescapeString=function(b){
            var c=b,d;
            for(;;){
                d=a.unescape(c);
                if(d===c)
                break;
                c=d
            }
            return c
        },
        m.unescapeHash=function(a){
            var b=m.normalizeHash(a);
            return b=m.unescapeString(b),
            b
        },
/* Normalizing a hash across browsers */
        m.normalizeHash=function(a){
            var b=a.replace(/[^#]*#/,"").replace(/#.*/,"");
            return b
        },
/* Setting document hash */
        m.setHash=function(a,b){
            var c,e,f;
/* Handling queueing */
            return b!==!1&&m.busy()?(m.pushQueue({
                scope:m,
                callback:m.setHash,
                args:arguments,
                queue:b
            }),
/* Make busy, continue then checking is hash is a state before pushing */
            !1):(c=m.escapeHash(a),m.busy(!0),e=m.extractState(a,!0),e&&!m.emulated.pushState?m.pushState(e.data,e.title,e.url,!1):d.location.hash!==c&&(m.bugs.setHash?(f=m.getPageUrl(),m.pushState(null,null,f+"#"+c,!1)):d.location.hash=c),m)
        },
/* Normalizing and escaping a hash */
        m.escapeHash=function(b){
            var c=m.normalizeHash(b);
            return c=a.escape(c),
/* Fixing IE bug through common parts restore */
            m.bugs.hashEscape||(c=c.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),
            c
        },
/* Extracting hash from URL */
        m.getHashByUrl=function(a){
            var b=String(a).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");
            return b=m.unescapeHash(b),
            b
        },
/* Applying title to document */
        m.setTitle=function(a){
            var b=a.title,c;
            b||(c=m.getStateByIndex(0),c&&c.url===a.url&&(b=c.title||m.options.initialTitle));
            try{
                d.getElementsByTagName("title")[0].innerHTML=b.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")
            }
            catch(e){}
            return d.title=b,
            m
        },
/* First in first out queues list */
        m.queues=[],
        m.busy=function(a){
            typeof a!="undefined"?m.busy.flag=a:typeof m.busy.flag=="undefined"&&(m.busy.flag=!1);
            if(!m.busy.flag){
                h(m.busy.timeout);
                var b=function(){
                    var a,c,d;
                    if(m.busy.flag)
                    return;
                    for(a=m.queues.length-1;a>=0;--a){
                        c=m.queues[a];
                        if(c.length===0)
                        continue;
                        d=c.shift(),
                        m.fireQueueItem(d),
                        m.busy.timeout=g(b,m.options.busyDelay)
                    }
                };
                m.busy.timeout=g(b,m.options.busyDelay)
            }
            return m.busy.flag
        },
        m.busy.flag=!1,
/* Firing queued item */
        m.fireQueueItem=function(a){
            return a.callback.apply(a.scope||m,a.args||[])
        },
/* Adding item to queue */
        m.pushQueue=function(a){
            return m.queues[a.queue||0]=m.queues[a.queue||0]||[],
            m.queues[a.queue||0].push(a),
            m
        },
/* Defining if item need to be fired if not busy or added to queue */
        m.queue=function(a,b){
            return typeof a=="function"&&(a={
                callback:a
            }),
            typeof b!="undefined"&&(a.queue=b),
/* Handling */
            m.busy()?m.pushQueue(a):m.fireQueueItem(a),
            m
        },
/* Clearing the queue */
        m.clearQueue=function(){
            return m.busy.flag=!1,
            m.queues=[],
            m
        },
/* States if state has changed since last double check */
        m.stateChanged=!1,
        m.doubleChecker=!1,
/* Completing a double check */
        m.doubleCheckComplete=function(){
            return m.stateChanged=!0,
            m.doubleCheckClear(),
            m
        },
/* Clearing a double check */
        m.doubleCheckClear=function(){
            return m.doubleChecker&&(h(m.doubleChecker),m.doubleChecker=!1),
            m
        },
/* Creating a double check */
        m.doubleCheck=function(a){
/* Resetting */
            return m.stateChanged=!1,
            m.doubleCheckClear(),
/* Fixing for IE and Safari where calling history not actually changing */
            m.bugs.ieDoubleCheck&&(m.doubleChecker=g(function(){
                return m.doubleCheckClear(),
                m.stateChanged||a(),
                !0
            },
            m.options.doubleCheckInterval)),
            m
        },
/* Polling the current state */
        m.safariStatePoll=function(){
/* Getting last state which has the new URL */
            var b=m.extractState(d.location.href),c;
/* Checking for a difference */
            if(!m.isLastSavedState(b))c=b;
            else 
            return;
/* Checking if new state with the URL, if not, creating it then apply */
            return c||(c=m.createStateObject()),m.Adapter.trigger(a,"popstate"),
            m
        },
/* Sending the browser history back one item */
        m.back=function(a){
            return a!==!1&&m.busy()?(m.pushQueue({
                scope:m,
                callback:m.back,
                args:arguments,
                queue:a
            }),
            !1):(m.busy(!0),m.doubleCheck(function(){
                m.back(!1)
            }),
            n.go(-1),
            !0)
        },
/* Sending browser history forward one item */
        m.forward=function(a){
            return a!==!1&&m.busy()?(m.pushQueue({
                scope:m,
                callback:m.forward,
                args:arguments,
                queue:a
            }),
            !1):(m.busy(!0),m.doubleCheck(function(){
                m.forward(!1)
            }),
            n.go(1),!0)
        },
/* Sending the browser history back or forward index times */
        m.go=function(a,b){
            var c;
/* Handling */
            if(a>0)
            for(c=1;c<=a;++c)m.forward(b);
            else{
/* Backward */
                if(!(a<0))
                throw new Error("History.go: History.go requires a positive or negative integer passed.");
                for(c=-1;c>=a;--c)m.back(b)
            }
/* Chaining */
            return m
        };
/* Adding HMTL5 non native push state implementation */
        if(m.emulated.pushState){
/* Providing skeleton for HTML4 browsers */
            var o=function(){};
            m.pushState=m.pushState||o,
            m.replaceState=m.replaceState||o
        }
/* Using native HMTL5 history API implementation */
        else 
/* Refreshing current state */
        m.onPopState=function(b,c){
            var e=!1,f=!1,g,h;
/* Resetting double check */
            return m.doubleCheckComplete(),
/* Checking for hash */
            g=m.getHash(),
/* Expadning it, then parsing, storing and updating */
            g?(h=m.extractState(g||d.location.href,!0),h?m.replaceState(h.data,h.title,h.url,!1):(m.Adapter.trigger(a,"anchorchange"),m.busy(!1)),m.expectedStateId=!1,!1):(e=m.Adapter.extractEventData("state",b,c)||!1,e?f=m.getStateById(e):m.expectedStateId?f=m.getStateById(m.expectedStateId):f=m.extractState(d.location.href),f||(f=m.createStateObject(null,null,d.location.href)),m.expectedStateId=!1,m.isLastSavedState(f)?(m.busy(!1),!1):(m.storeState(f),m.saveState(f),m.setTitle(f),m.Adapter.trigger(a,"statechange"),m.busy(!1),!0))
        },
        m.Adapter.bind(a,"popstate",m.onPopState),
/* Adding new state to the history object then trigerrin on pop state */
        m.pushState=function(b,c,d,e){
            if(m.getHashByUrl(d)&&m.emulated.pushState)
            throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
/* Handling queueing */            
            if(e!==!1&&m.busy())
/* Waiting and pushing */ 
            return m.pushQueue({
                scope:m,
                callback:m.pushState,
                args:arguments,
                queue:e
            }),
            !1;
            m.busy(!0);
/* Creating new state */ 
            var f=m.createStateObject(b,c,d);
/* Checking, storing, pushing result then firing HTML5 event */
            return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.pushState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),
            !0
        },
/* Replacing state and trigger on pop state */ 
        m.replaceState=function(b,c,d,e){
            if(m.getHashByUrl(d)&&m.emulated.pushState)
            throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
            if(e!==!1&&m.busy())
            return m.pushQueue({
                scope:m,
                callback:m.replaceState,
                args:arguments,
                queue:e
            }),
            !1;
            m.busy(!0);
/* Creating new state */ 
            var f=m.createStateObject(b,c,d);
/* Checking, storing, pushing result then firing HTML4 event */
            return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.replaceState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),
            !0
        };
/* Loading store part even if not directly used to make core functions load */
        if(f){
/* Fetching */
            try{
                m.store=k.parse(f.getItem("History.store"))||{}
            }
            catch(p){
                m.store={}
            }
/* Normalizing */
            m.normalizeStore()
        }
/* Loading default */
        else m.store={},
        m.normalizeStore();
/* Clearing intervals on exit to prevent memory leads */
        m.Adapter.bind(a,"beforeunload",m.clearAllIntervals),
        m.Adapter.bind(a,"unload",m.clearAllIntervals),
/* Creating initial state */
        m.saveState(m.storeState(m.extractState(d.location.href,!0))),
/* Binding to save store when page is closed */        
        f&&(m.onUnload=function(){
            var a,b;
            try{
                a=k.parse(f.getItem("History.store"))||{}
            }
            catch(c){
                a={}
            }
/* Ensuring */
            a.idToState=a.idToState||{},
            a.urlToId=a.urlToId||{},
            a.stateToId=a.stateToId||{};
/* Synchronizing */
            for(b in m.idToState){
                if(!m.idToState.hasOwnProperty(b))
                continue;
                a.idToState[b]=m.idToState[b]
            }
            for(b in m.urlToId){
                if(!m.urlToId.hasOwnProperty(b))
                continue;
                a.urlToId[b]=m.urlToId[b]
            }
            for(b in m.stateToId){
                if(!m.stateToId.hasOwnProperty(b))
                continue;
                a.stateToId[b]=m.stateToId[b]
            }
/* Updating and normalizing */
            m.store=a,
            m.normalizeStore(),
            f.setItem("History.store",k.stringify(a))
        },
/* Fixing for IE and other browsers */
        m.intervalList.push(i(m.onUnload,m.options.storeInterval)),
        m.Adapter.bind(a,"beforeunload",m.onUnload),
        m.Adapter.bind(a,"unload",m.onUnload));
/* Implementing non native push state */
        if(!m.emulated.pushState){
/* Ensuring cross browser compatibility */
            m.bugs.safariPoll&&m.intervalList.push(i(m.safariStatePoll,m.options.safariPollInterval));
            if(e.vendor==="Apple Computer, Inc."||(e.appCodeName||"")==="Mozilla")m.Adapter.bind(a,"hashchange",function(){
                m.Adapter.trigger(a,"popstate")
            }),
/* Initializing alias */
            m.getHash()&&m.Adapter.onDomLoad(function(){
                m.Adapter.trigger(a,"hashchange")
            })
        }
    },
/* Initializing history core */
    m.init()
}(window)

/*****************************************************************
******                STRINGS : CORE STRING                 ******
*****************************************************************/

/* Triming off whitespace from front and back */
String.prototype.trim = String.prototype.trim || function() {
	return this.replace(/^\s+|\s+$/g, '');
};
/* Stripping value from left ann right withoptional regex support */
String.prototype.strip = String.prototype.strip || function(value,regex){
	value = String(value);
	var str = this;
	if (value.length) {
		if (!(regex||false)) {
/* Escaping value to kill regex support */
			value = value.replace(/([\[\]\(\)\^\$\.\?\|\/\\])/g, '\\$1');
		}
		str = str.replace(eval('/^'+value+'+|'+value+'+$/g'), '');
	}
	return String(str);
}
/* Stripping value from left with optional regex support */
String.prototype.stripLeft = String.prototype.stripLeft || function(value,regex){
	value = String(value);
	var str = this;
	if (value.length) {
		if (!(regex||false)) {
/* Escaping value to kill regex support */
			value = value.replace(/([\[\]\(\)\^\$\.\?\|\/\\])/g, '\\$1');
		}
		str = str.replace(eval('/^'+value+'+/g'), '');
	}
	return String(str);
}
String.prototype.stripRight = String.prototype.stripRight || function(value,regex){
/* Stripping value from right with optional regex support */
	value = String(value);
	var str = this;
	if (value.length) {
		if (!(regex||false)) {
/* Escaping value to kill regex support */
			value = value.replace(/([\[\]\(\)\^\$\.\?\|\/\\])/g, '\\$1');
		}
		str = str.replace(eval('/'+value+'+$/g'), '');
	}
	return String(str);
}
/* Converting to integer */
String.prototype.toInt = String.prototype.toInt || function(){
	return parseInt(this,10);
};
/* Wrapping the string */
String.prototype.wrap = String.prototype.wrap || function(start,end){
	return start+this+end;
};
/* Wrapping the selection */
String.prototype.wrapSelection = String.prototype.wrapSelection || function(start,end,a,z){
	if ( typeof a === 'undefined' || a === null ) a = this.length;
	if ( typeof z === 'undefined' || z === null ) z = this.length;
	return this.substring(0,a)+start+this.substring(a,z)+end+this.substring(z);
};
/* Converting string to a slug */
String.prototype.toSlug = String.prototype.toSlug || function(){
	return this.toLowerCase().replace(/[\s_]/g, '-').replace(/[^-a-z0-9]/g, '').replace(/--+/g, '-').replace(/^-+|-+$/g,'');
}
/* Truning a parameter string or url into an array of parameters */
String.prototype.queryStringToJSON = String.prototype.queryStringToJSON || function ()
{
	var params = String(this);
/* Removing url if needed */
    params = params.substring(params.indexOf('?')+1);
/* Changing "+" to "%20". See decoding part for fix */
    params = params.replace(/\+/g, '%20');
/* Checking if JSON exists */
	if (params.substring(0,1) === '{' && params.substring(params.length-1) === '}')
	{
		return eval(decodeURIComponent(params));
    }
/* Getting the parameters string */
	params = params.split(/\&(amp\;)?/);
	var json = {};
/* Getting the parameters */
	for ( var i = 0, n = params.length; i < n; ++i )
	{
/* Adjusting */
		var param = params[i] || null;
		if (param === null) { 
            continue; 
        }
		param = param.split('=');
		if (param === null) { 
            continue; 
        }
/* Getting new values */
		var key = param[0] || null;
		if (key === null) { 
            continue; 
        }
		if (typeof param[1] === 'undefined') { 
            continue; 
        }
		var value = param[1];
/* Fixing decode key */
		key = decodeURIComponent(key);
		value = decodeURIComponent(value);
		try {
/* Converting value */
		    value = eval(value);
        } 
        catch ( e ) {}
/* Setting up the object */
		var keys = key.split('.');
		if (keys.length === 1)
		{
			json[key] = value;
        }
/* Esle re-creating an object */
		else
		{
			var path = '',
				cmd = '';
/* Ensuring path exists */
			$.each(keys,function(ii,key){
				path += '["'+key.replace(/"/g,'\\"')+'"]';
				jsonCLOSUREGLOBAL = json;
				cmd = 'if ( typeof jsonCLOSUREGLOBAL'+path+' === "undefined" ) jsonCLOSUREGLOBAL'+path+' = {}';
				eval(cmd);
				json = jsonCLOSUREGLOBAL;
				delete jsonCLOSUREGLOBAL;
			});
/* Applying value and making this a global one for compiling */
			jsonCLOSUREGLOBAL = json;
			valueCLOSUREGLOBAL = value;
			cmd = 'jsonCLOSUREGLOBAL'+path+' = valueCLOSUREGLOBAL';
			eval(cmd);
			json = jsonCLOSUREGLOBAL;
			delete jsonCLOSUREGLOBAL;
			delete valueCLOSUREGLOBAL;
		}
	}
	return json;
};