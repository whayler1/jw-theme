window.Modernizr = function(a, b, c) {
    function z(a) {
        j.cssText = a;
    }
    function B(a, b) {
        return typeof a === b;
    }
    function C(a, b) {
        return !!~("" + a).indexOf(b);
    }
    function D(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!C(e, "-") && j[e] !== c) return "pfx" == b ? e : !0;
        }
        return !1;
    }
    function E(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : B(f, "function") ? f.bind(d || b) : f;
        }
        return !1;
    }
    function F(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + " " + n.join(d + " ") + d).split(" ");
        return B(b, "string") || B(b, "undefined") ? D(e, b) : (e = (a + " " + o.join(d + " ") + d).split(" "), 
        E(e, b, c));
    }
    var k, u, y, d = "2.7.1", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, m = ({}.toString, 
    "Webkit Moz O ms"), n = m.split(" "), o = m.toLowerCase().split(" "), p = {}, s = [], t = s.slice, v = function(a, c, d, e) {
        var f, i, j, k, l = b.createElement("div"), m = b.body, n = m || b.createElement("body");
        if (parseInt(d, 10)) for (;d--; ) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), 
        l.appendChild(j);
        return f = [ "&#173;", '<style id="s', h, '">', a, "</style>" ].join(""), l.id = h, 
        (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", 
        k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), 
        m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), 
        !!i;
    }, w = function(b) {
        var c = a.matchMedia || a.msMatchMedia;
        if (c) return c(b).matches;
        var d;
        return v("@media " + b + " { #" + h + " { position: absolute; } }", function(b) {
            d = "absolute" == (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle).position;
        }), d;
    }, x = {}.hasOwnProperty;
    y = B(x, "undefined") || B(x.call, "undefined") ? function(a, b) {
        return b in a && B(a.constructor.prototype[b], "undefined");
    } : function(a, b) {
        return x.call(a, b);
    }, Function.prototype.bind || (Function.prototype.bind = function(b) {
        var c = this;
        if ("function" != typeof c) throw new TypeError();
        var d = t.call(arguments, 1), e = function() {
            if (this instanceof e) {
                var a = function() {};
                a.prototype = c.prototype;
                var f = new a(), g = c.apply(f, d.concat(t.call(arguments)));
                return Object(g) === g ? g : f;
            }
            return c.apply(b, d.concat(t.call(arguments)));
        };
        return e;
    }), p.backgroundsize = function() {
        return F("backgroundSize");
    };
    for (var G in p) y(p, G) && (u = G.toLowerCase(), e[u] = p[G](), s.push((e[u] ? "" : "no-") + u));
    return e.addTest = function(a, b) {
        if ("object" == typeof a) for (var d in a) y(a, d) && e.addTest(d, a[d]); else {
            if (a = a.toLowerCase(), e[a] !== c) return e;
            b = "function" == typeof b ? b() : b, "undefined" != typeof f && f && (g.className += " " + (b ? "" : "no-") + a), 
            e[a] = b;
        }
        return e;
    }, z(""), i = k = null, e._version = d, e._domPrefixes = o, e._cssomPrefixes = n, 
    e.mq = w, e.testProp = function(a) {
        return D([ a ]);
    }, e.testAllProps = F, e.testStyles = v, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + s.join(" ") : ""), 
    e;
}(this, this.document), function(a, b, c) {
    function d(a) {
        return "[object Function]" == o.call(a);
    }
    function e(a) {
        return "string" == typeof a;
    }
    function f() {}
    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a;
    }
    function h() {
        var a = p.shift();
        q = 1, a ? a.t ? m(function() {
            ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
        }, 0) : (a(), h()) : q = 0;
    }
    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, 
            b)) {
                "img" != a && m(function() {
                    t.removeChild(l);
                }, 50);
                for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload();
            }
        }
        var j = j || B.errorTimeout, l = b.createElement(a), o = 0, r = 0, u = {
            t: d,
            s: c,
            e: f,
            a: i,
            x: j
        };
        1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), 
        l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
            k.call(this, r);
        }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), 
        m(k, j)) : y[c].push(l));
    }
    function j(a, b, c, d, f) {
        return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 
        1 == p.length && h()), this;
    }
    function k() {
        var a = B;
        return a.loader = {
            load: j,
            i: 0
        }, a;
    }
    var A, B, l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance" in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode, l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l, u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function(a) {
        return "[object Array]" == o.call(a);
    }, x = [], y = {}, z = {
        timeout: function(a, b) {
            return b.length && (a.timeout = b[0]), a;
        }
    };
    B = function(a) {
        function b(a) {
            var e, f, g, a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = {
                url: c,
                origUrl: c,
                prefixes: a
            };
            for (f = 0; d > f; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; b > f; f++) c = x[f](c);
            return c;
        }
        function g(a, e, f, g, h) {
            var i = b(a), j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), 
            i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, 
            f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), 
            (d(e) || d(j)) && f.load(function() {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2;
            })));
        }
        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a)) c || (j = function() {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l();
                    }), g(a, j, b, 0, h); else if (Object(a) === a) for (n in m = function() {
                        var c, b = 0;
                        for (c in a) a.hasOwnProperty(c) && b++;
                        return b;
                    }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l();
                    } : j[n] = function(a) {
                        return function() {
                            var b = [].slice.call(arguments);
                            a && a.apply(this, b), l();
                        };
                    }(k[n])), g(a[n], j, b, n, h));
                } else !c && l();
            }
            var m, n, h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f;
            c(h ? a.yep : a.nope, !!i), i && c(i);
        }
        var i, j, l = this.yepnope.loader;
        if (e(a)) g(a, 0, l, 0); else if (w(a)) for (i = 0; i < a.length; i++) j = a[i], 
        e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l); else Object(a) === a && h(a, l);
    }, B.addPrefix = function(a, b) {
        z[a] = b;
    }, B.addFilter = function(a) {
        x.push(a);
    }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", 
    b.addEventListener("DOMContentLoaded", A = function() {
        b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete";
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
        var l, o, k = b.createElement("script"), e = e || B.errorTimeout;
        k.src = a;
        for (o in d) k.setAttribute(o, d[o]);
        c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
            !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null);
        }, m(function() {
            l || (l = 1, c(1));
        }, e), i ? k.onload() : n.parentNode.insertBefore(k, n);
    }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
        var j, e = b.createElement("link"), c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d) e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0));
    };
}(this, document), Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0));
};

