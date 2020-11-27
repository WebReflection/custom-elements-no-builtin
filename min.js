!function(){"use strict";var e="function"==typeof Promise?Promise:function(e){var t,n=[],r=0;return e((function(e){t=e,r=1,n.splice(0).forEach(o)})),{then:o};function o(e){return r?setTimeout(e,0,t):n.push(e),this}},t=self,n=t.document,r=t.MutationObserver,o=t.Set,u=t.WeakMap,a=function(e){return"querySelectorAll"in e},i=[].filter;if(!self.customElements){var c=function(){var e=this.constructor;if(!E.has(e))throw new b("Illegal constructor");var t=E.get(e);if(q)return T(q,t);var n=m.call(s,t);return T(w(n,e.prototype),t)},l=self,s=l.document,f=l.HTMLElement,h=l.Node,d=l.Map,v=l.MutationObserver,g=l.Object,p=l.Error,b=l.TypeError,m=s.createElement,y=g.defineProperty,w=g.setPrototypeOf,E=new d,O=new d,M=new d,N=new d,C=[],S=function(e){var t=new u,c=function(t){var n=e.query;if(n.length)for(var r=0,o=t.length;r<o;r++)l(i.call(t[r].addedNodes,a),!0,n),l(i.call(t[r].removedNodes,a),!1,n)},l=function n(r,u,a){for(var i,c,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new o,f=function(f,d,v,g){if(!l.has(d=r[v])){if(l.add(d),u)for(var p,b=s(d),m=0,y=a.length;m<y;m++)b.call(d,p=a[m])&&(t.has(d)||t.set(d,new o),(f=t.get(d)).has(p)||(f.add(p),e.handle(d,u,p)));else t.has(d)&&(f=t.get(d),t.delete(d),f.forEach((function(t){e.handle(d,u,t)})));n(h(d),u,a,l)}i=f,c=d},d=0,v=r.length;d<v;d++)f(i,c,d)},s=function(e){return e.matches||e.webkitMatchesSelector||e.msMatchesSelector},f=function(t){l(t,!(arguments.length>1&&void 0!==arguments[1])||arguments[1],e.query)},h=function(e){return g.length?e.querySelectorAll(g):g},d=new r(c),v=e.root||n,g=e.query;return d.observe(v,{childList:!0,subtree:!0}),f(h(v)),{drop:function(e){for(var n=0,r=e.length;n<r;n++)t.delete(e[n])},flush:function(){c(d.takeRecords())},observer:d,parse:f}}({query:C,handle:function(e,t,n){var r=M.get(n);if(t&&!r.isPrototypeOf(e)){q=w(e,r);try{new r.constructor}finally{q=null}}var o="".concat(t?"":"dis","connectedCallback");o in r&&e[o]()}}).parse,q=null,P=function(t){if(!O.has(t)){var n,r=new e((function(e){n=e}));O.set(t,{$:r,_:n})}return O.get(t).$},T=function(e,t){var n=function(e){for(var t=0,n=e.length;t<n;t++)r(e[t])},r=function(e){var t=e.target,n=e.attributeName,r=e.oldValue;t.attributeChangedCallback(n,r,t.getAttribute(n))};return function(o,u){var a=o.constructor.observedAttributes;return a&&e(u).then((function(){new t(n).observe(o,{attributes:!0,attributeOldValue:!0,attributeFilter:a});for(var e=0,u=a.length;e<u;e++)o.hasAttribute(a[e])&&r({target:o,attributeName:a[e],oldValue:null})})),o}}(P,v);y(self,"customElements",{configurable:!0,value:{define:function(e,t){if(N.has(e))throw new p('the name "'.concat(e,'" has already been used with this registry'));E.set(t,e),M.set(e,t.prototype),N.set(e,t),C.push(e),P(e).then((function(){S(s.querySelectorAll(e))})),O.get(e)._(t)},get:function(e){return N.get(e)},whenDefined:P}}),y(c.prototype=f.prototype,"constructor",{value:c}),y(self,"HTMLElement",{configurable:!0,value:c}),y(s,"createElement",{configurable:!0,value:function(e,t){var n=t&&t.is,r=n?N.get(n):N.get(e);return r?new r:m.call(s,e)}}),"isConnected"in h.prototype||y(h.prototype,"isConnected",{configurable:!0,get:function(){return!(this.ownerDocument.compareDocumentPosition(this)&this.DOCUMENT_POSITION_DISCONNECTED)}})}}();