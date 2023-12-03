import EventEmitter from 'eventemitter3';
export declare class UBase extends EventEmitter<string> {
    private _uuid;
    constructor();
    get uuid(): number;
}
