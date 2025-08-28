"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* -------------------------------------------------------------------------- */
/*                                    Utils                                   */
/* -------------------------------------------------------------------------- */
var docReady = function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    setTimeout(fn, 1);
  }
};
var isRTL = function isRTL() {
  return document.querySelector('html').getAttribute('dir') === 'rtl';
};
var resize = function resize(fn) {
  return window.addEventListener('resize', fn);
};
var isIterableArray = function isIterableArray(array) {
  return Array.isArray(array) && !!array.length;
};
var camelize = function camelize(str) {
  var text = str.replace(/[-_\s.]+(.)?/g, function (match, capture) {
    if (capture) {
      return capture.toUpperCase();
    }
    return '';
  });
  return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
};
var getData = function getData(el, data) {
  try {
    return JSON.parse(el.dataset[camelize(data)]);
  } catch (e) {
    return el.dataset[camelize(data)];
  }
};

/* ----------------------------- Colors function ---------------------------- */

var hexToRgb = function hexToRgb(hexValue) {
  var hex;
  hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue;
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  }));
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};
var rgbaColor = function rgbaColor() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#fff';
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  return "rgba(".concat(hexToRgb(color), ", ").concat(alpha, ")");
};

/* --------------------------------- Colors --------------------------------- */

var getColor = function getColor(name) {
  var dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
  return getComputedStyle(dom).getPropertyValue("--creative-bundle-".concat(name)).trim();
};
var getColors = function getColors(dom) {
  return {
    primary: getColor('primary', dom),
    secondary: getColor('secondary', dom),
    success: getColor('success', dom),
    info: getColor('info', dom),
    warning: getColor('warning', dom),
    danger: getColor('danger', dom),
    light: getColor('light', dom),
    dark: getColor('dark', dom),
    white: getColor('white', dom),
    black: getColor('black', dom),
    emphasis: getColor('emphasis-color', dom)
  };
};
var getGrays = function getGrays(dom) {
  return {
    100: getColor('gray-100', dom),
    200: getColor('gray-200', dom),
    300: getColor('gray-300', dom),
    400: getColor('gray-400', dom),
    500: getColor('gray-500', dom),
    600: getColor('gray-600', dom),
    700: getColor('gray-700', dom),
    800: getColor('gray-800', dom),
    900: getColor('gray-900', dom),
    1000: getColor('gray-1000', dom),
    1100: getColor('gray-1100', dom)
  };
};
var hasClass = function hasClass(el, className) {
  !el && false;
  return el.classList.value.includes(className);
};
var addClass = function addClass(el, className) {
  el.classList.add(className);
};
var removeClass = function removeClass(el, className) {
  el.classList.remove(className);
};
var breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540
};
var getOffset = function getOffset(el) {
  var rect = el.getBoundingClientRect();
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};
var isScrolledIntoView = function isScrolledIntoView(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;
  while (el.offsetParent) {
    // eslint-disable-next-line no-param-reassign
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  return {
    all: top >= window.pageYOffset && left >= window.pageXOffset && top + height <= window.pageYOffset + window.innerHeight && left + width <= window.pageXOffset + window.innerWidth,
    partial: top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && top + height > window.pageYOffset && left + width > window.pageXOffset
  };
};
var isElementIntoView = function isElementIntoView(el) {
  var position = el.getBoundingClientRect();
  // checking whether fully visible
  if (position.top >= 0 && position.bottom <= window.innerHeight) {
    return true;
  }

  // checking for partial visibility
  if (position.top < window.innerHeight && position.bottom >= 0) {
    return true;
  }
  return null;
};
var getBreakpoint = function getBreakpoint(el) {
  var classes = el && el.classList.value;
  var breakpoint;
  if (classes) {
    breakpoint = breakpoints[classes.split(' ').filter(function (cls) {
      return cls.includes('navbar-expand-');
    }).pop().split('-').pop()];
  }
  return breakpoint;
};
var getCurrentScreenBreakpoint = function getCurrentScreenBreakpoint() {
  var currentBreakpoint = '';
  if (window.innerWidth >= breakpoints.xl) {
    currentBreakpoint = 'xl';
  } else if (window.innerWidth >= breakpoints.lg) {
    currentBreakpoint = 'lg';
  } else if (window.innerWidth >= breakpoints.md) {
    currentBreakpoint = 'md';
  } else {
    currentBreakpoint = 'sm';
  }
  var breakpointStartVal = breakpoints[currentBreakpoint];
  return {
    currentBreakpoint: currentBreakpoint,
    breakpointStartVal: breakpointStartVal
  };
};
/* --------------------------------- Cookie --------------------------------- */

var setCookie = function setCookie(name, value, expire) {
  var expires = new Date();
  expires.setTime(expires.getTime() + expire);
  document.cookie = "".concat(name, "=").concat(value, ";expires=").concat(expires.toUTCString());
};
var getCookie = function getCookie(name) {
  var keyValue = document.cookie.match("(^|;) ?".concat(name, "=([^;]*)(;|$)"));
  return keyValue ? keyValue[2] : keyValue;
};

/* ---------------------------------- Store --------------------------------- */

var getItemFromStore = function getItemFromStore(key, defaultValue) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
  try {
    return JSON.parse(store.getItem(key)) || defaultValue;
  } catch (_unused) {
    return store.getItem(key) || defaultValue;
  }
};
var setItemToStore = function setItemToStore(key, payload) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
  return store.setItem(key, payload);
};
var getStoreSpace = function getStoreSpace() {
  var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage;
  return parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));
};

