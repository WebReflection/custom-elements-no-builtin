'use strict';
const Lie = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('@webreflection/lie'));
const attributesObserver = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('@webreflection/custom-elements-attributes'));
const {expando} = require('@webreflection/custom-elements-upgrade');
const qsaObserver = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('qsa-observer'));

if (!self.customElements) {

  const {
    document, HTMLElement, Node,
    Map, MutationObserver, Object,
    Error, TypeError
  } = self;
  
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
      const redefine = expando(element);
      override = setPrototypeOf(element, proto);
      try { new proto.constructor; }
      finally {
        override = null;
        redefine();
      }
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
        defined.get(is)._(Class);
      },
      get: is => registry.get(is),
      whenDefined
    }
  });

  defineProperty(
    HTMLBuiltIn.prototype = HTMLElement.prototype,
    'constructor',
    {value: HTMLBuiltIn}
  );

  defineProperty(self, 'HTMLElement', {
    configurable: true,
    value: HTMLBuiltIn
  });

  defineProperty(document, 'createElement', {
    configurable: true,
    value(name, options) {
      const is = options && options.is;
      const Class = is ? registry.get(is) : registry.get(name);
      return Class ? new Class :  createElement.call(document, name);
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
