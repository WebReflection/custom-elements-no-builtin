!function(){"use strict";var e="function"==typeof Promise?Promise:function(e){var t,n=[],r=0;return e((function(e){t=e,r=1,n.splice(0).forEach(o)})),{then:o};function o(e){return r?setTimeout(e,0,t):n.push(e),this}},t=function(e){return"querySelectorAll"in e},n=[].filter;if(!self.customElements){var r=function(){var e=this.constructor;if(!g.has(e))throw new f("Illegal constructor");var t=g.get(e);if(E)return O(E,t);var n=h.call(u,t);return O(v(n,e.prototype),t)},o=self,u=o.document,a=o.HTMLElement,i=o.Map,l=o.MutationObserver,c=o.Object,s=o.Error,f=o.TypeError,h=u.createElement,d=c.defineProperty,v=c.setPrototypeOf,g=new i,p=new i,b=new i,y=new i,m=[],w=function(e){var r=new WeakMap,o=function(r){var o=e.query;if(o.length)for(var a=0,i=r.length;a<i;a++)u(n.call(r[a].addedNodes,t),!0,o),u(n.call(r[a].removedNodes,t),!1,o)},u=function t(n,o,u){for(var i,l,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new Set,s=function(s,f,h,d){if(!c.has(f=n[h])){if(c.add(f),o)for(var v,g=a(f),p=0,b=u.length;p<b;p++)g.call(f,v=u[p])&&(r.has(f)||r.set(f,new Set),(s=r.get(f)).has(v)||(s.add(v),e.handle(f,o,v)));else r.has(f)&&(s=r.get(f),r.delete(f),s.forEach((function(t){e.handle(f,o,t)})));t(f.querySelectorAll(u),o,u,c)}i=s,l=f},f=0,h=n.length;f<h;f++)s(i,l,f)},a=function(e){return e.matches||e.webkitMatchesSelector||e.msMatchesSelector},i=function(t){u(t,!(arguments.length>1&&void 0!==arguments[1])||arguments[1],e.query)},l=new MutationObserver(o),c=e.root||document,s=e.query;return l.observe(c,{childList:!0,subtree:!0}),s.length&&i(c.querySelectorAll(s)),{drop:function(e){for(var t=0,n=e.length;t<n;t++)r.delete(e[t])},flush:function(){o(l.takeRecords())},observer:l,parse:i}}({query:m,handle:function(e,t,n){var r=b.get(n);if(t&&!r.isPrototypeOf(e)){E=v(e,r);try{new r.constructor}finally{E=null}}var o="".concat(t?"":"dis","connectedCallback");o in r&&e[o]()}}).parse,E=null,N=function(t){if(!p.has(t)){var n,r=new e((function(e){n=e}));p.set(t,{$:r,_:n})}return p.get(t).$},O=function(e,t){var n=function(e){for(var t=0,n=e.length;t<n;t++)r(e[t])},r=function(e){var t=e.target,n=e.attributeName,r=e.oldValue;t.attributeChangedCallback(n,r,t.getAttribute(n))};return function(o,u){var a=o.constructor.observedAttributes;return a&&e(u).then((function(){new t(n).observe(o,{attributes:!0,attributeOldValue:!0,attributeFilter:a});for(var e=0,u=a.length;e<u;e++)o.hasAttribute(a[e])&&r({target:o,attributeName:a[e],oldValue:null})})),o}}(N,l);d(self,"customElements",{configurable:!0,value:{define:function(e,t){if(y.has(e))throw new s('the name "'.concat(e,'" has already been used with this registry'));g.set(t,e),b.set(e,t.prototype),y.set(e,t),m.push(e),N(e).then((function(){w(u.querySelectorAll(e))})),p.get(e)._()},get:function(e){return y.get(e)},whenDefined:N}}),(r.prototype=a.prototype).constructor=r,d(self,"HTMLElement",{configurable:!0,value:r}),d(u,"createElement",{configurable:!0,value:function(e,t){var n=t&&t.is;return n?new(y.get(n)):h.call(u,e)}}),"isConnected"in Node.prototype||d(Node.prototype,"isConnected",{configurable:!0,get:function(){return!(this.ownerDocument.compareDocumentPosition(this)&this.DOCUMENT_POSITION_DISCONNECTED)}})}}();