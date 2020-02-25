/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/toastify-js@1.6.1/src/toastify.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!(function(t, o) {
    "object" == typeof module && module.exports ?
        (module.exports = o()) :
        (t.Toastify = o());
})(this, function(t) {
    var o = function(t) {
        return new o.lib.init(t);
    };

    function i(t, o) {
        return (!(!t || "string" != typeof o) &&
            !!(
                t.className &&
                t.className
                .trim()
                .split(/\s+/gi)
                .indexOf(o) > -1
            )
        );
    }
    return (
        (o.lib = o.prototype = {
            toastify: "1.6.1",
            constructor: o,
            init: function(t) {
                return (
                    t || (t = {}),
                    (this.options = {}),
                    (this.toastElement = null),
                    (this.options.text = t.text || "Hi there!"),
                    (this.options.duration = t.duration || 3e3),
                    (this.options.selector = t.selector),
                    (this.options.callback = t.callback || function() {}),
                    (this.options.destination = t.destination),
                    (this.options.newWindow = t.newWindow || !1),
                    (this.options.close = t.close || !1),
                    (this.options.gravity =
                        "bottom" == t.gravity ? "toastify-bottom" : "toastify-top"),
                    (this.options.positionLeft = t.positionLeft || !1),
                    (this.options.position = t.position || ""),
                    (this.options.backgroundColor = t.backgroundColor),
                    (this.options.avatar = t.avatar || ""),
                    (this.options.className = t.className || ""),
                    (this.options.stopOnFocus =
                        void 0 === t.stopOnFocus || t.stopOnFocus),
                    this
                );
            },
            buildToast: function() {
                if (!this.options) throw "Toastify is not initialized";
                var t = document.createElement("div");
                if (
                    ((t.className = "toastify on " + this.options.className),
                        this.options.position ?
                        (t.className += " toastify-" + this.options.position) :
                        !0 === this.options.positionLeft ?
                        ((t.className += " toastify-left"),
                            console.warn(
                                "Property `positionLeft` will be depreciated in further versions. Please use `position` instead."
                            )) :
                        (t.className += " toastify-right"),
                        (t.className += " " + this.options.gravity),
                        this.options.backgroundColor &&
                        (t.style.background = this.options.backgroundColor),
                        (t.innerHTML = this.options.text),
                        "" !== this.options.avatar)
                ) {
                    var o = document.createElement("img");
                    (o.src = this.options.avatar),
                    (o.className = "toastify-avatar"),
                    "left" == this.options.position || !0 === this.options.positionLeft ?
                        t.appendChild(o) :
                        t.insertAdjacentElement("beforeend", o);
                }
                if (!0 === this.options.close) {
                    var i = document.createElement("span");
                    if (
                        ((i.innerHTML = "&#10006;"),
                            (i.className = "toast-close"),
                            i.addEventListener(
                                "click",
                                function(t) {
                                    t.stopPropagation(),
                                        this.removeElement(t.target.parentElement),
                                        window.clearTimeout(t.target.parentElement.timeOutValue);
                                }.bind(this)
                            ),
                            this.options.stopOnFocus && this.options.duration > 0)
                    ) {
                        const o = this;
                        t.addEventListener("mouseover", function(o) {
                                window.clearTimeout(t.timeOutValue);
                            }),
                            t.addEventListener("mouseleave", function() {
                                t.timeOutValue = window.setTimeout(function() {
                                    o.removeElement(t);
                                }, o.options.duration);
                            });
                    }
                    var e = window.innerWidth > 0 ? window.innerWidth : screen.width;
                    ("left" == this.options.position ||
                        !0 === this.options.positionLeft) &&
                    e > 360 ?
                        t.insertAdjacentElement("afterbegin", i) :
                        t.appendChild(i);
                }
                return (
                    void 0 !== this.options.destination &&
                    t.addEventListener(
                        "click",
                        function(t) {
                            t.stopPropagation(), !0 === this.options.newWindow ?
                                window.open(this.options.destination, "_blank") :
                                (window.location = this.options.destination);
                        }.bind(this)
                    ),
                    t
                );
            },
            showToast: function() {
                var t;
                if (
                    ((this.toastElement = this.buildToast()), !(t =
                        void 0 === this.options.selector ?
                        document.body :
                        document.getElementById(this.options.selector)))
                )
                    throw "Root element is not defined";
                return (
                    t.insertBefore(this.toastElement, t.firstChild),
                    o.reposition(),
                    this.options.duration > 0 &&
                    (this.toastElement.timeOutValue = window.setTimeout(
                        function() {
                            this.removeElement(this.toastElement);
                        }.bind(this),
                        this.options.duration
                    )),
                    this
                );
            },
            hideToast: function() {
                this.toastElement.timeOutValue &&
                    clearTimeout(this.toastElement.timeOutValue),
                    this.removeElement(this.toastElement);
            },
            removeElement: function(t) {
                (t.className = t.className.replace(" on", "")),
                window.setTimeout(
                    function() {
                        t.parentNode.removeChild(t),
                            this.options.callback.call(t),
                            o.reposition();
                    }.bind(this),
                    400
                );
            }
        }),
        (o.reposition = function() {
            for (
                var t,
                    o = { top: 15, bottom: 15 },
                    e = { top: 15, bottom: 15 },
                    s = { top: 15, bottom: 15 },
                    n = document.getElementsByClassName("toastify"),
                    a = 0; a < n.length; a++
            ) {
                t = !0 === i(n[a], "toastify-top") ? "toastify-top" : "toastify-bottom";
                var r = n[a].offsetHeight;
                t = t.substr(9, t.length - 1);
                (window.innerWidth > 0 ? window.innerWidth : screen.width) <= 360
                    ?
                    ((n[a].style[t] = s[t] + "px"), (s[t] += r + 15)) :
                    !0 === i(n[a], "toastify-left") ?
                    ((n[a].style[t] = o[t] + "px"), (o[t] += r + 15)) :
                    ((n[a].style[t] = e[t] + "px"), (e[t] += r + 15));
            }
            return this;
        }),
        (o.lib.init.prototype = o.lib),
        o
    );
});
//# sourceMappingURL=/sm/41acc3aa20f250262e5e3385662e41945e2d17511eab5f086301cd9afd7cc770.map