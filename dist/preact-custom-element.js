var t = require('preact');
function e() {
	return (e =
		Object.assign ||
		function (t) {
			for (var e = 1; e < arguments.length; e++) {
				var n = arguments[e];
				for (var r in n)
					Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
			}
			return t;
		}).apply(this, arguments);
}
var n = ['context', 'children'];
function r(e) {
	this.getChildContext = function () {
		return e.context;
	};
	var r = e.children,
		o = (function (t, e) {
			if (null == t) return {};
			var n,
				r,
				o = {},
				i = Object.keys(t);
			for (r = 0; r < i.length; r++)
				e.indexOf((n = i[r])) >= 0 || (o[n] = t[n]);
			return o;
		})(e, n);
	return t.cloneElement(r, o);
}
function o() {
	var n = new CustomEvent('_preact', {
		detail: {},
		bubbles: !0,
		cancelable: !0,
	});
	this.dispatchEvent(n),
		(this._vdom = t.h(
			r,
			e({}, this._props, {
				emitEvent: this._emitCustomEvent,
				context: n.detail.context,
			}),
			(function e(n, r) {
				if (3 === n.nodeType) return n.data;
				if (1 !== n.nodeType) return null;
				var o = [],
					a = {},
					s = 0,
					c = n.attributes,
					l = n.childNodes;
				for (s = c.length; s--; )
					'slot' !== c[s].name &&
						((a[c[s].name] = c[s].value), (a[i(c[s].name)] = c[s].value));
				for (s = l.length; s--; ) {
					var d = e(l[s], null),
						h = l[s].slot;
					h ? (a[h] = t.h(u, { name: h }, d)) : (o[s] = d);
				}
				var p = r ? t.h(u, null, o) : o;
				return t.h(r || n.nodeName.toLowerCase(), a, p);
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
function a(e, n, r) {
	if (this._vdom) {
		var o = {};
		(o[e] = r = null == r ? void 0 : r),
			(o[i(e)] = r),
			(this._vdom = t.cloneElement(this._vdom, o)),
			t.render(this._vdom, this._root);
	}
}
function s() {
	t.render((this._vdom = null), this._root);
}
function c(t, e) {
	var n = this;
	return new Promise(function (r, o) {
		n.dispatchEvent(
			new CustomEvent(t, {
				bubbles: !0,
				detail: {
					callback: function (t, e) {
						void 0 === e ? r(t) : o(e);
					},
					payload: e,
				},
			})
		);
	});
}
function u(n, r) {
	var o = this;
	return t.h(
		'slot',
		e({}, n, {
			ref: function (t) {
				t
					? ((o.ref = t),
					  o._listener ||
							((o._listener = function (t) {
								t.stopPropagation(), (t.detail.context = r);
							}),
							t.addEventListener('_preact', o._listener)))
					: o.ref.removeEventListener('_preact', o._listener);
			},
		})
	);
}
module.exports = function (t, e, n, r) {
	function i() {
		var e = Reflect.construct(HTMLElement, [], i);
		(e._vdomComponent = t),
			(e._root = r && r.shadow ? e.attachShadow({ mode: 'open' }) : e);
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
		(i.prototype.connectedCallback = o),
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
					(null != e && 'string' !== n && 'boolean' !== n && 'number' !== n) ||
						this.setAttribute(t, e);
				},
			});
		}),
		customElements.define(e || t.tagName || t.displayName || t.name, i)
	);
};
//# sourceMappingURL=preact-custom-element.js.map
