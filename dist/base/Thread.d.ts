import { Dispatch } from './Dispatch';
export interface WorkerCls {
    new (): Worker;
}
export declare class Thread extends Dispatch {
    private _cls;
    private _worker;
    constructor(cls: WorkerCls);
    get running(): boolean;
    destroy(): void;
    start(): void;
    stop(): void;
    send(data: Record<string, any>, trans?: any[]): void;
    restart(): void;
    private initWorker;
    protected handleMessage({ data }: Record<string, any>): void;
    protected handleError({ data }: Record<string, any>): void;
    static get ONMESSAGE(): string;
    static get ONERROR(): string;
}
