!(function (t, e) {
	'object' == typeof exports && 'undefined' != typeof module
		? (module.exports = e(require('preact')))
		: 'function' == typeof define && define.amd
		? define(['preact'], e)
		: ((t = t || self).preactCustomElement = e(t.preact));
})(this, function (t) {
	function e() {
		return (e =
			Object.assign ||
			function (t) {
				for (var e = 1; e < arguments.length; e++) {
					var n = arguments[e];
					for (var o in n)
						Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
				}
				return t;
			}).apply(this, arguments);
	}
	var n = ['context', 'children'];
	function o(e) {
		this.getChildContext = function () {
			return e.context;
		};
		var o = e.children,
			r = (function (t, e) {
				if (null == t) return {};
				var n,
					o,
					r = {},
					i = Object.keys(t);
				for (o = 0; o < i.length; o++)
					e.indexOf((n = i[o])) >= 0 || (r[n] = t[n]);
				return r;
			})(e, n);
		return t.cloneElement(o, r);
	}
	function r() {
		var n = new CustomEvent('_preact', {
			detail: {},
			bubbles: !0,
			cancelable: !0,
		});
		this.dispatchEvent(n),
			(this._vdom = t.h(
				o,
				e({}, this._props, {
					emitEvent: this._emitCustomEvent,
					context: n.detail.context,
				}),
				(function e(n, o) {
					if (3 === n.nodeType) return n.data;
					if (1 !== n.nodeType) return null;
					var r = [],
						a = {},
						s = 0,
						c = n.attributes,
						l = n.childNodes;
					for (s = c.length; s--; )
						'slot' !== c[s].name &&
							((a[c[s].name] = c[s].value), (a[i(c[s].name)] = c[s].value));
					for (s = l.length; s--; ) {
						var d = e(l[s], null),
							p = l[s].slot;
						p ? (a[p] = t.h(u, { name: p }, d)) : (r[s] = d);
					}
					var h = o ? t.h(u, null, r) : r;
					return t.h(o || n.nodeName.toLowerCase(), a, h);
				})(this, this._vdomComponent)
			)),
			(this.hasAttribute('hydrate') ? t.hydrate : t.render)(
				this._vdom,
				this._root
			);
	}
	function i(t) {
		return t.replace(/-(\w)/g, function (t, e) {
			return e ? e.toUpperCase() : '';
		});
	}
	function a(e, n, o) {
		if (this._vdom) {
			var r = {};
			(r[e] = o = null == o ? void 0 : o),
				(r[i(e)] = o),
				(this._vdom = t.cloneElement(this._vdom, r)),
				t.render(this._vdom, this._root);
		}
	}
	function s() {
		t.render((this._vdom = null), this._root);
	}
	function c(t, e) {
		var n = this;
		return new Promise(function (o, r) {
			n.dispatchEvent(
				new CustomEvent(t, {
					bubbles: !0,
					detail: {
						callback: function (t, e) {
							void 0 === e ? o(t) : r(e);
						},
						payload: e,
					},
				})
			);
		});
	}
	function u(n, o) {
		var r = this;
		return t.h(
			'slot',
			e({}, n, {
				ref: function (t) {
					t
						? ((r.ref = t),
						  r._listener ||
								((r._listener = function (t) {
									t.stopPropagation(), (t.detail.context = o);
								}),
								t.addEventListener('_preact', r._listener)))
						: r.ref.removeEventListener('_preact', r._listener);
				},
			})
		);
	}
	return function (t, e, n, o) {
		function i() {
			var e = Reflect.construct(HTMLElement, [], i);
			(e._vdomComponent = t),
				(e._root = o && o.shadow ? e.attachShadow({ mode: 'open' }) : e);
			var n = function (t, n) {
				return e.dispatch(t, n);
			};
			return (
				(e._emitCustomEvent = n),
				Object.defineProperty(e, 'handlerCustomEvent', {
					get: function () {
						return n;
					},
				}),
				e
			);
		}
		return (
			((i.prototype = Object.create(HTMLElement.prototype)).constructor = i),
			(i.prototype.connectedCallback = r),
			(i.prototype.attributeChangedCallback = a),
			(i.prototype.disconnectedCallback = s),
			(i.prototype.dispatch = c),
			(n = n || t.observedAttributes || Object.keys(t.propTypes || {})),
			(i.observedAttributes = n),
			n.forEach(function (t) {
				Object.defineProperty(i.prototype, t, {
					get: function () {
						return this._vdom.props[t];
					},
					set: function (e) {
						this._vdom
							? this.attributeChangedCallback(t, null, e)
							: (this._props || (this._props = {}),
							  (this._props[t] = e),
							  this.connectedCallback());
						var n = typeof e;
						(null != e &&
							'string' !== n &&
							'boolean' !== n &&
							'number' !== n) ||
							this.setAttribute(t, e);
					},
				});
			}),
			customElements.define(e || t.tagName || t.displayName || t.name, i)
		);
	};
});
//# sourceMappingURL=preact-custom-element.umd.js.map