/* get Dates between */

var getDates = function getDates(startDate, endDate) {
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000 * 60 * 60 * 24;
  var duration = endDate - startDate;
  var steps = duration / interval;
  return Array.from({
    length: steps + 1
  }, function (v, i) {
    return new Date(startDate.valueOf() + interval * i);
  });
};

/* Get Random Number */
var getRandomNumber = function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
var utils = {
  docReady: docReady,
  breakpoints: breakpoints,
  resize: resize,
  isIterableArray: isIterableArray,
  camelize: camelize,
  getData: getData,
  hasClass: hasClass,
  addClass: addClass,
  hexToRgb: hexToRgb,
  rgbaColor: rgbaColor,
  getColor: getColor,
  getColors: getColors,
  getGrays: getGrays,
  getOffset: getOffset,
  isScrolledIntoView: isScrolledIntoView,
  getBreakpoint: getBreakpoint,
  setCookie: setCookie,
  getCookie: getCookie,
  getItemFromStore: getItemFromStore,
  setItemToStore: setItemToStore,
  getStoreSpace: getStoreSpace,
  getDates: getDates,
  getRandomNumber: getRandomNumber,
  removeClass: removeClass,
  isElementIntoView: isElementIntoView,
  getCurrentScreenBreakpoint: getCurrentScreenBreakpoint,
  isRTL: isRTL
};

/* -------------------------------------------------------------------------- */
/*                                  Detector                                  */
/* -------------------------------------------------------------------------- */

var detectorInit = function detectorInit() {
  var _window = window,
    is = _window.is;
  var html = document.querySelector('html');
  is.opera() && addClass(html, 'opera');
  is.mobile() && addClass(html, 'mobile');
  is.firefox() && addClass(html, 'firefox');
  is.safari() && addClass(html, 'safari');
  is.ios() && addClass(html, 'ios');
  is.iphone() && addClass(html, 'iphone');
  is.ipad() && addClass(html, 'ipad');
  is.ie() && addClass(html, 'ie');
  is.edge() && addClass(html, 'edge');
  is.chrome() && addClass(html, 'chrome');
  is.mac() && addClass(html, 'osx');
  is.windows() && addClass(html, 'windows');
  navigator.userAgent.match('CriOS') && addClass(html, 'chrome');
};

