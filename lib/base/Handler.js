import Base from './Base';

export default class Handler extends Base {
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
