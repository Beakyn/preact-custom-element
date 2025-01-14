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
const s = ['context', 'children'];
function i(t) {
	this.getChildContext = () => t.context;
	const { children: e } = t,
		n = (function (t, e) {
			if (null == t) return {};
			var n,
				o,
				r = {},
				s = Object.keys(t);
			for (o = 0; o < s.length; o++)
				e.indexOf((n = s[o])) >= 0 || (r[n] = t[n]);
			return r;
		})(t, s);
	return o(e, n);
}
function a() {
	const o = new CustomEvent('_preact', {
		detail: {},
		bubbles: !0,
		cancelable: !0,
	});
	this.dispatchEvent(o),
		(this._vdom = t(
			i,
			r({}, this._props, {
				emitEvent: this._emitCustomEvent,
				context: o.detail.context,
			}),
			(function e(n, o) {
				if (3 === n.nodeType) return n.data;
				if (1 !== n.nodeType) return null;
				let r = [],
					s = {},
					i = 0,
					a = n.attributes,
					l = n.childNodes;
				for (i = a.length; i--; )
					'slot' !== a[i].name &&
						((s[a[i].name] = a[i].value), (s[c(a[i].name)] = a[i].value));
				for (i = l.length; i--; ) {
					const n = e(l[i], null),
						o = l[i].slot;
					o ? (s[o] = t(h, { name: o }, n)) : (r[i] = n);
				}
				const p = o ? t(h, null, r) : r;
				return t(o || n.nodeName.toLowerCase(), s, p);
			})(this, this._vdomComponent)
		)),
		(this.hasAttribute('hydrate') ? e : n)(this._vdom, this._root);
}
function c(t) {
	return t.replace(/-(\w)/g, (t, e) => (e ? e.toUpperCase() : ''));
}
function l(t, e, r) {
	if (!this._vdom) return;
	const s = {};
	(s[t] = r = null == r ? void 0 : r),
		(s[c(t)] = r),
		(this._vdom = o(this._vdom, s)),
		n(this._vdom, this._root);
}
function p() {
	n((this._vdom = null), this._root);
}
function u(t, e) {
	return new Promise((n, o) => {
		this.dispatchEvent(
			new CustomEvent(t, {
				bubbles: !0,
				detail: {
					callback: (t, e) => {
						void 0 === e ? n(t) : o(e);
					},
					payload: e,
				},
			})
		);
	});
}
function h(e, n) {
	return t(
		'slot',
		r({}, e, {
			ref: (t) => {
				t
					? ((this.ref = t),
					  this._listener ||
							((this._listener = (t) => {
								t.stopPropagation(), (t.detail.context = n);
							}),
							t.addEventListener('_preact', this._listener)))
					: this.ref.removeEventListener('_preact', this._listener);
			},
		})
	);
}
export default function (t, e, n, o) {
	function r() {
		const e = Reflect.construct(HTMLElement, [], r);
		(e._vdomComponent = t),
			(e._root = o && o.shadow ? e.attachShadow({ mode: 'open' }) : e);
		const n = (t, n) => e.dispatch(t, n);
		return (
			(e._emitCustomEvent = n),
			Object.defineProperty(e, 'handlerCustomEvent', { get: () => n }),
			e
		);
	}
	return (
		((r.prototype = Object.create(HTMLElement.prototype)).constructor = r),
		(r.prototype.connectedCallback = a),
		(r.prototype.attributeChangedCallback = l),
		(r.prototype.disconnectedCallback = p),
		(r.prototype.dispatch = u),
		(n = n || t.observedAttributes || Object.keys(t.propTypes || {})),
		(r.observedAttributes = n),
		n.forEach((t) => {
			Object.defineProperty(r.prototype, t, {
				get() {
					return this._vdom.props[t];
				},
				set(e) {
					this._vdom
						? this.attributeChangedCallback(t, null, e)
						: (this._props || (this._props = {}),
						  (this._props[t] = e),
						  this.connectedCallback());
					const n = typeof e;
					(null != e && 'string' !== n && 'boolean' !== n && 'number' !== n) ||
						this.setAttribute(t, e);
				},
			});
		}),
		customElements.define(e || t.tagName || t.displayName || t.name, r)
	);
}
//# sourceMappingURL=preact-custom-element.modern.js.map
