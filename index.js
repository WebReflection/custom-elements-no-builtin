(function () {
  'use strict';

  var Lie = typeof Promise === 'function' ? Promise : function (fn) {
    var queue = [],
        resolved = 0,
        value;
    fn(function ($) {
      value = $;
      resolved = 1;
      queue.splice(0).forEach(then);
    });
    return {
      then: then
    };

    function then(fn) {
      return resolved ? setTimeout(fn, 0, value) : queue.push(fn), this;
    }
  };

  var attributesObserver = (function (whenDefined, MutationObserver) {
    var attributeChanged = function attributeChanged(records) {
      for (var i = 0, length = records.length; i < length; i++) {
        dispatch(records[i]);
      }
    };

    var dispatch = function dispatch(_ref) {
      var target = _ref.target,
          attributeName = _ref.attributeName,
          oldValue = _ref.oldValue;
      target.attributeChangedCallback(attributeName, oldValue, target.getAttribute(attributeName));
    };

    return function (target, is) {
      var attributeFilter = target.constructor.observedAttributes;

      if (attributeFilter) {
        whenDefined(is).then(function () {
          new MutationObserver(attributeChanged).observe(target, {
            attributes: true,
            attributeOldValue: true,
            attributeFilter: attributeFilter
          });

          for (var i = 0, length = attributeFilter.length; i < length; i++) {
            if (target.hasAttribute(attributeFilter[i])) dispatch({
              target: target,
              attributeName: attributeFilter[i],
              oldValue: null
            });
          }
        });
      }

      return target;
    };
  });

  var keys = Object.keys;
  var expando = function expando(element) {
    var key = keys(element);
    var value = [];
    var length = key.length;

    for (var i = 0; i < length; i++) {
      value[i] = element[key[i]];
      delete element[key[i]];
    }

    return function () {
      for (var _i = 0; _i < length; _i++) {
        element[key[_i]] = value[_i];
      }
    };
  };

  var _self = self,
      document = _self.document,
      MutationObserver = _self.MutationObserver,
      Set = _self.Set,
      WeakMap = _self.WeakMap;

  var elements = function elements(element) {
    return 'querySelectorAll' in element;
  };

  var filter = [].filter;
  var qsaObserver = (function (options) {
    var live = new WeakMap();

    var callback = function callback(records) {
      var query = options.query;

      if (query.length) {
        for (var i = 0, length = records.length; i < length; i++) {
          loop(filter.call(records[i].addedNodes, elements), true, query);
          loop(filter.call(records[i].removedNodes, elements), false, query);
        }
      }
    };

    var drop = function drop(elements) {
      for (var i = 0, length = elements.length; i < length; i++) {
        live["delete"](elements[i]);
      }
    };

    var flush = function flush() {
      callback(observer.takeRecords());
    };

    var loop = function loop(elements, connected, query) {
      var set = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Set();

      var _loop = function _loop(_selectors, _element, i, length) {
        // guard against repeated elements within nested querySelectorAll results
        if (!set.has(_element = elements[i])) {
          set.add(_element);

          if (connected) {
            for (var q, m = matches(_element), _i = 0, _length = query.length; _i < _length; _i++) {
              if (m.call(_element, q = query[_i])) {
                if (!live.has(_element)) live.set(_element, new Set());
                _selectors = live.get(_element); // guard against selectors that were handled already

                if (!_selectors.has(q)) {
                  _selectors.add(q);

                  options.handle(_element, connected, q);
                }
              }
            }
          } // guard against elements that never became live
          else if (live.has(_element)) {
              _selectors = live.get(_element);
              live["delete"](_element);

              _selectors.forEach(function (q) {
                options.handle(_element, connected, q);
              });
            }

          loop(querySelectorAll(_element), connected, query, set);
        }

        selectors = _selectors;
        element = _element;
      };

      for (var selectors, element, i = 0, length = elements.length; i < length; i++) {
        _loop(selectors, element, i);
      }
    };

    var matches = function matches(element) {
      return element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
    };

    var parse = function parse(elements) {
      var connected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      loop(elements, connected, options.query);
    };

    var querySelectorAll = function querySelectorAll(root) {
      return query.length ? root.querySelectorAll(query) : query;
    };

    var observer = new MutationObserver(callback);
    var root = options.root || document;
    var query = options.query;
    observer.observe(root, {
      childList: true,
      subtree: true
    });
    parse(querySelectorAll(root));
    return {
      drop: drop,
      flush: flush,
      observer: observer,
      parse: parse
    };
  });

  if (!self.customElements) {
    var HTMLBuiltIn = function HTMLBuiltIn() {
      var constructor = this.constructor;
      if (!classes.has(constructor)) throw new _TypeError('Illegal constructor');
      var is = classes.get(constructor);
      if (override) return augment(override, is);
      var element = createElement.call(document$1, is);
      return augment(setPrototypeOf(element, constructor.prototype), is);
    };

    var _self$1 = self,
        document$1 = _self$1.document,
        HTMLElement = _self$1.HTMLElement,
        Node = _self$1.Node,
        _Map = _self$1.Map,
        MutationObserver$1 = _self$1.MutationObserver,
        _Object = _self$1.Object,
        _Error = _self$1.Error,
        _TypeError = _self$1.TypeError;
    var createElement = document$1.createElement;
    var defineProperty = _Object.defineProperty,
        setPrototypeOf = _Object.setPrototypeOf;
    var classes = new _Map();
    var defined = new _Map();
    var prototypes = new _Map();
    var registry = new _Map();
    var query = [];

    var handle = function handle(element, connected, selector) {
      var proto = prototypes.get(selector);

      if (connected && !proto.isPrototypeOf(element)) {
        var redefine = expando(element);
        override = setPrototypeOf(element, proto);

        try {
          new proto.constructor();
        } finally {
          override = null;
          redefine();
        }
      }

      var method = "".concat(connected ? '' : 'dis', "connectedCallback");
      if (method in proto) element[method]();
    };

    var _qsaObserver = qsaObserver({
      query: query,
      handle: handle
    }),
        parse = _qsaObserver.parse;

    var override = null;

    var whenDefined = function whenDefined(name) {
      if (!defined.has(name)) {
        var _,
            $ = new Lie(function ($) {
          _ = $;
        });

        defined.set(name, {
          $: $,
          _: _
        });
      }

      return defined.get(name).$;
    };

    var augment = attributesObserver(whenDefined, MutationObserver$1);
    defineProperty(self, 'customElements', {
      configurable: true,
      value: {
        define: function define(is, Class) {
          if (registry.has(is)) throw new _Error("the name \"".concat(is, "\" has already been used with this registry"));
          classes.set(Class, is);
          prototypes.set(is, Class.prototype);
          registry.set(is, Class);
          query.push(is);
          whenDefined(is).then(function () {
            parse(document$1.querySelectorAll(is));
          });

          defined.get(is)._(Class);
        },
        get: function get(is) {
          return registry.get(is);
        },
        whenDefined: whenDefined
      }
    });
    defineProperty(HTMLBuiltIn.prototype = HTMLElement.prototype, 'constructor', {
      value: HTMLBuiltIn
    });
    defineProperty(self, 'HTMLElement', {
      configurable: true,
      value: HTMLBuiltIn
    });
    defineProperty(document$1, 'createElement', {
      configurable: true,
      value: function value(name, options) {
        var is = options && options.is;
        var Class = is ? registry.get(is) : registry.get(name);
        return Class ? new Class() : createElement.call(document$1, name);
      }
    }); // in case ShadowDOM is used through a polyfill, to avoid issues
    // with builtin extends within shadow roots

    if (!('isConnected' in Node.prototype)) defineProperty(Node.prototype, 'isConnected', {
      configurable: true,
      get: function get() {
        return !(this.ownerDocument.compareDocumentPosition(this) & this.DOCUMENT_POSITION_DISCONNECTED);
      }
    });
  }

}());