/*-----------------------------------------------
|   DomNode
-----------------------------------------------*/
var DomNode = /*#__PURE__*/function () {
  function DomNode(node) {
    _classCallCheck(this, DomNode);
    this.node = node;
  }
  _createClass(DomNode, [{
    key: "addClass",
    value: function addClass(className) {
      this.isValidNode() && this.node.classList.add(className);
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      this.isValidNode() && this.node.classList.remove(className);
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(className) {
      this.isValidNode() && this.node.classList.toggle(className);
    }
  }, {
    key: "hasClass",
    value: function hasClass(className) {
      this.isValidNode() && this.node.classList.contains(className);
    }
  }, {
    key: "data",
    value: function data(key) {
      if (this.isValidNode()) {
        try {
          return JSON.parse(this.node.dataset[this.camelize(key)]);
        } catch (e) {
          return this.node.dataset[this.camelize(key)];
        }
      }
      return null;
    }
  }, {
    key: "attr",
    value: function attr(name) {
      return this.isValidNode() && this.node[name];
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(name, value) {
      this.isValidNode() && this.node.setAttribute(name, value);
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(name) {
      this.isValidNode() && this.node.removeAttribute(name);
    }
  }, {
    key: "setProp",
    value: function setProp(name, value) {
      this.isValidNode() && (this.node[name] = value);
    }
  }, {
    key: "on",
    value: function on(event, cb) {
      this.isValidNode() && this.node.addEventListener(event, cb);
    }
  }, {
    key: "isValidNode",
    value: function isValidNode() {
      return !!this.node;
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "camelize",
    value: function camelize(str) {
      var text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
        return c ? c.toUpperCase() : '';
      });
      return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
    }
  }]);
  return DomNode;
}();
/*eslint-disable*/
/*-----------------------------------------------
|   Top navigation opacity on scroll
-----------------------------------------------*/
var navbarInit = function navbarInit() {
  var Selector = {
    NAV_ITEM: '.nav-item',
    NAVBAR: '.navbar',
    DROPDOWN: '.dropdown'
  };
  utils.resize(function () {
    var navElements = document.querySelectorAll('.nav-item');
    navElements.forEach(function (item) {
      item.removeAttribute('style');
    });
    var dropElements = document.querySelectorAll('.category-list');
    dropElements.forEach(function (item) {
      item.innerHTML = ' ';
    });
    navbar();
  });
  var navbar = function navbar() {
    var totalWidth = 0;
    var nav = document.querySelector(Selector.NAVBAR).clientWidth;
    var dropdown = document.querySelector('.dropdown').clientWidth;

    // let navbarNav = document.querySelector('.navbar-nav').clientWidth;

    var navbarWidth = nav - dropdown;
    var elements = document.querySelectorAll('.nav-item');
    elements.forEach(function (item) {
      var itemWidth = item.clientWidth;
      totalWidth = totalWidth + itemWidth;
      if (totalWidth > navbarWidth) {
        if (!item.classList.contains('dropdown')) {
          item.style.display = 'none';
          var link = item.firstChild;
          var linkItem = link.cloneNode(true);
          document.querySelector('.category-list').appendChild(linkItem);
        }
      }
    });
    var dropdownMenu = document.querySelectorAll('.dropdown-menu .nav-link');
    dropdownMenu.forEach(function (item) {
      item.classList.remove('nav-link');
      item.classList.add('dropdown-item');
    });
  };
  window.addEventListener('load', function (event) {
    navbar();
  });
  navbar();

  // Toggle bg class on window resize

  var backToToP = document.querySelector('.back-to-top');
  var navbarEl = document.querySelector('.navbar');
  var myScrollFunc = function myScrollFunc() {
    var y = window.scrollY;
    if (y >= 540) {
      backToToP.style.opacity = '1';
      navbarEl.classList.add('sticky-top');
      navbarEl.classList.add('bg-white');
    } else {
      backToToP.style.opacity = '0';
      navbarEl.classList.remove('bg-light');
    }
  };
  var navbarLink = document.querySelectorAll('.nav-link');
  document.addEventListener('click', function (e) {
    for (var x = 0; x < navbarLink.length; x++) {
      navbarLink[x].classList.remove('active');
    }
    e.target.closest('li').classList.add('active');
  });
  window.addEventListener('scroll', myScrollFunc);
};

/*eslint-disable*/

/*-----------------------------------------------
|                     Isotope
-----------------------------------------------*/

var isotopeFilter = function isotopeFilter() {
  window.addEventListener('load', function (event) {
    var iso = new Isotope('.grid', {
      itemSelector: '.item',
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: '.item'
      }
    });
    var filtersElem = document.querySelectorAll('[data-bs-nav]');
    filtersElem.forEach(function (element) {
      document.addEventListener('click', function (event) {
        console.log(event.target.id);
        if (event.target.id != 'navbarDropdown') {
          var filterValue = event.target.getAttribute('data-filter');
          iso.arrange({
            filter: filterValue
          });
        }
      });
    });
  });
};

/* -------------------------------------------------------------------------- */
/*                                Scroll To Top                               */
/* -------------------------------------------------------------------------- */
var scrollToTop = function scrollToTop() {
  document.querySelectorAll('[data-anchor] > a, [data-scroll-to]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var _utils$getData;
      e.preventDefault();
      var el = e.target;
      var id = utils.getData(el, 'scroll-to') || el.getAttribute('href');
      window.scroll({
        top: (_utils$getData = utils.getData(el, 'offset-top')) !== null && _utils$getData !== void 0 ? _utils$getData : utils.getOffset(document.querySelector(id)).top - 100,
        left: 0,
        behavior: 'smooth'
      });
      window.location.hash = id;
    });
  });
};

/* -------------------------------------------------------------------------- */
/*                            Theme Initialization                            */
/* -------------------------------------------------------------------------- */

docReady(detectorInit);
docReady(scrollToTop);
docReady(isotopeFilter);
//# sourceMappingURL=theme.js.map
