// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"node_modules/vanilla-picker/dist/vanilla-picker.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*!
 * vanilla-picker v2.12.1
 * https://vanilla-picker.js.org
 *
 * Copyright 2017-2021 Andreas Borgen (https://github.com/Sphinxxxx), Adam Brooks (https://github.com/dissimulate)
 * Released under the ISC license.
 */
var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
String.prototype.startsWith = String.prototype.startsWith || function (needle) {
  return this.indexOf(needle) === 0;
};
String.prototype.padStart = String.prototype.padStart || function (len, pad) {
  var str = this;
  while (str.length < len) {
    str = pad + str;
  }
  return str;
};
var colorNames = {
  cb: '0f8ff',
  tqw: 'aebd7',
  q: '-ffff',
  qmrn: '7fffd4',
  zr: '0ffff',
  bg: '5f5dc',
  bsq: 'e4c4',
  bck: '---',
  nch: 'ebcd',
  b: '--ff',
  bvt: '8a2be2',
  brwn: 'a52a2a',
  brw: 'deb887',
  ctb: '5f9ea0',
  hrt: '7fff-',
  chcT: 'd2691e',
  cr: '7f50',
  rnw: '6495ed',
  crns: '8dc',
  crms: 'dc143c',
  cn: '-ffff',
  Db: '--8b',
  Dcn: '-8b8b',
  Dgnr: 'b8860b',
  Dgr: 'a9a9a9',
  Dgrn: '-64-',
  Dkhk: 'bdb76b',
  Dmgn: '8b-8b',
  Dvgr: '556b2f',
  Drng: '8c-',
  Drch: '9932cc',
  Dr: '8b--',
  Dsmn: 'e9967a',
  Dsgr: '8fbc8f',
  DsTb: '483d8b',
  DsTg: '2f4f4f',
  Dtrq: '-ced1',
  Dvt: '94-d3',
  ppnk: '1493',
  pskb: '-bfff',
  mgr: '696969',
  grb: '1e90ff',
  rbrc: 'b22222',
  rwht: 'af0',
  stg: '228b22',
  chs: '-ff',
  gnsb: 'dcdcdc',
  st: '8f8ff',
  g: 'd7-',
  gnr: 'daa520',
  gr: '808080',
  grn: '-8-0',
  grnw: 'adff2f',
  hnw: '0fff0',
  htpn: '69b4',
  nnr: 'cd5c5c',
  ng: '4b-82',
  vr: '0',
  khk: '0e68c',
  vnr: 'e6e6fa',
  nrb: '0f5',
  wngr: '7cfc-',
  mnch: 'acd',
  Lb: 'add8e6',
  Lcr: '08080',
  Lcn: 'e0ffff',
  Lgnr: 'afad2',
  Lgr: 'd3d3d3',
  Lgrn: '90ee90',
  Lpnk: 'b6c1',
  Lsmn: 'a07a',
  Lsgr: '20b2aa',
  Lskb: '87cefa',
  LsTg: '778899',
  Lstb: 'b0c4de',
  Lw: 'e0',
  m: '-ff-',
  mgrn: '32cd32',
  nn: 'af0e6',
  mgnt: '-ff',
  mrn: '8--0',
  mqm: '66cdaa',
  mmb: '--cd',
  mmrc: 'ba55d3',
  mmpr: '9370db',
  msg: '3cb371',
  mmsT: '7b68ee',
  '': '-fa9a',
  mtr: '48d1cc',
  mmvt: 'c71585',
  mnLb: '191970',
  ntc: '5fffa',
  mstr: 'e4e1',
  mccs: 'e4b5',
  vjw: 'dead',
  nv: '--80',
  c: 'df5e6',
  v: '808-0',
  vrb: '6b8e23',
  rng: 'a5-',
  rngr: '45-',
  rch: 'da70d6',
  pgnr: 'eee8aa',
  pgrn: '98fb98',
  ptrq: 'afeeee',
  pvtr: 'db7093',
  ppwh: 'efd5',
  pchp: 'dab9',
  pr: 'cd853f',
  pnk: 'c0cb',
  pm: 'dda0dd',
  pwrb: 'b0e0e6',
  prp: '8-080',
  cc: '663399',
  r: '--',
  sbr: 'bc8f8f',
  rb: '4169e1',
  sbrw: '8b4513',
  smn: 'a8072',
  nbr: '4a460',
  sgrn: '2e8b57',
  ssh: '5ee',
  snn: 'a0522d',
  svr: 'c0c0c0',
  skb: '87ceeb',
  sTb: '6a5acd',
  sTgr: '708090',
  snw: 'afa',
  n: '-ff7f',
  stb: '4682b4',
  tn: 'd2b48c',
  t: '-8080',
  thst: 'd8bfd8',
  tmT: '6347',
  trqs: '40e0d0',
  vt: 'ee82ee',
  whT: '5deb3',
  wht: '',
  hts: '5f5f5',
  w: '-',
  wgrn: '9acd32'
};
function printNum(num) {
  var decs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var str = decs > 0 ? num.toFixed(decs).replace(/0+$/, '').replace(/\.$/, '') : num.toString();
  return str || '0';
}
var Color = function () {
  function Color(r, g, b, a) {
    classCallCheck(this, Color);
    var that = this;
    function parseString(input) {
      if (input.startsWith('hsl')) {
        var _input$match$map = input.match(/([\-\d\.e]+)/g).map(Number),
          _input$match$map2 = slicedToArray(_input$match$map, 4),
          h = _input$match$map2[0],
          s = _input$match$map2[1],
          l = _input$match$map2[2],
          _a = _input$match$map2[3];
        if (_a === undefined) {
          _a = 1;
        }
        h /= 360;
        s /= 100;
        l /= 100;
        that.hsla = [h, s, l, _a];
      } else if (input.startsWith('rgb')) {
        var _input$match$map3 = input.match(/([\-\d\.e]+)/g).map(Number),
          _input$match$map4 = slicedToArray(_input$match$map3, 4),
          _r = _input$match$map4[0],
          _g = _input$match$map4[1],
          _b = _input$match$map4[2],
          _a2 = _input$match$map4[3];
        if (_a2 === undefined) {
          _a2 = 1;
        }
        that.rgba = [_r, _g, _b, _a2];
      } else {
        if (input.startsWith('#')) {
          that.rgba = Color.hexToRgb(input);
        } else {
          that.rgba = Color.nameToRgb(input) || Color.hexToRgb(input);
        }
      }
    }
    if (r === undefined) ;else if (Array.isArray(r)) {
      this.rgba = r;
    } else if (b === undefined) {
      var color = r && '' + r;
      if (color) {
        parseString(color.toLowerCase());
      }
    } else {
      this.rgba = [r, g, b, a === undefined ? 1 : a];
    }
  }
  createClass(Color, [{
    key: 'printRGB',
    value: function printRGB(alpha) {
      var rgb = alpha ? this.rgba : this.rgba.slice(0, 3),
        vals = rgb.map(function (x, i) {
          return printNum(x, i === 3 ? 3 : 0);
        });
      return alpha ? 'rgba(' + vals + ')' : 'rgb(' + vals + ')';
    }
  }, {
    key: 'printHSL',
    value: function printHSL(alpha) {
      var mults = [360, 100, 100, 1],
        suff = ['', '%', '%', ''];
      var hsl = alpha ? this.hsla : this.hsla.slice(0, 3),
        vals = hsl.map(function (x, i) {
          return printNum(x * mults[i], i === 3 ? 3 : 1) + suff[i];
        });
      return alpha ? 'hsla(' + vals + ')' : 'hsl(' + vals + ')';
    }
  }, {
    key: 'printHex',
    value: function printHex(alpha) {
      var hex = this.hex;
      return alpha ? hex : hex.substring(0, 7);
    }
  }, {
    key: 'rgba',
    get: function get() {
      if (this._rgba) {
        return this._rgba;
      }
      if (!this._hsla) {
        throw new Error('No color is set');
      }
      return this._rgba = Color.hslToRgb(this._hsla);
    },
    set: function set(rgb) {
      if (rgb.length === 3) {
        rgb[3] = 1;
      }
      this._rgba = rgb;
      this._hsla = null;
    }
  }, {
    key: 'rgbString',
    get: function get() {
      return this.printRGB();
    }
  }, {
    key: 'rgbaString',
    get: function get() {
      return this.printRGB(true);
    }
  }, {
    key: 'hsla',
    get: function get() {
      if (this._hsla) {
        return this._hsla;
      }
      if (!this._rgba) {
        throw new Error('No color is set');
      }
      return this._hsla = Color.rgbToHsl(this._rgba);
    },
    set: function set(hsl) {
      if (hsl.length === 3) {
        hsl[3] = 1;
      }
      this._hsla = hsl;
      this._rgba = null;
    }
  }, {
    key: 'hslString',
    get: function get() {
      return this.printHSL();
    }
  }, {
    key: 'hslaString',
    get: function get() {
      return this.printHSL(true);
    }
  }, {
    key: 'hex',
    get: function get() {
      var rgb = this.rgba,
        hex = rgb.map(function (x, i) {
          return i < 3 ? x.toString(16) : Math.round(x * 255).toString(16);
        });
      return '#' + hex.map(function (x) {
        return x.padStart(2, '0');
      }).join('');
    },
    set: function set(hex) {
      this.rgba = Color.hexToRgb(hex);
    }
  }], [{
    key: 'hexToRgb',
    value: function hexToRgb(input) {
      var hex = (input.startsWith('#') ? input.slice(1) : input).replace(/^(\w{3})$/, '$1F').replace(/^(\w)(\w)(\w)(\w)$/, '$1$1$2$2$3$3$4$4').replace(/^(\w{6})$/, '$1FF');
      if (!hex.match(/^([0-9a-fA-F]{8})$/)) {
        throw new Error('Unknown hex color; ' + input);
      }
      var rgba = hex.match(/^(\w\w)(\w\w)(\w\w)(\w\w)$/).slice(1).map(function (x) {
        return parseInt(x, 16);
      });
      rgba[3] = rgba[3] / 255;
      return rgba;
    }
  }, {
    key: 'nameToRgb',
    value: function nameToRgb(input) {
      var hash = input.toLowerCase().replace('at', 'T').replace(/[aeiouyldf]/g, '').replace('ght', 'L').replace('rk', 'D').slice(-5, 4),
        hex = colorNames[hash];
      return hex === undefined ? hex : Color.hexToRgb(hex.replace(/\-/g, '00').padStart(6, 'f'));
    }
  }, {
    key: 'rgbToHsl',
    value: function rgbToHsl(_ref) {
      var _ref2 = slicedToArray(_ref, 4),
        r = _ref2[0],
        g = _ref2[1],
        b = _ref2[2],
        a = _ref2[3];
      r /= 255;
      g /= 255;
      b /= 255;
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h = void 0,
        s = void 0,
        l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return [h, s, l, a];
    }
  }, {
    key: 'hslToRgb',
    value: function hslToRgb(_ref3) {
      var _ref4 = slicedToArray(_ref3, 4),
        h = _ref4[0],
        s = _ref4[1],
        l = _ref4[2],
        a = _ref4[3];
      var r = void 0,
        g = void 0,
        b = void 0;
      if (s === 0) {
        r = g = b = l;
      } else {
        var hue2rgb = function hue2rgb(p, q, t) {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s,
          p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      var rgba = [r * 255, g * 255, b * 255].map(Math.round);
      rgba[3] = a;
      return rgba;
    }
  }]);
  return Color;
}();
var EventBucket = function () {
  function EventBucket() {
    classCallCheck(this, EventBucket);
    this._events = [];
  }
  createClass(EventBucket, [{
    key: 'add',
    value: function add(target, type, handler) {
      target.addEventListener(type, handler, false);
      this._events.push({
        target: target,
        type: type,
        handler: handler
      });
    }
  }, {
    key: 'remove',
    value: function remove(target, type, handler) {
      this._events = this._events.filter(function (e) {
        var isMatch = true;
        if (target && target !== e.target) {
          isMatch = false;
        }
        if (type && type !== e.type) {
          isMatch = false;
        }
        if (handler && handler !== e.handler) {
          isMatch = false;
        }
        if (isMatch) {
          EventBucket._doRemove(e.target, e.type, e.handler);
        }
        return !isMatch;
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._events.forEach(function (e) {
        return EventBucket._doRemove(e.target, e.type, e.handler);
      });
      this._events = [];
    }
  }], [{
    key: '_doRemove',
    value: function _doRemove(target, type, handler) {
      target.removeEventListener(type, handler, false);
    }
  }]);
  return EventBucket;
}();
function parseHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.firstElementChild;
}
function dragTrack(eventBucket, area, callback) {
  var dragging = false;
  function clamp(val, min, max) {
    return Math.max(min, Math.min(val, max));
  }
  function onMove(e, info, starting) {
    if (starting) {
      dragging = true;
    }
    if (!dragging) {
      return;
    }
    e.preventDefault();
    var bounds = area.getBoundingClientRect(),
      w = bounds.width,
      h = bounds.height,
      x = info.clientX,
      y = info.clientY;
    var relX = clamp(x - bounds.left, 0, w),
      relY = clamp(y - bounds.top, 0, h);
    callback(relX / w, relY / h);
  }
  function onMouse(e, starting) {
    var button = e.buttons === undefined ? e.which : e.buttons;
    if (button === 1) {
      onMove(e, e, starting);
    } else {
      dragging = false;
    }
  }
  function onTouch(e, starting) {
    if (e.touches.length === 1) {
      onMove(e, e.touches[0], starting);
    } else {
      dragging = false;
    }
  }
  eventBucket.add(area, 'mousedown', function (e) {
    onMouse(e, true);
  });
  eventBucket.add(area, 'touchstart', function (e) {
    onTouch(e, true);
  });
  eventBucket.add(window, 'mousemove', onMouse);
  eventBucket.add(area, 'touchmove', onTouch);
  eventBucket.add(window, 'mouseup', function (e) {
    dragging = false;
  });
  eventBucket.add(area, 'touchend', function (e) {
    dragging = false;
  });
  eventBucket.add(area, 'touchcancel', function (e) {
    dragging = false;
  });
}
var BG_TRANSP = 'linear-gradient(45deg, lightgrey 25%, transparent 25%, transparent 75%, lightgrey 75%) 0 0 / 2em 2em,\n                   linear-gradient(45deg, lightgrey 25%,       white 25%,       white 75%, lightgrey 75%) 1em 1em / 2em 2em';
var HUES = 360;
var EVENT_KEY = 'keydown',
  EVENT_CLICK_OUTSIDE = 'mousedown',
  EVENT_TAB_MOVE = 'focusin';
function $(selector, context) {
  return (context || document).querySelector(selector);
}
function stopEvent(e) {
  e.preventDefault();
  e.stopPropagation();
}
function onKey(bucket, target, keys, handler, stop) {
  bucket.add(target, EVENT_KEY, function (e) {
    if (keys.indexOf(e.key) >= 0) {
      if (stop) {
        stopEvent(e);
      }
      handler(e);
    }
  });
}
var Picker = function () {
  function Picker(options) {
    classCallCheck(this, Picker);
    this.settings = {
      popup: 'right',
      layout: 'default',
      alpha: true,
      editor: true,
      editorFormat: 'hex',
      cancelButton: false,
      defaultColor: '#0cf'
    };
    this._events = new EventBucket();
    this.onChange = null;
    this.onDone = null;
    this.onOpen = null;
    this.onClose = null;
    this.setOptions(options);
  }
  createClass(Picker, [{
    key: 'setOptions',
    value: function setOptions(options) {
      var _this = this;
      if (!options) {
        return;
      }
      var settings = this.settings;
      function transfer(source, target, skipKeys) {
        for (var key in source) {
          if (skipKeys && skipKeys.indexOf(key) >= 0) {
            continue;
          }
          target[key] = source[key];
        }
      }
      if (options instanceof HTMLElement) {
        settings.parent = options;
      } else {
        if (settings.parent && options.parent && settings.parent !== options.parent) {
          this._events.remove(settings.parent);
          this._popupInited = false;
        }
        transfer(options, settings);
        if (options.onChange) {
          this.onChange = options.onChange;
        }
        if (options.onDone) {
          this.onDone = options.onDone;
        }
        if (options.onOpen) {
          this.onOpen = options.onOpen;
        }
        if (options.onClose) {
          this.onClose = options.onClose;
        }
        var col = options.color || options.colour;
        if (col) {
          this._setColor(col);
        }
      }
      var parent = settings.parent;
      if (parent && settings.popup && !this._popupInited) {
        var openProxy = function openProxy(e) {
          return _this.openHandler(e);
        };
        this._events.add(parent, 'click', openProxy);
        onKey(this._events, parent, [' ', 'Spacebar', 'Enter'], openProxy);
        this._popupInited = true;
      } else if (options.parent && !settings.popup) {
        this.show();
      }
    }
  }, {
    key: 'openHandler',
    value: function openHandler(e) {
      if (this.show()) {
        e && e.preventDefault();
        this.settings.parent.style.pointerEvents = 'none';
        var toFocus = e && e.type === EVENT_KEY ? this._domEdit : this.domElement;
        setTimeout(function () {
          return toFocus.focus();
        }, 100);
        if (this.onOpen) {
          this.onOpen(this.colour);
        }
      }
    }
  }, {
    key: 'closeHandler',
    value: function closeHandler(e) {
      var event = e && e.type;
      var doHide = false;
      if (!e) {
        doHide = true;
      } else if (event === EVENT_CLICK_OUTSIDE || event === EVENT_TAB_MOVE) {
        var knownTime = (this.__containedEvent || 0) + 100;
        if (e.timeStamp > knownTime) {
          doHide = true;
        }
      } else {
        stopEvent(e);
        doHide = true;
      }
      if (doHide && this.hide()) {
        this.settings.parent.style.pointerEvents = '';
        if (event !== EVENT_CLICK_OUTSIDE) {
          this.settings.parent.focus();
        }
        if (this.onClose) {
          this.onClose(this.colour);
        }
      }
    }
  }, {
    key: 'movePopup',
    value: function movePopup(options, open) {
      this.closeHandler();
      this.setOptions(options);
      if (open) {
        this.openHandler();
      }
    }
  }, {
    key: 'setColor',
    value: function setColor(color, silent) {
      this._setColor(color, {
        silent: silent
      });
    }
  }, {
    key: '_setColor',
    value: function _setColor(color, flags) {
      if (typeof color === 'string') {
        color = color.trim();
      }
      if (!color) {
        return;
      }
      flags = flags || {};
      var c = void 0;
      try {
        c = new Color(color);
      } catch (ex) {
        if (flags.failSilently) {
          return;
        }
        throw ex;
      }
      if (!this.settings.alpha) {
        var hsla = c.hsla;
        hsla[3] = 1;
        c.hsla = hsla;
      }
      this.colour = this.color = c;
      this._setHSLA(null, null, null, null, flags);
    }
  }, {
    key: 'setColour',
    value: function setColour(colour, silent) {
      this.setColor(colour, silent);
    }
  }, {
    key: 'show',
    value: function show() {
      var parent = this.settings.parent;
      if (!parent) {
        return false;
      }
      if (this.domElement) {
        var toggled = this._toggleDOM(true);
        this._setPosition();
        return toggled;
      }
      var html = this.settings.template || '<div class="picker_wrapper" tabindex="-1"><div class="picker_arrow"></div><div class="picker_hue picker_slider"><div class="picker_selector"></div></div><div class="picker_sl"><div class="picker_selector"></div></div><div class="picker_alpha picker_slider"><div class="picker_selector"></div></div><div class="picker_editor"><input aria-label="Type a color name or hex value"/></div><div class="picker_sample"></div><div class="picker_done"><button>Ok</button></div><div class="picker_cancel"><button>Cancel</button></div></div>';
      var wrapper = parseHTML(html);
      this.domElement = wrapper;
      this._domH = $('.picker_hue', wrapper);
      this._domSL = $('.picker_sl', wrapper);
      this._domA = $('.picker_alpha', wrapper);
      this._domEdit = $('.picker_editor input', wrapper);
      this._domSample = $('.picker_sample', wrapper);
      this._domOkay = $('.picker_done button', wrapper);
      this._domCancel = $('.picker_cancel button', wrapper);
      wrapper.classList.add('layout_' + this.settings.layout);
      if (!this.settings.alpha) {
        wrapper.classList.add('no_alpha');
      }
      if (!this.settings.editor) {
        wrapper.classList.add('no_editor');
      }
      if (!this.settings.cancelButton) {
        wrapper.classList.add('no_cancel');
      }
      this._ifPopup(function () {
        return wrapper.classList.add('popup');
      });
      this._setPosition();
      if (this.colour) {
        this._updateUI();
      } else {
        this._setColor(this.settings.defaultColor);
      }
      this._bindEvents();
      return true;
    }
  }, {
    key: 'hide',
    value: function hide() {
      return this._toggleDOM(false);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._events.destroy();
      if (this.domElement) {
        this.settings.parent.removeChild(this.domElement);
      }
    }
  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      var _this2 = this;
      var that = this,
        dom = this.domElement,
        events = this._events;
      function addEvent(target, type, handler) {
        events.add(target, type, handler);
      }
      addEvent(dom, 'click', function (e) {
        return e.preventDefault();
      });
      dragTrack(events, this._domH, function (x, y) {
        return that._setHSLA(x);
      });
      dragTrack(events, this._domSL, function (x, y) {
        return that._setHSLA(null, x, 1 - y);
      });
      if (this.settings.alpha) {
        dragTrack(events, this._domA, function (x, y) {
          return that._setHSLA(null, null, null, 1 - y);
        });
      }
      var editInput = this._domEdit;
      {
        addEvent(editInput, 'input', function (e) {
          that._setColor(this.value, {
            fromEditor: true,
            failSilently: true
          });
        });
        addEvent(editInput, 'focus', function (e) {
          var input = this;
          if (input.selectionStart === input.selectionEnd) {
            input.select();
          }
        });
      }
      this._ifPopup(function () {
        var popupCloseProxy = function popupCloseProxy(e) {
          return _this2.closeHandler(e);
        };
        addEvent(window, EVENT_CLICK_OUTSIDE, popupCloseProxy);
        addEvent(window, EVENT_TAB_MOVE, popupCloseProxy);
        onKey(events, dom, ['Esc', 'Escape'], popupCloseProxy);
        var timeKeeper = function timeKeeper(e) {
          _this2.__containedEvent = e.timeStamp;
        };
        addEvent(dom, EVENT_CLICK_OUTSIDE, timeKeeper);
        addEvent(dom, EVENT_TAB_MOVE, timeKeeper);
        addEvent(_this2._domCancel, 'click', popupCloseProxy);
      });
      var onDoneProxy = function onDoneProxy(e) {
        _this2._ifPopup(function () {
          return _this2.closeHandler(e);
        });
        if (_this2.onDone) {
          _this2.onDone(_this2.colour);
        }
      };
      addEvent(this._domOkay, 'click', onDoneProxy);
      onKey(events, dom, ['Enter'], onDoneProxy);
    }
  }, {
    key: '_setPosition',
    value: function _setPosition() {
      var parent = this.settings.parent,
        elm = this.domElement;
      if (parent !== elm.parentNode) {
        parent.appendChild(elm);
      }
      this._ifPopup(function (popup) {
        if (getComputedStyle(parent).position === 'static') {
          parent.style.position = 'relative';
        }
        var cssClass = popup === true ? 'popup_right' : 'popup_' + popup;
        ['popup_top', 'popup_bottom', 'popup_left', 'popup_right'].forEach(function (c) {
          if (c === cssClass) {
            elm.classList.add(c);
          } else {
            elm.classList.remove(c);
          }
        });
        elm.classList.add(cssClass);
      });
    }
  }, {
    key: '_setHSLA',
    value: function _setHSLA(h, s, l, a, flags) {
      flags = flags || {};
      var col = this.colour,
        hsla = col.hsla;
      [h, s, l, a].forEach(function (x, i) {
        if (x || x === 0) {
          hsla[i] = x;
        }
      });
      col.hsla = hsla;
      this._updateUI(flags);
      if (this.onChange && !flags.silent) {
        this.onChange(col);
      }
    }
  }, {
    key: '_updateUI',
    value: function _updateUI(flags) {
      if (!this.domElement) {
        return;
      }
      flags = flags || {};
      var col = this.colour,
        hsl = col.hsla,
        cssHue = 'hsl(' + hsl[0] * HUES + ', 100%, 50%)',
        cssHSL = col.hslString,
        cssHSLA = col.hslaString;
      var uiH = this._domH,
        uiSL = this._domSL,
        uiA = this._domA,
        thumbH = $('.picker_selector', uiH),
        thumbSL = $('.picker_selector', uiSL),
        thumbA = $('.picker_selector', uiA);
      function posX(parent, child, relX) {
        child.style.left = relX * 100 + '%';
      }
      function posY(parent, child, relY) {
        child.style.top = relY * 100 + '%';
      }
      posX(uiH, thumbH, hsl[0]);
      this._domSL.style.backgroundColor = this._domH.style.color = cssHue;
      posX(uiSL, thumbSL, hsl[1]);
      posY(uiSL, thumbSL, 1 - hsl[2]);
      uiSL.style.color = cssHSL;
      posY(uiA, thumbA, 1 - hsl[3]);
      var opaque = cssHSL,
        transp = opaque.replace('hsl', 'hsla').replace(')', ', 0)'),
        bg = 'linear-gradient(' + [opaque, transp] + ')';
      this._domA.style.background = bg + ', ' + BG_TRANSP;
      if (!flags.fromEditor) {
        var format = this.settings.editorFormat,
          alpha = this.settings.alpha;
        var value = void 0;
        switch (format) {
          case 'rgb':
            value = col.printRGB(alpha);
            break;
          case 'hsl':
            value = col.printHSL(alpha);
            break;
          default:
            value = col.printHex(alpha);
        }
        this._domEdit.value = value;
      }
      this._domSample.style.color = cssHSLA;
    }
  }, {
    key: '_ifPopup',
    value: function _ifPopup(actionIf, actionElse) {
      if (this.settings.parent && this.settings.popup) {
        actionIf && actionIf(this.settings.popup);
      } else {
        actionElse && actionElse();
      }
    }
  }, {
    key: '_toggleDOM',
    value: function _toggleDOM(toVisible) {
      var dom = this.domElement;
      if (!dom) {
        return false;
      }
      var displayStyle = toVisible ? '' : 'none',
        toggle = dom.style.display !== displayStyle;
      if (toggle) {
        dom.style.display = displayStyle;
      }
      return toggle;
    }
  }]);
  return Picker;
}();
exports.default = Picker;
{
  var style = document.createElement('style');
  style.textContent = '.picker_wrapper.no_alpha .picker_alpha{display:none}.picker_wrapper.no_editor .picker_editor{position:absolute;z-index:-1;opacity:0}.picker_wrapper.no_cancel .picker_cancel{display:none}.layout_default.picker_wrapper{display:flex;flex-flow:row wrap;justify-content:space-between;align-items:stretch;font-size:10px;width:25em;padding:.5em}.layout_default.picker_wrapper input,.layout_default.picker_wrapper button{font-size:1rem}.layout_default.picker_wrapper>*{margin:.5em}.layout_default.picker_wrapper::before{content:"";display:block;width:100%;height:0;order:1}.layout_default .picker_slider,.layout_default .picker_selector{padding:1em}.layout_default .picker_hue{width:100%}.layout_default .picker_sl{flex:1 1 auto}.layout_default .picker_sl::before{content:"";display:block;padding-bottom:100%}.layout_default .picker_editor{order:1;width:6.5rem}.layout_default .picker_editor input{width:100%;height:100%}.layout_default .picker_sample{order:1;flex:1 1 auto}.layout_default .picker_done,.layout_default .picker_cancel{order:1}.picker_wrapper{box-sizing:border-box;background:#f2f2f2;box-shadow:0 0 0 1px silver;cursor:default;font-family:sans-serif;color:#444;pointer-events:auto}.picker_wrapper:focus{outline:none}.picker_wrapper button,.picker_wrapper input{box-sizing:border-box;border:none;box-shadow:0 0 0 1px silver;outline:none}.picker_wrapper button:focus,.picker_wrapper button:active,.picker_wrapper input:focus,.picker_wrapper input:active{box-shadow:0 0 2px 1px #1e90ff}.picker_wrapper button{padding:.4em .6em;cursor:pointer;background-color:#f5f5f5;background-image:linear-gradient(0deg, gainsboro, transparent)}.picker_wrapper button:active{background-image:linear-gradient(0deg, transparent, gainsboro)}.picker_wrapper button:hover{background-color:#fff}.picker_selector{position:absolute;z-index:1;display:block;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);border:2px solid #fff;border-radius:100%;box-shadow:0 0 3px 1px #67b9ff;background:currentColor;cursor:pointer}.picker_slider .picker_selector{border-radius:2px}.picker_hue{position:relative;background-image:linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta, red);box-shadow:0 0 0 1px silver}.picker_sl{position:relative;box-shadow:0 0 0 1px silver;background-image:linear-gradient(180deg, white, rgba(255, 255, 255, 0) 50%),linear-gradient(0deg, black, rgba(0, 0, 0, 0) 50%),linear-gradient(90deg, #808080, rgba(128, 128, 128, 0))}.picker_alpha,.picker_sample{position:relative;background:linear-gradient(45deg, lightgrey 25%, transparent 25%, transparent 75%, lightgrey 75%) 0 0/2em 2em,linear-gradient(45deg, lightgrey 25%, white 25%, white 75%, lightgrey 75%) 1em 1em/2em 2em;box-shadow:0 0 0 1px silver}.picker_alpha .picker_selector,.picker_sample .picker_selector{background:none}.picker_editor input{font-family:monospace;padding:.2em .4em}.picker_sample::before{content:"";position:absolute;display:block;width:100%;height:100%;background:currentColor}.picker_arrow{position:absolute;z-index:-1}.picker_wrapper.popup{position:absolute;z-index:2;margin:1.5em}.picker_wrapper.popup,.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{background:#f2f2f2;box-shadow:0 0 10px 1px rgba(0,0,0,.4)}.picker_wrapper.popup .picker_arrow{width:3em;height:3em;margin:0}.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{content:"";display:block;position:absolute;top:0;left:0;z-index:-99}.picker_wrapper.popup .picker_arrow::before{width:100%;height:100%;-webkit-transform:skew(45deg);transform:skew(45deg);-webkit-transform-origin:0 100%;transform-origin:0 100%}.picker_wrapper.popup .picker_arrow::after{width:150%;height:150%;box-shadow:none}.popup.popup_top{bottom:100%;left:0}.popup.popup_top .picker_arrow{bottom:0;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.popup.popup_bottom{top:100%;left:0}.popup.popup_bottom .picker_arrow{top:0;left:0;-webkit-transform:rotate(90deg) scale(1, -1);transform:rotate(90deg) scale(1, -1)}.popup.popup_left{top:0;right:100%}.popup.popup_left .picker_arrow{top:0;right:0;-webkit-transform:scale(-1, 1);transform:scale(-1, 1)}.popup.popup_right{top:0;left:100%}.popup.popup_right .picker_arrow{top:0;left:0}';
  document.documentElement.firstElementChild.appendChild(style);
  Picker.StyleElement = style;
}
},{}],"node_modules/interactjs/dist/interact.min.js":[function(require,module,exports) {
var define;
var global = arguments[3];
/* interact.js 1.10.17 | https://interactjs.io/license */
!function(t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).interact=t()}((function(){var t={};Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,t.default=function(t){return!(!t||!t.Window)&&t instanceof t.Window};var e={};Object.defineProperty(e,"__esModule",{value:!0}),e.getWindow=function(e){return(0,t.default)(e)?e:(e.ownerDocument||e).defaultView||r.window},e.init=o,e.window=e.realWindow=void 0;var n=void 0;e.realWindow=n;var r=void 0;function o(t){e.realWindow=n=t;var o=t.document.createTextNode("");o.ownerDocument!==t.document&&"function"==typeof t.wrap&&t.wrap(o)===o&&(t=t.wrap(t)),e.window=r=t}e.window=r,"undefined"!=typeof window&&window&&o(window);var i={};function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s=function(t){return!!t&&"object"===a(t)},l=function(t){return"function"==typeof t},u={window:function(n){return n===e.window||(0,t.default)(n)},docFrag:function(t){return s(t)&&11===t.nodeType},object:s,func:l,number:function(t){return"number"==typeof t},bool:function(t){return"boolean"==typeof t},string:function(t){return"string"==typeof t},element:function(t){if(!t||"object"!==a(t))return!1;var n=e.getWindow(t)||e.window;return/object|function/.test("undefined"==typeof Element?"undefined":a(Element))?t instanceof Element||t instanceof n.Element:1===t.nodeType&&"string"==typeof t.nodeName},plainObject:function(t){return s(t)&&!!t.constructor&&/function Object\b/.test(t.constructor.toString())},array:function(t){return s(t)&&void 0!==t.length&&l(t.splice)}};i.default=u;var c={};function f(t){var e=t.interaction;if("drag"===e.prepared.name){var n=e.prepared.axis;"x"===n?(e.coords.cur.page.y=e.coords.start.page.y,e.coords.cur.client.y=e.coords.start.client.y,e.coords.velocity.client.y=0,e.coords.velocity.page.y=0):"y"===n&&(e.coords.cur.page.x=e.coords.start.page.x,e.coords.cur.client.x=e.coords.start.client.x,e.coords.velocity.client.x=0,e.coords.velocity.page.x=0)}}function d(t){var e=t.iEvent,n=t.interaction;if("drag"===n.prepared.name){var r=n.prepared.axis;if("x"===r||"y"===r){var o="x"===r?"y":"x";e.page[o]=n.coords.start.page[o],e.client[o]=n.coords.start.client[o],e.delta[o]=0}}}Object.defineProperty(c,"__esModule",{value:!0}),c.default=void 0;var p={id:"actions/drag",install:function(t){var e=t.actions,n=t.Interactable,r=t.defaults;n.prototype.draggable=p.draggable,e.map.drag=p,e.methodDict.drag="draggable",r.actions.drag=p.defaults},listeners:{"interactions:before-action-move":f,"interactions:action-resume":f,"interactions:action-move":d,"auto-start:check":function(t){var e=t.interaction,n=t.interactable,r=t.buttons,o=n.options.drag;if(o&&o.enabled&&(!e.pointerIsDown||!/mouse|pointer/.test(e.pointerType)||0!=(r&n.options.drag.mouseButtons)))return t.action={name:"drag",axis:"start"===o.lockAxis?o.startAxis:o.lockAxis},!1}},draggable:function(t){return i.default.object(t)?(this.options.drag.enabled=!1!==t.enabled,this.setPerAction("drag",t),this.setOnEvents("drag",t),/^(xy|x|y|start)$/.test(t.lockAxis)&&(this.options.drag.lockAxis=t.lockAxis),/^(xy|x|y)$/.test(t.startAxis)&&(this.options.drag.startAxis=t.startAxis),this):i.default.bool(t)?(this.options.drag.enabled=t,this):this.options.drag},beforeMove:f,move:d,defaults:{startAxis:"xy",lockAxis:"xy"},getCursor:function(){return"move"}},v=p;c.default=v;var h={};Object.defineProperty(h,"__esModule",{value:!0}),h.default=void 0;var g={init:function(t){var e=t;g.document=e.document,g.DocumentFragment=e.DocumentFragment||y,g.SVGElement=e.SVGElement||y,g.SVGSVGElement=e.SVGSVGElement||y,g.SVGElementInstance=e.SVGElementInstance||y,g.Element=e.Element||y,g.HTMLElement=e.HTMLElement||g.Element,g.Event=e.Event,g.Touch=e.Touch||y,g.PointerEvent=e.PointerEvent||e.MSPointerEvent},document:null,DocumentFragment:null,SVGElement:null,SVGSVGElement:null,SVGElementInstance:null,Element:null,HTMLElement:null,Event:null,Touch:null,PointerEvent:null};function y(){}var m=g;h.default=m;var b={};Object.defineProperty(b,"__esModule",{value:!0}),b.default=void 0;var x={init:function(t){var e=h.default.Element,n=t.navigator||{};x.supportsTouch="ontouchstart"in t||i.default.func(t.DocumentTouch)&&h.default.document instanceof t.DocumentTouch,x.supportsPointerEvent=!1!==n.pointerEnabled&&!!h.default.PointerEvent,x.isIOS=/iP(hone|od|ad)/.test(n.platform),x.isIOS7=/iP(hone|od|ad)/.test(n.platform)&&/OS 7[^\d]/.test(n.appVersion),x.isIe9=/MSIE 9/.test(n.userAgent),x.isOperaMobile="Opera"===n.appName&&x.supportsTouch&&/Presto/.test(n.userAgent),x.prefixedMatchesSelector="matches"in e.prototype?"matches":"webkitMatchesSelector"in e.prototype?"webkitMatchesSelector":"mozMatchesSelector"in e.prototype?"mozMatchesSelector":"oMatchesSelector"in e.prototype?"oMatchesSelector":"msMatchesSelector",x.pEventTypes=x.supportsPointerEvent?h.default.PointerEvent===t.MSPointerEvent?{up:"MSPointerUp",down:"MSPointerDown",over:"mouseover",out:"mouseout",move:"MSPointerMove",cancel:"MSPointerCancel"}:{up:"pointerup",down:"pointerdown",over:"pointerover",out:"pointerout",move:"pointermove",cancel:"pointercancel"}:null,x.wheelEvent=h.default.document&&"onmousewheel"in h.default.document?"mousewheel":"wheel"},supportsTouch:null,supportsPointerEvent:null,isIOS7:null,isIOS:null,isIe9:null,isOperaMobile:null,prefixedMatchesSelector:null,pEventTypes:null,wheelEvent:null},w=x;b.default=w;var _={};function P(t){var e=t.parentNode;if(i.default.docFrag(e)){for(;(e=e.host)&&i.default.docFrag(e););return e}return e}function O(t,n){return e.window!==e.realWindow&&(n=n.replace(/\/deep\//g," ")),t[b.default.prefixedMatchesSelector](n)}Object.defineProperty(_,"__esModule",{value:!0}),_.closest=function(t,e){for(;i.default.element(t);){if(O(t,e))return t;t=P(t)}return null},_.getActualElement=function(t){return t.correspondingUseElement||t},_.getElementClientRect=j,_.getElementRect=function(t){var n=j(t);if(!b.default.isIOS7&&n){var r=T(e.getWindow(t));n.left+=r.x,n.right+=r.x,n.top+=r.y,n.bottom+=r.y}return n},_.getPath=function(t){for(var e=[];t;)e.push(t),t=P(t);return e},_.getScrollXY=T,_.indexOfDeepestElement=function(t){for(var n,r=[],o=0;o<t.length;o++){var i=t[o],a=t[n];if(i&&o!==n)if(a){var s=E(i),l=E(a);if(s!==i.ownerDocument)if(l!==i.ownerDocument)if(s!==l){r=r.length?r:S(a);var u=void 0;if(a instanceof h.default.HTMLElement&&i instanceof h.default.SVGElement&&!(i instanceof h.default.SVGSVGElement)){if(i===l)continue;u=i.ownerSVGElement}else u=i;for(var c=S(u,a.ownerDocument),f=0;c[f]&&c[f]===r[f];)f++;var d=[c[f-1],c[f],r[f]];if(d[0])for(var p=d[0].lastChild;p;){if(p===d[1]){n=o,r=c;break}if(p===d[2])break;p=p.previousSibling}}else v=i,g=a,void 0,void 0,(parseInt(e.getWindow(v).getComputedStyle(v).zIndex,10)||0)>=(parseInt(e.getWindow(g).getComputedStyle(g).zIndex,10)||0)&&(n=o);else n=o}else n=o}var v,g;return n},_.matchesSelector=O,_.matchesUpTo=function(t,e,n){for(;i.default.element(t);){if(O(t,e))return!0;if((t=P(t))===n)return O(t,e)}return!1},_.nodeContains=function(t,e){if(t.contains)return t.contains(e);for(;e;){if(e===t)return!0;e=e.parentNode}return!1},_.parentNode=P,_.trySelector=function(t){return!!i.default.string(t)&&(h.default.document.querySelector(t),!0)};var E=function(t){return t.parentNode||t.host};function S(t,e){for(var n,r=[],o=t;(n=E(o))&&o!==e&&n!==o.ownerDocument;)r.unshift(o),o=n;return r}function T(t){return{x:(t=t||e.window).scrollX||t.document.documentElement.scrollLeft,y:t.scrollY||t.document.documentElement.scrollTop}}function j(t){var e=t instanceof h.default.SVGElement?t.getBoundingClientRect():t.getClientRects()[0];return e&&{left:e.left,right:e.right,top:e.top,bottom:e.bottom,width:e.width||e.right-e.left,height:e.height||e.bottom-e.top}}var M={};Object.defineProperty(M,"__esModule",{value:!0}),M.default=function(t,e){for(var n in e)t[n]=e[n];return t};var k={};function I(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}function D(t,e,n){return"parent"===t?(0,_.parentNode)(n):"self"===t?e.getRect(n):(0,_.closest)(n,t)}Object.defineProperty(k,"__esModule",{value:!0}),k.addEdges=function(t,e,n){t.left&&(e.left+=n.x),t.right&&(e.right+=n.x),t.top&&(e.top+=n.y),t.bottom&&(e.bottom+=n.y),e.width=e.right-e.left,e.height=e.bottom-e.top},k.getStringOptionResult=D,k.rectToXY=function(t){return t&&{x:"x"in t?t.x:t.left,y:"y"in t?t.y:t.top}},k.resolveRectLike=function(t,e,n,r){var o,a=t;return i.default.string(a)?a=D(a,e,n):i.default.func(a)&&(a=a.apply(void 0,function(t){if(Array.isArray(t))return I(t)}(o=r)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(o)||function(t,e){if(t){if("string"==typeof t)return I(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?I(t,e):void 0}}(o)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())),i.default.element(a)&&(a=(0,_.getElementRect)(a)),a},k.tlbrToXywh=function(t){return!t||"x"in t&&"y"in t||((t=(0,M.default)({},t)).x=t.left||0,t.y=t.top||0,t.width=t.width||(t.right||0)-t.x,t.height=t.height||(t.bottom||0)-t.y),t},k.xywhToTlbr=function(t){return!t||"left"in t&&"top"in t||((t=(0,M.default)({},t)).left=t.x||0,t.top=t.y||0,t.right=t.right||t.left+t.width,t.bottom=t.bottom||t.top+t.height),t};var A={};Object.defineProperty(A,"__esModule",{value:!0}),A.default=function(t,e,n){var r=t.options[n],o=r&&r.origin||t.options.origin,i=(0,k.resolveRectLike)(o,t,e,[t&&e]);return(0,k.rectToXY)(i)||{x:0,y:0}};var z={};function C(t){return t.trim().split(/ +/)}Object.defineProperty(z,"__esModule",{value:!0}),z.default=function t(e,n,r){if(r=r||{},i.default.string(e)&&-1!==e.search(" ")&&(e=C(e)),i.default.array(e))return e.reduce((function(e,o){return(0,M.default)(e,t(o,n,r))}),r);if(i.default.object(e)&&(n=e,e=""),i.default.func(n))r[e]=r[e]||[],r[e].push(n);else if(i.default.array(n))for(var o=0;o<n.length;o++){var a;a=n[o],t(e,a,r)}else if(i.default.object(n))for(var s in n){var l=C(s).map((function(t){return"".concat(e).concat(t)}));t(l,n[s],r)}return r};var R={};Object.defineProperty(R,"__esModule",{value:!0}),R.default=void 0,R.default=function(t,e){return Math.sqrt(t*t+e*e)};var F={};Object.defineProperty(F,"__esModule",{value:!0}),F.default=function(t,e){t.__set||(t.__set={});var n=function(n){"function"!=typeof t[n]&&"__set"!==n&&Object.defineProperty(t,n,{get:function(){return n in t.__set?t.__set[n]:t.__set[n]=e[n]},set:function(e){t.__set[n]=e},configurable:!0})};for(var r in e)n(r);return t};var X={};function B(t){return t instanceof h.default.Event||t instanceof h.default.Touch}function Y(t,e,n){return t=t||"page",(n=n||{}).x=e[t+"X"],n.y=e[t+"Y"],n}function W(t,e){return e=e||{x:0,y:0},b.default.isOperaMobile&&B(t)?(Y("screen",t,e),e.x+=window.scrollX,e.y+=window.scrollY):Y("page",t,e),e}function L(t,e){return e=e||{},b.default.isOperaMobile&&B(t)?Y("screen",t,e):Y("client",t,e),e}function U(t){var e=[];return i.default.array(t)?(e[0]=t[0],e[1]=t[1]):"touchend"===t.type?1===t.touches.length?(e[0]=t.touches[0],e[1]=t.changedTouches[0]):0===t.touches.length&&(e[0]=t.changedTouches[0],e[1]=t.changedTouches[1]):(e[0]=t.touches[0],e[1]=t.touches[1]),e}function V(t){for(var e={pageX:0,pageY:0,clientX:0,clientY:0,screenX:0,screenY:0},n=0;n<t.length;n++){var r=t[n];for(var o in e)e[o]+=r[o]}for(var i in e)e[i]/=t.length;return e}Object.defineProperty(X,"__esModule",{value:!0}),X.coordsToEvent=function(t){return{coords:t,get page(){return this.coords.page},get client(){return this.coords.client},get timeStamp(){return this.coords.timeStamp},get pageX(){return this.coords.page.x},get pageY(){return this.coords.page.y},get clientX(){return this.coords.client.x},get clientY(){return this.coords.client.y},get pointerId(){return this.coords.pointerId},get target(){return this.coords.target},get type(){return this.coords.type},get pointerType(){return this.coords.pointerType},get buttons(){return this.coords.buttons},preventDefault:function(){}}},X.copyCoords=function(t,e){t.page=t.page||{},t.page.x=e.page.x,t.page.y=e.page.y,t.client=t.client||{},t.client.x=e.client.x,t.client.y=e.client.y,t.timeStamp=e.timeStamp},X.getClientXY=L,X.getEventTargets=function(t){var e=i.default.func(t.composedPath)?t.composedPath():t.path;return[_.getActualElement(e?e[0]:t.target),_.getActualElement(t.currentTarget)]},X.getPageXY=W,X.getPointerId=function(t){return i.default.number(t.pointerId)?t.pointerId:t.identifier},X.getPointerType=function(t){return i.default.string(t.pointerType)?t.pointerType:i.default.number(t.pointerType)?[void 0,void 0,"touch","pen","mouse"][t.pointerType]:/touch/.test(t.type||"")||t instanceof h.default.Touch?"touch":"mouse"},X.getTouchPair=U,X.getXY=Y,X.isNativePointer=B,X.newCoords=function(){return{page:{x:0,y:0},client:{x:0,y:0},timeStamp:0}},X.pointerAverage=V,Object.defineProperty(X,"pointerExtend",{enumerable:!0,get:function(){return F.default}}),X.setCoordDeltas=function(t,e,n){t.page.x=n.page.x-e.page.x,t.page.y=n.page.y-e.page.y,t.client.x=n.client.x-e.client.x,t.client.y=n.client.y-e.client.y,t.timeStamp=n.timeStamp-e.timeStamp},X.setCoordVelocity=function(t,e){var n=Math.max(e.timeStamp/1e3,.001);t.page.x=e.page.x/n,t.page.y=e.page.y/n,t.client.x=e.client.x/n,t.client.y=e.client.y/n,t.timeStamp=n},X.setCoords=function(t,e,n){var r=e.length>1?V(e):e[0];W(r,t.page),L(r,t.client),t.timeStamp=n},X.setZeroCoords=function(t){t.page.x=0,t.page.y=0,t.client.x=0,t.client.y=0},X.touchAngle=function(t,e){var n=e+"X",r=e+"Y",o=U(t),i=o[1][n]-o[0][n],a=o[1][r]-o[0][r];return 180*Math.atan2(a,i)/Math.PI},X.touchBBox=function(t){if(!t.length)return null;var e=U(t),n=Math.min(e[0].pageX,e[1].pageX),r=Math.min(e[0].pageY,e[1].pageY),o=Math.max(e[0].pageX,e[1].pageX),i=Math.max(e[0].pageY,e[1].pageY);return{x:n,y:r,left:n,top:r,right:o,bottom:i,width:o-n,height:i-r}},X.touchDistance=function(t,e){var n=e+"X",r=e+"Y",o=U(t),i=o[0][n]-o[1][n],a=o[0][r]-o[1][r];return(0,R.default)(i,a)};var N={};function q(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function G(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(N,"__esModule",{value:!0}),N.BaseEvent=void 0;var $=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),G(this,"immediatePropagationStopped",!1),G(this,"propagationStopped",!1),this._interaction=e}var e,n;return e=t,(n=[{key:"preventDefault",value:function(){}},{key:"stopPropagation",value:function(){this.propagationStopped=!0}},{key:"stopImmediatePropagation",value:function(){this.immediatePropagationStopped=this.propagationStopped=!0}}])&&q(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();N.BaseEvent=$,Object.defineProperty($.prototype,"interaction",{get:function(){return this._interaction._proxy},set:function(){}});var H={};Object.defineProperty(H,"__esModule",{value:!0}),H.remove=H.merge=H.from=H.findIndex=H.find=H.contains=void 0,H.contains=function(t,e){return-1!==t.indexOf(e)},H.remove=function(t,e){return t.splice(t.indexOf(e),1)};var K=function(t,e){for(var n=0;n<e.length;n++){var r=e[n];t.push(r)}return t};H.merge=K,H.from=function(t){return K([],t)};var Z=function(t,e){for(var n=0;n<t.length;n++)if(e(t[n],n,t))return n;return-1};H.findIndex=Z,H.find=function(t,e){return t[Z(t,e)]};var J={};function Q(t){return Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Q(t)}function tt(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function et(t,e){return et=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},et(t,e)}function nt(t,e){if(e&&("object"===Q(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return rt(t)}function rt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function ot(t){return ot=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},ot(t)}function it(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(J,"__esModule",{value:!0}),J.DropEvent=void 0;var at=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&et(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=ot(r);if(o){var n=ot(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return nt(this,t)});function a(t,e,n){var r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),it(rt(r=i.call(this,e._interaction)),"dropzone",void 0),it(rt(r),"dragEvent",void 0),it(rt(r),"relatedTarget",void 0),it(rt(r),"draggable",void 0),it(rt(r),"propagationStopped",!1),it(rt(r),"immediatePropagationStopped",!1);var o="dragleave"===n?t.prev:t.cur,s=o.element,l=o.dropzone;return r.type=n,r.target=s,r.currentTarget=s,r.dropzone=l,r.dragEvent=e,r.relatedTarget=e.target,r.draggable=e.interactable,r.timeStamp=e.timeStamp,r}return e=a,(n=[{key:"reject",value:function(){var t=this,e=this._interaction.dropState;if("dropactivate"===this.type||this.dropzone&&e.cur.dropzone===this.dropzone&&e.cur.element===this.target)if(e.prev.dropzone=this.dropzone,e.prev.element=this.target,e.rejected=!0,e.events.enter=null,this.stopImmediatePropagation(),"dropactivate"===this.type){var n=e.activeDrops,r=H.findIndex(n,(function(e){var n=e.dropzone,r=e.element;return n===t.dropzone&&r===t.target}));e.activeDrops.splice(r,1);var o=new a(e,this.dragEvent,"dropdeactivate");o.dropzone=this.dropzone,o.target=this.target,this.dropzone.fire(o)}else this.dropzone.fire(new a(e,this.dragEvent,"dragleave"))}},{key:"preventDefault",value:function(){}},{key:"stopPropagation",value:function(){this.propagationStopped=!0}},{key:"stopImmediatePropagation",value:function(){this.immediatePropagationStopped=this.propagationStopped=!0}}])&&tt(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(N.BaseEvent);J.DropEvent=at;var st={};function lt(t,e){for(var n=0;n<t.slice().length;n++){var r=t.slice()[n],o=r.dropzone,i=r.element;e.dropzone=o,e.target=i,o.fire(e),e.propagationStopped=e.immediatePropagationStopped=!1}}function ut(t,e){for(var n=function(t,e){for(var n=t.interactables,r=[],o=0;o<n.list.length;o++){var a=n.list[o];if(a.options.drop.enabled){var s=a.options.drop.accept;if(!(i.default.element(s)&&s!==e||i.default.string(s)&&!_.matchesSelector(e,s)||i.default.func(s)&&!s({dropzone:a,draggableElement:e})))for(var l=i.default.string(a.target)?a._context.querySelectorAll(a.target):i.default.array(a.target)?a.target:[a.target],u=0;u<l.length;u++){var c=l[u];c!==e&&r.push({dropzone:a,element:c,rect:a.getRect(c)})}}}return r}(t,e),r=0;r<n.length;r++){var o=n[r];o.rect=o.dropzone.getRect(o.element)}return n}function ct(t,e,n){for(var r=t.dropState,o=t.interactable,i=t.element,a=[],s=0;s<r.activeDrops.length;s++){var l=r.activeDrops[s],u=l.dropzone,c=l.element,f=l.rect;a.push(u.dropCheck(e,n,o,i,c,f)?c:null)}var d=_.indexOfDeepestElement(a);return r.activeDrops[d]||null}function ft(t,e,n){var r=t.dropState,o={enter:null,leave:null,activate:null,deactivate:null,move:null,drop:null};return"dragstart"===n.type&&(o.activate=new J.DropEvent(r,n,"dropactivate"),o.activate.target=null,o.activate.dropzone=null),"dragend"===n.type&&(o.deactivate=new J.DropEvent(r,n,"dropdeactivate"),o.deactivate.target=null,o.deactivate.dropzone=null),r.rejected||(r.cur.element!==r.prev.element&&(r.prev.dropzone&&(o.leave=new J.DropEvent(r,n,"dragleave"),n.dragLeave=o.leave.target=r.prev.element,n.prevDropzone=o.leave.dropzone=r.prev.dropzone),r.cur.dropzone&&(o.enter=new J.DropEvent(r,n,"dragenter"),n.dragEnter=r.cur.element,n.dropzone=r.cur.dropzone)),"dragend"===n.type&&r.cur.dropzone&&(o.drop=new J.DropEvent(r,n,"drop"),n.dropzone=r.cur.dropzone,n.relatedTarget=r.cur.element),"dragmove"===n.type&&r.cur.dropzone&&(o.move=new J.DropEvent(r,n,"dropmove"),o.move.dragmove=n,n.dropzone=r.cur.dropzone)),o}function dt(t,e){var n=t.dropState,r=n.activeDrops,o=n.cur,i=n.prev;e.leave&&i.dropzone.fire(e.leave),e.enter&&o.dropzone.fire(e.enter),e.move&&o.dropzone.fire(e.move),e.drop&&o.dropzone.fire(e.drop),e.deactivate&&lt(r,e.deactivate),n.prev.dropzone=o.dropzone,n.prev.element=o.element}function pt(t,e){var n=t.interaction,r=t.iEvent,o=t.event;if("dragmove"===r.type||"dragend"===r.type){var i=n.dropState;e.dynamicDrop&&(i.activeDrops=ut(e,n.element));var a=r,s=ct(n,a,o);i.rejected=i.rejected&&!!s&&s.dropzone===i.cur.dropzone&&s.element===i.cur.element,i.cur.dropzone=s&&s.dropzone,i.cur.element=s&&s.element,i.events=ft(n,0,a)}}Object.defineProperty(st,"__esModule",{value:!0}),st.default=void 0;var vt={id:"actions/drop",install:function(t){var e=t.actions,n=t.interactStatic,r=t.Interactable,o=t.defaults;t.usePlugin(c.default),r.prototype.dropzone=function(t){return function(t,e){if(i.default.object(e)){if(t.options.drop.enabled=!1!==e.enabled,e.listeners){var n=(0,z.default)(e.listeners),r=Object.keys(n).reduce((function(t,e){return t[/^(enter|leave)/.test(e)?"drag".concat(e):/^(activate|deactivate|move)/.test(e)?"drop".concat(e):e]=n[e],t}),{});t.off(t.options.drop.listeners),t.on(r),t.options.drop.listeners=r}return i.default.func(e.ondrop)&&t.on("drop",e.ondrop),i.default.func(e.ondropactivate)&&t.on("dropactivate",e.ondropactivate),i.default.func(e.ondropdeactivate)&&t.on("dropdeactivate",e.ondropdeactivate),i.default.func(e.ondragenter)&&t.on("dragenter",e.ondragenter),i.default.func(e.ondragleave)&&t.on("dragleave",e.ondragleave),i.default.func(e.ondropmove)&&t.on("dropmove",e.ondropmove),/^(pointer|center)$/.test(e.overlap)?t.options.drop.overlap=e.overlap:i.default.number(e.overlap)&&(t.options.drop.overlap=Math.max(Math.min(1,e.overlap),0)),"accept"in e&&(t.options.drop.accept=e.accept),"checker"in e&&(t.options.drop.checker=e.checker),t}return i.default.bool(e)?(t.options.drop.enabled=e,t):t.options.drop}(this,t)},r.prototype.dropCheck=function(t,e,n,r,o,a){return function(t,e,n,r,o,a,s){var l=!1;if(!(s=s||t.getRect(a)))return!!t.options.drop.checker&&t.options.drop.checker(e,n,l,t,a,r,o);var u=t.options.drop.overlap;if("pointer"===u){var c=(0,A.default)(r,o,"drag"),f=X.getPageXY(e);f.x+=c.x,f.y+=c.y;var d=f.x>s.left&&f.x<s.right,p=f.y>s.top&&f.y<s.bottom;l=d&&p}var v=r.getRect(o);if(v&&"center"===u){var h=v.left+v.width/2,g=v.top+v.height/2;l=h>=s.left&&h<=s.right&&g>=s.top&&g<=s.bottom}return v&&i.default.number(u)&&(l=Math.max(0,Math.min(s.right,v.right)-Math.max(s.left,v.left))*Math.max(0,Math.min(s.bottom,v.bottom)-Math.max(s.top,v.top))/(v.width*v.height)>=u),t.options.drop.checker&&(l=t.options.drop.checker(e,n,l,t,a,r,o)),l}(this,t,e,n,r,o,a)},n.dynamicDrop=function(e){return i.default.bool(e)?(t.dynamicDrop=e,n):t.dynamicDrop},(0,M.default)(e.phaselessTypes,{dragenter:!0,dragleave:!0,dropactivate:!0,dropdeactivate:!0,dropmove:!0,drop:!0}),e.methodDict.drop="dropzone",t.dynamicDrop=!1,o.actions.drop=vt.defaults},listeners:{"interactions:before-action-start":function(t){var e=t.interaction;"drag"===e.prepared.name&&(e.dropState={cur:{dropzone:null,element:null},prev:{dropzone:null,element:null},rejected:null,events:null,activeDrops:[]})},"interactions:after-action-start":function(t,e){var n=t.interaction,r=(t.event,t.iEvent);if("drag"===n.prepared.name){var o=n.dropState;o.activeDrops=null,o.events=null,o.activeDrops=ut(e,n.element),o.events=ft(n,0,r),o.events.activate&&(lt(o.activeDrops,o.events.activate),e.fire("actions/drop:start",{interaction:n,dragEvent:r}))}},"interactions:action-move":pt,"interactions:after-action-move":function(t,e){var n=t.interaction,r=t.iEvent;"drag"===n.prepared.name&&(dt(n,n.dropState.events),e.fire("actions/drop:move",{interaction:n,dragEvent:r}),n.dropState.events={})},"interactions:action-end":function(t,e){if("drag"===t.interaction.prepared.name){var n=t.interaction,r=t.iEvent;pt(t,e),dt(n,n.dropState.events),e.fire("actions/drop:end",{interaction:n,dragEvent:r})}},"interactions:stop":function(t){var e=t.interaction;if("drag"===e.prepared.name){var n=e.dropState;n&&(n.activeDrops=null,n.events=null,n.cur.dropzone=null,n.cur.element=null,n.prev.dropzone=null,n.prev.element=null,n.rejected=!1)}}},getActiveDrops:ut,getDrop:ct,getDropEvents:ft,fireDropEvents:dt,defaults:{enabled:!1,accept:null,overlap:"pointer"}},ht=vt;st.default=ht;var gt={};function yt(t){var e=t.interaction,n=t.iEvent,r=t.phase;if("gesture"===e.prepared.name){var o=e.pointers.map((function(t){return t.pointer})),a="start"===r,s="end"===r,l=e.interactable.options.deltaSource;if(n.touches=[o[0],o[1]],a)n.distance=X.touchDistance(o,l),n.box=X.touchBBox(o),n.scale=1,n.ds=0,n.angle=X.touchAngle(o,l),n.da=0,e.gesture.startDistance=n.distance,e.gesture.startAngle=n.angle;else if(s){var u=e.prevEvent;n.distance=u.distance,n.box=u.box,n.scale=u.scale,n.ds=0,n.angle=u.angle,n.da=0}else n.distance=X.touchDistance(o,l),n.box=X.touchBBox(o),n.scale=n.distance/e.gesture.startDistance,n.angle=X.touchAngle(o,l),n.ds=n.scale-e.gesture.scale,n.da=n.angle-e.gesture.angle;e.gesture.distance=n.distance,e.gesture.angle=n.angle,i.default.number(n.scale)&&n.scale!==1/0&&!isNaN(n.scale)&&(e.gesture.scale=n.scale)}}Object.defineProperty(gt,"__esModule",{value:!0}),gt.default=void 0;var mt={id:"actions/gesture",before:["actions/drag","actions/resize"],install:function(t){var e=t.actions,n=t.Interactable,r=t.defaults;n.prototype.gesturable=function(t){return i.default.object(t)?(this.options.gesture.enabled=!1!==t.enabled,this.setPerAction("gesture",t),this.setOnEvents("gesture",t),this):i.default.bool(t)?(this.options.gesture.enabled=t,this):this.options.gesture},e.map.gesture=mt,e.methodDict.gesture="gesturable",r.actions.gesture=mt.defaults},listeners:{"interactions:action-start":yt,"interactions:action-move":yt,"interactions:action-end":yt,"interactions:new":function(t){t.interaction.gesture={angle:0,distance:0,scale:1,startAngle:0,startDistance:0}},"auto-start:check":function(t){if(!(t.interaction.pointers.length<2)){var e=t.interactable.options.gesture;if(e&&e.enabled)return t.action={name:"gesture"},!1}}},defaults:{},getCursor:function(){return""}},bt=mt;gt.default=bt;var xt={};function wt(t,e,n,r,o,a,s){if(!e)return!1;if(!0===e){var l=i.default.number(a.width)?a.width:a.right-a.left,u=i.default.number(a.height)?a.height:a.bottom-a.top;if(s=Math.min(s,Math.abs(("left"===t||"right"===t?l:u)/2)),l<0&&("left"===t?t="right":"right"===t&&(t="left")),u<0&&("top"===t?t="bottom":"bottom"===t&&(t="top")),"left"===t){var c=l>=0?a.left:a.right;return n.x<c+s}if("top"===t){var f=u>=0?a.top:a.bottom;return n.y<f+s}if("right"===t)return n.x>(l>=0?a.right:a.left)-s;if("bottom"===t)return n.y>(u>=0?a.bottom:a.top)-s}return!!i.default.element(r)&&(i.default.element(e)?e===r:_.matchesUpTo(r,e,o))}function _t(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.resizeAxes){var r=e;n.interactable.options.resize.square?("y"===n.resizeAxes?r.delta.x=r.delta.y:r.delta.y=r.delta.x,r.axes="xy"):(r.axes=n.resizeAxes,"x"===n.resizeAxes?r.delta.y=0:"y"===n.resizeAxes&&(r.delta.x=0))}}Object.defineProperty(xt,"__esModule",{value:!0}),xt.default=void 0;var Pt={id:"actions/resize",before:["actions/drag"],install:function(t){var e=t.actions,n=t.browser,r=t.Interactable,o=t.defaults;Pt.cursors=function(t){return t.isIe9?{x:"e-resize",y:"s-resize",xy:"se-resize",top:"n-resize",left:"w-resize",bottom:"s-resize",right:"e-resize",topleft:"se-resize",bottomright:"se-resize",topright:"ne-resize",bottomleft:"ne-resize"}:{x:"ew-resize",y:"ns-resize",xy:"nwse-resize",top:"ns-resize",left:"ew-resize",bottom:"ns-resize",right:"ew-resize",topleft:"nwse-resize",bottomright:"nwse-resize",topright:"nesw-resize",bottomleft:"nesw-resize"}}(n),Pt.defaultMargin=n.supportsTouch||n.supportsPointerEvent?20:10,r.prototype.resizable=function(e){return function(t,e,n){return i.default.object(e)?(t.options.resize.enabled=!1!==e.enabled,t.setPerAction("resize",e),t.setOnEvents("resize",e),i.default.string(e.axis)&&/^x$|^y$|^xy$/.test(e.axis)?t.options.resize.axis=e.axis:null===e.axis&&(t.options.resize.axis=n.defaults.actions.resize.axis),i.default.bool(e.preserveAspectRatio)?t.options.resize.preserveAspectRatio=e.preserveAspectRatio:i.default.bool(e.square)&&(t.options.resize.square=e.square),t):i.default.bool(e)?(t.options.resize.enabled=e,t):t.options.resize}(this,e,t)},e.map.resize=Pt,e.methodDict.resize="resizable",o.actions.resize=Pt.defaults},listeners:{"interactions:new":function(t){t.interaction.resizeAxes="xy"},"interactions:action-start":function(t){!function(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.prepared.edges){var r=e,o=n.rect;n._rects={start:(0,M.default)({},o),corrected:(0,M.default)({},o),previous:(0,M.default)({},o),delta:{left:0,right:0,width:0,top:0,bottom:0,height:0}},r.edges=n.prepared.edges,r.rect=n._rects.corrected,r.deltaRect=n._rects.delta}}(t),_t(t)},"interactions:action-move":function(t){!function(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.prepared.edges){var r=e,o=n.interactable.options.resize.invert,i="reposition"===o||"negate"===o,a=n.rect,s=n._rects,l=s.start,u=s.corrected,c=s.delta,f=s.previous;if((0,M.default)(f,u),i){if((0,M.default)(u,a),"reposition"===o){if(u.top>u.bottom){var d=u.top;u.top=u.bottom,u.bottom=d}if(u.left>u.right){var p=u.left;u.left=u.right,u.right=p}}}else u.top=Math.min(a.top,l.bottom),u.bottom=Math.max(a.bottom,l.top),u.left=Math.min(a.left,l.right),u.right=Math.max(a.right,l.left);for(var v in u.width=u.right-u.left,u.height=u.bottom-u.top,u)c[v]=u[v]-f[v];r.edges=n.prepared.edges,r.rect=u,r.deltaRect=c}}(t),_t(t)},"interactions:action-end":function(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.prepared.edges){var r=e;r.edges=n.prepared.edges,r.rect=n._rects.corrected,r.deltaRect=n._rects.delta}},"auto-start:check":function(t){var e=t.interaction,n=t.interactable,r=t.element,o=t.rect,a=t.buttons;if(o){var s=(0,M.default)({},e.coords.cur.page),l=n.options.resize;if(l&&l.enabled&&(!e.pointerIsDown||!/mouse|pointer/.test(e.pointerType)||0!=(a&l.mouseButtons))){if(i.default.object(l.edges)){var u={left:!1,right:!1,top:!1,bottom:!1};for(var c in u)u[c]=wt(c,l.edges[c],s,e._latestPointer.eventTarget,r,o,l.margin||Pt.defaultMargin);u.left=u.left&&!u.right,u.top=u.top&&!u.bottom,(u.left||u.right||u.top||u.bottom)&&(t.action={name:"resize",edges:u})}else{var f="y"!==l.axis&&s.x>o.right-Pt.defaultMargin,d="x"!==l.axis&&s.y>o.bottom-Pt.defaultMargin;(f||d)&&(t.action={name:"resize",axes:(f?"x":"")+(d?"y":"")})}return!t.action&&void 0}}}},defaults:{square:!1,preserveAspectRatio:!1,axis:"xy",margin:NaN,edges:null,invert:"none"},cursors:null,getCursor:function(t){var e=t.edges,n=t.axis,r=t.name,o=Pt.cursors,i=null;if(n)i=o[r+n];else if(e){for(var a="",s=["top","bottom","left","right"],l=0;l<s.length;l++){var u=s[l];e[u]&&(a+=u)}i=o[a]}return i},defaultMargin:null},Ot=Pt;xt.default=Ot;var Et={};Object.defineProperty(Et,"__esModule",{value:!0}),Et.default=void 0;var St={id:"actions",install:function(t){t.usePlugin(gt.default),t.usePlugin(xt.default),t.usePlugin(c.default),t.usePlugin(st.default)}};Et.default=St;var Tt={};Object.defineProperty(Tt,"__esModule",{value:!0}),Tt.default=void 0;var jt,Mt,kt=0,It={request:function(t){return jt(t)},cancel:function(t){return Mt(t)},init:function(t){if(jt=t.requestAnimationFrame,Mt=t.cancelAnimationFrame,!jt)for(var e=["ms","moz","webkit","o"],n=0;n<e.length;n++){var r=e[n];jt=t["".concat(r,"RequestAnimationFrame")],Mt=t["".concat(r,"CancelAnimationFrame")]||t["".concat(r,"CancelRequestAnimationFrame")]}jt=jt&&jt.bind(t),Mt=Mt&&Mt.bind(t),jt||(jt=function(e){var n=Date.now(),r=Math.max(0,16-(n-kt)),o=t.setTimeout((function(){e(n+r)}),r);return kt=n+r,o},Mt=function(t){return clearTimeout(t)})}};Tt.default=It;var Dt={};Object.defineProperty(Dt,"__esModule",{value:!0}),Dt.default=void 0,Dt.getContainer=zt,Dt.getScroll=Ct,Dt.getScrollSize=function(t){return i.default.window(t)&&(t=window.document.body),{x:t.scrollWidth,y:t.scrollHeight}},Dt.getScrollSizeDelta=function(t,e){var n=t.interaction,r=t.element,o=n&&n.interactable.options[n.prepared.name].autoScroll;if(!o||!o.enabled)return e(),{x:0,y:0};var i=zt(o.container,n.interactable,r),a=Ct(i);e();var s=Ct(i);return{x:s.x-a.x,y:s.y-a.y}};var At={defaults:{enabled:!1,margin:60,container:null,speed:300},now:Date.now,interaction:null,i:0,x:0,y:0,isScrolling:!1,prevTime:0,margin:0,speed:0,start:function(t){At.isScrolling=!0,Tt.default.cancel(At.i),t.autoScroll=At,At.interaction=t,At.prevTime=At.now(),At.i=Tt.default.request(At.scroll)},stop:function(){At.isScrolling=!1,At.interaction&&(At.interaction.autoScroll=null),Tt.default.cancel(At.i)},scroll:function(){var t=At.interaction,e=t.interactable,n=t.element,r=t.prepared.name,o=e.options[r].autoScroll,a=zt(o.container,e,n),s=At.now(),l=(s-At.prevTime)/1e3,u=o.speed*l;if(u>=1){var c={x:At.x*u,y:At.y*u};if(c.x||c.y){var f=Ct(a);i.default.window(a)?a.scrollBy(c.x,c.y):a&&(a.scrollLeft+=c.x,a.scrollTop+=c.y);var d=Ct(a),p={x:d.x-f.x,y:d.y-f.y};(p.x||p.y)&&e.fire({type:"autoscroll",target:n,interactable:e,delta:p,interaction:t,container:a})}At.prevTime=s}At.isScrolling&&(Tt.default.cancel(At.i),At.i=Tt.default.request(At.scroll))},check:function(t,e){var n;return null==(n=t.options[e].autoScroll)?void 0:n.enabled},onInteractionMove:function(t){var e=t.interaction,n=t.pointer;if(e.interacting()&&At.check(e.interactable,e.prepared.name))if(e.simulation)At.x=At.y=0;else{var r,o,a,s,l=e.interactable,u=e.element,c=e.prepared.name,f=l.options[c].autoScroll,d=zt(f.container,l,u);if(i.default.window(d))s=n.clientX<At.margin,r=n.clientY<At.margin,o=n.clientX>d.innerWidth-At.margin,a=n.clientY>d.innerHeight-At.margin;else{var p=_.getElementClientRect(d);s=n.clientX<p.left+At.margin,r=n.clientY<p.top+At.margin,o=n.clientX>p.right-At.margin,a=n.clientY>p.bottom-At.margin}At.x=o?1:s?-1:0,At.y=a?1:r?-1:0,At.isScrolling||(At.margin=f.margin,At.speed=f.speed,At.start(e))}}};function zt(t,n,r){return(i.default.string(t)?(0,k.getStringOptionResult)(t,n,r):t)||(0,e.getWindow)(r)}function Ct(t){return i.default.window(t)&&(t=window.document.body),{x:t.scrollLeft,y:t.scrollTop}}var Rt={id:"auto-scroll",install:function(t){var e=t.defaults,n=t.actions;t.autoScroll=At,At.now=function(){return t.now()},n.phaselessTypes.autoscroll=!0,e.perAction.autoScroll=At.defaults},listeners:{"interactions:new":function(t){t.interaction.autoScroll=null},"interactions:destroy":function(t){t.interaction.autoScroll=null,At.stop(),At.interaction&&(At.interaction=null)},"interactions:stop":At.stop,"interactions:action-move":function(t){return At.onInteractionMove(t)}}},Ft=Rt;Dt.default=Ft;var Xt={};Object.defineProperty(Xt,"__esModule",{value:!0}),Xt.copyAction=function(t,e){return t.name=e.name,t.axis=e.axis,t.edges=e.edges,t},Xt.sign=void 0,Xt.warnOnce=function(t,n){var r=!1;return function(){return r||(e.window.console.warn(n),r=!0),t.apply(this,arguments)}},Xt.sign=function(t){return t>=0?1:-1};var Bt={};function Yt(t){return i.default.bool(t)?(this.options.styleCursor=t,this):null===t?(delete this.options.styleCursor,this):this.options.styleCursor}function Wt(t){return i.default.func(t)?(this.options.actionChecker=t,this):null===t?(delete this.options.actionChecker,this):this.options.actionChecker}Object.defineProperty(Bt,"__esModule",{value:!0}),Bt.default=void 0;var Lt={id:"auto-start/interactableMethods",install:function(t){var e=t.Interactable;e.prototype.getAction=function(e,n,r,o){var i=function(t,e,n,r,o){var i=t.getRect(r),a={action:null,interactable:t,interaction:n,element:r,rect:i,buttons:e.buttons||{0:1,1:4,3:8,4:16}[e.button]};return o.fire("auto-start:check",a),a.action}(this,n,r,o,t);return this.options.actionChecker?this.options.actionChecker(e,n,i,this,o,r):i},e.prototype.ignoreFrom=(0,Xt.warnOnce)((function(t){return this._backCompatOption("ignoreFrom",t)}),"Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."),e.prototype.allowFrom=(0,Xt.warnOnce)((function(t){return this._backCompatOption("allowFrom",t)}),"Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."),e.prototype.actionChecker=Wt,e.prototype.styleCursor=Yt}};Bt.default=Lt;var Ut={};function Vt(t,e,n,r,o){return e.testIgnoreAllow(e.options[t.name],n,r)&&e.options[t.name].enabled&&$t(e,n,t,o)?t:null}function Nt(t,e,n,r,o,i,a){for(var s=0,l=r.length;s<l;s++){var u=r[s],c=o[s],f=u.getAction(e,n,t,c);if(f){var d=Vt(f,u,c,i,a);if(d)return{action:d,interactable:u,element:c}}}return{action:null,interactable:null,element:null}}function qt(t,e,n,r,o){var a=[],s=[],l=r;function u(t){a.push(t),s.push(l)}for(;i.default.element(l);){a=[],s=[],o.interactables.forEachMatch(l,u);var c=Nt(t,e,n,a,s,r,o);if(c.action&&!c.interactable.options[c.action.name].manualStart)return c;l=_.parentNode(l)}return{action:null,interactable:null,element:null}}function Gt(t,e,n){var r=e.action,o=e.interactable,i=e.element;r=r||{name:null},t.interactable=o,t.element=i,(0,Xt.copyAction)(t.prepared,r),t.rect=o&&r.name?o.getRect(i):null,Zt(t,n),n.fire("autoStart:prepared",{interaction:t})}function $t(t,e,n,r){var o=t.options,i=o[n.name].max,a=o[n.name].maxPerElement,s=r.autoStart.maxInteractions,l=0,u=0,c=0;if(!(i&&a&&s))return!1;for(var f=0;f<r.interactions.list.length;f++){var d=r.interactions.list[f],p=d.prepared.name;if(d.interacting()){if(++l>=s)return!1;if(d.interactable===t){if((u+=p===n.name?1:0)>=i)return!1;if(d.element===e&&(c++,p===n.name&&c>=a))return!1}}}return s>0}function Ht(t,e){return i.default.number(t)?(e.autoStart.maxInteractions=t,this):e.autoStart.maxInteractions}function Kt(t,e,n){var r=n.autoStart.cursorElement;r&&r!==t&&(r.style.cursor=""),t.ownerDocument.documentElement.style.cursor=e,t.style.cursor=e,n.autoStart.cursorElement=e?t:null}function Zt(t,e){var n=t.interactable,r=t.element,o=t.prepared;if("mouse"===t.pointerType&&n&&n.options.styleCursor){var a="";if(o.name){var s=n.options[o.name].cursorChecker;a=i.default.func(s)?s(o,n,r,t._interacting):e.actions.map[o.name].getCursor(o)}Kt(t.element,a||"",e)}else e.autoStart.cursorElement&&Kt(e.autoStart.cursorElement,"",e)}Object.defineProperty(Ut,"__esModule",{value:!0}),Ut.default=void 0;var Jt={id:"auto-start/base",before:["actions"],install:function(t){var e=t.interactStatic,n=t.defaults;t.usePlugin(Bt.default),n.base.actionChecker=null,n.base.styleCursor=!0,(0,M.default)(n.perAction,{manualStart:!1,max:1/0,maxPerElement:1,allowFrom:null,ignoreFrom:null,mouseButtons:1}),e.maxInteractions=function(e){return Ht(e,t)},t.autoStart={maxInteractions:1/0,withinInteractionLimit:$t,cursorElement:null}},listeners:{"interactions:down":function(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget;n.interacting()||Gt(n,qt(n,r,o,i,e),e)},"interactions:move":function(t,e){!function(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget;"mouse"!==n.pointerType||n.pointerIsDown||n.interacting()||Gt(n,qt(n,r,o,i,e),e)}(t,e),function(t,e){var n=t.interaction;if(n.pointerIsDown&&!n.interacting()&&n.pointerWasMoved&&n.prepared.name){e.fire("autoStart:before-start",t);var r=n.interactable,o=n.prepared.name;o&&r&&(r.options[o].manualStart||!$t(r,n.element,n.prepared,e)?n.stop():(n.start(n.prepared,r,n.element),Zt(n,e)))}}(t,e)},"interactions:stop":function(t,e){var n=t.interaction,r=n.interactable;r&&r.options.styleCursor&&Kt(n.element,"",e)}},maxInteractions:Ht,withinInteractionLimit:$t,validateAction:Vt},Qt=Jt;Ut.default=Qt;var te={};Object.defineProperty(te,"__esModule",{value:!0}),te.default=void 0;var ee={id:"auto-start/dragAxis",listeners:{"autoStart:before-start":function(t,e){var n=t.interaction,r=t.eventTarget,o=t.dx,a=t.dy;if("drag"===n.prepared.name){var s=Math.abs(o),l=Math.abs(a),u=n.interactable.options.drag,c=u.startAxis,f=s>l?"x":s<l?"y":"xy";if(n.prepared.axis="start"===u.lockAxis?f[0]:u.lockAxis,"xy"!==f&&"xy"!==c&&c!==f){n.prepared.name=null;for(var d=r,p=function(t){if(t!==n.interactable){var o=n.interactable.options.drag;if(!o.manualStart&&t.testIgnoreAllow(o,d,r)){var i=t.getAction(n.downPointer,n.downEvent,n,d);if(i&&"drag"===i.name&&function(t,e){if(!e)return!1;var n=e.options.drag.startAxis;return"xy"===t||"xy"===n||n===t}(f,t)&&Ut.default.validateAction(i,t,d,r,e))return t}}};i.default.element(d);){var v=e.interactables.forEachMatch(d,p);if(v){n.prepared.name="drag",n.interactable=v,n.element=d;break}d=(0,_.parentNode)(d)}}}}}};te.default=ee;var ne={};function re(t){var e=t.prepared&&t.prepared.name;if(!e)return null;var n=t.interactable.options;return n[e].hold||n[e].delay}Object.defineProperty(ne,"__esModule",{value:!0}),ne.default=void 0;var oe={id:"auto-start/hold",install:function(t){var e=t.defaults;t.usePlugin(Ut.default),e.perAction.hold=0,e.perAction.delay=0},listeners:{"interactions:new":function(t){t.interaction.autoStartHoldTimer=null},"autoStart:prepared":function(t){var e=t.interaction,n=re(e);n>0&&(e.autoStartHoldTimer=setTimeout((function(){e.start(e.prepared,e.interactable,e.element)}),n))},"interactions:move":function(t){var e=t.interaction,n=t.duplicate;e.autoStartHoldTimer&&e.pointerWasMoved&&!n&&(clearTimeout(e.autoStartHoldTimer),e.autoStartHoldTimer=null)},"autoStart:before-start":function(t){var e=t.interaction;re(e)>0&&(e.prepared.name=null)}},getHoldDuration:re},ie=oe;ne.default=ie;var ae={};Object.defineProperty(ae,"__esModule",{value:!0}),ae.default=void 0;var se={id:"auto-start",install:function(t){t.usePlugin(Ut.default),t.usePlugin(ne.default),t.usePlugin(te.default)}};ae.default=se;var le={};function ue(t){return/^(always|never|auto)$/.test(t)?(this.options.preventDefault=t,this):i.default.bool(t)?(this.options.preventDefault=t?"always":"never",this):this.options.preventDefault}function ce(t){var e=t.interaction,n=t.event;e.interactable&&e.interactable.checkAndPreventDefault(n)}function fe(t){var n=t.Interactable;n.prototype.preventDefault=ue,n.prototype.checkAndPreventDefault=function(n){return function(t,n,r){var o=t.options.preventDefault;if("never"!==o)if("always"!==o){if(n.events.supportsPassive&&/^touch(start|move)$/.test(r.type)){var a=(0,e.getWindow)(r.target).document,s=n.getDocOptions(a);if(!s||!s.events||!1!==s.events.passive)return}/^(mouse|pointer|touch)*(down|start)/i.test(r.type)||i.default.element(r.target)&&(0,_.matchesSelector)(r.target,"input,select,textarea,[contenteditable=true],[contenteditable=true] *")||r.preventDefault()}else r.preventDefault()}(this,t,n)},t.interactions.docEvents.push({type:"dragstart",listener:function(e){for(var n=0;n<t.interactions.list.length;n++){var r=t.interactions.list[n];if(r.element&&(r.element===e.target||(0,_.nodeContains)(r.element,e.target)))return void r.interactable.checkAndPreventDefault(e)}}})}Object.defineProperty(le,"__esModule",{value:!0}),le.default=void 0,le.install=fe;var de={id:"core/interactablePreventDefault",install:fe,listeners:["down","move","up","cancel"].reduce((function(t,e){return t["interactions:".concat(e)]=ce,t}),{})};le.default=de;var pe={};Object.defineProperty(pe,"__esModule",{value:!0}),pe.default=void 0,pe.default={};var ve,he={};Object.defineProperty(he,"__esModule",{value:!0}),he.default=void 0,function(t){t.touchAction="touchAction",t.boxSizing="boxSizing",t.noListeners="noListeners"}(ve||(ve={}));ve.touchAction,ve.boxSizing,ve.noListeners;var ge={id:"dev-tools",install:function(){}};he.default=ge;var ye={};Object.defineProperty(ye,"__esModule",{value:!0}),ye.default=function t(e){var n={};for(var r in e){var o=e[r];i.default.plainObject(o)?n[r]=t(o):i.default.array(o)?n[r]=H.from(o):n[r]=o}return n};var me={};function be(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],a=!0,s=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}}(t,e)||function(t,e){if(t){if("string"==typeof t)return xe(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?xe(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function xe(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}function we(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function _e(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(me,"__esModule",{value:!0}),me.default=void 0,me.getRectOffset=Ee;var Pe=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),_e(this,"states",[]),_e(this,"startOffset",{left:0,right:0,top:0,bottom:0}),_e(this,"startDelta",void 0),_e(this,"result",void 0),_e(this,"endResult",void 0),_e(this,"edges",void 0),_e(this,"interaction",void 0),this.interaction=e,this.result=Oe()}var e,n;return e=t,(n=[{key:"start",value:function(t,e){var n=t.phase,r=this.interaction,o=function(t){var e=t.interactable.options[t.prepared.name],n=e.modifiers;return n&&n.length?n:["snap","snapSize","snapEdges","restrict","restrictEdges","restrictSize"].map((function(t){var n=e[t];return n&&n.enabled&&{options:n,methods:n._methods}})).filter((function(t){return!!t}))}(r);this.prepareStates(o),this.edges=(0,M.default)({},r.edges),this.startOffset=Ee(r.rect,e),this.startDelta={x:0,y:0};var i=this.fillArg({phase:n,pageCoords:e,preEnd:!1});return this.result=Oe(),this.startAll(i),this.result=this.setAll(i)}},{key:"fillArg",value:function(t){var e=this.interaction;return t.interaction=e,t.interactable=e.interactable,t.element=e.element,t.rect=t.rect||e.rect,t.edges=this.edges,t.startOffset=this.startOffset,t}},{key:"startAll",value:function(t){for(var e=0;e<this.states.length;e++){var n=this.states[e];n.methods.start&&(t.state=n,n.methods.start(t))}}},{key:"setAll",value:function(t){var e=t.phase,n=t.preEnd,r=t.skipModifiers,o=t.rect;t.coords=(0,M.default)({},t.pageCoords),t.rect=(0,M.default)({},o);for(var i=r?this.states.slice(r):this.states,a=Oe(t.coords,t.rect),s=0;s<i.length;s++){var l,u=i[s],c=u.options,f=(0,M.default)({},t.coords),d=null;null!=(l=u.methods)&&l.set&&this.shouldDo(c,n,e)&&(t.state=u,d=u.methods.set(t),k.addEdges(this.interaction.edges,t.rect,{x:t.coords.x-f.x,y:t.coords.y-f.y})),a.eventProps.push(d)}a.delta.x=t.coords.x-t.pageCoords.x,a.delta.y=t.coords.y-t.pageCoords.y,a.rectDelta.left=t.rect.left-o.left,a.rectDelta.right=t.rect.right-o.right,a.rectDelta.top=t.rect.top-o.top,a.rectDelta.bottom=t.rect.bottom-o.bottom;var p=this.result.coords,v=this.result.rect;if(p&&v){var h=a.rect.left!==v.left||a.rect.right!==v.right||a.rect.top!==v.top||a.rect.bottom!==v.bottom;a.changed=h||p.x!==a.coords.x||p.y!==a.coords.y}return a}},{key:"applyToInteraction",value:function(t){var e=this.interaction,n=t.phase,r=e.coords.cur,o=e.coords.start,i=this.result,a=this.startDelta,s=i.delta;"start"===n&&(0,M.default)(this.startDelta,i.delta);for(var l=0;l<[[o,a],[r,s]].length;l++){var u=be([[o,a],[r,s]][l],2),c=u[0],f=u[1];c.page.x+=f.x,c.page.y+=f.y,c.client.x+=f.x,c.client.y+=f.y}var d=this.result.rectDelta,p=t.rect||e.rect;p.left+=d.left,p.right+=d.right,p.top+=d.top,p.bottom+=d.bottom,p.width=p.right-p.left,p.height=p.bottom-p.top}},{key:"setAndApply",value:function(t){var e=this.interaction,n=t.phase,r=t.preEnd,o=t.skipModifiers,i=this.setAll(this.fillArg({preEnd:r,phase:n,pageCoords:t.modifiedCoords||e.coords.cur.page}));if(this.result=i,!i.changed&&(!o||o<this.states.length)&&e.interacting())return!1;if(t.modifiedCoords){var a=e.coords.cur.page,s={x:t.modifiedCoords.x-a.x,y:t.modifiedCoords.y-a.y};i.coords.x+=s.x,i.coords.y+=s.y,i.delta.x+=s.x,i.delta.y+=s.y}this.applyToInteraction(t)}},{key:"beforeEnd",value:function(t){var e=t.interaction,n=t.event,r=this.states;if(r&&r.length){for(var o=!1,i=0;i<r.length;i++){var a=r[i];t.state=a;var s=a.options,l=a.methods,u=l.beforeEnd&&l.beforeEnd(t);if(u)return this.endResult=u,!1;o=o||!o&&this.shouldDo(s,!0,t.phase,!0)}o&&e.move({event:n,preEnd:!0})}}},{key:"stop",value:function(t){var e=t.interaction;if(this.states&&this.states.length){var n=(0,M.default)({states:this.states,interactable:e.interactable,element:e.element,rect:null},t);this.fillArg(n);for(var r=0;r<this.states.length;r++){var o=this.states[r];n.state=o,o.methods.stop&&o.methods.stop(n)}this.states=null,this.endResult=null}}},{key:"prepareStates",value:function(t){this.states=[];for(var e=0;e<t.length;e++){var n=t[e],r=n.options,o=n.methods,i=n.name;this.states.push({options:r,methods:o,index:e,name:i})}return this.states}},{key:"restoreInteractionCoords",value:function(t){var e=t.interaction,n=e.coords,r=e.rect,o=e.modification;if(o.result){for(var i=o.startDelta,a=o.result,s=a.delta,l=a.rectDelta,u=[[n.start,i],[n.cur,s]],c=0;c<u.length;c++){var f=be(u[c],2),d=f[0],p=f[1];d.page.x-=p.x,d.page.y-=p.y,d.client.x-=p.x,d.client.y-=p.y}r.left-=l.left,r.right-=l.right,r.top-=l.top,r.bottom-=l.bottom}}},{key:"shouldDo",value:function(t,e,n,r){return!(!t||!1===t.enabled||r&&!t.endOnly||t.endOnly&&!e||"start"===n&&!t.setStart)}},{key:"copyFrom",value:function(t){this.startOffset=t.startOffset,this.startDelta=t.startDelta,this.edges=t.edges,this.states=t.states.map((function(t){return(0,ye.default)(t)})),this.result=Oe((0,M.default)({},t.result.coords),(0,M.default)({},t.result.rect))}},{key:"destroy",value:function(){for(var t in this)this[t]=null}}])&&we(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function Oe(t,e){return{rect:e,coords:t,delta:{x:0,y:0},rectDelta:{left:0,right:0,top:0,bottom:0},eventProps:[],changed:!0}}function Ee(t,e){return t?{left:e.x-t.left,top:e.y-t.top,right:t.right-e.x,bottom:t.bottom-e.y}:{left:0,top:0,right:0,bottom:0}}me.default=Pe;var Se={};function Te(t){var e=t.iEvent,n=t.interaction.modification.result;n&&(e.modifiers=n.eventProps)}Object.defineProperty(Se,"__esModule",{value:!0}),Se.addEventModifiers=Te,Se.default=void 0,Se.makeModifier=function(t,e){var n=t.defaults,r={start:t.start,set:t.set,beforeEnd:t.beforeEnd,stop:t.stop},o=function(t){var o=t||{};for(var i in o.enabled=!1!==o.enabled,n)i in o||(o[i]=n[i]);var a={options:o,methods:r,name:e,enable:function(){return o.enabled=!0,a},disable:function(){return o.enabled=!1,a}};return a};return e&&"string"==typeof e&&(o._defaults=n,o._methods=r),o};var je={id:"modifiers/base",before:["actions"],install:function(t){t.defaults.perAction.modifiers=[]},listeners:{"interactions:new":function(t){var e=t.interaction;e.modification=new me.default(e)},"interactions:before-action-start":function(t){var e=t.interaction.modification;e.start(t,t.interaction.coords.start.page),t.interaction.edges=e.edges,e.applyToInteraction(t)},"interactions:before-action-move":function(t){return t.interaction.modification.setAndApply(t)},"interactions:before-action-end":function(t){return t.interaction.modification.beforeEnd(t)},"interactions:action-start":Te,"interactions:action-move":Te,"interactions:action-end":Te,"interactions:after-action-start":function(t){return t.interaction.modification.restoreInteractionCoords(t)},"interactions:after-action-move":function(t){return t.interaction.modification.restoreInteractionCoords(t)},"interactions:stop":function(t){return t.interaction.modification.stop(t)}}},Me=je;Se.default=Me;var ke={};Object.defineProperty(ke,"__esModule",{value:!0}),ke.defaults=void 0,ke.defaults={base:{preventDefault:"auto",deltaSource:"page"},perAction:{enabled:!1,origin:{x:0,y:0}},actions:{}};var Ie={};function De(t){return De="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},De(t)}function Ae(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function ze(t,e){return ze=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},ze(t,e)}function Ce(t,e){if(e&&("object"===De(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return Re(t)}function Re(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function Fe(t){return Fe=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},Fe(t)}function Xe(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(Ie,"__esModule",{value:!0}),Ie.InteractEvent=void 0;var Be=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&ze(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=Fe(r);if(o){var n=Fe(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return Ce(this,t)});function a(t,e,n,r,o,s,l){var u;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),Xe(Re(u=i.call(this,t)),"relatedTarget",null),Xe(Re(u),"screenX",void 0),Xe(Re(u),"screenY",void 0),Xe(Re(u),"button",void 0),Xe(Re(u),"buttons",void 0),Xe(Re(u),"ctrlKey",void 0),Xe(Re(u),"shiftKey",void 0),Xe(Re(u),"altKey",void 0),Xe(Re(u),"metaKey",void 0),Xe(Re(u),"page",void 0),Xe(Re(u),"client",void 0),Xe(Re(u),"delta",void 0),Xe(Re(u),"rect",void 0),Xe(Re(u),"x0",void 0),Xe(Re(u),"y0",void 0),Xe(Re(u),"t0",void 0),Xe(Re(u),"dt",void 0),Xe(Re(u),"duration",void 0),Xe(Re(u),"clientX0",void 0),Xe(Re(u),"clientY0",void 0),Xe(Re(u),"velocity",void 0),Xe(Re(u),"speed",void 0),Xe(Re(u),"swipe",void 0),Xe(Re(u),"axes",void 0),Xe(Re(u),"preEnd",void 0),o=o||t.element;var c=t.interactable,f=(c&&c.options||ke.defaults).deltaSource,d=(0,A.default)(c,o,n),p="start"===r,v="end"===r,h=p?Re(u):t.prevEvent,g=p?t.coords.start:v?{page:h.page,client:h.client,timeStamp:t.coords.cur.timeStamp}:t.coords.cur;return u.page=(0,M.default)({},g.page),u.client=(0,M.default)({},g.client),u.rect=(0,M.default)({},t.rect),u.timeStamp=g.timeStamp,v||(u.page.x-=d.x,u.page.y-=d.y,u.client.x-=d.x,u.client.y-=d.y),u.ctrlKey=e.ctrlKey,u.altKey=e.altKey,u.shiftKey=e.shiftKey,u.metaKey=e.metaKey,u.button=e.button,u.buttons=e.buttons,u.target=o,u.currentTarget=o,u.preEnd=s,u.type=l||n+(r||""),u.interactable=c,u.t0=p?t.pointers[t.pointers.length-1].downTime:h.t0,u.x0=t.coords.start.page.x-d.x,u.y0=t.coords.start.page.y-d.y,u.clientX0=t.coords.start.client.x-d.x,u.clientY0=t.coords.start.client.y-d.y,u.delta=p||v?{x:0,y:0}:{x:u[f].x-h[f].x,y:u[f].y-h[f].y},u.dt=t.coords.delta.timeStamp,u.duration=u.timeStamp-u.t0,u.velocity=(0,M.default)({},t.coords.velocity[f]),u.speed=(0,R.default)(u.velocity.x,u.velocity.y),u.swipe=v||"inertiastart"===r?u.getSwipe():null,u}return e=a,(n=[{key:"getSwipe",value:function(){var t=this._interaction;if(t.prevEvent.speed<600||this.timeStamp-t.prevEvent.timeStamp>150)return null;var e=180*Math.atan2(t.prevEvent.velocityY,t.prevEvent.velocityX)/Math.PI;e<0&&(e+=360);var n=112.5<=e&&e<247.5,r=202.5<=e&&e<337.5;return{up:r,down:!r&&22.5<=e&&e<157.5,left:n,right:!n&&(292.5<=e||e<67.5),angle:e,speed:t.prevEvent.speed,velocity:{x:t.prevEvent.velocityX,y:t.prevEvent.velocityY}}}},{key:"preventDefault",value:function(){}},{key:"stopImmediatePropagation",value:function(){this.immediatePropagationStopped=this.propagationStopped=!0}},{key:"stopPropagation",value:function(){this.propagationStopped=!0}}])&&Ae(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(N.BaseEvent);Ie.InteractEvent=Be,Object.defineProperties(Be.prototype,{pageX:{get:function(){return this.page.x},set:function(t){this.page.x=t}},pageY:{get:function(){return this.page.y},set:function(t){this.page.y=t}},clientX:{get:function(){return this.client.x},set:function(t){this.client.x=t}},clientY:{get:function(){return this.client.y},set:function(t){this.client.y=t}},dx:{get:function(){return this.delta.x},set:function(t){this.delta.x=t}},dy:{get:function(){return this.delta.y},set:function(t){this.delta.y=t}},velocityX:{get:function(){return this.velocity.x},set:function(t){this.velocity.x=t}},velocityY:{get:function(){return this.velocity.y},set:function(t){this.velocity.y=t}}});var Ye={};function We(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Le(t,e,n){return e&&We(t.prototype,e),n&&We(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function Ue(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(Ye,"__esModule",{value:!0}),Ye.PointerInfo=void 0;var Ve=Le((function t(e,n,r,o,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),Ue(this,"id",void 0),Ue(this,"pointer",void 0),Ue(this,"event",void 0),Ue(this,"downTime",void 0),Ue(this,"downTarget",void 0),this.id=e,this.pointer=n,this.event=r,this.downTime=o,this.downTarget=i}));Ye.PointerInfo=Ve;var Ne,qe,Ge={};function $e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function He(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(Ge,"__esModule",{value:!0}),Ge.Interaction=void 0,Object.defineProperty(Ge,"PointerInfo",{enumerable:!0,get:function(){return Ye.PointerInfo}}),Ge.default=Ge._ProxyValues=Ge._ProxyMethods=void 0,Ge._ProxyValues=Ne,function(t){t.interactable="",t.element="",t.prepared="",t.pointerIsDown="",t.pointerWasMoved="",t._proxy=""}(Ne||(Ge._ProxyValues=Ne={})),Ge._ProxyMethods=qe,function(t){t.start="",t.move="",t.end="",t.stop="",t.interacting=""}(qe||(Ge._ProxyMethods=qe={}));var Ke=0,Ze=function(){function t(e){var n=this,r=e.pointerType,o=e.scopeFire;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),He(this,"interactable",null),He(this,"element",null),He(this,"rect",null),He(this,"_rects",void 0),He(this,"edges",null),He(this,"_scopeFire",void 0),He(this,"prepared",{name:null,axis:null,edges:null}),He(this,"pointerType",void 0),He(this,"pointers",[]),He(this,"downEvent",null),He(this,"downPointer",{}),He(this,"_latestPointer",{pointer:null,event:null,eventTarget:null}),He(this,"prevEvent",null),He(this,"pointerIsDown",!1),He(this,"pointerWasMoved",!1),He(this,"_interacting",!1),He(this,"_ending",!1),He(this,"_stopped",!0),He(this,"_proxy",null),He(this,"simulation",null),He(this,"doMove",(0,Xt.warnOnce)((function(t){this.move(t)}),"The interaction.doMove() method has been renamed to interaction.move()")),He(this,"coords",{start:X.newCoords(),prev:X.newCoords(),cur:X.newCoords(),delta:X.newCoords(),velocity:X.newCoords()}),He(this,"_id",Ke++),this._scopeFire=o,this.pointerType=r;var i=this;this._proxy={};var a=function(t){Object.defineProperty(n._proxy,t,{get:function(){return i[t]}})};for(var s in Ne)a(s);var l=function(t){Object.defineProperty(n._proxy,t,{value:function(){return i[t].apply(i,arguments)}})};for(var u in qe)l(u);this._scopeFire("interactions:new",{interaction:this})}var e,n;return e=t,n=[{key:"pointerMoveTolerance",get:function(){return 1}},{key:"pointerDown",value:function(t,e,n){var r=this.updatePointer(t,e,n,!0),o=this.pointers[r];this._scopeFire("interactions:down",{pointer:t,event:e,eventTarget:n,pointerIndex:r,pointerInfo:o,type:"down",interaction:this})}},{key:"start",value:function(t,e,n){return!(this.interacting()||!this.pointerIsDown||this.pointers.length<("gesture"===t.name?2:1)||!e.options[t.name].enabled)&&((0,Xt.copyAction)(this.prepared,t),this.interactable=e,this.element=n,this.rect=e.getRect(n),this.edges=this.prepared.edges?(0,M.default)({},this.prepared.edges):{left:!0,right:!0,top:!0,bottom:!0},this._stopped=!1,this._interacting=this._doPhase({interaction:this,event:this.downEvent,phase:"start"})&&!this._stopped,this._interacting)}},{key:"pointerMove",value:function(t,e,n){this.simulation||this.modification&&this.modification.endResult||this.updatePointer(t,e,n,!1);var r,o,i=this.coords.cur.page.x===this.coords.prev.page.x&&this.coords.cur.page.y===this.coords.prev.page.y&&this.coords.cur.client.x===this.coords.prev.client.x&&this.coords.cur.client.y===this.coords.prev.client.y;this.pointerIsDown&&!this.pointerWasMoved&&(r=this.coords.cur.client.x-this.coords.start.client.x,o=this.coords.cur.client.y-this.coords.start.client.y,this.pointerWasMoved=(0,R.default)(r,o)>this.pointerMoveTolerance);var a=this.getPointerIndex(t),s={pointer:t,pointerIndex:a,pointerInfo:this.pointers[a],event:e,type:"move",eventTarget:n,dx:r,dy:o,duplicate:i,interaction:this};i||X.setCoordVelocity(this.coords.velocity,this.coords.delta),this._scopeFire("interactions:move",s),i||this.simulation||(this.interacting()&&(s.type=null,this.move(s)),this.pointerWasMoved&&X.copyCoords(this.coords.prev,this.coords.cur))}},{key:"move",value:function(t){t&&t.event||X.setZeroCoords(this.coords.delta),(t=(0,M.default)({pointer:this._latestPointer.pointer,event:this._latestPointer.event,eventTarget:this._latestPointer.eventTarget,interaction:this},t||{})).phase="move",this._doPhase(t)}},{key:"pointerUp",value:function(t,e,n,r){var o=this.getPointerIndex(t);-1===o&&(o=this.updatePointer(t,e,n,!1));var i=/cancel$/i.test(e.type)?"cancel":"up";this._scopeFire("interactions:".concat(i),{pointer:t,pointerIndex:o,pointerInfo:this.pointers[o],event:e,eventTarget:n,type:i,curEventTarget:r,interaction:this}),this.simulation||this.end(e),this.removePointer(t,e)}},{key:"documentBlur",value:function(t){this.end(t),this._scopeFire("interactions:blur",{event:t,type:"blur",interaction:this})}},{key:"end",value:function(t){var e;this._ending=!0,t=t||this._latestPointer.event,this.interacting()&&(e=this._doPhase({event:t,interaction:this,phase:"end"})),this._ending=!1,!0===e&&this.stop()}},{key:"currentAction",value:function(){return this._interacting?this.prepared.name:null}},{key:"interacting",value:function(){return this._interacting}},{key:"stop",value:function(){this._scopeFire("interactions:stop",{interaction:this}),this.interactable=this.element=null,this._interacting=!1,this._stopped=!0,this.prepared.name=this.prevEvent=null}},{key:"getPointerIndex",value:function(t){var e=X.getPointerId(t);return"mouse"===this.pointerType||"pen"===this.pointerType?this.pointers.length-1:H.findIndex(this.pointers,(function(t){return t.id===e}))}},{key:"getPointerInfo",value:function(t){return this.pointers[this.getPointerIndex(t)]}},{key:"updatePointer",value:function(t,e,n,r){var o=X.getPointerId(t),i=this.getPointerIndex(t),a=this.pointers[i];return r=!1!==r&&(r||/(down|start)$/i.test(e.type)),a?a.pointer=t:(a=new Ye.PointerInfo(o,t,e,null,null),i=this.pointers.length,this.pointers.push(a)),X.setCoords(this.coords.cur,this.pointers.map((function(t){return t.pointer})),this._now()),X.setCoordDeltas(this.coords.delta,this.coords.prev,this.coords.cur),r&&(this.pointerIsDown=!0,a.downTime=this.coords.cur.timeStamp,a.downTarget=n,X.pointerExtend(this.downPointer,t),this.interacting()||(X.copyCoords(this.coords.start,this.coords.cur),X.copyCoords(this.coords.prev,this.coords.cur),this.downEvent=e,this.pointerWasMoved=!1)),this._updateLatestPointer(t,e,n),this._scopeFire("interactions:update-pointer",{pointer:t,event:e,eventTarget:n,down:r,pointerInfo:a,pointerIndex:i,interaction:this}),i}},{key:"removePointer",value:function(t,e){var n=this.getPointerIndex(t);if(-1!==n){var r=this.pointers[n];this._scopeFire("interactions:remove-pointer",{pointer:t,event:e,eventTarget:null,pointerIndex:n,pointerInfo:r,interaction:this}),this.pointers.splice(n,1),this.pointerIsDown=!1}}},{key:"_updateLatestPointer",value:function(t,e,n){this._latestPointer.pointer=t,this._latestPointer.event=e,this._latestPointer.eventTarget=n}},{key:"destroy",value:function(){this._latestPointer.pointer=null,this._latestPointer.event=null,this._latestPointer.eventTarget=null}},{key:"_createPreparedEvent",value:function(t,e,n,r){return new Ie.InteractEvent(this,t,this.prepared.name,e,this.element,n,r)}},{key:"_fireEvent",value:function(t){var e;null==(e=this.interactable)||e.fire(t),(!this.prevEvent||t.timeStamp>=this.prevEvent.timeStamp)&&(this.prevEvent=t)}},{key:"_doPhase",value:function(t){var e=t.event,n=t.phase,r=t.preEnd,o=t.type,i=this.rect;if(i&&"move"===n&&(k.addEdges(this.edges,i,this.coords.delta[this.interactable.options.deltaSource]),i.width=i.right-i.left,i.height=i.bottom-i.top),!1===this._scopeFire("interactions:before-action-".concat(n),t))return!1;var a=t.iEvent=this._createPreparedEvent(e,n,r,o);return this._scopeFire("interactions:action-".concat(n),t),"start"===n&&(this.prevEvent=a),this._fireEvent(a),this._scopeFire("interactions:after-action-".concat(n),t),!0}},{key:"_now",value:function(){return Date.now()}}],n&&$e(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();Ge.Interaction=Ze;var Je=Ze;Ge.default=Je;var Qe={};function tn(t){t.pointerIsDown&&(on(t.coords.cur,t.offset.total),t.offset.pending.x=0,t.offset.pending.y=0)}function en(t){nn(t.interaction)}function nn(t){if(!function(t){return!(!t.offset.pending.x&&!t.offset.pending.y)}(t))return!1;var e=t.offset.pending;return on(t.coords.cur,e),on(t.coords.delta,e),k.addEdges(t.edges,t.rect,e),e.x=0,e.y=0,!0}function rn(t){var e=t.x,n=t.y;this.offset.pending.x+=e,this.offset.pending.y+=n,this.offset.total.x+=e,this.offset.total.y+=n}function on(t,e){var n=t.page,r=t.client,o=e.x,i=e.y;n.x+=o,n.y+=i,r.x+=o,r.y+=i}Object.defineProperty(Qe,"__esModule",{value:!0}),Qe.addTotal=tn,Qe.applyPending=nn,Qe.default=void 0,Ge._ProxyMethods.offsetBy="";var an={id:"offset",before:["modifiers","pointer-events","actions","inertia"],install:function(t){t.Interaction.prototype.offsetBy=rn},listeners:{"interactions:new":function(t){t.interaction.offset={total:{x:0,y:0},pending:{x:0,y:0}}},"interactions:update-pointer":function(t){return tn(t.interaction)},"interactions:before-action-start":en,"interactions:before-action-move":en,"interactions:before-action-end":function(t){var e=t.interaction;if(nn(e))return e.move({offset:!0}),e.end(),!1},"interactions:stop":function(t){var e=t.interaction;e.offset.total.x=0,e.offset.total.y=0,e.offset.pending.x=0,e.offset.pending.y=0}}},sn=an;Qe.default=sn;var ln={};function un(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function cn(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(ln,"__esModule",{value:!0}),ln.default=ln.InertiaState=void 0;var fn=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),cn(this,"active",!1),cn(this,"isModified",!1),cn(this,"smoothEnd",!1),cn(this,"allowResume",!1),cn(this,"modification",void 0),cn(this,"modifierCount",0),cn(this,"modifierArg",void 0),cn(this,"startCoords",void 0),cn(this,"t0",0),cn(this,"v0",0),cn(this,"te",0),cn(this,"targetOffset",void 0),cn(this,"modifiedOffset",void 0),cn(this,"currentOffset",void 0),cn(this,"lambda_v0",0),cn(this,"one_ve_v0",0),cn(this,"timeout",void 0),cn(this,"interaction",void 0),this.interaction=e}var e,n;return e=t,(n=[{key:"start",value:function(t){var e=this.interaction,n=dn(e);if(!n||!n.enabled)return!1;var r=e.coords.velocity.client,o=(0,R.default)(r.x,r.y),i=this.modification||(this.modification=new me.default(e));if(i.copyFrom(e.modification),this.t0=e._now(),this.allowResume=n.allowResume,this.v0=o,this.currentOffset={x:0,y:0},this.startCoords=e.coords.cur.page,this.modifierArg=i.fillArg({pageCoords:this.startCoords,preEnd:!0,phase:"inertiastart"}),this.t0-e.coords.cur.timeStamp<50&&o>n.minSpeed&&o>n.endSpeed)this.startInertia();else{if(i.result=i.setAll(this.modifierArg),!i.result.changed)return!1;this.startSmoothEnd()}return e.modification.result.rect=null,e.offsetBy(this.targetOffset),e._doPhase({interaction:e,event:t,phase:"inertiastart"}),e.offsetBy({x:-this.targetOffset.x,y:-this.targetOffset.y}),e.modification.result.rect=null,this.active=!0,e.simulation=this,!0}},{key:"startInertia",value:function(){var t=this,e=this.interaction.coords.velocity.client,n=dn(this.interaction),r=n.resistance,o=-Math.log(n.endSpeed/this.v0)/r;this.targetOffset={x:(e.x-o)/r,y:(e.y-o)/r},this.te=o,this.lambda_v0=r/this.v0,this.one_ve_v0=1-n.endSpeed/this.v0;var i=this.modification,a=this.modifierArg;a.pageCoords={x:this.startCoords.x+this.targetOffset.x,y:this.startCoords.y+this.targetOffset.y},i.result=i.setAll(a),i.result.changed&&(this.isModified=!0,this.modifiedOffset={x:this.targetOffset.x+i.result.delta.x,y:this.targetOffset.y+i.result.delta.y}),this.onNextFrame((function(){return t.inertiaTick()}))}},{key:"startSmoothEnd",value:function(){var t=this;this.smoothEnd=!0,this.isModified=!0,this.targetOffset={x:this.modification.result.delta.x,y:this.modification.result.delta.y},this.onNextFrame((function(){return t.smoothEndTick()}))}},{key:"onNextFrame",value:function(t){var e=this;this.timeout=Tt.default.request((function(){e.active&&t()}))}},{key:"inertiaTick",value:function(){var t,e,n,r,o,i=this,a=this.interaction,s=dn(a).resistance,l=(a._now()-this.t0)/1e3;if(l<this.te){var u,c=1-(Math.exp(-s*l)-this.lambda_v0)/this.one_ve_v0;this.isModified?(0,0,t=this.targetOffset.x,e=this.targetOffset.y,n=this.modifiedOffset.x,r=this.modifiedOffset.y,u={x:vn(o=c,0,t,n),y:vn(o,0,e,r)}):u={x:this.targetOffset.x*c,y:this.targetOffset.y*c};var f={x:u.x-this.currentOffset.x,y:u.y-this.currentOffset.y};this.currentOffset.x+=f.x,this.currentOffset.y+=f.y,a.offsetBy(f),a.move(),this.onNextFrame((function(){return i.inertiaTick()}))}else a.offsetBy({x:this.modifiedOffset.x-this.currentOffset.x,y:this.modifiedOffset.y-this.currentOffset.y}),this.end()}},{key:"smoothEndTick",value:function(){var t=this,e=this.interaction,n=e._now()-this.t0,r=dn(e).smoothEndDuration;if(n<r){var o={x:hn(n,0,this.targetOffset.x,r),y:hn(n,0,this.targetOffset.y,r)},i={x:o.x-this.currentOffset.x,y:o.y-this.currentOffset.y};this.currentOffset.x+=i.x,this.currentOffset.y+=i.y,e.offsetBy(i),e.move({skipModifiers:this.modifierCount}),this.onNextFrame((function(){return t.smoothEndTick()}))}else e.offsetBy({x:this.targetOffset.x-this.currentOffset.x,y:this.targetOffset.y-this.currentOffset.y}),this.end()}},{key:"resume",value:function(t){var e=t.pointer,n=t.event,r=t.eventTarget,o=this.interaction;o.offsetBy({x:-this.currentOffset.x,y:-this.currentOffset.y}),o.updatePointer(e,n,r,!0),o._doPhase({interaction:o,event:n,phase:"resume"}),(0,X.copyCoords)(o.coords.prev,o.coords.cur),this.stop()}},{key:"end",value:function(){this.interaction.move(),this.interaction.end(),this.stop()}},{key:"stop",value:function(){this.active=this.smoothEnd=!1,this.interaction.simulation=null,Tt.default.cancel(this.timeout)}}])&&un(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function dn(t){var e=t.interactable,n=t.prepared;return e&&e.options&&n.name&&e.options[n.name].inertia}ln.InertiaState=fn;var pn={id:"inertia",before:["modifiers","actions"],install:function(t){var e=t.defaults;t.usePlugin(Qe.default),t.usePlugin(Se.default),t.actions.phases.inertiastart=!0,t.actions.phases.resume=!0,e.perAction.inertia={enabled:!1,resistance:10,minSpeed:100,endSpeed:10,allowResume:!0,smoothEndDuration:300}},listeners:{"interactions:new":function(t){var e=t.interaction;e.inertia=new fn(e)},"interactions:before-action-end":function(t){var e=t.interaction,n=t.event;return(!e._interacting||e.simulation||!e.inertia.start(n))&&null},"interactions:down":function(t){var e=t.interaction,n=t.eventTarget,r=e.inertia;if(r.active)for(var o=n;i.default.element(o);){if(o===e.element){r.resume(t);break}o=_.parentNode(o)}},"interactions:stop":function(t){var e=t.interaction.inertia;e.active&&e.stop()},"interactions:before-action-resume":function(t){var e=t.interaction.modification;e.stop(t),e.start(t,t.interaction.coords.cur.page),e.applyToInteraction(t)},"interactions:before-action-inertiastart":function(t){return t.interaction.modification.setAndApply(t)},"interactions:action-resume":Se.addEventModifiers,"interactions:action-inertiastart":Se.addEventModifiers,"interactions:after-action-inertiastart":function(t){return t.interaction.modification.restoreInteractionCoords(t)},"interactions:after-action-resume":function(t){return t.interaction.modification.restoreInteractionCoords(t)}}};function vn(t,e,n,r){var o=1-t;return o*o*e+2*o*t*n+t*t*r}function hn(t,e,n,r){return-n*(t/=r)*(t-2)+e}var gn=pn;ln.default=gn;var yn={};function mn(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function bn(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function xn(t,e){for(var n=0;n<e.length;n++){var r=e[n];if(t.immediatePropagationStopped)break;r(t)}}Object.defineProperty(yn,"__esModule",{value:!0}),yn.Eventable=void 0;var wn=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),bn(this,"options",void 0),bn(this,"types",{}),bn(this,"propagationStopped",!1),bn(this,"immediatePropagationStopped",!1),bn(this,"global",void 0),this.options=(0,M.default)({},e||{})}var e,n;return e=t,(n=[{key:"fire",value:function(t){var e,n=this.global;(e=this.types[t.type])&&xn(t,e),!t.propagationStopped&&n&&(e=n[t.type])&&xn(t,e)}},{key:"on",value:function(t,e){var n=(0,z.default)(t,e);for(t in n)this.types[t]=H.merge(this.types[t]||[],n[t])}},{key:"off",value:function(t,e){var n=(0,z.default)(t,e);for(t in n){var r=this.types[t];if(r&&r.length)for(var o=0;o<n[t].length;o++){var i=n[t][o],a=r.indexOf(i);-1!==a&&r.splice(a,1)}}}},{key:"getRect",value:function(t){return null}}])&&mn(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();yn.Eventable=wn;var _n={};Object.defineProperty(_n,"__esModule",{value:!0}),_n.default=function(t,e){if(e.phaselessTypes[t])return!0;for(var n in e.map)if(0===t.indexOf(n)&&t.substr(n.length)in e.phases)return!0;return!1};var Pn={};Object.defineProperty(Pn,"__esModule",{value:!0}),Pn.createInteractStatic=function(t){var e=function e(n,r){var o=t.interactables.get(n,r);return o||((o=t.interactables.new(n,r)).events.global=e.globalEvents),o};return e.getPointerAverage=X.pointerAverage,e.getTouchBBox=X.touchBBox,e.getTouchDistance=X.touchDistance,e.getTouchAngle=X.touchAngle,e.getElementRect=_.getElementRect,e.getElementClientRect=_.getElementClientRect,e.matchesSelector=_.matchesSelector,e.closest=_.closest,e.globalEvents={},e.version="1.10.17",e.scope=t,e.use=function(t,e){return this.scope.usePlugin(t,e),this},e.isSet=function(t,e){return!!this.scope.interactables.get(t,e&&e.context)},e.on=(0,Xt.warnOnce)((function(t,e,n){if(i.default.string(t)&&-1!==t.search(" ")&&(t=t.trim().split(/ +/)),i.default.array(t)){for(var r=0;r<t.length;r++){var o=t[r];this.on(o,e,n)}return this}if(i.default.object(t)){for(var a in t)this.on(a,t[a],e);return this}return(0,_n.default)(t,this.scope.actions)?this.globalEvents[t]?this.globalEvents[t].push(e):this.globalEvents[t]=[e]:this.scope.events.add(this.scope.document,t,e,{options:n}),this}),"The interact.on() method is being deprecated"),e.off=(0,Xt.warnOnce)((function(t,e,n){if(i.default.string(t)&&-1!==t.search(" ")&&(t=t.trim().split(/ +/)),i.default.array(t)){for(var r=0;r<t.length;r++){var o=t[r];this.off(o,e,n)}return this}if(i.default.object(t)){for(var a in t)this.off(a,t[a],e);return this}var s;return(0,_n.default)(t,this.scope.actions)?t in this.globalEvents&&-1!==(s=this.globalEvents[t].indexOf(e))&&this.globalEvents[t].splice(s,1):this.scope.events.remove(this.scope.document,t,e,n),this}),"The interact.off() method is being deprecated"),e.debug=function(){return this.scope},e.supportsTouch=function(){return b.default.supportsTouch},e.supportsPointerEvent=function(){return b.default.supportsPointerEvent},e.stop=function(){for(var t=0;t<this.scope.interactions.list.length;t++)this.scope.interactions.list[t].stop();return this},e.pointerMoveTolerance=function(t){return i.default.number(t)?(this.scope.interactions.pointerMoveTolerance=t,this):this.scope.interactions.pointerMoveTolerance},e.addDocument=function(t,e){this.scope.addDocument(t,e)},e.removeDocument=function(t){this.scope.removeDocument(t)},e};var On={};function En(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Sn(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(On,"__esModule",{value:!0}),On.Interactable=void 0;var Tn=function(){function t(n,r,o,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),Sn(this,"options",void 0),Sn(this,"_actions",void 0),Sn(this,"target",void 0),Sn(this,"events",new yn.Eventable),Sn(this,"_context",void 0),Sn(this,"_win",void 0),Sn(this,"_doc",void 0),Sn(this,"_scopeEvents",void 0),Sn(this,"_rectChecker",void 0),this._actions=r.actions,this.target=n,this._context=r.context||o,this._win=(0,e.getWindow)((0,_.trySelector)(n)?this._context:n),this._doc=this._win.document,this._scopeEvents=i,this.set(r)}var n,r;return n=t,(r=[{key:"_defaults",get:function(){return{base:{},perAction:{},actions:{}}}},{key:"setOnEvents",value:function(t,e){return i.default.func(e.onstart)&&this.on("".concat(t,"start"),e.onstart),i.default.func(e.onmove)&&this.on("".concat(t,"move"),e.onmove),i.default.func(e.onend)&&this.on("".concat(t,"end"),e.onend),i.default.func(e.oninertiastart)&&this.on("".concat(t,"inertiastart"),e.oninertiastart),this}},{key:"updatePerActionListeners",value:function(t,e,n){(i.default.array(e)||i.default.object(e))&&this.off(t,e),(i.default.array(n)||i.default.object(n))&&this.on(t,n)}},{key:"setPerAction",value:function(t,e){var n=this._defaults;for(var r in e){var o=r,a=this.options[t],s=e[o];"listeners"===o&&this.updatePerActionListeners(t,a.listeners,s),i.default.array(s)?a[o]=H.from(s):i.default.plainObject(s)?(a[o]=(0,M.default)(a[o]||{},(0,ye.default)(s)),i.default.object(n.perAction[o])&&"enabled"in n.perAction[o]&&(a[o].enabled=!1!==s.enabled)):i.default.bool(s)&&i.default.object(n.perAction[o])?a[o].enabled=s:a[o]=s}}},{key:"getRect",value:function(t){return t=t||(i.default.element(this.target)?this.target:null),i.default.string(this.target)&&(t=t||this._context.querySelector(this.target)),(0,_.getElementRect)(t)}},{key:"rectChecker",value:function(t){var e=this;return i.default.func(t)?(this._rectChecker=t,this.getRect=function(t){var n=(0,M.default)({},e._rectChecker(t));return"width"in n||(n.width=n.right-n.left,n.height=n.bottom-n.top),n},this):null===t?(delete this.getRect,delete this._rectChecker,this):this.getRect}},{key:"_backCompatOption",value:function(t,e){if((0,_.trySelector)(e)||i.default.object(e)){for(var n in this.options[t]=e,this._actions.map)this.options[n][t]=e;return this}return this.options[t]}},{key:"origin",value:function(t){return this._backCompatOption("origin",t)}},{key:"deltaSource",value:function(t){return"page"===t||"client"===t?(this.options.deltaSource=t,this):this.options.deltaSource}},{key:"context",value:function(){return this._context}},{key:"inContext",value:function(t){return this._context===t.ownerDocument||(0,_.nodeContains)(this._context,t)}},{key:"testIgnoreAllow",value:function(t,e,n){return!this.testIgnore(t.ignoreFrom,e,n)&&this.testAllow(t.allowFrom,e,n)}},{key:"testAllow",value:function(t,e,n){return!t||!!i.default.element(n)&&(i.default.string(t)?(0,_.matchesUpTo)(n,t,e):!!i.default.element(t)&&(0,_.nodeContains)(t,n))}},{key:"testIgnore",value:function(t,e,n){return!(!t||!i.default.element(n))&&(i.default.string(t)?(0,_.matchesUpTo)(n,t,e):!!i.default.element(t)&&(0,_.nodeContains)(t,n))}},{key:"fire",value:function(t){return this.events.fire(t),this}},{key:"_onOff",value:function(t,e,n,r){i.default.object(e)&&!i.default.array(e)&&(r=n,n=null);var o="on"===t?"add":"remove",a=(0,z.default)(e,n);for(var s in a){"wheel"===s&&(s=b.default.wheelEvent);for(var l=0;l<a[s].length;l++){var u=a[s][l];(0,_n.default)(s,this._actions)?this.events[t](s,u):i.default.string(this.target)?this._scopeEvents["".concat(o,"Delegate")](this.target,this._context,s,u,r):this._scopeEvents[o](this.target,s,u,r)}}return this}},{key:"on",value:function(t,e,n){return this._onOff("on",t,e,n)}},{key:"off",value:function(t,e,n){return this._onOff("off",t,e,n)}},{key:"set",value:function(t){var e=this._defaults;for(var n in i.default.object(t)||(t={}),this.options=(0,ye.default)(e.base),this._actions.methodDict){var r=n,o=this._actions.methodDict[r];this.options[r]={},this.setPerAction(r,(0,M.default)((0,M.default)({},e.perAction),e.actions[r])),this[o](t[r])}for(var a in t)i.default.func(this[a])&&this[a](t[a]);return this}},{key:"unset",value:function(){if(i.default.string(this.target))for(var t in this._scopeEvents.delegatedEvents)for(var e=this._scopeEvents.delegatedEvents[t],n=e.length-1;n>=0;n--){var r=e[n],o=r.selector,a=r.context,s=r.listeners;o===this.target&&a===this._context&&e.splice(n,1);for(var l=s.length-1;l>=0;l--)this._scopeEvents.removeDelegate(this.target,this._context,t,s[l][0],s[l][1])}else this._scopeEvents.remove(this.target,"all")}}])&&En(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();On.Interactable=Tn;var jn={};function Mn(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function kn(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(jn,"__esModule",{value:!0}),jn.InteractableSet=void 0;var In=function(){function t(e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),kn(this,"list",[]),kn(this,"selectorMap",{}),kn(this,"scope",void 0),this.scope=e,e.addListeners({"interactable:unset":function(t){var e=t.interactable,r=e.target,o=e._context,a=i.default.string(r)?n.selectorMap[r]:r[n.scope.id],s=H.findIndex(a,(function(t){return t.context===o}));a[s]&&(a[s].context=null,a[s].interactable=null),a.splice(s,1)}})}var e,n;return e=t,(n=[{key:"new",value:function(t,e){e=(0,M.default)(e||{},{actions:this.scope.actions});var n=new this.scope.Interactable(t,e,this.scope.document,this.scope.events),r={context:n._context,interactable:n};return this.scope.addDocument(n._doc),this.list.push(n),i.default.string(t)?(this.selectorMap[t]||(this.selectorMap[t]=[]),this.selectorMap[t].push(r)):(n.target[this.scope.id]||Object.defineProperty(t,this.scope.id,{value:[],configurable:!0}),t[this.scope.id].push(r)),this.scope.fire("interactable:new",{target:t,options:e,interactable:n,win:this.scope._win}),n}},{key:"get",value:function(t,e){var n=e&&e.context||this.scope.document,r=i.default.string(t),o=r?this.selectorMap[t]:t[this.scope.id];if(!o)return null;var a=H.find(o,(function(e){return e.context===n&&(r||e.interactable.inContext(t))}));return a&&a.interactable}},{key:"forEachMatch",value:function(t,e){for(var n=0;n<this.list.length;n++){var r=this.list[n],o=void 0;if((i.default.string(r.target)?i.default.element(t)&&_.matchesSelector(t,r.target):t===r.target)&&r.inContext(t)&&(o=e(r)),void 0!==o)return o}}}])&&Mn(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();jn.InteractableSet=In;var Dn={};function An(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function zn(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Cn(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],a=!0,s=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}}(t,e)||function(t,e){if(t){if("string"==typeof t)return Rn(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Rn(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Rn(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}Object.defineProperty(Dn,"__esModule",{value:!0}),Dn.default=void 0;var Fn=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),zn(this,"currentTarget",void 0),zn(this,"originalEvent",void 0),zn(this,"type",void 0),this.originalEvent=e,(0,F.default)(this,e)}var e,n;return e=t,(n=[{key:"preventOriginalDefault",value:function(){this.originalEvent.preventDefault()}},{key:"stopPropagation",value:function(){this.originalEvent.stopPropagation()}},{key:"stopImmediatePropagation",value:function(){this.originalEvent.stopImmediatePropagation()}}])&&An(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function Xn(t){if(!i.default.object(t))return{capture:!!t,passive:!1};var e=(0,M.default)({},t);return e.capture=!!t.capture,e.passive=!!t.passive,e}var Bn={id:"events",install:function(t){var e,n=[],r={},o=[],a={add:s,remove:l,addDelegate:function(t,e,n,i,a){var l=Xn(a);if(!r[n]){r[n]=[];for(var f=0;f<o.length;f++){var d=o[f];s(d,n,u),s(d,n,c,!0)}}var p=r[n],v=H.find(p,(function(n){return n.selector===t&&n.context===e}));v||(v={selector:t,context:e,listeners:[]},p.push(v)),v.listeners.push([i,l])},removeDelegate:function(t,e,n,o,i){var a,s=Xn(i),f=r[n],d=!1;if(f)for(a=f.length-1;a>=0;a--){var p=f[a];if(p.selector===t&&p.context===e){for(var v=p.listeners,h=v.length-1;h>=0;h--){var g=Cn(v[h],2),y=g[0],m=g[1],b=m.capture,x=m.passive;if(y===o&&b===s.capture&&x===s.passive){v.splice(h,1),v.length||(f.splice(a,1),l(e,n,u),l(e,n,c,!0)),d=!0;break}}if(d)break}}},delegateListener:u,delegateUseCapture:c,delegatedEvents:r,documents:o,targets:n,supportsOptions:!1,supportsPassive:!1};function s(t,e,r,o){var i=Xn(o),s=H.find(n,(function(e){return e.eventTarget===t}));s||(s={eventTarget:t,events:{}},n.push(s)),s.events[e]||(s.events[e]=[]),t.addEventListener&&!H.contains(s.events[e],r)&&(t.addEventListener(e,r,a.supportsOptions?i:i.capture),s.events[e].push(r))}function l(t,e,r,o){var i=Xn(o),s=H.findIndex(n,(function(e){return e.eventTarget===t})),u=n[s];if(u&&u.events)if("all"!==e){var c=!1,f=u.events[e];if(f){if("all"===r){for(var d=f.length-1;d>=0;d--)l(t,e,f[d],i);return}for(var p=0;p<f.length;p++)if(f[p]===r){t.removeEventListener(e,r,a.supportsOptions?i:i.capture),f.splice(p,1),0===f.length&&(delete u.events[e],c=!0);break}}c&&!Object.keys(u.events).length&&n.splice(s,1)}else for(e in u.events)u.events.hasOwnProperty(e)&&l(t,e,"all")}function u(t,e){for(var n=Xn(e),o=new Fn(t),a=r[t.type],s=Cn(X.getEventTargets(t),1)[0],l=s;i.default.element(l);){for(var u=0;u<a.length;u++){var c=a[u],f=c.selector,d=c.context;if(_.matchesSelector(l,f)&&_.nodeContains(d,s)&&_.nodeContains(d,l)){var p=c.listeners;o.currentTarget=l;for(var v=0;v<p.length;v++){var h=Cn(p[v],2),g=h[0],y=h[1],m=y.capture,b=y.passive;m===n.capture&&b===n.passive&&g(o)}}}l=_.parentNode(l)}}function c(t){return u(t,!0)}return null==(e=t.document)||e.createElement("div").addEventListener("test",null,{get capture(){return a.supportsOptions=!0},get passive(){return a.supportsPassive=!0}}),t.events=a,a}};Dn.default=Bn;var Yn={};Object.defineProperty(Yn,"__esModule",{value:!0}),Yn.default=void 0;var Wn={methodOrder:["simulationResume","mouseOrPen","hasPointer","idle"],search:function(t){for(var e=0;e<Wn.methodOrder.length;e++){var n;n=Wn.methodOrder[e];var r=Wn[n](t);if(r)return r}return null},simulationResume:function(t){var e=t.pointerType,n=t.eventType,r=t.eventTarget,o=t.scope;if(!/down|start/i.test(n))return null;for(var i=0;i<o.interactions.list.length;i++){var a=o.interactions.list[i],s=r;if(a.simulation&&a.simulation.allowResume&&a.pointerType===e)for(;s;){if(s===a.element)return a;s=_.parentNode(s)}}return null},mouseOrPen:function(t){var e,n=t.pointerId,r=t.pointerType,o=t.eventType,i=t.scope;if("mouse"!==r&&"pen"!==r)return null;for(var a=0;a<i.interactions.list.length;a++){var s=i.interactions.list[a];if(s.pointerType===r){if(s.simulation&&!Ln(s,n))continue;if(s.interacting())return s;e||(e=s)}}if(e)return e;for(var l=0;l<i.interactions.list.length;l++){var u=i.interactions.list[l];if(!(u.pointerType!==r||/down/i.test(o)&&u.simulation))return u}return null},hasPointer:function(t){for(var e=t.pointerId,n=t.scope,r=0;r<n.interactions.list.length;r++){var o=n.interactions.list[r];if(Ln(o,e))return o}return null},idle:function(t){for(var e=t.pointerType,n=t.scope,r=0;r<n.interactions.list.length;r++){var o=n.interactions.list[r];if(1===o.pointers.length){var i=o.interactable;if(i&&(!i.options.gesture||!i.options.gesture.enabled))continue}else if(o.pointers.length>=2)continue;if(!o.interacting()&&e===o.pointerType)return o}return null}};function Ln(t,e){return t.pointers.some((function(t){return t.id===e}))}var Un=Wn;Yn.default=Un;var Vn={};function Nn(t){return Nn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Nn(t)}function qn(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],a=!0,s=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}}(t,e)||function(t,e){if(t){if("string"==typeof t)return Gn(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Gn(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Gn(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}function $n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Hn(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Kn(t,e){return Kn=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},Kn(t,e)}function Zn(t,e){if(e&&("object"===Nn(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function Jn(t){return Jn=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},Jn(t)}Object.defineProperty(Vn,"__esModule",{value:!0}),Vn.default=void 0;var Qn=["pointerDown","pointerMove","pointerUp","updatePointer","removePointer","windowBlur"];function tr(t,e){return function(n){var r=e.interactions.list,o=X.getPointerType(n),i=qn(X.getEventTargets(n),2),a=i[0],s=i[1],l=[];if(/^touch/.test(n.type)){e.prevTouchTime=e.now();for(var u=0;u<n.changedTouches.length;u++){var c=n.changedTouches[u],f={pointer:c,pointerId:X.getPointerId(c),pointerType:o,eventType:n.type,eventTarget:a,curEventTarget:s,scope:e},d=er(f);l.push([f.pointer,f.eventTarget,f.curEventTarget,d])}}else{var p=!1;if(!b.default.supportsPointerEvent&&/mouse/.test(n.type)){for(var v=0;v<r.length&&!p;v++)p="mouse"!==r[v].pointerType&&r[v].pointerIsDown;p=p||e.now()-e.prevTouchTime<500||0===n.timeStamp}if(!p){var h={pointer:n,pointerId:X.getPointerId(n),pointerType:o,eventType:n.type,curEventTarget:s,eventTarget:a,scope:e},g=er(h);l.push([h.pointer,h.eventTarget,h.curEventTarget,g])}}for(var y=0;y<l.length;y++){var m=qn(l[y],4),x=m[0],w=m[1],_=m[2];m[3][t](x,n,w,_)}}}function er(t){var e=t.pointerType,n=t.scope,r={interaction:Yn.default.search(t),searchDetails:t};return n.fire("interactions:find",r),r.interaction||n.interactions.new({pointerType:e})}function nr(t,e){var n=t.doc,r=t.scope,o=t.options,i=r.interactions.docEvents,a=r.events,s=a[e];for(var l in r.browser.isIOS&&!o.events&&(o.events={passive:!1}),a.delegatedEvents)s(n,l,a.delegateListener),s(n,l,a.delegateUseCapture,!0);for(var u=o&&o.events,c=0;c<i.length;c++){var f=i[c];s(n,f.type,f.listener,u)}}var rr={id:"core/interactions",install:function(t){for(var e={},n=0;n<Qn.length;n++){var r=Qn[n];e[r]=tr(r,t)}var o,i=b.default.pEventTypes;function a(){for(var e=0;e<t.interactions.list.length;e++){var n=t.interactions.list[e];if(n.pointerIsDown&&"touch"===n.pointerType&&!n._interacting)for(var r=function(){var e=n.pointers[o];t.documents.some((function(t){var n=t.doc;return(0,_.nodeContains)(n,e.downTarget)}))||n.removePointer(e.pointer,e.event)},o=0;o<n.pointers.length;o++)r()}}(o=h.default.PointerEvent?[{type:i.down,listener:a},{type:i.down,listener:e.pointerDown},{type:i.move,listener:e.pointerMove},{type:i.up,listener:e.pointerUp},{type:i.cancel,listener:e.pointerUp}]:[{type:"mousedown",listener:e.pointerDown},{type:"mousemove",listener:e.pointerMove},{type:"mouseup",listener:e.pointerUp},{type:"touchstart",listener:a},{type:"touchstart",listener:e.pointerDown},{type:"touchmove",listener:e.pointerMove},{type:"touchend",listener:e.pointerUp},{type:"touchcancel",listener:e.pointerUp}]).push({type:"blur",listener:function(e){for(var n=0;n<t.interactions.list.length;n++)t.interactions.list[n].documentBlur(e)}}),t.prevTouchTime=0,t.Interaction=function(e){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&Kn(t,e)}(s,e);var n,r,o,i,a=(o=s,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=Jn(o);if(i){var n=Jn(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return Zn(this,t)});function s(){return $n(this,s),a.apply(this,arguments)}return n=s,(r=[{key:"pointerMoveTolerance",get:function(){return t.interactions.pointerMoveTolerance},set:function(e){t.interactions.pointerMoveTolerance=e}},{key:"_now",value:function(){return t.now()}}])&&Hn(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),s}(Ge.default),t.interactions={list:[],new:function(e){e.scopeFire=function(e,n){return t.fire(e,n)};var n=new t.Interaction(e);return t.interactions.list.push(n),n},listeners:e,docEvents:o,pointerMoveTolerance:1},t.usePlugin(le.default)},listeners:{"scope:add-document":function(t){return nr(t,"add")},"scope:remove-document":function(t){return nr(t,"remove")},"interactable:unset":function(t,e){for(var n=t.interactable,r=e.interactions.list.length-1;r>=0;r--){var o=e.interactions.list[r];o.interactable===n&&(o.stop(),e.fire("interactions:destroy",{interaction:o}),o.destroy(),e.interactions.list.length>2&&e.interactions.list.splice(r,1))}}},onDocSignal:nr,doOnInteractions:tr,methodNames:Qn},or=rr;Vn.default=or;var ir={};function ar(t){return ar="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ar(t)}function sr(){return sr="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=lr(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},sr.apply(this,arguments)}function lr(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=fr(t)););return t}function ur(t,e){return ur=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},ur(t,e)}function cr(t,e){if(e&&("object"===ar(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function fr(t){return fr=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},fr(t)}function dr(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function pr(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function vr(t,e,n){return e&&pr(t.prototype,e),n&&pr(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function hr(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(ir,"__esModule",{value:!0}),ir.Scope=void 0,ir.initScope=yr;var gr=function(){function t(){var e=this;dr(this,t),hr(this,"id","__interact_scope_".concat(Math.floor(100*Math.random()))),hr(this,"isInitialized",!1),hr(this,"listenerMaps",[]),hr(this,"browser",b.default),hr(this,"defaults",(0,ye.default)(ke.defaults)),hr(this,"Eventable",yn.Eventable),hr(this,"actions",{map:{},phases:{start:!0,move:!0,end:!0},methodDict:{},phaselessTypes:{}}),hr(this,"interactStatic",(0,Pn.createInteractStatic)(this)),hr(this,"InteractEvent",Ie.InteractEvent),hr(this,"Interactable",void 0),hr(this,"interactables",new jn.InteractableSet(this)),hr(this,"_win",void 0),hr(this,"document",void 0),hr(this,"window",void 0),hr(this,"documents",[]),hr(this,"_plugins",{list:[],map:{}}),hr(this,"onWindowUnload",(function(t){return e.removeDocument(t.target)}));var n=this;this.Interactable=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&ur(t,e)}(i,t);var e,r,o=(e=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,n=fr(e);if(r){var o=fr(this).constructor;t=Reflect.construct(n,arguments,o)}else t=n.apply(this,arguments);return cr(this,t)});function i(){return dr(this,i),o.apply(this,arguments)}return vr(i,[{key:"_defaults",get:function(){return n.defaults}},{key:"set",value:function(t){return sr(fr(i.prototype),"set",this).call(this,t),n.fire("interactable:set",{options:t,interactable:this}),this}},{key:"unset",value:function(){sr(fr(i.prototype),"unset",this).call(this);var t=n.interactables.list.indexOf(this);t<0||(sr(fr(i.prototype),"unset",this).call(this),n.interactables.list.splice(t,1),n.fire("interactable:unset",{interactable:this}))}}]),i}(On.Interactable)}return vr(t,[{key:"addListeners",value:function(t,e){this.listenerMaps.push({id:e,map:t})}},{key:"fire",value:function(t,e){for(var n=0;n<this.listenerMaps.length;n++){var r=this.listenerMaps[n].map[t];if(r&&!1===r(e,this,t))return!1}}},{key:"init",value:function(t){return this.isInitialized?this:yr(this,t)}},{key:"pluginIsInstalled",value:function(t){return this._plugins.map[t.id]||-1!==this._plugins.list.indexOf(t)}},{key:"usePlugin",value:function(t,e){if(!this.isInitialized)return this;if(this.pluginIsInstalled(t))return this;if(t.id&&(this._plugins.map[t.id]=t),this._plugins.list.push(t),t.install&&t.install(this,e),t.listeners&&t.before){for(var n=0,r=this.listenerMaps.length,o=t.before.reduce((function(t,e){return t[e]=!0,t[mr(e)]=!0,t}),{});n<r;n++){var i=this.listenerMaps[n].id;if(o[i]||o[mr(i)])break}this.listenerMaps.splice(n,0,{id:t.id,map:t.listeners})}else t.listeners&&this.listenerMaps.push({id:t.id,map:t.listeners});return this}},{key:"addDocument",value:function(t,n){if(-1!==this.getDocIndex(t))return!1;var r=e.getWindow(t);n=n?(0,M.default)({},n):{},this.documents.push({doc:t,options:n}),this.events.documents.push(t),t!==this.document&&this.events.add(r,"unload",this.onWindowUnload),this.fire("scope:add-document",{doc:t,window:r,scope:this,options:n})}},{key:"removeDocument",value:function(t){var n=this.getDocIndex(t),r=e.getWindow(t),o=this.documents[n].options;this.events.remove(r,"unload",this.onWindowUnload),this.documents.splice(n,1),this.events.documents.splice(n,1),this.fire("scope:remove-document",{doc:t,window:r,scope:this,options:o})}},{key:"getDocIndex",value:function(t){for(var e=0;e<this.documents.length;e++)if(this.documents[e].doc===t)return e;return-1}},{key:"getDocOptions",value:function(t){var e=this.getDocIndex(t);return-1===e?null:this.documents[e].options}},{key:"now",value:function(){return(this.window.Date||Date).now()}}]),t}();function yr(t,n){return t.isInitialized=!0,i.default.window(n)&&e.init(n),h.default.init(n),b.default.init(n),Tt.default.init(n),t.window=n,t.document=n.document,t.usePlugin(Vn.default),t.usePlugin(Dn.default),t}function mr(t){return t&&t.replace(/\/.*$/,"")}ir.Scope=gr;var br={};Object.defineProperty(br,"__esModule",{value:!0}),br.default=void 0;var xr=new ir.Scope,wr=xr.interactStatic;br.default=wr;var _r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0;xr.init(_r);var Pr={};Object.defineProperty(Pr,"__esModule",{value:!0}),Pr.default=void 0,Pr.default=function(){};var Or={};Object.defineProperty(Or,"__esModule",{value:!0}),Or.default=void 0,Or.default=function(){};var Er={};function Sr(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],a=!0,s=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}}(t,e)||function(t,e){if(t){if("string"==typeof t)return Tr(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Tr(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Tr(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}Object.defineProperty(Er,"__esModule",{value:!0}),Er.default=void 0,Er.default=function(t){var e=[["x","y"],["left","top"],["right","bottom"],["width","height"]].filter((function(e){var n=Sr(e,2),r=n[0],o=n[1];return r in t||o in t})),n=function(n,r){for(var o=t.range,i=t.limits,a=void 0===i?{left:-1/0,right:1/0,top:-1/0,bottom:1/0}:i,s=t.offset,l=void 0===s?{x:0,y:0}:s,u={range:o,grid:t,x:null,y:null},c=0;c<e.length;c++){var f=Sr(e[c],2),d=f[0],p=f[1],v=Math.round((n-l.x)/t[d]),h=Math.round((r-l.y)/t[p]);u[d]=Math.max(a.left,Math.min(a.right,v*t[d]+l.x)),u[p]=Math.max(a.top,Math.min(a.bottom,h*t[p]+l.y))}return u};return n.grid=t,n.coordFields=e,n};var jr={};Object.defineProperty(jr,"__esModule",{value:!0}),Object.defineProperty(jr,"edgeTarget",{enumerable:!0,get:function(){return Pr.default}}),Object.defineProperty(jr,"elements",{enumerable:!0,get:function(){return Or.default}}),Object.defineProperty(jr,"grid",{enumerable:!0,get:function(){return Er.default}});var Mr={};Object.defineProperty(Mr,"__esModule",{value:!0}),Mr.default=void 0;var kr={id:"snappers",install:function(t){var e=t.interactStatic;e.snappers=(0,M.default)(e.snappers||{},jr),e.createSnapGrid=e.snappers.grid}},Ir=kr;Mr.default=Ir;var Dr={};function Ar(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function zr(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?Ar(Object(n),!0).forEach((function(e){Cr(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Ar(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function Cr(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(Dr,"__esModule",{value:!0}),Dr.default=Dr.aspectRatio=void 0;var Rr={start:function(t){var e=t.state,n=t.rect,r=t.edges,o=t.pageCoords,i=e.options.ratio,a=e.options,s=a.equalDelta,l=a.modifiers;"preserve"===i&&(i=n.width/n.height),e.startCoords=(0,M.default)({},o),e.startRect=(0,M.default)({},n),e.ratio=i,e.equalDelta=s;var u=e.linkedEdges={top:r.top||r.left&&!r.bottom,left:r.left||r.top&&!r.right,bottom:r.bottom||r.right&&!r.top,right:r.right||r.bottom&&!r.left};if(e.xIsPrimaryAxis=!(!r.left&&!r.right),e.equalDelta){var c=(u.left?1:-1)*(u.top?1:-1);e.edgeSign={x:c,y:c}}else e.edgeSign={x:u.left?-1:1,y:u.top?-1:1};if((0,M.default)(t.edges,u),l&&l.length){var f=new me.default(t.interaction);f.copyFrom(t.interaction.modification),f.prepareStates(l),e.subModification=f,f.startAll(zr({},t))}},set:function(t){var e=t.state,n=t.rect,r=t.coords,o=(0,M.default)({},r),i=e.equalDelta?Fr:Xr;if(i(e,e.xIsPrimaryAxis,r,n),!e.subModification)return null;var a=(0,M.default)({},n);(0,k.addEdges)(e.linkedEdges,a,{x:r.x-o.x,y:r.y-o.y});var s=e.subModification.setAll(zr(zr({},t),{},{rect:a,edges:e.linkedEdges,pageCoords:r,prevCoords:r,prevRect:a})),l=s.delta;return s.changed&&(i(e,Math.abs(l.x)>Math.abs(l.y),s.coords,s.rect),(0,M.default)(r,s.coords)),s.eventProps},defaults:{ratio:"preserve",equalDelta:!1,modifiers:[],enabled:!1}};function Fr(t,e,n){var r=t.startCoords,o=t.edgeSign;e?n.y=r.y+(n.x-r.x)*o.y:n.x=r.x+(n.y-r.y)*o.x}function Xr(t,e,n,r){var o=t.startRect,i=t.startCoords,a=t.ratio,s=t.edgeSign;if(e){var l=r.width/a;n.y=i.y+(l-o.height)*s.y}else{var u=r.height*a;n.x=i.x+(u-o.width)*s.x}}Dr.aspectRatio=Rr;var Br=(0,Se.makeModifier)(Rr,"aspectRatio");Dr.default=Br;var Yr={};Object.defineProperty(Yr,"__esModule",{value:!0}),Yr.default=void 0;var Wr=function(){};Wr._defaults={};var Lr=Wr;Yr.default=Lr;var Ur={};Object.defineProperty(Ur,"__esModule",{value:!0}),Object.defineProperty(Ur,"default",{enumerable:!0,get:function(){return Yr.default}});var Vr={};function Nr(t,e,n){return i.default.func(t)?k.resolveRectLike(t,e.interactable,e.element,[n.x,n.y,e]):k.resolveRectLike(t,e.interactable,e.element)}Object.defineProperty(Vr,"__esModule",{value:!0}),Vr.default=void 0,Vr.getRestrictionRect=Nr,Vr.restrict=void 0;var qr={start:function(t){var e=t.rect,n=t.startOffset,r=t.state,o=t.interaction,i=t.pageCoords,a=r.options,s=a.elementRect,l=(0,M.default)({left:0,top:0,right:0,bottom:0},a.offset||{});if(e&&s){var u=Nr(a.restriction,o,i);if(u){var c=u.right-u.left-e.width,f=u.bottom-u.top-e.height;c<0&&(l.left+=c,l.right+=c),f<0&&(l.top+=f,l.bottom+=f)}l.left+=n.left-e.width*s.left,l.top+=n.top-e.height*s.top,l.right+=n.right-e.width*(1-s.right),l.bottom+=n.bottom-e.height*(1-s.bottom)}r.offset=l},set:function(t){var e=t.coords,n=t.interaction,r=t.state,o=r.options,i=r.offset,a=Nr(o.restriction,n,e);if(a){var s=k.xywhToTlbr(a);e.x=Math.max(Math.min(s.right-i.right,e.x),s.left+i.left),e.y=Math.max(Math.min(s.bottom-i.bottom,e.y),s.top+i.top)}},defaults:{restriction:null,elementRect:null,offset:null,endOnly:!1,enabled:!1}};Vr.restrict=qr;var Gr=(0,Se.makeModifier)(qr,"restrict");Vr.default=Gr;var $r={};Object.defineProperty($r,"__esModule",{value:!0}),$r.restrictEdges=$r.default=void 0;var Hr={top:1/0,left:1/0,bottom:-1/0,right:-1/0},Kr={top:-1/0,left:-1/0,bottom:1/0,right:1/0};function Zr(t,e){for(var n=["top","left","bottom","right"],r=0;r<n.length;r++){var o=n[r];o in t||(t[o]=e[o])}return t}var Jr={noInner:Hr,noOuter:Kr,start:function(t){var e,n=t.interaction,r=t.startOffset,o=t.state,i=o.options;if(i){var a=(0,Vr.getRestrictionRect)(i.offset,n,n.coords.start.page);e=k.rectToXY(a)}e=e||{x:0,y:0},o.offset={top:e.y+r.top,left:e.x+r.left,bottom:e.y-r.bottom,right:e.x-r.right}},set:function(t){var e=t.coords,n=t.edges,r=t.interaction,o=t.state,i=o.offset,a=o.options;if(n){var s=(0,M.default)({},e),l=(0,Vr.getRestrictionRect)(a.inner,r,s)||{},u=(0,Vr.getRestrictionRect)(a.outer,r,s)||{};Zr(l,Hr),Zr(u,Kr),n.top?e.y=Math.min(Math.max(u.top+i.top,s.y),l.top+i.top):n.bottom&&(e.y=Math.max(Math.min(u.bottom+i.bottom,s.y),l.bottom+i.bottom)),n.left?e.x=Math.min(Math.max(u.left+i.left,s.x),l.left+i.left):n.right&&(e.x=Math.max(Math.min(u.right+i.right,s.x),l.right+i.right))}},defaults:{inner:null,outer:null,offset:null,endOnly:!1,enabled:!1}};$r.restrictEdges=Jr;var Qr=(0,Se.makeModifier)(Jr,"restrictEdges");$r.default=Qr;var to={};Object.defineProperty(to,"__esModule",{value:!0}),to.restrictRect=to.default=void 0;var eo=(0,M.default)({get elementRect(){return{top:0,left:0,bottom:1,right:1}},set elementRect(t){}},Vr.restrict.defaults),no={start:Vr.restrict.start,set:Vr.restrict.set,defaults:eo};to.restrictRect=no;var ro=(0,Se.makeModifier)(no,"restrictRect");to.default=ro;var oo={};Object.defineProperty(oo,"__esModule",{value:!0}),oo.restrictSize=oo.default=void 0;var io={width:-1/0,height:-1/0},ao={width:1/0,height:1/0},so={start:function(t){return $r.restrictEdges.start(t)},set:function(t){var e=t.interaction,n=t.state,r=t.rect,o=t.edges,i=n.options;if(o){var a=k.tlbrToXywh((0,Vr.getRestrictionRect)(i.min,e,t.coords))||io,s=k.tlbrToXywh((0,Vr.getRestrictionRect)(i.max,e,t.coords))||ao;n.options={endOnly:i.endOnly,inner:(0,M.default)({},$r.restrictEdges.noInner),outer:(0,M.default)({},$r.restrictEdges.noOuter)},o.top?(n.options.inner.top=r.bottom-a.height,n.options.outer.top=r.bottom-s.height):o.bottom&&(n.options.inner.bottom=r.top+a.height,n.options.outer.bottom=r.top+s.height),o.left?(n.options.inner.left=r.right-a.width,n.options.outer.left=r.right-s.width):o.right&&(n.options.inner.right=r.left+a.width,n.options.outer.right=r.left+s.width),$r.restrictEdges.set(t),n.options=i}},defaults:{min:null,max:null,endOnly:!1,enabled:!1}};oo.restrictSize=so;var lo=(0,Se.makeModifier)(so,"restrictSize");oo.default=lo;var uo={};Object.defineProperty(uo,"__esModule",{value:!0}),Object.defineProperty(uo,"default",{enumerable:!0,get:function(){return Yr.default}});var co={};Object.defineProperty(co,"__esModule",{value:!0}),co.snap=co.default=void 0;var fo={start:function(t){var e,n=t.interaction,r=t.interactable,o=t.element,i=t.rect,a=t.state,s=t.startOffset,l=a.options,u=l.offsetWithOrigin?function(t){var e=t.interaction.element;return(0,k.rectToXY)((0,k.resolveRectLike)(t.state.options.origin,null,null,[e]))||(0,A.default)(t.interactable,e,t.interaction.prepared.name)}(t):{x:0,y:0};if("startCoords"===l.offset)e={x:n.coords.start.page.x,y:n.coords.start.page.y};else{var c=(0,k.resolveRectLike)(l.offset,r,o,[n]);(e=(0,k.rectToXY)(c)||{x:0,y:0}).x+=u.x,e.y+=u.y}var f=l.relativePoints;a.offsets=i&&f&&f.length?f.map((function(t,n){return{index:n,relativePoint:t,x:s.left-i.width*t.x+e.x,y:s.top-i.height*t.y+e.y}})):[{index:0,relativePoint:null,x:e.x,y:e.y}]},set:function(t){var e=t.interaction,n=t.coords,r=t.state,o=r.options,a=r.offsets,s=(0,A.default)(e.interactable,e.element,e.prepared.name),l=(0,M.default)({},n),u=[];o.offsetWithOrigin||(l.x-=s.x,l.y-=s.y);for(var c=0;c<a.length;c++)for(var f=a[c],d=l.x-f.x,p=l.y-f.y,v=0,h=o.targets.length;v<h;v++){var g,y=o.targets[v];(g=i.default.func(y)?y(d,p,e._proxy,f,v):y)&&u.push({x:(i.default.number(g.x)?g.x:d)+f.x,y:(i.default.number(g.y)?g.y:p)+f.y,range:i.default.number(g.range)?g.range:o.range,source:y,index:v,offset:f})}for(var m={target:null,inRange:!1,distance:0,range:0,delta:{x:0,y:0}},b=0;b<u.length;b++){var x=u[b],w=x.range,_=x.x-l.x,P=x.y-l.y,O=(0,R.default)(_,P),E=O<=w;w===1/0&&m.inRange&&m.range!==1/0&&(E=!1),m.target&&!(E?m.inRange&&w!==1/0?O/w<m.distance/m.range:w===1/0&&m.range!==1/0||O<m.distance:!m.inRange&&O<m.distance)||(m.target=x,m.distance=O,m.range=w,m.inRange=E,m.delta.x=_,m.delta.y=P)}return m.inRange&&(n.x=m.target.x,n.y=m.target.y),r.closest=m,m},defaults:{range:1/0,targets:null,offset:null,offsetWithOrigin:!0,origin:null,relativePoints:null,endOnly:!1,enabled:!1}};co.snap=fo;var po=(0,Se.makeModifier)(fo,"snap");co.default=po;var vo={};function ho(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}Object.defineProperty(vo,"__esModule",{value:!0}),vo.snapSize=vo.default=void 0;var go={start:function(t){var e=t.state,n=t.edges,r=e.options;if(!n)return null;t.state={options:{targets:null,relativePoints:[{x:n.left?0:1,y:n.top?0:1}],offset:r.offset||"self",origin:{x:0,y:0},range:r.range}},e.targetFields=e.targetFields||[["width","height"],["x","y"]],co.snap.start(t),e.offsets=t.state.offsets,t.state=e},set:function(t){var e,n,r=t.interaction,o=t.state,a=t.coords,s=o.options,l=o.offsets,u={x:a.x-l[0].x,y:a.y-l[0].y};o.options=(0,M.default)({},s),o.options.targets=[];for(var c=0;c<(s.targets||[]).length;c++){var f=(s.targets||[])[c],d=void 0;if(d=i.default.func(f)?f(u.x,u.y,r):f){for(var p=0;p<o.targetFields.length;p++){var v=(e=o.targetFields[p],n=2,function(t){if(Array.isArray(t))return t}(e)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],a=!0,s=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}}(e,n)||function(t,e){if(t){if("string"==typeof t)return ho(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ho(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),h=v[0],g=v[1];if(h in d||g in d){d.x=d[h],d.y=d[g];break}}o.options.targets.push(d)}}var y=co.snap.set(t);return o.options=s,y},defaults:{range:1/0,targets:null,offset:null,endOnly:!1,enabled:!1}};vo.snapSize=go;var yo=(0,Se.makeModifier)(go,"snapSize");vo.default=yo;var mo={};Object.defineProperty(mo,"__esModule",{value:!0}),mo.snapEdges=mo.default=void 0;var bo={start:function(t){var e=t.edges;return e?(t.state.targetFields=t.state.targetFields||[[e.left?"left":"right",e.top?"top":"bottom"]],vo.snapSize.start(t)):null},set:vo.snapSize.set,defaults:(0,M.default)((0,ye.default)(vo.snapSize.defaults),{targets:null,range:null,offset:{x:0,y:0}})};mo.snapEdges=bo;var xo=(0,Se.makeModifier)(bo,"snapEdges");mo.default=xo;var wo={};Object.defineProperty(wo,"__esModule",{value:!0}),Object.defineProperty(wo,"default",{enumerable:!0,get:function(){return Yr.default}});var _o={};Object.defineProperty(_o,"__esModule",{value:!0}),Object.defineProperty(_o,"default",{enumerable:!0,get:function(){return Yr.default}});var Po={};Object.defineProperty(Po,"__esModule",{value:!0}),Po.default=void 0;var Oo={aspectRatio:Dr.default,restrictEdges:$r.default,restrict:Vr.default,restrictRect:to.default,restrictSize:oo.default,snapEdges:mo.default,snap:co.default,snapSize:vo.default,spring:wo.default,avoid:Ur.default,transform:_o.default,rubberband:uo.default};Po.default=Oo;var Eo={};Object.defineProperty(Eo,"__esModule",{value:!0}),Eo.default=void 0;var So={id:"modifiers",install:function(t){var e=t.interactStatic;for(var n in t.usePlugin(Se.default),t.usePlugin(Mr.default),e.modifiers=Po.default,Po.default){var r=Po.default[n],o=r._defaults,i=r._methods;o._methods=i,t.defaults.perAction[n]=o}}},To=So;Eo.default=To;var jo={};function Mo(t){return Mo="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Mo(t)}function ko(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Io(t,e){return Io=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},Io(t,e)}function Do(t,e){if(e&&("object"===Mo(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return Ao(t)}function Ao(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function zo(t){return zo=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},zo(t)}Object.defineProperty(jo,"__esModule",{value:!0}),jo.default=jo.PointerEvent=void 0;var Co=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&Io(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=zo(r);if(o){var n=zo(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return Do(this,t)});function a(t,e,n,r,o,s){var l;if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),l=i.call(this,o),X.pointerExtend(Ao(l),n),n!==e&&X.pointerExtend(Ao(l),e),l.timeStamp=s,l.originalEvent=n,l.type=t,l.pointerId=X.getPointerId(e),l.pointerType=X.getPointerType(e),l.target=r,l.currentTarget=null,"tap"===t){var u=o.getPointerIndex(e);l.dt=l.timeStamp-o.pointers[u].downTime;var c=l.timeStamp-o.tapTime;l.double=!!o.prevTap&&"doubletap"!==o.prevTap.type&&o.prevTap.target===l.target&&c<500}else"doubletap"===t&&(l.dt=e.timeStamp-o.tapTime,l.double=!0);return l}return e=a,(n=[{key:"_subtractOrigin",value:function(t){var e=t.x,n=t.y;return this.pageX-=e,this.pageY-=n,this.clientX-=e,this.clientY-=n,this}},{key:"_addOrigin",value:function(t){var e=t.x,n=t.y;return this.pageX+=e,this.pageY+=n,this.clientX+=e,this.clientY+=n,this}},{key:"preventDefault",value:function(){this.originalEvent.preventDefault()}}])&&ko(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(N.BaseEvent);jo.PointerEvent=jo.default=Co;var Ro={};Object.defineProperty(Ro,"__esModule",{value:!0}),Ro.default=void 0;var Fo={id:"pointer-events/base",before:["inertia","modifiers","auto-start","actions"],install:function(t){t.pointerEvents=Fo,t.defaults.actions.pointerEvents=Fo.defaults,(0,M.default)(t.actions.phaselessTypes,Fo.types)},listeners:{"interactions:new":function(t){var e=t.interaction;e.prevTap=null,e.tapTime=0},"interactions:update-pointer":function(t){var e=t.down,n=t.pointerInfo;!e&&n.hold||(n.hold={duration:1/0,timeout:null})},"interactions:move":function(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget;t.duplicate||n.pointerIsDown&&!n.pointerWasMoved||(n.pointerIsDown&&Yo(t),Xo({interaction:n,pointer:r,event:o,eventTarget:i,type:"move"},e))},"interactions:down":function(t,e){!function(t,e){for(var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget,a=t.pointerIndex,s=n.pointers[a].hold,l=_.getPath(i),u={interaction:n,pointer:r,event:o,eventTarget:i,type:"hold",targets:[],path:l,node:null},c=0;c<l.length;c++){var f=l[c];u.node=f,e.fire("pointerEvents:collect-targets",u)}if(u.targets.length){for(var d=1/0,p=0;p<u.targets.length;p++){var v=u.targets[p].eventable.options.holdDuration;v<d&&(d=v)}s.duration=d,s.timeout=setTimeout((function(){Xo({interaction:n,eventTarget:i,pointer:r,event:o,type:"hold"},e)}),d)}}(t,e),Xo(t,e)},"interactions:up":function(t,e){Yo(t),Xo(t,e),function(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget;n.pointerWasMoved||Xo({interaction:n,eventTarget:i,pointer:r,event:o,type:"tap"},e)}(t,e)},"interactions:cancel":function(t,e){Yo(t),Xo(t,e)}},PointerEvent:jo.PointerEvent,fire:Xo,collectEventTargets:Bo,defaults:{holdDuration:600,ignoreFrom:null,allowFrom:null,origin:{x:0,y:0}},types:{down:!0,move:!0,up:!0,cancel:!0,tap:!0,doubletap:!0,hold:!0}};function Xo(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget,a=t.type,s=t.targets,l=void 0===s?Bo(t,e):s,u=new jo.PointerEvent(a,r,o,i,n,e.now());e.fire("pointerEvents:new",{pointerEvent:u});for(var c={interaction:n,pointer:r,event:o,eventTarget:i,targets:l,type:a,pointerEvent:u},f=0;f<l.length;f++){var d=l[f];for(var p in d.props||{})u[p]=d.props[p];var v=(0,A.default)(d.eventable,d.node);if(u._subtractOrigin(v),u.eventable=d.eventable,u.currentTarget=d.node,d.eventable.fire(u),u._addOrigin(v),u.immediatePropagationStopped||u.propagationStopped&&f+1<l.length&&l[f+1].node!==u.currentTarget)break}if(e.fire("pointerEvents:fired",c),"tap"===a){var h=u.double?Xo({interaction:n,pointer:r,event:o,eventTarget:i,type:"doubletap"},e):u;n.prevTap=h,n.tapTime=h.timeStamp}return u}function Bo(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget,a=t.type,s=n.getPointerIndex(r),l=n.pointers[s];if("tap"===a&&(n.pointerWasMoved||!l||l.downTarget!==i))return[];for(var u=_.getPath(i),c={interaction:n,pointer:r,event:o,eventTarget:i,type:a,path:u,targets:[],node:null},f=0;f<u.length;f++){var d=u[f];c.node=d,e.fire("pointerEvents:collect-targets",c)}return"hold"===a&&(c.targets=c.targets.filter((function(t){var e;return t.eventable.options.holdDuration===(null==(e=n.pointers[s])?void 0:e.hold.duration)}))),c.targets}function Yo(t){var e=t.interaction,n=t.pointerIndex,r=e.pointers[n].hold;r&&r.timeout&&(clearTimeout(r.timeout),r.timeout=null)}var Wo=Fo;Ro.default=Wo;var Lo={};function Uo(t){var e=t.interaction;e.holdIntervalHandle&&(clearInterval(e.holdIntervalHandle),e.holdIntervalHandle=null)}Object.defineProperty(Lo,"__esModule",{value:!0}),Lo.default=void 0;var Vo={id:"pointer-events/holdRepeat",install:function(t){t.usePlugin(Ro.default);var e=t.pointerEvents;e.defaults.holdRepeatInterval=0,e.types.holdrepeat=t.actions.phaselessTypes.holdrepeat=!0},listeners:["move","up","cancel","endall"].reduce((function(t,e){return t["pointerEvents:".concat(e)]=Uo,t}),{"pointerEvents:new":function(t){var e=t.pointerEvent;"hold"===e.type&&(e.count=(e.count||0)+1)},"pointerEvents:fired":function(t,e){var n=t.interaction,r=t.pointerEvent,o=t.eventTarget,i=t.targets;if("hold"===r.type&&i.length){var a=i[0].eventable.options.holdRepeatInterval;a<=0||(n.holdIntervalHandle=setTimeout((function(){e.pointerEvents.fire({interaction:n,eventTarget:o,type:"hold",pointer:r,event:r},e)}),a))}}})},No=Vo;Lo.default=No;var qo={};function Go(t){return(0,M.default)(this.events.options,t),this}Object.defineProperty(qo,"__esModule",{value:!0}),qo.default=void 0;var $o={id:"pointer-events/interactableTargets",install:function(t){var e=t.Interactable;e.prototype.pointerEvents=Go;var n=e.prototype._backCompatOption;e.prototype._backCompatOption=function(t,e){var r=n.call(this,t,e);return r===this&&(this.events.options[t]=e),r}},listeners:{"pointerEvents:collect-targets":function(t,e){var n=t.targets,r=t.node,o=t.type,i=t.eventTarget;e.interactables.forEachMatch(r,(function(t){var e=t.events,a=e.options;e.types[o]&&e.types[o].length&&t.testIgnoreAllow(a,r,i)&&n.push({node:r,eventable:e,props:{interactable:t}})}))},"interactable:new":function(t){var e=t.interactable;e.events.getRect=function(t){return e.getRect(t)}},"interactable:set":function(t,e){var n=t.interactable,r=t.options;(0,M.default)(n.events.options,e.pointerEvents.defaults),(0,M.default)(n.events.options,r.pointerEvents||{})}}},Ho=$o;qo.default=Ho;var Ko={};Object.defineProperty(Ko,"__esModule",{value:!0}),Ko.default=void 0;var Zo={id:"pointer-events",install:function(t){t.usePlugin(Ro),t.usePlugin(Lo.default),t.usePlugin(qo.default)}},Jo=Zo;Ko.default=Jo;var Qo={};function ti(t){var e=t.Interactable;t.actions.phases.reflow=!0,e.prototype.reflow=function(e){return function(t,e,n){for(var r=i.default.string(t.target)?H.from(t._context.querySelectorAll(t.target)):[t.target],o=n.window.Promise,a=o?[]:null,s=function(){var i=r[l],s=t.getRect(i);if(!s)return"break";var u=H.find(n.interactions.list,(function(n){return n.interacting()&&n.interactable===t&&n.element===i&&n.prepared.name===e.name})),c=void 0;if(u)u.move(),a&&(c=u._reflowPromise||new o((function(t){u._reflowResolve=t})));else{var f=(0,k.tlbrToXywh)(s),d={page:{x:f.x,y:f.y},client:{x:f.x,y:f.y},timeStamp:n.now()},p=X.coordsToEvent(d);c=function(t,e,n,r,o){var i=t.interactions.new({pointerType:"reflow"}),a={interaction:i,event:o,pointer:o,eventTarget:n,phase:"reflow"};i.interactable=e,i.element=n,i.prevEvent=o,i.updatePointer(o,o,n,!0),X.setZeroCoords(i.coords.delta),(0,Xt.copyAction)(i.prepared,r),i._doPhase(a);var s=t.window.Promise,l=s?new s((function(t){i._reflowResolve=t})):void 0;return i._reflowPromise=l,i.start(r,e,n),i._interacting?(i.move(a),i.end(o)):(i.stop(),i._reflowResolve()),i.removePointer(o,o),l}(n,t,i,e,p)}a&&a.push(c)},l=0;l<r.length&&"break"!==s();l++);return a&&o.all(a).then((function(){return t}))}(this,e,t)}}Object.defineProperty(Qo,"__esModule",{value:!0}),Qo.default=void 0,Qo.install=ti;var ei={id:"reflow",install:ti,listeners:{"interactions:stop":function(t,e){var n=t.interaction;"reflow"===n.pointerType&&(n._reflowResolve&&n._reflowResolve(),H.remove(e.interactions.list,n))}}},ni=ei;Qo.default=ni;var ri={exports:{}};function oi(t){return oi="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},oi(t)}Object.defineProperty(ri.exports,"__esModule",{value:!0}),ri.exports.default=void 0,br.default.use(le.default),br.default.use(Qe.default),br.default.use(Ko.default),br.default.use(ln.default),br.default.use(Eo.default),br.default.use(ae.default),br.default.use(Et.default),br.default.use(Dt.default),br.default.use(Qo.default);var ii=br.default;if(ri.exports.default=ii,"object"===oi(ri)&&ri)try{ri.exports=br.default}catch(t){}br.default.default=br.default,Et.default,Dt.default,ae.default,le.default,he.default,ln.default,br.default,Eo.default,Qe.default,Ko.default,Qo.default,ri=ri.exports;var ai={exports:{}};function si(t){return si="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},si(t)}Object.defineProperty(ai.exports,"__esModule",{value:!0}),ai.exports.default=void 0;var li=ri.default;if(ai.exports.default=li,"object"===si(ai)&&ai)try{ai.exports=ri.default}catch(t){}return ri.default.default=ri.default,ai.exports}));


},{}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");
var _vanillaPicker = _interopRequireDefault(require("vanilla-picker"));
var _interactjs = _interopRequireDefault(require("interactjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* code written by Sayed Faisal (sfaisal.dev) */

document.getElementById("app").innerHTML = "\n<h1>TACSSS</h1>\n<h2>The Amazing CSS Shadow</h2>\n<div><div class=\"object\">\n<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path id=\"circle\" fill=\"none\"\n        d=\"\n          M 25, 50\n          a 25,25 0 1,1 50,0\n          a 25,25 0 1,1 -50,0\n          \" />\n  <text>\n    <textPath href=\"#circle\">\n      TACSSS TACSSS\n    </textPath>\n  </text>\n\n</svg>\n</div></div>\n<div id=\"color-picker\"></div>\n<div class=\"light\"></div>\n<textarea class=\"code\"></textarea>\n";
var shadowX = 0.7;
var shadowY = 0.7;
var shadowBlur = 1;
var shadowColor = "47, 103, 118";
var shadowAlpha = 0.7;
var lightX = 0;
var lightY = 0;
var code = document.querySelector(".code");
var object = document.querySelector(".object");
var colorPickerBtn = document.querySelector("#color-picker");
var picker = new _vanillaPicker.default({
  parent: colorPickerBtn,
  color: "#2f6776ff"
});
colorPickerBtn.style.background = "rgb(47, 103, 118)";
picker.onChange = function (color) {
  colorPickerBtn.style.background = color.rgbString;
  shadowColor = getRGB(color.rgbString);
  shadowAlpha = getAlpha(color.rgbaString);
  setLight(object, "box", lightX, lightY, shadowColor, shadowAlpha);
  if (lightOrDark(color.rgbString) === "light") {
    document.body.classList.add("darkmode");
  } else {
    document.body.classList.remove("darkmode");
  }
};
function getRGB(rgb) {
  var matches = rgb.match(/\((.*?)\)/);
  if (matches) {
    rgb = matches[1];
  } else {
    rgb = "0,0,0";
  }
  return rgb;
}
function getAlpha(rgba) {
  var alpha = 1;
  var matches = rgba.match(/\((.*?)\)/);
  if (matches) {
    rgba = matches[1];
    rgba = rgba.split(",");
    if (rgba.length === 4) {
      alpha = rgba[3];
    }
  }
  return alpha;
}
var shadowStyle = "";
setLight(object, "box", lightX, lightY, shadowColor, shadowAlpha);
function setShadow(object, type, shadowX, shadowY, shadowBlur, shadowColor, shadowAlpha) {
  var shadowParm = [{
    shadowX: shadowX,
    shadowY: shadowY,
    shadowBlur: shadowBlur,
    shadowColor: shadowColor,
    shadowAlpha: shadowAlpha
  }];
  shadowParm.push({
    shadowX: shadowX * 2,
    shadowY: shadowY * 2,
    shadowBlur: shadowBlur * 2,
    shadowColor: shadowColor,
    shadowAlpha: shadowAlpha - 0.1
  });
  shadowParm.push({
    shadowX: shadowX * 4,
    shadowY: shadowY * 4,
    shadowBlur: Number(shadowBlur) * 2 + Number(shadowBlur),
    shadowColor: shadowColor,
    shadowAlpha: shadowAlpha - 0.1
  });
  shadowParm.push({
    shadowX: Number(shadowX) * 4 + Number(shadowX) * 2 + Number(shadowX),
    shadowY: Number(shadowY) * 4 + Number(shadowY) * 2 + Number(shadowY),
    shadowBlur: shadowBlur * 5,
    shadowColor: shadowColor,
    shadowAlpha: shadowAlpha - 0.2
  });
  shadowStyle = type + "-shadow: ";
  for (var i = 0; i < shadowParm.length; i++) {
    shadowStyle += Number(shadowParm[i].shadowX).toFixed(2) + "rem " + Number(shadowParm[i].shadowY).toFixed(2) + "rem " + Number(shadowParm[i].shadowBlur).toFixed(2) + "rem rgba(" + shadowParm[i].shadowColor + ", " + Number(shadowParm[i].shadowAlpha).toFixed(2);
    if (i === shadowParm.length - 1) {
      shadowStyle += ");";
    } else {
      shadowStyle += "), ";
    }
  }
  object.setAttribute("style", shadowStyle);
  code.value = shadowStyle;
}
var light = document.querySelector(".light");
(0, _interactjs.default)(light).draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [_interactjs.default.modifiers.restrictRect({
    restriction: "parent",
    endOnly: true
  })],
  listeners: {
    move: dragMoveListener
  }
});
function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  lightX = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  lightY = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.transform = "translate(" + lightX + "px, " + lightY + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", lightX);
  target.setAttribute("data-y", lightY);
  setLight(object, "box", lightX, lightY, shadowColor, shadowAlpha);
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
function setLight(object, shadowType, lightX, lightY, shadowColor, shadowAlpha) {
  var objectX = object.getBoundingClientRect().left + window.scrollX + object.offsetWidth / 2;
  var objectY = object.getBoundingClientRect().top + window.scrollY + object.offsetHeight / 2;
  var defX = objectX - lightX;
  if (defX > 370) {
    defX = 370;
  } else if (defX < -370) {
    defX = -370;
  }
  var defY = objectY - lightY;
  if (defY > 370) {
    defY = 370;
  } else if (defY < -370) {
    defY = -370;
  }
  var finalX = defX / 250;
  var finalY = defY / 250;
  var forBlurX = finalX;
  var forBlurY = finalY;
  if (forBlurX < 0) {
    forBlurX *= -1;
  }
  if (forBlurY < 0) {
    forBlurY *= -1;
  }
  var finalBlur = 100 * forBlurX / 70;
  if (forBlurY > forBlurX) {
    finalBlur = 100 * forBlurY / 70;
  }
  if (finalBlur >= 0 && finalBlur < 0.5) {
    finalBlur = 0.5;
  }
  if (finalBlur < 0) {
    finalBlur = finalBlur * -1;
    if (finalBlur < 0.5) {
      finalBlur = 0.5;
    }
  }
  setShadow(object, shadowType, finalX.toFixed(2), finalY.toFixed(2), finalBlur.toFixed(2), shadowColor, shadowAlpha);
}
function lightOrDark(color) {
  // Variables for red, green, blue values
  var r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));
    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 150) {
    return "light";
  } else {
    return "dark";
  }
}
},{"./styles.css":"src/styles.css","vanilla-picker":"node_modules/vanilla-picker/dist/vanilla-picker.mjs","interactjs":"node_modules/interactjs/dist/interact.min.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44293" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map