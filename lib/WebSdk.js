import { Dispatch } from './base';

export default class WebSdk {
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
        return this._doOn(key, event, listener, true);
    }

    get dev() { return this._dev; }
    get env() { return this._env; }
    get args () {
        if (!this._args) {
            var src = location.search || location.href || '';
            var str = src.slice(1);
            var num = str.indexOf('?');
            var ex = /([^&]+?)=([^#&]+)/g;
            var result = {};
    
            str = str.substr(num + 1);
            while (ex.test(str)) {
                result[RegExp.$1] = RegExp.$2;
            }
    
            this._args = result || {};
        }
    
        return this._args;
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

        const result = method.apply(root, args);
        return (result instanceof Promise) ? result : Promise.resolve(result);
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
        if (!root || !(root instanceof Dispatch)) {
            return false;
        }

        !isOff ? root.on(event, listener) : root.off(event, listener);

        return true;
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