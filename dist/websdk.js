(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["websdk"] = factory();
	else
		root["websdk"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);


class Base {
    constructor() {
        this.__uuid = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* uuid */])();
    }

    get uuid () {
        return this.__uuid;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Base;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["g"] = uuid;
/* harmony export (immutable) */ __webpack_exports__["c"] = hex2rgb;
/* harmony export (immutable) */ __webpack_exports__["d"] = hex2string;
/* harmony export (immutable) */ __webpack_exports__["f"] = rgb2hex;
let nextUUid = 0;

function uuid() {
    return ++nextUUid;
}

function hex2rgb(hex, out) {
    out = out || [];

    out[0] = ((hex >> 16) & 0xFF) / 255;
    out[1] = ((hex >> 8) & 0xFF) / 255;
    out[2] = (hex & 0xFF) / 255;

    return out;
}

function hex2string(hex) {
    hex = hex.toString(16);
    hex = '000000'.substr(0, 6 - hex.length) + hex;

    return `#${hex}`;
}

function rgb2hex(rgb) {
    return (((rgb[0] * 255) << 16) + ((rgb[1] * 255) << 8) + (rgb[2] * 255 | 0));
}

const now = function () {
    return window.performance
        ? window.performance.now() / 1000
        : Date.now() / 1000;
};
/* harmony export (immutable) */ __webpack_exports__["e"] = now;


const fill = function (arr, val) {
    if (arr.fill) {
        arr.fill(val);
    } else {
        for (var i = 0; i < arr.length; i++) {
            arr[i] = val;
        }
    }
};
/* harmony export (immutable) */ __webpack_exports__["b"] = fill;


const buf2hex = function(bytes) { // buffer is an ArrayBuffer
    const data = bytes.subarray(0, 10);
    return Array.prototype.map.call(data, x => ('00' + x.toString(16)).slice(-2)).join('');
};
/* harmony export (immutable) */ __webpack_exports__["a"] = buf2hex;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Base__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Handler__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__Handler__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Dispatch__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__Dispatch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Timers__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__Timers__["a"]; });





/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(0);


class Handler extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {
    constructor(listener, callback, key) {
        super();
        this._listener = listener;
        this._callback = callback;
        this._key = key;
    }

    call() {
        this._callback && this._callback.call(arguments);
    }

    apply(listener, args) {
        this._callback && this._callback.apply(this._listener || listener, args);
    }

    same(handler) {
        return (handler instanceof Handler) &&
          (this._listener === handler.listener) &&
          (this._key === handler.key) &&
          (this._callback === handler.callback);
    }

    get callback() {
        return this._callback;
    }

    get listener() {
        return this._listener;
    }

