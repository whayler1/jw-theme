!function(window, document) {
    function addStyleSheet(ownerDocument, cssText) {
        var p = ownerDocument.createElement("p"), parent = ownerDocument.getElementsByTagName("head")[0] || ownerDocument.documentElement;
        return p.innerHTML = "x<style>" + cssText + "</style>", parent.insertBefore(p.lastChild, parent.firstChild);
    }
    function getElements() {
        var elements = html5.elements;
        return "string" == typeof elements ? elements.split(" ") : elements;
    }
    function getExpandoData(ownerDocument) {
        var data = expandoData[ownerDocument[expando]];
        return data || (data = {}, expanID++, ownerDocument[expando] = expanID, expandoData[expanID] = data), 
        data;
    }
    function createElement(nodeName, ownerDocument, data) {
        if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createElement(nodeName);
        data || (data = getExpandoData(ownerDocument));
        var node;
        return node = data.cache[nodeName] ? data.cache[nodeName].cloneNode() : saveClones.test(nodeName) ? (data.cache[nodeName] = data.createElem(nodeName)).cloneNode() : data.createElem(nodeName), 
        !node.canHaveChildren || reSkip.test(nodeName) || node.tagUrn ? node : data.frag.appendChild(node);
    }
    function createDocumentFragment(ownerDocument, data) {
        if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createDocumentFragment();
        data = data || getExpandoData(ownerDocument);
        for (var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length; l > i; i++) clone.createElement(elems[i]);
        return clone;
    }
    function shivMethods(ownerDocument, data) {
        data.cache || (data.cache = {}, data.createElem = ownerDocument.createElement, data.createFrag = ownerDocument.createDocumentFragment, 
        data.frag = data.createFrag()), ownerDocument.createElement = function(nodeName) {
            return html5.shivMethods ? createElement(nodeName, ownerDocument, data) : data.createElem(nodeName);
        }, ownerDocument.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
            return data.createElem(nodeName), data.frag.createElement(nodeName), 'c("' + nodeName + '")';
        }) + ");return n}")(html5, data.frag);
    }
    function shivDocument(ownerDocument) {
        ownerDocument || (ownerDocument = document);
        var data = getExpandoData(ownerDocument);
        return !html5.shivCSS || supportsHtml5Styles || data.hasCSS || (data.hasCSS = !!addStyleSheet(ownerDocument, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), 
        supportsUnknownElements || shivMethods(ownerDocument, data), ownerDocument;
    }
    function addWrappers(ownerDocument) {
        for (var node, nodes = ownerDocument.getElementsByTagName("*"), index = nodes.length, reElements = RegExp("^(?:" + getElements().join("|") + ")$", "i"), result = []; index--; ) node = nodes[index], 
        reElements.test(node.nodeName) && result.push(node.applyElement(createWrapper(node)));
        return result;
    }
    function createWrapper(element) {
        for (var node, nodes = element.attributes, index = nodes.length, wrapper = element.ownerDocument.createElement(shivNamespace + ":" + element.nodeName); index--; ) node = nodes[index], 
        node.specified && wrapper.setAttribute(node.nodeName, node.nodeValue);
        return wrapper.style.cssText = element.style.cssText, wrapper;
    }
    function shivCssText(cssText) {
        for (var pair, parts = cssText.split("{"), index = parts.length, reElements = RegExp("(^|[\\s,>+~])(" + getElements().join("|") + ")(?=[[\\s,>+~#.:]|$)", "gi"), replacement = "$1" + shivNamespace + "\\:$2"; index--; ) pair = parts[index] = parts[index].split("}"), 
        pair[pair.length - 1] = pair[pair.length - 1].replace(reElements, replacement), 
        parts[index] = pair.join("}");
        return parts.join("{");
    }
    function removeWrappers(wrappers) {
        for (var index = wrappers.length; index--; ) wrappers[index].removeNode();
    }
    function shivPrint(ownerDocument) {
        function removeSheet() {
            clearTimeout(data._removeSheetTimer), shivedSheet && shivedSheet.removeNode(!0), 
            shivedSheet = null;
        }
        var shivedSheet, wrappers, data = getExpandoData(ownerDocument), namespaces = ownerDocument.namespaces, ownerWindow = ownerDocument.parentWindow;
        return !supportsShivableSheets || ownerDocument.printShived ? ownerDocument : ("undefined" == typeof namespaces[shivNamespace] && namespaces.add(shivNamespace), 
        ownerWindow.attachEvent("onbeforeprint", function() {
            removeSheet();
            for (var imports, length, sheet, collection = ownerDocument.styleSheets, cssText = [], index = collection.length, sheets = Array(index); index--; ) sheets[index] = collection[index];
            for (;sheet = sheets.pop(); ) if (!sheet.disabled && reMedia.test(sheet.media)) {
                try {
                    imports = sheet.imports, length = imports.length;
                } catch (er) {
                    length = 0;
                }
                for (index = 0; length > index; index++) sheets.push(imports[index]);
                try {
                    cssText.push(sheet.cssText);
                } catch (er) {}
            }
            cssText = shivCssText(cssText.reverse().join("")), wrappers = addWrappers(ownerDocument), 
            shivedSheet = addStyleSheet(ownerDocument, cssText);
        }), ownerWindow.attachEvent("onafterprint", function() {
            removeWrappers(wrappers), clearTimeout(data._removeSheetTimer), data._removeSheetTimer = setTimeout(removeSheet, 500);
        }), ownerDocument.printShived = !0, ownerDocument);
    }
    var supportsHtml5Styles, supportsUnknownElements, version = "3.7.0", options = window.html5 || {}, reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, expando = "_html5shiv", expanID = 0, expandoData = {};
    !function() {
        try {
            var a = document.createElement("a");
            a.innerHTML = "<xyz></xyz>", supportsHtml5Styles = "hidden" in a, supportsUnknownElements = 1 == a.childNodes.length || function() {
                document.createElement("a");
                var frag = document.createDocumentFragment();
                return "undefined" == typeof frag.cloneNode || "undefined" == typeof frag.createDocumentFragment || "undefined" == typeof frag.createElement;
            }();
        } catch (e) {
            supportsHtml5Styles = !0, supportsUnknownElements = !0;
        }
    }();
    var html5 = {
        elements: options.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
        version: version,
        shivCSS: options.shivCSS !== !1,
        supportsUnknownElements: supportsUnknownElements,
        shivMethods: options.shivMethods !== !1,
        type: "default",
        shivDocument: shivDocument,
        createElement: createElement,
        createDocumentFragment: createDocumentFragment
    };
    window.html5 = html5, shivDocument(document);
    var reMedia = /^$|\b(?:all|print)\b/, shivNamespace = "html5shiv", supportsShivableSheets = !supportsUnknownElements && function() {
        var docEl = document.documentElement;
        return !("undefined" == typeof document.namespaces || "undefined" == typeof document.parentWindow || "undefined" == typeof docEl.applyElement || "undefined" == typeof docEl.removeNode || "undefined" == typeof window.attachEvent);
    }();
    html5.type += " print", html5.shivPrint = shivPrint, shivPrint(document);
}(this, document), window.Modernizr = function(a, b, c) {
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