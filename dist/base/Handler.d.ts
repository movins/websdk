export type Method = (...args: any) => any;
export declare class Handler {
    private _caller;
    private _method;
    private _args;
    protected _uuid: number;
    constructor(caller: any, method: Method, ...args: any);
    apply(...args: any): any;
    call(...args: any): any;
    destroy(): void;
    get caller(): any;
    get method(): Method;
    get args(): any[];
    get uuid(): number;
    static excute(caller: any, method: Method, ...args: any): Promise<any>;
}
