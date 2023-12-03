import { UBase } from './UBase';
export declare class Dispatch extends UBase {
    protected _stoped: boolean;
    constructor();
    emit(event: string, ...args: any[]): boolean;
    init(): void;
    start(): void;
    stop(): void;
    destroy(): void;
    static get ONINIT(): string;
    static get ONSTART(): string;
    static get ONSTOP(): string;
    static get ONDESTROY(): string;
}
