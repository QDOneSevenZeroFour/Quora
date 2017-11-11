/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(17)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.5.3
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.functionalOptions = undefined;
  this.functionalScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if ("development" !== 'production' && inject) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if (inBrowser && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      data && data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("development" !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ("development" !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject).filter(function (key) {
          /* istanbul ignore next */
          return Object.getOwnPropertyDescriptor(inject, key).enumerable
        })
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ("development" !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  // static trees can be rendered once and cached on the contructor options
  // so every instance shares the same cached trees
  var options = this.$options;
  var cached = options.cached || (options.cached = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = options.staticRenderFns[index].call(this._renderProxy, null, this);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.functionalScopeId = options._scopeId;
        vnode.functionalContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.functionalContext = contextVm;
    vnode.functionalOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ("development" !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        if (slot._rendered) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && cached$$1 !== current) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.exclude && matches(this.exclude, name)) ||
        (this.include && !matches(this.include, name))
      )) {
        return vnode
      }

      var ref = this;
      var cache = ref.cache;
      var keys = ref.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.3';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(
            config.ignoredElements.length &&
            config.ignoredElements.some(function (ignore) {
              return isRegExp(ignore)
                ? ignore.test(tag)
                : ignore === tag
            })
          ) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.functionalScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.functionalContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if ("development" !== 'production' && !vnodeToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed
              ) {
                bailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed
              ) {
                bailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE9 || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers && modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + value + "=$$a.concat([$$v]))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers) && modifiers.number) {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$options._renderChildren;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$1 = 0; i$1 < postTransforms.length; i$1++) {
        postTransforms[i$1](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "development" !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if ("development" !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (map['v-model'] && (map['v-bind:type'] || map[':type'])) {
      var typeBinding = getBindingAttr(el, 'type');
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

var model$2 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$2
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if ("development" !== 'production' &&
      name === 'click' &&
      handler && handler.modifiers && handler.modifiers.right
    ) {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var code = keyCodes[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(code)) + "," +
    "$event.key)"
  )
}

/*  */

function on (el, dir) {
  if ("development" !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ("development" !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

return Vue$3;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), __webpack_require__(9).setImmediate))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAHCAQAAAB0Z3/WAAAAhElEQVQI12P4zwCBZzTPHDijBuPBBC3PvD/z/8ybM6ZIwmd8zny/9OnDuUufznw94wYVPpNw5s/V97+W/9f7tfzquzO/zkQBhc9Un/l38/WfGf95gap4/0y7+erMvzMFDLdX3n36r+0/O9Qy9n8td5/cXM3wP+p/8X8mmAuAkOl/4f9EAGutYnsMlYtgAAAAAElFTkSuQmCC"

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_muse_ui__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_muse_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_muse_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_header_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_nav_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_index_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_topic_vue__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_discover_vue__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__css_index_css__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__css_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__css_index_css__);




//import "weui"
//
//import MuseUI from 'muse-ui'
//import 'muse-ui/dist/muse-ui.css'
//Vue.use(MuseUI)

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_3_vuex__["a" /* default */]);











//var store = new Vuex.Store({
//	state:[{
//		bol:false;
//	}],
//	getters:{
//		getBol:function(state){
//			return state.bol;
//		}
//	}
//})

var router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
	routes: [{
		path: '/index',
		component:__WEBPACK_IMPORTED_MODULE_6__components_index_vue__["a" /* default */],
	},{
		path: '/topic',
		component:__WEBPACK_IMPORTED_MODULE_7__components_topic_vue__["a" /* default */],
	},{
		path: '/discover',
		component:__WEBPACK_IMPORTED_MODULE_8__components_discover_vue__["a" /* default */],
	},{
		path:'/',
		redirect:'/index',
	}]
})
new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
	el: "#app",
	data: {
		
	},
	router:router,
	template: `
		<div>
			<xheader></xheader>
			<xnav></xnav>
			<router-view></router-view>
		</div>
	`,
	components: {
		xheader: __WEBPACK_IMPORTED_MODULE_4__components_header_vue__["a" /* default */],
		xnav: __WEBPACK_IMPORTED_MODULE_5__components_nav_vue__["a" /* default */],
		xindex: __WEBPACK_IMPORTED_MODULE_6__components_index_vue__["a" /* default */],
		xtopic: __WEBPACK_IMPORTED_MODULE_7__components_topic_vue__["a" /* default */],
		xdiscover: __WEBPACK_IMPORTED_MODULE_8__components_discover_vue__["a" /* default */]
	}
})

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(10);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), __webpack_require__(3)))

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Muse UI v2.1.0 (https://github.com/myronliu347/vue-carbon)
 * (c) 2017 Myron Liu 
 * Released under the MIT License.
 */
!function(t,e){ true?module.exports=e(__webpack_require__(5)):"function"==typeof define&&define.amd?define(["vue"],e):"object"==typeof exports?exports.MuseUI=e(require("vue")):t.MuseUI=e(t.Vue)}(this,function(t){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=583)}([function(t,e){t.exports=function(t,e,n,i){var r,a=t=t||{},o=typeof t.default;"object"!==o&&"function"!==o||(r=t,a=t.default);var s="function"==typeof a?a.options:a;if(e&&(s.render=e.render,s.staticRenderFns=e.staticRenderFns),n&&(s._scopeId=n),i){var l=Object.create(s.computed||null);Object.keys(i).forEach(function(t){var e=i[t];l[t]=function(){return e}}),s.computed=l}return{esModule:r,exports:a,options:s}}},function(t,e,n){"use strict";function i(t){return void 0!==t&&null!==t}function r(t){return void 0===t||null===t}function a(t){for(var e=1,n=arguments.length;e<n;e++){var i=arguments[e];for(var r in i)if(i.hasOwnProperty(r)){var a=i[r];void 0!==a&&(t[r]=a)}}return t}function o(t){var e=String(t);return e&&e.indexOf("%")===-1&&e.indexOf("px")===-1&&(e+="px"),e}function s(){for(var t="undefined"!=typeof navigator?navigator.userAgent:"",e=["Android","iPhone","Windows Phone","iPad","iPod"],n=!0,i=0;i<e.length;i++)if(t.indexOf(e[i])>0){n=!1;break}return n}function l(){if(!s()){var t=[],e=void 0!==("undefined"==typeof window?"undefined":d()(window))&&window.devicePixelRatio||1;t.push("pixel-ratio-"+Math.floor(e)),e>=2&&t.push("retina");var n=document.getElementsByTagName("html")[0];t.forEach(function(t){return n.classList.add(t)})}}function u(t){var e=[];if(!t)return e;if(t instanceof Array)e=e.concat(t);else if(t instanceof Object)for(var n in t)t[n]&&e.push(n);else e=e.concat(t.split(" "));return e}var c=n(76),d=n.n(c),f=n(68),h=n.n(f),p=n(142);n.d(e,"d",function(){return v}),e.c=i,e.h=r,e.b=a,e.e=o,e.g=s,e.a=l,e.f=u;var m=h()(p),v=function(t){return t?m.indexOf(t)!==-1?p[t]:t:""}},function(t,e,n){"use strict";var i=n(438),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var i=n(56)("wks"),r=n(35),a=n(7).Symbol,o="function"==typeof a;(t.exports=function(t){return i[t]||(i[t]=o&&a[t]||(o?a:r)("Symbol."+t))}).store=i},function(t,e,n){"use strict";function i(){v||("undefined"!=typeof window&&window.addEventListener("keydown",function(t){m="tab"===d()(t)}),v=!0)}var r=n(254),a=n.n(r),o=n(38),s=n.n(o),l=n(90),u=n.n(l),c=n(21),d=n.n(c),f=n(1),h=n(64),p=n(9),m=!1,v=!1;e.a={mixins:[p.a],props:{href:{type:String,default:""},disabled:{type:Boolean,default:!1},disableFocusRipple:{type:Boolean,default:!1},disableKeyboardFocus:{type:Boolean,default:!1},disableTouchRipple:{type:Boolean,default:!1},rippleColor:{type:String,default:""},rippleOpacity:{type:Number},centerRipple:{type:Boolean,default:!0},wrapperClass:{type:String,default:""},wrapperStyle:{type:[String,Object]},containerElement:{type:String},tabIndex:{type:Number,default:0},type:{type:String,default:"button"},keyboardFocused:{type:Boolean,default:!1}},data:function(){return{hover:!1,isKeyboardFocused:!1}},computed:{buttonClass:function(){var t=[];return this.disabled&&t.push("disabled"),this.disabled||!this.hover&&!this.isKeyboardFocused||t.push("hover"),t.join(" ")}},beforeMount:function(){var t=this.disabled,e=this.disableKeyboardFocus,n=this.keyboardFocused;t||!n||e||(this.isKeyboardFocused=!0)},mounted:function(){i(),this.isKeyboardFocused&&(this.$el.focus(),this.$emit("keyboardFocus",!0))},beforeUpdate:function(){(this.disabled||this.disableKeyboardFocus)&&this.isKeyboardFocused&&(this.isKeyboardFocused=!1,this.$emit("keyboardFocus",!1))},beforeDestory:function(){this.cancelFocusTimeout()},methods:{handleHover:function(t){!this.disabled&&n.i(f.g)()&&(this.hover=!0,this.$emit("hover",t))},handleOut:function(t){!this.disabled&&n.i(f.g)()&&(this.hover=!1,this.$emit("hoverExit",t))},removeKeyboardFocus:function(t){this.isKeyboardFocused&&(this.isKeyboardFocused=!1,this.$emit("KeyboardFocus",!1))},setKeyboardFocus:function(t){this.isKeyboardFocused||(this.isKeyboardFocused=!0,this.$emit("KeyboardFocus",!0))},cancelFocusTimeout:function(){this.focusTimeout&&(clearTimeout(this.focusTimeout),this.focusTimeout=null)},handleKeydown:function(t){this.disabled||this.disableKeyboardFocus||("enter"===d()(t)&&this.isKeyboardFocused&&this.$el.click(),"esc"===d()(t)&&this.isKeyboardFocused&&this.removeKeyboardFocus(t))},handleKeyup:function(t){this.disabled||this.disableKeyboardFocus||"space"===d()(t)&&this.isKeyboardFocused},handleFocus:function(t){var e=this;this.disabled||this.disableKeyboardFocus||(this.focusTimeout=setTimeout(function(){m&&(e.setKeyboardFocus(t),m=!1)},150))},handleBlur:function(t){this.cancelFocusTimeout(),this.removeKeyboardFocus(t)},handleClick:function(t){this.disabled||(m=!1,this.$el.blur(),this.removeKeyboardFocus(t),this.$emit("click",t))},getTagName:function(){var t="undefined"!=typeof navigator&&navigator.userAgent.toLowerCase().indexOf("firefox")!==-1,e=t?"span":"button";switch(!0){case!!this.to:return"router-link";case!!this.href:return"a";case!!this.containerElement:return this.containerElement;default:return e}},createButtonChildren:function(t){var e=this.isKeyboardFocused,n=this.disabled,i=this.disableFocusRipple,r=this.disableKeyboardFocus,a=this.rippleColor,o=this.rippleOpacity,l=this.disableTouchRipple,c=[];c=c.concat(this.$slots.default);var d=!e||h.a.disableFocusRipple||n||i||r?void 0:t(u.a,{color:a,opacity:o});return c=n||l||h.a.disableTouchRipple?[t("div",{class:this.wrapperClass,style:this.wrapperStyle},this.$slots.default)]:[t(s.a,{class:this.wrapperClass,style:this.wrapperStyle,props:{color:this.rippleColor,centerRipple:this.centerRipple,opacity:this.rippleOpacity}},this.$slots.default)],c.unshift(d),c}},watch:{disabled:function(t){t||(this.hover=!1)}},render:function(t){var e={disabled:this.disabled,type:this.type},n=this.to?{to:this.to,tag:this.tag,activeClass:this.activeClass,event:this.event,exact:this.exact,append:this.append,replace:this.replace}:{};this.href&&(e.href=this.disabled?"javascript:;":this.href),this.disabled||(e.tabIndex=this.tabIndex);var i=this.getTagName();return t(i,a()({class:this.buttonClass,domProps:e,props:n,style:{"user-select":this.disabled?"":"none","-webkit-user-select":this.disabled?"":"none",outline:"none",cursor:this.disabled?"":"pointer",appearance:"none"}},"router-link"===i?"nativeOn":"on",{mouseenter:this.handleHover,mouseleave:this.handleOut,touchend:this.handleOut,touchcancel:this.handleOut,click:this.handleClick,focus:this.handleFocus,blur:this.handleBlur,keydown:this.handleKeydown,keyup:this.handleKeyup}),this.createButtonChildren(t))}}},function(t,e,n){t.exports=!n(14)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var i=n(12),r=n(79),a=n(59),o=Object.defineProperty;e.f=n(6)?Object.defineProperty:function(t,e,n){if(i(t),e=a(e,!0),i(n),r)try{return o(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){"use strict";e.a={props:{to:{type:[String,Object]},tag:{type:String,default:"a"},activeClass:{type:String,default:"router-link-active"},event:{type:[String,Array],default:"click"},exact:Boolean,append:Boolean,replace:Boolean}}},function(t,e,n){var i=n(8),r=n(32);t.exports=n(6)?function(t,e,n){return i.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){"use strict";var i=n(450),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){var i=n(18);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var i=n(7),r=n(3),a=n(29),o=n(10),s="prototype",l=function(t,e,n){var u,c,d,f=t&l.F,h=t&l.G,p=t&l.S,m=t&l.P,v=t&l.B,y=t&l.W,g=h?r:r[e]||(r[e]={}),b=g[s],x=h?i:p?i[e]:(i[e]||{})[s];h&&(n=e);for(u in n)(c=!f&&x&&void 0!==x[u])&&u in g||(d=c?x[u]:n[u],g[u]=h&&"function"!=typeof x[u]?n[u]:v&&c?a(d,i):y&&x[u]==d?function(t){var e=function(e,n,i){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,i)}return t.apply(this,arguments)};return e[s]=t[s],e}(d):m&&"function"==typeof d?a(Function.call,d):d,m&&((g.virtual||(g.virtual={}))[u]=d,t&l.R&&b&&!b[u]&&o(b,u,d)))};l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,l.U=64,l.R=128,t.exports=l},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var i=n(49),r=n(30);t.exports=function(t){return i(r(t))}},function(t,e,n){"use strict";var i=n(473),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports={}},function(t,e,n){var i=n(83),r=n(47);t.exports=Object.keys||function(t){return i(t,r)}},function(t,e){e=t.exports=function(t){if(t&&"object"==typeof t){var e=t.which||t.keyCode||t.charCode;e&&(t=e)}if("number"==typeof t)return a[t];var r=String(t),o=n[r.toLowerCase()];if(o)return o;var o=i[r.toLowerCase()];return o?o:1===r.length?r.charCodeAt(0):void 0};var n=e.code=e.codes={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,"pause/break":19,"caps lock":20,esc:27,space:32,"page up":33,"page down":34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,delete:46,command:91,"left command":91,"right command":93,"numpad *":106,"numpad +":107,"numpad -":109,"numpad .":110,"numpad /":111,"num lock":144,"scroll lock":145,"my computer":182,"my calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},i=e.aliases={windows:91,"⇧":16,"⌥":18,"⌃":17,"⌘":91,ctl:17,control:17,option:18,pause:19,break:19,caps:20,return:13,escape:27,spc:32,pgup:33,pgdn:34,ins:45,del:46,cmd:91};/*!
 * Programatically add the following
 */
for(r=97;r<123;r++)n[String.fromCharCode(r)]=r-32;for(var r=48;r<58;r++)n[r-48]=r;for(r=1;r<13;r++)n["f"+r]=r+111;for(r=0;r<10;r++)n["numpad "+r]=r+96;var a=e.names=e.title={};for(r in n)a[n[r]]=r;for(var o in i)n[o]=i[o]},function(t,e,n){"use strict";function i(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ampm",n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!t)return"";var i=t.getHours(),r=t.getMinutes().toString();if("ampm"===e){var a=i<12;i%=12;var o=a?" am":" pm";return i=(i||12).toString(),r.length<2&&(r="0"+r),n&&"12"===i&&"00"===r?" pm"===o?"12 noon":"12 midnight":i+("00"===r?"":":"+r)+o}return i=i.toString(),i.length<2&&(i="0"+i),r.length<2&&(r="0"+r),i+":"+r}function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ampm",n=(arguments.length>2&&void 0!==arguments[2]&&arguments[2],new Date);if(!t)return n;var i="",r=-1;"ampm"===e&&(r=t.indexOf("am"),r===-1&&(r=t.indexOf("midnight")),r!==-1?i="am":(i="pm",(r=t.indexOf("pm"))===-1&&(r=t.indexOf("noon")))),r!==-1&&(t=t.substring(0,r).trim());var a=t.split(":"),o=Number(a[0].trim());"pm"===i&&(o+=12),o>=24&&(o=0);var s=a.length>1?Number(a[1]):0;return n.setMinutes(s),n.setHours(o),n}function a(t){return 57.29577951308232*t}function o(t){var e=t.target,n=e.getBoundingClientRect();return{offsetX:t.clientX-n.left,offsetY:t.clientY-n.top}}function s(t){return"hour"===t.type&&(t.value<1||t.value>12)}e.b=i,e.a=r,e.d=a,e.c=o,e.e=s},function(t,e,n){"use strict";var i=n(430),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(439),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(92),r=n.n(i);n.d(e,"menu",function(){return r.a});var a=n(93),o=n.n(a);n.d(e,"menuItem",function(){return o.a})},function(t,e,n){"use strict";function i(t){var e=r(t);return e.setMonth(e.getMonth()+1),e.setDate(e.getDate()-1),e.getDate()}function r(t){return new Date(t.getFullYear(),t.getMonth(),1)}function a(t,e){for(var n=[],r=i(t),a=[],o=[],s=1;s<=r;s++)n.push(new Date(t.getFullYear(),t.getMonth(),s));var l=function(t){for(var e=7-t.length,n=0;n<e;++n)t[a.length?"push":"unshift"](null);a.push(t)};return n.forEach(function(t){o.length>0&&t.getDay()===e&&(l(o),o=[]),o.push(t),n.indexOf(t)===n.length-1&&l(o)}),a}function o(t,e){var n=u(t);return n.setDate(t.getDate()+e),n}function s(t,e){var n=u(t);return n.setMonth(t.getMonth()+e),n}function l(t,e){var n=u(t);return n.setFullYear(t.getFullYear()+e),n}function u(t){return new Date(t.getTime())}function c(t){var e=u(t);return e.setHours(0,0,0,0),e}function d(t,e){var n=c(t),i=c(e);return n.getTime()<i.getTime()}function f(t,e){var n=c(t),i=c(e);return n.getTime()>i.getTime()}function h(t,e,n){return!d(t,e)&&!f(t,n)}function p(t,e){return t&&e&&t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function m(t,e){var n=void 0;return n=12*(t.getFullYear()-e.getFullYear()),n+=t.getMonth(),n-=e.getMonth()}function v(t,e){e=e||"yyyy-MM-dd",t=t||new Date;var n=e;return n=n.replace(/yyyy|YYYY/,t.getFullYear()),n=n.replace(/yy|YY/,t.getYear()%100>9?(t.getYear()%100).toString():"0"+t.getYear()%100),n=n.replace(/MM/,x(t.getMonth()+1)),n=n.replace(/M/g,t.getMonth()+1),n=n.replace(/w|W/g,C.dayAbbreviation[t.getDay()]),n=n.replace(/dd|DD/,x(t.getDate())),n=n.replace(/d|D/g,t.getDate()),n=n.replace(/hh|HH/,x(t.getHours())),n=n.replace(/h|H/g,t.getHours()),n=n.replace(/mm/,x(t.getMinutes())),n=n.replace(/m/g,t.getMinutes()),n=n.replace(/ss|SS/,x(t.getSeconds())),n=n.replace(/s|S/g,t.getSeconds())}function y(t,e){for(var n,i,r=0,a=0,o="",s="",l=new Date,u=l.getFullYear(),c=l.getMonth()+1,d=1,f=l.getHours(),h=l.getMinutes(),p=l.getSeconds(),m="";a<e.length;){for(o=e.charAt(a),s="";e.charAt(a)===o&&a<e.length;)s+=e.charAt(a++);if("yyyy"===s||"YYYY"===s||"yy"===s||"YY"===s||"y"===s||"Y"===s){if("yyyy"!==s&&"YYYY"!==s||(n=4,i=4),"yy"!==s&&"YY"!==s||(n=2,i=2),"y"!==s&&"Y"!==s||(n=2,i=4),null==(u=g(t,r,n,i)))return 0;r+=u.length,2===u.length&&(u=u>70?u-0+1900:u-0+2e3)}else if("MMM"===s||"NNN"===s){c=0;for(var v=0;v<S.length;v++){var y=S[v];if(t.substring(r,r+y.length).toLowerCase()===y.toLowerCase()&&("MMM"===s||"NNN"===s&&v>11)){c=v+1,c>12&&(c-=12),r+=y.length;break}}if(c<1||c>12)return 0}else if("EE"===s||"E"===s)for(var b=0;b<w.length;b++){var x=w[b];if(t.substring(r,r+x.length).toLowerCase()===x.toLowerCase()){r+=x.length;break}}else if("MM"===s||"M"===s){if(null==(c=g(t,r,s.length,2))||c<1||c>12)return 0;r+=c.length}else if("dd"===s||"d"===s||"DD"===s||"D"===s){if(null===(d=g(t,r,s.length,2))||d<1||d>31)return 0;r+=d.length}else if("hh"===s||"h"===s){if(null==(f=g(t,r,s.length,2))||f<1||f>12)return 0;r+=f.length}else if("HH"===s||"H"===s){if(null==(f=g(t,r,s.length,2))||f<0||f>23)return 0;r+=f.length}else if("KK"===s||"K"===s){if(null==(f=g(t,r,s.length,2))||f<0||f>11)return 0;r+=f.length}else if("kk"===s||"k"===s){if(null==(f=g(t,r,s.length,2))||f<1||f>24)return 0;r+=f.length,f--}else if("mm"===s||"m"===s){if(null==(h=g(t,r,s.length,2))||h<0||h>59)return 0;r+=h.length}else if("ss"===s||"s"===s||"SS"===s||"s"===s){if(null==(p=g(t,r,s.length,2))||p<0||p>59)return 0;r+=p.length}else if("u"===s){var C=g(t,r,s.length,3);if(null==C||C<0||C>999)return 0;r+=C.length}else if("a"===s){if("am"===t.substring(r,r+2).toLowerCase())m="AM";else{if("pm"!==t.substring(r,r+2).toLowerCase())return 0;m="PM"}r+=2}else{if(t.substring(r,r+s.length)!==s)return 0;r+=s.length}}if(2===c)if(u%4==0&&u%100!=0||u%400==0){if(d>29)return 0}else if(d>28)return 0;return(4===c||6===c||9===c||11===c)&&d>30?0:(f<12&&"PM"===m?f=f-0+12:f>11&&"AM"===m&&(f-=12),new Date(u,c-1,d,f,h,p))}function g(t,e,n,i){for(var r=i;r>=n;r--){var a=t.substring(e,e+r);if(a.length<n)return null;if(b(a))return a}return null}function b(t){return new RegExp(/^\d+$/).test(t)}function x(t){return t>9?t:"0"+t}n.d(e,"a",function(){return _}),e.j=a,e.i=o,e.g=s,e.d=l,e.e=u,e.h=c,e.l=h,e.k=p,e.f=m,e.c=v,e.b=y;var C={dayAbbreviation:["日","一","二","三","四","五","六"],dayList:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],monthList:["01","02","03","04","05","06","07","08","09","10","11","12"],monthLongList:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]},_={formatDisplay:function(t){var e=t.getDate();return C.monthList[t.getMonth()]+"-"+(e>9?e:"0"+e)+" "+C.dayList[t.getDay()]},formatMonth:function(t){return t.getFullYear()+" "+C.monthLongList[t.getMonth()]},getWeekDayArray:function(t){for(var e=[],n=[],i=C.dayAbbreviation,r=0;r<i.length;r++)r<t?n.push(i[r]):e.push(i[r]);return e.concat(n)}},S=["January","February","March","April","May","June","July","August","September","October","November","December","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],w=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},function(t,e,n){"use strict";var i=n(43),r=n(28);e.a={props:{open:{type:Boolean,default:!1},overlay:{type:Boolean,default:!0},overlayOpacity:{type:Number,default:.4},overlayColor:{type:String,default:"#000"},escPressClose:{type:Boolean,default:!0},appendBody:{type:Boolean,default:!0}},data:function(){return{overlayZIndex:n.i(r.a)(),zIndex:n.i(r.a)()}},methods:{overlayClick:function(t){this.overlay&&this.$emit("close","overlay")},escPress:function(t){this.escPressClose&&this.$emit("close","esc")},clickOutSide:function(t){this.$emit("clickOutSide",t)},setZIndex:function(){var t=this.$el;this.zIndex||(this.zIndex=n.i(r.a)()),t&&(t.style.zIndex=this.zIndex)},bindClickOutSide:function(){var t=this;this._handleClickOutSide||(this._handleClickOutSide=function(e){var n=t.popupEl();n&&n.contains(e.target)||t.clickOutSide(e)}),setTimeout(function(){window.addEventListener("click",t._handleClickOutSide)},0)},unBindClickOutSide:function(){window.removeEventListener("click",this._handleClickOutSide)},resetZIndex:function(){this.overlayZIndex=n.i(r.a)(),this.zIndex=n.i(r.a)()},popupEl:function(){return this.appendBody?this.$refs.popup:this.$el},appendPopupElToBody:function(){var t=this;this.appendBody&&this.$nextTick(function(){var e=t.popupEl();if(!e)return void console.warn("必须有一个 ref=‘popup’ 的元素");document.body.appendChild(e)})}},mounted:function(){this.open&&(i.a.open(this),this.bindClickOutSide(),this.appendPopupElToBody())},updated:function(){this.overlay||this.setZIndex()},beforeDestroy:function(){if(i.a.close(this),this.unBindClickOutSide(),this.appendBody){var t=this.popupEl();if(!t)return;document.body.removeChild(t)}},watch:{open:function(t,e){t!==e&&(t?(this.bindClickOutSide(),this.resetZIndex(),i.a.open(this),this.appendPopupElToBody()):(this.unBindClickOutSide(),i.a.close(this)))}}}},function(t,e,n){"use strict";n.d(e,"a",function(){return r});var i=20141223,r=function(){return i++}},function(t,e,n){var i=n(264);t.exports=function(t,e,n){if(i(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,r){return t.call(e,n,i,r)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var i=n(8).f,r=n(15),a=n(4)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,a)&&i(t,a,{configurable:!0,value:e})}},function(t,e,n){var i=n(30);t.exports=function(t){return Object(i(t))}},function(t,e){var n=0,i=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+i).toString(36))}},function(t,e,n){"use strict";var i=n(287)(!0);n(50)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=i(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){n(291);for(var i=n(7),r=n(10),a=n(19),o=n(4)("toStringTag"),s=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],l=0;l<5;l++){var u=s[l],c=i[u],d=c&&c.prototype;d&&!d[o]&&r(d,o,u),a[u]=a.Array}},function(t,e,n){n(322);var i=n(0)(n(194),n(508),null,null);t.exports=i.exports},function(t,e,n){"use strict";var i=n(426),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(486),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(74),a=i(r);e.default=a.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}},function(t,e,n){"use strict";var i="@@clickoutsideContext";e.a={bind:function(t,e,n){var r=function(r){n.context&&!t.contains(r.target)&&(e.expression?n.context[t[i].methodName](r):t[i].bindingFn(r))};t[i]={documentHandler:r,methodName:e.expression,bindingFn:e.value},setTimeout(function(){document.addEventListener("click",r)},0)},update:function(t,e){t[i].methodName=e.expression,t[i].bindingFn=e.value},unbind:function(t){document.removeEventListener("click",t[i].documentHandler)}}},function(t,e,n){"use strict";var i=n(99),r=n.n(i),a=n(21),o=n.n(a),s=n(69),l=n.n(s),u=r.a.extend(l.a),c={instances:[],overlay:!1,open:function(t){t&&this.instances.indexOf(t)===-1&&(!this.overlay&&t.overlay&&this.showOverlay(t),this.instances.push(t),this.changeOverlayStyle())},close:function(t){var e=this,n=this.instances.indexOf(t);n!==-1&&(this.instances.splice(n,1),r.a.nextTick(function(){0===e.instances.length&&e.closeOverlay(),e.changeOverlayStyle()}))},showOverlay:function(t){var e=this.overlay=new u({el:document.createElement("div")});e.fixed=!0,e.color=t.overlayColor,e.opacity=t.overlayOpacity,e.zIndex=t.overlayZIndex,e.onClick=this.handleOverlayClick.bind(this),document.body.appendChild(e.$el),this.preventScrolling(),r.a.nextTick(function(){e.show=!0})},preventScrolling:function(){if(!this.locked){var t=document.getElementsByTagName("body")[0],e=document.getElementsByTagName("html")[0];this.bodyOverflow=t.style.overflow,this.htmlOverflow=e.style.overflow,t.style.overflow="hidden",e.style.overflow="hidden",this.locked=!0}},allowScrolling:function(){var t=document.getElementsByTagName("body")[0],e=document.getElementsByTagName("html")[0];t.style.overflow=this.bodyOverflow||"",e.style.overflow=this.htmlOverflow||"",this.bodyOverflow=null,this.htmlOverflow=null,this.locked=!1},closeOverlay:function(){if(this.overlay){this.allowScrolling();var t=this.overlay;t.show=!1,this.overlay=null,setTimeout(function(){t.$el.remove(),t.$destroy()},450)}},changeOverlayStyle:function(){var t=this.instances[this.instances.length-1];this.overlay&&0!==this.instances.length&&t.overlay&&(this.overlay.color=t.overlayColor,this.overlay.opacity=t.overlayOpacity,this.overlay.zIndex=t.overlayZIndex)},handleOverlayClick:function(){if(0!==this.instances.length){var t=this.instances[this.instances.length-1];t.overlayClick&&t.overlayClick()}}};"undefined"!=typeof window&&window.addEventListener("keydown",function(t){if(0!==c.instances.length&&"esc"===o()(t)){var e=c.instances[c.instances.length-1];e.escPress&&e.escPress()}}),e.a=c},function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(t){var e=t.getBoundingClientRect(),n=document.body,i=t.clientTop||n.clientTop||0,r=t.clientLeft||n.clientLeft||0,a=window.pageYOffset||t.scrollTop,o=window.pageXOffset||t.scrollLeft;return{top:e.top+a-i,left:e.left+o-r}},r=function(t,e){var n=["msTransitionEnd","mozTransitionEnd","oTransitionEnd","webkitTransitionEnd","transitionend"],i={handleEvent:function(r){n.forEach(function(e){t.removeEventListener(e,i,!1)}),e.apply(t,arguments)}};n.forEach(function(e){t.addEventListener(e,i,!1)})}},function(t,e,n){var i=n(46),r=n(4)("toStringTag"),a="Arguments"==i(function(){return arguments}()),o=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=o(e=Object(t),r))?n:a?i(e):"Object"==(s=i(e))&&"function"==typeof e.callee?"Arguments":s}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var i=n(29),r=n(277),a=n(276),o=n(12),s=n(58),l=n(86),u={},c={},e=t.exports=function(t,e,n,d,f){var h,p,m,v,y=f?function(){return t}:l(t),g=i(n,d,e?2:1),b=0;if("function"!=typeof y)throw TypeError(t+" is not iterable!");if(a(y)){for(h=s(t.length);h>b;b++)if((v=e?g(o(p=t[b])[0],p[1]):g(t[b]))===u||v===c)return v}else for(m=y.call(t);!(p=m.next()).done;)if((v=r(m,g,p.value,e))===u||v===c)return v};e.BREAK=u,e.RETURN=c},function(t,e,n){var i=n(46);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==i(t)?t.split(""):Object(t)}},function(t,e,n){"use strict";var i=n(51),r=n(13),a=n(85),o=n(10),s=n(15),l=n(19),u=n(278),c=n(33),d=n(284),f=n(4)("iterator"),h=!([].keys&&"next"in[].keys()),p="keys",m="values",v=function(){return this};t.exports=function(t,e,n,y,g,b,x){u(n,e,y);var C,_,S,w=function(t){if(!h&&t in T)return T[t];switch(t){case p:return function(){return new n(this,t)};case m:return function(){return new n(this,t)}}return function(){return new n(this,t)}},k=e+" Iterator",$=g==m,O=!1,T=t.prototype,M=T[f]||T["@@iterator"]||g&&T[g],D=M||w(g),F=g?$?w("entries"):D:void 0,E="Array"==e?T.entries||M:M;if(E&&(S=d(E.call(new t)))!==Object.prototype&&(c(S,k,!0),i||s(S,f)||o(S,f,v)),$&&M&&M.name!==m&&(O=!0,D=function(){return M.call(this)}),i&&!x||!h&&!O&&T[f]||o(T,f,D),l[e]=D,l[k]=v,g)if(C={values:$?D:w(m),keys:b?D:w(p),entries:F},x)for(_ in C)_ in T||a(T,_,C[_]);else r(r.P+r.F*(h||O),e,C);return C}},function(t,e){t.exports=!0},function(t,e,n){var i=n(35)("meta"),r=n(18),a=n(15),o=n(8).f,s=0,l=Object.isExtensible||function(){return!0},u=!n(14)(function(){return l(Object.preventExtensions({}))}),c=function(t){o(t,i,{value:{i:"O"+ ++s,w:{}}})},d=function(t,e){if(!r(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!a(t,i)){if(!l(t))return"F";if(!e)return"E";c(t)}return t[i].i},f=function(t,e){if(!a(t,i)){if(!l(t))return!0;if(!e)return!1;c(t)}return t[i].w},h=function(t){return u&&p.NEED&&l(t)&&!a(t,i)&&c(t),t},p=t.exports={KEY:i,NEED:!1,fastKey:d,getWeak:f,onFreeze:h}},function(t,e,n){var i=n(12),r=n(281),a=n(47),o=n(55)("IE_PROTO"),s=function(){},l="prototype",u=function(){var t,e=n(78)("iframe"),i=a.length,r="<",o=">";for(e.style.display="none",n(275).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(r+"script"+o+"document.F=Object"+r+"/script"+o),t.close(),u=t.F;i--;)delete u[l][a[i]];return u()};t.exports=Object.create||function(t,e){var n;return null!==t?(s[l]=i(t),n=new s,s[l]=null,n[o]=t):n=u(),void 0===e?n:r(n,e)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var i=n(56)("keys"),r=n(35);t.exports=function(t){return i[t]||(i[t]=r(t))}},function(t,e,n){var i=n(7),r="__core-js_shared__",a=i[r]||(i[r]={});t.exports=function(t){return a[t]||(a[t]={})}},function(t,e){var n=Math.ceil,i=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?i:n)(t)}},function(t,e,n){var i=n(57),r=Math.min;t.exports=function(t){return t>0?r(i(t),9007199254740991):0}},function(t,e,n){var i=n(18);t.exports=function(t,e){if(!i(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!i(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var i=n(7),r=n(3),a=n(51),o=n(61),s=n(8).f;t.exports=function(t){var e=r.Symbol||(r.Symbol=a?{}:i.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:o.f(t)})}},function(t,e,n){e.f=n(4)},function(t,e,n){n(369);var i=n(0)(n(190),n(551),null,null);t.exports=i.exports},function(t,e,n){"use strict";var i=n(413),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";function i(t){t&&n.i(r.b)(i,t)}var r=n(1);n.i(r.b)(i,{disableTouchRipple:!1,disableFocusRipple:!1}),e.a=i},function(t,e,n){"use strict";var i=n(429),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(447),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(455),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){t.exports={default:n(260),__esModule:!0}},function(t,e,n){n(340);var i=n(0)(n(193),n(526),null,null);t.exports=i.exports},function(t,e,n){"use strict";e.a={mounted:function(){this.$bindResize()},methods:{$bindResize:function(){var t=this;this._handleResize=function(e){t.onResize&&t.onResize()},"undefined"!=typeof window&&window.addEventListener("resize",this._handleResize)},$unBindResize:function(){this._handleResize&&window.removeEventListener("resize",this._handleResize)}},beforeDestroy:function(){this.$unBindResize()}}},function(t,e,n){"use strict";e.a={props:{scroller:{}},mounted:function(){this.$bindScroll()},methods:{$bindScroll:function(){var t=this,e=this.scroller||window;this._handleScroll=function(e){t.onScroll&&t.onScroll()},e.addEventListener("scroll",this._handleScroll)},$unbindScroll:function(t){t=t||this.scroller||window,this._handleScroll&&t.removeEventListener("scroll",this._handleScroll)}},beforeDestroy:function(){this.$unbindScroll()},watch:{scroller:function(t,e){t!==e&&(this.$unbindScroll(e),this.$bindScroll(t))}}}},function(t,e,n){"use strict";var i=n(249),r=n.n(i);n.d(e,"a",function(){return a});var a=function(t,e){return!!new r.a(e).has(t)}},function(t,e,n){"use strict";var i=n(252),r=n.n(i),a=n(253),o=n.n(a),s="undefined"!=typeof window&&("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),l=function(){function t(e){r()(this,t),this.el=e,this.startPos={},this.endPos={},this.starts=[],this.drags=[],this.ends=[],s?this.el.addEventListener("touchstart",this,!1):this.el.addEventListener("mousedown",this,!1)}return o()(t,[{key:"handleEvent",value:function(t){switch(t.type){case"touchstart":this.touchStart(t);break;case"touchmove":this.touchMove(t);break;case"touchcancel":case"touchend":this.touchEnd(t);break;case"mousedown":this.mouseStart(t);break;case"mousemove":this.mouseMove(t);break;case"mouseleave":case"mouseup":this.mouseEnd(t)}}},{key:"touchStart",value:function(t){var e=this,n=t.touches[0];this.startPos={x:n.pageX,y:n.pageY,time:(new Date).getTime()},this.endPos={},this.el.addEventListener("touchmove",this,!1),this.el.addEventListener("touchend",this,!1),this.starts.map(function(n){n.call(e,e.startPos,t)})}},{key:"touchMove",value:function(t){var e=this;if(!(t.touches.length>1||t.scale&&1!==t.scale)){var n=t.touches[0];this.endPos={x:n.pageX-this.startPos.x,y:n.pageY-this.startPos.y,time:(new Date).getTime()-this.startPos.time},this.drags.map(function(n){n.call(e,e.endPos,t)})}}},{key:"touchEnd",value:function(t){var e=this;this.endPos.time=(new Date).getTime()-this.startPos.time,this.el.removeEventListener("touchmove",this,!1),this.el.removeEventListener("touchend",this,!1),this.ends.map(function(n){n.call(e,e.endPos,t)})}},{key:"mouseStart",value:function(t){var e=this;this.startPos={x:t.clientX,y:t.clientY,time:(new Date).getTime()},this.endPos={},this.el.addEventListener("mousemove",this,!1),this.el.addEventListener("mouseup",this,!1),this.starts.map(function(n){n.call(e,e.startPos,t)})}},{key:"mouseMove",value:function(t){var e=this;this.endPos={x:t.clientX-this.startPos.x,y:t.clientY-this.startPos.y},this.drags.map(function(n){n.call(e,e.endPos,t)})}},{key:"mouseEnd",value:function(t){var e=this;this.el.removeEventListener("mousemove",this,!1),this.el.removeEventListener("mouseup",this,!1),this.endPos.time=(new Date).getTime()-this.startPos.time,this.ends.map(function(n){n.call(e,e.endPos,t)})}},{key:"start",value:function(t){return this.starts.push(t),this}},{key:"end",value:function(t){return this.ends.push(t),this}},{key:"drag",value:function(t){return this.drags.push(t),this}},{key:"reset",value:function(t){var e=t.touches?t.touches[0]:{};this.startPos={x:e.pageX||t.clientX,y:e.pageY||t.clientY,time:(new Date).getTime()},this.endPos={x:0,y:0}}},{key:"destory",value:function(){s?this.el.removeEventListener("touchstart",this,!1):this.el.removeEventListener("mousedown",this,!1)}}]),t}();e.a=l},function(t,e,n){t.exports={default:n(258),__esModule:!0}},function(t,e,n){t.exports={default:n(259),__esModule:!0}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(251),a=i(r),o=n(250),s=i(o),l="function"==typeof s.default&&"symbol"==typeof a.default?function(t){return typeof t}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":typeof t};e.default="function"==typeof s.default&&"symbol"===l(a.default)?function(t){return void 0===t?"undefined":l(t)}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":void 0===t?"undefined":l(t)}},function(t,e){t.exports=function(t,e,n,i){if(!(t instanceof e)||void 0!==i&&i in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var i=n(18),r=n(7).document,a=i(r)&&i(r.createElement);t.exports=function(t){return a?r.createElement(t):{}}},function(t,e,n){t.exports=!n(6)&&!n(14)(function(){return 7!=Object.defineProperty(n(78)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var i=n(46);t.exports=Array.isArray||function(t){return"Array"==i(t)}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var i=n(83),r=n(47).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,r)}},function(t,e,n){var i=n(15),r=n(16),a=n(267)(!1),o=n(55)("IE_PROTO");t.exports=function(t,e){var n,s=r(t),l=0,u=[];for(n in s)n!=o&&i(s,n)&&u.push(n);for(;e.length>l;)i(s,n=e[l++])&&(~a(u,n)||u.push(n));return u}},function(t,e,n){var i=n(10);t.exports=function(t,e,n){for(var r in e)n&&t[r]?t[r]=e[r]:i(t,r,e[r]);return t}},function(t,e,n){t.exports=n(10)},function(t,e,n){var i=n(45),r=n(4)("iterator"),a=n(19);t.exports=n(3).getIteratorMethod=function(t){if(void 0!=t)return t[r]||t["@@iterator"]||a[i(t)]}},function(t,e){},function(t,e,n){(function(e){function n(t){if("string"==typeof t)return t;if(r(t))return v?v.call(t):"";var e=t+"";return"0"==e&&1/t==-s?"-0":e}function i(t){return!!t&&"object"==typeof t}function r(t){return"symbol"==typeof t||i(t)&&h.call(t)==l}function a(t){return null==t?"":n(t)}function o(t){return a(t).toLowerCase()}var s=1/0,l="[object Symbol]",u="object"==typeof e&&e&&e.Object===Object&&e,c="object"==typeof self&&self&&self.Object===Object&&self,d=u||c||Function("return this")(),f=Object.prototype,h=f.toString,p=d.Symbol,m=p?p.prototype:void 0,v=m?m.toString:void 0;t.exports=o}).call(e,n(582))},function(t,e,n){n(305);var i=n(0)(n(191),n(491),null,null);t.exports=i.exports},function(t,e,n){n(362);var i=n(0)(n(192),n(545),null,null);t.exports=i.exports},function(t,e,n){n(372);var i=n(0)(n(196),n(554),null,null);t.exports=i.exports},function(t,e,n){n(328);var i=n(0)(n(198),n(515),null,null);t.exports=i.exports},function(t,e,n){n(319);var i=n(0)(n(199),n(506),null,null);t.exports=i.exports},function(t,e,n){n(390);var i=n(0)(n(217),n(575),null,null);t.exports=i.exports},function(t,e,n){n(388);var i=n(0)(n(223),n(571),null,null);t.exports=i.exports},function(t,e,n){n(386);var i=n(0)(n(225),n(569),null,null);t.exports=i.exports},function(t,e,n){n(343);var i=n(0)(n(240),n(529),null,null);t.exports=i.exports},function(t,e,n){n(356);var i=n(0)(n(241),null,null,null);t.exports=i.exports},function(e,n){e.exports=t},function(t,e,n){"use strict";var i=n(397),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(398),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(399),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(400),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(401),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(402),r=n.n(i);n.d(e,"bottomNav",function(){return r.a});var a=n(403),o=n.n(a);n.d(e,"bottomNavItem",function(){return o.a})},function(t,e,n){"use strict";var i=n(404),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(405),r=n.n(i);n.d(e,"breadCrumb",function(){return r.a});var a=n(406),o=n.n(a);n.d(e,"breadCrumbItem",function(){return o.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(407),r=n.n(i);n.d(e,"card",function(){return r.a});var a=n(409),o=n.n(a);n.d(e,"cardHeader",function(){return o.a});var s=n(410),l=n.n(s);n.d(e,"cardMedia",function(){return l.a});var u=n(412),c=n.n(u);n.d(e,"cardTitle",function(){return c.a});var d=n(411),f=n.n(d);n.d(e,"cardText",function(){return f.a});var h=n(408),p=n.n(h);n.d(e,"cardActions",function(){return p.a})},function(t,e,n){"use strict";var i=n(414),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(415),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(416),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(422),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(427),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(428),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(431),r=n.n(i);n.d(e,"flexbox",function(){return r.a});var a=n(432),o=n.n(a);n.d(e,"flexboxItem",function(){return o.a})},function(t,e,n){"use strict";var i=n(433),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(300),r=(n.n(i),n(435)),a=n.n(r);n.d(e,"row",function(){return a.a});var o=n(434),s=n.n(o);n.d(e,"col",function(){return s.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(436),r=n.n(i);n.d(e,"gridList",function(){return r.a});var a=n(437),o=n.n(a);n.d(e,"gridTile",function(){return o.a})},function(t,e,n){"use strict";var i=n(440),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(441),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(443),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(91),r=n.n(i);n.d(e,"list",function(){return r.a});var a=n(444),o=n.n(a);n.d(e,"listItem",function(){return o.a})},function(t,e,n){"use strict";var i=n(446),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(449),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(451),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(452),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(453),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(454),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(456),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(457),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(458),r=n.n(i);n.d(e,"step",function(){return r.a});var a=n(459),o=n.n(a);n.d(e,"stepButton",function(){return o.a});var s=n(461),l=n.n(s);n.d(e,"stepContent",function(){return l.a});var u=n(94),c=n.n(u);n.d(e,"stepLabel",function(){return c.a});var d=n(462),f=n.n(d);n.d(e,"stepper",function(){return f.a})},function(t,e,n){"use strict";var i=n(463),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(464),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(465),r=n.n(i);n.d(e,"table",function(){return r.a});var a=n(468),o=n.n(a);n.d(e,"thead",function(){return o.a});var s=n(466),l=n.n(s);n.d(e,"tbody",function(){return l.a});var u=n(467),c=n.n(u);n.d(e,"tfoot",function(){return c.a});var d=n(469),f=n.n(d);n.d(e,"tr",function(){return f.a});var h=n(96),p=n.n(h);n.d(e,"th",function(){return p.a});var m=n(95),v=n.n(m);n.d(e,"td",function(){return v.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(471),r=n.n(i);n.d(e,"tabs",function(){return r.a});var a=n(470),o=n.n(a);n.d(e,"tab",function(){return o.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(477),r=n.n(i);n.d(e,"timeline",function(){return r.a});var a=n(478),o=n.n(a);n.d(e,"timelineItem",function(){return o.a})},function(t,e,n){"use strict";var i=n(483),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(485),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(88),r=n.n(i);n.d(e,"levenshteinDistance",function(){return a}),n.d(e,"noFilter",function(){return o}),n.d(e,"caseSensitiveFilter",function(){return s}),n.d(e,"caseInsensitiveFilter",function(){return l}),n.d(e,"levenshteinDistanceFilter",function(){return u}),n.d(e,"fuzzyFilter",function(){return c});var a=function(t,e){for(var n=[],i=void 0,r=void 0,a=0;a<=e.length;a++)for(var o=0;o<=t.length;o++)r=a&&o?t.charAt(o-1)===e.charAt(a-1)?i:Math.min(n[o],n[o-1],i)+1:a+o,i=n[o],n[o]=r;return n.pop()},o=function(){return!0},s=function(t,e){return""!==t&&e.indexOf(t)!==-1},l=function(t,e){return r()(e).indexOf(t.toLowerCase())!==-1},u=function(t){if(void 0===t)return a;if("number"!=typeof t)throw"Error: levenshteinDistanceFilter is a filter generator, not a filter!";return function(e,n){return a(e,n)<t}},c=function(t,e){var n=r()(e);t=r()(t);for(var i=0,a=0;a<e.length;a++)n[a]===t[i]&&(i+=1);return i===t.length}},function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i=function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=document.getElementsByTagName("body")[0],i=n.scrollTop,r=60;r>=0;r--)setTimeout(function(t){return function(){n.scrollTop=i*t/60,0===t&&"function"==typeof e&&e()}}(r),t*(1-r/60))}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"red50",function(){return i}),n.d(e,"red100",function(){return r}),n.d(e,"red200",function(){return a}),n.d(e,"red300",function(){return o}),n.d(e,"red400",function(){return s}),n.d(e,"red500",function(){return l}),n.d(e,"red600",function(){return u}),n.d(e,"red700",function(){return c}),n.d(e,"red800",function(){return d}),n.d(e,"red900",function(){return f}),n.d(e,"redA100",function(){return h}),n.d(e,"redA200",function(){return p}),n.d(e,"redA400",function(){return m}),n.d(e,"redA700",function(){return v}),n.d(e,"red",function(){return y}),n.d(e,"pink50",function(){return g}),n.d(e,"pink100",function(){return b}),n.d(e,"pink200",function(){return x}),n.d(e,"pink300",function(){return C}),n.d(e,"pink400",function(){return _}),n.d(e,"pink500",function(){return S}),n.d(e,"pink600",function(){return w}),n.d(e,"pink700",function(){return k}),n.d(e,"pink800",function(){return $}),n.d(e,"pink900",function(){return O}),n.d(e,"pinkA100",function(){return T}),n.d(e,"pinkA200",function(){return M}),n.d(e,"pinkA400",function(){return D}),n.d(e,"pinkA700",function(){return F}),n.d(e,"pink",function(){return E}),n.d(e,"purple50",function(){return P}),n.d(e,"purple100",function(){return A}),n.d(e,"purple200",function(){return j}),n.d(e,"purple300",function(){return B}),n.d(e,"purple400",function(){return R}),n.d(e,"purple500",function(){return I}),n.d(e,"purple600",function(){return L}),n.d(e,"purple700",function(){return z}),n.d(e,"purple800",function(){return N}),n.d(e,"purple900",function(){return H}),n.d(e,"purpleA100",function(){return W}),n.d(e,"purpleA200",function(){return V}),n.d(e,"purpleA400",function(){return Y}),n.d(e,"purpleA700",function(){return K}),n.d(e,"purple",function(){return G}),n.d(e,"deepPurple50",function(){return X}),n.d(e,"deepPurple100",function(){return U}),n.d(e,"deepPurple200",function(){return q}),n.d(e,"deepPurple300",function(){return Z}),n.d(e,"deepPurple400",function(){return J}),n.d(e,"deepPurple500",function(){return Q}),n.d(e,"deepPurple600",function(){return tt}),n.d(e,"deepPurple700",function(){return et}),n.d(e,"deepPurple800",function(){return nt}),n.d(e,"deepPurple900",function(){return it}),n.d(e,"deepPurpleA100",function(){return rt}),n.d(e,"deepPurpleA200",function(){return at}),n.d(e,"deepPurpleA400",function(){return ot}),n.d(e,"deepPurpleA700",function(){return st}),n.d(e,"deepPurple",function(){return lt}),n.d(e,"indigo50",function(){return ut}),n.d(e,"indigo100",function(){return ct}),n.d(e,"indigo200",function(){return dt}),n.d(e,"indigo300",function(){return ft}),n.d(e,"indigo400",function(){return ht}),n.d(e,"indigo500",function(){return pt}),n.d(e,"indigo600",function(){return mt}),n.d(e,"indigo700",function(){return vt}),n.d(e,"indigo800",function(){return yt}),n.d(e,"indigo900",function(){return gt}),n.d(e,"indigoA100",function(){return bt}),n.d(e,"indigoA200",function(){return xt}),n.d(e,"indigoA400",function(){return Ct}),n.d(e,"indigoA700",function(){return _t}),n.d(e,"indigo",function(){return St}),n.d(e,"blue50",function(){return wt}),n.d(e,"blue100",function(){return kt}),n.d(e,"blue200",function(){return $t}),n.d(e,"blue300",function(){return Ot}),n.d(e,"blue400",function(){return Tt}),n.d(e,"blue500",function(){return Mt}),n.d(e,"blue600",function(){return Dt}),n.d(e,"blue700",function(){return Ft}),n.d(e,"blue800",function(){return Et}),n.d(e,"blue900",function(){return Pt}),n.d(e,"blueA100",function(){return At}),n.d(e,"blueA200",function(){return jt}),n.d(e,"blueA400",function(){return Bt}),n.d(e,"blueA700",function(){return Rt}),n.d(e,"blue",function(){return It}),n.d(e,"lightBlue50",function(){return Lt}),n.d(e,"lightBlue100",function(){return zt}),n.d(e,"lightBlue200",function(){return Nt}),n.d(e,"lightBlue300",function(){return Ht}),n.d(e,"lightBlue400",function(){return Wt}),n.d(e,"lightBlue500",function(){return Vt}),n.d(e,"lightBlue600",function(){return Yt}),n.d(e,"lightBlue700",function(){return Kt}),n.d(e,"lightBlue800",function(){return Gt}),n.d(e,"lightBlue900",function(){return Xt}),n.d(e,"lightBlueA100",function(){return Ut}),n.d(e,"lightBlueA200",function(){return qt}),n.d(e,"lightBlueA400",function(){return Zt}),n.d(e,"lightBlueA700",function(){return Jt}),n.d(e,"lightBlue",function(){return Qt}),n.d(e,"cyan50",function(){return te}),n.d(e,"cyan100",function(){return ee}),n.d(e,"cyan200",function(){return ne}),n.d(e,"cyan300",function(){return ie}),n.d(e,"cyan400",function(){return re}),n.d(e,"cyan500",function(){return ae}),n.d(e,"cyan600",function(){return oe}),n.d(e,"cyan700",function(){return se}),n.d(e,"cyan800",function(){return le}),n.d(e,"cyan900",function(){return ue}),n.d(e,"cyanA100",function(){return ce}),n.d(e,"cyanA200",function(){return de}),n.d(e,"cyanA400",function(){return fe}),n.d(e,"cyanA700",function(){return he}),n.d(e,"cyan",function(){return pe}),n.d(e,"teal50",function(){return me}),n.d(e,"teal100",function(){return ve}),n.d(e,"teal200",function(){return ye}),n.d(e,"teal300",function(){return ge}),n.d(e,"teal400",function(){return be}),n.d(e,"teal500",function(){return xe}),n.d(e,"teal600",function(){return Ce}),n.d(e,"teal700",function(){return _e}),n.d(e,"teal800",function(){return Se}),n.d(e,"teal900",function(){return we}),n.d(e,"tealA100",function(){return ke}),n.d(e,"tealA200",function(){return $e}),n.d(e,"tealA400",function(){return Oe}),n.d(e,"tealA700",function(){return Te}),n.d(e,"teal",function(){return Me}),n.d(e,"green50",function(){return De}),n.d(e,"green100",function(){return Fe}),n.d(e,"green200",function(){return Ee}),n.d(e,"green300",function(){return Pe}),n.d(e,"green400",function(){return Ae}),n.d(e,"green500",function(){return je}),n.d(e,"green600",function(){return Be}),n.d(e,"green700",function(){return Re}),n.d(e,"green800",function(){return Ie}),n.d(e,"green900",function(){return Le}),n.d(e,"greenA100",function(){return ze}),n.d(e,"greenA200",function(){return Ne}),n.d(e,"greenA400",function(){return He}),n.d(e,"greenA700",function(){return We}),n.d(e,"green",function(){return Ve}),n.d(e,"lightGreen50",function(){return Ye}),n.d(e,"lightGreen100",function(){return Ke}),n.d(e,"lightGreen200",function(){return Ge}),n.d(e,"lightGreen300",function(){return Xe}),n.d(e,"lightGreen400",function(){return Ue}),n.d(e,"lightGreen500",function(){return qe}),n.d(e,"lightGreen600",function(){return Ze}),n.d(e,"lightGreen700",function(){return Je}),n.d(e,"lightGreen800",function(){return Qe}),n.d(e,"lightGreen900",function(){return tn}),n.d(e,"lightGreenA100",function(){return en}),n.d(e,"lightGreenA200",function(){return nn}),n.d(e,"lightGreenA400",function(){return rn}),n.d(e,"lightGreenA700",function(){return an}),n.d(e,"lightGreen",function(){return on}),n.d(e,"lime50",function(){return sn}),n.d(e,"lime100",function(){return ln}),n.d(e,"lime200",function(){return un}),n.d(e,"lime300",function(){return cn}),n.d(e,"lime400",function(){return dn}),n.d(e,"lime500",function(){return fn}),n.d(e,"lime600",function(){return hn}),n.d(e,"lime700",function(){return pn}),n.d(e,"lime800",function(){return mn}),n.d(e,"lime900",function(){return vn}),n.d(e,"limeA100",function(){return yn}),n.d(e,"limeA200",function(){return gn}),n.d(e,"limeA400",function(){return bn}),n.d(e,"limeA700",function(){return xn}),n.d(e,"lime",function(){return Cn}),n.d(e,"yellow50",function(){return _n}),n.d(e,"yellow100",function(){return Sn}),n.d(e,"yellow200",function(){return wn}),n.d(e,"yellow300",function(){return kn}),n.d(e,"yellow400",function(){return $n}),n.d(e,"yellow500",function(){return On}),n.d(e,"yellow600",function(){return Tn}),n.d(e,"yellow700",function(){return Mn}),n.d(e,"yellow800",function(){return Dn}),n.d(e,"yellow900",function(){return Fn}),n.d(e,"yellowA100",function(){return En}),n.d(e,"yellowA200",function(){return Pn}),n.d(e,"yellowA400",function(){return An}),n.d(e,"yellowA700",function(){return jn}),n.d(e,"yellow",function(){return Bn}),n.d(e,"amber50",function(){return Rn}),n.d(e,"amber100",function(){return In}),n.d(e,"amber200",function(){return Ln}),n.d(e,"amber300",function(){return zn});n.d(e,"amber400",function(){return Nn}),n.d(e,"amber500",function(){return Hn}),n.d(e,"amber600",function(){return Wn}),n.d(e,"amber700",function(){return Vn}),n.d(e,"amber800",function(){return Yn}),n.d(e,"amber900",function(){return Kn}),n.d(e,"amberA100",function(){return Gn}),n.d(e,"amberA200",function(){return Xn}),n.d(e,"amberA400",function(){return Un}),n.d(e,"amberA700",function(){return qn}),n.d(e,"amber",function(){return Zn}),n.d(e,"orange50",function(){return Jn}),n.d(e,"orange100",function(){return Qn}),n.d(e,"orange200",function(){return ti}),n.d(e,"orange300",function(){return ei}),n.d(e,"orange400",function(){return ni}),n.d(e,"orange500",function(){return ii}),n.d(e,"orange600",function(){return ri}),n.d(e,"orange700",function(){return ai}),n.d(e,"orange800",function(){return oi}),n.d(e,"orange900",function(){return si}),n.d(e,"orangeA100",function(){return li}),n.d(e,"orangeA200",function(){return ui}),n.d(e,"orangeA400",function(){return ci}),n.d(e,"orangeA700",function(){return di}),n.d(e,"orange",function(){return fi}),n.d(e,"deepOrange50",function(){return hi}),n.d(e,"deepOrange100",function(){return pi}),n.d(e,"deepOrange200",function(){return mi}),n.d(e,"deepOrange300",function(){return vi}),n.d(e,"deepOrange400",function(){return yi}),n.d(e,"deepOrange500",function(){return gi}),n.d(e,"deepOrange600",function(){return bi}),n.d(e,"deepOrange700",function(){return xi}),n.d(e,"deepOrange800",function(){return Ci}),n.d(e,"deepOrange900",function(){return _i}),n.d(e,"deepOrangeA100",function(){return Si}),n.d(e,"deepOrangeA200",function(){return wi}),n.d(e,"deepOrangeA400",function(){return ki}),n.d(e,"deepOrangeA700",function(){return $i}),n.d(e,"deepOrange",function(){return Oi}),n.d(e,"brown50",function(){return Ti}),n.d(e,"brown100",function(){return Mi}),n.d(e,"brown200",function(){return Di}),n.d(e,"brown300",function(){return Fi}),n.d(e,"brown400",function(){return Ei}),n.d(e,"brown500",function(){return Pi}),n.d(e,"brown600",function(){return Ai}),n.d(e,"brown700",function(){return ji}),n.d(e,"brown800",function(){return Bi}),n.d(e,"brown900",function(){return Ri}),n.d(e,"brown",function(){return Ii}),n.d(e,"blueGrey50",function(){return Li}),n.d(e,"blueGrey100",function(){return zi}),n.d(e,"blueGrey200",function(){return Ni}),n.d(e,"blueGrey300",function(){return Hi}),n.d(e,"blueGrey400",function(){return Wi}),n.d(e,"blueGrey500",function(){return Vi}),n.d(e,"blueGrey600",function(){return Yi}),n.d(e,"blueGrey700",function(){return Ki}),n.d(e,"blueGrey800",function(){return Gi}),n.d(e,"blueGrey900",function(){return Xi}),n.d(e,"blueGrey",function(){return Ui}),n.d(e,"grey50",function(){return qi}),n.d(e,"grey100",function(){return Zi}),n.d(e,"grey200",function(){return Ji}),n.d(e,"grey300",function(){return Qi}),n.d(e,"grey400",function(){return tr}),n.d(e,"grey500",function(){return er}),n.d(e,"grey600",function(){return nr}),n.d(e,"grey700",function(){return ir}),n.d(e,"grey800",function(){return rr}),n.d(e,"grey900",function(){return ar}),n.d(e,"grey",function(){return or}),n.d(e,"black",function(){return sr}),n.d(e,"white",function(){return lr}),n.d(e,"transparent",function(){return ur}),n.d(e,"fullBlack",function(){return cr}),n.d(e,"darkBlack",function(){return dr}),n.d(e,"lightBlack",function(){return fr}),n.d(e,"minBlack",function(){return hr}),n.d(e,"faintBlack",function(){return pr}),n.d(e,"fullWhite",function(){return mr}),n.d(e,"darkWhite",function(){return vr}),n.d(e,"lightWhite",function(){return yr});var i="#ffebee",r="#ffcdd2",a="#ef9a9a",o="#e57373",s="#ef5350",l="#f44336",u="#e53935",c="#d32f2f",d="#c62828",f="#b71c1c",h="#ff8a80",p="#ff5252",m="#ff1744",v="#d50000",y=l,g="#fce4ec",b="#f8bbd0",x="#f48fb1",C="#f06292",_="#ec407a",S="#e91e63",w="#d81b60",k="#c2185b",$="#ad1457",O="#880e4f",T="#ff80ab",M="#ff4081",D="#f50057",F="#c51162",E=S,P="#f3e5f5",A="#e1bee7",j="#ce93d8",B="#ba68c8",R="#ab47bc",I="#9c27b0",L="#8e24aa",z="#7b1fa2",N="#6a1b9a",H="#4a148c",W="#ea80fc",V="#e040fb",Y="#d500f9",K="#aa00ff",G=I,X="#ede7f6",U="#d1c4e9",q="#b39ddb",Z="#9575cd",J="#7e57c2",Q="#673ab7",tt="#5e35b1",et="#512da8",nt="#4527a0",it="#311b92",rt="#b388ff",at="#7c4dff",ot="#651fff",st="#6200ea",lt=Q,ut="#e8eaf6",ct="#c5cae9",dt="#9fa8da",ft="#7986cb",ht="#5c6bc0",pt="#3f51b5",mt="#3949ab",vt="#303f9f",yt="#283593",gt="#1a237e",bt="#8c9eff",xt="#536dfe",Ct="#3d5afe",_t="#304ffe",St=pt,wt="#e3f2fd",kt="#bbdefb",$t="#90caf9",Ot="#64b5f6",Tt="#42a5f5",Mt="#2196f3",Dt="#1e88e5",Ft="#1976d2",Et="#1565c0",Pt="#0d47a1",At="#82b1ff",jt="#448aff",Bt="#2979ff",Rt="#2962ff",It=Mt,Lt="#e1f5fe",zt="#b3e5fc",Nt="#81d4fa",Ht="#4fc3f7",Wt="#29b6f6",Vt="#03a9f4",Yt="#039be5",Kt="#0288d1",Gt="#0277bd",Xt="#01579b",Ut="#80d8ff",qt="#40c4ff",Zt="#00b0ff",Jt="#0091ea",Qt=Vt,te="#e0f7fa",ee="#b2ebf2",ne="#80deea",ie="#4dd0e1",re="#26c6da",ae="#00bcd4",oe="#00acc1",se="#0097a7",le="#00838f",ue="#006064",ce="#84ffff",de="#18ffff",fe="#00e5ff",he="#00b8d4",pe=ae,me="#e0f2f1",ve="#b2dfdb",ye="#80cbc4",ge="#4db6ac",be="#26a69a",xe="#009688",Ce="#00897b",_e="#00796b",Se="#00695c",we="#004d40",ke="#a7ffeb",$e="#64ffda",Oe="#1de9b6",Te="#00bfa5",Me=xe,De="#e8f5e9",Fe="#c8e6c9",Ee="#a5d6a7",Pe="#81c784",Ae="#66bb6a",je="#4caf50",Be="#43a047",Re="#388e3c",Ie="#2e7d32",Le="#1b5e20",ze="#b9f6ca",Ne="#69f0ae",He="#00e676",We="#00c853",Ve=je,Ye="#f1f8e9",Ke="#dcedc8",Ge="#c5e1a5",Xe="#aed581",Ue="#9ccc65",qe="#8bc34a",Ze="#7cb342",Je="#689f38",Qe="#558b2f",tn="#33691e",en="#ccff90",nn="#b2ff59",rn="#76ff03",an="#64dd17",on=qe,sn="#f9fbe7",ln="#f0f4c3",un="#e6ee9c",cn="#dce775",dn="#d4e157",fn="#cddc39",hn="#c0ca33",pn="#afb42b",mn="#9e9d24",vn="#827717",yn="#f4ff81",gn="#eeff41",bn="#c6ff00",xn="#aeea00",Cn=fn,_n="#fffde7",Sn="#fff9c4",wn="#fff59d",kn="#fff176",$n="#ffee58",On="#ffeb3b",Tn="#fdd835",Mn="#fbc02d",Dn="#f9a825",Fn="#f57f17",En="#ffff8d",Pn="#ffff00",An="#ffea00",jn="#ffd600",Bn=On,Rn="#fff8e1",In="#ffecb3",Ln="#ffe082",zn="#ffd54f",Nn="#ffca28",Hn="#ffc107",Wn="#ffb300",Vn="#ffa000",Yn="#ff8f00",Kn="#ff6f00",Gn="#ffe57f",Xn="#ffd740",Un="#ffc400",qn="#ffab00",Zn=Hn,Jn="#fff3e0",Qn="#ffe0b2",ti="#ffcc80",ei="#ffb74d",ni="#ffa726",ii="#ff9800",ri="#fb8c00",ai="#f57c00",oi="#ef6c00",si="#e65100",li="#ffd180",ui="#ffab40",ci="#ff9100",di="#ff6d00",fi=ii,hi="#fbe9e7",pi="#ffccbc",mi="#ffab91",vi="#ff8a65",yi="#ff7043",gi="#ff5722",bi="#f4511e",xi="#e64a19",Ci="#d84315",_i="#bf360c",Si="#ff9e80",wi="#ff6e40",ki="#ff3d00",$i="#dd2c00",Oi=gi,Ti="#efebe9",Mi="#d7ccc8",Di="#bcaaa4",Fi="#a1887f",Ei="#8d6e63",Pi="#795548",Ai="#6d4c41",ji="#5d4037",Bi="#4e342e",Ri="#3e2723",Ii=Pi,Li="#eceff1",zi="#cfd8dc",Ni="#b0bec5",Hi="#90a4ae",Wi="#78909c",Vi="#607d8b",Yi="#546e7a",Ki="#455a64",Gi="#37474f",Xi="#263238",Ui=Vi,qi="#fafafa",Zi="#f5f5f5",Ji="#eeeeee",Qi="#e0e0e0",tr="#bdbdbd",er="#9e9e9e",nr="#757575",ir="#616161",rr="#424242",ar="#212121",or=er,sr="#000000",lr="#ffffff",ur="rgba(0, 0, 0, 0)",cr="rgba(0, 0, 0, 1)",dr="rgba(0, 0, 0, 0.87)",fr="rgba(0, 0, 0, 0.54)",hr="rgba(0, 0, 0, 0.26)",pr="rgba(0, 0, 0, 0.12)",mr="rgba(255, 255, 255, 1)",vr="rgba(255, 255, 255, 0.87)",yr="rgba(255, 255, 255, 0.54)"},function(t,e,n){"use strict";var i,r=n(88),a=n.n(r),o="undefined"!=typeof document?document.documentElement.style:{},s=!1;i="undefined"!=typeof window&&window.opera&&"[object Opera]"===Object.prototype.toString.call(window.opera)?"presto":"MozAppearance"in o?"gecko":"WebkitAppearance"in o?"webkit":"undefined"!=typeof navigator&&"string"==typeof navigator.cpuClass?"trident":"node";var l={trident:"-ms-",gecko:"-moz-",webkit:"-webkit-",presto:"-o-"}[i],u={trident:"ms",gecko:"Moz",webkit:"Webkit",presto:"O"}[i],c="undefined"!=typeof document?document.createElement("div"):{},d=u+"Perspective",f=u+"Transform",h=l+"transform",p=u+"Transition",m=l+"transition",v=a()(u)+"TransitionEnd";c.style&&void 0!==c.style[d]&&(s=!0);var y=function(t){var e={left:0,top:0};if(null===t||null===t.style)return e;var n=t.style[f],i=/translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g.exec(n);return i&&(e.left=+i[1],e.top=+i[3]),e},g=function(t,e,n){if((null!==e||null!==n)&&null!==t&&null!==t.style&&(t.style[f]||0!==e||0!==n)){if(null===e||null===n){var i=y(t);null===e&&(e=i.left),null===n&&(n=i.top)}b(t),t.style[f]+=s?" translate("+(e?e+"px":"0px")+","+(n?n+"px":"0px")+") translateZ(0px)":" translate("+(e?e+"px":"0px")+","+(n?n+"px":"0px")+")"}},b=function(t){if(null!==t&&null!==t.style){var e=t.style[f];e&&(e=e.replace(/translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g,""),t.style[f]=e)}};e.a={transformProperty:f,transformStyleName:h,transitionProperty:p,transitionStyleName:m,transitionEndProperty:v,getElementTranslate:y,translateElement:g,cancelTranslateElement:b}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-appbar",props:{title:{type:String,default:""},titleClass:{type:[String,Array,Object]},zDepth:{type:Number,default:1}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(41),r=n.n(i),a=n(76),o=n.n(a),s=n(11),l=n(17),u=n(25),c=n(140),d=n(21),f=n.n(d);e.default={name:"mu-auto-complete",props:{anchorOrigin:{type:Object,default:function(){return{vertical:"bottom",horizontal:"left"}}},targetOrigin:{type:Object,default:function(){return{vertical:"top",horizontal:"left"}}},scroller:{},dataSource:{type:Array,default:function(){return[]}},dataSourceConfig:{type:Object,default:function(){return{text:"text",value:"value"}}},disableFocusRipple:{type:Boolean,default:!0},filter:{type:[String,Function],default:"caseSensitiveFilter"},maxSearchResults:{type:Number},openOnFocus:{type:Boolean,default:!1},menuCloseDelay:{type:Number,default:300},label:{type:String},labelFloat:{type:Boolean,default:!1},labelClass:{type:[String,Array,Object]},labelFocusClass:{type:[String,Array,Object]},disabled:{type:Boolean,default:!1},hintText:{type:String},hintTextClass:{type:[String,Array,Object]},helpText:{type:String},helpTextClass:{type:[String,Array,Object]},errorText:{type:String},errorColor:{type:String},icon:{type:String},iconClass:{type:[String,Array,Object]},inputClass:{type:[String,Array,Object]},fullWidth:{type:Boolean,default:!1},menuWidth:{type:Number},maxHeight:{type:Number},underlineShow:{type:Boolean,default:!0},underlineClass:{type:[String,Array,Object]},underlineFocusClass:{type:[String,Array,Object]},value:{type:String}},data:function(){return{anchorEl:null,focusTextField:!0,open:!1,searchText:this.value,inputWidth:null}},computed:{list:function t(){var e="string"==typeof this.filter?c[this.filter]:this.filter,n=this.dataSourceConfig,i=this.maxSearchResults,a=this.searchText;if(!e)return void console.warn("not found filter:"+this.filter);var t=[];return this.dataSource.every(function(s,l){switch(void 0===s?"undefined":o()(s)){case"string":e(a||"",s,s)&&t.push({text:s,value:s,index:l});break;case"object":if(s&&"string"==typeof s[n.text]){var u=s[n.text];if(!e(a||"",u,s))break;var c=s[n.value];t.push(r()({},s,{text:u,value:c,index:l}))}}return!(i&&i>0&&t.length===i)}),t}},methods:{handleFocus:function(t){!this.open&&this.openOnFocus&&(this.open=!0),this.focusTextField=!0,this.$emit("focus",t)},handleBlur:function(t){this.focusTextField&&!this.timerTouchTapCloseId&&this.close(),this.$emit("blur",t)},handleClose:function(t){this.focusTextField&&"overflow"!==t||this.close()},handleMouseDown:function(t){t.preventDefault()},handleItemClick:function(t){var e=this,n=this.list,i=this.dataSource,r=this.setSearchText,a=this.$refs.menu.$children.indexOf(t),o=n[a].index,s=i[o],l=this.chosenRequestText(s);this.timerTouchTapCloseId=setTimeout(function(){e.timerTouchTapCloseId=null,r(l),e.close(),e.$emit("select",s,o),e.$emit("change",l)},this.menuCloseDelay)},chosenRequestText:function(t){return"string"==typeof t?t:t[this.dataSourceConfig.text]},handleInput:function(){this.notInput?this.notInput=!1:this.open=!0},blur:function(){this.$refs.textField.$el.blur()},focus:function(){this.$refs.textField.focus()},close:function(){this.open=!1},handleKeyDown:function(t){switch(this.$emit("keydown",t),f()(t)){case"enter":if(!this.open)return;var e=this.searchText;this.$emit("change",e,-1),this.close();break;case"esc":this.close();break;case"down":t.preventDefault(),this.open=!0,this.focusTextField=!1}},setSearchText:function(t){this.notInput=!0,this.searchText=t},setInputWidth:function(){this.$el&&(this.inputWidth=this.$el.offsetWidth)}},mounted:function(){this.anchorEl=this.$refs.textField.$el,this.setInputWidth()},updated:function(){this.setInputWidth()},watch:{value:function(t){t!==this.searchText&&this.setSearchText(t)},searchText:function(t){this.$emit("input",t)}},components:{popover:s.a,"text-field":l.a,"mu-menu":u.menu,"menu-item":u.menuItem}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),r=n(1);e.default={name:"mu-avatar",props:{backgroundColor:{type:String,default:""},color:{type:String,default:""},icon:{type:String,default:""},iconClass:{type:[String,Object,Array]},src:{type:String,default:""},imgClass:{type:[String,Object,Array]},size:{type:Number},iconSize:{type:Number}},computed:{avatarStyle:function(){return{width:this.size?this.size+"px":"",height:this.size?this.size+"px":"",color:n.i(r.d)(this.color),"background-color":n.i(r.d)(this.backgroundColor)}}},methods:{handleClick:function(){this.$emit("click")}},created:function(){this._isAvatar=!0},components:{icon:i.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(141),r=n(2);e.default={name:"mu-back-top",data:function(){return{backShow:!1}},components:{icon:r.a},props:{height:{type:Number,default:200},bottom:{type:Number,default:30},right:{type:Number,default:30},durations:{type:Number,default:500},callBack:{type:Function,default:function(){}}},computed:{propsStyle:function(){return{right:this.right+"px",bottom:this.bottom+"px"}}},methods:{moveTop:function(){n.i(i.a)(this.durations,this.callBack)},scrollListener:function(){this.backShow=document.getElementsByTagName("body")[0].scrollTop>=this.height}},mounted:function(){window.addEventListener("scroll",this.scrollListener,!1),window.addEventListener("resize",this.scrollListener,!1)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll,!1),window.removeEventListener("resize",this.handleScroll,!1)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={name:"mu-badge",props:{content:{type:String,default:""},color:{type:String,default:""},primary:{type:Boolean,default:!1},secondary:{type:Boolean,default:!1},circle:{type:Boolean,default:!1},badgeClass:{type:[String,Object,Array]}},computed:{badgeStyle:function(){return{"background-color":n.i(i.d)(this.color)}},badgeInternalClass:function(){var t=this.circle,e=this.primary,r=this.secondary,a=this.badgeClass,o=this.$slots&&this.$slots.default&&this.$slots.default.length>0,s=[];return t&&s.push("mu-badge-circle"),e&&s.push("mu-badge-primary"),r&&s.push("mu-badge-secondary"),o&&s.push("mu-badge-float"),s.concat(n.i(i.f)(a))}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5);e.default={name:"mu-bottom-nav",props:{shift:{type:Boolean,default:!1},value:{}},methods:{handleItemClick:function(t,e){t!==this.value&&this.$emit("change",t),this.$emit("itemClick",e),this.$emit("item-click",e)},setChildrenInstance:function(){var t=this;this.$slots.default.forEach(function(e){e&&e.child&&e.child.isBottomNavItem&&(e.child.bottomNav=t)})}},mounted:function(){this.setChildrenInstance()},updated:function(){var t=this;this.$slots.default.forEach(function(e){e&&e.child&&e.child.isBottomNavItem&&(e.child.bottomNav=t)})},render:function(t){return t(i.a,{class:["mu-bottom-nav",this.shift?"mu-bottom-nav-shift":void 0],props:{disableTouchRipple:!this.shift,centerRipple:!1,wrapperClass:"mu-bottom-nav-shift-wrapper",containerElement:"div",rippleOpacity:.3}},this.$slots.default)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(2),o=n(1);e.default={name:"mu-bottom-nav-item",mixins:[r.a],props:{icon:{type:String,default:""},iconClass:{type:[String,Object,Array]},title:{type:String,default:""},titleClass:{type:[String,Object,Array]},href:{type:String},value:{}},data:function(){return{bottomNav:null}},created:function(){this.isBottomNavItem=!0},computed:{active:function(){return this.bottomNav&&n.i(o.c)(this.value)&&this.bottomNav.value===this.value},shift:function(){return this.bottomNav&&this.bottomNav.shift}},methods:{handleClick:function(){this.bottomNav&&this.bottomNav.handleItemClick&&this.bottomNav.handleItemClick(this.value)}},mounted:function(){for(var t=this.$parent.$children,e=0;e<t.length;e++)if(t[e].$el===this.$el){this.index=e;break}},components:{"abstract-button":i.a,icon:a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(27);e.default={name:"mu-bottom-sheet",mixins:[i.a],props:{sheetClass:{type:[String,Object,Array]}},methods:{show:function(){this.$emit("show")},hide:function(){this.$emit("hide")}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-breadcrumb",props:{separator:{type:String,default:"/"}},methods:{updateChildren:function(){var t=this;this.$children.forEach(function(e){e.separator=t.separator})}},mounted:function(){this.updateChildren()},updated:function(){var t=this;this.$nextTick(function(){t.updateChildren()})},watch:{separator:function(){this.updateChildren()}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i="mu-breadcrumb-item";e.default={name:"mu-breadcrumb-item",data:function(){return{separator:""}},props:{href:{type:String,default:""}},computed:{separatorClass:function(){return i+"-separator"},linkClass:function(){return i+"-link"},currentClass:function(){return i+"-current"}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-card"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-card-actions"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-card-header",props:{title:{type:String},titleClass:{type:[String,Array,Object]},subTitle:{type:String},subTitleClass:{type:[String,Array,Object]}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-card-media",props:{title:{type:String},titleClass:{type:[String,Array,Object]},subTitle:{type:String},subTitleClass:{type:[String,Array,Object]}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-card-text"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-card-title",props:{title:{type:String},titleClass:{type:[String,Array,Object]},subTitle:{type:String},subTitleClass:{type:[String,Array,Object]}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),r=n(38),a=n.n(r);e.default={name:"mu-checkbox",props:{name:{type:String},value:{},nativeValue:{type:String},label:{type:String,default:""},labelLeft:{type:Boolean,default:!1},labelClass:{type:[String,Object,Array]},disabled:{type:Boolean,default:!1},uncheckIcon:{type:String,default:""},checkedIcon:{type:String,default:""},iconClass:{type:[String,Object,Array]}},data:function(){return{inputValue:this.value}},watch:{value:function(t){this.inputValue=t},inputValue:function(t){this.$emit("input",t)}},methods:{handleClick:function(){},handleMouseDown:function(t){this.disabled||0===t.button&&this.$children[0].start(t)},handleMouseUp:function(){this.disabled||this.$children[0].end()},handleMouseLeave:function(){this.disabled||this.$children[0].end()},handleTouchStart:function(t){this.disabled||this.$children[0].start(t)},handleTouchEnd:function(){this.disabled||this.$children[0].end()},handleChange:function(){this.$emit("change",this.inputValue)}},components:{icon:i.a,"touch-ripple":a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={name:"mu-chip",props:{showDelete:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},deleteIconClass:{type:[Array,String,Object]},backgroundColor:{type:String},color:{type:String}},data:function(){return{focus:!1,hover:!1}},computed:{classNames:function(){return this.disabled?null:this.focus?["hover","active"]:this.hover?["hover"]:null},style:function(){return{"background-color":n.i(i.d)(this.backgroundColor),color:n.i(i.d)(this.color)}}},methods:{onMouseenter:function(){n.i(i.g)()&&(this.hover=!0)},onMouseleave:function(){n.i(i.g)()&&(this.hover=!1)},onMousedown:function(){this.focus=!0},onMouseup:function(){this.focus=!1},onTouchstart:function(){this.focus=!0},onTouchend:function(){this.focus=!1},handleDelete:function(){this.$emit("delete")},handleClick:function(t){this.disabled||this.$emit("click",t)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(62),r=n.n(i),a=n(1);e.default={name:"mu-circular-progress",props:{max:{type:Number,default:100},min:{type:Number,default:0},mode:{type:String,default:"indeterminate",validator:function(t){return["indeterminate","determinate"].indexOf(t)!==-1}},value:{type:Number,default:0},color:{type:String},size:{type:Number,default:24},strokeWidth:{type:Number,default:3}},computed:{radius:function(){return(this.size-this.strokeWidth)/2},circularSvgStyle:function(){return{width:this.size,height:this.size}},circularPathStyle:function(){var t=this.getRelativeValue();return{stroke:n.i(a.d)(this.color),"stroke-dasharray":this.getArcLength(t)+", "+this.getArcLength(1)}}},methods:{getArcLength:function(t){return t*Math.PI*(this.size-this.strokeWidth)},getRelativeValue:function(){var t=this.value,e=this.min,n=this.max;return Math.min(Math.max(e,t),n)/(n-e)}},components:{circular:r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-content-block"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(421),r=n.n(i),a=n(419),o=n.n(a),s=n(23),l=n(418),u=n.n(l),c=n(26),d=n(420),f=n.n(d),h=n(21),p=n.n(h);e.default={props:{dateTimeFormat:{type:Object,default:function(){return c.a}},autoOk:{type:Boolean,default:!1},okLabel:{type:String,default:"确定"},cancelLabel:{type:String,default:"取消"},disableYearSelection:{type:Boolean,default:!1},firstDayOfWeek:{type:Number,default:1},initialDate:{type:Date,default:function(){return new Date}},maxDate:{type:Date,default:function(){return c.d(new Date,100)}},minDate:{type:Date,default:function(){return c.d(new Date,-100)}},mode:{type:String,default:"portrait",validator:function(t){return t&&["portrait","landscape"].indexOf(t)!==-1}},shouldDisableDate:{type:Function}},data:function(){var t=c.e(this.initialDate);return t.setDate(1),{weekTexts:this.dateTimeFormat.getWeekDayArray(this.firstDayOfWeek),displayDates:[t],selectedDate:this.initialDate,slideType:"next",displayMonthDay:!0}},computed:{prevMonth:function(){return this.displayDates&&c.f(this.displayDates[0],this.minDate)>0},nextMonth:function(){return this.displayDates&&c.f(this.displayDates[0],this.maxDate)<0}},methods:{handleMonthChange:function(t){var e=c.g(this.displayDates[0],t);this.changeDislayDate(e),this.$emit("monthChange",e)},handleYearChange:function(t){if(this.selectedDate.getFullYear()!==t){var e=c.h(this.selectedDate);e.setFullYear(t),this.setSelected(e),this.selectMonth(),this.$emit("yearChange",e)}},handleSelected:function(t){this.setSelected(t),this.autoOk&&this.handleOk()},handleCancel:function(){this.$emit("dismiss")},handleOk:function(){var t=this.selectedDate,e=this.maxDate,n=this.minDate;t.getTime()>e.getTime()&&(this.selectedDate=new Date(e.getTime())),t.getTime()<n.getTime()&&(this.selectedDate=new Date(n.getTime())),this.$emit("accept",this.selectedDate)},setSelected:function(t){this.selectedDate=t,this.changeDislayDate(t)},changeDislayDate:function(t){var e=this.displayDates[0];if(t.getFullYear()!==e.getFullYear()||t.getMonth()!==e.getMonth()){this.slideType=t.getTime()>e.getTime()?"next":"prev";var n=c.e(t);n.setDate(1),this.displayDates.push(n),this.displayDates.splice(0,1)}},selectYear:function(){this.displayMonthDay=!1},selectMonth:function(){this.displayMonthDay=!0},addSelectedDays:function(t){this.setSelected(c.i(this.selectedDate,t))},addSelectedMonths:function(t){this.setSelected(c.g(this.selectedDate,t))},addSelectedYears:function(t){this.setSelected(c.d(this.selectedDate,t))},handleKeyDown:function(t){switch(p()(t)){case"up":t.altKey&&t.shiftKey?this.addSelectedYears(-1):t.shiftKey?this.addSelectedMonths(-1):this.addSelectedDays(-7);break;case"down":t.altKey&&t.shiftKey?this.addSelectedYears(1):t.shiftKey?this.addSelectedMonths(1):this.addSelectedDays(7);break;case"right":t.altKey&&t.shiftKey?this.addSelectedYears(1):t.shiftKey?this.addSelectedMonths(1):this.addSelectedDays(1);break;case"left":t.altKey&&t.shiftKey?this.addSelectedYears(-1):t.shiftKey?this.addSelectedMonths(-1):this.addSelectedDays(-1)}}},mounted:function(){var t=this;this.handleWindowKeyDown=function(e){t.handleKeyDown(e)},"undefined"!=typeof window&&window.addEventListener("keydown",this.handleWindowKeyDown)},beforeDestory:function(){window.removeEventListener("keydown",this.handleWindowKeyDown)},watch:{initialDate:function(t){this.selectedDate=t}},components:{"date-display":r.a,"calendar-toolbar":o.a,"flat-button":s.a,"calendar-month":u.a,"calendar-year":f.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(424),r=n.n(i),a=n(26);e.default={props:{displayDate:{type:Date},firstDayOfWeek:{type:Number,default:1},maxDate:{type:Date},minDate:{type:Date},selectedDate:{type:Date},shouldDisableDate:{type:Function}},data:function(){return{weeksArray:a.j(this.displayDate||new Date,this.firstDayOfWeek)}},methods:{equalsDate:function(t){return a.k(t,this.selectedDate)},isDisableDate:function(t){if(null===t)return!1;var e=!1;return this.maxDate&&this.minDate&&(e=!a.l(t,this.minDate,this.maxDate)),!e&&this.shouldDisableDate&&(e=this.shouldDisableDate(t)),e},handleClick:function(t){t&&this.$emit("selected",t)}},watch:{displayDate:function(t){return a.j(t||new Date,this.firstDayOfWeek)}},components:{"day-button":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(24);e.default={props:{dateTimeFormat:{type:Object},displayDates:{type:Array},nextMonth:{type:Boolean,default:!0},prevMonth:{type:Boolean,default:!0},slideType:{type:String}},methods:{prev:function(){this.$emit("monthChange",-1)},next:function(){this.$emit("monthChange",1)}},components:{"icon-button":i.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(425),r=n.n(i);e.default={props:{maxDate:{type:Date},minDate:{type:Date},selectedDate:{type:Date}},computed:{years:function t(){for(var e=this.minDate.getFullYear(),n=this.maxDate.getFullYear(),t=[],i=e;i<=n;i++)t.push(i);return t}},methods:{handleClick:function(t){this.$emit("change",t)},scrollToSelectedYear:function(t){var e=this.$refs.container,n=e.clientHeight,i=t.clientHeight||32,r=t.offsetTop+i/2-n/2;e.scrollTop=r}},components:{"year-button":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{dateTimeFormat:{type:Object},disableYearSelection:{type:Boolean,default:!1},monthDaySelected:{type:Boolean,default:!0},selectedDate:{type:Date}},data:function(){return{displayDates:[this.selectedDate],slideType:"next"}},computed:{selectedYear:function(){return!this.monthDaySelected},displayClass:function(){return{"selected-year":this.selectedYear}}},methods:{replaceSelected:function(t){var e=this.displayDates[0];this.slideType=t.getTime()>e.getTime()?"next":"prev",this.displayDates.push(t),this.displayDates.splice(0,1)},handleSelectYear:function(){this.disableYearSelection||this.$emit("selectYear")},handleSelectMonth:function(){this.$emit("selectMonth")}},watch:{selectedDate:function(t){this.replaceSelected(t)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(26),r=n(17),a=n(423),o=n.n(a);e.default={name:"mu-date-picker",props:{dateTimeFormat:{type:Object,default:function(){return i.a}},autoOk:{type:Boolean,default:!1},cancelLabel:{type:String},okLabel:{type:String},container:{type:String,default:"dialog",validator:function(t){return t&&["dialog","inline"].indexOf(t)!==-1}},disableYearSelection:{type:Boolean},firstDayOfWeek:{type:Number},mode:{type:String,default:"portrait",validator:function(t){return t&&["portrait","landscape"].indexOf(t)!==-1}},shouldDisableDate:{type:Function},format:{type:String,default:"YYYY-MM-DD"},maxDate:{type:[String,Date]},minDate:{type:[String,Date]},name:{type:String},label:{type:String},labelFloat:{type:Boolean,default:!1},labelClass:{type:[String,Array,Object]},labelFocusClass:{type:[String,Array,Object]},disabled:{type:Boolean,default:!1},hintText:{type:String},hintTextClass:{type:[String,Array,Object]},helpText:{type:String},helpTextClass:{type:[String,Array,Object]},errorText:{type:String},errorColor:{type:String},icon:{type:String},iconClass:{type:[String,Array,Object]},inputClass:{type:[String,Array,Object]},fullWidth:{type:Boolean,default:!1},underlineShow:{type:Boolean,default:!0},underlineClass:{type:[String,Array,Object]},underlineFocusClass:{type:[String,Array,Object]},value:{type:String}},computed:{maxLimitDate:function(){return this.maxDate?"string"==typeof this.maxDate?i.b(this.maxDate,this.format):this.maxDate:void 0},minLimitDate:function(){return this.minDate?"string"==typeof this.minDate?i.b(this.minDate,this.format):this.minDate:void 0}},data:function(){return{inputValue:this.value,dialogDate:null}},methods:{handleClick:function(){var t=this;this.disabled||setTimeout(function(){t.openDialog()},0)},handleFocus:function(t){t.target.blur(),this.$emit("focus",t)},openDialog:function(){this.disabled||(this.dialogDate=this.inputValue?i.b(this.inputValue,this.format):new Date,this.$refs.dialog.open=!0)},handleAccept:function(t){var e=i.c(t,this.format);if(this.inputValue===e)return void this.$emit("change",e);this.inputValue=e,this.$emit("change",e)},dismiss:function(){this.$emit("dismiss")},handleMonthChange:function(t){this.$emit("monthChange",t)},handleYearChange:function(t){this.$emit("yearChange",t)}},watch:{value:function(t){this.inputValue=t},inputValue:function(t){this.$emit("input",t)}},components:{"text-field":r.a,"date-picker-dialog":o.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(26),r=n(11),a=n(39),o=n(417),s=n.n(o);e.default={props:{dateTimeFormat:{type:Object,default:i.a},autoOk:{type:Boolean},cancelLabel:{type:String},okLabel:{type:String},container:{type:String,default:"dialog",validator:function(t){return t&&["dialog","inline"].indexOf(t)!==-1}},disableYearSelection:{type:Boolean},firstDayOfWeek:{type:Number},initialDate:{type:Date,default:function(){return new Date}},maxDate:{type:Date},minDate:{type:Date},mode:{type:String,default:"portrait",validator:function(t){return t&&["portrait","landscape"].indexOf(t)!==-1}},shouldDisableDate:{type:Function}},data:function(){return{open:!1,showCalendar:!1,trigger:null}},mounted:function(){this.trigger=this.$el},methods:{handleAccept:function(t){this.$emit("accept",t),this.open=!1},handleDismiss:function(){this.dismiss()},handleClose:function(t){this.dismiss()},dismiss:function(){this.open=!1,this.$emit("dismiss")},handleMonthChange:function(t){this.$emit("monthChange",t)},handleYearChange:function(t){this.$emit("yearChange",t)},hideCanlendar:function(){this.showCalendar=!1}},watch:{open:function(t){t&&(this.showCalendar=!0)}},render:function(t){var e=this.showCalendar?t(s.a,{props:{autoOk:this.autoOk,dateTimeFormat:this.dateTimeFormat,okLabel:this.okLabel,cancelLabel:this.cancelLabel,disableYearSelection:this.disableYearSelection,shouldDisableDate:this.shouldDisableDate,firstDayOfWeek:this.firstDayOfWeek,initialDate:this.initialDate,maxDate:this.maxDate,minDate:this.minDate,mode:this.mode},on:{accept:this.handleAccept,dismiss:this.handleDismiss,monthChange:this.handleMonthChange,yearChange:this.handleYearChange}}):"";return t("div",{style:{}},["dialog"===this.container?t(a.a,{props:{open:this.open,dialogClass:["mu-date-picker-dialog",this.mode]},on:{close:this.handleClose,hide:this.hideCanlendar}},[e]):t(r.a,{props:{trigger:this.trigger,overlay:!1,open:this.open},on:{close:this.handleClose,hide:this.hideCanlendar}},[e])])}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={props:{selected:{type:Boolean,default:!1},date:{type:Date},disabled:{type:Boolean,default:!1}},data:function(){return{hover:!1}},computed:{isNow:function(){var t=new Date;return this.date&&this.date.getYear()===t.getYear()&&this.date.getMonth()===t.getMonth()&&this.date.getDate()===t.getDate()},dayButtonClass:function(){return{selected:this.selected,hover:this.hover,"mu-day-button":!0,disabled:this.disabled,now:this.isNow}}},methods:{handleHover:function(){n.i(i.g)()&&!this.disabled&&(this.hover=!0)},handleHoverExit:function(){this.hover=!1},handleClick:function(t){this.$emit("click",t)}},render:function(t){return this.date?t("button",{class:this.dayButtonClass,on:{mouseenter:this.handleHover,mouseleave:this.handleHoverExit,click:this.handleClick},domProps:{disabled:this.disabled}},[t("div",{class:"mu-day-button-bg"}),t("span",{class:"mu-day-button-text",domProps:{innerHTML:this.date.getDate()}})]):t("span",{class:"mu-day-empty"})}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={props:{year:{type:[String,Number]},selected:{type:Boolean,default:!1}},data:function(){return{hover:!1}},mounted:function(){this.selected&&this.$parent.scrollToSelectedYear(this.$el)},methods:{handleHover:function(){n.i(i.g)()&&(this.hover=!0)},handleHoverExit:function(){this.hover=!1},handleClick:function(t){this.$emit("click",t)}},watch:{selected:function(t){t&&this.$parent.scrollToSelectedYear(this.$el)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(27),r=n(43),a=n(1);e.default={mixins:[i.a],name:"mu-dialog",props:{dialogClass:{type:[String,Array,Object]},title:{type:String},titleClass:{type:[String,Array,Object]},bodyClass:{type:[String,Array,Object]},actionsContainerClass:{type:[String,Array,Object]},scrollable:{type:Boolean,default:!1}},computed:{bodyStyle:function(){return{"overflow-x":"hidden","overflow-y":this.scrollable?"auto":"hidden","-webkit-overflow-scrolling":"touch"}},showTitle:function(){return this.title||this.$slots&&this.$slots.title&&this.$slots.title.length>0},showFooter:function(){return this.$slots&&this.$slots.actions&&this.$slots.actions.length>0},headerClass:function(){var t=this.scrollable,e=[];return t&&e.push("scrollable"),e.concat(n.i(a.f)(this.titleClass))},footerClass:function(){var t=this.scrollable,e=[];return t&&e.push("scrollable"),e.concat(n.i(a.f)(this.actionsContainerClass))}},mounted:function(){this.setMaxDialogContentHeight()},updated:function(){var t=this;this.$nextTick(function(){t.setMaxDialogContentHeight()})},methods:{handleWrapperClick:function(t){this.$refs.popup===t.target&&r.a.handleOverlayClick()},setMaxDialogContentHeight:function(){var t=this.$refs.dialog;if(t){if(!this.scrollable)return void(t.style.maxHeight="");var e=window.innerHeight-128,n=this.$refs,i=n.footer,r=n.title,a=n.elBody;if(i&&(e-=i.offsetHeight),r&&(e-=r.offsetHeight),a){var o=e;i&&(o-=i.offsetHeight),r&&(o-=r.offsetHeight),a.style.maxHeight=o+"px"}t.style.maxHeight=e+"px"}},show:function(){this.$emit("show")},hide:function(){this.$emit("hide")}},watch:{open:function(t){var e=this;t&&this.$nextTick(function(){e.setMaxDialogContentHeight()})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-divider",props:{inset:{type:Boolean,default:!1},shallowInset:{type:Boolean,default:!1}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(66),r=n(43),a=n(28),o=n(1),s=["msTransitionEnd","mozTransitionEnd","oTransitionEnd","webkitTransitionEnd","transitionend"];e.default={name:"mu-drawer",props:{right:{type:Boolean,default:!1},open:{type:Boolean,default:!1},docked:{type:Boolean,default:!0},width:{type:[Number,String]},zDepth:{type:Number,default:2}},data:function(){return{overlayZIndex:n.i(a.a)(),zIndex:n.i(a.a)()}},computed:{drawerStyle:function(){return{width:n.i(o.e)(this.width),"z-index":this.docked?"":this.zIndex}},overlay:function(){return!this.docked}},methods:{overlayClick:function(){this.$emit("close","overlay")},bindTransition:function(){var t=this;this.handleTransition=function(e){"transform"===e.propertyName&&t.$emit(t.open?"show":"hide")},s.forEach(function(e){t.$el.addEventListener(e,t.handleTransition)})},unBindTransition:function(){var t=this;this.handleTransition&&s.forEach(function(e){t.$el.removeEventListener(e,t.handleTransition)})},resetZIndex:function(){this.overlayZIndex=n.i(a.a)(),this.zIndex=n.i(a.a)()}},watch:{open:function(t){t&&!this.docked?r.a.open(this):r.a.close(this)},docked:function(t,e){t&&!e&&r.a.close(this)}},mounted:function(){this.open&&!this.docked&&r.a.open(this),this.bindTransition()},beforeDestroy:function(){r.a.close(this),this.unBindTransition()},components:{paper:i.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(11),r=n(25),a=n(1),o=n(70);e.default={name:"mu-dropDown-menu",mixins:[o.a],props:{value:{},maxHeight:{type:Number},autoWidth:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},labelClass:{type:[String,Array,Object]},menuClass:{type:[String,Array,Object]},menuListClass:{type:[String,Array,Object]},underlineClass:{type:[String,Array,Object]},iconClass:{type:[String,Array,Object]},openImmediately:{type:Boolean,default:!1},anchorOrigin:{type:Object,default:function(){return{vertical:"top",horizontal:"left"}}},anchorEl:{type:Object},scroller:{},separator:{type:String,default:","}},data:function(){return{openMenu:!1,trigger:null,menuWidth:null,label:""}},mounted:function(){this.trigger=this.anchorEl||this.$el,this.openMenu=this.openImmediately,this.label=this.getText(),this.setMenuWidth()},methods:{handleClose:function(){this.$emit("close"),this.openMenu=!1},handleOpen:function(){this.$emit("open"),this.openMenu=!0},itemClick:function(){this.multiple||this.handleClose()},change:function(t){this.$emit("change",t)},setMenuWidth:function(){this.$el&&(this.menuWidth=this.autoWidth?"":this.$el.offsetWidth)},onResize:function(){this.setMenuWidth()},getText:function(){var t=this;if(!this.$slots||!this.$slots.default||0===this.$slots.length||n.i(a.h)(this.value))return"";var e=[];return this.$slots.default.forEach(function(i){if(i.componentOptions&&i.componentOptions.propsData&&!n.i(a.h)(i.componentOptions.propsData.value)){var r=i.componentOptions.propsData,o=r.value,s=r.title;return o===t.value||t.multiple&&t.value.length&&t.value.indexOf(o)!==-1?(e.push(s),!1):void 0}}),e.join(this.separator)}},updated:function(){this.setMenuWidth()},watch:{anchorEl:function(t){t&&(this.trigger=t)},value:function(){this.label=this.getText()}},components:{popover:i.a,"mu-menu":r.menu}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(2),o=n(1);e.default={name:"mu-flat-button",mixins:[r.a],props:{icon:{type:String},iconClass:{type:[String,Array,Object]},type:{type:String},label:{type:String},labelPosition:{type:String,default:"after"},labelClass:{type:[String,Array,Object],default:""},primary:{type:Boolean,default:!1},secondary:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},keyboardFocused:{type:Boolean,default:!1},href:{type:String,default:""},target:{type:String},backgroundColor:{type:String,default:""},color:{type:String,default:""},hoverColor:{type:String,default:""},rippleColor:{type:String},rippleOpacity:{type:Number}},methods:{handleClick:function(t){this.$emit("click",t)},handleKeyboardFocus:function(t){this.$emit("keyboardFocus",t),this.$emit("keyboard-focus",t)},handleHover:function(t){this.$emit("hover",t)},handleHoverExit:function(t){this.$emit("hoverExit",t),this.$emit("hover-exit",t)}},computed:{buttonStyle:function(){return{"background-color":this.hover?n.i(o.d)(this.hoverColor):n.i(o.d)(this.backgroundColor),color:n.i(o.d)(this.color)}},buttonClass:function(){return{"mu-flat-button-primary":this.primary,"mu-flat-button-secondary":this.secondary,"label-before":"before"===this.labelPosition,"no-label":!this.label}}},components:{"abstract-button":i.a,icon:a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-flexbox",props:{gutter:{type:Number,default:8},orient:{type:String,default:"horizontal"},justify:String,align:String,wrap:String},computed:{styles:function(){return{"justify-content":this.justify,"align-items":this.align,"flex-wrap":this.wrap}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-flexbox-item",props:{order:{type:[Number,String],default:0},grow:{type:[Number,String],default:1},shrink:{type:[Number,String],default:1},basis:{type:[Number,String],default:"auto"}},computed:{itemStyle:function(){var t={};return t["horizontal"===this.$parent.orient?"marginLeft":"marginTop"]=this.$parent.gutter+"px",t.flex=this.grow+" "+this.shrink+" "+this.basis,t.order=this.order,t}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(2),o=n(1);e.default={name:"mu-float-button",mixins:[r.a],props:{icon:{type:String},iconClass:{type:[String,Array,Object],default:""},type:{type:String},href:{type:String,default:""},target:{type:String},disabled:{type:Boolean,default:!1},secondary:{type:Boolean,default:!1},mini:{type:Boolean,default:!1},backgroundColor:{type:String,default:""}},computed:{buttonClass:function(){var t=[];return this.secondary&&t.push("mu-float-button-secondary"),this.mini&&t.push("mu-float-button-mini"),t.join(" ")},buttonStyle:function(){return{"background-color":n.i(o.d)(this.backgroundColor)}}},methods:{handleClick:function(t){this.$emit("click",t)},handleKeyboardFocus:function(t){this.$emit("keyboardFocus",t),this.$emit("keyboard-focus",t)},handleHover:function(t){this.$emit("hover",t)},handleHoverExit:function(t){this.$emit("hoverExit",t),this.$emit("hover-exit",t)}},components:{"abstract-button":i.a,icon:a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-col",props:{width:{type:String,default:"100"},tablet:{type:String,default:""},desktop:{type:String,default:""}},computed:{classObj:function t(){var e="col-"+this.width,t={};if(t[e]=!0,this.tablet){t["tablet-"+this.tablet]=!0}if(this.desktop){t["desktop-"+this.desktop]=!0}return t}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-row",props:{gutter:{type:Boolean,default:!1}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-grid-list",props:{cellHeight:{type:Number,default:180},cols:{type:Number,default:2},padding:{type:Number,default:4}},computed:{gridListStyle:function(){return{margin:-this.padding/this.cols+"px"}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-grid-tile",props:{actionPosition:{type:String,default:"right",validator:function(t){return["left","right"].indexOf(t)!==-1}},cols:{type:Number,default:1},rows:{type:Number,default:1},title:{type:String},subTitle:{type:String},titlePosition:{type:String,default:"bottom",validator:function(t){return["top","bottom"].indexOf(t)!==-1}},titleBarClass:{type:[String,Array,Object]}},computed:{tileClass:function(){var t=[];return"top"===this.titlePosition&&t.push("top"),"left"===this.actionPosition&&t.push("action-left"),this.$slots&&this.$slots.title&&this.$slots.subTitle&&this.$slots.title.length>0&&this.$slots.subTitle.length>0&&t.push("multiline"),t},style:function(){return{width:this.cols/this.$parent.cols*100+"%",padding:this.$parent.padding/2+"px",height:this.$parent.cellHeight*this.rows+"px"}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={name:"mu-icon",props:{value:{type:String},size:{type:Number},color:{type:String,default:""}},computed:{iconStyle:function(){return{"font-size":this.size+"px",width:this.size+"px",height:this.size+"px",color:n.i(i.d)(this.color)}}},methods:{handleClick:function(t){this.$emit("click",t)}},render:function(t){var e=this.value,n=this.iconStyle,i=this.handleClick;if(!e)return null;var r=0!==e.indexOf(":"),a=r?e:"";return t("i",{class:["mu-icon",r?"material-icons":e.substring(1)],style:n,on:{click:i}},a)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(2),o=n(40);e.default={name:"mu-icon-button",mixins:[r.a],props:{icon:{type:String},iconClass:{type:[String,Array,Object],default:""},type:{type:String},href:{type:String,default:""},target:{type:String},disabled:{type:Boolean,default:!1},keyboardFocused:{type:Boolean,default:!1},tooltip:{type:String},tooltipPosition:{type:String,default:"bottom-center"},touch:{type:Boolean,default:!1}},computed:{verticalPosition:function(){return this.tooltipPosition.split("-")[0]},horizontalPosition:function(){return this.tooltipPosition.split("-")[1]}},data:function(){return{tooltipShown:!1,tooltipTrigger:null}},methods:{handleClick:function(t){this.$emit("click",t)},handleHover:function(t){this.tooltipShown=!0,this.$emit("hover",t)},handleHoverExit:function(t){this.tooltipShown=!1,this.$emit("hoverExit",t),this.$emit("hover-exit",t)},handleKeyboardFocus:function(t){this.$emit("keyboardFocus",t),this.$emit("keyboard-focus",t)}},mounted:function(){this.tooltipTrigger=this.$el},components:{"abstract-button":i.a,icon:a.a,tooltip:o.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(24),r=n(11),a=n(25);e.default={name:"mu-icon-menu",props:{icon:{type:String,required:!0},iconClass:{type:[String,Array,Object]},menuClass:{type:[String,Array,Object]},menuListClass:{type:[String,Array,Object]},value:{},multiple:{type:Boolean,default:!1},desktop:{type:Boolean,default:!1},open:{type:Boolean,default:!1},maxHeight:{type:Number},anchorOrigin:{type:Object,default:function(){return{vertical:"top",horizontal:"left"}}},targetOrigin:{type:Object,default:function(){return{vertical:"top",horizontal:"left"}}},scroller:{},itemClickClose:{type:Boolean,default:!0},tooltip:{type:String},tooltipPosition:{type:String,default:"bottom-center"}},data:function(){return{openMenu:this.open,trigger:null}},methods:{handleOpen:function(){this.openMenu=!0,this.$emit("open")},handleClose:function(){this.openMenu=!1,this.$emit("close")},change:function(t){this.$emit("change",t)},itemClick:function(t){this.itemClickClose&&this.handleClose(),this.$emit("itemClick",t),this.$emit("item-click",t)}},mounted:function(){this.trigger=this.$el},watch:{open:function(t,e){t!==e&&(this.openMenu=t)}},components:{"icon-button":i.a,popover:r.a,"mu-menu":a.menu}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(62),r=n.n(i),a=n(71);e.default={name:"mu-infinite-scroll",mixins:[a.a],props:{loading:{type:Boolean,default:!1},loadingText:{type:String,default:"正在加载。。。"},isLoaded:{type:Boolean,default:!1}},methods:{onScroll:function(){if(!this.loading&&!this.isLoaded){var t=this.scroller,e=t===window,n=e?t.scrollY:t.scrollTop;(e?document.documentElement.scrollHeight||document.body.scrollHeight:t.scrollHeight)-n-5<=(e?window.innerHeight:t.offsetHeight)&&this.$emit("load")}}},components:{circular:r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={props:{mergeStyle:{type:Object,default:function(){return{}}},color:{type:String,default:""},opacity:{type:Number}},computed:{styles:function(){return n.i(i.b)({},{color:this.color,opacity:this.opacity},this.mergeStyle)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={name:"circle",props:{size:{type:Number,default:24},color:{type:String,default:""},borderWidth:{type:Number,default:3},secondary:{type:Boolean,default:!1}},computed:{spinnerStyle:function(){return{"border-color":n.i(i.d)(this.color)}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={methods:{beforeEnter:function(t){t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.style.height="0"},enter:function(t){t.dataset.oldOverflow=t.style.overflow,t.style.display="block",0!==t.scrollHeight?(t.style.height=t.scrollHeight+"px",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom):(t.style.height="",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom),t.style.overflow="hidden"},afterEnter:function(t){t.style.display="",t.style.height="",t.style.overflow=t.dataset.oldOverflow,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom},beforeLeave:function(t){t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.dataset.oldOverflow=t.style.overflow,t.style.display="block",0!==t.scrollHeight&&(t.style.height=t.scrollHeight+"px"),t.style.overflow="hidden"},leave:function(t){0!==t.scrollHeight&&setTimeout(function(){t.style.height=0,t.style.paddingTop=0,t.style.paddingBottom=0})},afterLeave:function(t){t.style.display="none",t.style.height="",t.style.overflow=t.dataset.oldOverflow,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{color:{type:String,default:""},opacity:{type:Number}},computed:{style:function(){return{color:this.color,opacity:this.opacity}}},methods:{setRippleSize:function(){var t=this.$refs.innerCircle,e=t.offsetHeight,n=t.offsetWidth,i=Math.max(e,n),r=0;t.style.top.indexOf("px",t.style.top.length-2)!==-1&&(r=parseInt(t.style.top)),t.style.height=i+"px",t.style.top=e/2-i/2+r+"px"}},mounted:function(){this.setRippleSize()},updated:function(){this.setRippleSize()}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-overlay",props:{show:{type:Boolean,default:!1},fixed:{type:Boolean,default:!1},onClick:{type:Function},opacity:{type:Number,default:.4},color:{type:String,default:"#000"},zIndex:{type:Number}},computed:{overlayStyle:function(){return{opacity:this.opacity,"background-color":this.color,position:this.fixed?"fixed":"","z-index":this.zIndex}}},methods:{prevent:function(t){t.preventDefault(),t.stopPropagation()},handleClick:function(){this.onClick&&this.onClick()}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(442),r=n.n(i),a=n(44);e.default={props:{centerRipple:{type:Boolean,default:!0},rippleWrapperClass:{},color:{type:String,default:""},opacity:{type:Number}},data:function(){return{nextKey:0,ripples:[]}},mounted:function(){this.ignoreNextMouseDown=!1},methods:{start:function(t,e){if(this.ignoreNextMouseDown&&!e)return void(this.ignoreNextMouseDown=!1);this.ripples.push({key:this.nextKey++,color:this.color,opacity:this.opacity,style:this.centerRipple?{}:this.getRippleStyle(t)}),this.ignoreNextMouseDown=e},end:function(){0!==this.ripples.length&&(this.ripples.splice(0,1),this.stopListeningForScrollAbort())},stopListeningForScrollAbort:function(){this.handleMove||(this.handleMove=this.handleTouchMove.bind(this)),document.body.removeEventListener("touchmove",this.handleMove,!1)},startListeningForScrollAbort:function(t){this.firstTouchY=t.touches[0].clientY,this.firstTouchX=t.touches[0].clientX,document.body.addEventListener("touchmove",this.handleMove,!1)},handleMouseDown:function(t){0===t.button&&this.start(t,!1)},handleTouchStart:function(t){t.touches&&(this.startListeningForScrollAbort(t),this.startTime=Date.now()),this.start(t.touches[0],!0)},handleTouchMove:function(t){var e=Math.abs(t.touches[0].clientY-this.firstTouchY),n=Math.abs(t.touches[0].clientX-this.firstTouchX);(e>6||n>6)&&this.end()},getRippleStyle:function(t){var e=this.$refs.holder,n=e.offsetHeight,i=e.offsetWidth,r=a.a(e),o=t.touches&&t.touches.length,s=o?t.touches[0].pageX:t.pageX,l=o?t.touches[0].pageY:t.pageY,u=s-r.left,c=l-r.top,d=this.calcDiag(u,c),f=this.calcDiag(i-u,c),h=this.calcDiag(i-u,n-c),p=this.calcDiag(u,n-c),m=Math.max(d,f,h,p),v=2*m;return{directionInvariant:!0,height:v+"px",width:v+"px",top:c-m+"px",left:u-m+"px"}},calcDiag:function(t,e){return Math.sqrt(t*t+e*e)}},components:{"circle-ripple":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={name:"mu-linear-progress",props:{max:{type:Number,default:100},min:{type:Number,default:0},mode:{type:String,default:"indeterminate",validator:function(t){return["indeterminate","determinate"].indexOf(t)!==-1}},value:{type:Number,default:0},color:{type:String},size:{type:Number}},computed:{percent:function(){return(this.value-this.min)/(this.max-this.min)*100},linearStyle:function(){var t=this.size,e=this.color,r=this.mode,a=this.percent;return{height:t+"px","background-color":n.i(i.d)(e),"border-radius":(t?t/2:"")+"px",width:"determinate"===r?a+"%":""}},linearClass:function(){return"mu-linear-progress-"+this.mode}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-list",props:{nestedLevel:{type:Number,default:0},value:{}},methods:{handleChange:function(t){this.$emit("change",t)},handleItemClick:function(t){this.$emit("itemClick",t),this.$emit("item-click",t)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(24),o=n(91),s=n.n(o),l=n(89),u=n.n(l),c=n(1);e.default={name:"mu-list-item",mixins:[r.a],props:{href:{type:String},target:{type:String},title:{type:String,default:""},titleClass:{type:[String,Object,Array]},afterText:{type:String,default:""},afterTextClass:{type:[String,Object,Array]},describeText:{type:String,default:""},describeTextClass:{type:[String,Object,Array]},describeLine:{type:Number,default:2},inset:{type:Boolean,default:!1},nestedListClass:{type:[String,Object,Array]},open:{type:Boolean,default:!0},toggleNested:{type:Boolean,default:!1},toggleIconClass:{type:[String,Object,Array]},disabled:{type:Boolean,default:!1},disableRipple:{type:Boolean,default:!1},value:{}},data:function(){return{nestedOpen:this.open}},computed:{hasAvatar:function(){return this.$slots&&(this.$slots.leftAvatar&&this.$slots.leftAvatar.length>0||this.$slots.rightAvatar&&this.$slots.rightAvatar.length>0)},nestedLevel:function(){return this.$parent.nestedLevel+1},showLeft:function(){return this.$slots&&(this.$slots.left&&this.$slots.left.length>0||this.$slots.leftAvatar&&this.$slots.leftAvatar.length>0)},showRight:function(){return this.toggleNested||this.$slots&&(this.$slots.right&&this.$slots.right.length>0||this.$slots.rightAvatar&&this.$slots.rightAvatar.length>0)},showTitleRow:function(){return this.title||this.$slots&&this.$slots.title&&this.$slots.title.length>0||this.afterText||this.$slots&&this.$slots.after&&this.$slots.after.length>0},showDescribe:function(){return this.describeText||this.$slots&&this.$slots.describe&&this.$slots.describe.length>0},itemClass:function(){var t=["mu-item"];return(this.showLeft||this.inset)&&t.push("show-left"),this.showRight&&t.push("show-right"),this.hasAvatar&&t.push("has-avatar"),this.selected&&t.push("selected"),t.join(" ")},itemStyle:function(){return{"margin-left":18*(this.nestedLevel-1)+"px"}},textStyle:function(){return{"max-height":18*this.describeLine+"px","-webkit-line-clamp":this.describeLine}},showNested:function(){return this.nestedOpen&&this.$slots&&this.$slots.nested&&this.$slots.nested.length>0},selected:function(){return n.i(c.c)(this.$parent.value)&&n.i(c.c)(this.value)&&this.$parent.value===this.value},nestedSelectValue:function(){return this.$parent.value}},methods:{handleToggleNested:function(){this.nestedOpen=!this.nestedOpen,this.$emit("toggleNested",this.nestedOpen),this.$emit("toggle-nested",this.nestedOpen)},handleClick:function(t){this.$emit("click",t),this.$parent.handleItemClick&&this.$parent.handleItemClick(this),n.i(c.c)(this.value)&&this.$parent.handleChange(this.value),this.toggleNested&&this.handleToggleNested()},handleKeyboardFocus:function(t){this.$emit("keyboardFocus",t),this.$emit("keyboard-focus",t)},handleHover:function(t){this.$emit("hover",t)},handleHoverExit:function(t){this.$emit("hoverExit",t),this.$emit("hover-exit",t)},handleNestedChange:function(t){this.$parent.handleChange(t)},stop:function(t){t.stopPropagation()}},watch:{open:function(t,e){t!==e&&(this.nestedOpen=t)}},components:{"abstract-button":i.a,"mu-list":s.a,"icon-button":a.a,"expand-transition":u.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),r=n(21),a=n.n(r),o=n(42);e.default={name:"mu-menu",props:{desktop:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},autoWidth:{type:Boolean,default:!0},width:{type:[String,Number]},maxHeight:{type:Number},disableAutoFocus:{type:Boolean,default:!1},initiallyKeyboardFocused:{type:Boolean,default:!1},listClass:{type:[String,Object,Array]},popover:{type:Boolean,default:!1},value:{}},data:function(){return{focusIndex:-1,isKeyboardFocused:!1}},computed:{keyWidth:function(){return this.desktop?64:56},contentWidth:function(){return this.autoWidth?"":n.i(i.e)(this.width)},menuListClass:function(){var t=this.desktop,e=this.listClass,r=[];return t&&r.push("mu-menu-destop"),r.concat(n.i(i.f)(e))}},mounted:function(){this.setWidth();var t=this.getSelectedIndex();this.setScollPosition(),this.focusIndex=this.disableAutoFocus?-1:t>=0?t:this.initiallyKeyboardFocused?0:-1,this.isKeyboardFocused=this.initiallyKeyboardFocused},beforeUpdate:function(){var t=this.getSelectedIndex();this.focusIndex=this.disableAutoFocus?-1:t>=0?t:0},updated:function(){this.setWidth()},methods:{clickoutside:function(){this.setFocusIndex(-1,!1)},setWidth:function(){if(this.autoWidth){var t=this.$el,e=this.$refs.list,n=t.offsetWidth;if(0!==n){var i=this.keyWidth,r=1.5*i,a=n/i,o=void 0;a=a<=1.5?1.5:Math.ceil(a),o=a*i,o<r&&(o=r),t.style.width=o+"px",e.style.width=o+"px"}}},handleChange:function(t){this.$emit("change",t)},handleClick:function(t){this.$emit("itemClick",t),this.$emit("item-click",t)},handleKeydown:function(t){switch(a()(t)){case"down":t.stopPropagation(),t.preventDefault(),this.incrementKeyboardFocusIndex();break;case"tab":t.stopPropagation(),t.preventDefault(),t.shiftKey?this.decrementKeyboardFocusIndex():this.incrementKeyboardFocusIndex();break;case"up":t.stopPropagation(),t.preventDefault(),this.decrementKeyboardFocusIndex()}},decrementKeyboardFocusIndex:function(){var t=this.focusIndex,e=this.getMenuItemCount()-1;t--,t<0&&(t=e),this.setFocusIndex(t,!0)},incrementKeyboardFocusIndex:function(){var t=this.focusIndex,e=this.getMenuItemCount()-1;t++,t>e&&(t=0),this.setFocusIndex(t,!0)},getMenuItemCount:function(){var t=0;return this.$children.forEach(function(e){e._isMenuItem&&!e.disabled&&t++}),t},getSelectedIndex:function(){var t=-1,e=0;return this.$children.forEach(function(n){n.active&&(t=e),n._isMenuItem&&!n.disabled&&e++}),t},setFocusIndex:function(t,e){this.focusIndex=t,this.isKeyboardFocused=e},setScollPosition:function(t){var e=this.desktop,n=null;this.$children.forEach(function(t){t.active&&(n=t)});var i=e?32:48;if(n){var r=n.$el.offsetTop,a=r-i;a<i&&(a=0),this.$refs.list.scrollTop=a}}},watch:{focusIndex:function(t,e){var n=this;if(t!==e){var i=0;this.$children.forEach(function(e){if(e._isMenuItem&&!e.disabled){var r=i===t,a="none";r&&(a=n.isKeyboardFocused?"keyboard-focused":"focused"),e.focusState=a,i++}})}},popover:function(t){var e=this;t&&setTimeout(function(){var t=e.getSelectedIndex();e.disableAutoFocus?e.$el.focus():e.setFocusIndex(t,!1)},300)}},directives:{clickoutside:o.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(2),o=n(1),s=n(11),l=n(92),u=n.n(l);e.default={name:"mu-menu-item",mixins:[r.a],props:{href:{type:String},target:{type:String},title:{type:String},titleClass:{type:[String,Object,Array]},afterText:{type:String},afterTextClass:{type:[String,Object,Array]},disabled:{type:Boolean,default:!1},disableFocusRipple:{type:Boolean,default:!1},inset:{type:Boolean,default:!1},leftIcon:{type:String},leftIconColor:{type:String},leftIconClass:{type:[String,Object,Array]},rightIcon:{type:String},rightIconColor:{type:String},rightIconClass:{type:[String,Object,Array]},nestedMenuClass:{type:[String,Object,Array]},nestedMenuListClass:{type:[String,Object,Array]},value:{},nestedMenuValue:{}},computed:{showAfterText:function(){return!this.rightIcon&&this.afterText&&(!this.$slot||!this.$slot.after||0===this.$slot.after.length)},active:function(){return n.i(o.c)(this.$parent.value)&&n.i(o.c)(this.value)&&(this.$parent.value===this.value||this.$parent.multiple&&this.$parent.value.indexOf(this.value)!==-1)}},data:function(){return this._isMenuItem=!0,{openMenu:!1,trigger:null,focusState:"none"}},mounted:function(){this.trigger=this.$el,this.applyFocusState()},methods:{handleClick:function(t){this.$emit("click",t),this.$parent.handleClick(this),this.open(),n.i(o.c)(this.value)&&this.$parent.handleChange(this.value)},filterColor:function(t){return n.i(o.d)(t)},open:function(){this.openMenu=this.$slots&&this.$slots.default&&this.$slots.default.length>0},close:function(){this.openMenu=!1},handleKeyboardFocus:function(t){this.$emit("keyboardFocus",t),this.$emit("keyboard-focus",t)},handleHover:function(t){this.$emit("hover",t)},handleHoverExit:function(t){this.$emit("hoverExit",t),this.$emit("hover-exit",t)},applyFocusState:function(){var t=this.$refs.button;if(t){var e=t.$el;switch(this.focusState){case"none":e.blur();break;case"focused":e.focus();break;case"keyboard-focused":t.setKeyboardFocus(),e.focus()}}}},watch:{focusState:function(){this.applyFocusState()}},components:{"abstract-button":i.a,icon:a.a,popover:s.a,"mu-menu":u.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5);e.default={props:{icon:{type:String},index:{type:Number},isCircle:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},isActive:{type:Boolean,default:!1},identifier:{type:String}},data:function(){return{}},methods:{handleHover:function(t){this.$emit("hover",t)},handleHoverExit:function(t){this.$emit("hoverExit",t),this.$emit("hover-exit",t)},handleClick:function(){this.index?this.$emit("click",this.index):this.$emit("click",this.identifier)}},components:{"abstract-button":i.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(445),r=n.n(i),a=n(67),o=n(17),s=n(93),l=n.n(s);e.default={name:"mu-pagination",props:{total:{type:Number,default:1},current:{type:Number,default:1},defaultPageSize:{type:Number,default:10},pageSize:{type:Number},showSizeChanger:{type:Boolean,default:!1},pageSizeOption:{type:Array,default:function(){return[10,20,30,40]}},pageSizeChangerText:{type:String,default:function(){return" / 页"}}},data:function(){return{leftDisabled:!1,rightDisabled:!1,actualCurrent:this.current,actualPageSize:this.defaultPageSize,totalPageCount:0,pageList:[],quickJumpPage:""}},mounted:function(){this.iconIsDisabled(this.actualCurrent),this.showSizeChanger?this.actualPageSize=this.pageSizeOption[0]:this.pageSize&&(this.actualPageSize=this.pageSize),this.totalPageCount=Math.ceil(this.total/this.actualPageSize),this.pageList=this.calcPageList(this.actualCurrent)},methods:{handleClick:function(t){if("number"==typeof t)this.actualCurrent=t;else switch(t){case"singleBack":this.actualCurrent=Math.max(1,this.actualCurrent-1);break;case"backs":this.actualCurrent=Math.max(1,this.actualCurrent-5);break;case"forwards":this.actualCurrent=Math.min(this.totalPageCount,this.actualCurrent+5);break;case"singleForward":this.actualCurrent=Math.min(this.totalPageCount,this.actualCurrent+1)}},iconIsDisabled:function(t){this.leftDisabled=1===t,this.rightDisabled=t===this.totalPageCount},calcPageList:function(t){var e=[];if(this.totalPageCount>5){var n=Math.max(2,t-2),i=Math.min(t+2,this.totalPageCount-1);t-1<2&&(i=4),this.totalPageCount-t<2&&(n=this.totalPageCount-3);for(var r=n;r<=i;r++)e.push(r)}else for(var a=2;a<this.totalPageCount;a++)e.push(a);return e},pageSizeAndTotalChange:function(t){this.iconIsDisabled(t),this.pageList=this.calcPageList(t)}},components:{"page-item":r.a,"select-field":a.a,"text-field":o.a,"menu-item":l.a},watch:{actualCurrent:function(t){0!==t&&(this.pageSizeAndTotalChange(t),this.$emit("pageChange",t),this.$emit("page-change",t))},actualPageSize:function(t,e){var n=e*(this.actualCurrent-1),i=this.actualCurrent;this.actualCurrent=Math.floor(n/t)+1,this.totalPageCount=Math.ceil(this.total/this.actualPageSize),i===this.actualCurrent&&this.pageSizeAndTotalChange(i),this.$emit("pageSizeChange",t),this.$emit("page-size-change",t)},total:function(t){var e=this.actualCurrent;this.actualCurrent=Math.min(this.totalPageCount,this.actualCurrent),this.totalPageCount=Math.ceil(this.total/this.actualPageSize),e===this.actualCurrent&&this.pageSizeAndTotalChange(e)},current:function(t){this.actualCurrent=t}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-paper",props:{circle:{type:Boolean,default:!1},rounded:{type:Boolean,default:!0},zDepth:{type:Number,default:1}},computed:{paperClass:function(){var t=[];return this.circle&&t.push("mu-paper-circle"),this.rounded&&t.push("mu-paper-round"),t.push("mu-paper-"+this.zDepth),t}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(99),r=n.n(i),a=n(73),o=n(143),s=n(44),l=36;e.default={props:{divider:{type:Boolean,default:!1},content:{type:String,default:""},values:{type:Array,default:function(){return[]}},value:{},textAlign:{type:String,default:""},width:{type:String,default:""},visibleItemCount:{type:Number,default:5}},data:function(){return{animate:!1}},computed:{contentHeight:function(){return l*this.visibleItemCount},valueIndex:function(){return this.values.indexOf(this.value)},dragRange:function(){var t=this.values,e=this.visibleItemCount;return[-l*(t.length-Math.ceil(e/2)),l*Math.floor(e/2)]}},mounted:function(){this.divider||(this.initEvents(),this.doOnValueChange())},methods:{value2Translate:function(t){var e=this.values,n=e.indexOf(t),i=Math.floor(this.visibleItemCount/2);if(n!==-1)return(n-i)*-l},translate2Value:function(t){t=Math.round(t/l)*l;var e=-(t-Math.floor(this.visibleItemCount/2)*l)/l;return this.values[e]},doOnValueChange:function(){var t=this.value,e=this.$refs.wrapper;o.a.translateElement(e,null,this.value2Translate(t))},doOnValuesChange:function(){var t=this.$el,e=t.querySelectorAll(".mu-picker-item");Array.prototype.forEach.call(e,function(t,e){o.a.translateElement(t,null,l*e)})},initEvents:function(){var t=this,e=this.$refs.wrapper,n=new a.a(this.$el),i=0,u=void 0,c=void 0;n.start(function(){i=o.a.getElementTranslate(e).top}).drag(function(t,n){n.preventDefault(),n.stopPropagation();var r=i+t.y;o.a.translateElement(e,0,r),u=r-c||r,c=r}).end(function(n){var i=o.a.getElementTranslate(e).top,a=void 0;n.time<300&&(a=i+7*u);var c=t.dragRange;t.animate=!0,s.b(e,function(){t.animate=!1}),r.a.nextTick(function(){var n=void 0;n=a?Math.round(a/l)*l:Math.round(i/l)*l,n=Math.max(Math.min(n,c[1]),c[0]),o.a.translateElement(e,null,n),t.$emit("change",t.translate2Value(n))})})}},watch:{values:function(t){this.valueIndex===-1&&(this.value=(t||[])[0])},value:function(){this.doOnValueChange()}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(448),r=n.n(i);e.default={name:"mu-picker",props:{visibleItemCount:{type:Number,default:5},values:{type:Array,default:function(){return[]}},slots:{type:Array,default:function(){return[]}}},methods:{change:function(t,e){this.$emit("change",e[0],t)}},components:{"picker-slot":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(41),r=n.n(i),a=n(71),o=n(27),s=n(70);e.default={name:"mu-popover",mixins:[a.a,s.a,o.a],props:{overlay:{default:!1},overlayOpacity:{default:.01},trigger:{},autoPosition:{type:Boolean,default:!0},anchorOrigin:{type:Object,default:function(){return{vertical:"bottom",horizontal:"left"}}},targetOrigin:{type:Object,default:function(){return{vertical:"top",horizontal:"left"}}},popoverClass:{type:[String,Object,Array]}},methods:{getAnchorPosition:function(t){var e=t.getBoundingClientRect(),n={top:e.top,left:e.left,width:t.width,height:t.height};return n.right=e.right||n.left+n.width,n.bottom=e.bottom||n.top+n.height,n.middle=n.left+(n.right-n.left)/2,n.center=n.top+(n.bottom-n.top)/2,n},getTargetPosition:function(t){return{top:0,center:t.offsetHeight/2,bottom:t.offsetHeight,left:0,middle:t.offsetWidth/2,right:t.offsetWidth}},getElInfo:function(t){var e=t.getBoundingClientRect();return{left:e.left,top:e.top,width:t.offsetWidth,height:t.offsetHeight}},setStyle:function(){if(this.open){var t=this.targetOrigin,e=this.anchorOrigin,n=this.$refs.popup,i=this.getAnchorPosition(this.trigger),r=this.getTargetPosition(n),a={top:i[e.vertical]-r[t.vertical],left:i[e.horizontal]-r[t.horizontal]};if(i.top<0||i.top>window.innerHeight||i.left<0||i.left>window.innerWidth)return void this.close("overflow");this.autoPosition&&(r=this.getTargetPosition(n),a=this.applyAutoPositionIfNeeded(i,r,t,e,a)),n.style.left=Math.max(0,a.left)+"px",n.style.top=Math.max(0,a.top)+"px"}},getOverlapMode:function(t,e,n){return[t,e].indexOf(n)>=0?"auto":t===e?"inclusive":"exclusive"},getPositions:function(t,e){var n=r()({},t),i=r()({},e),a={x:["left","right"].filter(function(t){return t!==i.horizontal}),y:["top","bottom"].filter(function(t){return t!==i.vertical})},o={x:this.getOverlapMode(n.horizontal,i.horizontal,"middle"),y:this.getOverlapMode(n.vertical,i.vertical,"center")};return a.x.splice("auto"===o.x?0:1,0,"middle"),a.y.splice("auto"===o.y?0:1,0,"center"),"auto"!==o.y&&(n.vertical="top"===n.vertical?"bottom":"top","inclusive"===o.y&&(i.vertical=i.vertical)),"auto"!==o.x&&(n.horizontal="left"===n.horizontal?"right":"left","inclusive"===o.y&&(i.horizontal=i.horizontal)),{positions:a,anchorPos:n}},applyAutoPositionIfNeeded:function(t,e,n,i,r){var a=this.getPositions(i,n),o=a.positions,s=a.anchorPos;if(r.top<0||r.top+e.bottom>window.innerHeight){var l=t[s.vertical]-e[o.y[0]];l+e.bottom<=window.innerHeight?r.top=Math.max(0,l):(l=t[s.vertical]-e[o.y[1]])+e.bottom<=window.innerHeight&&(r.top=Math.max(0,l))}if(r.left<0||r.left+e.right>window.innerWidth){var u=t[s.horizontal]-e[o.x[0]];u+e.right<=window.innerWidth?r.left=Math.max(0,u):(u=t[s.horizontal]-e[o.x[1]])+e.right<=window.innerWidth&&(r.left=Math.max(0,u))}return r},close:function(t){this.$emit("close",t)},clickOutSide:function(t){this.close("clickOutSide")},onScroll:function(){this.setStyle()},onResize:function(){this.setStyle()},show:function(){this.$emit("show")},hide:function(){this.$emit("hide")}},mounted:function(){this.setStyle()},updated:function(){var t=this;setTimeout(function(){t.setStyle()},0)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(27),r=n(1);e.default={name:"mu-popup",mixins:[i.a],props:{popupClass:{type:[String,Object,Array]},popupTransition:{type:String,default:""},position:{type:String,default:""}},data:function(){return{transition:this.popupTransition}},created:function(){this.popupTransition||(this.transition="popup-slide-"+this.position)},computed:{popupCss:function(){var t=this.position,e=this.popupClass,i=[];return t&&i.push("mu-popup-"+t),i.concat(n.i(r.f)(e))}},methods:{show:function(){this.$emit("show")},hide:function(){this.$emit("hide")}},watch:{popupTransition:function(t,e){t!==e&&(this.transition=t)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),r=n(38),a=n.n(r);e.default={name:"mu-radio",props:{name:{type:String},value:{type:String},nativeValue:{type:String},label:{type:String,default:""},labelLeft:{type:Boolean,default:!1},labelClass:{type:[String,Object,Array]},disabled:{type:Boolean,default:!1},uncheckIcon:{type:String,default:""},checkedIcon:{type:String,default:""},iconClass:{type:[String,Object,Array]}},data:function(){return{inputValue:this.value}},watch:{value:function(t){this.inputValue=t},inputValue:function(t){this.$emit("input",t)}},methods:{handleClick:function(){},handleMouseDown:function(t){this.disabled||0===t.button&&this.$children[0].start(t)},handleMouseUp:function(){this.disabled||this.$children[0].end()},handleMouseLeave:function(){this.disabled||this.$children[0].end()},handleTouchStart:function(t){this.disabled||this.$children[0].start(t)},handleTouchEnd:function(){this.disabled||this.$children[0].end()},handleChange:function(){this.$emit("change",this.inputValue)}},components:{icon:i.a,"touch-ripple":a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(1),o=n(2);e.default={name:"mu-raised-button",mixins:[r.a],props:{icon:{type:String},iconClass:{type:[String,Array,Object]},label:{type:String},labelPosition:{type:String,default:"after"},labelClass:{type:[String,Array,Object],default:""},primary:{type:Boolean,default:!1},secondary:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},keyboardFocused:{type:Boolean,default:!1},fullWidth:{type:Boolean,default:!1},type:{type:String},href:{type:String,default:""},target:{type:String},backgroundColor:{type:String,default:""},color:{type:String,default:""},rippleColor:{type:String},rippleOpacity:{type:Number}},data:function(){return{focus:!1}},computed:{buttonStyle:function(){return{"background-color":n.i(a.d)(this.backgroundColor),color:n.i(a.d)(this.color)}},inverse:function(){return this.primary||this.secondary||this.backgroundColor},buttonClass:function(){return{"mu-raised-button-primary":this.primary,"mu-raised-button-secondary":this.secondary,"label-before":"before"===this.labelPosition,"mu-raised-button-inverse":this.inverse,"mu-raised-button-full":this.fullWidth,focus:this.focus,"no-label":!this.label}}},methods:{handleClick:function(t){this.$emit("click",t)},handleKeyboardFocus:function(t){this.focus=t,this.$emit("keyboardFocus",t),this.$emit("keyboard-focus",t)},handleHover:function(t){this.$emit("hover",t)},handleHoverExit:function(t){this.$emit("hoverExit",t),this.$emit("hover-exit",t)}},components:{"abstract-button":i.a,icon:o.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(73),r=n(62),a=n.n(r),o=n(44),s=130,l=-68;e.default={name:"mu-refresh-control",props:{refreshing:{type:Boolean,default:!1},trigger:{}},data:function(){return{y:0,draging:!1,state:"pending"}},computed:{refreshStyle:function(){var t={};if(!this.refreshing&&this.draging){var e="translate3d(0, "+(this.y+l)+"px, 0) ";t["-webkit-transform"]=t.transform=e}return t},circularStyle:function(){var t={};if(!this.refreshing&&this.draging){var e=this.y/s,n="rotate("+360*e+"deg)",i=this.y/Math.abs(l);t["-webkit-transform"]=t.transform=n,t.opacity=i}return t},refreshClass:function(){var t=[];switch(this.state){case"pending":break;case"ready":t.push("mu-refresh-control-noshow");break;case"dragStart":t.push("mu-refresh-control-hide");break;case"dragAnimate":t.push("mu-refresh-control-animate"),t.push("mu-refresh-control-hide");break;case"refreshAnimate":t.push("mu-refresh-control-animate"),t.push("mu-refresh-control-noshow")}return this.refreshing&&t.push("mu-refresh-control-refreshing"),t}},mounted:function(){this.bindDrag()},beforeDestory:function(){this.unbindDrag()},methods:{clearState:function(){this.state="ready",this.draging=!1,this.y=0},getScrollEventTarget:function(t){for(var e=t;e&&"HTML"!==e.tagName&&"BODY"!==e.tagName&&1===e.nodeType;){var n=document.defaultView.getComputedStyle(e).overflowY;if("scroll"===n||"auto"===n)return e;e=e.parentNode}return window},getScrollTop:function(t){return t===window?Math.max(window.pageYOffset||0,document.documentElement.scrollTop):t.scrollTop},bindDrag:function(){var t=this;if(this.trigger){var e=this.drager=new i.a(this.trigger);this.state="ready",e.start(function(){if(!t.refreshing){t.state="dragStart";0===t.getScrollTop(t.getScrollEventTarget(t.$el))&&(t.draging=!0)}}).drag(function(n,i){var r=t.getScrollTop(t.getScrollEventTarget(t.$el));n.y<5||t.refreshing||0!==r||(0!==r||t.draging||(t.draging=!0,e.reset(i)),t.draging&&n.y>0&&(i.preventDefault(),i.stopPropagation()),t.y=n.y/2,t.y<0&&(t.y=1),t.y>s&&(t.y=s))}).end(function(e,n){if(!e.y||e.y<5)return void t.clearState();var i=t.y+l>0&&t.draging;t.state="dragAnimate",i?(t.draging=!1,t.$emit("refresh")):(t.y=0,o.b(t.$el,t.clearState.bind(t)))})}},unbindDrag:function(){this.drager&&(this.drager.destory(),this.drager=null)}},watch:{refreshing:function(t){t?this.state="refreshAnimate":o.b(this.$el,this.clearState.bind(this))},trigger:function(t,e){t!==e&&(this.unbindDrag(),this.bindDrag())}},components:{circular:a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(17),r=n(65),a=n(1);e.default={name:"mu-select-field",props:{name:{type:String},label:{type:String},labelFloat:{type:Boolean,default:!1},labelClass:{type:[String,Array,Object]},labelFocusClass:{type:[String,Array,Object]},disabled:{type:Boolean,default:!1},hintText:{type:String},hintTextClass:{type:[String,Array,Object]},helpText:{type:String},helpTextClass:{type:[String,Array,Object]},errorText:{type:String},errorColor:{type:String},icon:{type:String},iconClass:{type:[String,Array,Object]},maxHeight:{type:Number},autoWidth:{type:Boolean,default:!1},fullWidth:{type:Boolean,default:!1},underlineShow:{type:Boolean,default:!0},underlineClass:{type:[String,Array,Object]},underlineFocusClass:{type:[String,Array,Object]},dropDownIconClass:{type:[String,Array,Object]},value:{},multiple:{type:Boolean,default:!1},scroller:{},separator:{type:String,default:","}},data:function(){var t=this.value;return n.i(a.h)(t)&&(t=""),!this.multiple||t instanceof Array||(t=[]),{anchorEl:null,inputValue:t}},mounted:function(){this.anchorEl=this.$children[0].$refs.input},methods:{handlehange:function(t){if(t!==this.inputValue){if(this.multiple){var e=this.inputValue.indexOf(t);e===-1?this.inputValue.push(t):this.inputValue.splice(e,1)}else this.inputValue=t;this.$emit("change",this.inputValue)}},handleOpen:function(){this.$refs.textField.handleFocus(),this.$emit("open")},handleClose:function(){this.$refs.textField.handleBlur(),this.$emit("close")}},watch:{value:function(t){this.inputValue=t},inputValue:function(t,e){t!==e&&this.$emit("input",t)}},components:{"text-field":i.a,"dropDown-menu":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(90),r=n.n(i),a=n(21),o=n.n(a);e.default={name:"mu-slider",props:{name:{type:String},value:{type:[Number,String],default:0},max:{type:Number,default:100},min:{type:Number,default:0},step:{type:Number,default:.1},disabled:{type:Boolean,default:!1}},data:function(){return{inputValue:this.value,active:!1,hover:!1,focused:!1,dragging:!1}},computed:{percent:function(){var t=(this.inputValue-this.min)/(this.max-this.min)*100;return t>100?100:t<0?0:t},fillStyle:function(){return{width:this.percent+"%"}},thumbStyle:function(){return{left:this.percent+"%"}},sliderClass:function(){return{zero:this.inputValue<=this.min,active:this.active,disabled:this.disabled}}},created:function(){this.handleDragMouseMove=this.handleDragMouseMove.bind(this),this.handleMouseEnd=this.handleMouseEnd.bind(this),this.handleTouchMove=this.handleTouchMove.bind(this),this.handleTouchEnd=this.handleTouchEnd.bind(this)},methods:{handleKeydown:function(t){var e=this.min,n=this.max,i=this.step,r=void 0;switch(o()(t)){case"page down":case"down":r="decrease";break;case"left":r="decrease";break;case"page up":case"up":r="increase";break;case"right":r="increase";break;case"home":r="min";break;case"end":r="max"}if(r){switch(t.preventDefault(),r){case"decrease":this.inputValue-=i;break;case"increase":this.inputValue+=i;break;case"min":this.inputValue=e;break;case"max":this.inputValue=n}this.inputValue=parseFloat(this.inputValue.toFixed(5)),this.inputValue>n?this.inputValue=n:this.inputValue<e&&(this.inputValue=e)}},handleMouseDown:function(t){this.disabled||(this.setValue(t),t.preventDefault(),document.addEventListener("mousemove",this.handleDragMouseMove),document.addEventListener("mouseup",this.handleMouseEnd),this.$el.focus(),this.onDragStart(t))},handleMouseUp:function(){this.disabled||(this.active=!1)},handleTouchStart:function(t){this.disabled||(this.setValue(t.touches[0]),document.addEventListener("touchmove",this.handleTouchMove),document.addEventListener("touchup",this.handleTouchEnd),document.addEventListener("touchend",this.handleTouchEnd),document.addEventListener("touchcancel",this.handleTouchEnd),t.preventDefault(),this.onDragStart(t))},handleTouchEnd:function(t){this.disabled||(document.removeEventListener("touchmove",this.handleTouchMove),document.removeEventListener("touchup",this.handleTouchEnd),document.removeEventListener("touchend",this.handleTouchEnd),document.removeEventListener("touchcancel",this.handleTouchEnd),this.onDragStop(t))},handleFocus:function(){this.disabled||(this.focused=!0)},handleBlur:function(){this.disabled||(this.focused=!1)},handleMouseEnter:function(){this.disabled||(this.hover=!0)},handleMouseLeave:function(){this.disabled||(this.hover=!1)},setValue:function(t){var e=this.$el,n=this.max,i=this.min,r=this.step,a=(t.clientX-e.getBoundingClientRect().left)/e.offsetWidth*(n-i);a=Math.round(a/r)*r+i,a=parseFloat(a.toFixed(5)),a>n?a=n:a<i&&(a=i),this.inputValue=a,this.$emit("change",a)},onDragStart:function(t){this.dragging=!0,this.active=!0,this.$emit("dragStart",t),this.$emit("drag-start",t)},onDragUpdate:function(t){var e=this;this.dragRunning||(this.dragRunning=!0,window.requestAnimationFrame(function(){e.dragRunning=!1,e.disabled||e.setValue(t)}))},onDragStop:function(t){this.dragging=!1,this.active=!1,this.$emit("dragStop",t),this.$emit("drag-stop",t)},handleDragMouseMove:function(t){this.onDragUpdate(t)},handleTouchMove:function(t){this.onDragUpdate(t.touches[0])},handleMouseEnd:function(t){document.removeEventListener("mousemove",this.handleDragMouseMove),document.removeEventListener("mouseup",this.handleMouseEnd),this.onDragStop(t)}},watch:{value:function(t){this.inputValue=t},inputValue:function(t){this.$emit("input",t)}},components:{"focus-ripple":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(23),r=n(28),a=n(42);e.default={name:"mu-snackbar",props:{action:{type:String},actionColor:{type:String},message:{type:String}},data:function(){return{zIndex:n.i(r.a)()}},methods:{clickOutSide:function(){this.$emit("close","clickOutSide")},handleActionClick:function(){this.$emit("actionClick"),this.$emit("action-click")}},components:{"flat-button":i.a},directives:{clickoutside:a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(74),r=n.n(i);e.default={name:"mu-step",props:{active:{type:Boolean,default:!1},completed:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},index:{type:Number},last:{type:Boolean,default:!1}},render:function(t){var e=this.active,n=this.completed,i=this.disabled,a=this.index,o=this.last,s=[];return this.$slots.default&&this.$slots.default.length>0&&this.$slots.default.forEach(function(t){if(t.componentOptions&&t.componentOptions.propsData){var l=a+1;t.componentOptions.propsData=r()({active:e,completed:n,disabled:i,last:o,num:l},t.componentOptions.propsData),s.push(t)}}),t("div",{class:"mu-step"},s)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(94),a=n.n(r);e.default={name:"mu-step-button",props:{active:{type:Boolean},completed:{type:Boolean},disabled:{type:Boolean},num:{type:[String,Number]},last:{type:Boolean},childrenInLabel:{type:Boolean,default:!0}},methods:{handleClick:function(t){this.$emit("click",t)}},components:{abstractButton:i.a,"step-label":a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(89),r=n.n(i);e.default={name:"mu-step-content",props:{active:{type:Boolean},last:{type:Boolean}},components:{"expand-transition":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-step-label",props:{active:{type:Boolean},completed:{type:Boolean},disabled:{type:Boolean},num:{type:[String,Number]}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(460),r=n.n(i);e.default={name:"mu-stepper",props:{activeStep:{type:Number,default:0},linear:{type:Boolean,default:!0},orientation:{type:String,default:"horizontal",validator:function(t){return["horizontal","vertical"].indexOf(t)!==-1}}},render:function(t){var e=this.activeStep,n=this.linear,i=this.orientation,a=[];if(this.$slots.default&&this.$slots.default.length>0){var o=0;this.$slots.default.forEach(function(i){if(i.componentOptions){o>0&&a.push(t(r.a,{}));var s=i.componentOptions.propsData;e===o?s.active=!0:n&&e>o?s.completed=!0:n&&e<o&&(s.disabled=!0),s.index=o++,a.push(i)}}),a.length>0&&(a[a.length-1].componentOptions.propsData.last=!0)}return t("div",{class:["mu-stepper","vertical"===i?"mu-stepper-vertical":""]},a)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-sub-header",props:{inset:{type:Boolean,default:!1}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(38),r=n.n(i);e.default={name:"mu-switch",props:{name:{type:String},value:{type:Boolean},label:{type:String,default:""},labelLeft:{type:Boolean,default:!1},labelClass:{type:[String,Object,Array]},trackClass:{type:[String,Object,Array]},thumbClass:{type:[String,Object,Array]},disabled:{type:Boolean,default:!1}},data:function(){return{inputValue:this.value}},watch:{value:function(t){this.inputValue=t},inputValue:function(t){this.$emit("input",t)}},methods:{handleMouseDown:function(t){this.disabled||0===t.button&&this.$children[0].start(t)},handleClick:function(){},handleMouseUp:function(){this.disabled||this.$children[0].end()},handleMouseLeave:function(){this.disabled||this.$children[0].end()},handleTouchStart:function(t){this.disabled||this.$children[0].start(t)},handleTouchEnd:function(){this.disabled||this.$children[0].end()},handleChange:function(){this.$emit("change",this.inputValue)}},components:{"touch-ripple":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-table",props:{fixedFooter:{type:Boolean,default:!0},fixedHeader:{type:Boolean,default:!0},height:{type:String},enableSelectAll:{type:Boolean,default:!1},allRowsSelected:{type:Boolean,default:!1},multiSelectable:{type:Boolean,default:!1},selectable:{type:Boolean,default:!0},showCheckbox:{type:Boolean,default:!0}},data:function(){return{isSelectAll:!1}},computed:{bodyStyle:function(){return{overflow:"auto",height:this.height}}},mounted:function(){this.allRowsSelected&&this.selectAll()},methods:{handleRowClick:function(t,e){this.$emit("rowClick",t,e),this.$emit("row-click",t,e)},handleRowHover:function(t,e){this.$emit("rowHover",t,e),this.$emit("row-hover",t,e)},handleRowHoverExit:function(t,e){this.$emit("rowHoverExit",t,e),this.$emit("row-hover-exit",t,e)},handleRowSelect:function(t){this.$emit("rowSelection",t),this.$emit("row-selection",t)},handleCellClick:function(t,e,n,i){this.$emit("cellClick",t,e,n,i),this.$emit("cell-click",t,e,n,i)},handleCellHover:function(t,e,n,i){this.$emit("cellHover",t,e,n,i),this.$emit("cell-hover",t,e,n,i)},handleCellHoverExit:function(t,e,n,i){this.$emit("cellHoverExit",t,e,n,i),this.$emit("cell-hover-exit",t,e,n,i)},changeSelectAll:function(t){this.isSelectAll=t},selectAll:function(){var t=this.getTbody();t&&t.selectAll()},unSelectAll:function(){var t=this.getTbody();t&&t.unSelectAll()},getTbody:function(){for(var t=0;t<this.$children.length;t++){var e=this.$children[t];if(e.isTbody)return e}}},watch:{allRowsSelected:function(t,e){t!==e&&(t?this.selectAll():this.unSelectAll())}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-tbody",data:function(){return{selectedRows:[]}},created:function(){this.isTbody=!0,this._unSelectAll=!1},computed:{showCheckbox:function(){return this.$parent.showCheckbox},selectable:function(){return this.$parent.selectable},multiSelectable:function(){return this.$parent.multiSelectable},enableSelectAll:function(){return this.$parent.enableSelectAll},isSelectAll:function(){return this.$parent.isSelectAll}},methods:{handleRowClick:function(t,e){this.$parent.handleRowClick(this.getRowIndex(e),e)},selectRow:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(this.selectable){if(this.selectedRows.indexOf(t)===-1){if(this.multiSelectable||(this.selectedRows=[]),this.selectedRows.push(t),this.isSelectAllRow())return void this.selectAll(!0);this.$parent.handleRowSelect&&e&&this.$parent.handleRowSelect(this.convertSelectedRows(this.selectedRows))}}},isSelectAllRow:function(){if(!this.enableSelectAll||!this.multiSelectable)return!1;var t=0;return this.$children.forEach(function(e){e.selectable&&t++}),t===this.selectedRows.length},unSelectRow:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(this.selectable){var n=this.selectedRows.indexOf(t);n!==-1&&this.selectedRows.splice(n,1),this._unSelectAll=!0,this.$parent.changeSelectAll(!1),this.$parent.handleRowSelect&&e&&this.$parent.handleRowSelect(this.convertSelectedRows(this.selectedRows))}},selectAll:function(t){var e=this;this.selectable&&this.multiSelectable&&(this._unSelectAll=!1,t||(this.selectedRows=[],this.$children.forEach(function(t){t.selectable&&e.selectedRows.push(t.rowId)})),this.$parent.changeSelectAll(!0),this.$parent.handleRowSelect&&this.$parent.handleRowSelect(this.convertSelectedRows(this.selectedRows)))},unSelectAll:function(){this.selectable&&this.multiSelectable&&(this.selectedRows=[],this.$parent.changeSelectAll(!1),this.$parent.handleRowSelect&&this.$parent.handleRowSelect([]))},handleCellClick:function(t,e,n,i,r){this.$parent.handleCellClick&&this.$parent.handleCellClick(this.getRowIndex(r),e,n,r)},handleCellHover:function(t,e,n,i,r){this.$parent.handleCellHover&&this.$parent.handleCellHover(this.getRowIndex(r),e,n,r)},handleCellHoverExit:function(t,e,n,i,r){this.$parent.handleCellHoverExit&&this.$parent.handleCellHoverExit(this.getRowIndex(r),e,n,r)},handleRowHover:function(t,e,n){this.$parent.handleRowHover&&this.$parent.handleRowHover(this.getRowIndex(n),n)},handleRowHoverExit:function(t,e,n){this.$parent.handleRowHoverExit&&this.$parent.handleRowHoverExit(this.getRowIndex(n),n)},getRowIndex:function(t){return this.$children.indexOf(t)},convertSelectedRows:function(){var t=this,e=this.selectedRows.map(function(e){return t.convertRowIdToIndex(e)}).filter(function(t){return t!==-1});return this.multiSelectable?e:e[0]},convertRowIdToIndex:function(t){for(var e=0;e<this.$children.length;e++){var n=this.$children[e];if(n.rowId&&n.rowId===t)return e}return-1}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-td",props:{name:{type:String}},methods:{handleMouseEnter:function(t){this.$emit("hover",t),this.$parent.handleCellHover&&this.$parent.handleCellHover(t,this.name,this)},handleMouseLeave:function(t){this.$emit("hoverExit",t),this.$emit("hover-exit",t),this.$parent.handleCellHoverExit&&this.$parent.handleCellHoverExit(t,this.name,this)},handleClick:function(t){this.$emit("click",t),this.$parent.handleCellClick&&this.$parent.handleCellClick(t,this.name,this)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-tfoot",created:function(){this.isTfoot=!0},computed:{showCheckbox:function(){return this.$parent.showCheckbox}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(40);e.default={name:"mu-th",props:{tooltip:{type:String},tooltipPosition:{type:String,default:"bottom-right"},touch:{type:Boolean,default:!1}},data:function(){return{tooltipShown:!1,tooltipTrigger:null}},mounted:function(){this.tooltipTrigger=this.$refs.wrapper},computed:{verticalPosition:function(){return this.tooltipPosition.split("-")[0]},horizontalPosition:function(){return this.tooltipPosition.split("-")[1]}},methods:{showTooltip:function(){this.tooltipShown=!0},hideTooltip:function(){this.tooltipShown=!1}},components:{tooltip:i.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-thead",created:function(){this.isThead=!0},computed:{showCheckbox:function(){return this.$parent.showCheckbox},enableSelectAll:function(){return this.$parent.enableSelectAll},multiSelectable:function(){return this.$parent.multiSelectable},isSelectAll:function(){return this.$parent.isSelectAll}},methods:{selectAll:function(){this.$parent.selectAll()},unSelectAll:function(){this.$parent.unSelectAll()}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),r=n(95),a=n.n(r),o=n(96),s=n.n(o),l=n(63),u=1;e.default={name:"mu-tr",props:{selectable:{type:Boolean,default:!0},selected:{type:Boolean,default:!1}},data:function(){return{hover:!1,rowId:"tr-"+u++}},mounted:function(){this.selected&&this.$parent.selectRow(this.rowId)},computed:{className:function(){return{hover:this.hover,selected:this.isSelected,stripe:!1}},isTh:function(){return this.$parent.isThead},isTf:function(){return this.$parent.isTfoot},isTb:function(){return this.$parent.isTbody},isSelected:function(){return this.$parent.selectedRows&&this.$parent.selectedRows.indexOf(this.rowId)!==-1},showCheckbox:function(){return this.$parent.showCheckbox},enableSelectAll:function(){return this.$parent.enableSelectAll},multiSelectable:function(){return this.$parent.multiSelectable},isSelectAll:function(){return this.$parent.isSelectAll}},methods:{handleHover:function(t){n.i(i.g)()&&this.$parent.isTbody&&(this.hover=!0,this.$parent.handleRowHover&&this.$parent.handleRowHover(t,this.rowId,this))},handleExit:function(t){n.i(i.g)()&&this.$parent.isTbody&&(this.hover=!1,this.$parent.handleRowHoverExit&&this.$parent.handleRowHoverExit(t,this.rowId,this))},handleClick:function(t){this.$parent.isTbody&&(this.selectable&&(this.isSelected?this.$parent.unSelectRow(this.rowId):this.$parent.selectRow(this.rowId)),this.$parent.handleRowClick(t,this))},handleCheckboxClick:function(t){t.stopPropagation()},handleCheckboxChange:function(t){this.selectable&&(t?this.$parent.selectRow(this.rowId):this.$parent.unSelectRow(this.rowId))},handleSelectAllChange:function(t){t?this.$parent.selectAll():this.$parent.unSelectAll()},handleCellHover:function(t,e,n){this.$parent.handleCellHover&&this.$parent.handleCellHover(t,e,n,this.rowId,this)},handleCellHoverExit:function(t,e,n){this.$parent.handleCellHoverExit&&this.$parent.handleCellHoverExit(t,e,n,this.rowId,this)},handleCellClick:function(t,e,n){this.$parent.handleCellClick&&this.$parent.handleCellClick(t,e,n,this.rowId,this)}},watch:{selected:function(t,e){t!==e&&(t?this.$parent.selectRow(this.rowId,!1):this.$parent.unSelectRow(this.rowId,!1))}},components:{"mu-td":a.a,"mu-th":s.a,checkbox:l.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(2),o=n(1);e.default={name:"mu-tab",mixins:[r.a],props:{icon:{type:String,default:""},iconClass:{type:[String,Object,Array]},title:{type:String,default:""},titleClass:{type:[String,Object,Array]},href:{type:String},disabled:{type:Boolean},value:{}},computed:{active:function(){return n.i(o.c)(this.value)&&this.$parent.value===this.value},textClass:function(){var t=this.icon,e=this.titleClass,i=[];return t&&i.push("has-icon"),i.concat(n.i(o.f)(e))}},methods:{tabClick:function(t){this.$parent.handleTabClick&&this.$parent.handleTabClick(this.value,this),this.$emit("click",t)}},watch:{active:function(t,e){t!==e&&t&&this.$emit("active")}},components:{"abstract-button":i.a,icon:a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-tabs",props:{lineClass:{type:[String,Object,Array]},value:{}},data:function(){return{tabLightStyle:{width:"100%",transform:"translate3d(0, 0, 0)"}}},updated:function(){this.setTabLightStyle()},methods:{handleTabClick:function(t,e){this.value!==t&&this.$emit("change",t)},getActiveIndex:function(){var t=this;if(!this.$children||0===this.$children.length)return-1;var e=-1;return this.$children.forEach(function(n,i){if(n.value===t.value)return e=i,!1}),e},setTabLightStyle:function(){var t=100*this.getActiveIndex(),e=this.$children.length,n=this.$refs.highlight;n.style.width=e>0?(100/e).toFixed(4)+"%":"100%",n.style.transform="translate3d("+t+"%, 0, 0)"}},mounted:function(){this.setTabLightStyle()}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{name:{type:String},placeholder:{type:String},value:{type:String},rows:{type:Number,default:1},rowsMax:{type:Number},disabled:{type:Boolean,default:!1},normalClass:{type:[String,Array,Object]},required:{type:Boolean,default:!1}},methods:{resizeTextarea:function(){var t=this.$refs.textarea;if(t){var e=this.$refs.textareaHidden,n=window.getComputedStyle(t,null).getPropertyValue("line-height");n=Number(n.substring(0,n.indexOf("px")));var i=window.getComputedStyle(t,null).getPropertyValue("padding-top");i=Number(i.substring(0,i.indexOf("px")));var r=window.getComputedStyle(t,null).getPropertyValue("padding-bottom");r=Number(r.substring(0,r.indexOf("px")));var a=r+i+n*this.rows,o=r+i+n*(this.rowsMax||0),s=e.scrollHeight;t.style.height=(s<a?a:s>o&&o>0?o:s)+"px"}},handleInput:function(t){this.$emit("input",t.target.value)},handleChange:function(t){this.$emit("change",t)},handleFocus:function(t){this.$emit("focus",t)},handleBlur:function(t){this.$emit("blur",t)},focus:function(){var t=this.$refs.textarea;t&&t.focus()}},mounted:function(){this.resizeTextarea()},watch:{value:function(t,e){var n=this;t!==e&&this.$nextTick(function(){n.resizeTextarea()})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),r=n(476),a=n.n(r),o=n(472),s=n.n(o),l=n(475),u=n.n(l),c=n(1),d=n(474),f=n.n(d);e.default={name:"mu-text-field",props:{name:{type:String},type:{type:String},icon:{type:String},iconClass:{type:[String,Array,Object]},label:{type:String},labelFloat:{type:Boolean,default:!1},labelClass:{type:[String,Array,Object]},labelFocusClass:{type:[String,Array,Object]},hintText:{type:String},hintTextClass:{type:[String,Array,Object]},value:{},inputClass:{type:[String,Array,Object]},multiLine:{type:Boolean,default:!1},rows:{type:Number,default:1},rowsMax:{type:Number},errorText:{type:String},errorColor:{type:String},helpText:{type:String},helpTextClass:{type:[String,Array,Object]},maxLength:{type:Number,default:0},disabled:{type:Boolean,default:!1},fullWidth:{type:Boolean,default:!1},underlineShow:{type:Boolean,default:!0},underlineClass:{type:[String,Array,Object]},underlineFocusClass:{type:[String,Array,Object]},max:{type:[Number,String]},min:{type:[Number,String]},required:{type:Boolean,default:!1}},data:function(){return{isFocused:!1,inputValue:this.value,charLength:0}},computed:{textFieldClass:function(){return{"focus-state":this.isFocused,"has-label":this.label,"no-empty-state":this.inputValue,"has-icon":this.icon,error:this.errorText,"multi-line":this.multiLine,disabled:this.disabled,"full-width":this.fullWidth}},float:function(){return this.labelFloat&&!this.isFocused&&!this.inputValue&&0!==this.inputValue},errorStyle:function(){return{color:!this.disabled&&this.errorText?n.i(c.d)(this.errorColor):""}},showHint:function(){return!this.float&&!this.inputValue&&0!==this.inputValue}},methods:{handleFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},handleBlur:function(t){this.isFocused=!1,"number"===this.type&&!this.inputValue&&0!==this.inputValue&&this.$refs.input&&(this.$refs.input.value=""),this.$emit("blur",t)},handleInput:function(t){this.inputValue=t.target?t.target.value:t},handleChange:function(t){this.$emit("change",t,t.target.value)},handleLabelClick:function(){this.$emit("labelClick")},focus:function(){var t=this.$refs,e=t.input,n=t.textarea;e?e.focus():n&&n.focus()}},watch:{value:function(t){this.inputValue=t},inputValue:function(t,e){this.charLength=this.maxLength&&String(this.inputValue)?String(this.inputValue).length:0,this.$emit("input",t)},charLength:function(t){t>this.maxLength&&!this.isTextOverflow&&(this.isTextOverflow=!0,this.$emit("textOverflow",!0),this.$emit("text-overflow",!0)),this.isTextOverflow&&t<=this.maxLength&&(this.isTextOverflow=!1,this.$emit("textOverflow",!1),this.$emit("text-overflow",!1))}},components:{icon:i.a,underline:a.a,"enhanced-textarea":s.a,"text-field-label":u.a,"text-field-hint":f.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{text:{type:String},show:{type:Boolean,default:!0}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={props:{focus:{type:Boolean,default:!1},float:{type:Boolean,default:!1},normalClass:{type:[String,Object,Array]},focusClass:{type:[String,Object,Array]}},computed:{labelClass:function(){var t=this.float,e=this.focus,r=this.normalClass,a=this.focusClass,o=[];return t&&o.push("float"),o=o.concat(n.i(i.f)(r)),e&&(o=o.concat(n.i(i.f)(a))),o}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={props:{focus:{type:Boolean,default:!1},error:{type:Boolean},errorColor:{type:String},disabled:{type:Boolean},normalClass:{type:[String,Object,Array]},focusClass:{type:[String,Object,Array]}},computed:{lineClass:function(){var t=this.disabled,e=this.normalClass,r=[];return t&&r.push("disabled"),r.concat(n.i(i.f)(e))},focusLineClass:function(){var t=this.normalClass,e=this.focus,r=this.focusClass,a=this.error,o=[];return o.concat(n.i(i.f)(t)),a&&o.push("error"),e&&o.push("focus"),o.concat(n.i(i.f)(r))},errorStyle:function(){return{"background-color":this.error?n.i(i.d)(this.errorColor):""}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(72);e.default={name:"mu-timeline",props:{lineType:{type:String,default:"solid",validator:function(t){var e=["solid","dotted","dashed","double","groove","ridge","inset","outset"];return n.i(i.a)(t,e)}},lineColor:{type:String,default:"#e8e8e8"},lineWidth:{type:Number,default:2},iconWidth:{type:Number,default:15},iconColor:{type:String,default:"#7e57c2"},iconType:{type:String,default:"solid",validator:function(t){var e=["solid","dotted","dashed","double","groove","ridge","inset","outset"];return n.i(i.a)(t,e)}},iconLine:{type:Number,default:2}},methods:{updateChildren:function(){for(var t=0,e=this.$children.length;t<e;t++){var n=this.$children[t],i=this.iconWidth,r=this.iconColor,a=this.iconType,o=this.iconLine,s=this.lineColor,l=this.lineWidth,u=this.lineType;n.icon={width:i,color:r,line:o,type:a},n.line={color:s,width:l,type:u},t===e-1&&(n.last=!0)}}},mounted:function(){this.updateChildren()},updated:function(){var t=this;this.$nextTick(function(){t.updateChildren()})},watch:{separator:function(){this.updateChildren()}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(72);e.default={name:"mu-timeline-item",props:{iconColor:{type:String,default:""},iconType:{type:String,default:"",validator:function(t){var e=["","solid","dotted","dashed","double","groove","ridge","inset","outset"];return n.i(i.a)(t,e)}},iconLine:{type:String,default:""},lineColor:{type:String,default:""},lineType:{type:String,default:"",validator:function(t){var e=["","solid","dotted","dashed","double","groove","ridge","inset","outset"];return n.i(i.a)(t,e)}}},data:function(){return{line:{},icon:{},last:!1}},computed:{lineStyle:function(){var t=this.line.color,e=this.line.type;return""!==this.lineColor&&(t=this.lineColor),""!==this.lineType&&(e=this.lineType),{borderLeft:e+" "+this.line.width+"px "+t,left:this.icon.width/2-this.line.width/2+"px"}},iconStyle:function(){var t=this.icon.color,e=this.icon.type,n=this.icon.line;return""!==this.iconColor&&(t=this.iconColor),""!==this.iconType&&(e=this.iconType),""!==this.iconLine&&(n=this.iconLine),{border:e+" "+n+"px "+t,width:this.icon.width+"px",height:this.icon.width+"px",borderRadius:"50%"}},contentStyle:function(){return{left:2*this.icon.width+"px"}},customedStyle:function(){}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(482),r=n.n(i),a=n(480),o=n.n(a),s=n(481),l=n.n(s),u=n(23);e.default={props:{autoOk:{type:Boolean,default:!1},format:{type:String,default:"ampm",validator:function(t){return["ampm","24hr"].indexOf(t)!==-1}},initialTime:{type:Date,default:function(){return new Date}},okLabel:{type:String,default:"确定"},cancelLabel:{type:String,default:"取消"},landscape:{type:Boolean,default:!1}},data:function(){return{selectedTime:this.initialTime,mode:"hour"}},methods:{getAffix:function(){return"ampm"!==this.format?"":this.selectedTime.getHours()<12?"am":"pm"},handleSelectAffix:function(t){if(t!==this.getAffix()){var e=this.selectedTime.getHours();if("am"===t)return void this.handleChangeHours(e-12,t);this.handleChangeHours(e+12,t)}},handleChangeHours:function(t,e){var n=this,i=new Date(this.selectedTime),r=void 0;"string"==typeof e&&(r=e,e=void 0),r||(r=this.getAffix()),"pm"===r&&t<12&&(t+=12),i.setHours(t),this.selectedTime=i,e&&setTimeout(function(){n.mode="minute",n.$emit("changeHours",i)},100)},handleChangeMinutes:function(t){var e=this,n=new Date(this.selectedTime);n.setMinutes(t),this.selectedTime=n,setTimeout(function(){e.$emit("changeMinutes",n),e.autoOk&&e.accept()},0)},accept:function(){this.$emit("accept",this.selectedTime)},dismiss:function(){this.$emit("dismiss")}},watch:{initialTime:function(t){this.selectedTime=t}},components:{"time-display":r.a,"clock-hours":o.a,"clock-minutes":l.a,"flat-button":u.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(97),r=n.n(i),a=n(98),o=n.n(a),s=n(22);e.default={props:{format:{type:String,default:"ampm",validator:function(t){return["ampm","24hr"].indexOf(t)!==-1}},initialHours:{type:Number,default:(new Date).getHours()}},computed:{hours:function t(){for(var e="ampm"===this.format?12:24,t=[],n=1;n<=e;n++)t.push(n%24);return t}},methods:{getSelected:function(){var t=this.initialHours;return"ampm"===this.format&&(t%=12,t=t||12),t},isMousePressed:function(t){return void 0===t.buttons?t.nativeEvent.which:t.buttons},handleUp:function(t){t.preventDefault(),this.setClock(t,!0)},handleMove:function(t){t.preventDefault(),1===this.isMousePressed(t)&&this.setClock(t,!1)},handleTouchMove:function(t){t.preventDefault(),this.setClock(t.changedTouches[0],!1)},handleTouchEnd:function(t){t.preventDefault(),this.setClock(t.changedTouches[0],!0)},setClock:function(t,e){if(void 0===t.offsetX){var i=n.i(s.c)(t);t.offsetX=i.offsetX,t.offsetY=i.offsetY}var r=this.getHours(t.offsetX,t.offsetY);this.$emit("change",r,e)},getHours:function(t,e){var i=30,r=t-this.center.x,a=e-this.center.y,o=this.basePoint.x-this.center.x,l=this.basePoint.y-this.center.y,u=Math.atan2(o,l)-Math.atan2(r,a),c=n.i(s.d)(u);c=Math.round(c/i)*i,c%=360;var d=Math.floor(c/i)||0,f=Math.pow(r,2)+Math.pow(a,2),h=Math.sqrt(f);return d=d||12,"24hr"===this.format?h<90&&(d+=12,d%=24):d%=12,d}},mounted:function(){var t=this.$refs.mask;this.center={x:t.offsetWidth/2,y:t.offsetHeight/2},this.basePoint={x:this.center.x,y:0}},components:{"clock-number":r.a,"clock-pointer":o.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(97),r=n.n(i),a=n(98),o=n.n(a),s=n(22);e.default={props:{initialMinutes:{type:Number,default:function(){return(new Date).getMinutes()}}},mounted:function(){var t=this.$refs.mask;this.center={x:t.offsetWidth/2,y:t.offsetHeight/2},this.basePoint={x:this.center.x,y:0}},data:function(){return{minutes:null}},created:function(){this.minutes=this.getMinuteNumbers()},methods:{getMinuteNumbers:function(){for(var t=[],e=0;e<12;e++)t.push(5*e);var n=this.initialMinutes,i=!1;return{numbers:t.map(function(t){var e=n===t;return e&&(i=!0),{minute:t,isSelected:e}}),hasSelected:i,selected:n}},isMousePressed:function(t){return void 0===t.buttons?t.nativeEvent.which:t.buttons},handleUp:function(t){t.preventDefault(),this.setClock(t,!0)},handleMove:function(t){t.preventDefault(),1===this.isMousePressed(t)&&this.setClock(t,!1)},handleTouch:function(t){t.preventDefault(),this.setClock(t.changedTouches[0],!1)},setClock:function(t,e){if(void 0===t.offsetX){var i=n.i(s.c)(t);t.offsetX=i.offsetX,t.offsetY=i.offsetY}var r=this.getMinutes(t.offsetX,t.offsetY);this.$emit("change",r,e)},getMinutes:function(t,e){var i=6,r=t-this.center.x,a=e-this.center.y,o=this.basePoint.x-this.center.x,l=this.basePoint.y-this.center.y,u=Math.atan2(o,l)-Math.atan2(r,a),c=n.i(s.d)(u);return c=Math.round(c/i)*i,c%=360,Math.floor(c/i)||0}},watch:{initialMinutes:function(t){this.minutes=this.getMinuteNumbers()}},components:{"clock-number":r.a,"clock-pointer":o.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(255),r=n.n(i),a=n(22),o=[[0,5],[54.5,16.6],[94.4,59.5],[109,114],[94.4,168.5],[54.5,208.4],[0,223],[-54.5,208.4],[-94.4,168.5],[-109,114],[-94.4,59.5],[-54.5,19.6]],s=[[0,40],[36.9,49.9],[64,77],[74,114],[64,151],[37,178],[0,188],[-37,178],[-64,151],[-74,114],[-64,77],[-37,50]];e.default={props:{value:{type:Number,default:0},type:{type:String,default:"minute",validator:function(t){return["hour","minute"].indexOf(t)!==-1}},selected:{type:Boolean,default:!1}},computed:{isInner:function(){return n.i(a.e)(this)},numberClass:function(){return{selected:this.selected,inner:this.isInner}},numberStyle:function(){var t=this.value;"hour"===this.type?t%=12:t/=5;var e=o[t];this.isInner&&(e=s[t]);var n=e,i=r()(n,2);return{transform:"translate("+i[0]+"px, "+i[1]+"px)",left:this.isInner?"calc(50% - 14px)":"calc(50% - 16px)"}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(22);e.default={props:{hasSelected:{type:Boolean,default:!1},type:{type:String,default:"minute",validator:function(t){return["hour","minute"].indexOf(t)!==-1}},value:{type:Number}},computed:{isInner:function(){return n.i(i.e)(this)},pointerStyle:function(){var t=this.type,e=this.value,n=this.calcAngle;return{transform:"rotateZ("+("hour"===t?n(e,12):n(e,60))+"deg)"}}},methods:{calcAngle:function(t,e){return t%=e,360/e*t}},render:function(t){return void 0===this.value||null===this.value?t("span",{}):t("div",{class:{"mu-clock-pointer":!0,inner:this.isInner},style:this.pointerStyle},[t("div",{class:{"mu-clock-pointer-mark":!0,"has-selected":this.hasSelected}})])}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{affix:{type:String,default:"",validator:function(t){return["","pm","am"].indexOf(t)!==-1}},format:{type:String,validator:function(t){return t&&["ampm","24hr"].indexOf(t)!==-1}},mode:{type:String,default:"hour",validator:function(t){return["hour","minute"].indexOf(t)!==-1}},selectedTime:{type:Date,default:function(){return new Date},required:!0}},methods:{handleSelectAffix:function(t){this.$emit("selectAffix",t)},handleSelectHour:function(){this.$emit("selectHour")},handleSelectMin:function(){this.$emit("selectMin")}},computed:{sanitizeTime:function(){var t=this.selectedTime.getHours(),e=this.selectedTime.getMinutes().toString();return"ampm"===this.format&&(t%=12,t=t||12),t=t.toString(),t.length<2&&(t="0"+t),e.length<2&&(e="0"+e),[t,e]}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(17),r=n(484),a=n.n(r),o=n(22);e.default={name:"mu-time-picker",props:{autoOk:{type:Boolean,default:!1},cancelLabel:{type:String},okLabel:{type:String},container:{type:String,default:"dialog",validator:function(t){return t&&["dialog","inline"].indexOf(t)!==-1}},mode:{type:String,default:"portrait",validator:function(t){return t&&["portrait","landscape"].indexOf(t)!==-1}},format:{type:String,default:"ampm",validator:function(t){return["ampm","24hr"].indexOf(t)!==-1}},name:{type:String},label:{type:String},labelFloat:{type:Boolean,default:!1},labelClass:{type:[String,Array,Object]},labelFocusClass:{type:[String,Array,Object]},disabled:{type:Boolean,default:!1},hintText:{type:String},hintTextClass:{type:[String,Array,Object]},helpText:{type:String},helpTextClass:{type:[String,Array,Object]},errorText:{type:String},errorColor:{type:String},icon:{type:String},iconClass:{type:[String,Array,Object]},fullWidth:{type:Boolean,default:!1},underlineShow:{type:Boolean,default:!0},underlineClass:{type:[String,Array,Object]},underlineFocusClass:{type:[String,Array,Object]},inputClass:{type:[String,Array,Object]},value:{type:String}},data:function(){return{inputValue:this.value,dialogTime:null}},methods:{handleClick:function(){var t=this;this.disabled||setTimeout(function(){t.openDialog()},0)},handleFocus:function(t){t.target.blur(),this.$emit("focus",t)},openDialog:function(){this.disabled||(this.dialogTime=this.inputValue?o.a(this.inputValue,this.format):new Date,this.$refs.dialog.open=!0)},handleAccept:function(t){var e=o.b(t,this.format);this.inputValue!==e&&(this.inputValue=e,this.$emit("change",e))}},watch:{value:function(t){this.inputValue=t},inputValue:function(t){this.$emit("input",t)}},components:{"text-field":i.a,"time-picker-dialog":a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(479),r=n.n(i),a=n(11),o=n(39);e.default={props:{autoOk:{type:Boolean,default:!1},cancelLabel:{type:String},okLabel:{type:String},container:{type:String,default:"dialog",validator:function(t){return t&&["dialog","inline"].indexOf(t)!==-1}},mode:{type:String,default:"portrait",validator:function(t){return t&&["portrait","landscape"].indexOf(t)!==-1}},format:{type:String,default:"ampm",validator:function(t){return["ampm","24hr"].indexOf(t)!==-1}},initialTime:{type:Date}},data:function(){return{open:!1,showClock:!1,trigger:null}},mounted:function(){this.trigger=this.$el},methods:{handleAccept:function(t){this.$emit("accept",t),this.open=!1},handleDismiss:function(){this.dismiss()},handleClose:function(){this.dismiss()},dismiss:function(){this.open=!1,this.$emit("dismiss")},hideClock:function(){this.showClock=!1}},watch:{open:function(t){t&&(this.showClock=!0)}},render:function(t){var e=this.showClock?t(r.a,{props:{autoOk:this.autoOk,cancelLabel:this.cancelLabel,okLabel:this.okLabel,landscape:"landscape"===this.mode,initialTime:this.initialTime,format:this.format},on:{accept:this.handleAccept,dismiss:this.handleDismiss}}):void 0;return t("div",{},["dialog"===this.container?t(o.a,{props:{open:this.open,dialogClass:["mu-time-picker-dialog",this.mode]},on:{close:this.handleClose,hide:this.hideClock}},[e]):t(a.a,{props:{trigger:this.trigger,overlay:!1,open:this.open},on:{close:this.handleClose,hide:this.hideClock}},[e])])}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(28),r=n(42);e.default={name:"mu-toast",props:{message:{type:String}},methods:{clickOutSide:function(){this.$emit("close","clickOutSide")}},data:function(){return{zIndex:n.i(i.a)()}},directives:{clickoutside:r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-tooltip",props:{label:{type:String},trigger:{},verticalPosition:{type:String,default:"bottom"},horizontalPosition:{type:String,default:"center"},show:{type:Boolean,default:!1},touch:{type:Boolean,default:!1}},data:function(){return{offsetWidth:0,triggerWidth:0,triggerHeight:0}},computed:{tooltipStyle:function(){var t=this.horizontalPosition,e=this.verticalPosition,n=this.offsetWidth,i=this.touch,r=this.triggerWidth,a=this.triggerHeight,o=this.show,s=i?10:0,l=i?-20:-10,u="bottom"===e?14+s:-14-s;return{right:"left"===t?"0":null,left:"center"===t?(n-r)/2*-1+"px":"right"===t?"0":"",top:o?"top"===e?l+"px":a-u+s+2+"px":"-3000px",transform:"translate(0px, "+u+"px)"}},rippleStyle:function(){var t=this.horizontalPosition,e=this.verticalPosition;return{left:"center"===t?"50%":"left"===t?"100%":"0%",top:"bottom"===e?"0":"100%"}}},methods:{setRippleSize:function(){var t=this.$refs.ripple,e=this.$el;if(e&&t){var n=parseInt(e.offsetWidth,10)/("center"===this.horizontalPosition?2:1),i=parseInt(e.offsetHeight,10),r=Math.ceil(2*Math.sqrt(Math.pow(i,2)+Math.pow(n,2)));this.show?(t.style.height=r+"px",t.style.width=r+"px"):(t.style.width="0px",t.style.height="0px")}},setTooltipSize:function(){this.offsetWidth=this.$el.offsetWidth,this.trigger&&(this.triggerWidth=this.trigger.offsetWidth,this.triggerHeight=this.trigger.offsetHeight)}},mounted:function(){this.setRippleSize(),this.setTooltipSize()},beforeUpdate:function(){this.setTooltipSize()},updated:function(){this.setRippleSize()}}},function(t,e,n){t.exports={default:n(256),__esModule:!0}},function(t,e,n){t.exports={default:n(257),__esModule:!0}},function(t,e,n){t.exports={default:n(261),__esModule:!0}},function(t,e,n){t.exports={default:n(262),__esModule:!0}},function(t,e,n){t.exports={default:n(263),__esModule:!0}},function(t,e,n){"use strict";e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(75),a=i(r);e.default=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),(0,a.default)(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}()},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(75),a=i(r);e.default=function(t,e,n){return e in t?(0,a.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(248),a=i(r),o=n(247),s=i(o);e.default=function(){function t(t,e){var n=[],i=!0,r=!1,a=void 0;try{for(var o,l=(0,s.default)(t);!(i=(o=l.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){r=!0,a=t}finally{try{!i&&l.return&&l.return()}finally{if(r)throw a}}return n}return function(e,n){if(Array.isArray(e))return e;if((0,a.default)(Object(e)))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},function(t,e,n){n(37),n(36),t.exports=n(289)},function(t,e,n){n(37),n(36),t.exports=n(290)},function(t,e,n){n(292),t.exports=n(3).Object.assign},function(t,e,n){n(293);var i=n(3).Object;t.exports=function(t,e,n){return i.defineProperty(t,e,n)}},function(t,e,n){n(294),t.exports=n(3).Object.keys},function(t,e,n){n(87),n(36),n(37),n(295),n(297),t.exports=n(3).Set},function(t,e,n){n(296),n(87),n(298),n(299),t.exports=n(3).Symbol},function(t,e,n){n(36),n(37),t.exports=n(61).f("iterator")},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(){}},function(t,e,n){var i=n(48);t.exports=function(t,e){var n=[];return i(t,!1,n.push,n,e),n}},function(t,e,n){var i=n(16),r=n(58),a=n(288);t.exports=function(t){return function(e,n,o){var s,l=i(e),u=r(l.length),c=a(o,u);if(t&&n!=n){for(;u>c;)if((s=l[c++])!=s)return!0}else for(;u>c;c++)if((t||c in l)&&l[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var i=n(29),r=n(49),a=n(34),o=n(58),s=n(270);t.exports=function(t,e){var n=1==t,l=2==t,u=3==t,c=4==t,d=6==t,f=5==t||d,h=e||s;return function(e,s,p){for(var m,v,y=a(e),g=r(y),b=i(s,p,3),x=o(g.length),C=0,_=n?h(e,x):l?h(e,0):void 0;x>C;C++)if((f||C in g)&&(m=g[C],v=b(m,C,y),t))if(n)_[C]=v;else if(v)switch(t){case 3:return!0;case 5:return m;case 6:return C;case 2:_.push(m)}else if(c)return!1;return d?-1:u||c?c:_}}},function(t,e,n){var i=n(18),r=n(80),a=n(4)("species");t.exports=function(t){var e;return r(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!r(e.prototype)||(e=void 0),i(e)&&null===(e=e[a])&&(e=void 0)),void 0===e?Array:e}},function(t,e,n){var i=n(269);t.exports=function(t,e){return new(i(t))(e)}},function(t,e,n){"use strict";var i=n(8).f,r=n(53),a=n(84),o=n(29),s=n(77),l=n(30),u=n(48),c=n(50),d=n(81),f=n(286),h=n(6),p=n(52).fastKey,m=h?"_s":"size",v=function(t,e){var n,i=p(e);if("F"!==i)return t._i[i];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,c){var d=t(function(t,i){s(t,d,e,"_i"),t._i=r(null),t._f=void 0,t._l=void 0,t[m]=0,void 0!=i&&u(i,n,t[c],t)});return a(d.prototype,{clear:function(){for(var t=this,e=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete e[n.i];t._f=t._l=void 0,t[m]=0},delete:function(t){var e=this,n=v(e,t);if(n){var i=n.n,r=n.p;delete e._i[n.i],n.r=!0,r&&(r.n=i),i&&(i.p=r),e._f==n&&(e._f=i),e._l==n&&(e._l=r),e[m]--}return!!n},forEach:function(t){s(this,d,"forEach");for(var e,n=o(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(n(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!v(this,t)}}),h&&i(d.prototype,"size",{get:function(){return l(this[m])}}),d},def:function(t,e,n){var i,r,a=v(t,e);return a?a.v=n:(t._l=a={i:r=p(e,!0),k:e,v:n,p:i=t._l,n:void 0,r:!1},t._f||(t._f=a),i&&(i.n=a),t[m]++,"F"!==r&&(t._i[r]=a)),t},getEntry:v,setStrong:function(t,e,n){c(t,e,function(t,e){this._t=t,this._k=e,this._l=void 0},function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?"keys"==e?d(0,n.k):"values"==e?d(0,n.v):d(0,[n.k,n.v]):(t._t=void 0,d(1))},n?"entries":"values",!n,!0),f(e)}}},function(t,e,n){var i=n(45),r=n(266);t.exports=function(t){return function(){if(i(this)!=t)throw TypeError(t+"#toJSON isn't generic");return r(this)}}},function(t,e,n){"use strict";var i=n(7),r=n(13),a=n(52),o=n(14),s=n(10),l=n(84),u=n(48),c=n(77),d=n(18),f=n(33),h=n(8).f,p=n(268)(0),m=n(6);t.exports=function(t,e,n,v,y,g){var b=i[t],x=b,C=y?"set":"add",_=x&&x.prototype,S={};return m&&"function"==typeof x&&(g||_.forEach&&!o(function(){(new x).entries().next()}))?(x=e(function(e,n){c(e,x,t,"_c"),e._c=new b,void 0!=n&&u(n,y,e[C],e)}),p("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","),function(t){var e="add"==t||"set"==t;t in _&&(!g||"clear"!=t)&&s(x.prototype,t,function(n,i){if(c(this,x,t),!e&&g&&!d(n))return"get"==t&&void 0;var r=this._c[t](0===n?0:n,i);return e?this:r})}),"size"in _&&h(x.prototype,"size",{get:function(){return this._c.size}})):(x=v.getConstructor(e,t,y,C),l(x.prototype,n),a.NEED=!0),f(x,t),S[t]=x,r(r.G+r.W+r.F,S),g||v.setStrong(x,t,y),x}},function(t,e,n){var i=n(20),r=n(54),a=n(31);t.exports=function(t){var e=i(t),n=r.f;if(n)for(var o,s=n(t),l=a.f,u=0;s.length>u;)l.call(t,o=s[u++])&&e.push(o);return e}},function(t,e,n){t.exports=n(7).document&&document.documentElement},function(t,e,n){var i=n(19),r=n(4)("iterator"),a=Array.prototype;t.exports=function(t){return void 0!==t&&(i.Array===t||a[r]===t)}},function(t,e,n){var i=n(12);t.exports=function(t,e,n,r){try{return r?e(i(n)[0],n[1]):e(n)}catch(e){var a=t.return;throw void 0!==a&&i(a.call(t)),e}}},function(t,e,n){"use strict";var i=n(53),r=n(32),a=n(33),o={};n(10)(o,n(4)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=i(o,{next:r(1,n)}),a(t,e+" Iterator")}},function(t,e,n){var i=n(20),r=n(16);t.exports=function(t,e){for(var n,a=r(t),o=i(a),s=o.length,l=0;s>l;)if(a[n=o[l++]]===e)return n}},function(t,e,n){"use strict";var i=n(20),r=n(54),a=n(31),o=n(34),s=n(49),l=Object.assign;t.exports=!l||n(14)(function(){var t={},e={},n=Symbol(),i="abcdefghijklmnopqrst";return t[n]=7,i.split("").forEach(function(t){e[t]=t}),7!=l({},t)[n]||Object.keys(l({},e)).join("")!=i})?function(t,e){for(var n=o(t),l=arguments.length,u=1,c=r.f,d=a.f;l>u;)for(var f,h=s(arguments[u++]),p=c?i(h).concat(c(h)):i(h),m=p.length,v=0;m>v;)d.call(h,f=p[v++])&&(n[f]=h[f]);return n}:l},function(t,e,n){var i=n(8),r=n(12),a=n(20);t.exports=n(6)?Object.defineProperties:function(t,e){r(t);for(var n,o=a(e),s=o.length,l=0;s>l;)i.f(t,n=o[l++],e[n]);return t}},function(t,e,n){var i=n(31),r=n(32),a=n(16),o=n(59),s=n(15),l=n(79),u=Object.getOwnPropertyDescriptor;e.f=n(6)?u:function(t,e){if(t=a(t),e=o(e,!0),l)try{return u(t,e)}catch(t){}if(s(t,e))return r(!i.f.call(t,e),t[e])}},function(t,e,n){var i=n(16),r=n(82).f,a={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return r(t)}catch(t){return o.slice()}};t.exports.f=function(t){return o&&"[object Window]"==a.call(t)?s(t):r(i(t))}},function(t,e,n){var i=n(15),r=n(34),a=n(55)("IE_PROTO"),o=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),i(t,a)?t[a]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?o:null}},function(t,e,n){var i=n(13),r=n(3),a=n(14);t.exports=function(t,e){var n=(r.Object||{})[t]||Object[t],o={};o[t]=e(n),i(i.S+i.F*a(function(){n(1)}),"Object",o)}},function(t,e,n){"use strict";var i=n(7),r=n(3),a=n(8),o=n(6),s=n(4)("species");t.exports=function(t){var e="function"==typeof r[t]?r[t]:i[t];o&&e&&!e[s]&&a.f(e,s,{configurable:!0,get:function(){return this}})}},function(t,e,n){var i=n(57),r=n(30);t.exports=function(t){return function(e,n){var a,o,s=String(r(e)),l=i(n),u=s.length;return l<0||l>=u?t?"":void 0:(a=s.charCodeAt(l),a<55296||a>56319||l+1===u||(o=s.charCodeAt(l+1))<56320||o>57343?t?s.charAt(l):a:t?s.slice(l,l+2):o-56320+(a-55296<<10)+65536)}}},function(t,e,n){var i=n(57),r=Math.max,a=Math.min;t.exports=function(t,e){return t=i(t),t<0?r(t+e,0):a(t,e)}},function(t,e,n){var i=n(12),r=n(86);t.exports=n(3).getIterator=function(t){var e=r(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return i(e.call(t))}},function(t,e,n){var i=n(45),r=n(4)("iterator"),a=n(19);t.exports=n(3).isIterable=function(t){var e=Object(t);return void 0!==e[r]||"@@iterator"in e||a.hasOwnProperty(i(e))}},function(t,e,n){"use strict";var i=n(265),r=n(81),a=n(19),o=n(16);t.exports=n(50)(Array,"Array",function(t,e){this._t=o(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,r(1)):"keys"==e?r(0,n):"values"==e?r(0,t[n]):r(0,[n,t[n]])},"values"),a.Arguments=a.Array,i("keys"),i("values"),i("entries")},function(t,e,n){var i=n(13);i(i.S+i.F,"Object",{assign:n(280)})},function(t,e,n){var i=n(13);i(i.S+i.F*!n(6),"Object",{defineProperty:n(8).f})},function(t,e,n){var i=n(34),r=n(20);n(285)("keys",function(){return function(t){return r(i(t))}})},function(t,e,n){"use strict";var i=n(271);t.exports=n(273)("Set",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return i.def(this,t=0===t?0:t,t)}},i)},function(t,e,n){"use strict";var i=n(7),r=n(15),a=n(6),o=n(13),s=n(85),l=n(52).KEY,u=n(14),c=n(56),d=n(33),f=n(35),h=n(4),p=n(61),m=n(60),v=n(279),y=n(274),g=n(80),b=n(12),x=n(16),C=n(59),_=n(32),S=n(53),w=n(283),k=n(282),$=n(8),O=n(20),T=k.f,M=$.f,D=w.f,F=i.Symbol,E=i.JSON,P=E&&E.stringify,A="prototype",j=h("_hidden"),B=h("toPrimitive"),R={}.propertyIsEnumerable,I=c("symbol-registry"),L=c("symbols"),z=c("op-symbols"),N=Object[A],H="function"==typeof F,W=i.QObject,V=!W||!W[A]||!W[A].findChild,Y=a&&u(function(){return 7!=S(M({},"a",{get:function(){return M(this,"a",{value:7}).a}})).a})?function(t,e,n){var i=T(N,e);i&&delete N[e],M(t,e,n),i&&t!==N&&M(N,e,i)}:M,K=function(t){var e=L[t]=S(F[A]);return e._k=t,e},G=H&&"symbol"==typeof F.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof F},X=function(t,e,n){return t===N&&X(z,e,n),b(t),e=C(e,!0),b(n),r(L,e)?(n.enumerable?(r(t,j)&&t[j][e]&&(t[j][e]=!1),n=S(n,{enumerable:_(0,!1)})):(r(t,j)||M(t,j,_(1,{})),t[j][e]=!0),Y(t,e,n)):M(t,e,n)},U=function(t,e){b(t);for(var n,i=y(e=x(e)),r=0,a=i.length;a>r;)X(t,n=i[r++],e[n]);return t},q=function(t,e){return void 0===e?S(t):U(S(t),e)},Z=function(t){var e=R.call(this,t=C(t,!0));return!(this===N&&r(L,t)&&!r(z,t))&&(!(e||!r(this,t)||!r(L,t)||r(this,j)&&this[j][t])||e)},J=function(t,e){if(t=x(t),e=C(e,!0),t!==N||!r(L,e)||r(z,e)){var n=T(t,e);return!n||!r(L,e)||r(t,j)&&t[j][e]||(n.enumerable=!0),n}},Q=function(t){for(var e,n=D(x(t)),i=[],a=0;n.length>a;)r(L,e=n[a++])||e==j||e==l||i.push(e);return i},tt=function(t){for(var e,n=t===N,i=D(n?z:x(t)),a=[],o=0;i.length>o;)!r(L,e=i[o++])||n&&!r(N,e)||a.push(L[e]);return a};H||(F=function(){if(this instanceof F)throw TypeError("Symbol is not a constructor!");var t=f(arguments.length>0?arguments[0]:void 0),e=function(n){this===N&&e.call(z,n),r(this,j)&&r(this[j],t)&&(this[j][t]=!1),Y(this,t,_(1,n))};return a&&V&&Y(N,t,{configurable:!0,set:e}),K(t)},s(F[A],"toString",function(){return this._k}),k.f=J,$.f=X,n(82).f=w.f=Q,n(31).f=Z,n(54).f=tt,a&&!n(51)&&s(N,"propertyIsEnumerable",Z,!0),p.f=function(t){return K(h(t))}),o(o.G+o.W+o.F*!H,{Symbol:F});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)h(et[nt++]);for(var et=O(h.store),nt=0;et.length>nt;)m(et[nt++]);o(o.S+o.F*!H,"Symbol",{for:function(t){return r(I,t+="")?I[t]:I[t]=F(t)},keyFor:function(t){if(G(t))return v(I,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){V=!0},useSimple:function(){V=!1}}),o(o.S+o.F*!H,"Object",{create:q,defineProperty:X,defineProperties:U,getOwnPropertyDescriptor:J,getOwnPropertyNames:Q,getOwnPropertySymbols:tt}),E&&o(o.S+o.F*(!H||u(function(){var t=F();return"[null]"!=P([t])||"{}"!=P({a:t})||"{}"!=P(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!G(t)){for(var e,n,i=[t],r=1;arguments.length>r;)i.push(arguments[r++]);return e=i[1],"function"==typeof e&&(n=e),!n&&g(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!G(e))return e}),i[1]=e,P.apply(E,i)}}}),F[A][B]||n(10)(F[A],B,F[A].valueOf),d(F,"Symbol"),d(Math,"Math",!0),d(i.JSON,"JSON",!0)},function(t,e,n){var i=n(13);i(i.P+i.R,"Set",{toJSON:n(272)("Set")})},function(t,e,n){n(60)("asyncIterator")},function(t,e,n){n(60)("observable")},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){n(308);var i=n(0)(n(144),n(493),null,null);t.exports=i.exports},function(t,e,n){n(327);var i=n(0)(n(145),n(514),null,null);t.exports=i.exports},function(t,e,n){n(326);var i=n(0)(n(146),n(513),null,null);t.exports=i.exports},function(t,e,n){n(373);var i=n(0)(n(147),n(555),"data-v-7fd436bc",null);t.exports=i.exports},function(t,e,n){n(329);var i=n(0)(n(148),n(516),null,null);t.exports=i.exports},function(t,e,n){n(353);var i=n(0)(n(149),null,null,null);t.exports=i.exports},function(t,e,n){n(316);var i=n(0)(n(150),n(503),null,null);t.exports=i.exports},function(t,e,n){n(370);var i=n(0)(n(151),n(552),null,null);t.exports=i.exports},function(t,e,n){var i=n(0)(n(152),n(574),null,null);t.exports=i.exports},function(t,e,n){n(357);var i=n(0)(n(153),n(540),"data-v-64be4c11",null);t.exports=i.exports},function(t,e,n){n(379);var i=n(0)(n(154),n(561),null,null);t.exports=i.exports},function(t,e,n){n(339);var i=n(0)(n(155),n(525),null,null);t.exports=i.exports},function(t,e,n){n(309);var i=n(0)(n(156),n(494),null,null);t.exports=i.exports},function(t,e,n){n(347);var i=n(0)(n(157),n(532),null,null);t.exports=i.exports},function(t,e,n){n(396);var i=n(0)(n(158),n(581),null,null);t.exports=i.exports},function(t,e,n){n(348);var i=n(0)(n(159),n(533),null,null);t.exports=i.exports},function(t,e,n){n(333);var i=n(0)(n(160),n(519),null,null);t.exports=i.exports},function(t,e,n){n(394);var i=n(0)(n(161),n(579),null,null);t.exports=i.exports},function(t,e,n){n(368);var i=n(0)(n(162),n(550),null,null);t.exports=i.exports},function(t,e,n){n(365);var i=n(0)(n(163),n(548),null,null);t.exports=i.exports},function(t,e,n){n(332);var i=n(0)(n(164),n(518),null,null);t.exports=i.exports},function(t,e,n){n(318);var i=n(0)(n(165),n(505),null,null);t.exports=i.exports},function(t,e,n){n(374);var i=n(0)(n(166),n(556),null,null);t.exports=i.exports},function(t,e,n){n(382);var i=n(0)(n(167),n(564),null,null);t.exports=i.exports},function(t,e,n){n(371);var i=n(0)(n(168),n(553),null,null);t.exports=i.exports},function(t,e,n){n(364);var i=n(0)(n(169),n(547),null,null);t.exports=i.exports},function(t,e,n){n(321);var i=n(0)(n(170),null,null,null);t.exports=i.exports},function(t,e,n){n(366);var i=n(0)(n(171),null,null,null);t.exports=i.exports},function(t,e,n){n(317);var i=n(0)(n(172),n(504),null,null);t.exports=i.exports},function(t,e,n){n(351);var i=n(0)(n(173),n(536),null,null);t.exports=i.exports},function(t,e,n){n(352);var i=n(0)(n(174),n(537),null,null);t.exports=i.exports},function(t,e,n){n(331);var i=n(0)(n(175),n(517),null,null);t.exports=i.exports},function(t,e,n){n(313);var i=n(0)(n(176),n(499),null,null);t.exports=i.exports},function(t,e,n){n(383);var i=n(0)(n(177),n(565),null,null);t.exports=i.exports},function(t,e,n){n(367);var i=n(0)(n(178),n(549),null,null);t.exports=i.exports},function(t,e,n){var i=n(0)(n(179),n(566),null,null);t.exports=i.exports},function(t,e,n){n(380);var i=n(0)(n(180),n(562),null,null);t.exports=i.exports},function(t,e,n){var i=n(0)(n(181),n(502),null,null);t.exports=i.exports},function(t,e,n){var i=n(0)(n(182),n(495),null,null);t.exports=i.exports},function(t,e,n){n(384);var i=n(0)(n(183),n(567),null,null);t.exports=i.exports},function(t,e,n){n(354);var i=n(0)(n(184),n(538),null,null);t.exports=i.exports},function(t,e,n){n(306);var i=n(0)(n(185),null,null,null);t.exports=i.exports},function(t,e,n){n(360);var i=n(0)(n(186),n(543),null,null);t.exports=i.exports},function(t,e,n){n(314);var i=n(0)(n(187),n(500),null,null);t.exports=i.exports},function(t,e,n){n(361);var i=n(0)(n(188),n(544),null,null);t.exports=i.exports},function(t,e,n){n(391);var i=n(0)(n(189),n(576),null,null);t.exports=i.exports},function(t,e,n){n(335);var i=n(0)(n(195),n(521),null,null);t.exports=i.exports},function(t,e,n){n(395);var i=n(0)(n(197),n(580),null,null);t.exports=i.exports},function(t,e,n){n(320);var i=n(0)(n(200),n(507),null,null);t.exports=i.exports},function(t,e,n){n(304);var i=n(0)(n(201),n(490),null,null);t.exports=i.exports},function(t,e,n){n(355);var i=n(0)(n(202),n(539),null,null);t.exports=i.exports},function(t,e,n){n(310);var i=n(0)(n(203),n(496),null,null);t.exports=i.exports},function(t,e,n){n(363);var i=n(0)(n(204),n(546),null,null);t.exports=i.exports},function(t,e,n){n(378);var i=n(0)(n(205),n(560),null,null);t.exports=i.exports},function(t,e,n){n(345);var i=n(0)(n(206),n(530),null,null);t.exports=i.exports},function(t,e,n){n(303);var i=n(0)(n(207),n(489),null,null);t.exports=i.exports},function(t,e,n){n(334);var i=n(0)(n(208),n(520),null,null);t.exports=i.exports},function(t,e,n){n(377);var i=n(0)(n(209),n(559),null,null);t.exports=i.exports},function(t,e,n){n(338);var i=n(0)(n(210),n(524),null,null);t.exports=i.exports},function(t,e,n){n(393);var i=n(0)(n(211),n(578),null,null);t.exports=i.exports},function(t,e,n){n(376);var i=n(0)(n(212),n(558),null,null);t.exports=i.exports},function(t,e,n){n(344);var i=n(0)(n(213),null,null,null);t.exports=i.exports},function(t,e,n){n(359);var i=n(0)(n(214),n(542),null,null);t.exports=i.exports},function(t,e,n){n(350);var i=n(0)(n(215),n(535),null,null);t.exports=i.exports},function(t,e,n){n(301);var i=n(0)(n(216),n(487),null,null);t.exports=i.exports},function(t,e,n){n(389);var i=n(0)(n(218),null,null,null);t.exports=i.exports},function(t,e,n){n(307);var i=n(0)(n(219),n(492),null,null);t.exports=i.exports},function(t,e,n){n(346);var i=n(0)(n(220),n(531),null,null);t.exports=i.exports},function(t,e,n){n(341);var i=n(0)(n(221),n(527),null,null);t.exports=i.exports},function(t,e,n){var i=n(0)(n(222),n(512),null,null);t.exports=i.exports},function(t,e,n){var i=n(0)(n(224),n(573),null,null);t.exports=i.exports},function(t,e,n){n(337);var i=n(0)(n(226),n(523),null,null);t.exports=i.exports},function(t,e,n){n(385);var i=n(0)(n(227),n(568),null,null);t.exports=i.exports},function(t,e,n){n(336);var i=n(0)(n(228),n(522),null,null);t.exports=i.exports},function(t,e,n){n(349);var i=n(0)(n(229),n(534),null,null);t.exports=i.exports},function(t,e,n){n(387);var i=n(0)(n(230),n(570),null,null);t.exports=i.exports},function(t,e,n){n(358);var i=n(0)(n(231),n(541),null,null);t.exports=i.exports},function(t,e,n){n(392);var i=n(0)(n(232),n(577),null,null);t.exports=i.exports},function(t,e,n){n(315);var i=n(0)(n(233),n(501),null,null);t.exports=i.exports},function(t,e,n){n(325);var i=n(0)(n(234),n(511),null,null);t.exports=i.exports},function(t,e,n){var i=n(0)(n(235),n(572),null,null);t.exports=i.exports},function(t,e,n){n(311);var i=n(0)(n(236),n(497),"data-v-10c9b411",null);t.exports=i.exports},function(t,e,n){n(323);var i=n(0)(n(237),n(509),null,null);t.exports=i.exports},function(t,e,n){n(342);var i=n(0)(n(238),n(528),null,null);t.exports=i.exports},function(t,e,n){n(381);var i=n(0)(n(239),n(563),null,null);t.exports=i.exports},function(t,e,n){n(302);var i=n(0)(n(242),n(488),null,null);t.exports=i.exports},function(t,e,n){n(324);var i=n(0)(n(243),n(510),null,null);t.exports=i.exports},function(t,e,n){n(330);var i=n(0)(n(244),null,null,null);t.exports=i.exports},function(t,e,n){n(375);var i=n(0)(n(245),n(557),null,null);t.exports=i.exports},function(t,e,n){n(312);var i=n(0)(n(246),n(498),null,null);t.exports=i.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-step-content",class:{last:t.last}},[n("div",{staticStyle:{position:"relative",overflow:"hidden",height:"100%"}},[n("expand-transition",[t.active?n("div",{ref:"inner",staticClass:"mu-step-content-inner"},[t._t("default")],2):t._e()])],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-time-display"},[n("div",{staticClass:"mu-time-display-text"},[n("div",{staticClass:"mu-time-display-affix"}),t._v(" "),n("div",{staticClass:"mu-time-display-time"},[n("span",{staticClass:"mu-time-display-clickable",class:{inactive:"minute"===t.mode},on:{click:t.handleSelectHour}},[t._v(t._s(t.sanitizeTime[0]))]),t._v(" "),n("span",[t._v(":")]),t._v(" "),n("span",{staticClass:"mu-time-display-clickable",class:{inactive:"hour"===t.mode},on:{click:t.handleSelectMin}},[t._v(t._s(t.sanitizeTime[1]))])]),t._v(" "),n("div",{staticClass:"mu-time-display-affix"},["ampm"===t.format?n("div",{staticClass:"mu-time-display-clickable",class:{inactive:"am"===t.affix},on:{click:function(e){t.handleSelectAffix("pm")}}},[t._v("\n        PM\n      ")]):t._e(),t._v(" "),"ampm"===t.format?n("div",{staticClass:"mu-time-display-clickable mu-time-display-affix-top",class:{inactive:"pm"===t.affix},on:{click:function(e){t.handleSelectAffix("am")}}},[t._v("\n        AM\n      ")]):t._e()])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"mu-radio",class:{"label-left":t.labelLeft,disabled:t.disabled,"no-label":!t.label},on:{mousedown:t.handleMouseDown,mouseleave:t.handleMouseLeave,mouseup:t.handleMouseUp,touchstart:t.handleTouchStart,touchend:t.handleTouchEnd,touchcancel:t.handleTouchEnd,click:function(e){e.stopPropagation(),t.handleClick(e)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.inputValue,expression:"inputValue"}],attrs:{type:"radio",disabled:t.disabled,name:t.name},domProps:{value:t.nativeValue,checked:t._q(t.inputValue,t.nativeValue)},on:{change:t.handleChange,__c:function(e){t.inputValue=t.nativeValue}}}),t._v(" "),t.disabled?t._e():n("touch-ripple",{staticClass:"mu-radio-wrapper",attrs:{rippleWrapperClass:"mu-radio-ripple-wrapper"}},[t.label&&t.labelLeft?n("div",{staticClass:"mu-radio-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("div",{staticClass:"mu-radio-icon"},[t.checkedIcon?t._e():n("svg",{staticClass:"mu-radio-icon-uncheck mu-radio-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}})]),t._v(" "),t.uncheckIcon?t._e():n("svg",{staticClass:"mu-radio-icon-checked mu-radio-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}})]),t._v(" "),t.uncheckIcon?n("icon",{staticClass:"mu-radio-icon-uncheck",class:t.iconClass,attrs:{value:t.uncheckIcon}}):t._e(),t._v(" "),t.checkedIcon?n("icon",{staticClass:"mu-radio-icon-checked",class:t.iconClass,attrs:{value:t.checkedIcon}}):t._e()],1),t._v(" "),t.label&&!t.labelLeft?n("div",{staticClass:"mu-radio-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e()]),t._v(" "),t.disabled?n("div",{staticClass:"mu-radio-wrapper"},[t.label&&t.labelLeft?n("div",{staticClass:"mu-radio-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("div",{staticClass:"mu-radio-icon"},[t.checkedIcon?t._e():n("svg",{staticClass:"mu-radio-icon-uncheck mu-radio-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}})]),t._v(" "),t.uncheckIcon?t._e():n("svg",{staticClass:"mu-radio-icon-checked mu-radio-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}})]),t._v(" "),t.uncheckIcon?n("icon",{staticClass:"mu-radio-icon-uncheck",class:t.iconClass,attrs:{value:t.uncheckIcon}}):t._e(),t._v(" "),t.checkedIcon?n("icon",{staticClass:"mu-radio-icon-checked",class:t.iconClass,attrs:{value:t.checkedIcon}}):t._e()],1),t._v(" "),t.label&&!t.labelLeft?n("div",{staticClass:"mu-radio-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e()]):t._e()],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.total?n("div",{staticClass:"mu-pagination"},[n("page-item",{attrs:{identifier:"singleBack",disabled:t.leftDisabled},on:{click:t.handleClick}},[n("svg",{staticClass:"mu-pagination-svg-icon",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}})])]),t._v(" "),n("page-item",{attrs:{index:1,isActive:1===t.actualCurrent},on:{click:t.handleClick}}),t._v(" "),t.totalPageCount>5&&t.actualCurrent-1>=4?n("page-item",{attrs:{identifier:"backs",title:"前5页"},on:{click:t.handleClick}},[n("span",[t._v("...")])]):t._e(),t._v(" "),t._l(t.pageList,function(e){return n("page-item",{key:e,attrs:{index:e,isActive:t.actualCurrent===e},on:{click:t.handleClick}})}),t._v(" "),t.totalPageCount>5&&t.totalPageCount-t.actualCurrent>=4?n("page-item",{attrs:{identifier:"forwards",title:"后5页"},on:{click:t.handleClick}},[n("span",[t._v("...")])]):t._e(),t._v(" "),1!==t.totalPageCount?n("page-item",{attrs:{index:t.totalPageCount,isActive:t.actualCurrent===t.totalPageCount},on:{click:t.handleClick}}):t._e(),t._v(" "),n("page-item",{attrs:{identifier:"singleForward",disabled:t.rightDisabled},on:{click:t.handleClick}},[n("svg",{staticClass:"mu-pagination-svg-icon",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}})])]),t._v(" "),t.showSizeChanger?n("select-field",{style:{width:"100px"},model:{value:t.actualPageSize,callback:function(e){t.actualPageSize=e},expression:"actualPageSize"}},t._l(t.pageSizeOption,function(e){return n("menu-item",{key:"mt_"+e,style:{width:"100px"},attrs:{value:e,title:e+t.pageSizeChangerText}})})):t._e()],2):t._e()},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("transition",{attrs:{name:"mu-expand"},on:{"before-enter":t.beforeEnter,enter:t.enter,"after-enter":t.afterEnter,"before-leave":t.beforeLeave,leave:t.leave,"after-leave":t.afterLeave}},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-sub-header",class:{inset:t.inset}},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-appbar",class:["mu-paper-"+t.zDepth]},[n("div",{staticClass:"left"},[t._t("left")],2),t._v(" "),n("div",{staticClass:"mu-appbar-title",class:t.titleClass},[t._t("default",[n("span",[t._v(t._s(t.title))])])],2),t._v(" "),n("div",{staticClass:"right"},[t._t("right")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-card-header"},[t._t("avatar"),t._v(" "),t.title||t.subTitle?n("div",{staticClass:"mu-card-header-title"},[n("div",{staticClass:"mu-card-title",class:t.titleClass},[t._v("\n      "+t._s(t.title)+"\n    ")]),t._v(" "),n("div",{staticClass:"mu-card-sub-title",class:t.subTitleClass},[t._v("\n      "+t._s(t.subTitle)+"\n    ")])]):t._e(),t._v(" "),t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"row",class:{"no-gutter":!t.gutter}},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-picker-slot",class:{"mu-picker-slot-divider":t.divider},style:{width:t.width}},[t.divider?t._e():n("div",{ref:"wrapper",staticClass:"mu-picker-slot-wrapper",class:{animate:t.animate},style:{height:t.contentHeight+"px"}},t._l(t.values,function(e,i){return n("div",{key:i,staticClass:"mu-picker-item",class:{selected:e===t.value},style:{"text-align":t.textAlign}},[t._v(t._s(e.text||e))])})),t._v(" "),t.divider?n("div",[t._v(t._s(t.content))]):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-timeline-item"},[t.last?t._e():n("div",{staticClass:"mu-timeline-item-line",style:t.lineStyle}),t._v(" "),n("div",{staticClass:"mu-timeline-item-icon"},[t._t("icon",[n("div",{style:t.iconStyle})])],2),t._v(" "),n("div",{staticClass:"mu-timeline-item-content",style:t.contentStyle},[t._t("default",[n("div",{staticClass:"mu-timeline-item-time"},[t._t("time")],2),t._v(" "),n("div",{staticClass:"mu-timeline-item-des"},[t._t("des")],2)])],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-tooltip",class:{touched:t.touch,"when-shown":t.show},style:t.tooltipStyle},[n("div",{ref:"ripple",staticClass:"mu-tooltip-ripple",class:{"when-shown":t.show},style:t.rippleStyle}),t._v(" "),n("span",{staticClass:"mu-tooltip-label"},[t._v(t._s(t.label))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-dropDown-menu",class:{disabled:t.disabled}},[n("svg",{staticClass:"mu-dropDown-menu-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7 10l5 5 5-5z"}})]),t._v(" "),n("div",{staticClass:"mu-dropDown-menu-text",class:t.labelClass,on:{click:t.handleOpen}},[n("div",{staticClass:"mu-dropDown-menu-text-overflow"},[t._v(t._s(t.label))])]),t._v(" "),n("div",{staticClass:"mu-dropDown-menu-line",class:t.underlineClass}),t._v(" "),!t.disabled&&t.$slots&&t.$slots.default&&t.$slots.default.length>0?n("popover",{attrs:{scroller:t.scroller,open:t.openMenu,trigger:t.trigger,anchorOrigin:t.anchorOrigin},on:{close:t.handleClose}},[n("mu-menu",{class:t.menuClass,style:{width:t.menuWidth+"px"},attrs:{listClass:t.menuListClass,value:t.value,multiple:t.multiple,autoWidth:t.autoWidth,popover:t.openMenu,desktop:"",maxHeight:t.maxHeight},on:{change:t.change,itemClick:t.itemClick}},[t._t("default")],2)],1):t._e()],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-icon-menu"},[n("icon-button",{attrs:{tooltip:t.tooltip,tooltipPosition:t.tooltipPosition,icon:t.icon,iconClass:t.iconClass},on:{click:t.handleOpen}},[t._t("icon")],2),t._v(" "),t.$slots&&t.$slots.default&&t.$slots.default.length>0?n("popover",{attrs:{open:t.openMenu,trigger:t.trigger,scroller:t.scroller,anchorOrigin:t.anchorOrigin,targetOrigin:t.targetOrigin},on:{close:t.handleClose}},[n("mu-menu",{class:t.menuClass,attrs:{popover:t.openMenu,value:t.value,listClass:t.menuListClass,multiple:t.multiple,desktop:t.desktop,maxHeight:t.maxHeight},on:{change:t.change,itemClick:t.itemClick}},[t._t("default")],2)],1):t._e()],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-text-field-label",class:t.labelClass},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"col",class:t.classObj},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-buttom-item",class:{"mu-bottom-item-active":t.active},attrs:{href:t.href,to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,disableTouchRipple:t.shift,"center-ripple":!1,wrapperClass:"mu-buttom-item-wrapper"},nativeOn:{click:function(e){t.handleClick(e)}}},[t.icon?n("icon",{staticClass:"mu-bottom-item-icon",class:t.iconClass,attrs:{value:t.icon}}):t._e(),t._v(" "),t._t("default"),t._v(" "),t.title?n("span",{staticClass:"mu-bottom-item-text",class:t.titleClass},[t._v(t._s(t.title))]):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:"mu-year-button",class:{selected:t.selected,hover:t.hover},on:{click:t.handleClick,mouseenter:t.handleHover,mouseleave:t.handleHoverExit}},[n("span",{staticClass:"mu-year-button-text"},[t._v(t._s(t.year))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-calendar-monthday-content"},t._l(t.weeksArray,function(e,i){return n("div",{key:i,staticClass:"mu-calendar-monthday-row"},t._l(e,function(e,r){return n("day-button",{key:"dayButton"+i+r,attrs:{disabled:t.isDisableDate(e),selected:t.equalsDate(e),date:e},on:{click:function(n){t.handleClick(e)}}})}))}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("abstract-button",{ref:"button",staticClass:"mu-menu-item-wrapper",class:{active:t.active},attrs:{href:t.href,target:t.target,centerRipple:!1,to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,disableFocusRipple:t.disableFocusRipple,disabled:t.disabled,containerElement:"div"},on:{click:t.handleClick,keyboardFocus:t.handleKeyboardFocus,hover:t.handleHover,hoverExit:t.handleHoverExit}},[n("div",{staticClass:"mu-menu-item",class:{"have-left-icon":t.leftIcon||t.inset}},[n("icon",{staticClass:"mu-menu-item-left-icon",class:t.leftIconClass,style:{color:t.filterColor(t.leftIconColor)},attrs:{value:t.leftIcon}}),t._v(" "),n("div",{staticClass:"mu-menu-item-title",class:t.titleClass},[t._t("title",[t._v("\n           "+t._s(t.title)+"\n         ")])],2),t._v(" "),t.rightIcon?t._e():n("div",[t.showAfterText?n("span",{class:t.afterTextClass},[t._v(t._s(t.afterText))]):t._e(),t._v(" "),t._t("after")],2),t._v(" "),n("icon",{staticClass:"mu-menu-item-right-icon",class:t.rightIconClass,style:{color:t.filterColor(t.rightIconColor)},attrs:{value:t.rightIcon}})],1)]),t._v(" "),t.$slots&&t.$slots.default&&t.$slots.default.length>0?n("popover",{attrs:{open:t.openMenu,anchorOrigin:{vertical:"top",horizontal:"right"},trigger:t.trigger},on:{close:t.close}},[t.openMenu?n("mu-menu",{class:t.nestedMenuClass,attrs:{desktop:t.$parent.desktop,popover:"",listClass:t.nestedMenuListClass,maxHeight:t.$parent.maxHeight,value:t.nestedMenuValue}},[t._t("default")],2):t._e()],1):t._e()],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-pagination-item",class:{circle:t.isCircle,active:t.isActive},attrs:{wrapperClass:"mu-pagination-item-wrapper",centerRipple:!1,disabled:t.disabled,containerElement:"div"},on:{click:t.handleClick,hover:t.handleHover,hoverExit:t.handleHoverExit}},[t.index?n("span",[t._v(t._s(t.index))]):t._e(),t._v(" "),t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{on:{mousedown:t.handleMouseDown,mouseup:function(e){t.end()},mouseleave:function(e){t.end()},touchstart:t.handleTouchStart,touchend:function(e){t.end()},touchcancel:function(e){t.end()}}},[n("div",{ref:"holder",staticClass:"mu-ripple-wrapper",class:t.rippleWrapperClass},t._l(t.ripples,function(t){return n("circle-ripple",{key:t.key,attrs:{color:t.color,opacity:t.opacity,"merge-style":t.style}})})),t._v(" "),t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-clock",class:{"mu-clock-landspace":t.landscape}},[n("time-display",{attrs:{selectedTime:t.selectedTime,format:t.format,mode:t.mode,affix:t.getAffix()},on:{selectMin:function(e){t.mode="minute"},selectHour:function(e){t.mode="hour"},selectAffix:t.handleSelectAffix}}),t._v(" "),n("div",{staticClass:"mu-clock-container"},[n("div",{staticClass:"mu-clock-circle"}),t._v(" "),"hour"===t.mode?n("clock-hours",{attrs:{format:t.format,initialHours:t.selectedTime.getHours()},on:{change:t.handleChangeHours}}):t._e(),t._v(" "),"minute"===t.mode?n("clock-minutes",{attrs:{initialMinutes:t.selectedTime.getMinutes()},on:{change:t.handleChangeMinutes}}):t._e(),t._v(" "),n("div",{staticClass:"mu-clock-actions"},[n("flat-button",{attrs:{label:t.cancelLabel,primary:""},on:{click:t.dismiss}}),t._v(" "),n("flat-button",{attrs:{label:t.okLabel,primary:""},on:{click:t.accept}})],1)],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-time-picker",class:{fullWidth:t.fullWidth}},[n("text-field",{attrs:{name:t.name,value:t.inputValue,fullWidth:t.fullWidth,inputClass:t.inputClass,label:t.label,labelFloat:t.labelFloat,labelClass:t.labelClass,labelFocusClass:t.labelFocusClass,hintText:t.hintText,hintTextClass:t.hintTextClass,helpText:t.helpText,helpTextClass:t.helpTextClass,disabled:t.disabled,errorText:t.errorText,errorColor:t.errorColor,icon:t.icon,iconClass:t.iconClass,underlineShow:t.underlineShow,underlineClass:t.underlineClass,underlineFocusClass:t.underlineFocusClass},on:{focus:t.handleFocus,labelClick:t.handleClick}}),t._v(" "),t.disabled?t._e():n("time-picker-dialog",{ref:"dialog",attrs:{initialTime:t.dialogTime,format:t.format,mode:t.mode,container:t.container,autoOk:t.autoOk,okLabel:t.okLabel,cancelLabel:t.cancelLabel},on:{accept:t.handleAccept}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("hr",{staticClass:"mu-text-field-line",class:t.lineClass}),t._v(" "),t.disabled?t._e():n("hr",{staticClass:"mu-text-field-focus-line",class:t.focusLineClass,style:t.errorStyle})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("tbody",[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-avatar",style:t.avatarStyle,on:{click:t.handleClick}},[n("div",{staticClass:"mu-avatar-inner"},[t.icon?n("icon",{class:t.iconClass,attrs:{value:t.icon,size:t.iconSize}}):t._e(),t._v(" "),t.src?n("img",{class:t.imgClass,attrs:{src:t.src}}):t._e(),t._v(" "),t._t("default")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-auto-complete",class:{fullWidth:t.fullWidth}},[n("text-field",{ref:"textField",attrs:{value:t.searchText,disabled:t.disabled,inputClass:t.inputClass,label:t.label,labelFloat:t.labelFloat,labelClass:t.labelClass,labelFocusClass:t.labelFocusClass,hintText:t.hintText,hintTextClass:t.hintTextClass,helpText:t.helpText,helpTextClass:t.helpTextClass,errorText:t.errorText,errorColor:t.errorColor,icon:t.icon,iconClass:t.iconClass,fullWidth:t.fullWidth,underlineShow:t.underlineShow,underlineClass:t.underlineClass,underlineFocusClass:t.underlineFocusClass},on:{focus:t.handleFocus,input:t.handleInput,blur:t.handleBlur},nativeOn:{keydown:function(e){t.handleKeyDown(e)}},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}}),t._v(" "),n("popover",{attrs:{overlay:!1,autoPosition:!1,scroller:t.scroller,open:t.open&&t.list.length>0,trigger:t.anchorEl,anchorOrigin:t.anchorOrigin,targetOrigin:t.targetOrigin},on:{close:t.handleClose}},[t.open?n("mu-menu",{ref:"menu",staticClass:"mu-auto-complete-menu",style:{width:(t.menuWidth&&t.menuWidth>t.inputWidth?t.menuWidth:t.inputWidth)+"px"},attrs:{maxHeight:t.maxHeight,disableAutoFocus:t.focusTextField,initiallyKeyboardFocused:"",autoWidth:!1},on:{itemClick:t.handleItemClick},nativeOn:{mousedown:function(e){t.handleMouseDown(e)}}},t._l(t.list,function(e,i){return n("menu-item",{key:"auto_"+i,staticClass:"mu-auto-complete-menu-item",attrs:{disableFocusRipple:t.disableFocusRipple,afterText:"",leftIcon:e.leftIcon,leftIconColor:e.leftIconColor,rightIconColor:e.rightIconColor,rightIcon:e.rightIcon,value:e.value,title:e.text},nativeOn:{mousedown:function(e){t.handleMouseDown(e)}}})})):t._e()],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:t.clickoutside,expression:"clickoutside"}],staticClass:"mu-menu",style:{width:t.contentWidth},attrs:{tabindex:"0"},on:{keydown:t.handleKeydown}},[n("div",{ref:"list",staticClass:"mu-menu-list",class:t.menuListClass,style:{width:t.contentWidth,"max-height":t.maxHeight+"px"}},[t._t("default")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-badge-container"},[t._t("default"),t._v(" "),n("em",{staticClass:"mu-badge",class:t.badgeInternalClass,style:t.badgeStyle},[t._t("content",[t._v("\n      "+t._s(t.content)+"\n    ")])],2)],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("paper",{staticClass:"mu-drawer",class:{open:t.open,right:t.right},style:t.drawerStyle,attrs:{zDepth:t.zDepth}},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-calendar",class:{"mu-calendar-landspace":"landscape"===t.mode}},[n("date-display",{attrs:{monthDaySelected:t.displayMonthDay,disableYearSelection:t.disableYearSelection,selectedDate:t.selectedDate,dateTimeFormat:t.dateTimeFormat},on:{selectYear:t.selectYear,selectMonth:t.selectMonth}}),t._v(" "),n("div",{staticClass:"mu-calendar-container"},[t.displayMonthDay?n("div",{staticClass:"mu-calendar-monthday-container"},[n("calendar-toolbar",{attrs:{slideType:t.slideType,nextMonth:t.nextMonth,prevMonth:t.prevMonth,displayDates:t.displayDates,dateTimeFormat:t.dateTimeFormat},on:{monthChange:t.handleMonthChange}}),t._v(" "),n("div",{staticClass:"mu-calendar-week"},t._l(t.weekTexts,function(e,i){return n("span",{key:i,staticClass:"mu-calendar-week-day"},[t._v(t._s(e))])})),t._v(" "),n("div",{staticClass:"mu-calendar-monthday"},t._l(t.displayDates,function(e,i){return n("transition",{key:i,attrs:{name:"mu-calendar-slide-"+t.slideType}},[n("div",{key:e.getTime(),staticClass:"mu-calendar-monthday-slide"},[n("calendar-month",{attrs:{shouldDisableDate:t.shouldDisableDate,displayDate:e,firstDayOfWeek:t.firstDayOfWeek,maxDate:t.maxDate,minDate:t.minDate,selectedDate:t.selectedDate},on:{selected:t.handleSelected}})],1)])}))],1):t._e(),t._v(" "),t.displayMonthDay?t._e():n("calendar-year",{attrs:{selectedDate:t.selectedDate,maxDate:t.maxDate,minDate:t.minDate},on:{change:t.handleYearChange}}),t._v(" "),n("div",{staticClass:"mu-calendar-actions"},[n("flat-button",{attrs:{label:t.cancelLabel,primary:""},on:{click:t.handleCancel}}),t._v(" "),t.autoOk?t._e():n("flat-button",{attrs:{label:t.okLabel,primary:""},on:{click:t.handleOk}})],1)],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"mu-checkbox",class:{"label-left":t.labelLeft,disabled:t.disabled,"no-label":!t.label},on:{mousedown:t.handleMouseDown,mouseup:t.handleMouseUp,mouseleave:t.handleMouseLeave,touchstart:t.handleTouchStart,touchend:t.handleTouchEnd,touchcancel:t.handleTouchEnd,click:function(e){e.stopPropagation(),t.handleClick(e)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.inputValue,expression:"inputValue"}],attrs:{type:"checkbox",disabled:t.disabled,name:t.name},domProps:{value:t.nativeValue,checked:Array.isArray(t.inputValue)?t._i(t.inputValue,t.nativeValue)>-1:t.inputValue},on:{change:t.handleChange,__c:function(e){var n=t.inputValue,i=e.target,r=!!i.checked;if(Array.isArray(n)){var a=t.nativeValue,o=t._i(n,a);r?o<0&&(t.inputValue=n.concat(a)):o>-1&&(t.inputValue=n.slice(0,o).concat(n.slice(o+1)))}else t.inputValue=r}}}),t._v(" "),t.disabled?t._e():n("touch-ripple",{staticClass:"mu-checkbox-wrapper",attrs:{rippleWrapperClass:"mu-checkbox-ripple-wrapper"}},[t.label&&t.labelLeft?n("div",{staticClass:"mu-checkbox-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("div",{staticClass:"mu-checkbox-icon"},[t.checkedIcon?t._e():n("svg",{staticClass:"mu-checkbox-icon-uncheck mu-checkbox-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}})]),t._v(" "),t.uncheckIcon?t._e():n("svg",{staticClass:"mu-checkbox-icon-checked mu-checkbox-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}})]),t._v(" "),t.uncheckIcon?n("icon",{staticClass:"mu-checkbox-icon-uncheck",class:t.iconClass,attrs:{value:t.uncheckIcon}}):t._e(),t._v(" "),t.checkedIcon?n("icon",{staticClass:"mu-checkbox-icon-checked",class:t.iconClass,attrs:{value:t.checkedIcon}}):t._e()],1),t._v(" "),t.label&&!t.labelLeft?n("div",{staticClass:"mu-checkbox-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e()]),t._v(" "),t.disabled?n("div",{staticClass:"mu-checkbox-wrapper"},[t.label&&t.labelLeft?n("div",{staticClass:"mu-checkbox-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("div",{staticClass:"mu-checkbox-icon"},[t.checkedIcon?t._e():n("svg",{staticClass:"mu-checkbox-icon-uncheck mu-checkbox-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}})]),t._v(" "),t.uncheckIcon?t._e():n("svg",{staticClass:"mu-checkbox-icon-checked mu-checkbox-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}})]),t._v(" "),t.uncheckIcon?n("icon",{staticClass:"mu-checkbox-icon-uncheck",class:t.iconClass,attrs:{value:t.uncheckIcon}}):t._e(),t._v(" "),t.checkedIcon?n("icon",{staticClass:"mu-checkbox-icon-checked",class:t.iconClass,attrs:{value:t.checkedIcon}}):t._e()],1),t._v(" "),t.label&&!t.labelLeft?n("div",{staticClass:"mu-checkbox-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e()]):t._e()],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-raised-button",class:t.buttonClass,style:t.buttonStyle,attrs:{type:t.type,href:t.href,target:t.target,to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,rippleColor:t.rippleColor,rippleOpacity:t.rippleOpacity,disabled:t.disabled,keyboardFocused:t.keyboardFocused,wrapperClass:"mu-raised-button-wrapper",centerRipple:!1},on:{KeyboardFocus:t.handleKeyboardFocus,hover:t.handleHover,hoverExit:t.handleHoverExit,click:t.handleClick}},[t.label&&"before"===t.labelPosition?n("span",{staticClass:"mu-raised-button-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("icon",{class:t.iconClass,attrs:{value:t.icon}}),t._v(" "),t._t("default"),t._v(" "),t.label&&"after"===t.labelPosition?n("span",{staticClass:"mu-raised-button-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-linear-progress",style:{height:t.size+"px","border-radius":(t.size?t.size/2:"")+"px"}},[n("div",{class:t.linearClass,style:t.linearStyle})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-tab-link",class:{"mu-tab-active":t.active},attrs:{href:t.href,to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,disabled:t.disabled,"center-ripple":!1},on:{click:t.tabClick}},[t._t("default",[n("icon",{class:t.iconClass,attrs:{value:t.icon}})]),t._v(" "),t.title?n("div",{staticClass:"mu-tab-text",class:t.textClass},[t._v(t._s(t.title))]):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("thead",{staticClass:"mu-thead"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("text-field",{ref:"textField",staticClass:"mu-select-field",attrs:{label:t.label,labelFloat:t.labelFloat,underlineShow:t.underlineShow,labelClass:t.labelClass,labelFocusClass:t.labelFocusClass,underlineClass:t.underlineClass,underlineFocusClass:t.underlineFocusClass,fullWidth:t.fullWidth,hintText:t.hintText,hintTextClass:t.hintTextClass,helpText:t.helpText,helpTextClass:t.helpTextClass,icon:t.icon,iconClass:t.iconClass,value:t.inputValue instanceof Array?t.inputValue.join(""):t.inputValue,disabled:t.disabled,errorText:t.errorText,errorColor:t.errorColor}},[n("input",{attrs:{type:"hidden",name:t.name},domProps:{value:t.inputValue instanceof Array?t.inputValue.join(""):t.inputValue}}),t._v(" "),n("dropDown-menu",{attrs:{anchorEl:t.anchorEl,scroller:t.scroller,value:t.inputValue,disabled:t.disabled,maxHeight:t.maxHeight,autoWidth:t.autoWidth,iconClass:t.dropDownIconClass,multiple:t.multiple,anchorOrigin:{vertical:"bottom",horizontal:"left"},separator:t.separator},on:{open:t.handleOpen,close:t.handleClose,change:t.handlehange}},[t._t("default")],2)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-card-actions"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"mu-overlay-fade"}},[t.show?n("div",{staticClass:"mu-overlay",style:t.overlayStyle,on:{click:t.handleClick,touchmove:t.prevent}}):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.fixedHeader?n("div",[n("table",{staticClass:"mu-table"},[t._t("header")],2)]):t._e(),t._v(" "),n("div",{style:t.bodyStyle},[n("table",{staticClass:"mu-table"},[t.fixedHeader?t._e():t._t("header"),t._v(" "),t._t("default"),t._v(" "),t.fixedFooter?t._e():t._t("footer")],2)]),t._v(" "),t.fixedFooter?n("div",[n("table",{staticClass:"mu-table"},[t._t("footer")],2)]):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-clock-hours"},[n("clock-pointer",{attrs:{hasSelected:"",value:t.getSelected(),type:"hour"}}),t._v(" "),t._l(t.hours,function(e){return n("clock-number",{key:e,attrs:{selected:t.getSelected()===e,type:"hour",value:e}})}),t._v(" "),n("div",{ref:"mask",staticClass:"mu-clock-hours-mask",on:{mouseup:t.handleUp,mousemove:t.handleMove,touchmove:t.handleTouchMove,touchend:t.handleTouchEnd}})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",{staticClass:"mu-clock-number",class:t.numberClass,style:t.numberStyle},[t._v(t._s(0===t.value?"00":t.value))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("transition",{attrs:{name:t.transition},on:{"after-enter":function(e){t.show()},"after-leave":function(e){t.hide()}}},[t.open?n("div",{ref:"popup",staticClass:"mu-popup",class:t.popupCss,style:{"z-index":t.zIndex}},[t._t("default")],2):t._e()])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"mu-switch",class:{"label-left":t.labelLeft,disabled:t.disabled,"no-label":!t.label},on:{mousedown:t.handleMouseDown,mouseleave:t.handleMouseLeave,mouseup:t.handleMouseUp,touchstart:t.handleTouchStart,touchend:t.handleTouchEnd,touchcancel:t.handleTouchEnd,click:function(e){e.stopPropagation(),t.handleClick(e)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.inputValue,expression:"inputValue"}],attrs:{type:"checkbox",disabled:t.disabled,name:t.name},domProps:{checked:Array.isArray(t.inputValue)?t._i(t.inputValue,null)>-1:t.inputValue},on:{change:t.handleChange,__c:function(e){var n=t.inputValue,i=e.target,r=!!i.checked;if(Array.isArray(n)){var a=null,o=t._i(n,a);r?o<0&&(t.inputValue=n.concat(a)):o>-1&&(t.inputValue=n.slice(0,o).concat(n.slice(o+1)))}else t.inputValue=r}}}),t._v(" "),n("div",{staticClass:"mu-switch-wrapper"},[t.label&&t.labelLeft?n("div",{staticClass:"mu-switch-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("div",{staticClass:"mu-switch-container"},[n("div",{staticClass:"mu-switch-track",class:t.trackClass}),t._v(" "),t.disabled?n("div",{staticClass:"mu-switch-thumb",class:t.thumbClass}):t._e(),t._v(" "),t.disabled?t._e():n("touch-ripple",{staticClass:"mu-switch-thumb",attrs:{rippleWrapperClass:"mu-switch-ripple-wrapper"}})],1),t._v(" "),t.label&&!t.labelLeft?n("div",{staticClass:"mu-switch-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e()])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-card-media"},[t._t("default"),t._v(" "),t.title||t.subTitle?n("div",{staticClass:"mu-card-media-title"},[t.title?n("div",{staticClass:"mu-card-title",class:t.titleClass},[t._v("\n      "+t._s(t.title)+"\n    ")]):t._e(),t._v(" "),t.subTitle?n("div",{staticClass:"mu-card-sub-title",class:t.subTitleClass},[t._v("\n      "+t._s(t.subTitle)+"\n    ")]):t._e()]):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-card-title-container"},[n("div",{staticClass:"mu-card-title",class:t.titleClass},[t._v("\n    "+t._s(t.title)+"\n  ")]),t._v(" "),n("div",{staticClass:"mu-card-sub-title",class:t.subTitleClass},[t._v("\n    "+t._s(t.subTitle)+"\n  ")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-tabs"},[t._t("default"),t._v(" "),n("span",{ref:"highlight",staticClass:"mu-tab-link-highlight",class:t.lineClass})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-step-connector"},[n("span",{staticClass:"mu-step-connector-line"})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("transition",{attrs:{name:"mu-dialog-slide"},on:{"after-enter":function(e){t.show()},"after-leave":function(e){t.hide()}}},[t.open?n("div",{ref:"popup",staticClass:"mu-dialog-wrapper",style:{"z-index":t.zIndex},on:{click:t.handleWrapperClick}},[n("div",{ref:"dialog",staticClass:"mu-dialog",class:t.dialogClass},[t.showTitle?n("h3",{ref:"title",staticClass:"mu-dialog-title",class:t.headerClass},[t._t("title",[t._v("\n            "+t._s(t.title)+"\n          ")])],2):t._e(),t._v(" "),n("div",{ref:"elBody",staticClass:"mu-dialog-body ",class:t.bodyClass,style:t.bodyStyle},[t._t("default")],2),t._v(" "),t.showFooter?n("div",{ref:"footer",staticClass:"mu-dialog-actions",class:t.footerClass},[t._t("actions")],2):t._e()])]):t._e()])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("hr",{staticClass:"mu-divider",class:{inset:t.inset,"shallow-inset":t.shallowInset}})},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:t.style},[n("div",{staticClass:"mu-grid-tile",class:t.tileClass},[t._t("default"),t._v(" "),n("div",{staticClass:"mu-grid-tile-titlebar",class:t.titleBarClass},[n("div",{staticClass:"mu-grid-tile-title-container"},[n("div",{staticClass:"mu-grid-tile-title"},[t._t("title",[t._v("\n            "+t._s(t.title)+"\n          ")])],2),t._v(" "),n("div",{staticClass:"mu-grid-tile-subtitle"},[t._t("subTitle",[t._v("\n            "+t._s(t.subTitle)+"\n          ")])],2)]),t._v(" "),n("div",{staticClass:"mu-grid-tile-action"},[t._t("action")],2)])],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-paper",class:t.paperClass},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[t.href?n("a",{class:t.linkClass,attrs:{href:t.href}},[t._t("default")],2):n("span",{class:t.currentClass},[t._t("default")],2),t._v(" "),t.href?n("span",{class:t.separatorClass},[t._v("\n    "+t._s(this.separator)+"\n  ")]):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-text-field",class:t.textFieldClass,style:t.isFocused?t.errorStyle:{}},[t.icon?n("icon",{staticClass:"mu-text-field-icon",class:t.iconClass,attrs:{value:t.icon}}):t._e(),t._v(" "),n("div",{ref:"content",staticClass:"mu-text-field-content",on:{click:t.handleLabelClick}},[t.label?n("text-field-label",{attrs:{float:t.float,focus:t.isFocused,normalClass:t.labelClass,focusClass:t.labelFocusClass}},[t._v(t._s(t.label))]):t._e(),t._v(" "),t.hintText?n("text-field-hint",{class:t.hintTextClass,attrs:{text:t.hintText,show:t.showHint}}):t._e(),t._v(" "),t._t("default",[t.multiLine?t._e():n("input",{ref:"input",staticClass:"mu-text-field-input",class:t.inputClass,attrs:{name:t.name,type:t.type,disabled:t.disabled,max:t.max,min:t.min,required:t.required},domProps:{value:t.inputValue},on:{change:t.handleChange,focus:t.handleFocus,input:t.handleInput,blur:t.handleBlur}}),t._v(" "),t.multiLine?n("enhanced-textarea",{ref:"textarea",attrs:{name:t.name,normalClass:t.inputClass,value:t.inputValue,disabled:t.disabled,rows:t.rows,rowsMax:t.rowsMax},on:{change:t.handleChange,input:t.handleInput,focus:t.handleFocus,blur:t.handleBlur}}):t._e()]),t._v(" "),t.underlineShow?n("underline",{attrs:{error:!!t.errorText,disabled:t.disabled,errorColor:t.errorColor,focus:t.isFocused,normalClass:t.underlineClass,focusClass:t.underlineFocusClass}}):t._e(),t._v(" "),t.errorText||t.helpText||t.maxLength>0?n("div",{staticClass:"mu-text-field-help",class:t.helpTextClass,style:t.errorStyle},[n("div",[t._v("\n            "+t._s(t.errorText||t.helpText)+"\n        ")]),t._v(" "),t.maxLength>0?n("div",[t._v("\n            "+t._s(t.charLength)+"/"+t._s(t.maxLength)+"\n        ")]):t._e()]):t._e()],2)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-step-button",attrs:{centerRipple:!1,disabled:t.disabled},on:{click:t.handleClick}},[t.childrenInLabel?n("step-label",{attrs:{active:t.active,completed:t.completed,num:t.num,disabled:t.disabled}},[t._t("default"),t._v(" "),t._t("icon",null,{slot:"icon"})],2):t._e(),t._v(" "),t.childrenInLabel?t._e():t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-icon-button",attrs:{to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,type:t.type,href:t.href,target:t.target,disabled:t.disabled,keyboardFocused:t.keyboardFocused},on:{click:t.handleClick,hover:t.handleHover,hoverExit:t.handleHoverExit,keyboardFocus:t.handleKeyboardFocus}},[t._t("default",[n("icon",{class:t.iconClass,attrs:{value:t.icon}})]),t._v(" "),t.tooltip?n("tooltip",{attrs:{trigger:t.tooltipTrigger,verticalPosition:t.verticalPosition,horizontalPosition:t.horizontalPosition,show:t.tooltipShown,label:t.tooltip,touch:t.touch}}):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-infinite-scroll"},[n("circular",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],attrs:{size:24}}),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"mu-infinite-scroll-text"},[t._v(t._s(t.loadingText))])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-focus-ripple-wrapper"},[n("div",{ref:"innerCircle",staticClass:"mu-focus-ripple",style:t.style})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-picker"},[t._l(t.slots,function(e,i){return n("picker-slot",{key:i,attrs:{divider:e.divider,content:e.content,"text-align":e.textAlign,width:e.width,value:t.values[i],values:e.values,"visible-item-count":t.visibleItemCount},on:{change:function(e){t.change(i,arguments)}}})}),t._v(" "),n("div",{staticClass:"mu-picker-center-highlight"})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-date-picker",class:{fullWidth:t.fullWidth}},[n("text-field",{attrs:{value:t.inputValue,disabled:t.disabled,fullWidth:t.fullWidth,label:t.label,labelFloat:t.labelFloat,labelClass:t.labelClass,labelFocusClass:t.labelFocusClass,hintText:t.hintText,hintTextClass:t.hintTextClass,helpText:t.helpText,helpTextClass:t.helpTextClass,errorText:t.errorText,errorColor:t.errorColor,icon:t.icon,iconClass:t.iconClass,inputClass:t.inputClass,underlineShow:t.underlineShow,underlineClass:t.underlineClass,underlineFocusClass:t.underlineFocusClass},on:{focus:t.handleFocus,labelClick:t.handleClick}}),t._v(" "),t.disabled?t._e():n("date-picker-dialog",{ref:"dialog",attrs:{initialDate:t.dialogDate,mode:t.mode,maxDate:t.maxLimitDate,minDate:t.minLimitDate,shouldDisableDate:t.shouldDisableDate,firstDayOfWeek:t.firstDayOfWeek,container:t.container,disableYearSelection:t.disableYearSelection,dateTimeFormat:t.dateTimeFormat,autoOk:t.autoOk,okLabel:t.okLabel,cancelLabel:t.cancelLabel},on:{monthChange:t.handleMonthChange,yearChange:t.handleYearChange,accept:t.handleAccept,dismiss:t.dismiss}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-content-block"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-flexbox",class:{"mu-flex-col":"vertical"===t.orient,"mu-flex-row":"horizontal"===t.orient},style:t.styles},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-circular-progress",style:{width:t.size+"px",height:t.size+"px"}},["indeterminate"===t.mode?n("circular",{attrs:{size:t.size,color:t.color,borderWidth:t.strokeWidth}}):t._e(),t._v(" "),"determinate"===t.mode?n("svg",{staticClass:"mu-circular-progress-determinate",style:t.circularSvgStyle,attrs:{viewBox:"0 0 "+t.size+" "+t.size}},[n("circle",{staticClass:"mu-circular-progress-determinate-path",style:t.circularPathStyle,attrs:{r:t.radius,cx:t.size/2,cy:t.size/2,fill:"none","stroke-miterlimit":"20","stroke-width":t.strokeWidth}})]):t._e()],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-circle-wrapper active",style:{width:t.size+"px",height:t.size+"px"}},[n("div",{staticClass:"mu-circle-spinner active",class:{"mu-circle-secondary":t.secondary},style:t.spinnerStyle},[n("div",{staticClass:"mu-circle-clipper left"},[n("div",{staticClass:"mu-circle",style:{"border-width":t.borderWidth+"px"}})]),t._v(" "),t._m(0),t._v(" "),n("div",{staticClass:"mu-circle-clipper right"},[n("div",{staticClass:"mu-circle",style:{"border-width":t.borderWidth+"px"}})])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-circle-gap-patch"},[n("div",{staticClass:"mu-circle"})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("transition",{attrs:{name:"mu-bottom-sheet"},on:{"after-enter":function(e){t.show()},"after-leave":function(e){t.hide()}}},[t.open?n("div",{ref:"popup",staticClass:"mu-bottom-sheet",class:t.sheetClass,style:{"z-index":t.zIndex}},[t._t("default")],2):t._e()])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-date-display",class:t.displayClass},[n("div",{staticClass:"mu-date-display-year",class:{disabled:t.disableYearSelection},on:{click:t.handleSelectYear}},t._l(t.displayDates,function(e,i){return n("transition",{key:i,attrs:{name:"mu-date-display-"+t.slideType}},[n("div",{key:e.getFullYear(),staticClass:"mu-date-display-slideIn-wrapper"},[n("div",{staticClass:"mu-date-display-year-title"},[t._v("\n          "+t._s(e.getFullYear())+"\n        ")])])])})),t._v(" "),n("div",{staticClass:"mu-date-display-monthday",on:{click:t.handleSelectMonth}},t._l(t.displayDates,function(e,i){return n("transition",{key:i,attrs:{name:"mu-date-display-"+t.slideType}},[n("div",{key:t.dateTimeFormat.formatDisplay(e),staticClass:"mu-date-display-slideIn-wrapper"},[n("div",{staticClass:"mu-date-display-monthday-title"},[t._v("\n          "+t._s(t.dateTimeFormat.formatDisplay(e))+"\n        ")])])])}))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-list"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.backShow?n("div",{staticClass:"mu-back-up",style:t.propsStyle,on:{click:t.moveTop}},[t._t("default",[n("div",{staticClass:"mu-back-up-default"},[n("icon",{attrs:{value:"keyboard_arrow_up"}})],1)])],2):t._e()},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-calendar-toolbar"},[n("icon-button",{attrs:{disabled:!t.prevMonth},on:{click:function(e){e.stopPropagation(),t.prev(e)}}},[n("svg",{staticClass:"mu-calendar-svg-icon",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}})])]),t._v(" "),n("div",{staticClass:"mu-calendar-toolbar-title-wrapper"},t._l(t.displayDates,function(e,i){return n("transition",{key:i,attrs:{name:"mu-calendar-slide-"+t.slideType}},[n("div",{key:e.getTime(),staticClass:"mu-calendar-toolbar-title"},[t._v("\n        "+t._s(t.dateTimeFormat.formatMonth(e))+"\n      ")])])})),t._v(" "),n("icon-button",{attrs:{disabled:!t.nextMonth},on:{click:function(e){e.stopPropagation(),t.next(e)}}},[n("svg",{staticClass:"mu-calendar-svg-icon",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}})])])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"mu-toast"}},[n("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:t.clickOutSide,expression:"clickOutSide"}],staticClass:"mu-toast",style:{"z-index":t.zIndex}},[t._v("\n    "+t._s(t.message)+"\n  ")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"mu-snackbar"}},[n("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:t.clickOutSide,expression:"clickOutSide"}],staticClass:"mu-snackbar",style:{"z-index":t.zIndex}},[n("div",{staticClass:"mu-snackbar-message"},[t._v("\n      "+t._s(t.message)+"\n    ")]),t._v(" "),t.action?n("flat-button",{staticClass:"mu-snackbar-action",attrs:{color:t.actionColor,rippleColor:"#FFF",rippleOpacity:.3,secondary:"",label:t.action},on:{click:t.handleActionClick}}):t._e()],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-refresh-control",class:t.refreshClass,style:t.refreshStyle},[n("svg",{directives:[{name:"show",rawName:"v-show",value:!t.refreshing&&t.draging,expression:"!refreshing && draging"}],staticClass:"mu-refresh-svg-icon",style:t.circularStyle,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}})]),t._v(" "),n("circular",{directives:[{name:"show",rawName:"v-show",value:t.refreshing,expression:"refreshing"}],attrs:{size:24,"border-width":2}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("transition",{attrs:{name:"mu-popover"},on:{"after-enter":function(e){t.show()},"after-leave":function(e){t.hide()}}},[t.open?n("div",{ref:"popup",staticClass:"mu-popover",class:t.popoverClass,style:{"z-index":t.zIndex}},[t._t("default")],2):t._e()])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-card"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-float-button",class:[t.buttonClass],style:t.buttonStyle,attrs:{type:t.type,href:t.href,target:t.target,to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,disabled:t.disabled},on:{click:t.handleClick,keyboardFocus:t.handleKeyboardFocus,hover:t.handleHover,hoverExit:t.handleHoverExit}},[n("div",{staticClass:"mu-float-button-wrapper"},[t._t("default",[n("icon",{class:t.iconClass,attrs:{value:this.icon}})])],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-clock-minutes"},[n("clock-pointer",{attrs:{hasSelected:"",value:t.minutes.selected,hasSelected:t.minutes.hasSelected,type:"minute"}}),t._v(" "),t._l(t.minutes.numbers,function(t){return n("clock-number",{key:t.minute,attrs:{selected:t.isSelected,type:"minute",value:t.minute}})}),t._v(" "),n("div",{ref:"mask",staticClass:"mu-clock-minutes-mask",on:{mouseup:t.handleUp,mousemove:t.handleMove,touchmove:t.handleTouch,touchend:t.handleTouch}})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-calendar-year-container"},[n("div",{ref:"container",staticClass:"mu-calendar-year"},[n("div",{staticClass:"mu-calendar-year-list"},t._l(t.years,function(e){return n("year-button",{key:"yearButton"+e,attrs:{year:e,selected:e===t.selectedDate.getFullYear()},on:{click:function(n){t.handleClick(e)}}})}))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-flat-button",class:t.buttonClass,style:t.buttonStyle,attrs:{disabled:t.disabled,keyboardFocused:t.keyboardFocused,wrapperClass:"mu-flat-button-wrapper",type:t.type,href:t.href,target:t.target,to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,rippleColor:t.rippleColor,rippleOpacity:t.rippleOpacity,centerRipple:!1},on:{click:t.handleClick,keyboardFocus:t.handleKeyboardFocus,hover:t.handleHover,hoverExit:t.handleHoverExit}},[t.label&&"before"===t.labelPosition?n("span",{staticClass:"mu-flat-button-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("icon",{class:t.iconClass,attrs:{value:t.icon}}),t._v(" "),t._t("default"),t._v(" "),t.label&&"after"===t.labelPosition?n("span",{staticClass:"mu-flat-button-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-flexbox-item",style:t.itemStyle},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-grid-list",style:t.gridListStyle},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",{key:t.rowId,staticClass:"mu-tr",class:t.className,on:{click:t.handleClick,mouseenter:t.handleHover,mouseleave:t.handleExit}},[t.isTh&&t.showCheckbox?n("mu-th",{staticClass:"mu-checkbox-col"},[n("checkbox",{attrs:{value:t.isSelectAll&&t.enableSelectAll,disabled:!t.enableSelectAll||!t.multiSelectable},on:{change:t.handleSelectAllChange}})],1):t._e(),t._v(" "),t.isTb&&t.showCheckbox?n("mu-td",{staticClass:"mu-checkbox-col"},[n("checkbox",{ref:"checkLabel",attrs:{disabled:!t.selectable||!t.$parent.selectable,value:t.isSelected},on:{change:t.handleCheckboxChange},nativeOn:{click:function(e){t.handleCheckboxClick(e)}}})],1):t._e(),t._v(" "),t.isTf&&t.showCheckbox?n("mu-td",{staticClass:"mu-checkbox-col"}):t._e(),t._v(" "),t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("th",{staticClass:"mu-th",on:{mouseenter:t.showTooltip,mouseleave:t.hideTooltip}},[n("div",{ref:"wrapper",staticClass:"mu-th-wrapper"},[t._t("default"),t._v(" "),t.tooltip?n("tooltip",{attrs:{trigger:t.tooltipTrigger,verticalPosition:t.verticalPosition,horizontalPosition:t.horizontalPosition,show:t.tooltipShown,label:t.tooltip,touch:t.touch}}):t._e()],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-text-field-multiline"},[n("textarea",{ref:"textareaHidden",staticClass:"mu-text-field-textarea-hide mu-text-field-input",attrs:{rows:"1"},domProps:{value:t.value}}),t._v(" "),n("textarea",{ref:"textarea",staticClass:"mu-text-field-input mu-text-field-textarea",class:t.normalClass,attrs:{name:t.name,placeholder:t.placeholder,disabled:t.disabled,required:t.required},domProps:{value:t.value},on:{change:t.handleChange,input:t.handleInput,focus:t.handleFocus,blur:t.handleBlur}})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("td",{staticClass:"mu-td",on:{mouseenter:t.handleMouseEnter,mouseleave:t.handleMouseLeave,click:t.handleClick}},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("tfoot",{staticClass:"mu-tfoot"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"mu-step-label",class:{active:t.active,completed:t.completed,disabled:t.disabled}},[t.num||t.$slots.icon&&t.$slots.length>0?n("span",{staticClass:"mu-step-label-icon-container"},[t._t("icon",[t.completed?n("svg",{staticClass:"mu-step-label-icon",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}})]):t._e(),t._v(" "),t.completed?t._e():n("div",{staticClass:"mu-step-label-circle"},[t._v("\n        "+t._s(t.num)+"\n      ")])])],2):t._e(),t._v(" "),t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"mu-ripple"}},[n("div",{staticClass:"mu-circle-ripple",style:t.styles})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-text-field-hint",class:{show:t.show}},[t._v("\n  "+t._s(t.text)+"\n")])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-slider",class:t.sliderClass,attrs:{tabindex:"0"},on:{focus:t.handleFocus,blur:t.handleBlur,keydown:t.handleKeydown,touchstart:t.handleTouchStart,touchend:t.handleTouchEnd,touchcancel:t.handleTouchEnd,mousedown:t.handleMouseDown,mouseup:t.handleMouseUp,mouseenter:t.handleMouseEnter,mouseleave:t.handleMouseLeave}},[n("input",{attrs:{type:"hidden",name:t.name},domProps:{value:t.inputValue}}),t._v(" "),n("div",{staticClass:"mu-slider-track"}),t._v(" "),n("div",{staticClass:"mu-slider-fill",style:t.fillStyle}),t._v(" "),n("div",{staticClass:"mu-slider-thumb",style:t.thumbStyle},[!t.focused&&!t.hover||t.active?t._e():n("focus-ripple")],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-chip",class:t.classNames,style:t.style,on:{mouseenter:t.onMouseenter,mouseup:t.onMouseup,mousedown:t.onMousedown,mouseleave:t.onMouseleave,touchstart:t.onTouchstart,click:t.handleClick,touchend:t.onTouchend,touchcancel:t.onTouchend}},[t._t("default"),t._v(" "),t.showDelete&&!t.disabled?n("svg",{staticClass:"mu-chip-delete-icon",class:t.deleteIconClass,attrs:{viewBox:"0 0 24 24"},on:{click:function(e){e.stopPropagation(),t.handleDelete(e)}}},[n("path",{attrs:{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}})]):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("abstract-button",{staticClass:"mu-item-wrapper",style:t.disabled?t.itemStyle:{},attrs:{containerElement:"div",href:t.href,disabled:t.disabled,disableFocusRipple:t.disableRipple,disableTouchRipple:t.disableRipple,target:t.target,to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,wrapperStyle:t.itemStyle,centerRipple:!1},on:{click:t.handleClick,keyboardFocus:t.handleKeyboardFocus,hover:t.handleHover,hoverExit:t.handleHoverExit}},[n("div",{class:t.itemClass},[t.showLeft?n("div",{staticClass:"mu-item-left"},[t._t("left"),t._v(" "),t._t("leftAvatar")],2):t._e(),t._v(" "),n("div",{staticClass:"mu-item-content"},[t.showTitleRow?n("div",{staticClass:"mu-item-title-row"},[n("div",{staticClass:"mu-item-title",class:t.titleClass},[t._t("title",[t._v("\n               "+t._s(t.title)+"\n             ")])],2),t._v(" "),n("div",{staticClass:"mu-item-after",class:t.afterTextClass},[t._t("after",[t._v("\n                "+t._s(t.afterText)+"\n              ")])],2)]):t._e(),t._v(" "),t.showDescribe?n("div",{staticClass:"mu-item-text",class:t.describeTextClass,style:t.textStyle},[t._t("describe",[t._v("\n            "+t._s(t.describeText)+"\n          ")])],2):t._e(),t._v(" "),t._t("default")],2),t._v(" "),t.showRight?n("div",{staticClass:"mu-item-right"},[t.toggleNested?n("icon-button",{on:{click:function(e){e.stopPropagation(),t.handleToggleNested(e)}},nativeOn:{mousedown:function(e){t.stop(e)},touchstart:function(e){t.stop(e)}}},[t.nestedOpen?n("svg",{staticClass:"mu-item-svg-icon",class:t.toggleIconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M6 15L12 9L18 15"}})]):t._e(),t._v(" "),t.nestedOpen?t._e():n("svg",{staticClass:"mu-item-svg-icon",class:t.toggleIconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M6 9L12 15L18 9"}})])]):t._e(),t._v(" "),t._t("right"),t._v(" "),t._t("rightAvatar")],2):t._e()])]),t._v(" "),n("expand-transition",[t.showNested?n("mu-list",{class:t.nestedListClass,attrs:{nestedLevel:t.nestedLevel,value:t.nestedSelectValue},on:{change:t.handleNestedChange}},[t._t("nested")],2):t._e()],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-card-text"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(68),r=n.n(i),a=n(41),o=n.n(a),s=n(139),l=(n.n(s),n(1)),u=n(2),c=n(103),d=n(104),f=n(107),h=n(100),p=n(24),m=n(23),v=n(127),y=n(116),g=n(111),b=n(122),x=n(132),C=n(113),_=n(128),S=n(120),w=n(102),k=n(135),$=n(66),O=n(105),T=n(108),M=n(109),D=n(69),F=n.n(D),E=n(39),P=n(138),A=n(130),j=n(125),B=n(25),R=n(106),I=n(11),L=n(119),z=n(65),N=n(114),H=n(124),W=n(40),V=n(17),Y=n(67),K=n(63),G=n(126),X=n(133),U=n(129),q=n(121),Z=n(110),J=n(118),Q=n(134),tt=n(112),et=n(137),nt=n(131),it=n(101),rt=n(123),at=n(136),ot=n(117),st=n(115),lt=n(64);n.d(e,"config",function(){return lt.a}),n.d(e,"install",function(){return ct});var ut=o()({icon:u.a,backTop:c.a,badge:d.a},f,{appBar:h.a,iconButton:p.a,flatButton:m.a,raisedButton:v.a,floatButton:y.a,contentBlock:g.a},b,{subHeader:x.a,divider:C.a,refreshControl:_.a,infiniteScroll:S.a,avatar:w.a},k,{paper:$.a},O,T,{chip:M.a,overlay:F.a,dialog:E.a,toast:P.a,snackbar:A.a,popup:j.a},B,{bottomSheet:R.a,popover:I.a,iconMenu:L.a,dropDownMenu:z.a,drawer:N.a,picker:H.a,tooltip:W.a,textField:V.a,selectField:Y.a,checkbox:K.a,radio:G.a,_switch:X.a,slider:U.a},at,{linearProgress:q.a,circularProgress:Z.a},J,Q,{datePicker:tt.a,timePicker:et.a},nt,{autoComplete:it.a},ot,st,{pagination:rt.a}),ct=function(t){r()(ut).forEach(function(e){t.component(ut[e].name,ut[e])}),n.i(l.a)()};"undefined"!=typeof window&&window.Vue&&ct(window.Vue),e.default={config:lt.a,install:ct}}])});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export Store */
/* unused harmony export install */
/* unused harmony export mapState */
/* unused harmony export mapMutations */
/* unused harmony export mapGetters */
/* unused harmony export mapActions */
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (process.env.NODE_ENV !== 'production') {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    process.env.NODE_ENV !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (process.env.NODE_ENV !== 'production') {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["a"] = (index_esm);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_header_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_60057e16_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_header_vue__ = __webpack_require__(19);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(15)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_header_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_60057e16_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_header_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\header.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60057e16", Component.options)
  } else {
    hotAPI.reload("data-v-60057e16", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("9ef0b504", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-60057e16\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./header.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-60057e16\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./header.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
	data:function(){
		return {
			bool:false,
			txt:"",
		}
	},
	methods:{
		isSearch:function(){
			this.bool = !this.bool;
		},
	}
});


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      {
        staticClass: "zu-top",
        class: { "is-searching": _vm.bool },
        attrs: { role: "navigation", "data-za-module": "TopNavBar" }
      },
      [
        _c(
          "div",
          {
            staticClass: "zg-wrap modal-shifting clearfix",
            attrs: { id: "zh-top-inner" }
          },
          [
            _c(
              "a",
              {
                staticClass: "zu-top-link-logo",
                attrs: {
                  href: "/",
                  id: "zh-top-link-logo",
                  "data-za-c": "view_home",
                  "data-za-a": "visit_home",
                  "data-za-l": "top_navigation_zhihu_logo"
                }
              },
              [_vm._v("知乎")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "zu-top-add-question",
                attrs: { id: "zu-top-add-question" }
              },
              [_vm._v("提问")]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "zu-top-search",
                attrs: { role: "search", id: "zh-top-search" }
              },
              [
                _c(
                  "form",
                  {
                    staticClass: "zu-top-search-form",
                    attrs: {
                      method: "GET",
                      action: "/search",
                      id: "zh-top-search-form"
                    }
                  },
                  [
                    _c("input", {
                      attrs: { type: "hidden", name: "type", value: "content" }
                    }),
                    _vm._v(" "),
                    _c(
                      "label",
                      { staticClass: "hide-text", attrs: { for: "q" } },
                      [_vm._v("知乎搜索")]
                    ),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.txt,
                          expression: "txt"
                        }
                      ],
                      staticClass: "zu-top-search-input",
                      attrs: {
                        type: "text",
                        id: "q",
                        name: "q",
                        autocomplete: "off",
                        value: "",
                        maxlength: "100",
                        placeholder: "搜索你感兴趣的内容...",
                        role: "combobox",
                        "aria-autocomplete": "list"
                      },
                      domProps: { value: _vm.txt },
                      on: {
                        click: _vm.isSearch,
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.txt = $event.target.value
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm._m(0)
                  ]
                )
              ]
            )
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "zu-top-search-button", attrs: { type: "submit" } },
      [
        _c("span", { staticClass: "hide-text" }, [_vm._v("搜索")]),
        _c("span", { staticClass: "sprite-global-icon-magnifier-light" })
      ]
    )
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-60057e16", esExports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_nav_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_52ebf9eb_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_nav_vue__ = __webpack_require__(24);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(21)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_nav_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_52ebf9eb_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_nav_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\nav.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52ebf9eb", Component.options)
  } else {
    hotAPI.reload("data-v-52ebf9eb", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(22);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("123c898e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-52ebf9eb\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./nav.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-52ebf9eb\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./nav.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
	data: function() {
		return {
			arr1: [{
				id: 1,
				clas: "message",
				title: "消息",
				mes: "暂无新消息"
			}, {
				id: 2,
				clas: "user",
				title: "用户",
				mes: "有人关注你时会显示在这里"
			}, {
				id: 3,
				clas: "thanks",
				title: "感谢",
				mes: "你的答案收到赞同、感谢时会显示在这里"
			}],
			arr: [{
				id: 1,
			}, {
				id: 2,
			}, {
				id: 3
			}],
			tip: 1,
			ids: 1,
			bool: false,
			bol:false,
		}
	},
	methods: {
		isChange: function(id) {
			this.tip = id;
		},
		isOpen: function() {
			if(this.bol == false){
				this.bool = !this.bool;
			}
		},
		showStyle: function(id) {
			this.ids = id;
		},
		showBol:function(){
			this.bol = !this.bol;
			if(this.bol == true){
				this.bool = false;
			}
		},
		isFalse:function(){
			this.bol = false;
		}
	},
});


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "zu-top-nav", attrs: { id: "zg-top-nav" } }, [
    _c("ul", { staticClass: "zu-top-nav-ul zg-clear" }, [
      _c(
        "li",
        {
          staticClass: "zu-top-nav-li",
          class: { current: _vm.tip == _vm.arr[0] },
          attrs: { id: "zh-top-nav-home" },
          on: {
            click: function($event) {
              _vm.isChange(_vm.arr[0])
            }
          }
        },
        [
          _c(
            "a",
            {
              staticClass: "zu-top-nav-link",
              attrs: {
                href: "#/index",
                id: "zh-top-link-home",
                "data-za-c": "view_home",
                "data-za-a": "visit_home",
                "data-za-l": "top_navigation_home"
              }
            },
            [_vm._v("首页")]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "li",
        {
          staticClass: "top-nav-topic-selector zu-top-nav-li ",
          class: { current: _vm.tip == _vm.arr[1] },
          attrs: { id: "zh-top-nav-topic" },
          on: {
            click: function($event) {
              _vm.isChange(_vm.arr[1])
            }
          }
        },
        [
          _c(
            "a",
            {
              staticClass: "zu-top-nav-link",
              attrs: { href: "#/topic", id: "top-nav-dd-topic" }
            },
            [_vm._v("话题")]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "li",
        {
          staticClass: "zu-top-nav-li ",
          class: { current: _vm.tip == _vm.arr[2] },
          attrs: { id: "zh-top-nav-explore" },
          on: {
            click: function($event) {
              _vm.isChange(_vm.arr[2])
            }
          }
        },
        [
          _c(
            "a",
            { staticClass: "zu-top-nav-link", attrs: { href: "#/discover" } },
            [_vm._v("发现")]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "li",
        {
          staticClass: "top-nav-noti zu-top-nav-li ",
          on: {
            click: function($event) {
              _vm.isOpen()
            }
          }
        },
        [
          _c(
            "a",
            {
              staticClass: "zu-top-nav-link",
              class: { open: _vm.bool },
              attrs: {
                href: "#/message",
                id: "zh-top-nav-count-wrap",
                role: "button"
              }
            },
            [
              _c("span", { staticClass: "mobi-arrow" }),
              _vm._v("消息"),
              _c(
                "span",
                {
                  staticClass: "zu-top-nav-count zg-noti-number",
                  staticStyle: { display: "none" },
                  attrs: { id: "zh-top-nav-count" }
                },
                [_vm._v("0")]
              )
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "li",
        {
          staticClass: "zu-top-nav-li",
          on: {
            click: function($event) {
              _vm.showBol()
            }
          }
        },
        [
          _vm._m(0),
          _vm._v(" "),
          _c("span", {
            staticClass: "zu-top-nav-pm-count zg-noti-number",
            staticStyle: { visibility: "hidden" },
            attrs: { id: "zh-top-nav-pm-count", "data-count": "0" }
          })
        ]
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "zu-top-nav-live zu-noti7-popup zg-r5px no-hovercard",
        class: { open: _vm.bool },
        style: { display: _vm.bool ? "block" : "none" },
        attrs: { id: "zh-top-nav-live-new", role: "popup", tabindex: "0" }
      },
      [
        _c("div", { staticClass: "zu-top-nav-live-inner zg-r5px" }, [
          _c("div", { staticClass: "zu-top-live-icon" }, [_vm._v(" ")]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "zu-home-noti-inner",
              attrs: { id: "zh-top-nav-live-new-inner" }
            },
            [
              _c(
                "div",
                {
                  staticClass: "zm-noti7-popup-tab-container clearfix",
                  attrs: { tabindex: "0", role: "tablist" }
                },
                _vm._l(_vm.arr1, function(a) {
                  return _c(
                    "button",
                    {
                      staticClass: "zm-noti7-popup-tab-item message",
                      class: { current: _vm.ids == a.id },
                      attrs: { role: "tab" },
                      on: {
                        click: function($event) {
                          _vm.showStyle(a.id)
                        }
                      }
                    },
                    [
                      _c("span", { staticClass: "icon" }, [
                        _vm._v(_vm._s(a.title))
                      ])
                    ]
                  )
                })
              )
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "zm-noti7-frame-border top" }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "zm-noti7-frame" },
            _vm._l(_vm.arr1, function(a) {
              return _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.ids == a.id,
                      expression: "ids==a.id"
                    }
                  ],
                  staticClass: "zm-noti7-content",
                  class: a.clas
                },
                [
                  _c("div", { staticClass: "zm-noti7-content-inner" }, [
                    _c("div", { staticClass: "zm-noti7-content-body" }, [
                      _c("div", { staticClass: "zm-noti7-popup-empty" }, [
                        _vm._v(_vm._s(a.mes))
                      ])
                    ])
                  ])
                ]
              )
            })
          ),
          _vm._v(" "),
          _c("div", { staticClass: "zm-noti7-frame-border bottom" }),
          _vm._v(" "),
          _vm._m(1)
        ])
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "mobile-top-nav-popup mobile-top-nav-popup-profile",
        style: { display: _vm.bol ? "block" : "none" },
        attrs: { id: "mobile-top-nav-profile-popup" }
      },
      [
        _vm._m(2),
        _vm._v(" "),
        _c("button", {
          staticClass: "slide-up",
          on: {
            click: function($event) {
              _vm.isFalse()
            }
          }
        })
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      {
        staticClass: "zu-top-nav-link",
        attrs: { id: "js-top-nav-link-profile", href: "#/self" }
      },
      [_vm._v("\n\t\t\t\t\t我"), _c("span", { staticClass: "mobi-arrow" })]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "zm-noti7-popup-footer" }, [
      _c(
        "a",
        {
          staticClass: "zm-noti7-popup-footer-all zg-right",
          attrs: { href: "/notifications" }
        },
        [_vm._v("查看全部 »")]
      ),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "zm-noti7-popup-footer-set",
          attrs: { href: "/settings/notification", title: "通知设置" }
        },
        [_c("i", { staticClass: "zg-icon zg-icon-settings" })]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "ul",
      {
        staticClass: "top-nav-dropdown",
        attrs: { id: "top-nav-profile-dropdown" }
      },
      [
        _c("li", [
          _c("a", { attrs: { href: "/people/shan-nian-13" } }, [
            _c("i", { staticClass: "zg-icon zg-icon-dd-home" }),
            _vm._v("我的主页\n\t\t\t\t\t")
          ])
        ]),
        _vm._v(" "),
        _c("li", [
          _c("a", { attrs: { href: "/inbox" } }, [
            _c("i", { staticClass: "zg-icon zg-icon-dd-pm" }),
            _vm._v("私信\n\t\t\t\t\t\t"),
            _c("span", {
              staticClass: "zu-top-nav-pm-count zg-noti-number",
              staticStyle: { visibility: "hidden" },
              attrs: { id: "zh-top-nav-pm-count", "data-count": "0" }
            })
          ])
        ]),
        _vm._v(" "),
        _c("li", [
          _c("a", { attrs: { href: "/settings" } }, [
            _c("i", { staticClass: "zg-icon zg-icon-dd-settings" }),
            _vm._v("设置\n\t\t\t\t\t")
          ])
        ]),
        _vm._v(" "),
        _c("li", [
          _c("a", { attrs: { href: "/logout" } }, [
            _c("i", { staticClass: "zg-icon zg-icon-dd-logout" }),
            _vm._v("退出\n\t\t\t\t\t")
          ])
        ])
      ]
    )
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-52ebf9eb", esExports)
  }
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_4e94de1a_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__ = __webpack_require__(29);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(26)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_4e94de1a_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4e94de1a", Component.options)
  } else {
    hotAPI.reload("data-v-4e94de1a", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("93b70528", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4e94de1a\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4e94de1a\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports) {

//
//
//
//



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_vm._v("首页")])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-4e94de1a", esExports)
  }
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_topic_vue__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_topic_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_topic_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_d445e812_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_topic_vue__ = __webpack_require__(34);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(31)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_topic_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_d445e812_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_topic_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\topic.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d445e812", Component.options)
  } else {
    hotAPI.reload("data-v-d445e812", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("23c90827", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d445e812\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./topic.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d445e812\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./topic.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, exports) {

//
//
//
//



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_vm._v("话题")])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-d445e812", esExports)
  }
}

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_discover_vue__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_discover_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_discover_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_596d175e_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_discover_vue__ = __webpack_require__(39);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(36)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_discover_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_596d175e_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_discover_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\discover.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-596d175e", Component.options)
  } else {
    hotAPI.reload("data-v-596d175e", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(37);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("6a8ae710", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-596d175e\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./discover.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-596d175e\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./discover.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 38 */
/***/ (function(module, exports) {

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "zg-wrap zu-main clearfix ", attrs: { role: "main" } },
      [
        _c("div", { staticClass: "zu-main-content" }, [
          _c("div", { staticClass: "zu-main-content-inner" }, [
            _c("div", { attrs: { id: "zh-recommend" } }, [
              _c(
                "div",
                {
                  staticClass: "page-title",
                  attrs: { id: "zh-recommend-title" }
                },
                [
                  _c("i", { staticClass: "zg-icon zg-icon-feedlist" }),
                  _vm._v(" "),
                  _c("span", [_vm._v("编辑推荐")]),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass: "zg-link-gray zg-right",
                      attrs: {
                        href: "/explore/recommendations",
                        "data-za-c": "explore",
                        "data-za-a": "visit_explore_recommendations",
                        "data-za-l": "editor_recommendations_more"
                      }
                    },
                    [_c("span", [_vm._v("更多推荐 »")])]
                  )
                ]
              ),
              _vm._v(" "),
              _c("div", { attrs: { id: "zh-recommend-list" } }, [
                _c("div", { staticClass: "top-recommend-feed feed-item" }, [
                  _c("h2", [
                    _c(
                      "a",
                      {
                        staticClass: "question_link",
                        attrs: {
                          href: "/question/67902030/answer/257916208",
                          target: "_blank",
                          "data-id": "19389428",
                          "data-za-element-name": "Title"
                        }
                      },
                      [
                        _vm._v(
                          "\n机械的可靠性跟体型大小有关系吗？是越大越好，还是越小越好？\n"
                        )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "avatar" }, [
                    _c(
                      "a",
                      {
                        staticClass: "zm-item-link-avatar",
                        attrs: {
                          title: "蒋小坏",
                          "data-hovercard": "p$t$jiang-gui-ping-98",
                          target: "_blank",
                          href: "/people/jiang-gui-ping-98"
                        }
                      },
                      [
                        _c("img", {
                          staticClass: "zm-item-img-avatar",
                          attrs: {
                            src:
                              "https://pic1.zhimg.com/v2-c273177579c7d0e07d3ed5fdce2bc05c_m.jpg"
                          }
                        })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "feed-main" }, [
                    _c("div", { staticClass: "zm-item-answer-author-info" }, [
                      _c("span", { staticClass: "summary-wrapper" }, [
                        _c("span", { staticClass: "author-link-line" }, [
                          _c(
                            "a",
                            {
                              staticClass: "author-link",
                              attrs: {
                                "data-hovercard": "p$t$jiang-gui-ping-98",
                                target: "_blank",
                                href: "/people/jiang-gui-ping-98"
                              }
                            },
                            [_vm._v("蒋小坏")]
                          )
                        ]),
                        _c(
                          "span",
                          {
                            staticClass: "bio",
                            attrs: { title: "机械设计，非标自动化设计" }
                          },
                          [_vm._v("\n机械设计，非标自动化设计\n")]
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "zm-item-rich-text",
                        attrs: {
                          "data-resourceid": "19389428",
                          "data-action": "/answer/content"
                        }
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "zh-summary summary clearfix" },
                          [
                            _vm._v(
                              "\n\n\t\t\t\t\t\t\t\t\t\t谢邀。机械产品的可靠性和很多因素有关系，但是和体积的大小并没有一个必然的联系，尤其不存在一个正比的关系，并不是说机械产品越大，起可靠性就越差，机械产品越小，起可靠性就越好，这种判断是很武断的，也没有任何根据。其实一个机械产品的可靠性可以从…\n\t\t\t\t\t\t\t\t\t"
                            )
                          ]
                        )
                      ]
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "recommend-feed feed-item" }, [
                  _c(
                    "span",
                    { staticClass: "zg-right zg-gray-normal feed-meta" },
                    [_vm._v("问答")]
                  ),
                  _vm._v(" "),
                  _c("h2", [
                    _c(
                      "a",
                      {
                        staticClass: "question_link",
                        attrs: {
                          href: "/question/67758233/answer/256849523",
                          target: "_blank",
                          "data-id": "19331751",
                          "data-za-element-name": "Title"
                        }
                      },
                      [
                        _vm._v(
                          "\n如何看待新闻《男子小学文化，冒充清华 MBA，应聘成功月薪 7 万》？\n"
                        )
                      ]
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "recommend-feed feed-item" }, [
                  _c(
                    "span",
                    { staticClass: "zg-right zg-gray-normal feed-meta" },
                    [_vm._v("Keep It Tight")]
                  ),
                  _vm._v(" "),
                  _c("h2", [
                    _c(
                      "a",
                      {
                        staticClass: "post-link",
                        attrs: {
                          target: "_blank",
                          href: "https://zhuanlan.zhihu.com/p/30906334",
                          "data-za-element-name": "Title"
                        }
                      },
                      [
                        _vm._v(
                          "解决方案、设计、好设计，Apple UI 设计中的 Tuning"
                        )
                      ]
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "recommend-feed feed-item" }, [
                  _c(
                    "span",
                    { staticClass: "zg-right zg-gray-normal feed-meta" },
                    [_vm._v("问答")]
                  ),
                  _vm._v(" "),
                  _c("h2", [
                    _c(
                      "a",
                      {
                        staticClass: "question_link",
                        attrs: {
                          href: "/question/27541793/answer/42710217",
                          target: "_blank",
                          "data-id": "3199527",
                          "data-za-element-name": "Title"
                        }
                      },
                      [_vm._v("\n如何锻炼手臂肌肉？\n")]
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "recommend-feed feed-item" }, [
                  _c(
                    "span",
                    { staticClass: "zg-right zg-gray-normal feed-meta" },
                    [_vm._v("智能投顾-理财魔方")]
                  ),
                  _vm._v(" "),
                  _c("h2", [
                    _c(
                      "a",
                      {
                        staticClass: "post-link",
                        attrs: {
                          target: "_blank",
                          href: "https://zhuanlan.zhihu.com/p/30859177",
                          "data-za-element-name": "Title"
                        }
                      },
                      [_vm._v("按照基金公司规模选基金靠谱吗？")]
                    )
                  ])
                ])
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "explore-tab", attrs: { id: "js-explore-tab" } },
              [
                _c("a", {
                  staticClass: "zg-anchor-hidden",
                  attrs: { name: "daily-hot" }
                }),
                _vm._v(" "),
                _c("a", {
                  staticClass: "zg-anchor-hidden",
                  attrs: { name: "monthly-hot" }
                }),
                _vm._v(" "),
                _c("ul", { staticClass: "tab-navs clearfix" }, [
                  _c("li", { staticClass: "tab-nav" }, [
                    _c(
                      "a",
                      {
                        staticClass: "anchor",
                        attrs: {
                          href: "#daily-hot",
                          "data-za-c": "explore",
                          "data-za-a": "visit_explore_daily_trendings",
                          "data-za-l": "explore_daily_trendings"
                        }
                      },
                      [_vm._v("今日最热")]
                    )
                  ]),
                  _vm._v(" "),
                  _c("li", { staticClass: "tab-nav" }, [
                    _c(
                      "a",
                      {
                        staticClass: "anchor",
                        attrs: {
                          href: "#monthly-hot",
                          "data-za-c": "explore",
                          "data-za-a": "visit_explore_monthly_trendings",
                          "data-za-l": "explore_monthly_trendings"
                        }
                      },
                      [_vm._v("本月最热")]
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "tab-panel" }, [
                  _c(
                    "div",
                    {
                      attrs: { "data-type": "daily", "data-zop-feedlist": "" }
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "explore-feed feed-item",
                          attrs: { "data-offset": "1" }
                        },
                        [
                          _c("h2", [
                            _c(
                              "a",
                              {
                                staticClass: "question_link",
                                attrs: {
                                  href: "/question/41802175/answer/256519794",
                                  target: "_blank",
                                  "data-id": "8928286",
                                  "data-za-element-name": "Title"
                                }
                              },
                              [_vm._v("\n有哪些心碎的小故事？\n")]
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "zm-item-answer ",
                              attrs: {
                                tabindex: "-1",
                                itemscope: "",
                                itemtype: "http://schema.org/Answer",
                                "data-aid": "76709120",
                                "data-atoken": "256519794",
                                "data-collapsed": "0",
                                "data-created": "1510062712",
                                "data-deleted": "0",
                                "data-isowner": "0",
                                "data-helpful": "1",
                                "data-copyable": "1",
                                "data-zop": ""
                              }
                            },
                            [
                              _c("link", {
                                attrs: {
                                  itemprop: "url",
                                  href: "/question/41802175/answer/256519794"
                                }
                              }),
                              _vm._v(" "),
                              _c("meta", {
                                attrs: {
                                  itemprop: "answer-id",
                                  content: "76709120"
                                }
                              }),
                              _vm._v(" "),
                              _c("meta", {
                                attrs: {
                                  itemprop: "answer-url-token",
                                  content: "256519794"
                                }
                              }),
                              _vm._v(" "),
                              _c("a", {
                                staticClass: "zg-anchor-hidden",
                                attrs: { name: "answer-76709120" }
                              }),
                              _vm._v(" "),
                              _c("div", { staticClass: "answer-head" }, [
                                _c(
                                  "div",
                                  { staticClass: "zm-item-answer-author-info" },
                                  [
                                    _c(
                                      "span",
                                      { staticClass: "summary-wrapper" },
                                      [
                                        _c(
                                          "span",
                                          { staticClass: "author-link-line" },
                                          [
                                            _c(
                                              "a",
                                              {
                                                staticClass: "author-link",
                                                attrs: {
                                                  "data-hovercard":
                                                    "p$t$xiao-ding-90-87",
                                                  target: "_blank",
                                                  href:
                                                    "/people/xiao-ding-90-87"
                                                }
                                              },
                                              [_vm._v("洛奇")]
                                            )
                                          ]
                                        ),
                                        _c(
                                          "span",
                                          {
                                            staticClass: "bio",
                                            attrs: {
                                              title: "律师，心理咨询师，"
                                            }
                                          },
                                          [_vm._v("\n律师，心理咨询师，\n")]
                                        )
                                      ]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "zm-item-vote-info",
                                    attrs: { "data-votecount": "6812" }
                                  },
                                  [
                                    _c("span", { staticClass: "voters text" }, [
                                      _c(
                                        "a",
                                        {
                                          staticClass: "more text",
                                          attrs: { href: "#" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            { staticClass: "js-voteCount" },
                                            [_vm._v("6812")]
                                          ),
                                          _vm._v(" 人赞同")
                                        ]
                                      )
                                    ])
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "zm-item-rich-text expandable js-collapse-body",
                                  attrs: {
                                    "data-resourceid": "8928286",
                                    "data-action": "/answer/content",
                                    "data-author-name": "洛奇",
                                    "data-entry-url":
                                      "/question/41802175/answer/256519794"
                                  }
                                },
                                [
                                  _c(
                                    "textarea",
                                    {
                                      staticClass: "content",
                                      attrs: { hidden: "" }
                                    },
                                    [
                                      _vm._v(
                                        "高中室友，很小的时候因为意外从右眼射进一颗流弹，几次手术后保下了命，右眼失明，脑部神经受损，右手几乎拿不起任何东西，连笔都握不住。<br>高二，这个室友的爷爷过世了，他爸爸给班主任打电话请了假，让他回家参加葬礼。他在寝室里一边收拾东西一边说：“干嘛叫我回去，本来就跟不上学习进度，这下不知道又要耽误多少课程”。我们几个人听到他这么说，觉得这个人怎么这样，自己的亲爷爷去世，都不愿意回家看一眼，于是我们几个人都开始指责他：“你亲爷爷去世都不愿意回家，你做人太差劲了，百善孝为先，连人都不会做，学习好有屁用。”<br>他什么都没说，收拾好东西后就回了家。有一次，他把班级的篮球借给了别的同学，那个同学弄丢了，他不敢去跟别人要，那个同学也压根就没有想过赔给他，他只能跟他爸爸说，他爸爸偷着跑到学校，给他200块钱，他买了一个新篮球放在班级里。下了晚自习，我们寝室的六个人一起去餐厅吃夜宵，他说起这件事，我们几个都很诧异，他爸爸来学校看他，怎么偷偷摸摸的？他说他妈妈自从有了他弟弟以后，就不怎么管他，对他很苛刻，他在外读初中三年，他妈妈没有过来看他一次，他的生活费还没有他读小学的弟弟多，所以他爸爸就只能偷偷跑到学校给他一些零花钱，这些事情是他爷俩的秘密，不敢让他妈妈知道。打开了话匣子后，他说，你们知道为什么我爷爷去世我都不愿意回家看一眼吗？因为我眼睛受伤后，当地医院救治不了，当时要么去大医院要么只能等死，我爷爷是第一个说放弃我的，我爸妈也要放弃我的时候，是我大伯急眼了，把我转到了省医院，我才活了下来。出院后回到家，我爷爷就再也没有让我坐在饭桌上吃过饭，从来都是我妈把饭做好后，把饭菜盛在一个碗里，我端着碗去一边吃。我爸很孝顺，不会因为这种事去惹爷爷不开心，我妈每天也看我不顺眼，所以我初中时就在学校住了。我爷爷虽然去世了，但我还是恨他，我那时还是个不到10岁的孩子，我已经看不清这个世界了，我也开始看不清人心。<br>我们几个人听他说完这番话，没有说什么。第二天，我们把那个弄丢篮球却不赔的学生堵在厕所狠狠地打了一顿，即使因为打架我们几个人被罚，但我从来都没后悔去做这件事。"
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass: "zh-summary summary clearfix"
                                    },
                                    [
                                      _vm._v(
                                        "\n\n\t\t\t\t\t\t\t\t\t\t\t高中室友，很小的时候因为意外从右眼射进一颗流弹，几次手术后保下了命，右眼失明，脑部神经受损，右手几乎拿不起任何东西，连笔都握不住。 高二，这个室友的爷爷过世了，他爸爸给班主任打电话请了假，让他回家参加葬礼。他在寝室里一边收拾东西一边说：“…\n\n\t\t\t\t\t\t\t\t\t\t\t"
                                      ),
                                      _c(
                                        "a",
                                        {
                                          staticClass: "toggle-expand",
                                          attrs: {
                                            href:
                                              "/question/41802175/answer/256519794"
                                          }
                                        },
                                        [_vm._v("显示全部")]
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("p", { staticClass: "visible-expanded" }, [
                                    _c(
                                      "a",
                                      {
                                        staticClass:
                                          "answer-date-link meta-item",
                                        attrs: {
                                          itemprop: "url",
                                          "data-tooltip":
                                            "s$t$发布于 2017-11-07",
                                          target: "_blank",
                                          href:
                                            "/question/41802175/answer/256519794"
                                        }
                                      },
                                      [_vm._v("编辑于 2017-11-07")]
                                    )
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "zm-item-meta answer-actions clearfix js-contentActions"
                                },
                                [
                                  _c("div", { staticClass: "zm-meta-panel" }, [
                                    _c(
                                      "a",
                                      {
                                        staticClass:
                                          "meta-item votenum-mobile zm-item-vote-count  js-openVoteDialog",
                                        attrs: { href: "#" }
                                      },
                                      [
                                        _c(
                                          "span",
                                          {
                                            attrs: { "data-bind-votecount": "" }
                                          },
                                          [_vm._v("6812")]
                                        ),
                                        _c("i", {
                                          staticClass: "arrow zg-icon"
                                        })
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "zm-votebar" }, [
                                      _c("button", { staticClass: "up " }, [
                                        _c("i", {
                                          staticClass: "icon vote-arrow"
                                        }),
                                        _vm._v(" "),
                                        _c("span", { staticClass: "count" }, [
                                          _vm._v("6812")
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          { staticClass: "label sr-only" },
                                          [_vm._v("赞同")]
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c("button", { staticClass: "down " }, [
                                        _c("i", {
                                          staticClass: "icon vote-arrow"
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          { staticClass: "label sr-only" },
                                          [_vm._v("反对")]
                                        )
                                      ])
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "a",
                                      {
                                        staticClass:
                                          "follow-link zg-follow meta-item",
                                        attrs: {
                                          "data-follow": "q:link",
                                          href: "javascript:;",
                                          id: "sfb-8928286"
                                        }
                                      },
                                      [
                                        _c("i", {
                                          staticClass: "z-icon-follow"
                                        }),
                                        _vm._v("关注问题")
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "a",
                                      {
                                        staticClass:
                                          "meta-item toggle-comment js-toggleCommentBox",
                                        attrs: { href: "#", name: "addcomment" }
                                      },
                                      [
                                        _c("i", {
                                          staticClass: "z-icon-comment"
                                        }),
                                        _vm._v("430 条评论")
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "a",
                                      {
                                        staticClass:
                                          "meta-item zu-autohide js-thank",
                                        attrs: {
                                          href: "#",
                                          "data-thanked": "false"
                                        }
                                      },
                                      [
                                        _c("i", {
                                          staticClass: "z-icon-thank"
                                        }),
                                        _vm._v("感谢")
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "phone-actions" },
                                      [
                                        _c(
                                          "a",
                                          {
                                            staticClass:
                                              "menubutton more-actions meta-item zu-autohide",
                                            attrs: { href: "#" }
                                          },
                                          [
                                            _c("i", {
                                              staticClass:
                                                "zg-icon zg-icon-ellipsis-mobi"
                                            }),
                                            _c(
                                              "span",
                                              { staticClass: "hide-text" },
                                              [_vm._v("更多")]
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "menu goog-menu goog-menu-vertical zh-answer-more-actions",
                                            staticStyle: { display: "none" }
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "goog-menuitem js-share"
                                              },
                                              [_vm._v("分享")]
                                            ),
                                            _vm._v(" "),
                                            _c("div", {
                                              staticClass: "goog-menuseparator"
                                            }),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "goog-menuitem js-collect"
                                              },
                                              [_vm._v("收藏")]
                                            ),
                                            _vm._v(" "),
                                            _c("div", {
                                              staticClass: "goog-menuseparator"
                                            }),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "goog-menuitem js-noHelp"
                                              },
                                              [_vm._v("没有帮助")]
                                            ),
                                            _vm._v(" "),
                                            _c("div", {
                                              staticClass: "goog-menuseparator"
                                            }),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "goog-menuitem js-report"
                                              },
                                              [_vm._v("举报")]
                                            )
                                          ]
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("meta", {
                                      attrs: {
                                        name: "copyrightStatus",
                                        content: "1"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("meta", {
                                      attrs: {
                                        name: "disableCopyAvatar",
                                        content: ""
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("span", { staticClass: "zg-bull" }, [
                                      _vm._v("•")
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "a",
                                      {
                                        staticClass: "meta-item copyright",
                                        attrs: {
                                          href: "/terms#sec-licence-1",
                                          target: "_blank"
                                        }
                                      },
                                      [
                                        _vm._v(
                                          "\n\t\t\t\t\t\t\t\t\t\t\t\t作者保留权利\n\t\t\t\t\t\t\t\t\t\t\t"
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "meta-item item-collapse js-collapse"
                                      },
                                      [
                                        _c("i", { staticClass: "z-icon-fold" }),
                                        _vm._v("收起\n")
                                      ]
                                    )
                                  ])
                                ]
                              )
                            ]
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "explore-feed feed-item",
                          attrs: { "data-offset": "2" }
                        },
                        [
                          _c("h2", [
                            _c(
                              "a",
                              {
                                staticClass: "question_link",
                                attrs: {
                                  href: "/question/28228801/answer/256697776",
                                  target: "_blank",
                                  "data-id": "3474063",
                                  "data-za-element-name": "Title"
                                }
                              },
                              [_vm._v("\n男人拥有家庭是什么感觉？\n")]
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "zm-item-answer ",
                              attrs: {
                                tabindex: "-1",
                                itemscope: "",
                                itemtype: "http://schema.org/Answer",
                                "data-aid": "76741591",
                                "data-atoken": "256697776",
                                "data-collapsed": "0",
                                "data-created": "1510107056",
                                "data-deleted": "0",
                                "data-isowner": "0",
                                "data-helpful": "1",
                                "data-copyable": "0",
                                "data-zop": ""
                              }
                            },
                            [
                              _c("link", {
                                attrs: {
                                  itemprop: "url",
                                  href: "/question/28228801/answer/256697776"
                                }
                              }),
                              _vm._v(" "),
                              _c("meta", {
                                attrs: {
                                  itemprop: "answer-id",
                                  content: "76741591"
                                }
                              }),
                              _vm._v(" "),
                              _c("meta", {
                                attrs: {
                                  itemprop: "answer-url-token",
                                  content: "256697776"
                                }
                              }),
                              _vm._v(" "),
                              _c("a", {
                                staticClass: "zg-anchor-hidden",
                                attrs: { name: "answer-76741591" }
                              }),
                              _vm._v(" "),
                              _c("div", { staticClass: "answer-head" }, [
                                _c(
                                  "div",
                                  { staticClass: "zm-item-answer-author-info" },
                                  [
                                    _c(
                                      "span",
                                      { staticClass: "summary-wrapper" },
                                      [
                                        _c(
                                          "span",
                                          { staticClass: "author-link-line" },
                                          [
                                            _c(
                                              "a",
                                              {
                                                staticClass: "author-link",
                                                attrs: {
                                                  "data-hovercard":
                                                    "p$t$yun-xiao-duo-84",
                                                  target: "_blank",
                                                  href:
                                                    "/people/yun-xiao-duo-84"
                                                }
                                              },
                                              [_vm._v("云小朵")]
                                            )
                                          ]
                                        ),
                                        _c(
                                          "span",
                                          {
                                            staticClass: "bio",
                                            attrs: { title: "好姑娘永垂不朽" }
                                          },
                                          [_vm._v("\n好姑娘永垂不朽\n")]
                                        )
                                      ]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "zm-item-vote-info",
                                    attrs: { "data-votecount": "4239" }
                                  },
                                  [
                                    _c("span", { staticClass: "voters text" }, [
                                      _c(
                                        "a",
                                        {
                                          staticClass: "more text",
                                          attrs: { href: "#" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            { staticClass: "js-voteCount" },
                                            [_vm._v("4239")]
                                          ),
                                          _vm._v(" 人赞同")
                                        ]
                                      )
                                    ])
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "zm-item-rich-text expandable js-collapse-body",
                                  attrs: {
                                    "data-resourceid": "3474063",
                                    "data-action": "/answer/content",
                                    "data-author-name": "云小朵",
                                    "data-entry-url":
                                      "/question/28228801/answer/256697776"
                                  }
                                },
                                [
                                  _c(
                                    "textarea",
                                    {
                                      staticClass: "content",
                                      attrs: { hidden: "" }
                                    },
                                    [
                                      _vm._v(
                                        "描述一下我老公的变化吧<br>刚结婚的时候，跟恋爱没什么两样，还是甜蜜的二人世界，逛吃逛吃浪浪浪<br>从知道怀孕到孕中期的时候，知道自己要当爸爸了，也看着我肚子慢慢大起来，比以前更疼我了，有一种模模糊糊的责任感，知道要当爸爸，可是不知道怎么当好一个爸爸，还有一种反正还早呢没啥关系先不用考虑这么多的淡定。<br>孕晚期的时候，开始焦虑，有一回把头埋在我的胸前，喃喃地说，老婆，我要当爸爸了，好紧张<br>生产的时候，他全程陪产，从破水开始到孩子出生，他一直陪着我。阵痛的时候他无计可施，只能苍白无力安慰我，生小孩的时候，进入产房的他，是懵逼的。<br>坐月子的时候，对我各种照顾，协调我和婆婆的关系，争取顺遂我的心意让我保持好情绪。一有空就趴在他女儿面前瞅他女儿，美滋滋的，还总是给他女儿拍很多照片，一天都能拍好多。晚上换尿布的时候，一喊就起来，毫无怨言，屁颠屁颠去准备换尿布。总是跟我臭美他女儿好看可爱，随他。真不要脸，哈哈<br><br>现在还没出月子，不知道以后的他会是一个什么状态。就从已经经历过的事情来看，他结婚有了家庭之后，幸福感更高了，更专心为家庭打拼着。他是一个很温柔耐心又善良的人，是我心目中最好最好的男人，希望在婚姻里，我能给他幸福的家庭生活，让他想到家庭的时候能发自内心笑起来，就像他给我的幸福一样。"
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass: "zh-summary summary clearfix"
                                    },
                                    [
                                      _vm._v(
                                        "\n\n\t\t\t\t\t\t\t\t\t\t\t描述一下我老公的变化吧 刚结婚的时候，跟恋爱没什么两样，还是甜蜜的二人世界，逛吃逛吃浪浪浪 从知道怀孕到孕中期的时候，知道自己要当爸爸了，也看着我肚子慢慢大起来，比以前更疼我了，有一种模模糊糊的责任感，知道要当爸爸，可是不知道怎么当好一个爸…\n\n\t\t\t\t\t\t\t\t\t\t\t"
                                      ),
                                      _c(
                                        "a",
                                        {
                                          staticClass: "toggle-expand",
                                          attrs: {
                                            href:
                                              "/question/28228801/answer/256697776"
                                          }
                                        },
                                        [_vm._v("显示全部")]
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("p", { staticClass: "visible-expanded" }, [
                                    _c(
                                      "a",
                                      {
                                        staticClass:
                                          "answer-date-link meta-item",
                                        attrs: {
                                          itemprop: "url",
                                          "data-tooltip":
                                            "s$t$发布于 2017-11-08",
                                          target: "_blank",
                                          href:
                                            "/question/28228801/answer/256697776"
                                        }
                                      },
                                      [_vm._v("编辑于 昨天 20:01")]
                                    )
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "zm-item-meta answer-actions clearfix js-contentActions"
                                },
                                [
                                  _c("div", { staticClass: "zm-meta-panel" }, [
                                    _c(
                                      "a",
                                      {
                                        staticClass:
                                          "meta-item votenum-mobile zm-item-vote-count  js-openVoteDialog",
                                        attrs: { href: "#" }
                                      },
                                      [
                                        _c(
                                          "span",
                                          {
                                            attrs: { "data-bind-votecount": "" }
                                          },
                                          [_vm._v("4239")]
                                        ),
                                        _c("i", {
                                          staticClass: "arrow zg-icon"
                                        })
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "zm-votebar" }, [
                                      _c("button", { staticClass: "up " }, [
                                        _c("i", {
                                          staticClass: "icon vote-arrow"
                                        }),
                                        _vm._v(" "),
                                        _c("span", { staticClass: "count" }, [
                                          _vm._v("4239")
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          { staticClass: "label sr-only" },
                                          [_vm._v("赞同")]
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c("button", { staticClass: "down " }, [
                                        _c("i", {
                                          staticClass: "icon vote-arrow"
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          { staticClass: "label sr-only" },
                                          [_vm._v("反对")]
                                        )
                                      ])
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "a",
                                      {
                                        staticClass:
                                          "follow-link zg-follow meta-item",
                                        attrs: {
                                          "data-follow": "q:link",
                                          href: "javascript:;",
                                          id: "sfb-3474063"
                                        }
                                      },
                                      [
                                        _c("i", {
                                          staticClass: "z-icon-follow"
                                        }),
                                        _vm._v("关注问题")
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "a",
                                      {
                                        staticClass:
                                          "meta-item toggle-comment js-toggleCommentBox",
                                        attrs: { href: "#", name: "addcomment" }
                                      },
                                      [
                                        _c("i", {
                                          staticClass: "z-icon-comment"
                                        }),
                                        _vm._v("421 条评论")
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "a",
                                      {
                                        staticClass:
                                          "meta-item zu-autohide js-thank",
                                        attrs: {
                                          href: "#",
                                          "data-thanked": "false"
                                        }
                                      },
                                      [
                                        _c("i", {
                                          staticClass: "z-icon-thank"
                                        }),
                                        _vm._v("感谢")
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "phone-actions" },
                                      [
                                        _c(
                                          "a",
                                          {
                                            staticClass:
                                              "menubutton more-actions meta-item zu-autohide",
                                            attrs: { href: "#" }
                                          },
                                          [
                                            _c("i", {
                                              staticClass:
                                                "zg-icon zg-icon-ellipsis-mobi"
                                            }),
                                            _c(
                                              "span",
                                              { staticClass: "hide-text" },
                                              [_vm._v("更多")]
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "menu goog-menu goog-menu-vertical zh-answer-more-actions",
                                            staticStyle: { display: "none" }
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "goog-menuitem js-share"
                                              },
                                              [_vm._v("分享")]
                                            ),
                                            _vm._v(" "),
                                            _c("div", {
                                              staticClass: "goog-menuseparator"
                                            }),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "goog-menuitem js-collect"
                                              },
                                              [_vm._v("收藏")]
                                            ),
                                            _vm._v(" "),
                                            _c("div", {
                                              staticClass: "goog-menuseparator"
                                            }),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "goog-menuitem js-noHelp"
                                              },
                                              [_vm._v("没有帮助")]
                                            ),
                                            _vm._v(" "),
                                            _c("div", {
                                              staticClass: "goog-menuseparator"
                                            }),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "goog-menuitem js-report"
                                              },
                                              [_vm._v("举报")]
                                            )
                                          ]
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("meta", {
                                      attrs: {
                                        name: "copyrightStatus",
                                        content: "0"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("meta", {
                                      attrs: {
                                        name: "disableCopyAvatar",
                                        content:
                                          "https://pic4.zhimg.com/v2-a59ff85b1f3be183bea10c86d343ec57_s.jpg"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("span", { staticClass: "zg-bull" }, [
                                      _vm._v("•")
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "a",
                                      {
                                        staticClass: "meta-item copyright",
                                        attrs: {
                                          href: "/terms#sec-licence-6",
                                          target: "_blank"
                                        }
                                      },
                                      [_vm._v("禁止转载")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "meta-item item-collapse js-collapse"
                                      },
                                      [
                                        _c("i", { staticClass: "z-icon-fold" }),
                                        _vm._v("收起\n")
                                      ]
                                    )
                                  ])
                                ]
                              )
                            ]
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "explore-feed feed-item",
                          attrs: { "data-offset": "3" }
                        },
                        [
                          _c("h2", [
                            _c(
                              "a",
                              {
                                staticClass: "question_link",
                                attrs: {
                                  href: "/question/38062057/answer/256496884",
                                  target: "_blank",
                                  "data-id": "7432062",
                                  "data-za-element-name": "Title"
                                }
                              },
                              [
                                _vm._v(
                                  "\n《武林外传》有哪些隐喻/伏笔/现实映射？\n"
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "zm-item-answer ",
                              attrs: {
                                tabindex: "-1",
                                itemscope: "",
                                itemtype: "http://schema.org/Answer",
                                "data-aid": "76704972",
                                "data-atoken": "256496884",
                                "data-collapsed": "0",
                                "data-created": "1510059506",
                                "data-deleted": "0",
                                "data-isowner": "0",
                                "data-helpful": "1",
                                "data-copyable": "0",
                                "data-zop": ""
                              }
                            },
                            [
                              _c("link", {
                                attrs: {
                                  itemprop: "url",
                                  href: "/question/38062057/answer/256496884"
                                }
                              }),
                              _vm._v(" "),
                              _c("meta", {
                                attrs: {
                                  itemprop: "answer-id",
                                  content: "76704972"
                                }
                              }),
                              _vm._v(" "),
                              _c("meta", {
                                attrs: {
                                  itemprop: "answer-url-token",
                                  content: "256496884"
                                }
                              }),
                              _vm._v(" "),
                              _c("a", {
                                staticClass: "zg-anchor-hidden",
                                attrs: { name: "answer-76704972" }
                              }),
                              _vm._v(" "),
                              _c("div", { staticClass: "answer-head" }, [
                                _c(
                                  "div",
                                  { staticClass: "zm-item-answer-author-info" },
                                  [
                                    _c(
                                      "span",
                                      { staticClass: "summary-wrapper" },
                                      [
                                        _c(
                                          "span",
                                          { staticClass: "author-link-line" },
                                          [
                                            _c(
                                              "a",
                                              {
                                                staticClass: "author-link",
                                                attrs: {
                                                  "data-hovercard":
                                                    "p$t$nan-gong-wan-ning",
                                                  target: "_blank",
                                                  href:
                                                    "/people/nan-gong-wan-ning"
                                                }
                                              },
                                              [_vm._v("王铁芽儿")]
                                            )
                                          ]
                                        ),
                                        _c(
                                          "span",
                                          {
                                            staticClass: "bio",
                                            attrs: { title: "玉楼金阙慵归去" }
                                          },
                                          [_vm._v("\n玉楼金阙慵归去\n")]
                                        )
                                      ]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "zm-item-vote-info",
                                    attrs: { "data-votecount": "4518" }
                                  },
                                  [
                                    _c("span", { staticClass: "voters text" }, [
                                      _c(
                                        "a",
                                        {
                                          staticClass: "more text",
                                          attrs: { href: "#" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            { staticClass: "js-voteCount" },
                                            [_vm._v("4518")]
                                          ),
                                          _vm._v(" 人赞同")
                                        ]
                                      )
                                    ])
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "zm-item-rich-text expandable js-collapse-body",
                                  attrs: {
                                    "data-resourceid": "7432062",
                                    "data-action": "/answer/content",
                                    "data-author-name": "王铁芽儿",
                                    "data-entry-url":
                                      "/question/38062057/answer/256496884"
                                  }
                                },
                                [
                                  _c(
                                    "textarea",
                                    {
                                      staticClass: "content",
                                      attrs: { hidden: "" }
                                    },
                                    [
                                      _vm._v(
                                        '你们听说过白眼狼吗？就是喂不熟还会捅刀子的那种？<br><br>武林外传里，小六给大家的印象是，一个胖乎乎没心眼儿的憨直的小捕头，因为多次误喝蒙汗药，看起来甚至有点疯癫癫傻乎乎的。因为运气，从一个乡下送亲的唢呐小弟一路升至六扇门总部。<br>其实嘛。。。。。。<br>有一集，小贝为了补贴家用，上山采蘑菇，可能因为童年没有读过少儿大百科全书，所以没有认出毒菌子，后来菌子被做成小鸡炖蘑菇被钱夫人吃下装死讹诈同福客栈。<br>在钱夫人诈死后，小六和老邢过来，小六说要抬尸体，老邢反对<img data-rawheight="480" src="https://pic3.zhimg.com/v2-810f52226e8e8baa547ed5f8768c725e_b.jpg" data-rawwidth="768" class="origin_image zh-lightbox-thumb" width="768" data-original="https://pic3.zhimg.com/v2-810f52226e8e8baa547ed5f8768c725e_r.jpg"><br><img data-rawheight="447" src="https://pic4.zhimg.com/v2-0420fc9f720601e05843ec073b901ff7_b.jpg" data-rawwidth="640" class="origin_image zh-lightbox-thumb" width="640" data-original="https://pic4.zhimg.com/v2-0420fc9f720601e05843ec073b901ff7_r.jpg"><br>小六反驳说<img data-rawheight="480" src="https://pic3.zhimg.com/v2-35516072c5744b81cbc0ac3b3d082f82_b.jpg" data-rawwidth="768" class="origin_image zh-lightbox-thumb" width="768" data-original="https://pic3.zhimg.com/v2-35516072c5744b81cbc0ac3b3d082f82_r.jpg"><br>注意，老邢对于自己的行为，是做出了动机解释的，“为了保护犯罪现场”，但是小六没有动机，他让抬尸，只是随便下的命令，“先抬下来再说”。当被师父反驳后，也没有做出自己为什么要抬的解释。<br>他纯粹是为了反驳而反驳。<br>因为他要树立新官上任的威信，他要向自己，向客栈里所有人证明：<br><b>老邢已经下台了！老同志该靠边站了！现在我才是捕头，我说了算！</b><br><img data-rawheight="480" src="https://pic3.zhimg.com/v2-5ade7028d21346d45685764036133792_b.jpg" data-rawwidth="768" class="origin_image zh-lightbox-thumb" width="768" data-original="https://pic3.zhimg.com/v2-5ade7028d21346d45685764036133792_r.jpg"><br>一个让抬去，一个让回来，这段师徒二人抬杠使唤老白，说穿了就是：<br><b>“我倒要看看，你们到底听谁的！”</b><br><br>当发现小贝可能畏罪潜逃了，所有的人都忧心忡忡，客栈伙计是担心小贝；老邢也皱着眉头，嫌疑人失踪了，意味着案情变得棘手；小六和所有人相反，他放声大笑：<img data-rawheight="480" src="https://pic4.zhimg.com/v2-021b1a95eab86d5dbea9163b5bc6fb2f_b.jpg" data-rawwidth="768" class="origin_image zh-lightbox-thumb" width="768" data-original="https://pic4.zhimg.com/v2-021b1a95eab86d5dbea9163b5bc6fb2f_r.jpg"><br><img data-rawheight="480" src="https://pic3.zhimg.com/v2-f3990a672cff1abc242ba2f1a248eb4a_b.jpg" data-rawwidth="768" class="origin_image zh-lightbox-thumb" width="768" data-original="https://pic3.zhimg.com/v2-f3990a672cff1abc242ba2f1a248eb4a_r.jpg"><br>（为演员的颜艺爆灯！）<br><br>后来，小贝回来了，原来是去十八里铺请仵作（法医）验尸<img data-rawheight="480" src="https://pic4.zhimg.com/v2-54922e6c500bdd7fae6621b6f7cb1acb_b.jpg" data-rawwidth="768" class="origin_image zh-lightbox-thumb" width="768" data-original="https://pic4.zhimg.com/v2-54922e6c500bdd7fae6621b6f7cb1acb_r.jpg"><br>对于外援，客栈里的人表示好奇和恭敬，老邢诚恳殷切地表示配合工作，欢迎协助办案<img data-rawheight="480" src="https://pic3.zhimg.com/v2-853dc59aab0adc38b0cf96edd752b87e_b.jpg" data-rawwidth="768" class="origin_image zh-lightbox-thumb" width="768" data-original="https://pic3.zhimg.com/v2-853dc59aab0adc38b0cf96edd752b87e_r.jpg"><br>只有一个人，燕小六，他站在一旁，眼珠子一转（不得不夸一下演员的演技），他冷冷地说：<br><img data-rawheight="480" src="https://pic2.zhimg.com/v2-f0df0e8d4a986f5371e3a13dd70b00e9_b.jpg" data-rawwidth="768" class="origin_image zh-lightbox-thumb" width="768" data-original="https://pic2.zhimg.com/v2-f0df0e8d4a986f5371e3a13dd70b00e9_r.jpg"><br>甚至拔刀挡路，开始阻挠办案<img data-rawheight="480" src="https://pic3.zhimg.com/v2-e7c525e47ee448e6c2b5b0088fb98d26_b.jpg" data-rawwidth="768" class="origin_image zh-lightbox-thumb" width="768" data-original="https://pic3.zhimg.com/v2-e7c525e47ee448e6c2b5b0088fb98d26_r.jpg"><br>综上，小六根本就不在乎案情如何，不在乎犯罪嫌疑人能不能伏法，不在乎办案是不是能以最低成本解决，不在乎案子真相如何，<br><b>他在乎的，是他的个人政绩，在乎的是，对于老百姓而言，我作为现任官员是不是比前任说话管用，在乎的是，我七侠镇的案子，功劳不能让你十八里铺抢了去。</b>（真是似曾相识啊似曾相识）<br><br>再举一个栗子，老邢因为加入丐帮被降职后，佟掌柜还是叫邢捕头，小六脸唰就垮下来了，开始咳嗽示意<img data-rawheight="2048" src="https://pic2.zhimg.com/v2-4e9e5e3f263c7fe0fb11d2db5a5155d9_b.jpg" data-rawwidth="640" class="origin_image zh-lightbox-thumb" width="640" data-original="https://pic2.zhimg.com/v2-4e9e5e3f263c7fe0fb11d2db5a5155d9_r.jpg"><br>人民爱戴老邢同志，感谢老邢同志，我们不可否认，老邢同志为我镇的治安做出了伟大贡献，为衙门建立了不朽功勋，为我树立了很好的榜样，但是老同志已经下台了！说话不算数了！现在本镇的捕头只有一个，那就是我！（再一次的似曾相识啊似曾相识）<br><br>等到落座后，佟掌柜敬茶这一段小动作，非常经典（也非常令人寒心）（再次表扬演员演技）<img data-rawheight="1602" src="https://pic3.zhimg.com/v2-a119aae137a2d12c5afb4d2a391b2b0a_b.jpg" data-rawwidth="640" class="origin_image zh-lightbox-thumb" width="640" data-original="https://pic3.zhimg.com/v2-a119aae137a2d12c5afb4d2a391b2b0a_r.jpg"><br>佟的第一杯茶习惯性的先给老邢，小六不动声色的劈手夺过，老邢这个时候已经伸出手了，小六轻蔑的用眼角瞥了他一眼，然后把水倒在陶土碗里递给了老邢。<br><br>身份不同，待遇规格必须拉开差距！只有捕头我，才能用青花瓷，你一个下了台的老同志，还入过丐帮，要明白自己的身份地位，就用土陶碗吧！<br><br>小六常说的一句话是：“不许你们说我师父！”<br>不许别人说他，自己却在身体力行，亲自羞辱他。<br>老邢教育小六的时候，如果有外人在场，他一般都会给小六留面子的，除非在反复暗示下小六还不明白或者实在气急了。而小六，每次专门挑人多的地方，揭老邢的伤疤。<br>因为从现在起，你已经不是捕头了，我才是。<br>好一个小人得志，好一场世态炎凉。<br>（对比：诸葛孔方就当过大嘴一天的师父，大嘴能在人家病了以后跪在床前伺候。）<br><br>再举一个栗子。<br>秀才当了关中大侠后，朝廷赏银百两，秀才烧包嘚瑟的不行，捐银子给小六修公共设施。这个时候，小六的态度是这样的<img data-rawheight="801" src="https://pic4.zhimg.com/v2-a45b02dafbdc4d5c9bb52693ffbf9077_b.jpg" data-rawwidth="640" class="origin_image zh-lightbox-thumb" width="640" data-original="https://pic4.zhimg.com/v2-a45b02dafbdc4d5c9bb52693ffbf9077_r.jpg"><br>低眉顺眼，谦恭至极。<br>因为秀才花钱毫无规划大手大脚（剧透：这也是他和小郭在一起的原因之一，此处不展开讲），很快百两雪花银就花光了。然后小六的嘴脸就变成了这样<img data-rawheight="2048" src="https://pic4.zhimg.com/v2-139593a7ee3ea9eef2b360c0c5902c6f_b.jpg" data-rawwidth="525" class="origin_image zh-lightbox-thumb" width="525" data-original="https://pic4.zhimg.com/v2-139593a7ee3ea9eef2b360c0c5902c6f_r.jpg"><br>瞧瞧这理直气壮飞扬跋扈，完全不记得自己之前多么恭敬，更不记得秀才已经捐钱修了河堤书院饭馆茅房。<br>（为演员演技把灯爆烂嗷嗷嗷嗷嗷！）<br>什么叫<b>一斗米，养恩人；十斗米，养仇人</b>。电视机前的观众朋友们，你们看明白了没有。<br>你在生活中遇到过类似的事情没有？<br><br>最后，也是最讽刺的一点：老邢的履历是很漂亮的（当然他毛病也不少，蹭吃蹭喝，贪小便宜，打官腔装逼，多次咸猪手佟掌柜等等，<b>这里只说“履历漂亮”，不代表“人格完美作风无瑕”）</b>，辖区国泰民安，连两口子吵架都很少见，以捉拿盗神发家，先后抓住过美丽不打折，金银二老，上官云顿，信王墓被盗案等等大案钦犯，即使作为佟湘玉的备胎，佟在摊上事了后，也知道老邢是真敢按照大明律给她用刑的<img data-rawheight="1649" src="https://pic4.zhimg.com/v2-ad39bcb0b4989499f0e3e838208c6aff_b.jpg" data-rawwidth="640" class="origin_image zh-lightbox-thumb" width="640" data-original="https://pic4.zhimg.com/v2-ad39bcb0b4989499f0e3e838208c6aff_r.jpg"><br>这样一个公务员，最后<b>为了给衙门报销公账</b>而落难，行乞，撤职。更细思极恐的是，他差一点就变成了流寇手下的冤魂或者关东大饥荒中的一具饿殍。（说明：老邢作为国家公务员加入社会帮派下九流，被整是应该的，而且只是降职没有革职，更没有打板子罚俸禄，应该是进行了体谅，这个处分于理够公正，于情够意思。但问题是，老邢如果不出门帮公家要账，就不会落难，也就不会入丐帮。综上，老邢的处分背得应该但不值当。）<br><br>而燕小六：<b>不识字且不会武功</b>（这点还不如莫小贝）；<br><b>智商情商双低</b>，连通缉令格式都不会写，大明律第一章第一节都背不下来；<br><b>徇私舞弊</b>（给老白，佟掌柜，无双等等很多人开过后门）；<br><b>拿着鸡毛当令箭</b>（佟湘玉对小六说得最多一句话就是“你还让不让人做生意了”）；<br><b>窝里横</b>，在亲友团面前端着官架子总拔刀凶得一逼，却在面对反派邪恶大魔王时抖似筛糠刀都拿不稳；<br><b>钓鱼执法</b>（敲诈聘用无双）（手段已经很像地主恶霸强抢民女了）；<br><b>意气用事</b>（曾因为吃醋无双而恶意阻挠展侍卫办案拖后腿）；<br><b>成事不足败事有余</b>（所有人拼死拼活设计套包大仁，最后是小六说漏嘴了造成计划失败猪队友）（为了争一时冲动，毁了至关重要的曹公公收据，其他人掐死他的心都有了，他却还在嘴硬，猪队友×2）；<br><b>擅自放走逃狱犯人</b>（杨蕙兰可是知府特批的通缉犯）（因为杨的婆婆和知府老婆是闺蜜，所以编剧顺手讽刺了.........）（小六在这里情感上够仗义，但作为捕头，已经违背了程序正义）。<br><b>唯恐天下不乱</b>（“哈哈哈哈我终于遇到大案子啦”至于会不会有人员伤亡财产损失，他是不管的）<br>（“罄竹难书”这个词啥意思大家明白了吧）<br><br>综上，燕小六作为一个朋友算幽默好玩多才多艺，但作为一个捕快，资质实在不敢恭维。这么一个草包菜鸡战五渣，就因为他帮着给郭巨侠拍过马屁，直接就进了六扇门总部<img data-rawheight="447" src="https://pic2.zhimg.com/v2-1ce3b64bcafa9e65776881a3ccf39de5_b.jpg" data-rawwidth="640" class="origin_image zh-lightbox-thumb" width="640" data-original="https://pic2.zhimg.com/v2-1ce3b64bcafa9e65776881a3ccf39de5_r.jpg"><br>最最重点的是，在这一集，<b>他为了自己的前途，背叛出卖了同福客栈的每一个人</b>。<br>而在这里面，佟湘玉待他宠溺纵容犹如亲弟弟，小郭暗恋过他，大嘴让他蹭饭，老白帮他办了无数案件，秀才为他捐过银子上过课，无双是他的同事和暗恋对象。<br>小六爱不爱这些人？爱。但是当“爱”和他的个人利益冲突的时候，他毫不犹豫的选择了个人利益。<br>说到底，他最爱的还是只有他自己。<br>至于其他人，值几个钱。<br>好一招卖友求荣。<br>你的良心不会痛吗。<br>我理解人各有志。但这个选择，未免太过让人心寒了。<br><br><b>蝇营'
                                      )
                                    ]
                                  )
                                ]
                              )
                            ]
                          )
                        ]
                      )
                    ]
                  )
                ])
              ]
            )
          ])
        ])
      ]
    )
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-596d175e", esExports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(41);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(46)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!./index.css", function() {
			var newContent = require("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module

// exports


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAAAeCAMAAADUzjjfAAACHFBMVEXp6en////p6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enpgoUlAAAAs3RSTlMAAAECAwQFBgcICQoLDQ4PExQVFhgZGxwdHh8hIiMlJigpKissLS4wMTQ6Ozw9Pj9BQ0RFRktMTk9QUVJUVVZYWVpbXF1eYGFiY2RlZmdobG1ub3Byc3Z6e3x9fn+AgoWGh4mKjI2QkpWWmJmbnJ6foqOpqqusra+ws7S1tre4ubq9vr/AwcLDxMfIycrMzc7Q0tPU1dba3N3e3+Dj5ebn6err7O/w8fLz9PX3+Pn6+/z9/oerseUAAAQ7SURBVFjD5Zn5PxVRFMDv84Ss0YaI0F7ybG3aJFolCmWrRIuSUE+LJUlaRFJpJRGeZLz5B5uZN8udu8y8NzOfT59yfnpz75lzz3fuPefeex4AokQXNg1+Z5jxwabCaJuGAERs/7aIFA4nw8rCOB2Liz+2nUWkPVaXv2wqzxi/8u3sRc628/GAJGrFFXdnZ/pOBdIUvZakFwxMyTyN401kTrCYTGTqeF/BvX7EFH9caSc/0nytvw5/XvcPwaf+VWb5B1HMPs5C1hxLkLksTe+LhO93xAR/6ow0VJM2/xnZp7fBJvndKOUCAIlTLFGmE7W8v+5ZQHmG+f0/KEPt1uIPg/w7S+WvIU9ijXpoXAOAXpYivXTvi29Fdgs6M4b5d0AjtWjx74EUH1H5GTLDnC5/GksVB817LvafRD7mVS4Y5i9BopDKX6qvaIa/kc7fSPG+gu8UPkAlHn/68elpr4JXmhZ/BaTY7eP6/62//t/T+d+T+UWHeiJvnFHxdUCvdnA9z1TGniH8xVBfqxb/SUixicoPKKLLP0vnnyXyy/PRgAyA5BWAWEP406Guu4q/t0NQfgf8EWW9qOa/xF8pdxfr8Kvnvw/hPw0PZJf9ZYeSEP4yeLvyE9VyxliL+H1c/wp+FdDh145/GGtU8ZdlXflq/hOQ4mtp8pURzPL7lv8wfMP8ayaVY+hBdbDwMaAohr6ROz4lS5OPhZXh/d/hy/6H43u9/tH8B7bLFLvQZDGUDJ//lr2Qsnm8PPkYv+H9z5fzj4JfCfT5tfMfAIfFji6AKbvyYcVtYusVbPKt4E+c9vb8S8I3nP8ACPzmcXGtHj8YEBrHw/nf+8n8hvd/ALLJoZPtFb7h+OekTtB0Aoz/XYr6/uvJlbc9D8tbSPyG8x9//53E2yex++8eIr4Z/lxBsw7jV+c/Tg4IzfXS474xa/lBbAfa3InXP+qI+Mbzn3QFUB9+8f2Pk1pBcWSp9CwsAYv2P0FCVG2k+ld4QipDwjeR/xJG4XOUxD+cgtU/CsQAdYYBaAlYyb/S8/BzYWF88A6p/hn43JWRyxDwoQE6IbNduvkvplrOu83rNM6/EcdeyTa+lEQqS8DE/d9dfdGt4t8p/L5pp9ZTuKXqyjjE4PjG7n9B+T0LsJ8vz8WQ7z8bm9Xn8/mu42Gm77/TOdw24oL523jTZfR6kt8Ivymlp9bttVnBn/4Rc9T9IA3n9788T6hMXgoxxz+ygX9v02eFfzM3GcNbtepp5cKuHGdJ/RsUuIm+VmP89WSoh6bu/91iDEX1SPyB/eyXoiVaPGfX8x+gb6k1/GNkrN+hiFn7DFnRHWF0fO7lqxIoCLgm8p9r2Bmgbe/l9/XlX0uDrPn/I5x24F6NmI2gKa4yzP/rKOz7yTnWu3ry/YFym92q/3/8aFjBiFmvFb2We1vUzm9t9bme/r/9/2Vb3PIHn8r0PwZCBvMAAAAASUVORK5CYII="

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAA8CAYAAACpWK6VAAAKx0lEQVR42u1dD3AUZxXfuyYtCaSBJCQkFCxNq9MSweCfCdQySlMYHWWwI3ZGC1XsVI2k2o5TBkacQIaJsSgjTlEztMyUf0IU0IqkicYixJT/JBBI7kISwuXy5/7f7rd7ibTne7kN3O19l9u9v3uX+2bewHD77b79fvve99773nswjIwhCMICJ8f/muXIDY7na5nUSL4BwP6UJfyYkyNuJJ7nl6VWRZ3D7XbP5Fyucpbn18LfNbInwoSNEwAjOVjOmJOT83BqSeMKZjoI2yOEkM8DrWYJ+cG4tiXkCgjkx/fxEjbLk2S3uwAmEm+g++8M7IWfHkwtd8TB0zrd7jx2dLSEE4Rngb4NmvR1J8//Cuhd2DIbgdqBRnzBDExw3Rl50kxItXTyB2fOfAN+0qSgCQqcBmiWy+V6AqRvKUqekwgvo5SxHL8L6CCA1gTUBus8CKDclQOeErI7nK2ymAV10CVR246lS5fmTBGg0oCyWLc7H8B6jOPGFoNkPU2I66sobQDOjwC4LfBvbzoJeRuAOg7g/QeNVVHqIg6cUhoymQ4GV9ujo5/2mzhi+hv89NBUABqlLd5AhUtdXfoKOWp7m3TitWsdr0ZDbUf7hUMCmudfSGSQQaO4ampqHpXxRfM3o8ME30WIu1DtQMPIQw0WR6D+B1ul1eZgb1vt9mtmi/W/wyPmBuPwcH2/YeCd3tu3f6vr7qm+fuPGpittbRWtra0vNTU3P19ff3zl3r17n/7Zli0l8A6Zk6ttbuwz0X0RflMCAJ1RXFw8r0uv32azO7om23NRekRQ+kVQWobNlveNQ8PHDMbBd2/fMfwRgenu6XtTf6u3Rjr/1KlTq48ff2/lvn37ntmxY8eSNWvWFMPziyJA2mBG2M4of61/TgCgceRMLNry5csX1NbWfg6lZc+ePWVbt25fvH79+k/OnTv3EaUAUPgLdC1qvgKgfNQwIj+zgLKBMJaRBTRdlNxpov2UDpQG9EBQaxMMkaFoLrzN7vzXZECH+yVHEGi0R2aICx3suVJQckVQZkqAyaLw96BIEwBpo25tgr/3dT9gHM5u2suZbfbLPu4XRziZYOQkCNBS0B8QwfAGRBOu8Rkft4Lwx/zMdL3+F7QFtdhsbVI/WyYYudF8cVUsZAz4I2RsCXhHdRiAQR9f/uGFJ+Q55gseYdetW7eAdj1IeocEaIsagIkG0BhfRpcLFvWwk/Dn8E9BEObHiz92dPQp4IPzuRchJ6UejWzfGSzFneI+5TfsDqfOB2gna0pWoDlOWOdnbxC+B4Uj1vzBR5cBdtR1Cj+98Ft2sMnTMHTnPRH24EslJSXzAhkHdifXK5HowWQFGvdim5P7O+3gAKU9lvxhyJXmd7e0tKwMam17Au5eIFts5ysrK58SLUXqAGAHfILoLGdIYqAzMQgBWmuEEhfYGSv+QLOsp3kyGDwRrX7tpCctIM0dooXd06nT/RyDBfDT7MmsSifLmXytc7Y/iYHGkXv2bOt3KNL0MSGur0SbP9yXpcfGSCNmc3NmZmZR0ONjzEroNxi+W1dXt8zLMs4L5s+BRDslx2K6JAca1eIcDEH6gc0RE7imRdHiDzCajidj0rmoVV/btGnhZJpXOiaCAgWi8RXUP8TQn/dDrXZ7W5IDjWNaeXn5YxgWpYDdKCd9JxT+MPmAti+famxcLbqrsvx5rRhGS1Ng+WmkD7bY7OemANA4so8ePfYcLPSo9Fkcz/8k0vxJ7ad7+7KuG/flOUENsDD9ymnSB5tttuYpAjRKTz4uNEXKBNhLn4wUf5jwgPeUzhk2WxrEfTm6+QG4r0sfbjJb/zpFgMaRjgttsljP+qtw/k+R4o+WzoUG84YNGz4VKL4R4Zi4u5CSunJgCgGNY0ZNTc1nwSCyTTxrwGg82NTUlB1B/tLb2zteB6nmxev5Q0ePrlCyL4c1HA7HE1KGB4dH3ppiQONC5128fPmHeB597sKF7zOUQ5sw+cNTr6LD9fXPgiTfutLe/uOg/nJQK5rnvxntI0oxVAeP4r+QBEBPuFyFYnAJQZ4ZDIQQ+ENDuaisrOxRxnMcmh4yt7Dw8xCAmKXLgLuQJEDjyBAByIgif+miJGeGtziYthrbnKh+tQGNBqY0NpAshMfPHrWN+cjggCugjyg3+0jB/DFY2IfUJtEsEf6QnECTuntBAEZBFgcmvElv1tLy4YsK7jFHhapbW1FR8aTV7uhMNqC7u3sqpSFQWYQOu/RmmGrKKEv70ahwj565du3ax3v7+n4DVq5emoiRiGSzO3RVVVUhJUkwDifbIb1hY2NjkRqMpzDvp/X+6DEogid5kSQpf5G+v5TEd1FuxGHln/S4DP3IUM1+FVrdWtF/LWAik18darpvpCg/JL+bGx1d5BfnttjOh+rEq9y90kSaKPxpokwhBlYIqZAye2dg8G21+L1TJQs0+uFPljvsX7nXvVFU6+kpoJMA6PH9mRImbWhoWIx9MzAQgikvKaATHGhWEL7sV1nPcgaz1fpL76iX3LSaFNBqBZoSOaL11IB9/DLmOaWATkCgx6sVOGKSMmocGjpALSsl5D1U9SmgEwxojhNeokjzXTyi69TptlJjrBy/KwV0ggGN7Y8o/jMmBOIZbNHA0NCRAAH1V1JAJwh/HOdaRW2IotdvEwMlM/BgXFpKO5GWikZcCmiV8zee2kv48xQAx2p37fLOeJy1ffv2UgfL0rJULC6XqzgFtIr5g735ezRpHh4x/YPxzUTEcNvskydPfo12gA8q/H05Ly75mH7nd70gfFFJM50U0PKk+eFAeWTNp09/i/FPHh8vW8HMRdocWplpkPyybh9eiLBHbovEFNDK/Obf0xYPS2qZwNmOWOxV1H9nwL+8UxC+pAhoIFD5j3uam/KGGDerifjwtMP2zcqJP8g8/3ygxROzSSarEsjEs1BpgrvZbi9XCrST43Vx6koU+W1QEF6UAM3H+8ubD4xYaQs3YjZ/wHhKaoONbKz0w3Lae92BjcZVlOt8zk9LS0s/gY1vJtm37/YZDG9hsRsj7zxWHdrR7Z4NdorRJ/vDyRrixhCGLmlW9kTztH379z/DePpaBRvjCe5HjvylHCsMcL6+r29JMKCRsEse7flWh+P6iRMnVjHKDt6jKhCg+V5FgxU1IGxNK3ieLyNkrBRrsMTuvsvGm9tzZNi/hsr8z/iFOQlpCNhI1OM35yq4JRpnBRcuXXoF/endu3fLaequudHZ+Yb0A8Oue16pMdmMCtpJe8LCobfThPXcHA+mNcD0gUBMeVXwKT1zxusLsXRF7txDhw4t8o6+YftE5n5ajJoaw6d1dHSsCCUfHGu2qquri2P+ZYLRsz8QU9h0FLMjmdAr+DIYr8xPGWM6Rtk6bt7cLH5cSFmM+prCj5fQnrt48WVaeetkdPXqtUomFhWREl+Z2p8ajSJU17m5uXOZ8Cv4MpRIysKFC+cz99tspDHqHePuJFY5YtPXoJIMa9refv01xlPGo40ZlyDJb4DxdQE7/6E6QYMHo15X29s3enWazYspU56Blv10JjH+a4cJjVX079OnXxgYGjqMrTXRfcLOCBgWBq34Yfet3totVVWLmFBTcMMcWhHIQM1MZ8RpsRPt/+5IZ+Q3iM2MB4NZovQUipQvRr0y4yDFyTAwkISdfb3zwueIwpTFRLPnSGqkRmpMkfF/OAYoENI8B3EAAAAASUVORK5CYII="

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(47);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 47 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);