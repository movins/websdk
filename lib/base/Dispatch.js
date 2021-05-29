import EventEmitter from 'eventemitter3';
import Timers from './Timers';
import { uuid } from '../utils';

export default class Dispatch extends EventEmitter {
    constructor() {
        super();
        this.stoped = false;
        this.uuid = uuid();

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
        this.later.set(method, Timers.impl.doOnce(interval || 100, method, [], this, key));
    }

    removeLater(method) {
        const key = this.later.get(method);
        key && Timers.impl.clearTimer(key);

        this.later.delete(method);
    }

    doTick(method, interval) {
        return (!this.stoped && Timers.impl.doLoop(interval || 100, method)) || null;
    }

    removeTick(key) {
        key && Timers.impl.clearTimer(key);
    }

    static get ONINIT() { return 'Dispatch.ONINIT'; }
    static get ONSTART() { return 'Dispatch.ONSTART'; }
    static get ONSTOP() { return 'Dispatch.ONSTOP'; }
    static get ONDESTROY() { return 'Dispatch.ONDESTROY'; }
}
