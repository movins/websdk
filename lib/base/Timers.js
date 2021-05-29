import Base from './Base';
import Handler from './Handler';

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

export default class Timers extends Base {
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
        return (handler && handler.method) || new Handler(listener, callback, key);
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
