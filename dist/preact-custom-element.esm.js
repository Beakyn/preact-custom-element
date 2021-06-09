import { h as t, hydrate as e, render as n, cloneElement as o } from 'preact';
function r() {
	return (r =
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
var i = ['context', 'children'];
function a(t) {
	this.getChildContext = function () {
		return t.context;
	};
	var e = t.children,
		n = (function (t, e) {
			if (null == t) return {};
			var n,
				o,
				r = {},
				i = Object.keys(t);
			for (o = 0; o < i.length; o++)
				e.indexOf((n = i[o])) >= 0 || (r[n] = t[n]);
			return r;
		})(t, i);
	return o(e, n);
}
function s() {
	var o = new CustomEvent('_preact', {
		detail: {},
		bubbles: !0,
		cancelable: !0,
	});
	this.dispatchEvent(o),
		(this._vdom = t(
			a,
			r({}, this._props, {
				emitEvent: this._emitCustomEvent,
				context: o.detail.context,
			}),
			(function e(n, o) {
				if (3 === n.nodeType) return n.data;
				if (1 !== n.nodeType) return null;
				var r = [],
					i = {},
					a = 0,
					s = n.attributes,
					u = n.childNodes;
				for (a = s.length; a--; )
					'slot' !== s[a].name &&
						((i[s[a].name] = s[a].value), (i[c(s[a].name)] = s[a].value));
				for (a = u.length; a--; ) {
					var l = e(u[a], null),
						p = u[a].slot;
					p ? (i[p] = t(d, { name: p }, l)) : (r[a] = l);
				}
				var h = o ? t(d, null, r) : r;
				return t(o || n.nodeName.toLowerCase(), i, h);
			})(this, this._vdomComponent)
		)),
		(this.hasAttribute('hydrate') ? e : n)(this._vdom, this._root);
}
function c(t) {
	return t.replace(/-(\w)/g, function (t, e) {
		return e ? e.toUpperCase() : '';
	});
}
function u(t, e, r) {
	if (this._vdom) {
		var i = {};
		(i[t] = r = null == r ? void 0 : r),
			(i[c(t)] = r),
			(this._vdom = o(this._vdom, i)),
			n(this._vdom, this._root);
	}
}
function l() {
	n((this._vdom = null), this._root);
}
function p(t, e) {
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
function d(e, n) {
	var o = this;
	return t(
		'slot',
		r({}, e, {
			ref: function (t) {
				t
					? ((o.ref = t),
					  o._listener ||
							((o._listener = function (t) {
								t.stopPropagation(), (t.detail.context = n);
							}),
							t.addEventListener('_preact', o._listener)))
					: o.ref.removeEventListener('_preact', o._listener);
			},
		})
	);
}
export default function (t, e, n, o) {
	function r() {
		var e = Reflect.construct(HTMLElement, [], r);
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
		((r.prototype = Object.create(HTMLElement.prototype)).constructor = r),
		(r.prototype.connectedCallback = s),
		(r.prototype.attributeChangedCallback = u),
		(r.prototype.disconnectedCallback = l),
		(r.prototype.dispatch = p),
		(n = n || t.observedAttributes || Object.keys(t.propTypes || {})),
		(r.observedAttributes = n),
		n.forEach(function (t) {
			Object.defineProperty(r.prototype, t, {
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
					(null != e && 'string' !== n && 'boolean' !== n && 'number' !== n) ||
						this.setAttribute(t, e);
				},
			});
		}),
		customElements.define(e || t.tagName || t.displayName || t.name, r)
	);
}
//# sourceMappingURL=preact-custom-element.esm.js.map
