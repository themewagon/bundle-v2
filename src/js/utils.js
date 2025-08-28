/* -------------------------------------------------------------------------- */
/*                                    Utils                                   */
/* -------------------------------------------------------------------------- */
const docReady = fn => {
  // see if DOM is already available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    setTimeout(fn, 1);
  }
};
const isRTL = () => document.querySelector('html').getAttribute('dir') === 'rtl';

const resize = fn => window.addEventListener('resize', fn);

const isIterableArray = array => Array.isArray(array) && !!array.length;

const camelize = str => {
  const text = str.replace(/[-_\s.]+(.)?/g, (match, capture) => {
    if (capture) {
      return capture.toUpperCase();
    }
    return '';
  });
  return `${text.substr(0, 1).toLowerCase()}${text.substr(1)}`;
};

const getData = (el, data) => {
  try {
    return JSON.parse(el.dataset[camelize(data)]);
  } catch (e) {
    return el.dataset[camelize(data)];
  }
};

/* ----------------------------- Colors function ---------------------------- */

const hexToRgb = hexValue => {
  let hex;
  hexValue.indexOf('#') === 0 ? (hex = hexValue.substring(1)) : (hex = hexValue);
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
  );
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null;
};

const rgbaColor = (color = '#fff', alpha = 0.5) => `rgba(${hexToRgb(color)}, ${alpha})`;

/* --------------------------------- Colors --------------------------------- */

const getColor = (name, dom = document.documentElement) =>
  getComputedStyle(dom).getPropertyValue(`--creative-bundle-${name}`).trim();

const getColors = dom => ({
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
});

const getGrays = dom => ({
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
});

const hasClass = (el, className) => {
  !el && false;
  return el.classList.value.includes(className);
};

const addClass = (el, className) => {
  el.classList.add(className);
};

const removeClass = (el, className) => {
  el.classList.remove(className);
};

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540
};

const getOffset = el => {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};

const isScrolledIntoView = (el) => {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  const width = el.offsetWidth;
  const height = el.offsetHeight;

  while (el.offsetParent) {
    // eslint-disable-next-line no-param-reassign
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return {
    all:
      top >= window.pageYOffset &&
      left >= window.pageXOffset &&
      top + height <= window.pageYOffset + window.innerHeight &&
      left + width <= window.pageXOffset + window.innerWidth,
    partial:
      top < window.pageYOffset + window.innerHeight &&
      left < window.pageXOffset + window.innerWidth &&
      top + height > window.pageYOffset &&
      left + width > window.pageXOffset,
  };
};
const isElementIntoView = (el) => {

  const position = el.getBoundingClientRect();
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

const getBreakpoint = el => {
  const classes = el && el.classList.value;
  let breakpoint;
  if (classes) {
    breakpoint =
      breakpoints[
        classes
          .split(' ')
          .filter(cls => cls.includes('navbar-expand-'))
          .pop()
          .split('-')
          .pop()
      ];
  }
  return breakpoint;
};

const getCurrentScreenBreakpoint = () => {

  let currentBreakpoint = '';
  if (window.innerWidth >= breakpoints.xl) {
    currentBreakpoint = 'xl';
  } else if (window.innerWidth >= breakpoints.lg) {
    currentBreakpoint = 'lg';
  } else if (window.innerWidth >= breakpoints.md) {
    currentBreakpoint = 'md';
  } else {
    currentBreakpoint = 'sm';
  }
  const breakpointStartVal = breakpoints[currentBreakpoint];
  return { currentBreakpoint, breakpointStartVal };
};
/* --------------------------------- Cookie --------------------------------- */

const setCookie = (name, value, expire) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + expire);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()}`;
};

const getCookie = name => {
  const keyValue = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return keyValue ? keyValue[2] : keyValue;
};

/* ---------------------------------- Store --------------------------------- */

const getItemFromStore = (key, defaultValue, store = localStorage) => {
  try {
    return JSON.parse(store.getItem(key)) || defaultValue;
  } catch {
    return store.getItem(key) || defaultValue;
  }
};

const setItemToStore = (key, payload, store = localStorage) => store.setItem(key, payload);
const getStoreSpace = (store = localStorage) =>
  parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));

/* get Dates between */

const getDates = (startDate, endDate, interval = 1000 * 60 * 60 * 24) => {
  const duration = endDate - startDate;
  const steps = duration / interval;
  return Array.from({ length: steps + 1 }, (v, i) => new Date(startDate.valueOf() + interval * i));
};

/* Get Random Number */
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const utils = {
  docReady,
  breakpoints,
  resize,
  isIterableArray,
  camelize,
  getData,
  hasClass,
  addClass,
  hexToRgb,
  rgbaColor,
  getColor,
  getColors,
  getGrays,
  getOffset,
  isScrolledIntoView,
  getBreakpoint,
  setCookie,
  getCookie,
  getItemFromStore,
  setItemToStore,
  getStoreSpace,
  getDates,
  getRandomNumber,
  removeClass,
  isElementIntoView,
  getCurrentScreenBreakpoint,
  isRTL
};

export default utils;
