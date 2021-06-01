/* eslint-disable no-constant-condition */
(function (global) {
    var App = function () {
        var _callbacks = {};
  
        var excute = function (param) {
            var result = null;
            var win = window || {};
            if (win.prompt) {
                try {
                    param.__appKey = '%s';
                    param = JSON.stringify(param);
                    result = win.prompt('webview://app?params=' + param);
                    result = JSON.parse(result);
                } catch (error) {
                    result = null;
                }
            }
  
            return result;
        };
  
        this.dataRequest = function (param) {
            var result = null;
            var valid = true;
            var cmd;
            do {
                if (!param || !param.cmd) break;
                cmd = param.cmd;
  
                switch (param.type) {
                    case App.ADDLISTENER:
                        valid = !!param.handler;
                        valid && (_callbacks[cmd] = param.handler);
                        break;
                    case App.REMOVELISTENER:
                        delete _callbacks[cmd];
                        break;
                }
                if (!valid) break;
                result = excute(param);
            } while (false);
  
            return result;
        };
  
        this.callback = function (key) {
            return _callbacks[key];
        };
    };
  
    App.EXCUTE = 1;
    App.ADDLISTENER = 2;
    App.REMOVELISTENER = 3;
    App.APP = 1;
  
    var fromBase64 = function (data) {
        var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var b64tab = (function (bin) {
            var t = {};
            for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
            return t;
        }(b64chars));
        var fromCharCode = String.fromCharCode;
  
        var _atob = function (s) {
            var prev = -1;
            var i = 0;
            var result = [];
            var str = s.replace(/\s|=/g, '');
            while (i < str.length) {
                // cur = b64chars.indexOf(s.charAt(i));
                var cur = b64tab[str.charAt(i)];
                var mod = i % 4;
                switch (mod) {
                    case 0: break;
                    case 1: result.push(fromCharCode(prev << 2 | cur >> 4)); break;
                    case 2: result.push(fromCharCode((prev & 0x0f) << 4 | cur >> 2)); break;
                    case 3: result.push(fromCharCode((prev & 3) << 6 | cur)); break;
                }
                prev = cur;
                ++i;
            }
            return result.join('');
        };
  
        return global && global.atob ? global.atob(data) : _atob(data);
    };
  
    var app = new App();
    var __methods = {};
  
    var emit = function (key, base64, packed) {
        do {
            var callback = app.callback(key);
            if (!callback) break;
            var json = fromBase64(base64);
            var resp = !packed ? ((json && JSON.parse(json)) || null) : json;
            /* eslint-disable no-useless-call */
            callback.apply(null, [resp]);
        } while (false);
    };
  
    var excute = function (cmd, param) {
        var data = { type: App.EXCUTE, cmd: cmd, param: param };
        return app.dataRequest(data);
    };
  
    var register = function (cmd, handler) {
        __methods[cmd] = handler;
    };
  
    var invoke = function (key, base64, packed) {
        var result = null;
        do {
            var method = __methods[key];
            if (!method) break;
            var json = fromBase64(base64);
            var resp = !packed ? ((json && JSON.parse(json)) || null) : json;
            /* eslint-disable no-useless-call */
            result = method.apply(null, [resp]) || null;
        } while (false);
        return (result && JSON.stringify(result)) || null;
    };
  
    var on = function (cmd, handler) {
        var data = { type: App.ADDLISTENER, cmd: cmd, handler: handler };
        return app.dataRequest(data);
    };
  
    var off = function (cmd) {
        var data = { type: App.REMOVELISTENER, cmd: cmd };
        return app.dataRequest(data);
    };
  
    global.Win = {
        emit: emit,
        excute: excute,
        on: on,
        off: off,
        register: register,
        invoke: invoke,
        appType: Number('%d' || 1),
        clientType: App.APP
    };
})(window || this);
  