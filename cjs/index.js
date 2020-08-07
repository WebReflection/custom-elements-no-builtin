'use strict';
const Lie = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@webreflection/lie'));
const attributesObserver = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@webreflection/custom-elements-attributes'));
const qsaObserver = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('qsa-observer'));

if (!self.customElements) {

  const {document, HTMLElement, MutationObserver, Object} = self;
  const {createElement} = document;
  const {defineProperty, setPrototypeOf} = Object;

  const classes = new Map;
  const defined = new Map;
  const prototypes = new Map;
  const registry = new Map;

  const query = [];

  const handle = (element, connected, selector) => {
    const proto = prototypes.get(selector);
    if (connected && !proto.isPrototypeOf(element)) {
      override = setPrototypeOf(element, proto);
      try { new proto.constructor; }
      finally { override = null; }
    }
    const method = `${connected ? '' : 'dis'}connectedCallback`;
    if (method in proto)
      element[method]();
  };

  const {parse} = qsaObserver({query, handle});

  let override = null;

  const whenDefined = name => {
    if (!defined.has(name)) {
      let _, $ = new Lie($ => { _ = $; });
      defined.set(name, {$, _});
    }
    return defined.get(name).$;
  };

  const augment = attributesObserver(whenDefined, MutationObserver);

  defineProperty(self, 'customElements', {
    configurable: true,
    value: {
      define: (is, Class) => {
        if (registry.has(is))
          throw new Error(`the name "${is}" has already been used with this registry`);
        classes.set(Class, is);
        prototypes.set(is, Class.prototype);
        registry.set(is, Class);
        query.push(is);
        whenDefined(is).then(() => {
          parse(document.querySelectorAll(is));
        });
        defined.get(is)._();
      },
      get: selector => registry.get(selector),
      whenDefined
    }
  });

  (HTMLBuiltIn.prototype = HTMLElement.prototype).constructor = HTMLBuiltIn;

  defineProperty(self, 'HTMLElement', {
    configurable: true,
    value: HTMLBuiltIn
  });

  defineProperty(document, 'createElement', {
    configurable: true,
    value(name, options) {
      const is = options && options.is;
      return is ? new (registry.get(is)) : createElement.call(document, name);
    }
  });

  // in case ShadowDOM is used through a polyfill, to avoid issues
  // with builtin extends within shadow roots
  if (!('isConnected' in Node.prototype))
    defineProperty(Node.prototype, 'isConnected', {
      configurable: true,
      get() {
        return !(
          this.ownerDocument.compareDocumentPosition(this) &
          this.DOCUMENT_POSITION_DISCONNECTED
        );
      }
    });

  function HTMLBuiltIn() {
    const {constructor} = this;
    if (!classes.has(constructor))
      throw new TypeError('Illegal constructor');
    const is = classes.get(constructor);
    if (override)
      return augment(override, is);
    const element = createElement.call(document, is);
    return augment(setPrototypeOf(element, constructor.prototype), is);
  }

}