    get key() {
        return this._key;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Handler;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Handler__ = __webpack_require__(3);



class TimerHandler {
    constructor() {
        /** 执行间隔 */
        this.delay = 0;
        /** 是否重复执行 */
        this.repeat = false;
        /** 是否用帧率 */
        this.userFrame = false;
        /** 执行时间 */
        this.exeTime = new Date().getTime();
        /** 处理方法 */
        this.method = null;
        /** 参数 */
        this.args = null;
        /** 执行次数 */
        this.count = 0;
    }

    clear() {
        this.method = null;
        this.args = null;
    }
}

const __INTERVAL = 100;
var __instance = null;

class Timers extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {
    constructor(userFrame) {
        super();
        this._handlers = new Map();
        this._pool = [];
        this._currTimer = new Date().getTime();
        this._currFrame = 0; // 每秒60帧
        this._size = 0;
        this._runtime = null;
        this._userFrame = userFrame || false;
    }

    start() {
        this._startAnimationFrame();
    }

    stop() {
        this._stopAnimationFrame();
    }

    destroy() {
        this._stopAnimationFrame();
        this._currFrame = 0;
        this.clearALL();
        this._pool = [];
    }

    clearALL () {
        for (let handler of this._handlers.values()) {
            handler.clear();
            handler = null;
        }
        this._handlers.clear();
    }

    clearTimer(key) {
        if (!this._handlers.has(key)) {
            return;
        }

        let handler = this._handlers.get(key);
        if (handler) {
            handler.clear();
            this._pool.push(handler);
            --this._size;
        }
        this._handlers.delete(key);
    }

    /** 定时执行一次
     * @param delay  延迟时间(单位毫秒)
     * @param method 结束时的回调方法
     * @param args   回调参数
     * @return  key= 覆盖key */
    doOnce(delay, method, args, listener, key) {
        args = args || null;
        listener = listener || null;
        return this._create(false, false, delay, this._createHandler(listener, method, key), 1, args);
    }

    /** 定时执行有限次
     * @param delay  延迟时间(单位毫秒)
     * @param method 结束时的回调方法
     * @param count 执行次数
     * @param args   回调参数
     * @return  key= 覆盖key */
    doCount(delay, method, count, args, listener, key) {
        args = args || null;
        listener = listener || null;
        return this._create(false, true, delay, this._createHandler(listener, method, key), count, args);
    }

    /** 定时重复执行
     * @param delay  延迟时间(单位毫秒)
     * @param method 结束时的回调方法
     * @param args   回调参数
     * @return  key= 覆盖key */
    doLoop(delay, method, args, listener, key) {
        args = args || null;
        listener = listener || null;
        return this._create(false, true, delay, this._createHandler(listener, method, key), 0, args);
    }

    /** 定时执行一次(基于帧率)
     * @param delay  延迟时间(单位为帧)
     * @param method 结束时的回调方法
     * @param args   回调参数
     * @return  key= 覆盖key */
    doFrameOnce(delay, method, args, listener, key) {
        args = args || null;
        listener = listener || null;
        return this._create(true, false, delay, this._createHandler(listener, method, key), 1, args);
    }

    /** 定时执行有限次(基于帧率)
     * @param delay  延迟时间(单位为帧)
     * @param method 结束时的回调方法
     * @param count 执行次数
     * @param args   回调参数
     * @return  key= 覆盖key */
    doFrameCount(delay, method, count, args, listener, key) {
        args = args || null;
        listener = listener || null;
        return this._create(true, true, delay, this._createHandler(listener, method, key), count, args);
    }

    /** 定时重复执行(基于帧率)
     * @param delay  延迟时间(单位为帧)
     * @param method 结束时的回调方法
     * @param args   回调参数
     * @return  key= 覆盖key */
    doFrameLoop(delay, method, args, listener, key) {
        args = args || null;
        listener = listener || null;
        return this._create(true, true, delay, this._createHandler(listener, method, key), 0, args);
    }

    /** 定时器执行数量 */
    get size() {
        return this._size;
    }

    /** 定时器执行数量 */
    hasTimer(key) {
        return key && this._handlers.has(key);
    }

    _requestAnimationFrame(callback) {
        let setIntervalEx = function (callback) {
            let request = window.requestAnimationFrame;
            let lastTime = 0;
            let vendors = ['webkit', 'moz'];
            let x = 0;
            let timerId;

            for (; x < vendors.length && !request; ++x) {
                request = window[vendors[x] + 'RequestAnimationFrame'];
            }

            if (!request) {
                request = function (callback) {
                    let currTime = new Date().getTime();
                    let timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    let id = window.setTimeout(function () {
                        let frame = currTime + timeToCall;
                        callback && callback(frame);
                    }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            }

            (function render (evt) {
                callback(evt);
                timerId = request(render);
            }());

            return timerId;
        };

        let requestFrame = !this._userFrame ? setInterval : setIntervalEx;
        return requestFrame(callback, __INTERVAL);
    }

    _cancelAnimationFrame(id) {
        let clearTimeoutEx = function (id) {
            let cancel = window.cancelAnimationFrame;
            let vendors = ['webkit', 'moz'];
            let x = 0;
            for (x = 0; x < vendors.length && !cancel; ++x) {
                cancel = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
            }

            if (!cancel) {
                cancel = function (id) {
                    clearTimeout(id);
                };
            }

            cancel && cancel(id);
        };

        let cancelFrame = !this._userFrame ? clearTimeout : clearTimeoutEx;
        cancelFrame(id);
    }

    _stopAnimationFrame() {
        if (this._runtime) {
            this._cancelAnimationFrame(this._runtime);
            this._runtime = null;
        }
    }

    _startAnimationFrame() {
        if (!this._runtime && (this._handlers.size > 0)) {
            let self = this;
            this._runtime = this._requestAnimationFrame((step)=> {
                self._onEnterFrame(step);
            });
        }
    }

    _onEnterFrame() {
        ++this._currFrame;
        this._currTimer = new Date().getTime();

        this._handlers.forEach((value, key) => {
            if (value) {
                let currtime = value.userFrame ? this._currFrame : this._currTimer;
                let method = value.method;
                if (method && (currtime >= value.exeTime)) {
                    let args = value.args;
                    if (value.repeat) {
                        while (currtime >= value.exeTime) {
                            value.exeTime += value.delay;
                            if ((value.count > 0) && (--value.count === 0)) {
                                this.clearTimer(key);
                            }
                            method.apply(null, args);
                        }
                    } else {
                        this.clearTimer(key);
                        method.apply(null, args);
                    }
                }
            }
        });
        if (this._handlers.size <= 0) {
            this._stopAnimationFrame();
        }
    }

    _create(useFrame, repeat, delay, method, count, args) {
        args = args || null;
        if (method === null) {
            return null;
        }

        // 如果执行时间小于1，直接执行
        if ((!repeat || (repeat < 2)) && (delay < 1)) {
            method.apply(null, args);
            return -1;
        }

        let key = method.uuid;

        if (key === method.key) {
          // 先删除相同函数的计时
            this.clearTimer(key);
        }

        this._currTimer = new Date().getTime();

        let handler = this._pool.length > 0 ? this._pool.pop() : new TimerHandler();
        handler.userFrame = useFrame;
        handler.repeat = repeat;
        handler.delay = delay;
        handler.method = method;
        handler.count = count;
        handler.args = args;
        handler.exeTime = delay + (useFrame ? this._currFrame : this._currTimer);
        this._handlers.set(key, handler);
        ++this._size;

        this._startAnimationFrame();

        return key;
    }

    _createHandler(listener, callback, key) {
        let handler = this._handlers.get(key);
        return (handler && handler.method) || new __WEBPACK_IMPORTED_MODULE_1__Handler__["a" /* default */](listener, callback, key);
    }

    // 获取单例
    static get impl() {
        if (!__instance) {
            __instance = new Timers();
            __instance.start();
        }
        return __instance;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Timers;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WebSdk__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WebSdk", function() { return __WEBPACK_IMPORTED_MODULE_0__WebSdk__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(2);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Base", function() { return __WEBPACK_IMPORTED_MODULE_1__base__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Handler", function() { return __WEBPACK_IMPORTED_MODULE_1__base__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Dispatch", function() { return __WEBPACK_IMPORTED_MODULE_1__base__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Timers", function() { return __WEBPACK_IMPORTED_MODULE_1__base__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(1);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "uuid", function() { return __WEBPACK_IMPORTED_MODULE_2__utils__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "hex2rgb", function() { return __WEBPACK_IMPORTED_MODULE_2__utils__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "hex2string", function() { return __WEBPACK_IMPORTED_MODULE_2__utils__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "rgb2hex", function() { return __WEBPACK_IMPORTED_MODULE_2__utils__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "now", function() { return __WEBPACK_IMPORTED_MODULE_2__utils__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fill", function() { return __WEBPACK_IMPORTED_MODULE_2__utils__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "buf2hex", function() { return __WEBPACK_IMPORTED_MODULE_2__utils__["a"]; });





/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(2);


class WebSdk {
    constructor() {
        this._root = {};
        this._env = WebSdk.WEB;
        this._dev = false;
        this._args = null;
    }

    install() {
        const args = [];
        for (var index = 0; index < arguments.length; ++index) {
            args[index] = arguments[index];
        }
        this._doMerge(args);
    }

    do(key) {
        const args = [];
        for (var index = 1; index < arguments.length; ++index) {
            args[index - 1] = arguments[index];
        }
        return this._doInvoke(key, args);
    }

    get(key) {
        return this._doGet(key); 
    }

    set(key, val) {
        return this._doSet(key, val);
    }

    on(key, event, listener) {
        return this._doOn(key, event, listener);
    }

    off(key, event, listener) {
        return this._doOn(key, event, listener, true)
    }

    get dev() { return this._dev; }
    get env() { return this._env; }
    get args () {
        if (!this._args) {
          var src = location.search || location.href || ''
          var str = src.slice(1)
          var num = str.indexOf('?')
          var ex = /([^&]+?)=([^#&]+)/g
          var result = {}
    
          str = str.substr(num + 1)
          while (ex.test(str)) {
            result[RegExp.$1] = RegExp.$2
          }
    
          this._args = result || {}
        }
    
        return this._args
      }

    static get impl() {
        return WebSdk.__impl || (WebSdk.__impl = new WebSdk());
    }
    
    init({ sdk, env, dev } = {}) {
        sdk && (this._root = sdk);
        env && (this._env = env);
        this._dev = !!dev;
    }

    destroy() {
        this._root = {};
    }
    
    _doInvoke(key, args) {
        if (!(key && /^([a-zA-Z])/.test(key))) {
            return Promise.reject({code: -1, message: `key: ${key} not valid!`});
        }
        const cmds = key.replace(/\[/g, '.').replace(/\]/g, '').replace(/\//g, '.').split('.');
        if (!cmds.length) {
            return Promise.reject({code: -2, message: `key: ${key} not allow empty!`});
        }
        const mkey = cmds.pop();
        var root = this._root;
        for (var i = 0; i < cmds.length; ++i) {
            const cmd = cmds[i];
            root = root[cmd] || null;
            if (!root || !(root instanceof Object)) {
                root = null;
                break;
            }
        }
        const method = ((mkey && root) && root[mkey]) || null;
        if (!method) {
            return Promise.reject({code: -3, message: `method index of key: ${key} is null`});
        }

        const result = method.apply(root, args)
        return (result instanceof Promise) ? result : Promise.resolve(result)
    }
    
    _doGet(key) {
        if (!(key && /^([a-zA-Z])/.test(key))) {
            return null;
        }
        const cmds = key.replace(/\[/g, '.').replace(/\]/g, '').replace(/\//g, '.').split('.');
        if (!cmds.length) {
            return null;
        }
        const mkey = cmds.pop();
        var root = this._root;
        for (var i = 0; i < cmds.length; ++i) {
            const cmd = cmds[i];
            root = root[cmd] || null;
            if (!root || !(root instanceof Object)) {
                root = null;
                break;
            }
        }
        return ((mkey && root) && root[mkey]) || null;
    }
    
    _doSet(key, val) {
        if (!(key && /^([a-zA-Z])/.test(key))) {
            return null;
        }
        const cmds = key.replace(/\[/g, '.').replace(/\]/g, '').replace(/\//g, '.').split('.');
        if (!cmds.length) {
            return null;
        }
        const mkey = cmds.pop();
        var root = this._root;
        for (var i = 0; i < cmds.length; ++i) {
            const cmd = cmds[i];
            root = root[cmd] || null;
            if (!root || !(root instanceof Object)) {
                root = null;
                break;
            }
        }
        if (!mkey || !(mkey in root)) {
            return null;
        }
        
        root[mkey] = val;

        return val;
    }

    _doOn(key, event, listener, isOff) {
        if (!(key && /^([a-zA-Z])/.test(key))) {
            return false;
        }
        const cmds = key.replace(/\[/g, '.').replace(/\]/g, '').replace(/\//g, '.').split('.');
        if (!cmds.length) {
            return false;
        }
        var root = this._root;
        for (var i = 0; i < cmds.length; ++i) {
            const cmd = cmds[i];
            root = root[cmd] || null;
            if (!root || !(root instanceof Object)) {
                root = null;
                break;
            }
        } 
        if (!root || !(root instanceof __WEBPACK_IMPORTED_MODULE_0__base__["b" /* Dispatch */])) {
            return false
        }

        !isOff ? root.on(event, listener) : root.off(event, listener)

        return true
    }

    _doMerge(args) {
        const assign = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; ++i) {
                const arg = arguments[i];
                for (var key in arg) target[key] = arg[key];
            }
            return target;
        };
        args = args || [];
        args.unshift(this._root);
        this._root = assign.apply(null, args);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WebSdk;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_eventemitter3__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_eventemitter3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_eventemitter3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Timers__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(1);




class Dispatch extends __WEBPACK_IMPORTED_MODULE_0_eventemitter3___default.a {
    constructor() {
        super();
        this.stoped = false;
        this.uuid = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["g" /* uuid */])();

        this.later = new Map();
    }

    emit() {
        if (this.stoped) return;
        super.emit.apply(this, arguments);
    }

    init() {
        this.emit(Dispatch.ONINIT);
    }

    start() {
        this.stoped = false;
        this.emit(Dispatch.ONSTART);
    }

    stop() {
        this.emit(Dispatch.ONSTOP);
        super.removeAllListeners();
        this.stoped = true;
    }

    destroy() {
        this.emit(Dispatch.ONDESTROY);
        this.later.clear();
        super.removeAllListeners();
        this.stoped = true;
    }

    callLater(method, interval) {
        if (this.stoped) return;
        const key = this.later.get(method);
        this.later.set(method, __WEBPACK_IMPORTED_MODULE_1__Timers__["a" /* default */].impl.doOnce(interval || 100, method, [], this, key));
    }

    removeLater(method) {
        const key = this.later.get(method);
        key && __WEBPACK_IMPORTED_MODULE_1__Timers__["a" /* default */].impl.clearTimer(key);

        this.later.delete(method);
    }

    doTick(method, interval) {
        return (!this.stoped && __WEBPACK_IMPORTED_MODULE_1__Timers__["a" /* default */].impl.doLoop(interval || 100, method)) || null;
    }

    removeTick(key) {
        key && __WEBPACK_IMPORTED_MODULE_1__Timers__["a" /* default */].impl.clearTimer(key);
    }

    static get ONINIT() { return 'Dispatch.ONINIT'; }
    static get ONSTART() { return 'Dispatch.ONSTART'; }
    static get ONSTOP() { return 'Dispatch.ONSTOP'; }
    static get ONDESTROY() { return 'Dispatch.ONDESTROY'; }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Dispatch;



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @api private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {Mixed} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Boolean} exists Only check if there are listeners.
 * @returns {Array|Boolean}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event, exists) {
  var evt = prefix ? prefix + event : event
    , available = this._events[evt];

  if (exists) return !!available;
  if (!available) return [];
  if (available.fn) return [available.fn];

  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
    ee[i] = available[i].fn;
  }

  return ee;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Remove the listeners of a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {Mixed} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
         listeners.fn === fn
      && (!once || listeners.once)
      && (!context || listeners.context === context)
    ) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
           listeners[i].fn !== fn
        || (once && !listeners[i].once)
        || (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {String|Symbol} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ })
/******/ ]);
});