var JW = {};

!function(document, window, JW) {
    JW.Dom = JW.Dom || {}, JW.Dom.hasClass = function(el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
    }, JW.Dom.addClass = function(el, className) {
        el.classList ? el.classList.add(className) : el.className += " " + className;
    }, JW.Dom.removeClass = function(el, className) {
        el.classList ? el.classList.remove(className) : el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };
}(document, window, JW), function(JW) {
    JW.Dom = JW.Dom || {}, JW.Dom.addEventListener = function(el, eventName, handler) {
        el.addEventListener ? el.addEventListener(eventName, handler) : el.attachEvent("on" + eventName, function() {
            handler.call(el);
        });
    }, JW.Dom.removeEventListener = function(el, eventName, handler) {
        el.removeEventListener ? el.removeEventListener(eventName, handler) : el.detachEvent("on" + eventName, handler);
    };
}(JW), JW.Ease = JW.Ease || {}, JW.Ease.easeOutQuad = function(t, b, c, d) {
    return t /= d, -c * t * (t - 2) + b;
}, JW.consts = {
    QUERY_DROPOWN: ".drop-down",
    QUERY_CAROUSEL: ".carousel",
    CLASS_EXPAND: "expand",
    CLASS_ON: "on",
    NUM_PADMOBILE: 20,
    NUM_PADDESKTOP: 50,
    NUM_BREAKPOINT: 768,
    STR_DESKTOP: "desktop",
    STR_MOBILE: "mobile"
}, function(JW, document) {
    var _consts = JW.consts, _QUERY_DROPOWN = _consts.QUERY_DROPOWN, _CLASS_EXPAND = _consts.CLASS_EXPAND, _dropDown = function(el) {
        var self = this;
        self.el = el, self.init();
    }, _init = function() {
        for (var dropdowns = document.querySelectorAll(_QUERY_DROPOWN), i = 0; i < dropdowns.length; i++) new _dropDown(dropdowns[i]);
    };
    _dropDown.prototype = {
        init: function() {
            var self = this;
            self.anchor = self.el.querySelector("a"), addEventListener(self.anchor, "click", self.onClick.bind(self));
        },
        onClick: function() {
            var self = this, el = self.el;
            hasClass(el, _CLASS_EXPAND) ? removeClass(el, _CLASS_EXPAND) : addClass(el, _CLASS_EXPAND);
        }
    }, _init();
}(JW, document, window), function(JW, document, window) {
    var _consts = JW.consts, _carousels = document.querySelectorAll(_consts.QUERY_CAROUSEL), _dom = JW.Dom, _NUM_PADMOBILE = _consts.NUM_PADMOBILE, _NUM_PADDESKTOP = _consts.NUM_PADDESKTOP, _NUM_BREAKPOINT = _consts.NUM_BREAKPOINT, _CLASS_ON = (_consts.STR_DESKTOP, 
    _consts.STR_MOBILE, _consts.CLASS_ON), _carousel = function(el) {
        var self = this;
        self.el = el, self.init();
    };
    _carousel.prototype = {
        init: function() {
            var uiAs, imgs, img, self = this, el = self.el, i = 0;
            for (self.scrollArea = el.querySelector(".scroll-area"), self.ui = el.querySelector(".ui"), 
            self.ul = self.scrollArea.querySelector("ul"), self.lis = self.ul.querySelectorAll("li"), 
            imgs = self.ul.querySelectorAll("img"); i < imgs.length; i++) img = imgs[i], img.complete || (img.onload = self.onImgLoad.bind(self));
            uiAs = self.ui.querySelectorAll("a"), self.btnLeft = uiAs[0], self.btnRight = uiAs[1], 
            self.btnWidth = self.btnLeft.innerWidth, self.assessWidowWidth(), self.assessUiOn(), 
            window.onresize = self.onResize.bind(self), _dom.addEventListener(self.scrollArea, "scroll", self.onScroll.bind(self)), 
            _dom.addEventListener(self.btnLeft, "click", self.prev.bind(self)), _dom.addEventListener(self.btnRight, "click", self.next.bind(self));
        },
        onResize: function() {
            var self = this;
            self.assessWidowWidth();
        },
        onScroll: function() {
            var self = this;
            self.assessUiOn();
        },
        onImgLoad: function() {
            var self = this;
            self.assesLisWidth();
        },
        next: function() {
            for (var lisLeftOffset, self = this, scrollLeft = self.scrollLeft, lisLeftOffsets = self.lisLeftOffsets, absRight = self.absRight, scrollArea = self.scrollArea, i = 0; i < lisLeftOffsets.length; i++) if (lisLeftOffset = lisLeftOffsets[i], 
            lisLeftOffset > scrollLeft) return void (scrollArea.scrollLeft = absRight > lisLeftOffset ? lisLeftOffset : absRight);
            scrollArea.scrollLeft = absRight;
        },
        prev: function() {
            for (var lisLeftOffset, self = this, scrollLeft = self.scrollLeft, lisLeftOffsets = self.lisLeftOffsets, scrollArea = self.scrollArea, i = lisLeftOffsets.length - 1; i >= 0; i--) if (lisLeftOffset = lisLeftOffsets[i], 
            scrollLeft > lisLeftOffset) {
                scrollArea.scrollLeft = lisLeftOffset;
                break;
            }
        },
        assessUiOn: function() {
            var self = this;
            self.scrollLeft = scrollLeft = self.scrollArea.scrollLeft, scrollLeft > 0 ? _dom.addClass(self.btnLeft, _CLASS_ON) : _dom.removeClass(self.btnLeft, _CLASS_ON), 
            scrollLeft < self.absRight ? _dom.addClass(self.btnRight, _CLASS_ON) : _dom.removeClass(self.btnRight, _CLASS_ON);
        },
        assesLisWidth: function() {
            var self = this, lis = self.lis, lisWidth = 0;
            for (i = 0, self.lisLeftOffsets = []; i < lis.length; i++) self.lisLeftOffsets.push(lisWidth), 
            lisWidth += lis[i].offsetWidth;
            self.absRight = lisWidth - self.ul.offsetWidth, self.assessUiOn();
        },
        assessWidowWidth: function() {
            var windowWidth, self = this;
            self.windowWidth = windowWidth = window.innerWidth, self.pad = _NUM_BREAKPOINT > windowWidth ? _NUM_PADMOBILE : _NUM_PADDESKTOP, 
            self.assesLisWidth();
        }
    };
    for (var i = 0; i < _carousels.length; i++) new _carousel(_carousels[i]);
}(JW, document, window);